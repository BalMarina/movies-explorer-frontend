import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useContext, useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { filterMovies } from '../../utils/utils';

function SavedMovies({ onMovieSave }) {
  const [searchClicked, setSearchClicked] = React.useState(false);
  const savedMovies = useContext(SavedMoviesContext)
  const [moviesToDisplay, setMoviesToDisplay] = useState(savedMovies)

  useEffect(() => {
    setMoviesToDisplay(savedMovies)
  }, [savedMovies])

  function handleToggleSaved(movie) {
    return onMovieSave({ ...movie, isSaved: true })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSearchClick(query, isShorts) {
    setSearchClicked(true)
    setMoviesToDisplay(filterMovies(savedMovies, query, isShorts))
  }

  return (
    <>
      <Header />
      <section className='saved-movies'>
        <SearchForm onSearchClick={handleSearchClick} />
        <MoviesCardList
          list={moviesToDisplay}
          onToggleSaved={handleToggleSaved}
          isSavedMovies
          searchClicked={searchClicked}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;