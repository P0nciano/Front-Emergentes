import { useEffect, useState } from "react"
import { useAdminStore } from "./context/AdminContext"
import { Link } from "react-router-dom"
import type { ProdutoType } from "../utils/ProdutoType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminProdutos() {
  const { admin } = useAdminStore()
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

  useEffect(() => {
    async function getProdutos() {
      const response = await fetch(`${apiUrl}/produtos`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      })
      const dados = await response.json()
      setProdutos(dados)
    }
    getProdutos()
  }, [admin])

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Produtos cadastrados
        </h1>
        <Link to="/admin/produtos/novo"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo Produto
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Foto</th>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">Tipo</th>
              <th scope="col" className="px-6 py-3">Preço R$</th>
              <th scope="col" className="px-6 py-3">Quantidade</th>
              <th scope="col" className="px-6 py-3">Destaque</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4"><img src={produto.foto} alt={produto.nome} style={{ width: 80 }} /></td>
                <td className="px-6 py-4">{produto.nome}</td>
                <td className="px-6 py-4">{produto.tipo}</td>
                <td className="px-6 py-4">{Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4">{produto.quantidade}</td>
                <td className="px-6 py-4">{produto.destaque ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
