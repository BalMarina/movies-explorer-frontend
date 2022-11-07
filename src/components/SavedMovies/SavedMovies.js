import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useContext, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { filterMovies } from '../../utils/utils';

function SavedMovies({ onMovieSave }) {
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const savedMovies = useContext(SavedMoviesContext)
  const initialMoviesToDisplay = savedMovies.map(v => ({ ...v, isSaved: true }))
  const [moviesToDisplay, setMoviesToDisplay] = useState(initialMoviesToDisplay)

  function handleToggleSaved(movie) {
    return onMovieSave(movie)
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsMoviesLoading(false))
  }

  function handleSearchClick(query, isShorts) {
    setMoviesToDisplay(filterMovies(initialMoviesToDisplay, query, isShorts))
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
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;