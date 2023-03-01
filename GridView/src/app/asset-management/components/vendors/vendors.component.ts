import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAsset } from 'src/app/Models/iasset';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  assets: any = [];
  constructor(public httpClient:HttpClient){}
  ngOnInit(): void {
    this.httpClient.get('api/AssetDetails/GetAllAssets')
    .subscribe(
      (res) => {
        this.assets = res;
        //console.log(JSON.stringify(this.assets))
      }
    );
  }

  ceateNewAsset(){
    return new IAsset();
  }

  addAsset(data : IAsset){
    // console.log(data);
    this.httpClient.post(`api/AssetDetails/CreateAsset`, data).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  deleteAsset(id : number){
    this.httpClient.delete(`api/AssetDetails/DeleteAsset/${id}`).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  editAsset(asset : IAsset){
    console.log(asset)
    this.httpClient.put(`api/AssetDetails/UpdateAsset/${asset.id}`, asset).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }
}
