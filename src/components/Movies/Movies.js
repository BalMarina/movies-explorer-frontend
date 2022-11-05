import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import { filterShorts, filterMovies } from '../../utils/utils';
import getMovies from '../../utils/MoviesApi';

function Movies() {

  // const shortsFilterButton = localStorage.getItem('shorts') === 'on' ? 'on' : 'off';

  const storedSearchJSON = localStorage.getItem('searchSettings');

  let initialMovies = [];

  let initialSearchFormState = {}

  if (storedSearchJSON) {
    try {
      const storedSearch = JSON.parse(storedSearchJSON)
      initialMovies = storedSearch.movies
      initialSearchFormState = { search: storedSearch.search, isShorts: storedSearch.isShorts }
    } catch (e) {
      console.log(e)
    }
  }

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

  function filterMovies(movies, query, isShorts) {
    const searchParams = ['nameEN', 'nameRU'];
    let result = movies
      .filter(
        movie => searchParams.some(
          param => movie[param]
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      )

    if (isShorts === true) {
      result = result.filter(movie => movie.duration <= 40)
    }

    return result
  }

  function handleSearch(search, isShorts) {
    setIsMoviesLoading(true);
    // setSearch(value);
    localStorage.setItem('searchQuery', search);
    localStorage.setItem('shorts', isShorts);

    getMovies()
      .then((data) => {
        // changeMovies(data);
        // setNotFilteredMovies(data);
        // handleSetFilteredMovies(data, value, shorts);
        const movies = filterMovies(data, search, isShorts);
        setFilteredMovies(movies)
        localStorage.setItem('searchSettings', JSON.stringify({ isShorts, search, movies }))
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsMoviesLoading(false))

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

  return (
    <>
      <Header />
      <section className='movies'>
        <SearchForm
          onSearchClick={handleSearch}
          initialState={initialSearchFormState}
        // onCheckbox={handleShorts}
        // shortFilms={shorts}
        />
        <MoviesCardList
          list={filteredMovies}
          isEmptyList={isNotFound}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;