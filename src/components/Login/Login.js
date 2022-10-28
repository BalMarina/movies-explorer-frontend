import './Login.css';
import Logo from '../../images/logo.svg'

function Login({ onLogin, infoMessage }) {

  return (
    <section className='login'>
      <div className='login__container'>
        <img src={Logo} alt='' className='login__logo' />
        <h1 className='login__title'>Рады видеть!</h1>
        <form className='login__form'>
          <label className='login__label'>Email
            <input className='login__input'></input>
          </label>
          <label className='login__label'>Пароль
            <input className='login__input'></input>
          </label>
        </form>
      </div>
      <button
        className='login__button'
        type='button'
      >
        Войти
      </button>
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