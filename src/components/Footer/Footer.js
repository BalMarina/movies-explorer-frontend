import './Footer.css';
import { Route } from 'react-router';

function Footer() {

  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__year'> &copy; 2022</p>
        <ul className='footer__sourses'>
          <li >
            <a className='footer__link' href='https://praktikum.yandex.ru' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
          </li>
          <li >
            <a className='footer__link' href='https://github.com/BalMarina' target='_blank' rel='noopener noreferrer'>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;