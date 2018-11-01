import { WINDOW } from '@ng-toolkit/universal'
import { Component, OnInit , Inject} from '@angular/core'
import { DomSanitizer, Meta, Title } from '@angular/platform-browser'
import { ministries, StaffMembers } from '../../_constants'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  landing: object;
  ministries: any[]
  services: any[]
  staff: any[]
  icon: string

  base: any;
  constructor(@Inject(WINDOW) private window: Window, private sanitizer: DomSanitizer, private title: Title) {
    this.title.setTitle('Hope Point Nazarene Church')
  }
  ngOnInit(){
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    this.buildPageSettings()
  }

  buildPageSettings() {
    this.ministries = ministries
    this.staff = StaffMembers
    this.icon = this.base + '/assets/images/logos/website-logo-wht.png'
    this.landing = {
      image : this.base + "assets/images/backgrounds/landing.jpg",
      image_alt : "Welcome Home",
      text_upper : "Hope Point Nazarene",
      text_lower : "You are Loved",
      verse : "\"They committed themselves to the teaching of the apostles, the life together, the common meal, and the prayers.\" - Acts 2:42",
      button_text : "About Hope Point",
      route : "/about-hope-point"
    }
    this.services = [
      "Sunday -- Service @ 9:00am",
      "Sunday -- Service @ 11:00am",
      "Wednesday -- Small Groups @ 6:30pm"      
    ]
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
