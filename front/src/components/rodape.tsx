import { Link } from "react-router-dom"

export default function Rodape() {
    return (
    <footer className="border-t border-blue-800 bg-blue-600 dark:bg-black dark:border-black w-full z-50 mt-24">
            <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
                
                {/* Logo + Nome */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-4 md:mb-0">
                    <img src="./pngegg.png" className="h-10" alt="Logo Ótica Avenida" />
                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">
                        Ótica Avenida
                    </span>
                </Link>

                {/* Links úteis */}
                <ul className="flex flex-wrap gap-6 text-sm font-medium text-white">
                    <li>
                        <Link to="/" className="hover:text-purple-300">
                            Início
                        </Link>
                    </li>
                
                    <li>
                        <Link to="/sobre" className="hover:text-purple-300">
                            Sobre Nós
                        </Link>
                    </li>
                    <li>
                        <Link to="/contato" className="hover:text-purple-300">
                            Contato
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Linha final */}
            <div className="border-t border-blue-700 dark:border-gray-700 text-center py-3 text-sm text-gray-200 dark:text-gray-400">
                © {new Date().getFullYear()} Ótica Avenida — Todos os direitos reservados
            </div>
        </footer>
    )
}
