import axios from "axios"
const BASE_URL='http://localhost:3000/publishers'
export const getAllPublishers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export const getReportData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reportdata`);
   
      return response.data;
    } catch (error) {
      throw error;
    }
  }
export const createPublisher=async(_body: {})=>{
    try{
        await axios.post(`${BASE_URL}`,_body).then((e)=>{
    return e.data;
})
} catch (error) {
  if (error instanceof Error) {
    console.log(error);
    return { error: error.message };
  }
}


}