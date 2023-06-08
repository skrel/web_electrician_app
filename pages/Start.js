'use client';

import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { initFirebase } from '../firebase/firebaseApp'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth } from "../firebase/firebaseApp"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Start = () => {

    const [username, setUsername] = useState("krel.svyatoslav@gmail.com")
    const [password, setPassword] = useState("Password1")
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
        <div>
            <form onSubmit={signIn}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                />
                <input
                    type='text'
                    name='password'
                    // TODO: how to secure the password entry
                    // secureTextEntry={true}
                    placeholder='password'
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
                <button type='submit'>Login</button>
            </form>
        </div>

    )
}

export default Start
