import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { PageLayoutService } from '../../_services';
import { ministries } from '../../_constants'

@Component({
  selector: 'app-ministries',
  templateUrl: './ministries.component.html', 
  styleUrls: ['./ministries.component.scss']
})


export class MinistriesComponent implements OnInit {
  layout: any;
  base: any;
  icon: string
  ministries: any[]

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
  }

  getCurrentBuild(){
    this.ministries = ministries
    this.icon = this.base + '/assets/images/logos/website-logo-wht.png'
  }
  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
