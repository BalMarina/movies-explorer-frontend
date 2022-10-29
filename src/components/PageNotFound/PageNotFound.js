import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {

  const navigate = useNavigate();

  return (
    <section className='notfound'>
      <div className='notfound__description'>
        <h2 className='notfound__title'>404</h2>
        <p className='notfound__subtitle'>Страница не найдена</p>
      </div>
      <button className='notfound__link' onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
};

export default PageNotFound;