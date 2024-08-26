import * as React from 'react';
import WishListsService from '../../core/services/wish-lists.service';
import ItemModel from '../models/item.model';
import Result from '../../core/utils/result';
import ErrorUtils from '../../core/utils/error.utils';

const wishListService = new WishListsService();

export default function useWishListItems() {
  const [result, setResult] = React.useState<Result<ItemModel[]>>(Result.success([]));
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const hasFetched = React.useRef(false);

  const handleFinally = React.useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const loadItems = React.useCallback(() => {
    setLoading(true);
    wishListService
      .getItems()
      .then((items) => setResult(Result.success(items.map(ItemModel.fromEntity))))
      .catch((e) => setResult(Result.fail(ErrorUtils.getErrorMessage(e))))
      .finally(handleFinally);
  }, [setLoading, setResult, handleFinally]);

  React.useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      loadItems();
    }
  }, [loadItems]);

  return {
    result,
    isLoading,
    loadItems,
  };
}
