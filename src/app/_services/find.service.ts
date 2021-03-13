import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';
//const API_URL = 'https://i-course.herokuapp.com/api/';
@Injectable({
  providedIn: 'root'
})
export class FindService {

    constructor(private http: HttpClient) { }

    getHome() : Observable<any>{
    return this.http.get(API_URL + 'home');
    }

    getFindResult(word) : Observable<any>{
      return this.http.get(API_URL+'find/' + `${word}`,{responseType : 'json' });
    }
}