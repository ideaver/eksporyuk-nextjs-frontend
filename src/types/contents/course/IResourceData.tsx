export interface IResourceData {
  id: string;
  title: string;
  description: string;
  files: {
    fileUrl: string;
    fileName: string;
  }[];
}
