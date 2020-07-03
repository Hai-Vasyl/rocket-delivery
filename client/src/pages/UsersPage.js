import React, { useEffect, useState } from "react"
import mainStyle from "../styles/MainStyles.module.css"
import User from "../components/User"
import LoaderData from "../components/LoaderData"
import { useHTTP } from "../hooks/useHTTP"

function UsersPage() {
  const { wrapper } = mainStyle
  const [data, setData] = useState([])
  const { fetchData, load } = useHTTP()

  useEffect(() => {
    fetchData("get", "/api/auth/users", null, setData)
  }, [fetchData])

  const handleDeleteUser = async (id) => {
    setData(data.filter((user) => user._id !== id))
    fetchData("delete", `/api/auth/delete/${id}`)
  }

  const usersJSX = data.map((user) => {
    return (
      <User key={user._id} user={user} handleDeleteUser={handleDeleteUser} />
    )
  })

  if (!load) {
    return (
      <div className={wrapper}>
        <LoaderData />
      </div>
    )
  }
  return <div className={wrapper}>{usersJSX}</div>
}

export default UsersPage
