import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
// import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSavedMovies, setIsSavedMovies] = React.useState([]);

  React.useEffect(() => {
    tokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn === true) {
      // Navigate('/')
      mainApi.getUserData()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => {
          console.log(err);
        })

      mainApi.getMovies()
        .then((data) => {
          setIsSavedMovies(data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [loggedIn])

  function handleLogged() {
    setLoggedIn(true)
  }

  function tokenCheck() {
    const token = localStorage.getItem('jwt')
    if (token) {
      mainApi.getUserData().then((res) => {
        if (res) {
          setLoggedIn(true)
        }
      })
    }
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(res => {
        const { token } = res;
        localStorage.setItem('jwt', token)
        handleLogged();
        // else {
        //   handleInfoTooltip(false); выводим сообщение об ошибке
        // }
      })
      .catch(err => {
        console.log(err);
        // handleInfoTooltip(false); выводим сообщение об ошибке
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

  function handleSaveMovie(movie) {
    const isLSaved = movie.likes.some(i => i._id === currentUser._id);

    mainApi.saveMovie(movie, !isLSaved)
      .then((isSavedMovies) => {
        setIsSavedMovies((state) =>
          state.map((c) => c._id === movie._id ? isSavedMovies : c));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setIsSavedMovies((state) =>
          state.filter((c) => c._id !== movie._id));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUpdateUser(userData) {
    mainApi.updateUserProfile(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              path='/movies' />
            }
          />

          <Route
            path='/saved-movies' exact
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={SavedMovies}
              path='/saved-movies' />
            }
          />

          <Route
            path='/profile' exact
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={Profile}
              path='/profile' />
            }
          />

          <Route path='/signup' exact
            element={loggedIn ? <Navigate to='/movies' /> : <Register onRegister={handleRegister} />}
          />

          <Route path='/signin' exact
            element={loggedIn ? <Navigate to='/movies' /> : <Login onLogin={handleLogin} />}
          />

          <Route path='*' exact
            element={<PageNotFound />}
          />
        </Routes>

      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
};

export default App;
