import './SearchForm.css';
import React, { useState } from 'react';
import SearchIcon from '../../../images/search-icon.svg';

function SearchForm({
    onSearchClick,
    initialState = { search: '', isShorts: false },
    disabled = false,
}) {
    const [searchValue, setSearchValue] = useState(initialState.search || '')
    const [isShorts, setIsShorts] = useState(initialState.isShorts)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearchClick(searchValue, isShorts)
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleIsShortsChange = (e) => {
        setIsShorts(e.target.checked)
        onSearchClick(searchValue, e.target.checked)
    }

    return (
        <div className='search'>
            <form className='search__form' onSubmit={handleSubmit}>
                <div className='search__input-container'>
                    <img src={SearchIcon} alt='' className='search__icon' />
                    <input
                        onChange={handleSearchChange}
                        className='search__input'
                        type='text'
                        placeholder='Фильм'
                        required
                        value={searchValue || ''}
                        disabled={disabled}
                    />
                    <button
                        className='search__button'
                        type='submit'
                        disabled={disabled}
                    />
                </div>
                <div className='search__shorts'>
                    <input className='search__checkbox'
                        type='checkbox'
                        name='shortFilms'
                        id="shortFilms"
                        value={isShorts}
                        checked={isShorts}
                        onChange={handleIsShortsChange}
                        disabled={disabled}
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