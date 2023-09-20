import React, { useEffect, useState, useRef } from 'react'
import styles from './Home.module.css'
import Timer from '../../components/Timer/Timer';


const Home = () => {
    const allKeys = Object.keys(localStorage);
    const SelItems = allKeys.filter(key => /^choice\d+$/.test(key));
    const [name, email, userName] = ['name', 'email', 'userName'].map((key) => localStorage.getItem(key));
    const [weather, setWeather] = useState({});
    const [news, setNews] = useState({});
    const isexe = useRef(false);
    const NewsApp = () => {
        fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7071f0022f1f48629a9cbb8a61a62e6b')
            .then((res) => res.json())
            .then((data) => {
                const getArrNews = Math.floor(Math.random() * data.articles.length);
                setNews((prev) => ({ 
                    ...prev, 
                    image: data.articles[getArrNews].urlToImage, 
                    desc:data.articles[getArrNews].description, 
                    title: data.articles[getArrNews].title, 
                }));
                // console.log(data)
            })
    }
    
    const wther = () => {
        fetch('http://api.weatherapi.com/v1/current.json?key=e9ef1737e2a24d0ca66124245231509&q=India&aqi=yes').then((res) => {
            return res.json();
        })
            .then((data) => {
                console.log(data.location.name);
                const timedate = data.location.localtime;
                const [date, time] = timedate.split(' ');
                const finaldate = `${date}    ${time} PM`;
                
                setWeather((prev) => ({
                    ...prev,
                    dateTime: finaldate,
                    text: data.current.condition.text,
                    icon: data.current.condition.icon,
                    temp: data.current.temp_c,
                    pressure: data.current.pressure_mb,
                    windSpeed: data.current.wind_kph,
                    humidity: data.current.humidity,
                }))
                setNews((prev)=>({...prev, newsTime:`${date} | ${time}`}));
            }).catch((err) => { console.log(err) });

    }
    const handleNotes = (e)=>{
        localStorage.setItem('Notes',e.target.value);
    }

    useEffect(() => {
        if (!isexe.current) {

            wther();
            NewsApp();
            isexe.current = true;
        }
    }, [])
    return (
        <>
            <div className={styles.HomeParent}>
                <div className={styles.HomeLeft}>
                    <div className={styles.HomeTop}>
                        <div className={styles.HomeInfo}>
                            <div className={styles.HomeProfile}>
                                <img src="/assets/HomeProfilePic.png" alt="" />
                                <div>
                                    <div>
                                        <p onClick={wther}>{name ? name : 'KK Vinay'}</p>
                                        <p>{email ? email : 'Vinay090@gmail.com'}</p>
                                        <p>{userName ? userName : 'vinay060'}</p>
                                    </div>
                                    <div className={styles.profileChoices}>
                                        {SelItems.map((item) => {
                                            const value = localStorage.getItem(item)
                                            return (<div key={item} className={styles.FinalSel}><p>{value}</p></div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.HomeWeather}>
                                <div><p>{weather.dateTime}</p></div>
                                <div>
                                    <div>
                                        <img src={weather.icon} alt="" />
                                        <p>{weather.text}</p>
                                    </div>
                                    <div></div>
                                    <div>
                                        <p>{weather.temp}°C</p>
                                        <div>
                                            <img src="/assets/pressurebar.svg" alt="" />
                                            <p>{weather.pressure} mbar<br />Pressure </p>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div>
                                            <img src="/assets/windspeed.svg" alt="" />
                                            <p>{weather.windSpeed} km/h<br />wind</p>
                                        </div>
                                        <div>
                                            <img src="/assets/humidity.svg" alt="" />
                                            <p>{weather.humidity}%<br />Humidiy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.HomeNotes}>
                            <div>
                                <p>All notes</p>
                                <textarea name="allnotes" id="notes" cols="10" rows="10" onChange={handleNotes}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={styles.HomeBottom}>
                        <Timer/>
                    </div>
                </div>
                <div className={styles.HomeRight}>
                    <div className={styles.news}>
                        <div>
                            <img src={news.image} alt="" />
                            <div> 
                                <p>{news.title&&news.title.slice(0,80)+'...'}</p>
                                <p>{news.newsTime}</p>
                            </div>
                        </div>
                        <div>
                            <p>{news.desc}...</p>
                        </div>
                    </div>
                    <button className={styles.HomeBrowse}>Browse</button>
                </div>
            </div>
        </>
    )
}

export default Home