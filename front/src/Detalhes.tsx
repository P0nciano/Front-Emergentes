import type { ProdutoType } from "./utils/ProdutoType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL



export default function Detalhes() {
  const params = useParams()

    const [produto, setProduto] = useState<ProdutoType>()
  const { cliente } = useClienteStore()

  const { handleSubmit, reset } = useForm()

  useEffect(() => {
    async function buscaDados() {
    const response = await fetch(`${apiUrl}/produtos/${params.produtoId}`)
      const dados = await response.json()
      // console.log(dados)
      setProduto(dados)
    }
    buscaDados()
  }, [])

  async function enviaCompra() {
    const response = await fetch(`${apiUrl}/compras`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        produtoId: Number(params.produtoId),
  preco: Number(produto?.preco) ?? 0,
        descricao: ""
      })
    })
    if (response.status == 201) {
      toast.success("Obrigado. Sua compra foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua compra")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
            src={produto?.foto} alt="Foto do Produto" />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             {produto?.nome}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              Tipo: {produto?.tipo || '—'} - Disponível: {produto?.quantidade}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white font-bold">
              Preço R$: {Number(produto?.preco)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {produto?.descricao}
          </p>
          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  🙂 Você pode fazer uma Compra para este produto!</h3>
              <form onSubmit={handleSubmit(enviaCompra)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comprar</button>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Gostou? Identifique-se e faça uma Compra!
            </h2>
          }
        </div>
      </section>
    </>
  )
}