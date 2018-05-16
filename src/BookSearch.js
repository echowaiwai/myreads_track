import React, {Component} from 'react'
import './App.css'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import debounce from 'lodash.debounce'

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.changeSearchStr = this.changeSearchStr.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 100);
        this.state={
            searchStr: '',
            bookLists: []
        }
    }

    componentWillUnmount() {
        this.emitChangeDebounced.cancel();
    }

    emitChange = (searchStr) => {
        console.log(searchStr);
        if (!searchStr) {
            return null;
        }
        BooksAPI.search(searchStr).then(searchbooks => {
            console.log(searchbooks);
            if (searchbooks instanceof Array) {
                searchbooks.map(searchbook => {
                    this.props.bookLists.forEach(shelfbook => {
                        if (searchbook.id === shelfbook.id) {
                            searchbook.shelf = shelfbook.shelf;
                        }
                    });
                    return searchbook;
                });
                this.setState({
                    bookLists: searchbooks
                });
            } else {
                this.setState({
                    bookLists: []
                });
            }
        });
    };

    changeSearchStr(e){
        e.persist();
        this.emitChangeDebounced(e.target.value);
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
                            onChange={this.changeSearchStr}
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