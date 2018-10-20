import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Message } from '../../../../build/models';
import { HPConnections, AllMinistries } from '../../../../build/constants';
import { EventsService, SendMessageService, PageLayoutService } from '../../_services';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { first } from 'rxjs/operators';


@Component({ 
  selector: 'app-footer',
  templateUrl: './footer.component.html', 
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  contactMessage: FormGroup
  events: Event[];
  layout: any;
  connections = HPConnections;
  allMinistries = AllMinistries;
  today: number = Date.now();
  deviceInfo = null;
  downloadLink;
 
  hidden: boolean = true;
  messageSent = false;
  messageConfirmationHidden = true;

  @ViewChild('infoMessage') form: any;

  constructor(
    private deviceService: DeviceDetectorService, 
    private _eventService: EventsService, 
    private sanitizer: DomSanitizer, 
    private _messageService: SendMessageService,
    private _flashMessagesService: FlashMessagesService,
    private _pageService: PageLayoutService,
    private formBuilder: FormBuilder
  ) { 
    this.getDevice();
  }

  ngOnInit() {
    if(!this.events){
      this.loadEvents();
    }
    this.getCurrentBuild()
    this.contactMessage = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ] ],
      phone: ['', [ Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) ] ],
      message: ['', [ Validators.required, Validators.minLength(50), Validators.maxLength(500) ]  ],
      website: ['', Validators.maxLength(0)]
    })
  }

  get name() { return this.contactMessage.get('name') }
  get email() { return this.contactMessage.get('email') }
  get phone() { return this.contactMessage.get('phone') }
  get message() { return this.contactMessage.get('message') }
  get website() { return this.contactMessage.get('website') }
  get f() { return this.contactMessage.controls }

  onSubmit() {
    if( this.contactMessage.invalid ) {
      this._flashMessagesService.show('There was an error within the form.', { cssClass: 'alert-danger', timeout: 3000 });
    }
    this._messageService.sendMessage(this.contactMessage.value)
      .pipe(first())
        .subscribe(e => {
          if(e.message == "Message Delivered"){
            this._flashMessagesService.show('Your message has been sent', { cssClass: 'alert-info', timeout: 3000 });
            this.hidden = true;
            this.contactMessage.reset();
          }        
        }, err => {
          this._flashMessagesService.show('Your message was not delivered. If this issue persists contact a member of the Hope Point staff.', { cssClass: 'alert-danger', timeout: 5000 });
          console.log(err)
        })
  }

  loadEvents(){
    this._eventService.getEvents().subscribe(e => {
      this.scrubEvents(e);
    })
  }

  scrubEvents(events){
    var mainEvents = []
    var scrubbedEvents = []
    events.forEach((e) => {
      if(e.group_name == "All members of Hope Point Yuba City"){
        mainEvents.push(e);
      }   
    })  
    this.events = mainEvents;
  } 

  toggleForm(e){
    this.hidden = !this.hidden;
  }

  getDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    
    if(this.deviceInfo.os == 'mac'){
      this.downloadLink = 'appStore'
    } else if(this.deviceInfo.os == 'android'){
      this.downloadLink = 'playStore'
    } else {
      this.downloadLink = 'desktop'
    }
  } 

  returnLocation(location){
    if(location.length === undefined){
      return 'Location: Please visit the <a href="brick-patio">Brick Patio</a> for more information'
    } else {
      return 'Location: ' + location
    }
  }
  
  getCurrentBuild(){
    const page = 'footer'
    this._pageService.getPageLayout(page).subscribe(e => {
      this.layout = e
    })
  }

}
