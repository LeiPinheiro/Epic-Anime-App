import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './modules/AnimeDetails.module.css';
import { FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { FaFilm } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";

function MangaDetails() {
    const { id } = useParams()
    const [manga, setManga] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMangaDetails() {
            setIsLoading(true);
            try{
                const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
                const data = await response.json();
                setManga(data.data);
            }catch(error){
                setError(error);
                console.error('Error fetching manga details:', error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchMangaDetails()
    }, [id])

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error loading anime details</div>;
    if(!manga) return <div>No manga found</div>;

    return(
        <div className={styles.animeDetailsSection}>
            <div className={styles.leftContainer}>
                <div className={styles.leftContainerHead}>
                    <div className={styles.headText}>
                        <h1>{manga.title}</h1>
                        <div className={styles.aboutSection}>
                            <p className={styles.score}><FaStar  className={styles.icon} id={styles.starIcon}/>{manga.score}</p>
                            <p className={styles.rank}><FaRankingStar className={styles.icon} id={styles.rankIcon}/>{manga.rank}</p>
                            <p className={styles.type}><FaFilm className={styles.icon} id={styles.typeIcon}/>{manga.type}</p>
                            <p className={styles.duration}><IoMdBook  className={styles.icon} id={styles.durationIcon}/>{manga.chapters}
                            </p>
                        </div>
                        <div className={styles.backgroundContainer}>
                            <p>Status: {manga.status}</p>
                        </div>
                    </div>
                    <div className={styles.coverImageContainer}>
                            <img src={manga.images.jpg.large_image_url} alt="" />
                    </div>
                </div>
                <div className={styles.bodyText}>
                    <p>{manga.synopsis}</p>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.videoContainer}>
                    <h2>Trailer:</h2>
                    {manga.trailer?.youtube_id ? (
                        <iframe
                        width="350"
                        height="200"
                        src={`https://www.youtube.com/embed/${manga.trailer.youtube_id}`}
                        title={`${manga.title} trailer`}
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

export default MangaDetails


