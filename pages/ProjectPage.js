import { useRouter } from 'next/router'
import Link from 'next/link'
import database from "../firebase/firebaseApp"
import styles from '../styles/Home.module.css'

// import AddItem from "../components/AddItem"

import React, { useState, useEffect } from 'react'

// TODO:  each child in the list should have a unique "key" prop.

// TODO: make modal, add useState to save items, figure out how to refresh page

function ProjectPage() {

    const router = useRouter()

    const [data, setData] = useState()
    const [projNameToDisplay, setProjNameToDisplay] = useState()
    const [projectId, setProjectId] = useState()
    const [projectIdsub, setProjectIdsub] = useState()
    const [itemsToDisplay, setItemsToDisplay] = useState([])

    useEffect(() => {
        if (!router.isReady) return;
        setData(router.query)
        setProjNameToDisplay(JSON.stringify(router.query.projname))
        setProjectId(JSON.stringify(router.query.projid))
        setProjectIdsub(JSON.stringify(router.query.projid).substring(1, 21))
        setItemsToDisplay(JSON.parse(router.query.items))

    }, [router.isReady]);

    const [showModal, setShowModal] = useState(false)
    const [newItemName, setNewItemName] = useState('')
    const [newItemPurpose, setNewItemPurpose] = useState('')

    const AddItem = () => {
        return (
            <div>
                <div>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Add Single Item
                    </button>
                </div>

                {showModal ? (
                    <div className={styles.modalOutside}>
                        <div className={styles.modalInside}>
                            <h2>Create New Item</h2><br />
                            <input
                                type='text'
                                name='itemname'
                                placeholder='Enter name'
                                onChange={(event) => setNewItemName(event.target.value)}
                                value={newItemName}
                            />

                            <input
                                type='text'
                                name='itempurpose'
                                placeholder='Enter purpose'
                                onChange={(event) => setNewItemPurpose(event.target.value)}
                                value={newItemPurpose}
                            />
                            <input
                                type='text'
                                name='itemqty'
                                placeholder='Enter qty'
                            // onChange={(event) => setPassword(event.target.value)}
                            // value={password}
                            />
                            <input
                                type='text'
                                name='itemprice'
                                placeholder='Enter price'
                            // onChange={(event) => setPassword(event.target.value)}
                            // value={password}
                            />

                            <br />
                            <button onClick={handleSaveItemToFirebase}>Add</button>
                            <button onClick={() => setShowModal(false)}>Close</button>

                        </div>

                    </div>
                ) : null}
            </div>

        )
    }

    const handleSaveItemToFirebase = () => {
        console.log('save new item button pressed;')
        database.collection('users').doc(projectIdsub).update({
            projects: [...itemsToDisplay, { "name": newItemName, "purpose": newItemPurpose }]
        })
    }

    const handleDeleteAllItemsFromFirebase = () => {
        console.log('delete all items button pressed;')
        database.collection('users').doc(projectIdsub).update({
            projects: []
        })
    }

    const handleDeleteItemFromFirebase = ({item}) => {
        console.log('delete specific item button pressed;')
        // need to assemble the new array with items
        let newItemArray = []
        console.log('my item that i am passing thru = ', item)
        // for(var i = 0; i < projectItems.length; i++) {
        //     var object = projectItems[i]
        //     if(object.key+1 !== item.key) {
        //         newItemArray.push(object)
        //     }
        // }

        // database.collection('users').doc(projectIdsub).update({
        //     projects: [...newItemArray]
        // })
    }

    let projectItems = []
    for (var i = 0; i < itemsToDisplay.length; i++) {
        var object = itemsToDisplay[i]
        const projectItem = {
            key: i + 1,
            name: object.name,
            image: object.image,
            qty: object.qty,
            purpose: object.purpose,
            price: object.price
        }
        projectItems.push(projectItem)
    }
    // console.log('my items in this project = ', projectItems)

    return (
        <div>
            <h1>Project Page</h1>
            <p>Project Name: {projNameToDisplay}</p>
            <br />
            <div>
                {projectItems.map(item => {
                    return (
                        <div>
                            <p>{item.key}. {item.name}</p>
                            <p>{item.image}, qty: {item.qty}</p>
                            <p>purpose: {item.purpose}, price: {item.price}</p>
                            <Link
                                href={{
                                    pathname: '/ItemPage',
                                    query: {
                                        itemName: item.name,
                                        itemQty: item.qty,
                                        itemPurpose: item.purpose,
                                        itemPrice: item.price
                                    }
                                }}
                            >
                                Edit
                            </Link>
                            <button onClick={handleDeleteItemFromFirebase(item)}>Delete</button>
                            <br /><br />
                        </div>
                    )
                }
                )}

            </div>
            <br />
            <Link href="/MyProfile"> Back </Link>
            <button onClick={handleDeleteAllItemsFromFirebase}>Delete All Items</button>
            <AddItem />
        </div>

    )
}

export default ProjectPage