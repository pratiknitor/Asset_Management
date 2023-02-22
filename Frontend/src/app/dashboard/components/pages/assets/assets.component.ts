
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { filter, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../../Forms/Models/iasset';
import { IVendor } from '../../Forms/Models/ivendor';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit, OnChanges {
  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}

  assets: any[] =[];
  sort: any[] =[];
  myset = new Set();
  selectModel : string = '';
  searchText! : string;
  @ViewChild('searchString') search! : ElementRef;
  vendors!: IVendor;


  

  ngOnInit(): void {
    this.dashboardService.GetAssets().subscribe((res) => {
      this.assets = res;
      for (let i = 0; i < this.assets.length; i++) {
        console.log(this.assets[i].model);
        //this.dropdown.push(this.assets[i].model);
        if(!this.myset.has(this.assets[i].model))
        {
          this.myset.add(this.assets[i].model);
        }
      }
    });

    this.dashboardService.GetVendors().subscribe(
      (res) => {
        this.vendors = res
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('in onChanges');
    this.dashboardService.GetAssets().subscribe((res) => {
      this.assets = res;
      
    });
  }
  
  EditAsset(data : number){
    console.log(data + " : "+JSON.stringify(data));
    this.dashboardService.GetAsset(data).subscribe((res:IAsset) => {
      this.dashboardService.EmitAsset(res);
      this.dashboardService.EmitFlag(true);
    });
    this.router.navigate(['/dashboard/AddAsset']);
  }

  DeleteAsset(value: any): void {
    console.log(value);
    this.dashboardService.DeleteAsset(value).subscribe((res) => {
      console.log(JSON.stringify(res));
      this.assets = res;
    });
  }

  sortByModel(){
    this.dashboardService.GetAssets().subscribe((res) => {
      this.sort = [];
      this.assets = res;
      
      console.log("In Sort (Before Sorting)"+JSON.stringify(this.assets));
      console.log("Dropdown Value = "+this.selectModel);
      //use filters
      let x = from(this.assets) 
      .pipe(filter(assetsFlter => assetsFlter.model.toLowerCase() === this.selectModel.toLowerCase()));
      console.log("x Value = "+JSON.stringify(x));
      //subscribe to pipe of filter
      x.subscribe((result) => {
        console.log("In Sort (after Sorting)"+JSON.stringify(result));
        this.sort.push(result);
      });
      console.log("In Sort array"+JSON.stringify(this.sort));
      this.assets = this.sort;
      if(this.selectModel.toLowerCase()==="all"||this.selectModel==="")
      {
        this.assets = res;
      }
    });
  }

  searchBox(){
    console.log(this.search.nativeElement.value);
    this.selectModel = this.search.nativeElement.value;
    this.sortByModel();
  }


}
