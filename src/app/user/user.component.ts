import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-use',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  content: string;

  ngOnInit(): void {
  }
}
