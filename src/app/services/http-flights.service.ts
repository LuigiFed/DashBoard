import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpFlightsService {

  constructor(private http : HttpClient) { }


  getFlights(url : string) {
    return this.http.get(url);
    }
    postUser(url: string, body: any) {
      return this.http.post(url, body, {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    postFlight(url: string, data: any): Observable<any> {

      return this.http.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });




}
}


