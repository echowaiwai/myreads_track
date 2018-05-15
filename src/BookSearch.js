import React, {Component} from 'react'
import './App.css'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class BookSearch extends Component {

    state = {
        searchStr: '',
        bookLists: []
    };

    changeSearchStr = (searchStr) => {
        if (!searchStr) {
            this.setState({searchString: '', booksData: []})
        } else {
            this.setState({searchStr: searchStr.trim()});
            BooksAPI.search(searchStr).then((bookLists) => {
                if (bookLists.error) {
                    bookLists = [];
                }
                bookLists.map(book => (this.props.bookLists.filter((oneShelfBook) => oneShelfBook.id === book.id)
                    .map(oneShelfBook => book.shelf = oneShelfBook.shelf)));
                this.setState({bookLists})
            })
        }
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'
                    >
                        Close
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.searchStr}
                            onChange={(event) => this.changeSearchStr(event.target.value)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <Book
                        bookLists={this.state.bookLists}
                        handleMoveBook={this.props.handleMoveBook}
                    />
                </div>
            </div>
        )
    }
}

export default BookSearch