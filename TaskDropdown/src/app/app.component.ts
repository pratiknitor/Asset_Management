import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Test } from './Models/Test';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TaskDropdown';

  public listItems: Array<string> = [
    'Maharashtra',
    'Andhra Pradesh',
    'Karnataka',
    'Punjab',
    'Rajasthan',
    'Goa',
  ];

  myForm = this.fb.group({
    name: ['', Validators.required],
    einNumber: [''],
    licenceNumber: [''],
    state: [''],
  });

  list: Test[] = [];
  temp: any;
  constructor(private fb: FormBuilder) {}

  addInList() {
    this.temp = this.myForm.value;
    if (this.temp.licenceNumber == null || this.temp.licenceNumber == '') {
      this.temp.state = null;
    }
    this.list.push(this.temp);
  }

  clearForm() {
    this.myForm.reset();
    console.log(this.myForm.value);
  }
}
