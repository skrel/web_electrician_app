import { useRouter } from 'next/router'
import Link from 'next/link'
import database from "../firebase/firebaseApp"
import styles from '../styles/Home.module.css'
import { auth } from "../firebase/firebaseApp";
import React, { useState, useEffect } from 'react'



function ProjectPage() {

    const router = useRouter()

    const [data, setData] = useState()
    const [projNameToDisplay, setProjNameToDisplay] = useState("")
    const [projectId, setProjectId] = useState()
    const [projectIdsub, setProjectIdsub] = useState()
    const [itemsToDisplay, setItemsToDisplay] = useState([])
    const naImage = 'https://skrel.github.io/jsonapi/public/image/na.png'
    const [editProjName, setEditProjName] = useState(false)
    const [newProjectName, setNewProjectName] = useState("")

    const { push } = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        setData(router.query)
        setProjNameToDisplay(JSON.stringify(router.query.projname))
        setProjectId(JSON.stringify(router.query.projid))
        setProjectIdsub(JSON.stringify(router.query.projid).substring(1, 21))
        setItemsToDisplay(JSON.parse(router.query.items))

    }, [router.isReady]);

    // for console log only
    console.log('project id = ', projectIdsub)
    if(itemsToDisplay !== undefined) {
        console.log('you have', itemsToDisplay.length, 'items in this proj')
    }

    // to add item to db -> add item and then reset setItemsToDisplay
    // no need to refresh the page
    const handleSaveItemToFirebase = async () => {
        console.log('save new item button pressed;')
        await database.collection('users').doc(projectIdsub).update({
            projects: [...itemsToDisplay, 
                { "name": "Item Name", 
                "purpose": "Item Purpose", 
                "qty": 1, 
                "price": 0.01, 
                "image": naImage }]
        }).then(() => setItemsToDisplay([...itemsToDisplay, 
            { "name": "Item Name", 
            "purpose": "Item Purpose", 
            "qty": 1, 
            "price": 0.01, 
            "image": naImage }]))




        // this did not work ------>
        // router.replace("/MyProfile")
        // router.replace('/ProjectPage')
        // .then(() => {
        //     window.location.reload()
        // })
        // .then(router.replace(router.asPath))
        // .then(data => {return Promise.all(data)})
        // .then(data => {console.log(Promise)})
        // .then(() => {
        //     window.location.reload()
        // })

        // push('/MyProfile')
        // push('/ProjectPage')
        // router.replace('/ProjectPage')
        // router.refresh()
        // router.reload('/MyProfile')
        // window.location.reload()
        // router.reload();
        // router.push({ pathname: "/ProjectPage" })
        // router.replace(router.asPath)
    }











    // to add item to db -> add item and then reset setItemsToDisplay
    // no need to refresh the page
    const handleDeleteAllItemsFromFirebase = () => {
        console.log('delete all items button pressed;')
        database.collection('users').doc(projectIdsub).update({
            projects: []
        }).then(() => setItemsToDisplay())
    }

    const handleDeleteItemFromFirebase = (item) => {
        console.log('delete specific item button pressed;')
        // need to assemble the new array with items
        let newItemArray = []
        console.log('my item that i am passing thru = ', item)
        for (var i = 0; i < projectItems.length; i++) {
            var object = projectItems[i]
            if (object.key !== item.key) {
                newItemArray.push(object)
            }
        }

        console.log('newItemArray length = ', newItemArray.length)

        database.collection('users').doc(projectIdsub).update({
            projects: [...newItemArray]
        })
        .then(() => setItemsToDisplay(newItemArray))
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

        push('/Start')
    }

    let projectItems = []
    if(itemsToDisplay !== undefined) {
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
    }
    
    // console.log('my items in this project = ', projectItems)

    // build array of arrays for downloads
    let projectItemsToDownload = [["name", "qty", "purpose", "price"]]
    if(itemsToDisplay !== undefined) {
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
    }
    // console.log(projectItemsToDownload)

    let csv = arrayToCsv(projectItemsToDownload)

    /** Convert a 2D array into a CSV string */
    function arrayToCsv() {
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
        <div className={styles.flexRow}>

            {/* LEFT */}
            <div className={styles.columnleft}>
                {/* Links and path */}
                <p>
                    <Link style={{ textDecoration: 'none' }} href="/">Home</Link>
                    /
                    <Link style={{ textDecoration: 'none' }} href="/MyProfile">My Profile</Link>
                    /
                </p>

                {/* Description */}
                <h2>Project Info</h2>
                <p>Project name: {projNameToDisplay}</p>
                <p>Created: </p>
                <p>Type: </p>

                {/* Button deck */}
                <button className={styles.card} onClick={handleDeleteAllItemsFromFirebase}>Delete All</button>
                <button className={styles.card} onClick={downloadBlob}>Download</button>
                <button className={styles.card} onClick={handleSaveItemToFirebase}>Add Item</button>
            </div>


            {/* LEFT */}
            <div className={styles.columnright} >
                <div className={styles.flexRowLocal}>
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
                </div>


                <br />
                <div>
                    {projectItems.map(item => {
                        return (
                            <div className={styles.projectitem} key={item.key}>
                                <img src={item.image} width={100} height={100} />
                                <div style={{ width: '100%', paddingLeft: '5px' }}>
                                    <p style={{ lineHeight: '20%' }}>{item.key}. {item.name}</p>
                                    <p style={{ lineHeight: '20%' }}>QTY: {item.qty}</p>
                                    <p style={{ lineHeight: '20%' }}>Purpose: {item.purpose}</p>
                                    <p style={{ lineHeight: '20%' }}>Price: {item.price}</p>
                                </div>

                                <div className={styles.columnright}>
                                    <Link
                                        className={styles.card}
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
                                    <button className={styles.card} onClick={() => handleDeleteItemFromFirebase(item)}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectPage