import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

function ItemPage() {

    const router = useRouter()
    const data = router.query
    const itemNameToDisplay = JSON.stringify(data.itemName)

    const itemQTYToDisplay = JSON.stringify(data.itemQty)
    const itemPurposeToDisplay = JSON.stringify(data.itemPurpose)
    const itemPriceToDisplay = JSON.stringify(data.itemPrice)




    const updateItem = () => {
        console.log('update item was pressed')
    }


    return (
        <div className={styles.flexRow}>

            {/* LEFT */}
            <div className={styles.columnleft}>
                {/* Links and path */}
                <p>
                    <Link style={{ textDecoration: 'none' }} href="/">Home</Link>
                    /
                    <Link style={{ textDecoration: 'none' }} href="/MyProfile">My Profile</Link>
                    /
                    <Link style={{ textDecoration: 'none' }} href="/MyProfile">Project Page</Link>
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

                <input
                    type={'text'}
                    name='newprojectname'
                    placeholder='Enter new project name'
                    // onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemNameToDisplay}
                /> <br />

                <input
                    type={'text'}
                    name='newprojectname'
                    placeholder='Enter new project name'
                    // onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemQTYToDisplay}
                /> <br />

                <input
                    type={'text'}
                    name='newprojectname'
                    placeholder='Enter new project name'
                    // onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemPriceToDisplay}
                /> <br />

                <input
                    type={'text'}
                    name='newprojectname'
                    placeholder='Enter new project name'
                    // onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemPurposeToDisplay}
                />
            </div>

        </div>

    )

}

export default ItemPage