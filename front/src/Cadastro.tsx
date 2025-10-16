import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type Inputs = {
  nome: string
  cidade: string
  email: string
  senha: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const navigate = useNavigate()

  async function cadastrarCliente(data: Inputs) {
    try {
      const response = await fetch(`${apiUrl}/clientes`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
      })

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso! Faça login para continuar.")
        reset()
        navigate("/login")
      } else {
        toast.error("Erro ao cadastrar. Verifique os dados e tente novamente.")
      }
    } catch (err) {
      toast.error("Erro de conexão com o servidor.")
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Crie sua Conta
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(cadastrarCliente)}
          >
            <div>
              <label
                htmlFor="nome"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
                {...register("nome")}
              />
            </div>
            <div>
              <label
                htmlFor="nome"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cidade
              </label>
              <input
                type="text"
                id="nome"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
                {...register("cidade")}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seu E-mail
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
                {...register("email")}
              />
            </div>
            <div>
              <label
                htmlFor="senha"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Crie uma Senha
              </label>
              <input
                type="password"
                id="senha"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
                {...register("senha")}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Cadastrar
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Já possui conta?{" "}
              <a
                href="/login"
                className="font-bold text-purple-600 hover:underline dark:text-purple-400"
              >
                Faça Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
