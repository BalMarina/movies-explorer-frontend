import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../../images/logo.svg'

function Header({ loggedIn }) {

  return (
    <header className='header'>
      <a className='header__logo' href='/'><img src={Logo} alt='' /></a>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

export default Header;