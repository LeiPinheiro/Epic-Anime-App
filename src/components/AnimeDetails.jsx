import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './modules/AnimeDetails.module.css';
import { FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { FaFilm } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";

function AnimeDetails() {
    const { id } = useParams()
    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAnimeDetails() {
            setIsLoading(true);
            try{
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const data = await response.json();
                setAnime(data.data);
            }catch(error){
                setError(error);
                console.error('Error fetching anime details:', error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchAnimeDetails()
    }, [id])

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error loading anime details</div>;
    if(!anime) return <div>No anime found</div>;

    return(
        <div className={styles.animeDetailsSection}>
            <div className={styles.leftContainer}>
                <div className={styles.leftContainerHead}>
                    <div className={styles.headText}>
                        <h1>{anime.title}</h1>
                        <div className={styles.aboutSection}>
                            <p className={styles.score}><FaStar  className={styles.icon} id={styles.starIcon}/>{anime.score}</p>
                            <p className={styles.rank}><FaRankingStar className={styles.icon} id={styles.rankIcon}/>{anime.rank}</p>
                            <p className={styles.type}><FaFilm className={styles.icon} id={styles.typeIcon}/>{anime.type}</p>
                            <p className={styles.duration}><IoIosTime className={styles.icon} id={styles.durationIcon}/>{anime.duration}
                            </p>
                        </div>
                        <div className={styles.backgroundContainer}>
                            <p>{anime.background}</p>
                        </div>
                    </div>
                    <div className={styles.coverImageContainer}>
                            <img src={anime.images.jpg.large_image_url} alt="" />
                    </div>
                </div>
                <div className={styles.bodyText}>
                    <p>{anime.synopsis}</p>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.videoContainer}>
                    <h2>Trailer:</h2>
                    {anime.trailer?.youtube_id ? (
                        <iframe
                        width="350"
                        height="200"
                        src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                        title={`${anime.title} trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.trailerVideo}>
                        </iframe>
                    ): (
                        <p>No trailer available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AnimeDetails


