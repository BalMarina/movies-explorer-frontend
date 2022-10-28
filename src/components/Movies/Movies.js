import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import SearchForm from './SearchForm/SearchForm';

function Movies() {

  return (
    <>
      <Header />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}

export default Movies;