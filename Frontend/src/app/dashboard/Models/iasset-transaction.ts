export interface IAssetTransaction {
  userId: number;
  empId: string;
  email: string;
  userName: string;
  location: string;
  issueDate: string;
  submitDate: string | null;
  assetId: number;
  issuedBy: string;
  department: string;
}
