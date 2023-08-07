'use client';

import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { initFirebase } from '../firebase/firebaseApp'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth } from "../firebase/firebaseApp"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Start = () => {

    // const [username, setUsername] = useState("krel.svyatoslav@gmail.com")
    // const [password, setPassword] = useState("Password1")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const notify = () => toast("Your email address or password is incorrect!")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push('/MyProfile')
            }
        });
        return unsubscribe;
    }, []);

    async function signIn(event) {
        event && event.preventDefault()
        setUsername(username)
        setPassword(password)
        console.log('@@@ Username:', username, 'Password:', password)

        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('@@@ User metadata while signIn: ', user.metadata)
            })
            .catch((error) => {
                console.log('@@@ Error = ', error.message)
                // alert(error.message)
                notify()
            });
    };



    return (
        <div className={styles.container}>
            <form onSubmit={signIn}>
                {/* <label style={{ fontStyle: 'italic' }}>Email</label> */}
                <div>
                    <input
                        style={{
                            width: "300px",
                            height: "50px",
                            paddingLeft: "10px",
                            paddingTop: "5px",
                            border: "none",
                            borderBottom: "1px solid black",
                            borderRadius: "10px",
                            boxShadow: "5px 5px 5px 5px rgb(216, 216, 216)"
                        }}
                        type='text'
                        name='username'
                        placeholder='Enter email'
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                        required
                    />
                </div>
                <br />
                {/* <label style={{nfontStyle: 'italic' }}>Password</label> */}
                <div>
                    <input
                        style={{
                            width: "300px",
                            height: "50px",
                            paddingLeft: "10px",
                            paddingTop: "5px",
                            border: "none",
                            borderBottom: "1px solid black",
                            borderRadius: "10px",
                            boxShadow: "5px 5px 5px 5px rgb(216, 216, 216)"
                        }}
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        required
                    />
                </div>

                <div className={styles.grid}>
                    <button className={styles.card} type='submit'>Login</button>
                </div>

                <p style={{ fontStyle: 'italic' }}>Download the app to register: <Link href={'https://lnkd.in/eSYF_DfE'} >Android</Link> or <Link href={'https://lnkd.in/eWrbYYtc'} >iOS</Link></p>

            </form>

            <ToastContainer />
        </div>


    )
}

export default Start
