import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './modules/MainSection.module.css';
import { register } from 'swiper/element/bundle'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'





function MainSection() {



    return(
        <div className={styles.mainSectionContainer}>
            <div className={styles.leftContainer}>
                <h1>Welcome to <span>Epic Anime</span></h1>
                <p>Embark on a Journey of Endless Stories and Epic Adventures.</p>
                <div className={styles.btnContainer}>
                    <button><a href="#mostPopularSection">Start</a></button>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <Swiper className={styles.swiper} navigation={true} loop autoplay={{delay:2000, disableOnInteraction:true, pauseOnMouseEnter:true}} spaceBetween={0}>
                    <SwiperSlide className={styles.animeSlide}>
                        <img src="https://m.media-amazon.com/images/I/816AbVQc+0L.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={styles.animeSlide}>
                        <img src="https://a.storyblok.com/f/178900/1072x1500/288f231396/dandadan-jp-visual.jpeg/m/filters:quality(95)format(webp)" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={styles.animeSlide}>
                        <img src="https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default MainSection