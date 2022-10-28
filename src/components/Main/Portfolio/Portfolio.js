import './Portfolio.css';
import arrow from '../../../images/arrow.svg';


function Portfolio() {

    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__item'>
                    <p className='portfolio__name'>Статичный сайт</p>
                    <a className='portfolio__link' href='https://balmarina.github.io/how-to-learn/' target='_blank' rel='noreferrer'>
                        <img className='portfolio__icon' src={arrow} alt='Статичный сайт' /></a>
                </li>
                <li className='portfolio__item'>
                    <p className='portfolio__name'>Адаптивный сайт</p>
                    <a className='portfolio__link' href='https://balmarina.github.io/russian-travel/' target='_blank' rel='noreferrer'>
                        <img className='portfolio__icon' src={arrow} alt='Адаптивный сайт' /></a>
                </li>
                <li className='portfolio__item'>
                    <p className='portfolio__name'>Одностраничное приложение</p>
                    <a className='portfolio__link' href='https://balmarina.github.io/mesto/' target='_blank' rel='noreferrer'>
                        <img className='portfolio__icon' src={arrow} alt='Одностраничное приложение' /></a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;