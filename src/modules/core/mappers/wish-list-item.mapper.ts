import SfApiWishListItemDto from '../dtos/sfapi-wish-list-item.dto';
import WishListItem from '../entities/wish-list-item.entity';

export default class WishListItemMapper {
  static toEntity(dto: SfApiWishListItemDto): WishListItem {
    return {
      id: dto.id,
      bookId: dto.bookId,
      bookTitle: dto.bookTitle,
      bookCoverUrl: dto.bookCoverUrl,
      createdAt: new Date(dto.createdAt),
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null,
      createdBy: dto.createdBy,
      updatedBy: dto.updatedBy || null,
    };
  }
}
