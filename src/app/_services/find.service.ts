import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class FindService {

    constructor(private http: HttpClient) { }

    getHome() : Observable<any>{
    return this.http.get(URL + 'home',{responseType : 'json' });
    }

    getFindResult(word) : Observable<any>{
      return this.http.get(URL+'find/' + `${word}`,{responseType : 'json' });
    }
}