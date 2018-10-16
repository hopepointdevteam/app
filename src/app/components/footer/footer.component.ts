import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Meta, Title } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Message } from '../../../../build/models/message';
import { HPConnections } from '../../../../build/constants/connection-constants';
import { AllMinistries } from '../../../../build/constants/all-ministries';
import { EventsService } from '../../services/events-service.service';
import { SendMessageService } from '../../services/send-message.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PageLayoutService } from '../../services/page-layout.service'; 


@Component({ 
  selector: 'app-footer',
  templateUrl: './footer.component.html', 
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
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
    private _pageService: PageLayoutService
  ) { 
    this.getDevice();
  }

  ngOnInit() {
    if(!this.events){
      this.loadEvents();
    }
    this.getCurrentBuild()
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

  message: Message = { 
    name: '',
    email: '',
    message: '',
    phone: '',
    website: ''
  };

  sendMessage({value, valid}: {value: Message, valid: boolean}){
    if(!valid){
      console.log('Form is not valid');
    } else {    
      this._messageService.sendMessage(value).subscribe(e => {
        if(e.message == "Message Delivered"){
          this._flashMessagesService.show('Your message has been sent', { cssClass: 'alert-info', timeout: 3000 });
          this.hidden = true;
          this.form.reset();
        }        
      })      
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
