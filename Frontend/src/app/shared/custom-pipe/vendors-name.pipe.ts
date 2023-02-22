import { Pipe, PipeTransform } from '@angular/core';
import { IVendor } from 'src/app/dashboard/components/Forms/Models/ivendor';

@Pipe({
  name: 'vendorsName'
})
export class VendorsNamePipe implements PipeTransform {

  name: string = '';

  transform(value: number, vendorList: any): string {
    vendorList.forEach(( element : IVendor) => {
      if (element.id  === value) {
        this.name = element.name;
      }
    });
    return this.name;
  }

}
