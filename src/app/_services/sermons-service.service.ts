import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Video } from '../../../build/models/videos';

@Injectable({
  providedIn: 'root'
})
export class SermonsService {
  sermonsUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDBE59hcg5FuOcnLwYKYayl7KMsqa6tXww&channelId=UCZoJnP9s_Wxd0HPzl47evyA&part=snippet,id&order=date&maxResults=5';


  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.sermonsUrl, {headers: this.GetHttpHeaders()})
  }

  GetHttpHeaders() : HttpHeaders{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return headers;
  }
 
  
}
