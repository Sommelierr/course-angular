import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FindService } from '../_services/find.service';
@Component({
  selector: 'app-find-result',
  templateUrl: './find-result.component.html',
  styleUrls: ['./find-result.component.css']
})
export class FindResultComponent implements OnInit {

  word : string;
  items : any;
  constructor(private route : ActivatedRoute, private findService : FindService,private router : Router) { }

  ngOnInit(): void {
    this.word = this.route.snapshot.params["word"];
    this.findService.getFindResult(this.word).subscribe(
      data => {
        console.log(data == null);
        if(data != null) this.items = data;
        else this.router.navigate(['/home']);
      }
    );
  }

}
