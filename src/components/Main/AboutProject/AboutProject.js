import './AboutProject.css';

function AboutProject() {

    return (
        <section className='project' id='project'>
            <h2 className='project__head'>О проекте</h2>
            <div className='project__description'>
                <div className='project__info-box'>
                    <h3 className='project__info-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__info-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='project__info-box'>
                    <h3 className='project__info-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__info-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='project__period'>
                <div className='project__timeline project__timeline_backend'>1 неделя</div>
                <div className='project__timeline project__timeline_frontend'>4 недели</div>
                <p className='project__timeline project__timeline_label'>Back-end</p>
                <p className='project__timeline project__timeline_label'>Front-end</p>
            </div>
        </section>
    );
};

export default AboutProject;