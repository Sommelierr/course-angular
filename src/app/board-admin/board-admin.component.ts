import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users : any;
  form : any = {};
  selectedOptions : any;
  currentUser : any;
  blocked : any;


  constructor(private adminService: AdminService, 
              private userService: UserService, 
              private token : TokenStorageService,
              private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser == null) this.router.navigate(['/home']);
    this.setUserStatus();
    if(this.isAdmin() && !this.blocked){
    this.adminService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
    }
    else this.router.navigate(['/home']);
  }

  block(){
    var checkedIDs = this.defineCheckIds();
    this.adminService.block(checkedIDs).subscribe();
    this.reloadPage();
  }

  unblock(){
    var checkedIDs = this.defineCheckIds();
    this.adminService.unblock(checkedIDs).subscribe();
    this.reloadPage();
  }

  delete(){
    var checkedIDs = this.defineCheckIds();
    this.adminService.delete(checkedIDs).subscribe();
    this.reloadPage();
  }

  setRoleAdmin(){
    var checkedIDs = this.defineCheckIds();
    this.adminService.setRoleAdmin(checkedIDs).subscribe();
    this.reloadPage();
  }


  defineCheckIds() : any{
    var checkedIDs = [];
    Object.keys(this.users).forEach(key => {
      if(this.users[key].checked) checkedIDs.push(this.users[key].id);
  })
  return checkedIDs;  
}

reloadPage() : void{
    window.location.reload();
}

isAdmin() : boolean {
  if(this.blocked) return false;
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
