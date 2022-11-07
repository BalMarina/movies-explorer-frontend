import './Login.css';
import { useState } from 'react';
import { useFormWithValidation } from '../../hooks/useForm';
import Errors from '../Errors/Errors';
import Logo from '../../images/logo.svg'

function Login({ onLogin }) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values.email, values.password);
  }

  return (
    <section className='login'>
      <div className='login__container'>
        <img src={Logo} alt='' className='login__logo' />
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form' onSubmit={handleSubmit}>
          <label className='login__label'>Email
            <input
              name='email'
              className='login__input'
              value={values.email}
              onChange={handleChange}
              type='email'
              minLength='2'
              maxLength='30'
              required>
            </input>
            <Errors isShown={Boolean(errors.email)}>
              Проверьте, что поле заполнено и соответствует стандартам email: name@example.com
            </Errors>
          </label>
          <label className='login__label'>Пароль
            <input
              name='password'
              className='login__input' value={values.password}
              onChange={handleChange}
              type='password'
              minLength='4'
              maxLength='20'
              required>
            </input>
            <Errors isShown={Boolean(errors.password)}>
              Пароль не может быть короче 6 символов
            </Errors>
          </label>
          <button
            className='login__button'
            type='submit'
            onSubmit={handleSubmit}
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
      </div>
      <p
        className='login__signup-text'
      >
        Ещё не зарегистрированы?
        <a className='login__signup-link' href='/signup'> Регистрация</a>
      </p>

    </section>
  )
};

export default Login;