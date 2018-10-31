import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { EventsService } from '../../_services';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-hope',
  templateUrl: './project-hope.component.html',
  styleUrls: ['./project-hope.component.scss']
})
export class ProjectHopeComponent implements OnInit {
  events: Event[];
  expanded = [];
  base: any;
  landing: string

  constructor(@Inject(WINDOW) private window: Window, 
    private _eventService: EventsService, 
    private sanitizer: DomSanitizer
  ) { } 

  ngOnInit() {
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    if(!this.events){
      this.loadEvents();
    }
    this.landing = this.base + '/assets/images/extra_content/project_hope.jpg'
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
      if(e.group_name == "Project Hope" ){
        mainEvents.push(e);
      }   
    })
    this.events = mainEvents;
  }

  sanatizeHtml(string){
    return this.sanitizer.bypassSecurityTrustHtml(string);
  }
  returnLocation(location){
    if(location.length === undefined){
      return ''
    } else {
      return '<strong>Where: </strong>' + location
    }
  }
  returnContact(contact){
    if(contact.length === undefined){
      return ''
    } else {
      return '<a class="link" href="tel:' + contact + '">Call:&nbsp;<i class="fas fa-mobile-alt"></i></a> ' + contact
    }
  }

  returnEmail(email, event){
    if(email.length === undefined){
      return ''
    } else {
      return '<a class="link" href="mailto:' + email + '?Subject=Information%20About%20' + event + '" target="_top">Email:&nbsp;<i class="fas fa-envelope"></i></a> ' + email
    }
  }
  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
