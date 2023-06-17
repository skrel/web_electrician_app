'use client';

import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { initFirebase } from '../firebase/firebaseApp'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth } from "../firebase/firebaseApp"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Start = () => {

    // const [username, setUsername] = useState("krel.svyatoslav@gmail.com")
    // const [password, setPassword] = useState("Password1")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

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
                console.log('@@@ Error = ', error.message);
                alert(error.message);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.logincontainer}>
                <form onSubmit={signIn}>
                    <label style={{ color: 'white', fontStyle: 'italic' }}>Email</label>
                    <div>
                        <input
                            style={{
                                width: "300px",
                                height: "50px",
                                paddingLeft: "10px",
                                paddingTop: "5px",
                                border: "none",
                            }}
                            type='text'
                            name='username'
                            placeholder='email'
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <br />
                    <label style={{ color: 'white', fontStyle: 'italic' }}>Password</label>
                    <div>
                        <input
                            style={{
                                width: "300px",
                                height: "50px",
                                paddingLeft: "10px",
                                paddingTop: "5px",
                                border: "none",
                            }}
                            type='password'
                            name='password'
                            // TODO: how to secure the password entry
                            // secureTextEntry={true}
                            placeholder='password'
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <br />

                    <button style={{
                        width: "100px",
                        height: "50px",
                        borderColor: "white",
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        backgroundColor: "black",
                        marginLeft: "20px",
                        color: "white",
                    }} type='submit'>Login</button>

                    <p style={{ color: 'white', fontStyle: 'italic' }}>Download the app to register: <Link style={{ color: 'yellow'}} href={'https://lnkd.in/eSYF_DfE'} >Android</Link> or <Link style={{ color: 'yellow'}} href={'https://lnkd.in/eWrbYYtc'} >iOS</Link></p>


                </form>
            </div>
        </div>


    )
}

export default Start
