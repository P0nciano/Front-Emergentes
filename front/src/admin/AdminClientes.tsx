import { useEffect, useState } from "react"
import { useAdminStore } from "./context/AdminContext"
import type { ClienteType } from "../utils/ClienteType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminClientes() {
  const { admin } = useAdminStore()
  const [clientes, setClientes] = useState<ClienteType[]>([])

  useEffect(() => {
    async function getClientes() {
      const response = await fetch(`${apiUrl}/clientes`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      })
      const dados = await response.json()
      setClientes(dados)
    }
    getClientes()
  }, [admin])

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Clientes cadastrados
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">Email</th>
              {/* <th scope="col" className="px-6 py-3">Cidade</th> */}
              {/* <th scope="col" className="px-6 py-3">Data de Cadastro</th> */}
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{cliente.nome}</td>
                <td className="px-6 py-4">{cliente.email}</td>
                {/* <td className="px-6 py-4">{cliente.cidade}</td> */}
                {/* <td className="px-6 py-4">{new Date(cliente.createdAt).toLocaleDateString('pt-BR')}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
