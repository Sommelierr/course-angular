import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../_services/item.service';
import { CollectionService } from '../_services/collection.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  currentUser : any;
  userId : any;
  bookId : any;
  collectionId : any;
  book : any;
  form : any = {};
  result : any = 0;
  collectionBitMask : any;
  bookBitMask : any;
  bitMask : any;
  collectionType : any;
  likeStatus : boolean;
  likeJson : any;
  bitMaskJson : any;
  blocked : boolean;
  tags : string[];

  constructor(
    private userService : UserService, 
    private token: TokenStorageService, 
    private route : ActivatedRoute,
    private itemService : ItemService,
    private collectionService : CollectionService,
    private router : Router
    ){};

  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    if(this.currentUser != null){
    this.setPathVariables();
    this.getLikeStatus();
    this.itemService.getBook(this.bookId).subscribe(
      data => {
        this.book = data;
        this.bookBitMask = this.book.bitMask;
        this.tags  = data.tags;
      },
      err => { this.book = JSON.parse(err.error).message;}
    );
    this.collectionService.getBookCollectionBitMask(this.collectionId).subscribe(
        data => {
          this.bitMaskJson = data;
          this.collectionBitMask = this.bitMaskJson.bitMask;
        }
    )
    this.setUserStatus();
  }
}

  getLikeStatus() : void{
    this.itemService.getLikeStatus(this.currentUser.id, this.bookId, this.collectionType).subscribe(
      data => {
        this.likeJson = data;
        this.likeStatus = this.likeJson.status;
      }
    )
    }

  setPathVariables() : void{
    this.bookId = this.route.snapshot.params["bookId"];
    this.collectionType = this.route.snapshot.params["collectionType"];
    this.userId = this.route.snapshot.params["userId"];
    this.collectionId = this.route.snapshot.params["collectionId"];
  }

  deleteBook(): void{
    this.itemService.deleteBook(this.bookId)
    .subscribe(
      response => {
        this.router.navigate(['/user/' + `${this.userId}`]);
      },
      error => {
      });
  }

  defineBitMask(): any{
    this.result = this.defineValue(this.form.cost) + this.defineValue(this.form.countOfPages)*2 +
      this.defineValue(this.form.weight)*2**2 + 
      this.defineValue(this.form.author)*2**3 + this.defineValue(this.form.genre)*2**4 + 
      this.defineValue(this.form.publisher)*2**5 + this.defineValue(this.form.isSerial)*2**6 + 
      this.defineValue(this.form.hasAudio)*2**7 + this.defineValue(this.form.hasFilm)*2**8 +
      this.defineValue(this.form.comment)*2**9 + this.defineValue(this.form.summary)*2**10 + 
      this.defineValue(this.form.recommendation)*2**11 + this.defineValue(this.form.publishingDateOnEnglish)*2**12 + 
      this.defineValue(this.form.publishingDateOnRussian)*2**13 + this.defineValue(this.form.publishingDateOnJapan)*2**14;
      this.result = this.result | this.collectionBitMask;
      this.setBitMask();
  }

  setBitMask(): void{
    this.itemService.setBookBitMask(this.bookId, this.result).subscribe();
    this.refresh();
  }

  refresh(){
    this.router.navigate(['/user/'+ `${this.userId}` + '/' + `${this.collectionType}` + '/b/' + `${this.collectionId}`]);
  }

  defineValue(value : any) : any{
    if(value == undefined || value == false || value == NaN) value = 0;
    else value = 1;
    return value;
  }

  showField(number : any): boolean{
    this.bitMask = this.bookBitMask | this.collectionBitMask;
    if(number == 1)  return (this.bitMask & 1) == 1;
    if(number == 2)  return (this.bitMask & 2) == 2;
    if(number == 4)  return (this.bitMask & 4) == 4;
    if(number == 8)  return (this.bitMask & 8) == 8;
    if(number == 16) return (this.bitMask & 16) == 16;
    if(number == 32) return (this.bitMask & 32) == 32;
    if(number == 64) return (this.bitMask & 64) == 64;
    if(number == 128) return  (this.bitMask & 128) == 128;
    if(number == 256) return (this.bitMask & 256) == 256;
    if(number == 512) return (this.bitMask & 512) == 512;
    if(number == 1024) return (this.bitMask & 1024) == 1024;
    if(number == 2048) return (this.bitMask & 2048) == 2048;
    if(number == 4096) return (this.bitMask & 4096) == 4096;
    if(number == 8192) return (this.bitMask & 8192) == 8192;
    if(number == 16384) return (this.bitMask & 16384) == 16384;
  }

  like(){
    this.itemService.like(this.currentUser.id,this.bookId, this.collectionType ).subscribe();
    this.reloadPage();
  }

  unlike(){
    this.itemService.unlike(this.currentUser.id,this.bookId, this.collectionType ).subscribe();
    this.reloadPage();
  }

  isLiked() : boolean{
    return this.likeStatus;
  }

    isLikeable() : boolean{
    this.currentUser = this.token.getUser();
    if(this.currentUser == null) return false;
    if(this.blocked) return false;
    else return true;
  }

  reloadPage(): void {
    window.location.reload();
  }

  isAuthorized() : boolean{
    this.currentUser = this.token.getUser();
    if(this.currentUser == null) return false;
    if(this.isAdmin()) return true;
    if(this.blocked) return false;
    if(this.currentUser.id == this.userId) return true;
    else return false;
  }

  isAdmin() : boolean {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }

  setUserStatus(){
    if(this.currentUser == null) return;
    this.userService.getUserStatus(this.currentUser.id).subscribe(
      data => {
        this.blocked = data;
      }
    )
  }
}
