import './AboutMe.css';
import photo from '../../../images/photo.jpg';


function AboutMe() {
    return (
        <section className='about-me' id='student'>
            <h2 className='about-me__header'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__text-content'>
                    <div className='about-me__bio'>
                        <h3 className='about-me__title'>Марина</h3>
                        <p className='about-me__subtitle'>Фронтенд-разработчица, 25 лет</p>
                        <p className='about-me__description'>Училась в Ростове на юриста, 6 лет работала маркетологом и менеджером в IT-компаниях. Со временем поняла, что хочу не только управлять IT-продуктами, но и создавать их. К тому же я с детства любила логические задачи.
                        </p>
                        <a className='about-me__link' href='https://github.com/BalMarina' target='blank'>Github</a>
                    </div>
                </div>
                <div className='about-me__photo-content'>
                    <img className='about-me__photo' alt='Фото студента' src={photo} />
                </div>
            </div>
        </section>
    );
};

export default AboutMe;