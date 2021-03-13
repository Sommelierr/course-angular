import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/api/';
//const API = 'https://i-course.herokuapp.com/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollectionCreaterForm(id): Observable<any> {
    return this.http.get(API + `${id}`+ '/' + 'create', httpOptions);
  }

  createCollection(collection, image : File, id): Observable<any> {
    const formData = new FormData();
    formData.append('name', collection.name);
    formData.append('description', collection.description);
    formData.append('theme', collection.theme);
    formData.append('image', image);
    return this.http.post(API + `${id}`+ '/' + 'create', formData);
  }

  delete(userId, collectionId, collectionType): Observable<any> {
    return this.http.delete(API + 'user/' + `${userId}` + '/' + `${collectionType}`  + '/' + `${collectionId}`);
  }

  getCollection(userId, collectionId, collectionType) : Observable<any> {
    return this.http.get(API + 'user/' + `${userId}` + '/' + `${collectionType}`  + '/' + `${collectionId}` )
  }

  updateCollection(collection, image : File, userId, collectionType, collectionId): Observable<any> {
    const formData = new FormData();
    formData.append('name', collection.name);
    formData.append('description', collection.description);
    formData.append('theme', 'nothing');
    formData.append('image', image);
    return this.http.put(API + 'user/' + `${userId}` + '/' + `${collectionType}`  + '/' + `${collectionId}`, formData);
  }

  setCollectionBitMask(bitMask,userId, collectionId, collectionType ) : Observable<any> {
    const formData = new FormData();
    formData.append('bitMask', bitMask);
    return this.http.put(API + 'user/' + `${userId}` + '/' + `${collectionType}`  + '/' + `${collectionId}` + '/bitMask', formData);
  }

  getBookCollectionBitMask(collectionId): Observable<any> {
    return this.http.get(API + 'bookCollection/' + `${collectionId}` + '/bitMask');
  }

  getAlcoholCollectionBitMask(collectionId): Observable<any> {
    return this.http.get(API + 'alcoholCollection/' + `${collectionId}` + '/bitMask');
  }
}
