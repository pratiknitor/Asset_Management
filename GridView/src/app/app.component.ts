import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from './Models/Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GridView';

  data : any = [];
  posts : any = [];

  constructor(public httpClient:HttpClient){}
  ngOnInit(): void {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users')
    .subscribe(
      (res) => {
        this.data = res;
        // console.log(JSON.stringify(this.data))
      }
    );

    this.httpClient.get('https://jsonplaceholder.typicode.com/posts')
    .subscribe(
      (res) => {
        this.posts = res;
        // console.log(JSON.stringify(this.data));
      }
    )
  }
;

createNewProduct(){
  return new Post();
}
test(myform : Post) {
  console.log(myform.id)
  console.log("first")
}

}
