import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAsset } from '../dashboard/Models/iasset';
import { IAssetTransaction } from '../dashboard/Models/iasset-transaction';
import { IVendor } from '../dashboard/Models/ivendor';
import { ILogin } from '../users/models/ilogin';
import { IRegister } from '../users/models/iregister';

const headers = { headers: { 'Content-Type': 'application/json' } };

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  emitAsset = new Subject<IAsset>();
  emitupdateflag = new Subject<boolean>();
  emitTransaction = new Subject<IAssetTransaction>();
  public subject = new Subject<any>();
  public errorSubject = new Subject<string>();
  emitVendor = new Subject<IVendor>();

  constructor(private httpClient: HttpClient) {}

  registerUser(register: IRegister): Observable<any> {
    return this.httpClient.post('/api/User', register, headers);
  }

  loginUser(login: ILogin): Observable<any> {
    return this.httpClient.post('/api/User/login', login, headers);
  }

  assignAsset(obj: any): Observable<any> {
    return this.httpClient.post(
      `api/AssetTransaction/CreateAssetTransaction`,
      obj
    );
  }

  getVendors(): Observable<any> {
    return this.httpClient.get('api/Vendor');
  }

  addAsset(asset: IAsset): Observable<any> {
    return this.httpClient.post(`api/AssetDetails/CreateAsset`, asset);
  }

  getAssets(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAllAssets');
  }

  deleteAsset(value: any): Observable<any> {
    return this.httpClient.delete(`api/AssetDetails/DeleteAsset/${value}`);
  }
  submitAsset(obj: any, id: number): Observable<any> {
    return this.httpClient.put(
      `api/AssetTransaction/UpdateAssetTransaction/${id}`,
      obj
    );
  }

  getUserList(): Observable<any> {
    return this.httpClient.get(`api/User`);
  }

  getAssetDetailByEmail(email: string): Observable<any> {
    return this.httpClient.get(`api/AssetTransaction/get_by_email/${email}`);
  }

  addVendor(vendor: IVendor): Observable<any> {
    return this.httpClient.post(`api/Vendor`, vendor, headers);
  }

  deleteVender(vendor: number): Observable<any> {
    return this.httpClient.delete(`api/Vendor/${vendor}`);
  }

  getTransaction(id: number): Observable<any> {
    return this.httpClient.get(
      `api/AssetTransaction/GetAssetTransactionById/${id}`
    );
  }

  getAsset(id: any): Observable<any> {
    return this.httpClient.get(`api/AssetDetails/GetAssetById/${id}`);
  }

  editAsset(id: any, asset: IAsset): Observable<any> {
    return this.httpClient.put(`api/AssetDetails/UpdateAsset/${id}`, asset);
  }

  emitAssets(Asset: IAsset) {
    this.emitAsset.next(Asset);
  }

  emitFlag(flag: boolean) {
    this.emitupdateflag.next(flag);
  }

  getVendor(id: any): Observable<any> {
    return this.httpClient.get(`api/Vendor/${id}`);
  }

  editVendor(id: any, vendor: IVendor): Observable<any> {
    return this.httpClient.put(`api/Vendor/${id}`, vendor);
  }

  emitVendors(Vendor: IVendor) {
    this.emitVendor.next(Vendor);
  }

  getAssetsCount(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAssetCount');
  }
}
