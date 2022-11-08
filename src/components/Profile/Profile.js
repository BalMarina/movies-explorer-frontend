import './Profile.css';
import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Errors from '../Errors/Errors';

function Profile({ onSignOut, onUpdate }) {

  const currentUser = useContext(CurrentUserContext);

  const [isClicked, setIsClicked] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  const [isInputActive, setIsInputActive] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      resetForm({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [resetForm, currentUser]);

  // React.useEffect(() => {
  //   if (currentUser.name === values.name && currentUser.email === values.email) {
  //     resetForm(false);
  //   }
  // }, [resetForm, values, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values.name || currentUser.name, values.email || currentUser.email);
    setIsClicked(!isClicked);
  };

  function handleEditProfile() {
    setIsInputActive(true);
    setIsClicked(!isClicked)
  };

  return (
    <>
      <Header />
      <section className='profile'>
        <div className='profile__container'>
          <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
          <form className='profile__form' onSubmit={handleSubmit}>
            <label className='profile__label'>Имя
              <input
                name="name"
                className='profile__input'
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isInputActive}
                type='text'
                minLength='2'
                maxLength='30'
                required
                pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              >
              </input>
              <Errors isShown={Boolean(errors.name)}>
                Проверьте, заполнено ли поле - оно должно содержать латиницу, кириллицу, пробел или дефис
              </Errors>
            </label>
            <label className='profile__label'>Email
              <input
                name="email"
                type='email'
                className='profile__input'
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isInputActive}
                minLength='2'
                maxLength='30'
                required
                pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              >
              </input>
              <Errors isShown={Boolean(errors.email)}>
                Проверьте, что поле заполнено и соответствует стандартам email: name@example.com
              </Errors>
            </label>
            {!isClicked ? (
              <>
                <button
                  className={`profile__button profile__button_edit`}
                  type='button'
                  onClick={handleEditProfile}
                >
                  Редактировать
                </button>
                <button
                  className='profile__button profile__button_logout'
                  type='button'
                  onClick={onSignOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                className={`profile__button profile__button_submit `}
                type='submit'
                disabled={!isValid}
              >
                Сохранить
              </button>
            )
            }
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;