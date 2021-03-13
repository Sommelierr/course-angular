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
  selector: 'app-alcohol-details',
  templateUrl: './alcohol-details.component.html',
  styleUrls: ['./alcohol-details.component.css']
})
export class AlcoholDetailsComponent implements OnInit {

  currentUser : any;
  userId : any;
  alcoholId : any;
  collectionId : any;
  alcohol : any;
  form : any = {};
  result : any = 0;
  collectionBitMask : any;
  alcoholBitMask : any;
  bitMask : any;
  collectionType : any;
  likeStatus : boolean;
  likeJson : any;
  bitMaskJson : any;
  blocked : boolean;

  constructor(
    private userService : UserService, 
    private token: TokenStorageService, 
    private route : ActivatedRoute,
    private itemService : ItemService,
    private collectionService : CollectionService,
    private router : Router
    ){};

  ngOnInit(): void {
    this.setPathVariables();
    this.currentUser = this.token.getUser();
    this.getAlcohol();
    this.getLikeStatus();
    this.getCollectionBitMask();
    this.getUserStatus();
  }

  getCollectionBitMask(){
    this.collectionService.getAlcoholCollectionBitMask(this.collectionId).subscribe(
      data => {
        this.bitMaskJson = data;
        this.collectionBitMask = this.bitMaskJson.bitMask;
      }
    )
  }

  getAlcohol(){
    this.itemService.getAlcohol(this.alcoholId).subscribe(
      data => {
        this.alcohol = data;
        this.alcoholBitMask = data.bitMask;
      },
      err => { this.alcohol = JSON.parse(err.error).message;}
    );
  }

  getLikeStatus(){
    if(this.currentUser != null){
      this.itemService.getLikeStatus(this.currentUser.id, this.alcoholId, this.collectionType).subscribe(
        data => {
          this.likeJson = data;
          this.likeStatus = this.likeJson.status;
        }
      )
    }
  }

  setPathVariables(){
    this.alcoholId = this.route.snapshot.params["alcoholId"];
    this.collectionType = this.route.snapshot.params["collectionType"];
    this.userId = this.route.snapshot.params["userId"];
    this.collectionId = this.route.snapshot.params["collectionId"];
  }


  deleteAlcohol(): void{
    this.itemService.deleteAlcohol(this.alcoholId)
    .subscribe(
      response => {
        this.router.navigate(['/user/' + `${this.userId}`]);
      },
      error => {
      });
  }

  defineBitMask(): any{
    this.result = this.defineValue(this.form.cost) + this.defineValue(this.form.percent)*2 +
      this.defineValue(this.form.volume)*2**2 + 
      this.defineValue(this.form.manufacturer)*2**3 + this.defineValue(this.form.grade)*2**4 + 
      this.defineValue(this.form.manufactureCountry)*2**5 + this.defineValue(this.form.hasOneLiter)*2**6 + 
      this.defineValue(this.form.hasTwoLiters)*2**7 + this.defineValue(this.form.hasFiveLiters)*2**8 +
      this.defineValue(this.form.comment)*2**9 + this.defineValue(this.form.history)*2**10 + 
      this.defineValue(this.form.recommendation)*2**11 + this.defineValue(this.form.manufactureDate)*2**12 + 
      this.defineValue(this.form.developmentDate)*2**13 + this.defineValue(this.form.manufactureDateInBelarus)*2**14;
      this.result = this.result | this.collectionBitMask;
      this.setBitMask();
  }

  setBitMask(): void{
    this.itemService.setAlcoholBitMask(this.alcoholId, this.result).subscribe();
    this.refresh();
  }

  refresh(){
    this.router.navigate(['/user/'+ `${this.userId}` + '/' + `${this.collectionType}` + '/a/' + `${this.collectionId}`]);
  }

  defineValue(value : any) : any{
    if(value == undefined || value == false || value == NaN) value = 0;
    else value = 1;
    return value;
  }

  showField(number : any): boolean{
    this.bitMask = this.alcoholBitMask | this.collectionBitMask;
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
    this.itemService.like(this.currentUser.id,this.alcoholId, this.collectionType).subscribe();
    this.reloadPage();
  }

  unlike(){
    this.itemService.unlike(this.currentUser.id,this.alcoholId, this.collectionType ).subscribe();
    this.reloadPage();
  }

  isLiked() : boolean{
    return this.likeStatus;
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

  isLikeable() : boolean{
  this.currentUser = this.token.getUser();
    if(this.currentUser == null) return false;
    if(this.blocked) return false;
    else return true;
  }

  isAdmin() : boolean {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }

  getUserStatus(){
    if(this.currentUser == null) return;
    this.userService.getUserStatus(this.currentUser.id).subscribe(
      data => {
        this.blocked = data;
      }
    )
  }
}
