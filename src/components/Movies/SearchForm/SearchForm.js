import './SearchForm.css';
import React from 'react';
import SearchIcon from '../../../images/search-icon.svg';

function SearchForm() {

    return (
        <div className='search'>
            <form className='search__form'>
                <div className='search__input-container'>
                    <img src={SearchIcon} alt='' className='search__icon' />
                    <input
                        className='search__input'
                        type='text'
                        placeholder='Фильм'
                        required
                    />
                    <button
                        className='search__button'
                        type='submit'
                    />
                </div>
                <div className='search__shorts'>
                    <input className='search__checkbox'
                        type='checkbox'
                        name='shortFilms'
                        id="shortFilms"
                    />
                    <label htmlFor='shortFilms' className='search__label-checkbox'>
                    </label>
                    <p className='search__shorts-name'>Короткометражки</p>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;