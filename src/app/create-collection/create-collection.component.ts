import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { CollectionService } from '../_services/collection.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {

  image: File;
  addedImage: File;
  form: any = {};
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  currentUser : any;
  userId : any;
  blocked : boolean;
  constructor(
     private collectionService: CollectionService,
     private token: TokenStorageService,
     private router: Router,
     private spinner: NgxSpinnerService,
     private route: ActivatedRoute,
     private userService : UserService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.currentUser = this.token.getUser();
    this.setUserStatus();
  }

  onFileChange(event) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (event: any) => {
      this.addedImage = event.target.result;
    };
    fr.readAsDataURL(this.image);
  }

  onUpload(): void {
    this.spinner.show();
    if(this.image == undefined) this.image = null;
    this.collectionService.createCollection(this.form, this.image, this.userId).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/user/'+ `${this.userId}`]);
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  reset(): void {
    this.image = null;
    this.addedImage = null;
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
