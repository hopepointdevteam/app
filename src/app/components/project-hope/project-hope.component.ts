import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events-service.service';
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
  constructor(
    private _eventService: EventsService, 
    private sanitizer: DomSanitizer
  ) { } 

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
}
