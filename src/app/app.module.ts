import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlashMessagesModule } from 'angular2-flash-messages';
// Services
import { SermonsService } from './services/sermons-service.service';
import { EventsService } from './services/events-service.service';
import { SendMessageService } from './services/send-message.service';
import { PageLayoutService } from './services/page-layout.service';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SermonsComponent } from './components/sermons/sermons.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MensMinistryComponent } from './components/mens-ministry/mens-ministry.component';
import { LadiesMinistryComponent } from './components/ladies-ministry/ladies-ministry.component';
import { CruisersMinistryComponent } from './components/cruisers-ministry/cruisers-ministry.component';
import { BrickPatioComponent } from './components/brick-patio/brick-patio.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { BahamasComponent } from './components/bahamas/bahamas.component';
import { HouseOfPrayerComponent } from './components/house-of-prayer/house-of-prayer.component';
import { MinistriesComponent } from './components/ministries/ministries.component';
import { OutreachComponent } from './components/outreach/outreach.component';
import { ProjectHopeComponent } from './components/project-hope/project-hope.component';
import { KidsMinistryComponent } from './components/kids-ministry/kids-ministry.component';
import { Club45MinistryComponent } from './components/club45-ministry/club45-ministry.component';
import { JrhighMinistryComponent } from './components/jrhigh-ministry/jrhigh-ministry.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SermonsComponent,
    NotFoundComponent,
    MensMinistryComponent,
    LadiesMinistryComponent,
    BrickPatioComponent,
    FilterPipePipe,
    TableComponent,
    FooterComponent,
    AboutComponent,
    BahamasComponent,
    HouseOfPrayerComponent,
    MinistriesComponent,
    CruisersMinistryComponent,
    OutreachComponent,
    ProjectHopeComponent,
    KidsMinistryComponent,
    Club45MinistryComponent,
    JrhighMinistryComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    SermonsService,
    EventsService,
    SendMessageService,
    PageLayoutService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
