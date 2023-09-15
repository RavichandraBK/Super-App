import styles from './Card.module.css'
import { useContext } from 'react';
import myContext from '../Contexts/myContext';
const Card = ({ id, name, image, color }) => {
    let { Variables, setVariables, valid, setValid } = useContext(myContext);

    let handleClick = () => {
        setVariables((prev) => ({ ...prev, [id]: { ...prev[id], Border: !prev[id]?.Border, name: name } }));
        if (valid.chk.includes(id)) {
            setValid((prev) => ({ ...prev, chk: prev.chk.filter((cardid) => cardid !== id), count: prev.count - 1 }));
            localStorage.removeItem(`choice${id}`);
        }
        else {
            setValid({ ...valid, chk: [...valid.chk, id], count: valid.count + 1 });

        }
    }

    return (
        <div className={styles.cardlayout} style={{ border: Variables[id]?.Border && '6px solid green', backgroundColor: color }} onClick={handleClick}>
            <p>{name}</p>
            <img src={image} alt='' />
        </div>

    )
}

export default Card