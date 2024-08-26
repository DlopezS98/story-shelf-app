import * as React from 'react';

import Result from '../../core/utils/result';
import ErrorUtils from '../../core/utils/error.utils';
import ItemModel from '../../wish-list/models/item.model';
import WishListsService from '../services/wish-lists.service';

const wishListService = new WishListsService();
export default function useAddToWishList() {
  const [result, setResult] = React.useState<Result<ItemModel>>(Result.success(ItemModel.empty()));
  const [isLoading, setLoading] = React.useState<boolean>(false);
//   const hasFetched = React.useRef(false);

  const handleFinally = React.useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const addToWishList = React.useCallback(
    (bookId: string) => {
      setLoading(true);
      wishListService
        .addItem(bookId)
        .then((value) => setResult(Result.success(ItemModel.fromEntity(value))))
        .catch((e) => setResult(Result.fail(ErrorUtils.getErrorMessage(e))))
        .finally(handleFinally);
    },
    [setLoading, setResult, handleFinally],
  );

  return {
    result,
    isLoading,
    addToWishList,
  };
}
