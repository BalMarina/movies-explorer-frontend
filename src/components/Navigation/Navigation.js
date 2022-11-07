import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import Icon from '../../images/account-icon.svg'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Navigation() {

    const [isClicked, setIsClicked] = useState(false);
    // const [isLogged, setIsLogged] = useState(true);
    const userContext = useContext(CurrentUserContext)
    const isLogged = userContext?.email

    function handleMenuClick() {
        setIsClicked(!isClicked)
    }

    // function handelLogin() {
    //     setIsLogged(!isLogged)
    // }

    return (
        <nav className={`menu ${isClicked ? 'menu_open' : ''}`} >
            <div className={`${isClicked ? 'menu__layout' : ''} `}>
                {isLogged ? (
                    <>
                        <button
                            className={`menu__btn  ${isClicked ? 'menu__btn_close' : 'menu__btn_burger'} `}
                            onClick={handleMenuClick}
                        />

                        <div className={`menu__box ${isClicked ? 'menu__box_open' : ''}`}>
                            <div className='menu__wrapper'>
                                <NavLink
                                    // exact 
                                    to='/' className='menu__film-link'>
                                    Главная
                                </NavLink>
                                <NavLink to='/movies' className='menu__film-link'>
                                    Фильмы
                                </NavLink>
                                <NavLink to='/saved-movies' className='menu__film-link'>
                                    Сохраненные фильмы
                                </NavLink>
                            </div>
                            <Link to='/profile' className='menu__link menu__link_profile'>
                                Аккаунт
                                <img className='menu__link_icon' src={Icon} alt='' />
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='menu__unathorized'>
                            <Link to='/signup' className='menu__link'>Регистрация</Link>
                            <Link to='/signin' className='menu__link menu__link_signin'>Войти</Link>
                        </div>
                    </>
                )
                }
            </div>
        </nav>
    );
};

export default Navigation;