import './MoviesCardList.css';
// import Preloader from '../Movies/Preloader/Preloader';
import film1 from '../../images/film1.jpg';
import film2 from '../../images/film2.jpg';
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'

const cards = [
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },
  { title: 'test', duration: '1 ч 42мин', src: film1 },
  { title: 'test2', duration: '1 ч 42мин', src: film2 },];

// const cardsOptions = {
//   1024: 12,
//   768: 8,
//   0: 5,
// };

// function getCardsToDisplay() {
//   const width = window.innerWidth;
//   const cardsCountKey = Object.keys(cardsOptions).reverse().find(v => v < width)
//   const cardsCount = cardsOptions[cardsCountKey] || 4;

//   return cards.slice(0, cardsCount);
// }


function MoviesCardList({ isSavedMovies }) {
  // const [cardsToDisplay, setCardsToDisplay] = useState(getCardsToDisplay())

  // function updateCardsToDisplay() {
  //   const newCardsArr = getCardsToDisplay();
  //   if (newCardsArr.length !== cardsToDisplay.length) {
  //     setCardsToDisplay(newCardsArr)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', updateCardsToDisplay)

  //   return () => {
  //     window.removeEventListener('resize', updateCardsToDisplay)
  //   }
  // }, [])

  return (
    <section className='movies-list'>
      {/* <Preloader /> */}
      <div className='movies-list__conrainer'>
        {cards.map((v, i) => <MoviesCard {...v} key={i} isSavedMovies={isSavedMovies} />)}
      </div>
      <button
        className='movies-list__else-button'
        type='button'
        aria-label='Показать еще'
      >
        Ещё
      </button>
    </section>
  );
};

export default MoviesCardList;