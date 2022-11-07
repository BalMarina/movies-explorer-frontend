import './MoviesCard.css';
// import film from '../../images/film1.jpg';
import { useState } from 'react';
import { getTransformTime } from '../../utils/utils';

function getImageUrl(movie) {
    const url = movie.image?.url || movie.image
    if (!url) {
        return ''
    }

    if (url.includes('http')) {
        return url
    }

    return `https://api.nomoreparties.co/${url}`
}


function MoviesCard({ movie, onToggleSaved, isSavedMovies }) {
    const [processing, setProcessing] = useState(false)

    let isSavedClass = ''
    if (movie?.isSaved) {
        isSavedClass = isSavedMovies ? 'movie__delete-btn' : 'movie__save-btn_active'
    }

    function handleToggleSave() {
        setProcessing(true)
        onToggleSaved(movie)
            .finally(() => {
                setProcessing(false)
            })
    }

    return (
        <div className='movie'>
            <div className='movie__bio'>
                <div className='movie__info'>
                    <h2 className='movie__title'>{movie.nameRU}</h2>
                    <p className='movie__duration'>{getTransformTime(movie.duration)}</p>
                </div>
                <button
                    className={`movie__btn movie__save-btn ${isSavedClass}`}
                    type='button'
                    aria-label='Сохранить в избранное'
                    onClick={handleToggleSave}
                    disabled={processing}
                />
            </div>
            <a className='movie__link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
                <img className='movie__pic' src={getImageUrl(movie)} alt='Фильм' />
            </a>
        </div>
    );
};

export default MoviesCard;