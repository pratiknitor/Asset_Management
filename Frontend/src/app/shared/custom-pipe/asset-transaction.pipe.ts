import { Pipe, PipeTransform } from '@angular/core';
import { IAssetTransaction } from 'src/app/dashboard/Models/iasset-transaction';

@Pipe({
  name: 'assetTransaction'
})
export class AssetTransactionPipe implements PipeTransform {

  name: string = '';

  transform(value: number, assetTransaction: any): string {
    assetTransaction.forEach(( element : any) => {
      if (element.assetId  === value) {
        this.name = element.empId;
      }
    });
    return this.name;
  }

}
