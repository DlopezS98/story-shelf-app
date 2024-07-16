import DefaultCover from '../../../assets/book-default-cover.jpg';
import IBook, { IBookIdentifier, IBookImageLinks } from "../../core/entities/book.entity";

export default class BookModel {
  id: string = '';
  kind: string = '';
  etag: string = '';
  selfLink: string = '';
  title: string = '';
  subtitle: string = '';
  authors: string[] = [];
  publisher: string = '';
  publishedDate: string = '';
  description: string = '';
  industryIdentifiers: IBookIdentifier[] = [];
  pageCount: number = 0;
  categories: string[] = [];
  imageLinks: IBookImageLinks = BookModel.initLinks();
  language: string = '';
  previewLink: string = '';
  country: string = '';
  viewability: string = '';
  epubAvailable: boolean = false;

  get thumbnail(): string {
    return this.imageLinks.thumbnail || this.imageLinks.smallThumbnail;
  }

  get image(): string {
    const url = this.imageLinks.large || this.imageLinks.medium || this.imageLinks.small || this.thumbnail;
    return !url ? DefaultCover : url;
  }

  private static initLinks(): IBookImageLinks {
    return {
      smallThumbnail: '',
      thumbnail: '',
      small: '',
      medium: '',
      large: '',
      extraLarge: ''
    };
  }

  static fromEntity(bookEntity: IBook) {
    const bookModel = new BookModel();
    bookModel.id = bookEntity.id;
    bookModel.kind = bookEntity.kind;
    bookModel.etag = bookEntity.etag;
    bookModel.selfLink = bookEntity.selfLink;
    bookModel.title = bookEntity.title;
    bookModel.subtitle = bookEntity.subtitle;
    bookModel.authors = bookEntity.authors;
    bookModel.publisher = bookEntity.publisher;
    bookModel.publishedDate = bookEntity.publishedDate;
    bookModel.description = bookEntity.description;
    bookModel.industryIdentifiers = bookEntity.industryIdentifiers;
    bookModel.pageCount = bookEntity.pageCount;
    bookModel.categories = bookEntity.categories;
    bookModel.imageLinks = bookEntity.imageLinks;
    bookModel.language = bookEntity.language;
    bookModel.previewLink = bookEntity.previewLink;
    bookModel.country = bookEntity.country;
    bookModel.viewability = bookEntity.viewability;
    bookModel.epubAvailable = bookEntity.epubAvailable;
    
    return bookModel;
  }
}