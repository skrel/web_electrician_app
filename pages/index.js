// to create a new app --> https://nextjs.org/learn/basics/create-nextjs-app/setup
// to start the server --> npm run dev

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Home() {

    return (
        // <div className={styles.container}>
        //     <Head>
        //         <title>Electrician</title>
        //         {/* TODO change the page icon */}
        //         <link rel="icon" href="/favicon.ico" />
        //     </Head>
        //     {/* <h1>Home</h1> */}

        //     <div className={styles.mycontainer}>
        //         <Link href="/Start"
        //             className={styles.card}
        //         >Start</Link>
        //     </div>
        // </div>


        <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/skrel/Electrician/wiki">Electrician!</a>
        </h1>
        <p className={styles.description}>
          Join our <a href="https://www.linkedin.com/company/app-for-electrician/?viewAsMember=true">LinkedIn</a>
          {/* <code className={styles.code}>pages/index.js</code> */}
        </p>
        <div className={styles.grid}>
          <a href="/Start" className={styles.card}>
            <h3>Start &rarr;</h3>
            <p>Discover our app and services featuring web and mobile applications.</p>
          </a>
          {/* <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
    )
}