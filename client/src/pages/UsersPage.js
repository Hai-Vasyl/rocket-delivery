import React, { useEffect, useState, useContext } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import axios from "axios"
import { Context } from "../context/Context"
import User from "../components/User"

function UsersPage() {
  const { wrapper } = mainStyle
  const { token } = useContext(Context)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/auth/users", {
          headers: {
            Authorization: `Basic ${token.token}`,
          },
        })
        setData(res.data)
      } catch (error) {}
    }

    fetch()
  }, [token])

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/auth/delete/${id}`, {
        headers: {
          Authorization: `Basic ${token.token}`,
        },
      })
      setData(data.filter((user) => user._id !== id))
    } catch (error) {}
  }

  const usersJSX = data.map((user) => {
    return (
      <User key={user._id} user={user} handleDeleteUser={handleDeleteUser} />
    )
  })

  return <div className={wrapper}>{usersJSX}</div>
}

export default UsersPage
