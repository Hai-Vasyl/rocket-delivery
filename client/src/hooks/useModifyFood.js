import { useCallback } from "react"
import { useHTTP } from "./useHTTP"

export function useModifyFood() {
  const { fetchData } = useHTTP()

  const handleModify = useCallback(
    async (form, setMessage, isCreate, id) => {
      try {
        if (
          !form.category ||
          !form.name ||
          !form.price ||
          !form.img ||
          !form.description ||
          !form.institution ||
          !form.weight
        ) {
          setMessage({ status: false, message: "Fill all fields!" })
          return
        }

        await fetchData(
          isCreate ? "post" : "patch",
          isCreate ? "/api/foods/create" : `/api/foods/update/${id}`,
          form
        )

        setMessage({
          status: true,
          message: isCreate ? "Food created!" : "Food updated!",
        })
      } catch (error) {}
    },
    [fetchData]
  )

  return { handleModify }
}
