import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';
//const API_URL = 'https://i-course.herokuapp.com/api/';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) { }

    getAllTags() : Observable<any> {
      return this.http.get(API_URL + 'tags', {responseType : 'json'}); 
    }

    createBook(book, tags, collectionId): Observable<any> {
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('tags', tags);
      formData.append('cost', book.cost);
      formData.append('countOfPages', book.countOfPages);
      formData.append('weight', book.weight);
      formData.append('author', book.author);
      formData.append('genre', book.genre);
      formData.append('publisher', book.publisher);
      formData.append('itSerial', book.itSerial);
      formData.append('hasAudio', book.hasAudio);
      formData.append('hasFilm', book.hasFilm);
      formData.append('comment', book.comment);
      formData.append('summary', book.summary);
      formData.append('recommendation', book.recommendation);
      formData.append('publishingDateOnEnglish', book.publishingDateOnEnglish);
      formData.append('publishingDateOnRussian', book.publishingDateOnRussian);
      formData.append('publishingDateOnJapan', book.publishingDateOnJapan);
      return this.http.post(API_URL+ 'book/' +  `${collectionId}` + '/create', formData);
    } 

    updateBook(book, bookId): Observable<any> {
      const formData = new FormData();
      formData.append('name', book.name);
      formData.append('tags', book.tags);
      formData.append('cost', book.cost);
      formData.append('countOfPages', book.countOfPages);
      formData.append('weight', book.weight);
      formData.append('author', book.author);
      formData.append('genre', book.genre);
      formData.append('publisher', book.publisher);
      formData.append('itSerial', book.itSerial);
      formData.append('hasAudio', book.hasAudio);
      formData.append('hasFilm', book.hasFilm);
      formData.append('comment', book.comment);
      formData.append('summary', book.summary);
      formData.append('recommendation', book.recommendation);
      formData.append('publishingDateOnEnglish', book.publishingDateOnEnglish);
      formData.append('publishingDateOnRussian', book.publishingDateOnRussian);
      formData.append('publishingDateOnJapan', book.publishingDateOnJapan);
      return this.http.put(API_URL + 'book/' + `${bookId}`, formData);
    } 

    getBook(bookId) : Observable<any>{
      return this.http.get(API_URL+ 'book/' +`${bookId}`, {responseType : 'json'});
    }

    deleteBook(bookId): Observable<any>{
      return this.http.delete(API_URL + 'book/' + `${bookId}`);
    }

    setBookBitMask(bookId, bitMask){
      const formData = new FormData();
      formData.append('bitMask', bitMask);
      return this.http.post(API_URL+ 'book/' + `${bookId}` + '/bitMask', formData);
    }

    getItemTags(collectionType, itemId) : Observable<any>{
      return this.http.get(API_URL +`${collectionType}` + '/' + `${itemId}` , {responseType : 'json'});
    }

    like(userId, itemId, collectionType) : Observable<any>{
      return this.http.post(API_URL + `${userId}` + '/' + `${collectionType}`+ '/' + `${itemId}` +'/like',{responseType : 'json'});
    }

    unlike(userId, itemId, collectionType) : Observable<any>{
      return this.http.post(API_URL + `${userId}` + '/' + `${collectionType}`+ '/' + `${itemId}` +'/unlike',{responseType : 'json'});
    }

    getLikeStatus(userId, itemId, collectionType){
      return this.http.get(API_URL + `${userId}` + '/' + `${collectionType}`+ '/' + `${itemId}` +'/like',{responseType : 'json'});
    }

    createAlcohol(alcohol, tags, collectionId): Observable<any> {
      const formData = new FormData();
      formData.append('name', alcohol.name);
      formData.append('tags', tags);
      formData.append('cost', alcohol.cost);
      formData.append('percent', alcohol.percent);
      formData.append('volume', alcohol.volume);
      formData.append('manufacturer', alcohol.manufacturer);
      formData.append('grade', alcohol.grade);
      formData.append('manufactureCountry', alcohol.manufactureCountry);
      formData.append('hasOneLiter', alcohol.hasOneLiter);
      formData.append('hasTwoLiters', alcohol.hasTwoLiters);
      formData.append('hasFiveLiters', alcohol.hasFiveLiters);
      formData.append('comment', alcohol.comment);
      formData.append('history', alcohol.history);
      formData.append('recommendation', alcohol.recommendation);
      formData.append('manufactureDate', alcohol.manufactureDate);
      formData.append('developmentDate', alcohol.developmentDate);
      formData.append('manufactureDateInBelarus', alcohol.manufactureDateInBelarus);
      return this.http.post(API_URL+ 'alcohol/' + `${collectionId}`+ '/create', formData);
    } 

    updateAlcohol(alcohol, alcoholId): Observable<any> {
      const formData = new FormData();
      formData.append('name', alcohol.name);
      formData.append('tags', alcohol.tags);
      formData.append('cost', alcohol.cost);
      formData.append('percent', alcohol.percent);
      formData.append('volume', alcohol.volume);
      formData.append('manufacturer', alcohol.manufacturer);
      formData.append('grade', alcohol.grade);
      formData.append('manufactureCountry', alcohol.manufactureCountry);
      formData.append('hasOneLiter', alcohol.hasOneLiter);
      formData.append('hasTwoLiters', alcohol.hasTwoLiters);
      formData.append('hasFiveLiters', alcohol.hasFiveLiters);
      formData.append('comment', alcohol.comment);
      formData.append('history', alcohol.history);
      formData.append('recommendation', alcohol.recommendation);
      formData.append('manufactureDate', alcohol.manufactureDate);
      formData.append('developmentDate', alcohol.developmentDate);
      formData.append('manufactureDateInBelarus', alcohol.manufactureDateInBelarus);
      return this.http.put(API_URL + 'alcohol/' + `${alcoholId}`, formData);
    } 

    getAlcohol(alcoholId) : Observable<any>{
      return this.http.get(API_URL+ 'alcohol/' +`${alcoholId}`, {responseType : 'json'});
    }

    deleteAlcohol(alcoholId): Observable<any>{
      return this.http.delete(API_URL + 'alcohol/' + `${alcoholId}`);
    }

    setAlcoholBitMask(alcoholId, bitMask){
      const formData = new FormData();
      formData.append('bitMask', bitMask);
      return this.http.post(API_URL+ 'alcohol/' + `${alcoholId}` + '/bitMask', formData);
    }
  }