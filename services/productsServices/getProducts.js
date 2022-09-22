import axios from 'axios'

export const getProducts = async () => {
  const { data } = await axios.get(`${process.env.apiUrl}/products`, {
    headers: {
      Authorization: `Bearer ${process.env.apiToken}`
    }
  })
  return data.data
}
