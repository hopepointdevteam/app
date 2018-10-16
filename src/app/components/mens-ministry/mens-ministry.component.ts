import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Meta, Title } from '@angular/platform-browser';

import { Event } from '../../../../build/models/event'

@Component({
  selector: 'app-mens-ministry',
  templateUrl: './mens-ministry.component.html',
  styleUrls: ['./mens-ministry.component.scss']
})
export class MensMinistryComponent implements OnInit {
  events: Event[];
  expanded = [];
  base: any;
  constructor(private _eventService: EventsService, private sanitizer: DomSanitizer, private meta: Meta, private title: Title) { }

  ngOnInit() {
    this.base = window.location.href 
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
    var mensEvents = []
    events.forEach((e) => {
      if(e.grouping_name == "Men's Ministries" ){
        mensEvents.push(e);
      }
    })
    this.events = mensEvents
  }

  sanatizeHtml(string){
    return this.sanitizer.bypassSecurityTrustHtml(string);
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

}
