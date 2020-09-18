import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CollectionService } from '../_services/collection.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-use',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  image: File;
  imagenMin: File;
  form: any = {};
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  currentUser : any;
  userId : any;
  constructor(private collectionService: CollectionService,
     private token: TokenStorageService,
     private router: Router,
     private spinner: NgxSpinnerService,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.currentUser = this.token.getUser();
    this.collectionService.getCollectionCreaterForm(this.userId).subscribe();
  }

  onFileChange(event) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.image);
  }

  onUpload(): void {
    this.spinner.show();
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
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }

  isAuthorized() : boolean{
    this.currentUser = this.token.getUser();
    if(this.currentUser == null) return false;
    if(this.currentUser.id == this.userId || this.isAdmin()) return true;
    else return false;
  }

  isAdmin() : void {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }

}