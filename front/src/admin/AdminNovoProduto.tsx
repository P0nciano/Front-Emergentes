import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEffect } from "react"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  tipo: string
  quantidade: number
  preco: number
  foto: string
  descricao: string
  adminId: string  
  destaque: boolean
}

export default function AdminNovoProduto() {
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    setFocus("nome")
  }, [])

  async function incluirProduto(data: Inputs) {
  const novoProduto = { nome: data.nome, tipo: data.tipo, quantidade: Number(data.quantidade), descricao: data.descricao, foto: data.foto, preco: Number(data.preco), destaque: data.destaque }

    const response = await fetch(`${apiUrl}/produtos`, { method: 'POST', headers: { 'Content-type': 'application/json', Authorization: `Bearer ${admin.token}` }, body: JSON.stringify(novoProduto) })

    if (response.status == 201) {
      toast.success("Ok! Produto cadastrado com sucesso")
      reset()
    } else {
      let msg = "Erro no cadastro do Produto..."
      try {
        const erro = await response.json()
        if (erro && erro.message) msg += ` (${erro.message})`
      } catch {}
      toast.error(msg)
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Produtos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirProduto)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Nome do Produto</label>
          <input type="text" id="nome" className="...  border " required {...register('nome')} />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          
          <div className="mb-3">
            <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
            <select id="tipo" className="... border" required {...register('tipo')}>
              <option value="">Selecione...</option>
              <option value="OCULOS">Óculos</option>
              <option value="LENTE">Lente</option>
              <option value="ACESSORIO">Acessório</option>
            </select>
          </div>
          <div className="mb-3">
            
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço R$</label>
            <input type="number" id="preco" className="... border" required {...register('preco')} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
            <input type="number" id="quantidade" className="...
            border" required {...register('quantidade')} />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL da Foto</label>
            <input type="text" id="foto" className="... border" required {...register('foto')} />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
            <textarea id="descricao" rows={4} className="... border" {...register('descricao')}></textarea>
          </div>
          <div className="mb-3 flex items-center">
            <input type="checkbox" id="destaque" {...register('destaque')} className="mr-2" />
            <label htmlFor="destaque" className="text-sm font-medium text-gray-900 dark:text-white">Produto em destaque?</label>
          </div>

        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Incluir</button>
      </form>
    </>
  )
}
