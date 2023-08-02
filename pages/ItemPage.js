import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

function ItemPage() {

    const router = useRouter()
    const data = router.query

    const itemNameToDisplay = JSON.stringify(data.itemName)
    // const itemQTYToDisplay = JSON.stringify(data.itemQty)
    // const itemPurposeToDisplay = JSON.stringify(data.itemPurpose)
    // const itemPriceToDisplay = JSON.stringify(data.itemPrice)
    
    // const projId = JSON.stringify(data.projectId).substring(1, 21)

    const [itemName, setItemName] = useState('')
    const [projectId, setProjectId] = useState('')

    useEffect(() => {
        if (!router.isReady) return;
        setItemName(JSON.stringify(data.itemName))
        setProjectId(JSON.stringify(data.projectId).substring(1, 21))

    }, [router.isReady]);

    console.log('@@@ proj id = ', projectId)

    const updateItem = () => {
        console.log('update item was pressed')
        // code to update item here
        
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

                {/* item name */}
                <input
                    type={'text'}
                    name='name'
                    placeholder='Enter item name'
                    onChange={(event) => setItemName(event.target.value)}
                    value={itemName}
                /> <br />

                {/* item qty */}
                {/* <input
                    type={'text'}
                    name='qty'
                    placeholder='Enter item qty'
                    onChange={(event) => setItemName(event.target.value)}
                    value={itemQTYToDisplay}
                /> <br /> */}

                {/* item price */}
                {/* <input
                    type={'text'}
                    name='price'
                    placeholder='Enter item price'
                    // onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemPriceToDisplay}
                /> <br /> */}

                {/* item purpose */}
                {/* <input
                    type={'text'}
                    name='purpose'
                    placeholder='Enter item purpose'
                    // onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemPurposeToDisplay}
                /> */}
            </div>

        </div>

    )

}

export default ItemPage