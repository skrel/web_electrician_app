import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

function ItemPage() {

    const router = useRouter()
    const data = router.query
    const itemNameToDisplay = JSON.stringify(data.itemName)

    const updateItem = () => {
        console.log('update item was pressed')
    }


    return (
        <div className={styles.flexRow}>

            {/* LEFT */}
            <div className={styles.columnleft}>
                {/* Links and path */}
                <p>
                    <Link style={{ textDecoration: 'none' }} href="/MyProfile">My Profile</Link>
                    /
                    {/* <Link style={{ textDecoration: 'none' }} href="/ProjectPage">Project Page</Link> */}
                </p>

                {/* Description */}
                <h2>Item Info</h2>
                <p>Item name: {itemNameToDisplay}</p>
                
                {/* Button deck */}
                {/* <button style={{ width: '100px', margin: '10px', backgroundColor: 'green', color: 'white' }} onClick={updateItem}>Update</button> */}
                <button className={styles.card} onClick={updateItem}>Update</button>
            </div>


            {/* LEFT */}
            <div className={styles.columnright} >
                <h1>SORRY, THIS SCREEN IS IN PROGRESS</h1>
            </div>

        </div>

    )

}

export default ItemPage