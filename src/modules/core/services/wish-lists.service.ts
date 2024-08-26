import Environment from '../../../config/environment';
import SfApiWishListItemDto from '../dtos/sfapi-wish-list-item.dto';
import WishListItem from '../entities/wish-list-item.entity';
import WishListItemMapper from '../mappers/wish-list-item.mapper';

export default class WishListsService {
  private readonly environment = Environment.getInstance();
  private readonly baseUrl = `${this.environment.baseApiUrl}/${this.environment.wishListEndpoint}`;

  async getItems(): Promise<WishListItem[]> {
    const httpResponse = await fetch(this.baseUrl);
    const items = (await httpResponse.json()) as SfApiWishListItemDto[];
    return items.map(WishListItemMapper.toEntity);
  }

  async addItem(bookId: string): Promise<WishListItem> {
    const url = `${this.baseUrl}/${bookId}`;
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found');
      }

      if (response.status === 409) {
        throw new Error('Book already in wish list');
      }

      throw new Error('Failed to add book to wish list');
    }

    const item = (await response.json()) as SfApiWishListItemDto;
    return WishListItemMapper.toEntity(item);
  }

  async removeItem(id: string): Promise<WishListItem> {
    const url = `${this.baseUrl}/${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found');
      }

      throw new Error('Failed to remove book from wish list');
    }

    const item = (await response.json()) as SfApiWishListItemDto;
    return WishListItemMapper.toEntity(item);
  }
}
