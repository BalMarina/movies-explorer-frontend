import './Register.css';
import Errors from '../Errors/Errors';
import Logo from '../../images/logo.svg'

function Register({ onRegister, infoMessage }) {

  return (
    <section className='register'>
      <div className='register__container'>
        <img src={Logo} alt='' className='register__logo' />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <label className='register__label'>Имя
            <input className='register__input'></input>
          </label>
          <label className='register__label'>Email
            <input className='register__input'></input>
          </label>
          <label className='register__label'>Пароль
            <input className='register__input'></input>
            <Errors />
          </label>
        </form>
      </div>
      <button
        className='register__button'
        type='button'
      >
        Зарегистрироваться
      </button>
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