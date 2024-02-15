import axios from 'axios'
const BASE_URL = 'http://localhost:3000/books'

export const getAllCopiesByInfo = async (infoId: String) => {
  try {
    const response = await axios.get(`${BASE_URL}/byinformation/${infoId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
