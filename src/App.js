import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import MainPage from './main'
import Search from './search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: []
  }
    moveToRead = (bookId) => {
      let look = this
      return function (event){
      BooksAPI.update({id: bookId},event.target.value).then(bookId => {
      BooksAPI.getAll().then((books) => {   
      look.setState({books})
    })
      })
      }  
    }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {   
      this.setState({books})
    })
  }
  render() {
    return (
      <div>
        <Route exact path='/My-books-app/' render={() => (
          <MainPage book={this.state.books} moveToRead={this.moveToRead} />
        )} />
        <Route path='/search' render={() => (
          <Search books={this.state.books} moveToRead={this.moveToRead}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
