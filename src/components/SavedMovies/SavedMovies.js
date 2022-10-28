import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';

function SavedMovies() {

  return (
    <>
      <Header />
      <section className='saved-movies'>
        <SearchForm />
        <MoviesCardList isSavedMovies />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;