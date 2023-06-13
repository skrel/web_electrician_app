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
    const naImage = 'https://skrel.github.io/jsonapi/public/image/na.png';
    const [editProjName, setEditProjName] = useState(false)
    const [newProjectName, setNewProjectName] = useState("")

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
                            // disabled={true}
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
            projects: [...itemsToDisplay, { "name": newItemName, "purpose": newItemPurpose, "qty": 1, "price": 0.01, "image": naImage }]
        })
    }

    const handleDeleteAllItemsFromFirebase = () => {
        console.log('delete all items button pressed;')
        database.collection('users').doc(projectIdsub).update({
            projects: []
        })
    }

    const handleDeleteItemFromFirebase = (item) => {
        console.log('delete specific item button pressed;')
        // need to assemble the new array with items
        let newItemArray = []
        console.log('my item that i am passing thru = ', item)
        for (var i = 0; i < projectItems.length; i++) {
            var object = projectItems[i]
            if (object.key + 1 !== item.key) {
                newItemArray.push(object)
            }
        }

        database.collection('users').doc(projectIdsub).update({
            projects: [...newItemArray]
        })
    }

    const editProjectName = () => {
        console.log('edit proj name button pressed;')
        setEditProjName(true)
    }

    const cancelProjectNameChange = () => {
        console.log('cancel proj name change button pressed;')
        setEditProjName(false)
    }

    const saveProjectName = () => {
        console.log('save proj name button pressed;')
        // TODO: check if this name exist
        database.collection('users').doc(projectIdsub).update({
            name: newProjectName
        })
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

    // build array of arrays for downloads
    let projectItemsToDownload = [["name", "qty", "purpose", "price"]]
    for (var i = 0; i < itemsToDisplay.length; i++) {
        var object = itemsToDisplay[i]
        const itemToDownload = [
            object.name,
            object.qty,
            object.purpose,
            object.price
        ]
        projectItemsToDownload.push(itemToDownload)
    }
    // console.log(projectItemsToDownload)

    let csv = arrayToCsv(projectItemsToDownload)

    /** Convert a 2D array into a CSV string
 */
    function arrayToCsv() {
        console.log('@@@ download button was pressed')
        console.log(projectItemsToDownload)

        return projectItemsToDownload.map(row =>
            row
                .map(String)  // convert every value to String
                .map(v => v.replaceAll('"', '""'))  // escape double colons
                .map(v => `"${v}"`)  // quote it
                .join(',')  // comma-separated
        ).join('\r\n');  // rows starting on new lines
    }

    /** Download contents as a file
   * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
   */
    function downloadBlob() {
        let filename = 'Electrician_Export.csv'
        let contentType = 'text/csv;charset=utf-8;'
        // Create a blob
        var blob = new Blob([csv], { type: contentType });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', filename);
        pom.click();
    }

    return (
        <div>
            <h1>Project Page</h1>

            <label>Project Name: </label>
            <input
                type='text'
                name='projectname'
                disabled={true}
                // onChange={(event) => setNewProjectName(event.target.value)}
                value={projNameToDisplay}
            />
            <button style={{ display: editProjName ? "none" : "block" }} onClick={editProjectName}>Edit</button>
            <input
                type={editProjName ? 'text' : 'hidden'}
                name='newprojectname'
                placeholder='Enter new project name'
                onChange={(event) => setNewProjectName(event.target.value)}
                value={newProjectName}
            />
            <button style={{ display: editProjName ? "block" : "none" }} onClick={saveProjectName}>Save</button>
            <button style={{ display: editProjName ? "block" : "none" }} onClick={cancelProjectNameChange}>Cancel Change</button>

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
                            <button onClick={() => handleDeleteItemFromFirebase(item)}>Delete</button>
                            <br /><br />
                        </div>
                    )
                }
                )}

            </div>
            <br />
            <Link href="/MyProfile"> Back </Link>
            <button onClick={handleDeleteAllItemsFromFirebase}>Delete All Items</button>
            <button onClick={downloadBlob}>Download *.csv</button>
            <AddItem />
        </div>

    )
}

export default ProjectPage