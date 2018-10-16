import { Component, OnInit, HostListener } from '@angular/core';
import { PageLayoutService } from '../../services/page-layout.service';

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
  constructor( 
    private _pageService: PageLayoutService
  ) { 
    
  }
 

  ngOnInit() {
    this.base = window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    this.NavClass = 'navbar navbar-expand-md navbar-dark fixed-top';
    this.TogglerClass =  'collapse navbar-collapse p-3';
    this.getCurrentBuild()
   }

  
   @HostListener("window:scroll", [])
   onWindowScroll() {
 
     const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
     if(number < 10) {
      this.NavClass = 'navbar navbar-expand-md navbar-dark fixed-top';
     } else {
      this.NavClass = 'navbar navbar-expand-md navbar-dark fixed-top dark';
     }
     
   }

   getCurrentBuild(){
    const page = 'navbar'
    this._pageService.getPageLayout(page).subscribe(e => {
      this.layout = e
    })
  }

}
