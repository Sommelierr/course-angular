import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemService } from '../_services/item.service';
import { CollectionService } from '../_services/collection.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
 
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isFailed = false;
  collectionId : any;
  collectionType: any;
  errorMessage = '';
  currentUser : any;
  userId : any;
  bitMask : any;
  collection : any;
  book : any;
  bookId : any;
  collectionBitMask : any;
  blocked : boolean;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[];
  allTags: string[];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private itemService: ItemService,
    private collectionService: CollectionService,
    private userService: UserService,
     private token: TokenStorageService,
     private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setPathVariables();
    this.getBook();
    this.getBookTags();
    this.getAllTags();
    this.getBookCollectionBitMask();
    this.getUserStatus();
  }

  getBook() : void{
    this.itemService.getBook(this.bookId).subscribe(
      data => {
        this.book = data;
      })
  }

  getBookTags() : void{
    this.itemService.getItemTags(this.collectionType, this.bookId).subscribe(
      data =>{this.tags = data;}
    )
  }

  getAllTags() : void {
    this.itemService.getAllTags().subscribe(
      data =>{
        this.allTags = data;
    this.filterTags();
      })
  }

  getBookCollectionBitMask() : void{
    this.collectionService.getBookCollectionBitMask(this.collectionId).subscribe(
      data => {
        this.collection = data;
        this.collectionBitMask = this.collection.bitMask;
      },
      err => {
        this.collection = JSON.parse(err.error).message;
      })
  }

  setPathVariables() : void{
    this.bookId = this.route.snapshot.params["bookId"];
    this.collectionType = this.route.snapshot.params["collectionType"];
    this.userId = this.route.snapshot.params["userId"];
    this.collectionId = this.route.snapshot.params["collectionId"];
  }

  filterTags() : void{
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

  showField(number : any): boolean{
    this.bitMask = this.collectionBitMask | this.book.bitMask;
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

  onSubmit() : void{
    this.book.tags = this.tags;
    console.log(this.book.hasFilm);
    this.itemService.updateBook(this.book, this.bookId).subscribe();
    this.router.navigate(['/user/'+ `${this.userId}` + '/' + `${this.collectionType}`  +  '/b/' + `${this.collectionId}` +'/' +
      `${this.bookId}`]);
  }

  defineValue(value : any) : any{
    if(value == undefined || value == false || value == NaN) value = false;
    else value = true;
    return value;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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

  getUserStatus(){
    if(this.currentUser == null) return;
    this.userService.getUserStatus(this.currentUser.id).subscribe(
      data => {
        this.blocked = data;
      }
    )
  }
}