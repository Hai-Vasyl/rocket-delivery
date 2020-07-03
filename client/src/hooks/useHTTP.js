import { useState, useContext, useCallback } from "react"
import axios from "axios"
import { Context } from "../context/Context"

export function useHTTP() {
  const [load, setLoad] = useState(false)
  const { token } = useContext(Context)

  const fetchData = useCallback(
    async (method = "get", url, data, setState = null) => {
      try {
        const res = await axios({
          url,
          method,
          data,
          headers: token.token && {
            Authorization: `Basic ${token.token}`,
          },
        })

        if (setState) {
          setState(res.data)
        }

        setLoad(true)

        return res.data
      } catch (error) {}
    },
    [token.token]
  )

  return { load, fetchData }
}
