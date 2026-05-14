import { useEffect, useState } from 'react'

function PublicationForm({  onSubmit,  editingPublication,  cancelEdit,}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    status: true,
  })

  useEffect(() => {
    if (editingPublication) {
      setFormData({
        title: editingPublication.title,
        description: editingPublication.description,
        author: editingPublication.author,
        status: editingPublication.status,
      })
    }
  }, [editingPublication])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox'
        ? checked
        : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formData)

    setFormData({
      title: '',
      description: '',
      author: '',
      status: true,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8" >
      <h2 className="text-2xl font-bold mb-6">
        {editingPublication
          ? 'Editar publicación'
          : 'Nueva publicación'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} className="border p-3 rounded-lg" required />

        <input type="text" name="author" placeholder="Autor" value={formData.author} onChange={handleChange} className="border p-3 rounded-lg" required />

        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className="border p-3 rounded-lg md:col-span-2" rows="4" required />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} /> Activo 
        </label>
      </div>

      <div className="flex gap-4 mt-4">

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg" >
          {editingPublication
            ? 'Actualizar'
            : 'Guardar publicación'}
        </button>

        {editingPublication && (
          <button type="button" onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg" > Cancelar </button>
        )}
      </div>
    </form>
  )
}

export default PublicationForm