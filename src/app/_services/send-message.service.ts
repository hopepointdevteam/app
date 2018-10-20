import { WINDOW } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../../build/models/message';

declare interface Captcha {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {
  message: Message[];
  base: any;
  constructor(@Inject(WINDOW) private window: Window, private http: HttpClient) { } 

  sendMessage(message: Message): Observable<Message>{
    this.base = this.window.location.href 
    this.base = /(http\:\/\/[a-z\.\:0-9]+)\/([a-z]+)*\/*/g.exec(this.base);
    if(new String( this.base[2] ) != 'preview' || !this.base[2]){
      this.base = this.base[1] + '/'
    } else {
      this.base = this.base[1] + '/' + this.base[2] + '/'
    } 
    var url = this.base + 'api/lead/send'    
    return this.http.post<Message>(url, {message}, {headers: this.GetHttpHeaders()})
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
