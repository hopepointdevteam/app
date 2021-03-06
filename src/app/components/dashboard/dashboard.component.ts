import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { PageLayoutService } from '../../_services'; 
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
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
            <p class="mb-3">
                {{section.landing.verse}}
            </p>
            <div class="intro-button mx-auto">
              <a class="btn btn-dark btn-xl" href="{{section.landing.route}}">{{section.landing.button_text}}</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Landing Section -->
      <!-- Section 1 -->
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
      <!-- ./Section 1 -->
      <!-- Section 2 -->
      <div class="container" *ngIf="section.info_section">
        <div class="intro">
          <img class="intro-img-left img-fluid mb-3 mb-lg-0 rounded" [src]="base + section.info_section.image" alt="Hope Point Tables">
          <div class="intro-text-right left-0 text-center bg-faded p-5 rounded">
            <h2 class="section-heading mb-4">
              <span class="section-heading-lower">{{section.info_section.text_lower}}</span>
            </h2>
            <p class="mb-3" *ngFor="let paragraph of section.info_section.paragraphs">
                {{paragraph}}
            </p>
            <div class="intro-button mx-auto">
              <a class="btn btn-dark btn-xl" routerLink="{{section.info_section.route}}">{{section.info_section.button_text}}</a>
            </div>
          </div>
        </div>
      </div>
      <!-- ./Section 2 -->
      <!-- Section 3 -->
      <div class="container cta rounded" *ngIf="section.call_to_action">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <div class="cta-inner text-center rounded">
              <h2 class="section-heading">
                <span class="section-heading-upper">{{section.call_to_action.text_upper}}</span>
              </h2>
              <h2 class="section-heading">                
                <span class="section-heading-lower">{{section.call_to_action.text_lower}}</span>                 
              </h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mx-auto mt-2">
            <a class="btn btn-dark btn-xl" href="{{section.call_to_action.route}} ">{{section.call_to_action.button_text}}</a>
          </div>
        </div>
      </div>
      <!-- ./Section 3 -->
      <!-- Section 4 -->
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
      <!-- ./Section 4 -->
    </section>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  layout: any[] = [];
  base: any;
  constructor(@Inject(WINDOW) private window: Window, private _pageService: PageLayoutService, private sanitizer: DomSanitizer, private title: Title) {
    this.title.setTitle('Hope Point Nazarene Church')
  }
  ngOnInit(){
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
    const page = 'dashboard'
    this._pageService.getPageLayout( page ).subscribe(e => {
      e.forEach(item => {
        this.layout = item
      })
      
    })
  }
}
