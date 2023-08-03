import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import database from "../firebase/firebaseApp"
import { auth } from "../firebase/firebaseApp"

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
    const [itemArrNum, setItemArrNum] = useState('')


    useEffect(() => {
        if (!router.isReady) return;
        setItemName(JSON.stringify(data.itemName))
        setProjectId(JSON.stringify(data.projectId).substring(1, 21))
        setItemArrNum(JSON.stringify(data.itemarrnumber).substring(1, 2))

    }, [router.isReady]);











    // update item functionality
    // query project by id
    const updateItem = () => {
        console.log('update item was pressed')
        getProjectById()
        // code to update item here

    }

    // get the project by id
    const getProjectById = async () => {

        let pojectItems = []
        let itemsNoChange = []
        let updatedItem = []

        // check ids
        console.log('@@@ proj id = ', projectId)
        console.log('@@@ item arr number = ', itemArrNum)

        // get project items
        await database.collection('users')
            .doc(projectId)
            .get()
            .then(doc => {
                if (doc && doc.exists) {
                    let myData = doc.data()
                    console.log(doc.id, '=>', myData)
                    console.log('name = ', myData.name)
                    console.log('items = ', myData.projects)
                    pojectItems = [...myData.projects]
                }
            })


        for (var i = 0; i < pojectItems.length; i++) {
            if (i != itemArrNum) {
                console.log('no change')
                itemsNoChange.push(pojectItems[i])
            } else {
                console.log('change')
                pojectItems[i].name = itemName
                // pojectItems[i].price = 'new name here'
                // pojectItems[i].purpose = 'new name here'
                // pojectItems[i].qty = 'new name here'
                updatedItem.push(pojectItems[i])
            }
        }

        let itemsToPush = [...itemsNoChange, ...updatedItem]
        console.log('my new items -->')
        console.log(itemsToPush)

        // update item
        await database.collection('users').doc(projectId).update({
            projects: [...itemsToPush]
        })
            .then(() => router.push('/MyProfile'))
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
                    style={{
                        width: "300px",
                        height: "50px",
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        border: "1px solid black",
                        margin: "5px"
                    }}
                    type={'text'}
                    name='name'
                    placeholder='Enter item name'
                    onChange={(event) => setItemName(event.target.value)}
                    value={itemName}
                /> <br />

                {/* item qty */}
                <input
                    style={{
                        width: "300px",
                        height: "50px",
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        border: "1px solid black",
                        margin: "5px"
                    }}
                    type={'text'}
                    name='qty'
                    placeholder='Enter item qty'
                    onChange={(event) => setItemName(event.target.value)}
                    value={itemName}
                /> <br />

                {/* item price */}
                <input
                    style={{
                        width: "300px",
                        height: "50px",
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        border: "1px solid black",
                        margin: "5px"
                    }}
                    type={'text'}
                    name='price'
                    placeholder='Enter item price'
                    onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemName}
                /> <br />

                {/* item purpose */}
                <input
                    style={{
                        width: "300px",
                        height: "50px",
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        border: "1px solid black",
                        margin: "5px"
                    }}
                    type={'text'}
                    name='purpose'
                    placeholder='Enter item purpose'
                    onChange={(event) => setNewProjectName(event.target.value)}
                    value={itemName}
                />
            </div>

        </div>

    )

}

export default ItemPage