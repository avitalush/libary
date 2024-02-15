import axios from 'axios'
const BASE_URL = 'http://localhost:3000/readers'
export const getAllReaders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const deleteReader = async (readerId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${readerId}`)

    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
  }
}
export const createReader = async (_body: {}) => {
  try {
    await axios.post(`${BASE_URL}`, _body).then((e) => {
      return e.data
    })
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
  }
}
export const getBorrowingsByReader = async (readerId: string | null) => {
  try {
    const response = await axios.get(`${BASE_URL}/numborrowings/${readerId}`)

    return response.data.message
  } catch (error) {
    throw error
  }
}
