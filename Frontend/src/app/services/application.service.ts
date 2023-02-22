import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAsset } from '../dashboard/components/Forms/Models/iasset';
import { IAssetTransaction } from '../dashboard/components/Forms/Models/iasset-transaction';
import { IVendor } from '../dashboard/components/Forms/Models/ivendor';
import { ILogin } from '../users/models/ilogin';
import { IRegister } from '../users/models/iregister';


const headers = { headers: { 'Content-Type': 'application/json' } };

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) {}

  public subject = new Subject<any>();

  registerUser(register: IRegister): Observable<any> {
    return this.httpClient.post('/api/User', register, headers);
  }

  loginUser(login: ILogin): Observable<any> {
    console.log('login');
    return this.httpClient.post('/api/User/login', login, headers);
  }

  assignAsset(obj: any) {
    console.log('Inside assignAsset');
    return this.httpClient.post(`api/AssetTransaction`, obj);
  }

  GetVendors(): Observable<any> {
    return this.httpClient.get('api/Vendor');
  }

  AddAsset(asset: IAsset): Observable<any> {
    return this.httpClient.post(`api/AssetDetails/CreateAsset`, asset);
  }

  GetAssets(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAllAssets');
  }

  DeleteAsset(value: any): Observable<any> {
    return this.httpClient.delete(`api/AssetDetails/DeleteAsset/${value}`);
  }
  submitAsset(obj: any, id: number) {
    console.log('Inside submitAsset');
    return this.httpClient.put(`api/AssetTransaction/${id}`, obj);
  }
  getUserList() {
    return this.httpClient.get(`api/User`);
  }
  getAssetDetailByEmail(email: string) {
    return this.httpClient.get(`api/AssetTransaction/get_by_email/${email}`);
  }

  AddVendor(vendor: IVendor): Observable<any> {
    return this.httpClient.post(`api/Vendor`, vendor, headers);
  }

  DeleteVender(vendor: number): Observable<any> {
    return this.httpClient.delete(`api/Vendor/${vendor}`);
  }

  GetTransaction(id: number): Observable<any> {
   return this.httpClient.get(`api/AssetTransaction/GetAssetTransactionById/${id}`);}

  GetAsset(id: any): Observable<any> {
     return this.httpClient.get(`api/AssetDetails/GetAssetById/${id}`); }

     EditAsset(id: any, asset: IAsset): Observable<any> {
       return this.httpClient.put(`api/AssetDetails/UpdateAsset/${id}`, asset); }
emitAsset = new Subject<IAsset>();
 emitupdateflag = new Subject<boolean>();
  emitTransaction = new Subject<IAssetTransaction>();
 EmitAsset(Asset: IAsset){
   console.log('emitting asset');
   console.log(Asset);
   this.emitAsset.next(Asset);
  }
  
  EmitFlag(flag: boolean) {
  this.emitupdateflag.next(flag);
 }


}
