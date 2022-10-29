import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
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

function App() {
  return (
    // <CurrentUserContext.Provider>
    <BrowserRouter>
      <Routes>

        <Route
          path='/' exact
          element={<Main />}
        />

        <Route
          path='/movies' exact
          element={<Movies />}
        />

        <Route
          path='/saved-movies' exact
          element={<SavedMovies />}
        />

        <Route
          path='/profile' exact
          element={<Profile />}
        />

        <Route path='/signup' exact
          element={<Register />}
        />

        <Route path='/signin' exact
          element={<Login />}
        />

        <Route path='*' exact
          element={<PageNotFound />}
        />
      </Routes>

    </BrowserRouter>

  );
};

export default App;
