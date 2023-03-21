import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { filter, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../../../Models/iasset';
import { IVendor } from '../../../Models/ivendor';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit, OnChanges {
  assets: any[] = [];
  sort: any[] = []; //for sorted data store
  myset = new Set(); //create a new set for dropdown
  myTypes = new Set(); //create a new set for dropdown of type
  selectModel: string = '';
  selectType: string = '';
  searchText!: string;
  @ViewChild('searchString') search!: ElementRef;
  vendors!: IVendor;
  readioSelected: any = null;

  headingArray = [
    'id',
    'tyape',
    'name',
    'proprietary',
    'configuration',
    'serviceTag',
    'model',
    'hostName',
    'oem',
    'expiryDate',
    'owner',
    'remarks',
    'ram',
    'vendorId',
  ];
  assetList: any[] = [];
  tableSize = 2;
  classStyle: string = 'table tableScroll';

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private confirmService: NgConfirmService
  ) {}

  ngOnInit(): void {
    this.readioSelected = null;
    this.dashboardService.getAssets().subscribe((res) => {
      this.assets = res;
      this.assetList = res;
      //for dropdown list of model
      for (let i = 0; i < this.assets.length; i++) {
        if (!this.myset.has(this.assets[i].model)) {
          this.myset.add(this.assets[i].model);
        }
      }
      //for dropdown list of Type
      for (let i = 0; i < this.assets.length; i++) {
        if (!this.myTypes.has(this.assets[i].tyape)) {
          this.myTypes.add(this.assets[i].tyape);
        }
      }
    });

    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dashboardService.getAssets().subscribe((res) => {
      this.assets = res;
    });
  }

  sortByType() {
    this.dashboardService.getAssets().subscribe((res) => {
      this.assetList = [];
      this.assets = res;
      this.selectModel = 'All';
      //use filters
      let x = from(this.assets).pipe(
        filter(
          (assetsFlter) =>
            assetsFlter.tyape.toLowerCase() === this.selectType.toLowerCase()
        )
      );
      //subscribe to pipe of filter
      x.subscribe((result) => {
        this.assetList.push(result);
      });
      this.assets = this.assetList;
      if (this.selectType.toLowerCase() === 'all' || this.selectType === '') {
        this.assets = res;
        this.assetList = res;
        //we cant break subscribe in between so if condition is in last
      }
    });
  }

  sortByModel() {
    this.dashboardService.getAssets().subscribe((res) => {
      this.sort = [];
      this.assets = this.assetList;
      //use filters
      let x = from(this.assets).pipe(
        filter(
          (assetsFlter) =>
            assetsFlter.model.toLowerCase() === this.selectModel.toLowerCase()
        )
      );
      //subscribe to pipe of filter
      x.subscribe((result) => {
        this.sort.push(result);
      });
      this.assets = this.sort;
      if (this.selectModel.toLowerCase() === 'all' || this.selectModel === '') {
        this.assets = this.assetList;
        //we cant break subscribe in between so if condition is in last
      }
    });
  }

  searchBox() {
    this.selectModel = this.search.nativeElement.value;
    this.sortByModel();
  }

  editAsset() {
    if (this.readioSelected == null) {
      alert('Please select an asset first!!!!');
    } else {
      var id = this.readioSelected;
      this.router.navigate(['/dashboard/edit-asset', id]);
    }
  }

  deleteAsset() {
    if (this.readioSelected == null) {
      alert('Please select an asset first!!!!');
    } else {
      this.confirmService.showConfirm(
        'Are you sure want to Delete?',
        () => {
          this.dashboardService
            .deleteAsset(this.readioSelected)
            .subscribe((res) => {
              this.readioSelected = null;
              this.assets = res;
            });
        },
        () => {}
      );
    }
  }
}
