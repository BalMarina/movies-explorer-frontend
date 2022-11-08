import './MoviesCardList.css';
import Preloader from '../Movies/Preloader/Preloader';
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'

const pageSizeOptions = {
  1024: { initial: 12, pageSize: 3 },
  768: { initial: 8, pageSize: 2 },
  0: { initial: 5, pageSize: 2 },
};

function getPageOptions() {
  const width = window.innerWidth;
  const optionKey = Object.keys(pageSizeOptions).reverse().find(v => +v < +width)
  return pageSizeOptions[optionKey]
}

function MoviesCardList({ isSavedMovies, list, onToggleSaved, loading, searchClicked }) {
  const [pageOptions, setPageOptions] = useState(getPageOptions())
  const [page, setPage] = useState(0)
  const { initial, pageSize } = pageOptions;

  const displayMoviesAmount = initial + page * pageSize;
  const hasMore = displayMoviesAmount < list.length
  const listToDisplay = list.slice(0, displayMoviesAmount)

  function handleShowMore() {
    setPage(v => v + 1)
  }

  useEffect(() => {
    const handleResize = () => {
      const optionValue = getPageOptions()
      setPageOptions(optionValue)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  return (
    <section className='movies-list'>
      {loading && <Preloader />}
      {(!Array.isArray(listToDisplay) || listToDisplay.length === 0)
        ? (
          <>
            {searchClicked && <p>Ничего не найдено</p>}
          </>
        )
        : <div className='movies-list__conrainer'>
          {listToDisplay.map((v, i) => (
            <MoviesCard
              movie={v}
              key={v.id || v._id}
              onToggleSaved={onToggleSaved}
              isSavedMovies={isSavedMovies}
            />
          ))}
        </div>
      }
      {hasMore && (
        <button
          onClick={handleShowMore}
          className='movies-list__else-button'
          type='button'
          aria-label='Показать еще'
        >
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;