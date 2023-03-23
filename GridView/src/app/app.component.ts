import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Post } from './Models/Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GridView';

  data: any = [];
  posts: any = [];

  @ViewChild("appendTo", { read: ViewContainerRef, static: false })
  public appendTo!: ViewContainerRef;

  constructor(
    public httpClient: HttpClient,
    public notifiService: NotificationService
  ) {}
  ngOnInit(): void {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res) => {
        this.data = res;
        // console.log(JSON.stringify(this.data))
      });

    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        this.posts = res;
        // console.log(JSON.stringify(this.data));
      });
  }
  createNewProduct() {
    return new Post();
  }
  test(myform: Post) {
    console.log(myform.id);
    console.log('first');
  }
  public show(): void {
    this.notifiService.show({
      content: "Successfully added to the list",
      hideAfter: 2000,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 400 },
      type: { style: "success", icon: true },
      width: 400,
      height: 40,
    });
}
}
