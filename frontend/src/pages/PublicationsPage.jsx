import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import PublicationForm from '../components/PublicationForm'
import PublicationsTable from '../components/PublicationsTable'

import {  getPublications,  createPublication,  updatePublication,  deletePublication, } from '../services/publications.service'

function PublicationsPage() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  const [editingPublication, setEditingPublication] =
    useState(null)

  const fetchPublications = async () => {
    try {
      const response = await getPublications()

      setPublications(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublications()
  }, [])

  const handleCreateOrUpdate = async (data) => {
    try {

      if (editingPublication) {

        await updatePublication(
          editingPublication._id,
          data,
        )

        alert('Publicación actualizada')

        setEditingPublication(null)

      } else {

        await createPublication(data)

        alert('Publicación creada correctamente')
      }

      fetchPublications()

    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {

      const confirmDelete = window.confirm(
        '¿Deseas eliminar esta publicación?',
      )

      if (!confirmDelete) return

      await deletePublication(id)

      alert('Publicación eliminada')

      fetchPublications()

    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (publication) => {
    setEditingPublication(publication)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const cancelEdit = () => {
    setEditingPublication(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <PublicationForm onSubmit={handleCreateOrUpdate} editingPublication={editingPublication} cancelEdit={cancelEdit} />
        {loading ? (
          <Loader />
        ) : ( <PublicationsTable publications={publications} onDelete={handleDelete} onEdit={handleEdit} /> )}
      </div>
    </div>
  )
}

export default PublicationsPage