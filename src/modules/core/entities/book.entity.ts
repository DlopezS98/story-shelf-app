export interface IBookImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface IBookIdentifier {
  type: string;
  identifier: string;
}

export default interface IBook {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IBookIdentifier[];
  pageCount: number;
  categories: string[];
  imageLinks: IBookImageLinks;
  language: string;
  previewLink: string;
  country: string;
  viewability: string;
  epubAvailable: boolean;
}