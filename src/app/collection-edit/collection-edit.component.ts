import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CollectionService } from '../_services/collection.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-use',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['./collection-edit.component.scss']
})
export class EditCollectionComponent implements OnInit {

  image: File;
  addedImage: File;
  form: any = {};
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  currentUser : any;
  userId : any;
  collectionType : any;
  collectionId : any;
  collection : any;
  blocked : boolean;
  constructor(private collectionService: CollectionService,
     private userService: UserService,
     private token: TokenStorageService,
     private router: Router,
     private spinner: NgxSpinnerService,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setPathVariables();
    this.getCollection();
    this.setUserStatus();
  }

  getCollection(){
    this.collectionService.getCollection(this.userId,this.collectionId, this.collectionType).subscribe(
      data => {
        this.collection = data;
      },
      err => {
        this.collection = JSON.parse(err.error).message;
      }
    );
  }

  setPathVariables(){
    this.userId = this.route.snapshot.params["userId"];
    this.collectionType = this.route.snapshot.params["collectionType"];
    this.collectionId = this.route.snapshot.params["collectionId"];
  }

  onFileChange(event) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.addedImage = evento.target.result;};
    fr.readAsDataURL(this.image);
  }

  onUpload(): void {
    this.spinner.show();
    this.form.name = this.collection.name;
    this.form.description = this.collection.description;
    this.collectionService.updateCollection(this.form, this.image, 
      this.userId, this.collectionType, this.collectionId).subscribe(
      data => {
        this.spinner.hide();
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
    this.router.navigate(['/user/'+ `${this.userId}`]);
  }

  reset(): void {
    this.image = null;
    this.addedImage = null;
  }

  isAuthorized() : boolean{
    this.currentUser = this.token.getUser();
    if(this.currentUser == null) return false;
    if(this.blocked) return false;
    if(this.currentUser.id == this.userId || this.isAdmin()) return true;
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
