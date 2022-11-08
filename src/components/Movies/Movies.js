import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useContext, useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import getMovies from '../../utils/MoviesApi';
import { filterMovies, getLocalStorageIfExists } from '../../utils/utils'
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

function Movies({ onMovieSave }) {
  const savedMovies = useContext(SavedMoviesContext)
  const savedMoviesIds = savedMovies.map(v => v.movieId)
  const [searchClicked, setSearchClicked] = useState(false)

  const initialMovies = getLocalStorageIfExists('moviesFound') || [];
  const initialSearchFormState = getLocalStorageIfExists('searchSettings') || {};

  const [filteredMovies, setFilteredMovies] = React.useState(initialMovies);

  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);

  const savedMoviesIdsJSON = JSON.stringify(savedMoviesIds)
  const filteredMoviesJSON = JSON.stringify(filteredMovies.map(v => v.id))

  useEffect(() => {
    if (savedMoviesIds.length > 0) {
      const filteredMoviesWithSaved = filteredMovies.map(v => {
        return { ...v, isSaved: savedMoviesIds.includes(v.id) }
      })
      setFilteredMovies(filteredMoviesWithSaved)
    }
  }, [savedMoviesIdsJSON, filteredMoviesJSON])

  function handleSearch(search, isShorts) {
    setSearchClicked(true)
    setIsMoviesLoading(true);
    localStorage.setItem('searchQuery', search);
    localStorage.setItem('shorts', isShorts);

    let allMovies = []
    const storedMoviesJSON = localStorage.getItem('allMovies')
    if (storedMoviesJSON) {
      try {
        allMovies = JSON.parse(storedMoviesJSON)
      } catch (e) {
        console.log(e)
      }
    }

    if (allMovies.length === 0) {
      getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data))
          allMovies = data
          updateFilteredMovies(allMovies, search, isShorts)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsMoviesLoading(false))
    } else {
      updateFilteredMovies(allMovies, search, isShorts)
      setIsMoviesLoading(false)
    }
  }

  function updateFilteredMovies(allMovies, search, isShorts) {
    const movies = filterMovies(allMovies, search, isShorts)
    setFilteredMovies(movies)
    localStorage.setItem('searchSettings', JSON.stringify({ isShorts, search }))
    localStorage.setItem('moviesFound', JSON.stringify(movies))
  }

  function handleToggleSaved(movie) {
    const savedMovie = savedMovies.find(v => v.movieId === movie.id)
    return onMovieSave({ ...movie, _id: savedMovie?._id })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsMoviesLoading(false))
  }

  return (
    <>
      <Header />
      <section className='movies'>
        <SearchForm
          onSearchClick={handleSearch}
          initialState={initialSearchFormState}
          disabled={isMoviesLoading}
        />
        <MoviesCardList
          list={filteredMovies}
          onToggleSaved={handleToggleSaved}
          loading={isMoviesLoading}
          searchClicked={searchClicked}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;