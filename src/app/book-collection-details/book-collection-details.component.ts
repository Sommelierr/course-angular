import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../_services/collection.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-book-collection-details',
  templateUrl: './book-collection-details.component.html',
  styleUrls: ['./book-collection-details.component.css']
})
export class BookCollectionDetailsComponent implements OnInit {

  currentUser : any;
  userId : any;
  collectionId : any;
  collection : any;
  collectionType : any;
  form : any = {};
  result : any = 0;
  blocked : any;

  constructor(
    private userService : UserService, 
    private token: TokenStorageService, 
    private route : ActivatedRoute,
    private collectionService : CollectionService,
    private router : Router
    ){};

  ngOnInit(): void {
    this.setPathVariables();
    this.getCollection();
  }

  getCollection() : void{
    this.collectionService.getCollection(this.userId, this.collectionId, this.collectionType).subscribe(
      data => {
        this.collection = data;
        this.result = this.collection.bitMask;
        this.blocked = this.collection.blocked;
      },
      err => {
        this.collection = JSON.parse(err.error).message;
      }
    );
  }

  setPathVariables() : void{
    this.collectionId = this.route.snapshot.params["collectionId"];
    this.userId = this.route.snapshot.params["userId"];
    this.collectionType = this.route.snapshot.params["collectionType"];
  }

  deleteCollection(): void{
    this.collectionService.delete(this.userId, this.collectionId, this.collectionType)
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
      this.setBitMask();
  }

  setBitMask(): void{
    this.collectionService.setCollectionBitMask(this.result,this.userId,this.collectionId,this.collectionType).subscribe();
  }

  defineValue(value : any) : any{
    if(value == undefined || value == false || value == NaN) value = 0;
    else value = 1;
    return value;
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
}
