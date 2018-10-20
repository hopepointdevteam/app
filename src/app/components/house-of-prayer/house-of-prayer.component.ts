import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { WorshipLeaders } from '../../../../build/constants/worship-leaders';

@Component({
  selector: 'app-house-of-prayer',
  templateUrl: './house-of-prayer.component.html',
  styleUrls: ['./house-of-prayer.component.scss']
})
export class HouseOfPrayerComponent implements OnInit {
  base: any;
  worshipLeaders = WorshipLeaders;

  constructor(@Inject(WINDOW) private window: Window, ) { }

  ngOnInit() {
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
  }


}
