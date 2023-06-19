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
        <div className={styles.conteiner}>

            <div className={styles.header}>
                <button style={{ width: '100px', margin: '10px', backgroundColor: 'green', color: 'white' }} onClick={updateItem}>Update</button>
            </div>

            <h1>SORRY, THIS SCREEN IS IN PROGRESS</h1>
            <p>Item name: {itemNameToDisplay}</p>
            <Link href="/MyProfile">Back To Project</Link>
        </div>

    )

}

export default ItemPage