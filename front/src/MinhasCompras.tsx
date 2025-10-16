import './MinhasCompras.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { CompraType } from "./utils/CompraType";

const apiUrl = import.meta.env.VITE_API_URL

export default function Compras() {
	const [compras, setCompras] = useState<CompraType[]>([])
	const [filtroStatus, setFiltroStatus] = useState<string>("")
	const { cliente } = useClienteStore()

	useEffect(() => {
		async function buscaDados() {
			const response = await fetch(`${apiUrl}/compras/${cliente.id}`)
			const dados = await response.json()
			setCompras(dados)
		}
		buscaDados()
	}, [])

	// Filtra compras pelo status selecionado
	const comprasFiltradas = filtroStatus
		? compras.filter(c => c.status.toLowerCase().includes(filtroStatus.toLowerCase()))
		: compras

	return (
		<section className="max-w-7xl mx-auto">
			<h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
				Listagem de <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Minhas Compras</span>
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

			{comprasFiltradas.length === 0 ? (
				<h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
					&nbsp;&nbsp; Ah... Você ainda não fez compras em nossos produtos ou não há pedidos com esse status. 😄
				</h2>
			) : (
				<table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-2 py-2 w-1/3 align-middle">Produto</th>
							<th scope="col" className="px-2 py-2 w-1/3 align-middle">Foto</th>
							<th scope="col" className="px-2 py-2 w-1/3 align-middle">Status do Pedido</th>
						</tr>
					</thead>
					<tbody>
						{comprasFiltradas.map(compra => (
							<tr key={compra.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
								<th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white align-middle">
									<p className="text-lg font-bold mb-1">{compra.produto.nome}</p>
									<p className="text-sm">Tipo: {compra.produto.tipo} - R$: {Number(compra.produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
								</th>
								<td className="px-2 py-2 align-middle">
									<img src={compra.produto.foto} style={{ maxWidth: "120px", maxHeight: "80px", borderRadius: "8px" }} alt="Foto" />
								</td>
								<td className="px-2 py-2 align-middle">
									<span className="text-base font-semibold">{compra.status}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	)
}
