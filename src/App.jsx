import { useState } from "react"

function App() {
  const [nombre, setNombre] = useState("")
  const [personas, setPersonas] = useState([])
  const [proximoId, setProximoId] = useState(1)

  const [idEditando, setIdEditando] = useState(null)
  const [nombreEditado, setNombreEditado] = useState("")

  function nombreInvalido(texto) {
    return (
      texto.trim().length < 3 ||
      texto.trim().length > 20
    )
  }

  function guardarNombre(event) {
    event.preventDefault()

    setPersonas([
      ...personas,
      {
        id: proximoId,
        nombre: nombre.trim()
      }
    ])

    setProximoId(proximoId + 1)
    setNombre("")
  }

  function borrarPersona(id) {
    setPersonas(
      personas.filter((persona) => persona.id !== id)
    )
  }

  function comenzarEdicion(persona) {
    setIdEditando(persona.id)
    setNombreEditado(persona.nombre)
  }

  function guardarEdicion() {
    setPersonas(
      personas.map((persona) => {
        if (persona.id === idEditando) {
          return {
            ...persona,
            nombre: nombreEditado.trim()
          }
        }

        return persona
      })
    )

    setIdEditando(null)
    setNombreEditado("")
  }

  function cancelarEdicion() {
    setIdEditando(null)
    setNombreEditado("")
  }

  return (
    <div>
      <h1>Misión IT - Día 2</h1>

      <form onSubmit={guardarNombre}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribí un nombre"
        />

        {nombre !== "" && nombre.trim().length < 3 && (
          <p>El nombre es demasiado corto</p>
        )}

        {nombre.trim().length > 20 && (
          <p>El nombre es demasiado largo</p>
        )}

        <button
          type="submit"
          disabled={nombreInvalido(nombre)}
        >
          Guardar
        </button>
      </form>

      <hr />

      {personas.length === 0 ? (
        <p>No hay personas guardadas</p>
      ) : (
        personas.map((persona) => (
          <div key={persona.id}>
            {persona.id === idEditando ? (
              <>
                <input
                  value={nombreEditado}
                  onChange={(e) =>
                    setNombreEditado(e.target.value)
                  }
                />

                <button
                  onClick={guardarEdicion}
                  disabled={nombreInvalido(nombreEditado)}
                >
                  Guardar cambios
                </button>

                <button onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span>
                  {persona.id} - {persona.nombre}
                </span>

                <button
                  onClick={() => comenzarEdicion(persona)}
                >
                  Modificar
                </button>

                <button
                  onClick={() => borrarPersona(persona.id)}
                >
                  Borrar
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default App