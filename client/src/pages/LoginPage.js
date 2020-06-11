import React, { useState, useContext } from "react"
import style from "../styles/AuthPage.module.css"
import axios from "axios"
import { Context } from "../context/Context"
import { Link } from "react-router-dom"
import { FaSignInAlt, FaCheckCircle } from "react-icons/fa"
import { IoIosRocket, IoIosAlert } from "react-icons/io"
import mainStyle from "../styles/MainStyles.module.css"

function LoginPage() {
  const { wrapper } = mainStyle
  const {
    wrapperForm,
    sidebar,
    titleForm,
    input,
    formWrapper,
    btnWrapper,
    errorContainer,
    btnAction,
    errorBlockPopup,
    btnLink,
    brand,
    errorBlock,
    loaderSign,
    load,
    loaderActive,
  } = style
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const { setToken } = useContext(Context)

  const handlerChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!form.email || !form.password) {
        setError("Fill all fields!")
        return
      }
      setLoader(true)
      const res = await axios.post("/api/auth/login", form)
      localStorage.setItem("Auth", JSON.stringify(res.data))
      setToken(res.data)
    } catch (error) {
      setError(JSON.parse(error.request.response).message)
      setLoader(false)
    }
  }

  let errorJSX = error.split("!").map((e) => {
    return (
      <div key={e} className={errorContainer}>
        <IoIosAlert /> <span>{e.trim()}</span>
      </div>
    )
  })
  errorJSX[errorJSX.length - 1] = null

  return (
    <div className={wrapper}>
      <div className={wrapperForm}>
        <div className={sidebar}>
          <h2 className={brand}>
            <IoIosRocket /> <span>Rocket-Delivery</span>
          </h2>
          <div
            className={`${errorBlock} ${error && errorBlockPopup}`}
            onClick={() => setError("")}
          >
            {errorJSX}
          </div>
        </div>
        <form onSubmit={handlerSubmit} className={formWrapper}>
          <div className={`${loaderSign} ${loader && loaderActive}`}>
            <div className={load}></div>
          </div>
          <div className={titleForm}>
            <FaSignInAlt /> <span>Login</span>
          </div>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handlerChangeForm}
            placeholder='Email'
            className={input}
            autoComplete='off'
          />
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handlerChangeForm}
            placeholder='Password'
            className={input}
            autoComplete='off'
          />
          <div className={btnWrapper}>
            <button onClick={handlerSubmit} className={btnAction}>
              Sign In
            </button>
            <Link to='/auth/register' className={btnLink}>
              <FaCheckCircle /> <span>Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
