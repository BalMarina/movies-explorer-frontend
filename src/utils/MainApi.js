// import { BASE_URL } from './constants';
function getAuthHeader() {
    return { authorization: `Bearer ${localStorage.getItem('jwt')}` }
}

class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._moviesUrl = `${this._baseUrl}/movies`;
    };

    _checkStatus(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    //метод получения информации о пользователе с сервера
    getUserData() {
        return fetch(this._userUrl, {
            headers: {
                ...getAuthHeader(),
            }
            // credentials: 'include',
        })
            .then((res) => this._checkStatus(res))
    };

    // метод сохранения отредактированных данных пользователя на сервере
    updateUserProfile(name, email) {
        return fetch(this._userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
    };

    // метод получения избранных пользователем фильмов с сервера
    getMovies() {
        return fetch(this._moviesUrl, {
            headers: {
                ...getAuthHeader(),
            },
            // credentials: 'include',
        })
            .then((res) => this._checkStatus(res))
    };

    // метод добавления нового фильма в избранное (создание карточки)
    saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        id,
    }) {
        return fetch(this._moviesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token,
            },
            credentials: 'include',
            body: JSON.stringify({
                country: country || 'unknown country',
                director,
                duration,
                year,
                description,
                image,
                trailer: trailerLink,
                nameRU: nameRU || 'empty name',
                nameEN: nameEN || 'empty name',
                thumbnail,
                movieId: id,
            })
        })
            .then((res) => this._checkStatus(res))
    };

    //метод удаления карточки пользователя с сервера
    deleteMovie(movieId) {
        return fetch(`${this._moviesUrl}/${movieId}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeader(),
            },
            credentials: 'include',
        })
            .then((res) => this._checkStatus(res))
    };

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
            .catch((err) => console.log(err));
    };

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
            .catch((err) => console.log(err));
    };

    // getContent() {
    //     return fetch(`${this._baseUrl}/`, {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             ...getAuthHeader(),
    //         }
    //     })
    //         .then(res => {
    //             return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    //         })
    //         .then(data => data)
    //         .catch((err) => console.log(err));
    // }

    signout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            }
        })
            .then((res) => this._checkStatus(res))
            .catch((err) => console.log(err));
    };
};

//создаем экземпляр класса
const mainApi = new MainApi({
    baseUrl: 'https://balmary.nomoredomains.club/api',
});

export default mainApi;