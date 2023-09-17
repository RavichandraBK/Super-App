import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'

const Home = () => {
    const allKeys = Object.keys(localStorage);
    const SelItems = allKeys.filter(key => /^choice\d+$/.test(key));
    const [name, email, userName] = ['name', 'email', 'userName'].map((key) => localStorage.getItem(key));
    const [weather, setWeather] = useState({});
    const wther = async () => {
        await fetch('http://api.weatherapi.com/v1/current.json?key=e9ef1737e2a24d0ca66124245231509&q=India&aqi=yes').then((res) => {
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
                    //  icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                    temp: data.current.temp_c,
                    pressure: data.current.pressure_mb,
                    windSpeed: data.current.wind_kph,
                    humidity: data.current.humidity,
                }))
            }).catch((err) => { console.log(err) });
        // return data;

    }

    useEffect(() => {
        wther();
    }, [])
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
                                        <p>{weather.temp}</p>
                                        <div>
                                            <img src="/assets/pressurebar.svg" alt="" />
                                            <p>{weather.pressure}<br/>Pressure </p>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <div>
                                            <img src="/assets/windspeed.svg" alt="" />
                                            <p>{weather.windSpeed} km/h<br/>wind</p>
                                        </div>
                                        <div>
                                            <img src="/assets/humidity.svg" alt="" />
                                            <p>{weather.humidity}%<br/>Humidiy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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