import React, {Component} from 'react'

class Book extends Component {

    handleMoveBook(book,value){
        this.props.handleMoveBook(book,value)
    }

    render() {
        const {bookLists, oneBookShelf} = this.props;

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        bookLists.filter((b) => b.shelf === oneBookShelf)
                            .map((b,i) => (
                                    <li key={i}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${b.imageLinks !== undefined ? b.imageLinks.thumbnail: ''})`
                                                }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={b.shelf} onChange={(e)=>this.handleMoveBook(b,e.target.value)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{b.title}</div>
                                            <div className="book-authors">{b.authors}</div>
                                        </div>
                                    </li>
                                )
                            )
                    }
                </ol>
            </div>
        )
    }
}

export default Book