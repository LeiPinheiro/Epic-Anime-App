import styles from './modules/Header.module.css'
import { VscSearch } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    return(
    <>    
        <div className={styles.headerContainer}>
            <div className={styles.inputContainer}>
                <label htmlFor="input"><VscSearch /></label>
                <input type="text" id='input' placeholder='Search' />
            </div>
            <ul className={styles.navContainer}>
                <li><a href="/">Home</a></li>
                <li><a href="/#mostPopularSection">Most Popular</a></li>
                <li><a href="/#newReleases">New Releases</a></li>
                <li><a href="/#upcomingAnimes">Upcoming</a></li>
            </ul>
            <div className={styles.logoContainer}>
                <img src="src/assets/Logo (1).png" alt="" />
            </div>
            <div className={styles.mobileMenuIcon}>
                <button onClick={toggleMenu}>
                    {isMenuOpen ? <IoMdClose className={styles.icon}/> : <RxHamburgerMenu className={styles.icon}/>}
                </button>
            </div>
        </div>
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
            <ul className={styles.navContainer}>
                <li><a href="/">Home</a></li>
                <li><a href="/#mostPopularSection">Most Popular</a></li>
                <li><a href="/#newReleases">New Releases</a></li>
                <li><a href="/#upcomingAnimes">Upcoming</a></li>
            </ul>
        </div>
    </>    
    )
}

export default Header