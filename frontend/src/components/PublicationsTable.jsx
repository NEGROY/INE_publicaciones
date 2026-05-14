function PublicationsTable({
  publications = [],
  onDelete,
  onEdit,
}) {
  if (publications.length === 0) {
    return (
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-700"> No hay publicaciones </h2>

        <p className="text-gray-500 mt-2"> Crea la primera publicación. </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Título</th>
            <th className="p-4 text-left">Autor</th>
            <th className="p-4 text-left">Estado</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {publications?.map((publication) => (
            <tr key={publication._id} className="border-t" >
              <td className="p-4"> {publication.title} </td>

              <td className="p-4"> {publication.author} </td>

              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    publication.status
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`} >
                  {publication.status
                    ? 'Activo'
                    : 'Inactivo'}
                </span>
              </td>
              <td className="p-4 flex gap-2">

                <button onClick={() => onEdit(publication) } className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg" > Editar </button>

                <button onClick={() => onDelete(publication._id) } className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" > Eliminar </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PublicationsTable