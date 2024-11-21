import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './modules/MostPopularSection.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function NewAnimeRelease() {
    const navigate = useNavigate()
    const URL = 'https://api.jikan.moe/v4/seasons/now' 
    const CACHE_EXPIRATION = 60 * 60 * 1000 // 1 hora
    const [animeList, setAnimeList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [slidesPerView, setSlidesPerView] = useState(5)

    const delay = (ms) => new Promise((resolve)=> setTimeout(resolve, ms))

    const fetchDataWithRetry = async (url, retryCount = 0) => {
        try{
            const response = await fetch(url)

            if(response.status === 429 && retryCount < 3) {
                const backoffTime = Math.pow(2, retryCount) * 1000;
                await delay(backoffTime)
                return fetchDataWithRetry(url, retryCount + 1)
            }

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return await response.json();
        }catch(error) {
            if(retryCount >= 3) throw error; // falha após 3 tentativas
            return fetchDataWithRetry(url, retryCount + 1)
        }
    }

    useEffect(()=>{
        async function gettingAnimes() {
            setIsLoading(true)
            try{
                const cachedData = localStorage.getItem('topAnime');
                const now = Date.now();
                if(cachedData && now - cachedData.timestamp < CACHE_EXPIRATION){
                    setAnimeList(cachedData.data)
                }else{
                    // const response = await fetch(URL)
                    const data = await fetchDataWithRetry(URL)
                    const top20 = data?.data?.slice(0, 20) || [];
                    setAnimeList(top20)

                    localStorage.setItem(
                        'topAnime',
                        JSON.stringify({data: top20, timestamp: now})
                    )
                }
            }catch(error){
                setError(error);
                console.error('Error fetching anime data', error)
            }finally{
                setIsLoading(false)
            }
        };
        gettingAnimes()
    }, [])

    useEffect(() => {
        function handleSize() {
            if (window.innerWidth > 1160) {
                setSlidesPerView(5);
            } else if (window.innerWidth > 790) {
                setSlidesPerView(4);
            } else {
                setSlidesPerView(2);
            }
        }
        handleSize();
    
        window.addEventListener('resize', handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, []); 

    const handleAnimeClick = (animeId) => {
        navigate(`/anime/${animeId}`)
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>An error occured</div>



    return(
        <div className={styles.mostPopularSection} id='newReleases'>
            <div className={styles.sectionHeader}>
                <h2>New Anime Releases</h2>
            </div>
            <div className={styles.slideContainer}>
                <Swiper spaceBetween={0} slidesPerView={slidesPerView} pagination={{ clickable: true }} loop className={styles.swiper} autoplay={{delay:2000, disableOnInteraction:false, pauseOnMouseEnter:true}}>
                    {animeList.map((anime) => (
                        <SwiperSlide key={anime.mal_id}>
                            <div onClick={() => handleAnimeClick(anime.mal_id)}style={{
                                backgroundImage: `url(${anime.images.jpg.large_image_url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '85%',
                                height: '310px',
                                }} className={styles.animeImage}>
                                <div className={styles.titleContainer}>
                                    <p className={styles.animeTitle}>{anime.title}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default NewAnimeRelease