import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { PageLayoutService } from '../../_services';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  template: `
  <div class="no-gutters" *ngIf="layout">
  <section class="page-section pt-2 clearfix" *ngFor="let section of layout.sections; let i = index">
    <!-- Landing Section -->
    <div class="container" *ngIf="section.landing">
      <div class="intro">
        <img class="intro-img img-fluid mb-3 mb-lg-0 rounded" [src]="base + section.landing.image" alt="{{section.landing.image_alt}}">
        <div class="intro-text left-0 text-center bg-faded p-5 rounded">
          <h2 class="section-heading mb-4">
            <span class="section-heading-upper">{{section.landing.text_upper}}</span>
            <span class="section-heading-lower">{{section.landing.text_lower}}</span>
          </h2>
          <p class="mb-3" *ngIf="section.landing.verse">
              {{section.landing.verse}}
          </p>
          <div class="intro-button mx-auto" *ngIf="section.landing.button_text">
            <a class="btn btn-dark btn-xl" routerLink="section.landing.route">{{section.landing.button_text}}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Landing Section -->
    <!-- About Section -->
    <div class="container about-heading" *ngIf="section.about_landing">
      <img class="img-fluid rounded about-heading-img my-3" [src]="base + section.about_landing.image" alt="{{section.about_landing.image_alt}}">
      <div class="about-heading-content mx-auto rounded">
        <div class="row">
          <div class="col-xl-9 col-lg-10 mx-auto">
            <div class="bg-faded rounded p-5">
              <h2 class="section-heading mb-4 text-center">
                <p class="section-heading-lower">{{section.about_landing.text_upper}}</p>
                <p class="section-heading-upper">{{section.about_landing.text_lower}}</p>
              </h2>
              <div *ngIf="section.about_landing.paragraphs">
                <p class="text-left p-5 shadow-lg rounded" *ngFor="let paragraph of section.about_landing.paragraphs">
                  {{paragraph}}
                </p>
              </div>
              <div *ngIf="section.about_landing.statements">
              <ul class="list-unstyled text-left">
                <li *ngFor="let item of section.about_landing.statements" [innerHTML]="sanatizeHtml(item)"></li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ./About Section -->
    <!-- List Single Item -->
    <div class="container cta rounded" *ngIf="section.list_section">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <div class="cta-inner text-center rounded">
              <h3 class="text-center">{{section.list_section.title}}</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item" *ngFor="let item of section.list_section.list_items">{{item}}</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- List Single Item -->
    <!-- Paragraph Section -->
    <div class="about-heading-content mx-auto" *ngIf="section.paragraphs">
      <div class="row">
        <div class="col-xl-9 col-lg-10 mx-auto">
          <div class="cta-inner text-center rounded">
            <p class="text-left p-5 shadow-lg rounded" *ngFor="let paragraph of section.paragraphs.paragraphs">
              {{paragraph}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- ./Paragraph Section -->
    <!-- Info Section With Paragraphs -->
    <div class="container" *ngIf="section.info_section">
      <div class="intro">
        <img class="intro-img-left img-fluid mb-3 mb-lg-0 rounded" [src]="base + section.info_section.image" alt="section.info_section.image_alt">
        <div class="intro-text-right left-0 text-center bg-faded p-5 rounded">
          <h2 class="section-heading mb-4">
            <span class="section-heading-lower">{{section.info_section.text_lower}}</span>
          </h2>
          <p class="mb-3" *ngFor="let paragraph of section.info_section.paragraphs">
              {{paragraph}}
          </p>
          <div class="intro-button mx-auto">
            <a class="btn btn-dark btn-xl" routerLink="section.info_section.route">{{section.info_section.button_text}}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- ./Info Section With Paragraphs -->
    <!-- List With Description Section -->
    <div class="container" *ngIf="section.description_list_section">
      <div class="intro">
        <img class="intro-img img-fluid mb-3 mb-lg-0 rounded" [src]="base + section.description_list_section.image" alt="{{section.description_list_section.image_alt}}">
        <div class="intro-text left-0 text-center bg-faded p-5 rounded">
          <h2 class="section-heading mb-4">
            <span class="section-heading-lower">{{section.description_list_section.text_upper}}</span>
            <span class="section-heading-upper" [innerHTML]="sanatizeHtml(section.description_list_section.text_lower)"></span>
          </h2>
          <div class="col-md-12" *ngFor="let item of section.description_list_section.list">
            <div class="row p-0">
                <div class="col-md-2 text-center">
                  {{item.item}}
                </div>
                <div class="col-md-10">
                  <p class="small">{{item.statement}}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ./List With Description Section -->
    <!-- Call To Action -->
    <div class="container cta rounded" *ngIf="section.call_to_action">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <div class="cta-inner text-center rounded">
            <h2 class="section-heading">
              <span class="section-heading-upper">{{section.call_to_action.text_upper}}</span>
              <span class="section-heading-lower">{{section.call_to_action.text_lower}}</span>                
            </h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mx-auto mt-2">
          <a class="btn btn-dark btn-xl" routerLink="section.call_to_action.route">{{section.call_to_action.button_text}}</a>
        </div>
      </div>
    </div>
    <!-- ./Call To Action -->
    <!-- Team Images -->
    <div class="container" *ngIf="section.team">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb40 text-center text-white"> 
              <h1>{{section.team.title}}</h1>
          </div>
        </div>
        <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-8" *ngFor="let member of section.team.members">
                <div class="team-block mx-auto">
                    <div class="team-img">
                        <img [src]="base + member.image" alt="{{member.name}}">
                        <div class="team-content">
                            <h4 class="text-white mb0">{{member.name}}</h4>
                            <p class="team-meta">- {{member.title}}</p>                              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ./Team Images -->
    <!-- Full Background Cards -->
    <div class="container" *ngIf="section.card_column_full_background">
      <div class="card-columns">
        <div class="card" *ngFor="let c of section.card_column_full_background.cards">
          <a [routerLink]="c.route">
            <div class="card-body p-0">
                <div [ngStyle]="{ 'background-image': 'url(' + base + c.image + ')',  'background-size': 'cover',
                'background-repeat': 'no-repeat', 'height': '300px' }">
                  <div class="my-auto mx-auto">
                    <p>{{c.name}}</p>
                  </div>
                </div>
            </div> 
          </a>
        </div>
      </div>
    </div>
    <!-- ./Full Background Cards -->
    <!-- Google Map -->
    <div class="container pt-5" *ngIf="section.location_section">          
      <h1 class="text-center text-white">{{section.location_section.title}}</h1>
      <div class="col-xs-12 col-sm-12 p-5">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99033.5653090846!2d-121.74197597519527!3d39.13380704246996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8084ac800ba6d90d%3A0xc19bce8622896347!2sHope+Point+Nazarene+Church!5e0!3m2!1sen!2sus!4v1508759428740" width="100%" 
          height="350px" 
          frameborder="0" 
          style="border:0"
          class="rounded"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    <!-- ./Google Map -->
  </section>
  </div>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  base: any;
  layout: any;
  constructor(@Inject(WINDOW) private window: Window, private _pageService: PageLayoutService, private sanitizer: DomSanitizer) { }

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
    const page = 'about'
    this._pageService.getPageLayout(page).subscribe(e => {
      e.forEach(item => {
        this.layout = item
      })      
    })
  }

  sanatizeHtml(string){
    return this.sanitizer.bypassSecurityTrustHtml(string);
  }

}
