import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';

@Component({
  selector: 'app-bahamas',
  templateUrl: './bahamas.component.html',
  styleUrls: ['./bahamas.component.scss']
})
export class BahamasComponent implements OnInit {
  base: any;
  landing: string
  constructor(@Inject(WINDOW) private window: Window, ) { }

  ngOnInit() {
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    this.landing = this.base + '/assets/images/backgrounds/Bahamas_BG.jpg'
  }

}
