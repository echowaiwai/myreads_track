import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

class BookCategory extends Component {

    static propTypes = {
        bookShelf: PropTypes.array.isRequired,
        bookLists: PropTypes.array.isRequired,
        handleMoveBook: PropTypes.func.isRequired
    };

    render() {

        const {bookShelf, bookLists, handleMoveBook} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    {
                        bookShelf.map((oneBookShelf, index) => (
                            <div className="bookshelf" key={index}>
                                <h2 className="bookshelf-title">{oneBookShelf}</h2>
                                <Book
                                    bookLists={bookLists}
                                    oneBookShelf={oneBookShelf}
                                    handleMoveBook={handleMoveBook}
                                />
                            </div>
                        ))
                    }
                </div>

                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookCategory