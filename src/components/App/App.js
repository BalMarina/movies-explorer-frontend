import React from 'react';
import { useState } from 'react';
import { Route, Routes, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import Preloader from '../Movies/Preloader/Preloader';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isError, setIsError] = useState('');
  const [processing, setProcessing] = useState(true)

  React.useEffect(() => {
    tokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn === true) {
      if (!currentUser?._id) {
        mainApi.getUserData()
          .then(data => {
            setCurrentUser(data);
          })
          .catch(err => {
            console.log(err);
          })
      }

      mainApi.getMovies()
        .then((data) => {
          setSavedMovies(data)
          setIsError(false);
        })
        .catch(err => {
          setIsError(true);
          console.log(err);
        })
    }
  }, [loggedIn])

  function handleLogged() {
    setLoggedIn(true)
  }

  function tokenCheck() {
    const token = localStorage.getItem('jwt')
    if (token && !loggedIn) {
      setProcessing(true)
      mainApi.getUserData()
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true)
          }
        })
        .catch(() => {
          setLoggedIn(false)
        })
        .finally(() => {
          setProcessing(false)
        })
    } else {
      setProcessing(false)
    }
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(res => {
        const { data: { token } } = res;
        localStorage.setItem('jwt', token)
        handleLogged();
        // else {
        //   handleInfoTooltip(false); выводим сообщение об ошибке
        // }
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
      })
  }

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then(res => {
        const { token } = res;
        localStorage.setItem('jwt', token)
        handleLogged();
      })
      .catch(err => {
        console.log(err);
        // handleInfoTooltip(false);
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    return <Navigate to="/" />;
  };

  function handleUpdateUser(name, email) {
    mainApi.updateUserProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleSaveMovie(movie) {
    if (!movie.isSaved) {
      const requestData = {
        ...movie,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      }
      return mainApi.saveMovie(requestData)
        .then((res) => {
          setSavedMovies(state => [...state, res.data]);
        })
    }
    return mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(state => state.filter(v => v._id !== movie._id));
      })
  }

  if (processing) {
    return <Preloader />
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
        <BrowserRouter>
          <Routes>

            <Route
              path='/' exact
              element={<Main />}
            />

            <Route
              path='/movies' exact
              element={<ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                onMovieSave={handleSaveMovie}
                path='/movies' />
              }
            />

            <Route
              path='/saved-movies' exact
              element={<ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                onMovieSave={handleSaveMovie}
                isError={isError}
                path='/saved-movies' />
              }
            />

            <Route
              path='/profile' exact
              element={<ProtectedRoute
                onUpdate={handleUpdateUser}
                loggedIn={loggedIn}
                component={Profile}
                onSignOut={handleSignOut}
                path='/profile' />
              }
            />

            <Route path='/signup' exact
              element={loggedIn
                ? <Navigate to='/movies' />
                : <Register onRegister={handleRegister} isError={isError} />}
            />

            <Route path='/signin' exact
              element={loggedIn
                ? <Navigate to='/movies' />
                : <Login onLogin={handleLogin} isError={isError} />}
            />

            <Route path='*' exact
              element={<PageNotFound />}
            />
          </Routes>

        </BrowserRouter>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
