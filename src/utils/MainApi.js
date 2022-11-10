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
        if (res.status === 401) {
            localStorage.clear();
            return window.location.pathname = '/'
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserData() {
        return fetch(this._userUrl, {
            headers: {
                ...getAuthHeader(),
            }
        })
            .then((res) => this._checkStatus(res))
    };

    updateUserProfile(name, email) {
        return fetch(this._userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify({
                name,
                email,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
    };

    getMovies() {
        return fetch(this._moviesUrl, {
            headers: {
                ...getAuthHeader(),
            },
        })
            .then((res) => this._checkStatus(res))
    };

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
                ...getAuthHeader(),
            },
            body: JSON.stringify({
                country: country || 'unknown country',
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU: nameRU || 'empty name',
                nameEN: nameEN || 'empty name',
                thumbnail,
                movieId: id,
            })
        })
            .then((res) => this._checkStatus(res))
    };

    deleteMovie(movieId) {
        return fetch(`${this._moviesUrl}/${movieId}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeader(),
            },
        })
            .then((res) => this._checkStatus(res))
    };

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
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

};

const mainApi = new MainApi({
    baseUrl: 'https://balmary.nomoredomains.club/api',
});

export default mainApi;