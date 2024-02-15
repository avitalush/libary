import axios from 'axios'
const BASE_URL = 'http://localhost:3000/informations'
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const createBook = async (_body: {}) => {
  try {
    await axios.post(`${BASE_URL}/createbooks`, _body).then((e) => {
      return e.data
    })
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
  }
}
export const addCopies = async (_body: {}) => {
  try {
    await axios.post(`${BASE_URL}/addcopies`, _body).then((e) => {
      return e.data
    })
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
  }
}
export const putApi = async (url: string) => {
  try {
    await axios.put(`${BASE_URL}${url}`).then((e) => {
      return e.data
    })
  } catch (error) {
    return error
  }
}
export const deleteInfo = async (infoId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${infoId}`)

    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
  }
}
