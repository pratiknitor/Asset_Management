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

  /**
   * Regster user
   * @param register registration details
   * @returns 
   */
  registerUser(register: IRegister): Observable<any> {
    return this.httpClient.post('/api/User', register, headers);
  }

  /**
   * Login user
   * @param login login details
   * @returns 
   */
  loginUser(login: ILogin): Observable<any> {
    return this.httpClient.post('/api/User/login', login, headers);
  }

  /**
   * Asign asset to user
   * @param obj assigned asset details
   * @returns assigned details transaction
   */
  assignAsset(obj: any): Observable<any> {
    return this.httpClient.post(
      `api/AssetTransaction/CreateAssetTransaction`,
      obj
    );
  }

  /**
   * Get vendor list
   * @returns vendor list
   */
  getVendors(): Observable<any> {
    return this.httpClient.get('api/Vendor/GetAllVender');
  }

  /**
   * Add new asset
   * @param asset asset details
   * @returns created asset
   */
  addAsset(asset: IAsset): Observable<any> {
    return this.httpClient.post(`api/AssetDetails/CreateAsset`, asset);
  }

  /**
   * Get asset list
   * @returns asset list
   */
  getAssets(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAllAssets');
  }

  /**
   * Delete asset details
   * @param value it is identity to delete specific asset like id
   * @returns updated asset list
   */
  deleteAsset(value: any): Observable<any> {
    return this.httpClient.delete(`api/AssetDetails/DeleteAsset/${value}`);
  }

  submitAsset(obj: any, id: number): Observable<any> {
    return this.httpClient.put(
      `api/AssetTransaction/UpdateAssetTransaction/${id}`,
      obj
    );
  }

  /**
   * Get users
   * @returns users list
   */
  getUserList(): Observable<any> {
    return this.httpClient.get(`api/User`);
  }

  /**
   * Get asset details by email address
   * @param email string of email address
   * @returns asset
   */
  getAssetDetailByEmail(email: string): Observable<any> {
    return this.httpClient.get(`api/AssetTransaction/get_by_email/${email}`);
  }

  /**
   * Add new vendor
   * @param vendor vendor details
   * @returns added vendor
   */
  addVendor(vendor: IVendor): Observable<any> {
    return this.httpClient.post(`api/Vendor/CrateVender`, vendor, headers);
  }

  /**
   * Delete vendor 
   * @param vendor vendor id which to delete
   * @returns updated list of vendor
   */
  deleteVender(vendor: number): Observable<any> {
    return this.httpClient.delete(`api/Vendor/DeleteVender/${vendor}`);
  }

  /**
   * Get asset transaction by id
   * @param id id of asset transaction
   * @returns asset transaction detail
   */
  getTransaction(id: number): Observable<any> {
    return this.httpClient.get(
      `api/AssetTransaction/GetAssetTransactionById/${id}`
    );
  }

  /**
   * Get assetby id
   * @param id id of asset
   * @returns asset detail
   */
  getAsset(id: any): Observable<any> {
    return this.httpClient.get(`api/AssetDetails/GetAssetById/${id}`);
  }

  /**
   * Update asset
   * @param id id of asset which need to update
   * @param asset modified asset details
   * @returns updated asset details
   */
  editAsset(id: any, asset: IAsset): Observable<any> {
    return this.httpClient.put(`api/AssetDetails/UpdateAsset/${id}`, asset);
  }

  /**
   * Store asset detail to use in any component
   * @param Asset asset detail
   */
  emitAssets(Asset: IAsset) {
    this.emitAsset.next(Asset);
  }

  /**
   * Store boolean value and use by subscribe
   * @param flag boolean value
   */
  emitFlag(flag: boolean) {
    this.emitupdateflag.next(flag);
  }

  /**
   * Get vendor details by id
   * @param id id of vendor
   * @returns vendor detail
   */
  getVendor(id: any): Observable<any> {
    return this.httpClient.get(`api/Vendor/GetVenderById/${id}`);
  }

  /**
   * Update vendor detail
   * @param id vendor id
   * @param vendor modified vendor detail
   * @returns updated vendor
   */
  editVendor(id: any, vendor: IVendor): Observable<any> {
    return this.httpClient.put(`api/Vendor/UpdateVender/${id}`, vendor);
  }

  /**
   * Store vendor detail and use by subscribe
   * @param Vendor vendor detail
   */
  emitVendors(Vendor: IVendor) {
    this.emitVendor.next(Vendor);
  }

  /**
   * Get count of all asset type
   * @returns count of each type of asset available
   */
  getAssetsCount(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAssetCount');
  }

  /**
   * Get unassigned assets
   * @returns List of unassigned assets
   */
  getUnassignedAssets(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetUnassignedAsset');
  }

  /**
   * Vendors details
   * @returns vendors name and count of his assets
   */
  getVendorsDetails(): Observable<any> {
    return this.httpClient.get('api/Vendor/GetVendorsData');
  }
}
