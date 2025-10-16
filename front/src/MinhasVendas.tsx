import './MinhasPropostas.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { VendaType } from "./utils/VendaType";
import type { OculosType } from "./utils/OculosType";

const apiUrl = import.meta.env.VITE_API_URL

export default function Vendas() {
    const [vendas, setVendas] = useState<VendaType[]>([])
    const { cliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/vendas/${cliente.id}`)
            const dados = await response.json()
            setVendas(Array.isArray(dados) ? dados : [])
        }
        buscaDados()
    }, [cliente.id])

    // para retornar apenas a data do campo no banco de dados
    // 2024-10-10T22:46:27.227Z => 10/10/2024
    function dataDMA(data: string) {
        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return dia + "/" + mes + "/" + ano
    }

    const vendasTable = Array.isArray(vendas)
        ? vendas.map(venda => {
            const oculos = venda.oculos as OculosType | undefined;
            return (
                <tr key={venda.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <p><b>{oculos?.nome}</b></p>
                        <p className='mt-3'>Tipo: {oculos?.tipo} -
                            R$: {Number(oculos?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
                    </th>
                    <td className="px-6 py-4">
                        <img src={oculos?.foto} className="fotoCarro" alt="Foto Óculos" />
                    </td>
                    <td className="px-6 py-4">
                        <p><b>{venda.descricao}</b></p>
                        <p><i>Vendida em: {dataDMA(venda.createdAt)}</i></p>
                    </td>
                    <td className="px-6 py-4">
                        {venda.resposta ?
                            <>
                                <p><b>{venda.resposta}</b></p>
                                <p><i>Atualizada em: {dataDMA(venda.updatedAt as string)}</i></p>
                            </>
                            :
                            <i>Aguardando resposta...</i>}
                    </td>
                </tr>
            )
        })
        : null;

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl ">
                Minhas <span className="underline underline-offset-3 decoration-8 decoration-purple-400 dark:decoration-purple-600">Compras</span></h1>

            {vendas.length === 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
                   &nbsp;&nbsp; Ah... Você ainda não realizou compras. 🙄
                </h2>
                :
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Óculos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Foto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Compra
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Resposta
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendasTable}
                    </tbody>
                </table>
            }
        </section>
    )
}