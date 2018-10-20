import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { EventsService } from '../../_services';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Meta, Title } from '@angular/platform-browser';

import { Event } from '../../../../build/models/event'

@Component({
  selector: 'app-club45-ministry',
  templateUrl: './club45-ministry.component.html',
  styleUrls: ['./club45-ministry.component.scss']
})
export class Club45MinistryComponent implements OnInit {
  events: Event[];
  expanded = [];
  base: any;
  constructor(@Inject(WINDOW) private window: Window, private _eventService: EventsService, private sanitizer: DomSanitizer, private meta: Meta, private title: Title) { }

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
  }

  loadEvents(){
    this._eventService.getEvents().subscribe(e => {
      this.scrubEvents(e)
    })
  }

  scrubEvents(events){
    var scrubbed = []
    events.forEach((e) => {
      if(e.group_name == "Club 45" ){
        scrubbed.push(e);
      }
    })
    this.events = scrubbed
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
      return '<a href="tel:' + contact + '">Call:&nbsp;<i class="fas fa-mobile-alt"></i></a> ' + contact
    }
  }

  returnEmail(email, event){
    if(email.length === undefined){
      return ''
    } else {
      return '<a href="mailto:' + email + '?Subject=Information%20About%20' + event + '" target="_top">Email:&nbsp;<i class="fas fa-envelope"></i></a> ' + email
    }
  }

}
