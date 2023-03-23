import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {

  /**
   * Set how many years of company is completed
   */
  today: Date = new Date();
  years: number = this.today.getFullYear()-2006;
  
}
