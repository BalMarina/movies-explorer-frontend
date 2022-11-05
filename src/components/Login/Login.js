import './Login.css';
import { useState } from 'react';
import { useFormWithValidation } from '../../hooks/useForm';
import Logo from '../../images/logo.svg'

function Login({ onLogin, infoMessage }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <section className='login'>
      <div className='login__container'>
        <img src={Logo} alt='' className='login__logo' />
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form' onSubmit={handleSubmit}>
          <label className='login__label'>Email
            <input
              className='login__input'
              value={values.email}
              onChange={handleEmail}
              type='email'
              minLength='2'
              maxLength='30'
              required></input>
          </label>
          <label className='login__label'>Пароль
            <input
              className='login__input' value={values.password}
              onChange={handlePassword}
              type='password'
              minLength='4'
              maxLength='20'
              required></input>
          </label>
          <button
            className='login__button'
            type='submit'
            onSubmit={handleSubmit}
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