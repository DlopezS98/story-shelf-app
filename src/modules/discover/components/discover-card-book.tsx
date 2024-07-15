import React from "react";
import BookModel from "../../books/models/book.model";

export interface DiscoverCardBookProps {
  book: BookModel;
  onBookClick: (book: BookModel) => void;
}

const DiscoverCardBook: React.FC<DiscoverCardBookProps> = (props) => {

  const { book, onBookClick } = props;

  return (
    <div className="card">
      <img src={book.image} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.authors}</p>
        <button className="btn btn-primary" onClick={() => onBookClick(book)}>View</button>
      </div>
    </div>
  );
};

export default DiscoverCardBook;