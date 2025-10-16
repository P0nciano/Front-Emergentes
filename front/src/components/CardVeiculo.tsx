import { Link } from "react-router-dom"
import type { ProdutoType } from "../utils/ProdutoType"

export function CardProduto({data}: {data: ProdutoType }) {
    return (
        <div className="max-w-sm min-h-[420px] flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg object-contain w-full h-48" src={data.foto} alt="Foto" />
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.nome}
                    </h5>
                    <p className="mb-3 font-extrabold text-gray-700 dark:text-gray-400">
                        Preço R$: {Number(data.preco).toLocaleString("pt-br", {
                            minimumFractionDigits: 2
                        })}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Tipo: {data.tipo}
                    </p>
                </div>
                <Link to={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}