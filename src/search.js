import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component{
	state = {query: "",
			books: []}

	updateQuery = (query) => {
    	this.setState({ query: query },this.callBack)
	}

	callBack = () => {
		if(this.state.query){
			BooksAPI.search(this.state.query).then((all) => {
				if(all.error){
					this.setState({books: []})
				}else{
					this.setState({books: all})
				}
			}	
		)}else{
				this.setState({books: []})
			}
	}

  checkShelf = (book) => {
    let bookShelf = "none"
    this.props.books.forEach((shelfBook) => {
        if (shelfBook.title==book.title){
          bookShelf = shelfBook.shelf
        }
      })
    return bookShelf
  }

	render() {

		return (
		<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.books.map((book) => (
               		<li key={book.id}>
                    <div className="book">
                     <div className="book-top">
                       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : `url('http://via.placeholder.com/128x193')` }}></div>
                       <div className="book-shelf-changer">
                         <select value ={this.checkShelf(book)} onChange={this.props.moveToRead(book.id)}>
                           <option value="move" disabled>Move to...</option>
                           <option value="none">None</option> 
                           <option value="currentlyReading">Currently Reading</option>
                           <option value="wantToRead">Want to Read</option>
                           <option value="read">Read</option>
                         </select>
                       </div>
                     </div>
                     <div className="book-title">{book.title}</div>
                     <div className="book-authors">{book.authors}</div>
                   </div>
                 </li>	
               	))}
              </ol>
            </div>
          </div>
		)
	}
}

export default Search