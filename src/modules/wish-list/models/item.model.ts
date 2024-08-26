import WishListItem from "../../core/entities/wish-list-item.entity";

export default class ItemModel {
  private _id: string = '';
  private _bookId: string = '';
  private _bookTitle: string = '';
  private _bookCoverUrl: string = '';
  private _createdAt: Date = new Date();
  private _updatedAt: Date | null = null;
  private _createdBy: string = '';
  private _updatedBy: string | null = null;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value || '';
  }

  get bookId(): string {
    return this._bookId;
  }

  set bookId(value: string) {
    this._bookId = value || '';
  }

  get bookTitle(): string {
    return this._bookTitle;
  }

  set bookTitle(value: string) {
    this._bookTitle = value || '';
  }

  get bookCoverUrl(): string {
    return this._bookCoverUrl;
  }

  set bookCoverUrl(value: string) {
    this._bookCoverUrl = value || '';
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value || new Date();
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  set updatedAt(value: Date | null) {
    this._updatedAt = value || null;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value || '';
  }

  get updatedBy(): string | null {
    return this._updatedBy;
  }

  set updatedBy(value: string | null) {
    this._updatedBy = value || null;
  }

  static empty(): ItemModel {
    return new ItemModel();
  }

  static fromEntity(entity: WishListItem): ItemModel {
    const model = new ItemModel();
    model.id = entity.id;
    model.bookId = entity.bookId;
    model.bookTitle = entity.bookTitle;
    model.bookCoverUrl = entity.bookCoverUrl;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    model.createdBy = entity.createdBy;
    model.updatedBy = entity.updatedBy;
    return model;
  }
}
