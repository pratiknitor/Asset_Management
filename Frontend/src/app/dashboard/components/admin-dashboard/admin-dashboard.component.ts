import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit,AfterViewInit {

  error : any = {};
  errorMessage! : string;
  constructor(private service:ApplicationService){}
  ngAfterViewInit(): void {
    console.log(this.errorMessage)
  }

  ngOnInit(): void {
    // this.service.errorSubject.subscribe(
    //   (res) => {
    //     console.log(JSON.stringify(res));
    //     this.error = res;
    //     console.log(JSON.stringify(this.error.statusText));
    //     this.errorMessage = this.error.statusText;
    //   }
    // )
  }

  ionViewWillLoad(){
    this.service.errorSubject.subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.error = res;
        console.log(JSON.stringify(this.error.statusText));
        this.errorMessage = this.error.statusText;
      }
    )
  }


}
