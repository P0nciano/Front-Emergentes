import { useEffect, useState } from "react"
import type { CompraType } from "../utils/CompraType"
import ItemCompra from "./components/ItemCompra"

const apiUrl = import.meta.env.VITE_API_URL

function ControleCompras() {
  const [compras, setCompras] = useState<CompraType[]>([])
  const [filtroStatus, setFiltroStatus] = useState<string>("")

  useEffect(() => {
    async function getCompras() {
      const response = await fetch(`${apiUrl}/compras`)
      const dados = await response.json()
      setCompras(dados)
    }
    getCompras()
  }, [])

  // Filtra compras pelo status selecionado
  const comprasFiltradas = filtroStatus
    ? compras.filter(c => c.status.toLowerCase().includes(filtroStatus.toLowerCase()))
    : compras

  const listaCompras = comprasFiltradas.map(compra => (
    <ItemCompra key={compra.id} compra={compra} compras={compras} setCompras={setCompras} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Compras
      </h1>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="filtroStatus" className="font-semibold text-gray-700 dark:text-gray-200">Filtrar por status:</label>
        <select
          id="filtroStatus"
          value={filtroStatus}
          onChange={e => setFiltroStatus(e.target.value)}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="">Todos</option>
          <option value="Aguardando">Aguardando</option>
          <option value="Processando">Processando</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Produto
              </th>
              <th scope="col" className="px-6 py-3">
                Produto
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Status do Pedido
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaCompras}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControleCompras
