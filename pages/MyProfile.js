import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { initFirebase } from '../firebase/firebaseApp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from "../firebase/firebaseApp";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut } from "firebase/auth";
import database from "../firebase/firebaseApp"

function MyProfile() {

    const router = useRouter();
    const [listProject, setListProject] = useState([])

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                router.push('/Start');
            })
            .catch((error) => alert(error.message));
    };

    const addNewProject = async () => {
        console.log('create new project was pressed')
        const data = {
            userId: auth.currentUser.uid,
            name: "ProjectName_" + Math.random().toString(36).substr(2, 9), // generate random name
            projects: []
        }
        await database.collection('users').add(data);

        router.reload()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getListProject()
            }
        });
        return unsubscribe;
    }, []);

    // get list of projects
    const getListProject = async () => {
        database.collection('users').where('userId', '==', auth.currentUser.uid).get().then(async (snapshot) => {
            // let data = snapshot.data();
            let response = []
            snapshot
                .forEach(documentSnapshot => {
                    let item = { ...documentSnapshot.data(), id: documentSnapshot.id };
                    response.push(item)
                });
            setListProject(response)
            console.log('my projects = ', response)
        });
    }

    const deleteProject = (projectName) => {
        console.log('delete project button was pressed')
        console.log('project id to delete = ', projectName)

        let xUser = auth.currentUser.uid
        const getCollection = database.collection("users")
        const userFilter = getCollection.where("userId", "==", xUser)
        const projectQuery = userFilter.where("name", "==", projectName)

        projectQuery.get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            })
        })
        // .then(router.reload())
        router.replace('/Start')
        // router.refresh()
        // router.reload('/MyProfile')
    }

    return (

        <div className={styles.flexRow}>

            {/* LEFT */}
            <div className={styles.columnleft}>
                {/* Links and path */}
                <p>
                    <Link style={{ textDecoration: 'none' }} href="/">Home</Link>
                    /
                </p>

                {/* Description */}
                <h2>My Profile</h2>
                <p>User name: {auth.currentUser?.email}</p>
                <p>Last login: </p>

                {/* Button deck */}
                <button className={styles.card} onClick={signOutUser}>Sign Out</button>
                <button className={styles.card} onClick={addNewProject}>+ New Prj</button>
            </div>


            {/* LEFT */}
            <div className={styles.columnright} >
                {listProject.map(project => <div className={styles.project} key={project.id}>
                    <Link
                        style={{ color: 'black', fontSize: 20, margin: 10, padding: 10, textDecoration: 'none', width: '100%', textAlign: 'center', }}
                        href={{
                            pathname: '/ProjectPage',
                            query: {
                                projname: project.name,
                                projid: project.id,
                                items: JSON.stringify(project.projects)
                            } // the data, cant send a lot of data
                            // to send array of items cant use items: project.projects
                        }}
                    >
                        {project.name}
                    </Link>
                    <button style={{ margin: '10px' }} onClick={() => deleteProject(project.name)}>Delete</button>
                </div>)}
            </div>

        </div>
    )
}

export default MyProfile