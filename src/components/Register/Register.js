import './Register.css';
import { useState } from 'react';
import Errors from '../Errors/Errors';
import Logo from '../../images/logo.svg'
import { useFormWithValidation } from '../../hooks/useForm';

function Register({ onRegister, infoMessage }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleName(e) {
    setName(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister(name, email, password);
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
              className='register__input'
              value={values.name}
              onChange={handleName}
              type='text'
              minLength='2'
              maxLength='30'
              required
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
            >
            </input>
          </label>
          <label className='register__label'>Email
            <input
              className='register__input'
              value={values.email}
              onChange={handleEmail}
              type='email'
              minLength='2'
              maxLength='30'
              required
            ></input>
          </label>
          <label className='register__label'>Пароль
            <input
              className='register__input'
              value={values.password}
              onChange={handlePassword}
              type='password'
              minLength='4'
              maxLength='20'
              required></input>
          </label>
          <button
            className='register__button'
            type='submit'
            onSubmit={handleSubmit}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <p
        className='register__signin-text'
      >
        Уже зарегистрированы?
        <a className='register__signin-link'> Войти</a>
      </p>

    </section>
  )
};

export default Register;