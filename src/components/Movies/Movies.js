import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useContext, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import getMovies from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { filterMovies, getLocalStorageIfExists } from '../../utils/utils'
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { getValue } from '@testing-library/user-event/dist/utils';

function Movies({ onMovieSave }) {
  const savedMovies = useContext(SavedMoviesContext)
  const savedMoviesIds = savedMovies.map(v => v.movieId)
  // const shortsFilterButton = localStorage.getItem('shorts') === 'on' ? 'on' : 'off';

  const initialMovies = getLocalStorageIfExists('moviesFound') || [];
  const initialSearchFormState = getLocalStorageIfExists('searchSettings') || {};

  // состояния запросов
  // const [search, setSearch] = React.useState('');
  // const [shorts, setShorts] = React.useState(shortsFilterButton);
  // состояния фильмов
  const [filteredMovies, setFilteredMovies] = React.useState(initialMovies);
  // const [notFilteredMovies, setNotFilteredMovies] = React.useState([]);
  // состояния вспомогательные
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // React.useEffect(() => {
  //   const arr = JSON.parse(localStorage.getItem('movies'));
  //   if (arr && !search) {
  //     setShorts(localStorage.getItem('shorts'));
  //     setFilteredMovies(shorts === 'on' ? filterShorts(arr) : arr);
  //     handleCheckFilteredMovies(arr);
  //   }
  // }, [search, shorts])

  // React.useEffect(() => {
  //   if (search) {
  //     const arr = filterMovies(notFilteredMovies, search, shorts);
  //     setFilteredMovies(arr);
  //     handleCheckFilteredMovies(arr);
  //   }
  // }, [search, shorts, notFilteredMovies])

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
    setIsMoviesLoading(true);
    // setSearch(value);
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
          setIsError(true);
          console.log(err);
        })
        .finally(() => setIsMoviesLoading(false))
    } else {
      updateFilteredMovies(allMovies, search, isShorts)
      setIsMoviesLoading(false)
    }

    // if (!notFilteredMovies.length) {
    //   getMovies()
    //     .then((data) => {
    //       // changeMovies(data);
    //       setNotFilteredMovies(data);
    //       handleSetFilteredMovies(data, value, shorts);
    //     })
    //     .catch((err) => {
    //       setIsError(true);
    //       console.log(err);
    //     })
    //     .finally(() => setIsMoviesLoaging(false))
    // } else {
    //   handleSetFilteredMovies(notFilteredMovies, value, shorts);
    //   setIsMoviesLoaging(false);
    // }
  }

  function updateFilteredMovies(allMovies, search, isShorts) {
    const movies = filterMovies(allMovies, search, isShorts)
    setFilteredMovies(movies)
    localStorage.setItem('searchSettings', JSON.stringify({ isShorts, search }))
    localStorage.setItem('moviesFound', JSON.stringify(movies))
  }

  // function handleSetFilteredMovies(movies, query, checkbox) {
  //   const moviesList = filterMovies(movies, query);
  //   setFilteredMovies(checkbox === 'on' ? filterShorts(moviesList) : moviesList);
  //   localStorage.setItem('movies', JSON.stringify(moviesList));
  // }

  // function handleShorts(e) {
  //   setShorts(e.target.value);
  //   localStorage.setItem('shorts', e.target.value);
  // }

  // обработчик устновки значения, когда ничего не найдено
  // function handleCheckFilteredMovies(arr) {
  //   arr.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
  // }

  function handleToggleSaved(movie) {
    const savedMovie = savedMovies.find(v => v.movieId === movie.id)
    return onMovieSave({ ...movie, _id: savedMovie?._id })
      .catch((err) => {
        setIsError(true);
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
        // onCheckbox={handleShorts}
        // shortFilms={shorts}
        />
        <MoviesCardList
          list={filteredMovies}
          onToggleSaved={handleToggleSaved}
          loading={isMoviesLoading}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;