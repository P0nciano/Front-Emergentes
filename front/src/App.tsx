import { useEffect, useState } from "react";
import { CardProduto } from "./components/CardVeiculo";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ProdutoType } from "./utils/ProdutoType";
import { useClienteStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [destaques, setDestaques] = useState<ProdutoType[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function buscaProdutos() {
      try {
        const response = await fetch(`${apiUrl}/produtos`);
        const dados = await response.json();
        if (Array.isArray(dados)) {
          setProdutos(dados);
        } else if (Array.isArray(dados.produtos)) {
          setProdutos(dados.produtos);
        } else {
          setProdutos([]);
        }
      } catch (error) {
        setProdutos([]);
      }
    }

    async function buscaDestaques() {
      try {
        const response = await fetch(`${apiUrl}/produtos/destaques`);
        const dados = await response.json();
        if (Array.isArray(dados)) {
          setDestaques(dados);
        } else if (Array.isArray(dados.produtos)) {
          setDestaques(dados.produtos);
        } else {
          setDestaques([]);
        }
      } catch (error) {
        setDestaques([]);
      }
    }

    async function buscaCliente(id: string) {
      try {
        const response = await fetch(`${apiUrl}/clientes/${id}`);
        const dados = await response.json();
        logaCliente(dados);
      } catch (error) {}
    }

    buscaProdutos();
    buscaDestaques();
    const idCliente = localStorage.getItem("clienteKey");
    if (idCliente) {
      buscaCliente(idCliente);
    }
  }, []);

  // Produtos que não são destaque
  const produtosRestantes = produtos.filter(
    (p) => !destaques.some((d) => d.id === p.id)
  );

  return (
    <>
      <InputPesquisa setProdutos={setProdutos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-2">
          Produtos em Destaque
        </h1>
        <div className="h-2 w-32 bg-blue-700 rounded mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {destaques.length > 0
            ? destaques.map((produto) => (
                <CardProduto data={produto} key={produto.id} />
              ))
            : produtos.map((produto) => (
                <CardProduto data={produto} key={produto.id} />
              ))}
        </div>

        {/* Seção dos produtos restantes */}
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">Todos os Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {produtosRestantes.map((produto) => (
            <CardProduto data={produto} key={produto.id} />
          ))}
        </div>
        {/* Espaço extra para o footer */}
        <div className="h-32" />
      </div>
    </>
  );
}
