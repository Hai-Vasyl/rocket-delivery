import React, { useContext, useState, useEffect } from "react"
import style from "./styles/App.module.css"
import { Context } from "./context/Context"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"
import Loader from "./components/Loader"
import AuthUser from "./components/AuthUser"
import CartNavbar from "./components/CartNavbar"

function App() {
  const { wrapper, background, backgroundOn } = style

  const [ready, setReady] = useState(false)
  const {
    token,
    setToken,
    drop,
    setDrop,
    popupCart,
    setPopupCart,
  } = useContext(Context)

  useEffect(() => {
    const auth = localStorage.getItem("Auth")
    if (!!auth) {
      setToken(JSON.parse(auth))
    }

    setTimeout(() => setReady(true), 1000)
  }, [setToken])

  if (!ready) {
    return (
      <div className={wrapper}>
        <Loader />
      </div>
    )
  }

  return (
    <Router>
      <div className={wrapper}>
        <Navbar />
        <div
          className={`${background} ${drop && backgroundOn}`}
          onClick={() => setDrop(false)}
        ></div>
        <CartNavbar
          popupCart={popupCart}
          setPopupCart={setPopupCart}
          token={token}
        />
        <AuthUser token={token} />
      </div>
    </Router>
  )
}

export default App
