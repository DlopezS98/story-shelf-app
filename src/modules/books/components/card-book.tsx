import BookModel from "../models/book.model";

export interface ICardBookProps {
  bookModel: BookModel;
}

const CardBook: React.FC<ICardBookProps> = (props) => {
  const { bookModel } = props;

  return (
    <div>
      {bookModel.title}
    </div>
  );
};

export default CardBook;