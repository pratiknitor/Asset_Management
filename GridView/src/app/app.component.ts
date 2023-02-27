import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GridView';

  data : any = [];

  constructor(public httpClient:HttpClient){}
  ngOnInit(): void {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users')
    .subscribe(
      (res) => {
        this.data = res
        // console.log(JSON.stringify(this.data))
      }
    )
  }
;

  

}
