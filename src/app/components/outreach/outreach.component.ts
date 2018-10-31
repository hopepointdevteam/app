import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { PageLayoutService } from '../../_services';

@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html', 
  styleUrls: ['./outreach.component.scss']
})
export class OutreachComponent implements OnInit {
  layout: any;
  base: any;
  landing: string
  icon: string
  missions: any[]
  constructor(@Inject(WINDOW) private window: Window, private _pageService: PageLayoutService) {
  }

  ngOnInit() {
    this.base = this.window.location.href  
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    this.getCurrentBuild()
    this.landing = this.base + '/assets/images/backgrounds/Believe_BG.jpg'
    this.icon = this.base + '/assets/images/logos/website-logo-wht.png'
  }

  getCurrentBuild(){
    this.missions = [
      {
        name : "Bahamas Mission",
        image: "/assets/images/backgrounds/Bahamas_BG.jpg",
        route: "/missions/bahamas-partnership"              
      },
      {
        name : "Project Hope",
        image : "/assets/images/backgrounds/Community_BG.jpg",
        route: "/missions/project-hope"
      }
    ]
  }

}
