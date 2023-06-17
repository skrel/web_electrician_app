// to create a new app --> https://nextjs.org/learn/basics/create-nextjs-app/setup
// to start the server --> npm run dev

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Home() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Electrician</title>
                {/* TODO change the page icon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <h1>Home</h1> */}

            <div className={styles.mycontainer}>
                <Link href="/Start"
                    style={{
                        textDecoration: 'none',
                        textAlign: 'center',
                        width: 100,
                        marginTop: 150,
                        marginLeft: 100,
                        border: '2px solid blue',
                        borderRadius: '10px',
                        color: 'blue',
                        fontSize: 28,
                        fontStyle: 'italic',
                    }}
                >Start</Link>
            </div>

        </div>

    )
}