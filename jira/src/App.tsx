import React from 'react'
import logo from './logo.svg'
import './App.css'

function App () {

  const post = async () => {
    const data = {username: 'xiaoming'}
    const res = await fetch('http://localhost:39200/users', {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const r = await res.json()
    console.log(r)
  }


  return (
    <div className="App">
      <button onClick={post}>post</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
