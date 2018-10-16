import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Info
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SermonsComponent } from './components/sermons/sermons.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { BrickPatioComponent } from './components/brick-patio/brick-patio.component';
//Ministries
import { MinistriesComponent } from './components/ministries/ministries.component';
import { MensMinistryComponent } from './components/mens-ministry/mens-ministry.component';
import { LadiesMinistryComponent } from './components/ladies-ministry/ladies-ministry.component';
import { CruisersMinistryComponent } from './components/cruisers-ministry/cruisers-ministry.component';
import { KidsMinistryComponent } from './components/kids-ministry/kids-ministry.component';
import { Club45MinistryComponent } from './components/club45-ministry/club45-ministry.component';
import { JrhighMinistryComponent } from './components/jrhigh-ministry/jrhigh-ministry.component';
import { TableComponent } from './components/table/table.component';
// Outreach
import { OutreachComponent } from './components/outreach/outreach.component';
import { ProjectHopeComponent } from './components/project-hope/project-hope.component';
import { BahamasComponent } from './components/bahamas/bahamas.component';
// Worship
import { HouseOfPrayerComponent } from './components/house-of-prayer/house-of-prayer.component';
 
const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'hope-point-sermons', component: SermonsComponent},
  {path: 'hope-point-ministries', component: MinistriesComponent},
  {path: 'ministries/mens', component: MensMinistryComponent},
  {path: 'ministries/ladies', component: LadiesMinistryComponent},
  {path: 'ministries/cruisers', component: CruisersMinistryComponent},
  {path: 'ministries/kids', component: KidsMinistryComponent},
  {path: 'ministries/s-w-a-g', component: Club45MinistryComponent},
  {path: 'ministries/young-and-free-jr-high', component: JrhighMinistryComponent},
  {path: 'brick-patio', component: BrickPatioComponent},
  {path: 'the-table', component: TableComponent},
  {path: 'about-hope-point', component: AboutComponent},
  
  // TODO: replace bahamas with outreach
  {path: 'house-of-prayer', component: HouseOfPrayerComponent},
  
  {path: 'missions/outreach', component: OutreachComponent},
  {path: 'missions/project-hope', component: ProjectHopeComponent},
  {path: 'missions/bahamas-partnership', component: BahamasComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { 
  
}
