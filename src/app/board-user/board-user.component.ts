import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  collections: any;
  currentUser: any;
  collection : any;
  userId : any;
  bc : string = 'bc';
  mc : string = 'mc';
  ac : string = 'ac';
  blocked : any;

  constructor(private userService: UserService, private token: TokenStorageService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.collections = data;
        this.blocked = this.collections.blocked;
      },
      err => {
        this.collections = JSON.parse(err.error).message;
      }
    );
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
