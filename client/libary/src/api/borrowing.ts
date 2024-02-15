import axios from 'axios'
const BASE_URL = 'http://localhost:3000/borrowing'
export const getAllBorrowings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const createBorrow = async (_body: {}) => {
  try {
    const response = await axios.post(`${BASE_URL}`, _body)
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
  }
}

export const returnBook = async (borrowId: string) => {
  try {
    await axios.put(`${BASE_URL}/return/${borrowId}`)
  } catch (error) {
    throw error
  }
}
export const getAllLaters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/overtwoweeks`)

    return response.data.overdueBorrowings
  } catch (error) {
    throw error
  }
}
export const getDataGraph = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/topborrowedbooks`)
    return response.data
  } catch (error) {
    throw error
  }
}
