import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable, Observable } from 'rxjs';
import { map as __map, filter as __filter, map } from 'rxjs/operators';
import { AbstractModel } from '../components/models/abstractModel.model';
import { Request } from '../components/models/request.model';
import { Result } from '../components/models/result.model';



@Injectable({
  providedIn: 'root'
})
export class Requestor {


    constructor(private http: HttpClient) {
    }


    sendSync(model: AbstractModel[], requestName: string, url: string): Observable<any> {
      const header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
      });

      const options = {
        headers: header,
        observe: 'response' as 'response'
      };

      const request: Request<AbstractModel> = new Request<AbstractModel>();
      request.name = requestName;
      request.elements = model;

      console.log('Request:', request);

      const body = { REQUEST: request };
      console.log('Body della richiesta:', JSON.stringify(body));

      return this.http.post<any>(url, body, options).pipe(
        map((res: HttpResponse<any>) => {
          return res.body ? res.body.RESPONSE : res;
        })
      );
    }


}



