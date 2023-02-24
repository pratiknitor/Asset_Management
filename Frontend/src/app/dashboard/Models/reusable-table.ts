export interface Columns {
    columnDef: string;
    header: string;
    cell: Function;
    isLink?: boolean;
    url?: string;
  }