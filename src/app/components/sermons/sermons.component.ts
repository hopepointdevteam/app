import { Component, OnInit } from '@angular/core';
import { SermonsService } from '../../services/sermons-service.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})

export class SermonsComponent implements OnInit {
  sermons: any;
  clips = [];
  base: any;
  constructor(private _sermonService: SermonsService, private sanitizer: DomSanitizer){
  }
  
  ngOnInit(){
    this.base = window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2]
    }
    if(!this.sermons){
      this.loadSermons();
    }
  }
  loadSermons(){
    this._sermonService.getVideos().subscribe(sermons => {
      this.sermons = sermons;
    })
  }
  
  sanatizeUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url);
  }


}
