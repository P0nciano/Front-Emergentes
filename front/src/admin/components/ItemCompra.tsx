import { FaRegEdit } from "react-icons/fa"
import { useState } from "react"
import type { CompraType } from "../../utils/CompraType"
import { useAdminStore } from "../context/AdminContext"

type listaCompraProps = {
  compra: CompraType,
  compras: CompraType[],
  setCompras: React.Dispatch<React.SetStateAction<CompraType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCompra({ compra, compras, setCompras }: listaCompraProps) {
  const { admin } = useAdminStore()

  const statusOptions = ["Aguardando", "Processando", "Finalizado", "Cancelado"];
  const [editando, setEditando] = useState(false);
  const [novoStatus, setNovoStatus] = useState(compra.status);

  async function salvarStatus() {
    if (!novoStatus || novoStatus.trim() === "") return;
    const response = await fetch(`${apiUrl}/compras/${compra.id}/status`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`
      },
      body: JSON.stringify({ status: novoStatus })
    });
    if (response.status === 200) {
      const compras2 = compras.map(x => x.id === compra.id ? { ...x, status: novoStatus } : x);
      setCompras(compras2);
      setEditando(false);
    }
  }

  return (
    <tr key={compra.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={compra.produto.foto} alt="Foto do Produto"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {compra.produto.nome}
      </td>
      <td className={"px-6 py-4"}>
        {Number(compra.produto.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
      </td>
      <td className={`px-6 py-4`}>
        {compra.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {editando ? (
          <div className="flex items-center gap-2">
            <select value={novoStatus} onChange={e => setNovoStatus(e.target.value)} className="border rounded px-2 py-1">
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button onClick={salvarStatus} className="bg-blue-600 text-white px-2 py-1 rounded">Salvar</button>
            <button onClick={() => setEditando(false)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>
          </div>
        ) : (
          <span className="font-semibold">{compra.status}</span>
        )}
      </td>
      <td className="px-6 py-4">
        <FaRegEdit className="text-3xl text-blue-600 inline-block cursor-pointer" title="Alterar Status"
          onClick={() => setEditando(true)} />
      </td>
    </tr>
  )
}
