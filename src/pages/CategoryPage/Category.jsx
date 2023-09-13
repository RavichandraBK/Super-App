import React, { useState } from 'react'
import styles from './Category.module.css'
import Card from '../../components/Cards/Card'
import myContext from '../../components/Contexts/myContext'
import { useContext } from 'react'

const Category = () => {

  let CategType = [{
    id: '1',
    name: 'Action',
    image: '/assets/Cards/Action.png',
    color: '#FF5209'
  },
  {
    id: '2',
    name: 'Drama',
    image: '/assets/Cards/Drama.png',
    color: '#D7A4FF'
  },
  {
    id: '3',
    name: 'Romance',
    image: '/assets/Cards/Romance.png',
    color: '#11B800'
  },
  {
    id: '4',
    name: 'Thriller',
    image: '/assets/Cards/Thriller.png',
    color: '#84C2FF'
  },
  {
    id: '5',
    name: 'Western',
    image: '/assets/Cards/Western.png',
    color: '#902500'
  },
  {
    id: '6',
    name: 'Horror',
    image: '/assets/Cards/Horror.png',
    color: '#7358FF'
  },
  {
    id: '7',
    name: 'Music',
    image: '/assets/Cards/Music.png',
    color: '#FF4ADE'
  },
  {
    id: '8',
    name: 'Fiction',
    image: '/assets/Cards/Fiction.png',
    color: '#E61E32'
  },
  {
    id: '9',
    name: 'Fantasy',
    image: '/assets/Cards/Fantasy.png',
    color: '#6CD061'
  },
  ]
  let { Variables, setVariables,valid, setValid } = useContext(myContext);
  let [nextClick,setNextClick] = useState(false);
  let handleNext = () => {
      setNextClick(true);    
  }

  let handlecancel = (id) => {

    setVariables((prev) => ({ ...prev, [id]: { ...prev[id], Border: false } }));
    setValid((prev)=>({...prev,chk:prev.chk.filter((cardid)=>cardid!==id),count:prev.count-1}));
    localStorage.removeItem(`choice${id}`);


  }

  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryText}>
        <p>Super app</p>
        <p>Choose your entertainment category</p>
        <div className={styles.selected}>
          {CategType.map((item) => {
            return Variables[item.id]?.Border && (<div key={item.id} className={styles.selectedItems}><p>{item.name}</p> <span onClick={() => handlecancel(item.id)}>X</span></div>);
          })}
        </div>
        {valid.count<3&&nextClick && (<p className={styles.condCheck}><span><img src="/assets/Cards/Invalid.svg" alt="" /></span>Minimum 3 category required</p>)}
      </div>
      <div>
        <div className={styles.categoryCards}>
          <div>
            {
              CategType.map((item) => {
                return (<Card key={item.id} id={item.id} name={item.name} image={item.image} color={item.color} />)
              })
            }
          </div>
        </div>
        <button onClick={handleNext} className={styles.categoryNextPage}>Next Page</button>
      </div>
    </div>
  )
}

export default Category