import React, { useState } from 'react'
import styles from './Register.module.css'
const Register = () => {

  // let valChk = false;
  let [error,setError] = useState(false);
  let [details, setDetails] = useState({
    name:'',
    userName:'',
    email:'',
    mobNum:'',
    checkbox:false
  })
  let [emailVal,setEmailVal] = useState(true)

  let handleError = ()=>{
    if(details.name==='' || details.userName==='' || details.email==='' || details.mobNum==='' || details.checkbox===false){
      setError(true);
      // valChk = false;
    }
    else{
      setError(false);
      // valChk = true;
    }
  }
  let handleChange = (e)=>{
      let {name, value} = e.target;
      setDetails({
        ...details,
        [name]:value
      })
      localStorage.setItem([name],value);
      
  }
  
  let handleNumber = (e)=>{
    if (!((e.key >= '0' && e.key <= '9') || (e.key === 'Backspace'))) { e.preventDefault(); } 
  }

  let handleEmail = (e)=>{
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      
      if(!email.test(e.target.value)){
        setEmailVal(false);
      }
      else{
        setEmailVal(true)
      }
  }

  let handleSubmit = (e)=>{
      e.preventDefault();
      // let {name, value} = e.target;
      handleError();
      
     
  }

  let handleName = (e) => { 
    if (!((e.key >= 'A' && e.key <= 'Z') || (e.key === ' ') || (e.key >= 'a' && e.key <= 'z') || (e.key === 'Backspace'))) 
    { e.preventDefault(); } 
  }

  return (
    <div className={styles.App}>
      <div >
        <img src='/assets/HomePic.png' alt='' />
        <p>Discover new things on Superapp</p>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.title}>
            <p>Super app</p>
            <p>Create your new account</p>
          </div>
          <div className={styles.formfill}>
            <input type='text' placeholder='Name' name='name' onChange={handleChange} onKeyDown={handleName}/>
            {(error&&details.name.length<=0)&&<p className={styles.err}>Field Required</p>}
            <input type='text' placeholder='UserName' name='userName' onChange={handleChange}/>
            {(error&&details.userName.length<=0)&&<p className={styles.err}>Field Required</p>}
            <input type='text' placeholder='Email' name='email'  onChange={(e)=>{handleChange(e);handleEmail(e)}}/>
            {(!emailVal&&details.email.length>=1)&&<p className={styles.err}>Invalid input</p>}
            {(error&&details.email.length<=0)&&<p className={styles.err}>Field Required</p>}
            <input type='text' placeholder='Mobile' name='mobNum' onKeyDown={handleNumber} maxLength={10} onChange={handleChange}/>
            {(error&&details.mobNum.length<=0)&&<p className={styles.err}>Field Required</p>}
            {((details.mobNum>=1 && details.mobNum.length<10))&&<p className={styles.err}>Invalid input</p>}

          </div>
          <div className={styles.checkbox}>
            <input type='checkbox' onClick={(e)=>setDetails({...details,checkbox:e.target.checked})}/>
            <label>Share my registration data with Superapp</label>
            {error&&(!details.checkbox)&&<p className={styles.err}>Check this box if you want to proceed</p>}
          </div>
          <div className={styles.btn}>
            <button>SIGN UP</button>
          </div>
        </form>
        <div className={styles.terms}>
            <p>By clicking on Sign up. you agree to Superapp <span>Terms and Conditions of Use</span></p>
            <p>To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span>Privacy Policy</span></p>
          </div>
      </div>
    </div>
  )
}

export default Register;