import { useContext } from "react"
import { Context } from "../context/Context"
import { useHTTP } from "../hooks/useHTTP"

export function useCreateComment() {
  const { token } = useContext(Context)
  const { fetchData } = useHTTP()

  const handleCreateComment = async (formComment, setState, id, nameState) => {
    try {
      const res = await fetchData("post", `/api/${nameState}/create/${id}`, {
        content: formComment,
      })

      const owner = {
        username: token.username,
        typeUser: token.typeUser,
        ava: token.ava,
      }

      function reduceCreateElemArray(array) {
        return [...array, { ...res, owner }]
      }
      if (nameState === "comments") {
        return setState((prevComments) => reduceCreateElemArray(prevComments))
      }

      setState((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === id) {
            comment.answerList = reduceCreateElemArray(comment.answerList)
          }
          return comment
        })
      )
    } catch (error) {}
  }
  return { handleCreateComment }
}
