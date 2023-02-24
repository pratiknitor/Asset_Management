import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-re-table',
  templateUrl: './re-table.component.html',
  styleUrls: ['./re-table.component.css']
})
export class ReTableComponent {

  @Input() heading: string[] = [];
  @Input() data: any[] = [];
  @Input() class: string = '';
  @Input() tableSize: number = 10;
  @Output() fetch = new EventEmitter();

  page: number = 1;
  count: number = 0;

  ngOnInit(): void {}

  onTableDataChange(event: any) {
    this.page = event;
    console.log(event);
    this.fetch.emit();
  }

}
