import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, HostListener , Inject} from '@angular/core';
import { PageLayoutService } from '../../_services';
import { navigation } from '../../_constants'

const icon = "/assets/images/logos/website-logo-wht.png"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  NavClass= '';
  TogglerClass = ''; 
  base: any;
  layout: any;

  links = navigation
  icon: string

  constructor(@Inject(WINDOW) private window: Window,  
    private _pageService: PageLayoutService
  ) { 
    this.NavClass = 'navbar navbar-expand-lg navbar-dark fixed-top';
  }
  @HostListener("window:scroll", [])
   onWindowScroll() {
 
     const number = this.window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
     if(number < 100) {
      this.NavClass = 'navbar navbar-expand-lg navbar-dark fixed-top';
     } else {
      this.NavClass = 'navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink';
     }
     
   }
  ngOnInit() {
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    this.icon = this.base + icon
   }

}
