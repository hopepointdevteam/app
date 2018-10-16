import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bahamas',
  templateUrl: './bahamas.component.html',
  styleUrls: ['./bahamas.component.scss']
})
export class BahamasComponent implements OnInit {
  base: any;
  constructor() { }

  ngOnInit() {
    this.base = window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    
  }

}
