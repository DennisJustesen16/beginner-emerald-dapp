import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";

export default function Home() {
  
  const [newGreeting, setNewGreeting] = useState('');
  const [greeting, setGreeting] = useState('');
  
  function runTransaction(){
    console.log(newGreeting)
  }
  async function executeScript(){
    const response = await fcl.query({
      cadence: `
      import HelloWorld from 0x24b1f8dfe3950ad7

      pub fun main(): String {
          return HelloWorld.greeting
      }`,
      args: (arg, t) => []
    })
    
    setGreeting(response)
    console.log("Response from our script: " + response);
  }
  useEffect(()=> {
    executeScript()
  }, [])
  
  async function executeScriptNumber(){
    const response = await fcl.query({
      cadence: `
      import SimpleTest from 0x6c0d53c676256e8c

      pub fun main(): Int {
          return SimpleTest.number
      }`,
      args: (arg, t) => []
    })
    
    console.log("Your number is: " + response);
  }
  useEffect(()=>{
    executeScriptNumber()
  }, [])

  async function executeScriptRandom(){
    const response = await fcl.query({
      cadence: `
      pub fun main(
        a: Int,
        b: String,
        c: UFix64,
        d: Address,
        e: Bool,
        f: String?,
        g: [Int],
        h: {String: Address}
      ){}
      `,
      args: (arg, t) => [
        arg("2", t.Int),
        arg("Jacob is so cool", t.String),
        arg("5.0", t.UFix64),
        arg("0x6c0d53c676256e8c", t.Address),
        arg(true, t.Bool),
        arg(null, t.Optional(t.String)),
        arg([1, 2, 3], t.Array(t.Int)),
        arg(
          [
            { key: "FLOAT", value: "0x2d4c3caffbeab845" },
            { key: "EmeraldID", value: "0x39e42c67cc851cfb" }
          ], 
          t.Dictionary({ key: t.String, value: t.Address })
        )
      ]
    })
      console.log("Yeet: " + response);
  }
  useEffect(()=>{
    executeScriptRandom().Address
  }, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>Emerald DApp</title>
        <meta name="description" content="Created by Emerald Academy" />
        <link rel="icon" href="https://i.imgur.com/hvNtbgD.png" />
      </Head>


      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <a href="https://google.com" target="_blank">Emerald DApp!</a>
        </h1>
        <p>
          Sponsored by Google
          </p>
          <div className={styles.flex}>
            <button onClick={runTransaction}>Run Transaction</button>
            <input onChange={(e) => setNewGreeting(e.target.value)} placeholder='Hello, Idiots!' />
          </div>
          <p>
            {greeting}
          </p>
          
      </main>
    </div>
  )
}