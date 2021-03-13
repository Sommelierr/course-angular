import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/user/';
//const API_URL = 'https://i-course.herokuapp.com/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id): Observable<any> {
    return this.http.get(API_URL + `${id}`, {responseType: "json" });
  }

  getUserStatus(id) : Observable<any>{
    return this.http.get(API_URL + `${id}`+ '/status', {responseType: "json" });
  }
  
}
