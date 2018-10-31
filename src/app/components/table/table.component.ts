import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { EventsService } from '../../_services';
import { DomSanitizer, SafeResourceUrl, SafeUrl, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  events: Event[];
  expanded = [];
  base: any;
  landing: string
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
    this.landing = this.base + '/assets/images/backgrounds/TheTable_BG.jpg'
  }

  loadEvents(){
    this._eventService.getEvents().subscribe(e => {
      this.scrubEvents(e)
    })
  }

  scrubEvents(events){
    var ladiesEvents = []
    events.forEach((e) => {
      if(e.group_name == "The Table" ){
        ladiesEvents.push(e);
      }
    })
    this.events = ladiesEvents
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
  returnLocation(location){
    if(location.length === undefined){
      return ''
    } else {
      return '<strong>Where: </strong>' + location
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
