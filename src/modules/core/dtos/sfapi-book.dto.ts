export default interface SfApiBookDto {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  industryIdentifiers: BookIndustryIdentifierDto[];
  pageCount: number;
  categories: string[];
  imageLinks: ImageLinksDto;
  language: string;
  previewLink: string;
  country: string;
  viewability: string;
  epubAvailable: boolean;
  coverUrl: string;
}

export interface BookIndustryIdentifierDto {
  type: string;
  identifier: string;
}

export interface ImageLinksDto {
  smallThumbnail: string | null;
  thumbnail: string | null;
  small: string | null;
  medium: string | null;
  large: string | null;
  extraLarge: string | null;
}
