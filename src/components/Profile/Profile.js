import './Profile.css';
import React, { useState } from 'react';
import Header from '../Header/Header';

function Profile({ onSignOut, onUpdate, infoMessage }) {

  const [isClicked, setIsClicked] = useState(false);

  function handleEditClick() {
    setIsClicked(!isClicked)
  }

  return (
    <><Header />
      <section className='profile'>
        <div className='profile__container'>
          <h1 className='profile__title'>Привет, Виталий!</h1>
          <form className='profile__form'>
            <label className='profile__label'>Имя
              <input className='profile__input'></input>
            </label>
            <label className='profile__label'>Email
              <input className='profile__input'></input>
            </label>
          </form>
        </div>
        {isClicked ? (
          <button
            className={`profile__button profile__button_submit `}
            type='submit'
            onClick={handleEditClick}
          >
            Сохранить
          </button>
        ) : (
          <>
            <button
              className={`profile__button profile__button_edit`}
              type='button'
              onClick={handleEditClick}
            >
              Редактировать
            </button>
            <button
              className='profile__button profile__button_logout'
              type='button'
            >
              Выйти из аккаунта
            </button>
          </>
        )
        }
      </section>
    </>
  );
};

export default Profile;