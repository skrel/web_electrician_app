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

    let title = "title undefind";
    if (auth.currentUser?.email === "krel.svyatoslav@gmail.com") {
        title = "Admin";
    }

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
            name: "ProjectName1",
            projects: []
          }
          await database.collection('users').add(data);
      }

      //
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getListProject()
            }
        });
        return unsubscribe;
    }, []);
    //


    // useEffect(() => {

    //     getListProject()
    // }, [])

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
            console.log(response)
        });
    }

    return (
        <div>
            <h1>My Profile</h1>
            <p>Hi, user {auth.currentUser?.email}, {title}</p>

            <p>Projects: </p>
            {listProject.map(project => <div><Link
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
            </Link></div>)}

                <br />
            <button onClick={signOutUser}>Sign Out</button>
            <button onClick={addNewProject}>Create New Project</button>
        </div>

    )
}

export default MyProfile