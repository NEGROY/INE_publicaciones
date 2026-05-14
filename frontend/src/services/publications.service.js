import axios from 'axios'

const API_URL = 'http://localhost:3000/publications'

export const getPublications = async () => {
  return await axios.get(API_URL)
}

export const createPublication = async (data) => {
  return await axios.post(API_URL, data)
}

export const updatePublication = async (id, data) => {
  return await axios.patch(`${API_URL}/${id}`, data)
}

export const deletePublication = async (id) => {
  return await axios.delete(`${API_URL}/${id}`)
}