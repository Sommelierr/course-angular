import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FindService } from '../_services/find.service';
import { CloudData, ZoomOnHoverOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  homeData : any;
  tags : string[];
  collection : any;
  alcohol : any;
  book : any;
  cloudTags: CloudData[];
  constructor(private findService: FindService, private http: HttpClient) { }

  ngOnInit(){
    this.findService.getHome().subscribe(
      data =>{
        this.homeData = data;
        this.cloudTags = data.tags;
        this.collection = data.collection;
        this.alcohol = data.alcohol;
        this.book = data.book;
      }
    );
  }
}
