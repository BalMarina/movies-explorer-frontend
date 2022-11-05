// import { MOVIES_URL } from './constants';

export default function getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
};