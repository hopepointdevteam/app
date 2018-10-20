import { WINDOW } from '@ng-toolkit/universal';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLayoutService {
  layout: any;
  base: any;
  constructor(@Inject(WINDOW) private window: Window, private http: HttpClient) { }
  
  getPageLayout(page): Observable<any> {
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(this.base[2] != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2] + '/'
    }
    var url = this.base + 'build/pages/'+ page +'.json';
    return this.http.get<any>(url, {headers: this.GetHttpHeaders()})    
  }

  GetHttpHeaders() : HttpHeaders{
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Request-Headers', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    return headers;
  }
}
