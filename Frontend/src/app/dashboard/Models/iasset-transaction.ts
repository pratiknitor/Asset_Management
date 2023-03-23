export interface IAssetTransaction {
  userId: number;
  empId: string;
  email: string;
  userName: string;
  location: string;
  issueDate: string;
  submitDate: string | null;
  assetId: number | null;
  issuedBy: string;
  department: string;
}
