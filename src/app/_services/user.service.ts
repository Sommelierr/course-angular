import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const API_URL = 'http://localhost:8080/api/test/';
const API_URL = 'https://i-course.herokuapp.com/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: "json" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUserById(id): Observable<any> {
    return this.http.get(API_URL+ 'user/'+ `${id}`, {responseType: "json" });
  }

  getUserStatus(id) : Observable<any>{
    return this.http.get(API_URL+ 'user/'+ `${id}`+ '/status', {responseType: "json" });
  }
  
}
