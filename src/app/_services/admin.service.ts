import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/admin/';
//const API_URL = 'https://i-course.herokuapp.com/api/admin/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(API_URL+ 'users', {responseType: "json" });
  }

block(usersId : any) :  Observable<any>{
  const formData = new FormData();
  formData.append('usersId', usersId);
  return this.http.post(API_URL + 'block', formData);
}

unblock(usersId : any) :  Observable<any>{
  const formData = new FormData();
  formData.append('usersId', usersId);
  return this.http.post(API_URL + 'unblock', formData);
}
  
delete(usersId : any) :  Observable<any>{
  const formData = new FormData();
  formData.append('usersId', usersId);
  return this.http.post(API_URL + 'delete', formData);
}

setRoleAdmin(usersId : any) :  Observable<any>{
  const formData = new FormData();
  formData.append('usersId', usersId);
  return this.http.post(API_URL + 'setRoleAdmin', formData);
}

}