import { useContext } from "react"
import { useHTTP } from "./useHTTP"
import { Context } from "../context/Context"

export function useRate() {
  const { fetchData } = useHTTP()
  const { token } = useContext(Context)

  const handleRate = async (status, state, setState, nameState) => {
    try {
      if (!token.token) {
        return
      }
      const res = await fetchData(
        "post",
        `/api/rate${nameState}/create/${state._id}`,
        { status, rate: state.rate }
      )

      function setBlockRate(elem) {
        return {
          ...elem,
          rate: res.rate,
          rateStatus: res.status,
        }
      }

      function reduceMap(array) {
        return array.map((item) => {
          if (item._id === state._id) {
            item = setBlockRate(item)
          }
          return item
        })
      }

      if (nameState === "Foods") {
        setState(setBlockRate(state))
      } else if (nameState === "Comments") {
        setState((prevState) => reduceMap(prevState))
      } else {
        setState((prevState) =>
          prevState.map((item) => {
            item.answerList = reduceMap(item.answerList)
            return item
          })
        )
      }
    } catch (error) {}
  }

  return { handleRate }
}
