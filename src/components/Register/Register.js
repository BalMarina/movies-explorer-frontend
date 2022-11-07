import './Register.css';
import { useState } from 'react';
import Errors from '../Errors/Errors';
import Logo from '../../images/logo.svg'
import { useFormWithValidation } from '../../hooks/useForm';

function Register({ onRegister }) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onRegister(values.name, values.email, values.password);
  }

  return (
    <section className='register'>
      <div className='register__container'>
        <img src={Logo} alt='' className='register__logo' />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form
          className='register__form'
          onSubmit={handleSubmit}>
          <label className='register__label'>Имя
            <input
              name="name"
              className='register__input'
              value={values.name}
              onChange={handleChange}
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
          <label className='register__label'>Email
            <input
              name='email'
              className='register__input'
              value={values.email}
              onChange={handleChange}
              type='email'
              minLength='2'
              maxLength='30'
              pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              required
            ></input>
            <Errors isShown={Boolean(errors.email)}>
              Проверьте, что поле заполнено и соответствует стандартам email: name@example.com
            </Errors>
          </label>
          <label className='register__label'>Пароль
            <input
              name='password'
              className='register__input'
              value={values.password}
              onChange={handleChange}
              type='password'
              minLength='6'
              maxLength='40'
              required>
            </input>
            <Errors isShown={Boolean(errors.password)}>
              Пароль не может быть короче 6 символов
            </Errors>
          </label>
          <button
            className='register__button'
            type='submit'
            onSubmit={handleSubmit}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <p
        className='register__signin-text'
      >
        Уже зарегистрированы?
        <a className='register__signin-link' href='/signin'> Войти</a>
      </p>

    </section>
  )
};

export default Register;