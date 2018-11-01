import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  landing: string
  vision: string
  list: any[]
  statements: any[]

  base: any;
  
  constructor(@Inject(WINDOW) private window: Window,  private sanitizer: DomSanitizer) { }

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
    this.landing = this.base + '/assets/images/backgrounds/Believe_BG.jpg'
    this.vision = this.base + '/assets/images/backgrounds/Vision_BG.jpg'
    this.statements = [
      "in one God—the Father, Son, and Holy Spirit.",
      "that the Old and New Testament Scriptures, given by plenary inspiration, contain all truth necessary to faith and Christian living.",
      "that man is born with a fallen nature, and is, therefore, inclined to evil, and that continually.",
      "that those who fail to accept Jesus Christ as their savior are lost.",
      "that the atonement through Jesus Christ is for the whole human race; and that whosoever repents and believes on the Lord Jesus Christ is justified and regenerated and saved from the dominion of sin.",
      "that believers are to be sanctified wholly, subsequent to regeneration, through faith in the Lord Jesus Christ.",
      "that the Holy Spirit bears witness to the new birth, and also to the entire sanctification of believers.",
      "that our Lord will return, the dead will be raised, and the final judgment will take place."
    ]
    this.list = [
      {
        item : "WORSHIP:",
        statement : "As a church, we are committed to become a spiritual family that worships the Father -- our foundation.",
        class: "fas fa-place-of-worship fa-5x"
      },
      {
        item : "GATHER:",
        statement : "We develop meaningful relationships by doing life together dedicating ourselves to our church and church family.",
        class: "fas fa-users fa-5x"
      },
      {
        item : "LOVE:",
        statement : "We serve our community by fully engaging a broken world with the love of Jesus. We show love by kneeling down to those in need.",
        class: "fas fa-heart fa-5x"
      }
    ]
  }

  sanatizeHtml(string){
    return this.sanitizer.bypassSecurityTrustHtml(string);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
