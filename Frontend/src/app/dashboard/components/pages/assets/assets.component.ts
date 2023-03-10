
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { filter, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../../../Models/iasset';
import { IVendor } from '../../../Models/ivendor';

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
  sort: any[] =[];//for sorted data store
  myset = new Set();//create a new set for dropdown
  myTypes = new Set()//create a new set for dropdown of type
  selectModel : string = '';
  selectType : string = '';
  searchText! : string;
  @ViewChild('searchString') search! : ElementRef;
  vendors!: IVendor;


  headingArray = ['id', 'tyape', 'name', 'proprietary', 'configuration', 'serviceTag', 'model', 'hostName', 'oem', 'expiryDate', 'owner', 'remarks', 'ram', 'vendorId'];
  assetList: any[] = [];
  tableSize = 2;
  classStyle: string = 'table tableScroll';

  ngOnInit(): void {
    this.dashboardService.GetAssets().subscribe((res) => {
      this.assets = res;
      this.assetList = res;
      console.log(this.assetList)
      //for dropdown list of model
      for (let i = 0; i < this.assets.length; i++) {
        console.log(this.assets[i].model);
        if(!this.myset.has(this.assets[i].model))
        {
          this.myset.add(this.assets[i].model);
        }
      }
      //for dropdown list of Type
      for (let i = 0; i < this.assets.length; i++) {
        console.log(this.assets[i].tyape);
        if(!this.myTypes.has(this.assets[i].tyape))
        {
          this.myTypes.add(this.assets[i].tyape);
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
    console.log('in onChanges'+changes);
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
    if(confirm("Are u sure to delete")){
    this.dashboardService.DeleteAsset(value).subscribe((res) => {
      console.log(JSON.stringify(res));
      this.assets = res;
      this.ngOnInit();
    });
  }
  }


  sortByType(){
    this.dashboardService.GetAssets().subscribe((res) => {
      this.assetList = [];
      this.assets = res;
      this.selectModel = "All";
      
      console.log("In Sort Type (Before Sorting)"+JSON.stringify(this.assets));
      console.log("Dropdown Value of Type = "+this.selectType);
      //use filters
      let x = from(this.assets) 
      .pipe(filter(assetsFlter => assetsFlter.tyape.toLowerCase() === this.selectType.toLowerCase()));
      console.log("x Value = "+JSON.stringify(x));
      //subscribe to pipe of filter
      x.subscribe((result) => {
        console.log("In Sort Type (after Sorting)"+JSON.stringify(result));
        this.assetList.push(result);
      });
      console.log("In Sort Type array"+JSON.stringify(this.assetList));
      this.assets = this.assetList;
      if(this.selectType.toLowerCase()==="all"||this.selectType==="")
      {
        this.assets = res;
        this.assetList = res;
        console.log(this.assetList);
        //we cant break subscribe in between so if condition is in last
      }
    });
  }

  sortByModel(){
    this.dashboardService.GetAssets().subscribe((res) => {
      this.sort = [];
      this.assets = this.assetList;
      
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
        this.assets = this.assetList;
        //we cant break subscribe in between so if condition is in last
      }
    });
  }

  searchBox(){
    console.log(this.search.nativeElement.value);
    this.selectModel = this.search.nativeElement.value;
    this.sortByModel();
  }


}
