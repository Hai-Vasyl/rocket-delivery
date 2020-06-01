import React, { useState, useContext } from "react"
import style from "../styles/AuthPage.module.css"
import axios from "axios"
import { Context } from "../context/Context"
import { Link } from "react-router-dom"
import { FaSignInAlt, FaCheckCircle } from "react-icons/fa"
import mainStyle from "../styles/MainStyles.module.css"
import { IoIosRocket, IoIosAlert } from "react-icons/io"

function LoginPage() {
  const { wrapper } = mainStyle
  const {
    wrapperForm,
    sidebar,
    titleForm,
    input,
    formWrapper,
    btnWrapper,
    formWrapperRegister,
    errorContainer,
    btnAction,
    errorBlockPopup,
    btnLink,
    wrapperFormRregister,
    brand,
    errorBlock,
    loaderSign,
    load,
    sidebarRegister,
    loaderActive,
  } = style
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const { token, setToken } = useContext(Context)

  const handlerChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!form.email || !form.password || !form.username) {
        setError("Fill all fields!")
        return
      }
      setLoader(true)
      const res = await axios.post("/api/auth/register", form)
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
      <div className={`${wrapperForm} ${wrapperFormRregister}`}>
        <div className={`${sidebar} ${sidebarRegister}`}>
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
        <form
          onSubmit={handlerSubmit}
          className={`${formWrapper} ${formWrapperRegister}`}
        >
          <div className={`${loaderSign} ${loader && loaderActive}`}>
            <div className={load}></div>
          </div>
          <div className={titleForm}>
            <FaCheckCircle /> <span>Register</span>
          </div>
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={handlerChangeForm}
            placeholder='Username'
            className={input}
            autoComplete='off'
          />
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
              Sign Up
            </button>
            <Link to='/auth/login' className={btnLink}>
              <FaSignInAlt /> <span>Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
