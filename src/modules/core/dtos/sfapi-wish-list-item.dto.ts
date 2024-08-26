export default interface SfApiWishListItemDto {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCoverUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
}