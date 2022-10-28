import './MoviesCard.css';
// import film from '../../images/film1.jpg';
import { useState } from 'react';


function MoviesCard({ isSavedMovies, title, duration, src }) {

    const [isSaved, setIsSaved] = useState(isSavedMovies);

    if (!isSaved && isSavedMovies) {
        return null
    }

    function handleSaveFilm() {
        setIsSaved(v => !v)
    }

    let isSavedClass = ''
    if (isSaved) {
        isSavedClass = isSavedMovies ? 'movie__delete-btn' : 'movie__save-btn_active'
    }

    return (
        <div className='movie'>
            <div className='movie__bio'>
                <div className='movie__info'>
                    <h2 className='movie__title'>{title}</h2>
                    <p className='movie__duration'>{duration}</p>
                </div>
                <button
                    className={`movie__btn movie__save-btn ${isSavedClass}`}
                    type='button'
                    aria-label='Сохранить в избранное'
                    onClick={handleSaveFilm}
                />
            </div>
            <a className='movie__link' href='' target='_blank' rel='noreferrer'>
                <img className='movie__pic' src={src} alt='Фильм' />
            </a>
        </div>
    );
};

export default MoviesCard;