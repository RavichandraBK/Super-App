import React from 'react'
import styles from './Home.module.css'

const Home = () => {
    const allKeys = Object.keys(localStorage);
    const SelItems = allKeys.filter(key=> /^choice\d+$/.test(key));
    const [name,email,userName] = ['name','email','userName'].map((key)=> localStorage.getItem(key));
    return (
        <>
            <div className={styles.HomeParent}>
                <div className={styles.HomeLeft}>
                    <div className={styles.HomeTop}>
                        <div className={styles.HomeInfo}>
                            <div className={styles.HomeProfile}>
                                <img src="/assets/HomeProfilePic.png" alt="Haribol" />
                                <div>
                                    <div>
                                        <p>{name?name:'KK Vinay'}</p>
                                        <p>{email?email:'Vinay090@gmail.com'}</p>
                                        <p>{userName?userName:'vinay060'}</p>
                                    </div>
                                    <div className={styles.profileChoices}>
                                        {SelItems.map((item)=>{
                                            const value = localStorage.getItem(item)
                                            return (<div key={item} className={styles.FinalSel}><p>{value}</p></div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.HomeWeather}></div>
                        </div>
                        <div className={styles.HomeNotes}></div>
                    </div>
                    <div className={styles.HomeBottom}></div>
                </div>
                <div className={styles.HomeRight}></div>
            </div>
        </>
    )
}

export default Home