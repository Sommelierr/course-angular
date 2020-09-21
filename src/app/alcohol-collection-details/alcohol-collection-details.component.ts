import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../_services/collection.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-alcohol-collection-details',
  templateUrl: './alcohol-collection-details.component.html',
  styleUrls: ['./alcohol-collection-details.component.css']
})
export class AlcoholCollectionDetailsComponent implements OnInit {

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
    this.collectionId = this.route.snapshot.params["collectionId"];
    this.userId = this.route.snapshot.params["userId"];
    this.collectionType = this.route.snapshot.params["collectionType"];
    this.collectionService.getCollection(this.userId, this.collectionId, this.collectionType).subscribe(
      data => {
        console.log(data);
        this.collection = data;
        this.result = this.collection.bitMask;
        this.blocked = this.collection.blocked;
      },
      err => {
        this.collection = JSON.parse(err.error).message;
      }
    );
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
    this.result = this.defineValue(this.form.cost) + this.defineValue(this.form.percent)*2 +
      this.defineValue(this.form.volume)*2**2 + 
      this.defineValue(this.form.manufacturer)*2**3 + this.defineValue(this.form.grade)*2**4 + 
      this.defineValue(this.form.manufactureCountry)*2**5 + this.defineValue(this.form.hasOneLiter)*2**6 + 
      this.defineValue(this.form.hasTwoLiters)*2**7 + this.defineValue(this.form.hasFiveLiters)*2**8 +
      this.defineValue(this.form.comment)*2**9 + this.defineValue(this.form.history)*2**10 + 
      this.defineValue(this.form.recommendation)*2**11 + this.defineValue(this.form.manufactureDate)*2**12 + 
      this.defineValue(this.form.developmentDate)*2**13 + this.defineValue(this.form.manufactureDateInBelarus)*2**14;
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
