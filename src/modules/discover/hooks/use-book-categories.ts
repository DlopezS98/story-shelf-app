import React from "react";
import BooksService from "../../core/services/books.service";
import ICategory from "../../core/entities/category.entity";

const booksService = new BooksService();

export default function useBookCategories() {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    setLoading(true);
    booksService.getCategories()
      .then((categories: ICategory[]) => {
        setCategories(categories);
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => setLoading(false))
  }, []);

  return { isLoading, categories };
}