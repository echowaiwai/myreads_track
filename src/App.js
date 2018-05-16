import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookCategory from './BookCategory'

class BooksApp extends React.Component {
    state = {
        bookLists: [],
        bookShelf: []
    };

    //异步请求获取后台图书数据
    componentDidMount() {
        BooksAPI.getAll().then(bookData => {
            this.setState({
                bookLists: bookData,
                bookShelf: Array.from(new Set(bookData.map(book => book.shelf)))
            })
        })
    }

    /**
     *
     * 更新图书分类，修改图书shelf属性后放入对应书架中
     * @param {Object} book 选择需要修改的图书
     * @param {String} shelf 该书所在书架分类
     */
    handleMoveBook = (book, shelf) => {
       BooksAPI.update(book, shelf).then(() => {
            this.setState({
                bookLists: this.state.bookLists.map(b => {
                    if (b.id === book.id) b.shelf = shelf;
                    return b;
                })
            });
        })
    };



    //渲染页面
    render() {
        return (
            <div className="app">
                {console.log(this.state.bookLists)}
                {/*主页面*/}
                <Route
                    path="/search"
                    render={() => (
                        <BookSearch
                            bookLists={this.state.bookLists}
                            handleMoveBook={this.handleMoveBook}
                        />
                    )}
                />
                {/*搜索页面*/}
                <Route
                    exact
                    path="/"
                    render={() => (
                        <BookCategory
                            bookShelf={this.state.bookShelf}
                            bookLists={this.state.bookLists}
                            handleMoveBook={this.handleMoveBook}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp
