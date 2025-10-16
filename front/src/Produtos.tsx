import { useEffect, useState } from "react";
import type { ProdutoType } from "./utils/ProdutoType";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Produtos() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      const response = await fetch(`${apiUrl}/produtos`);
      const dados = await response.json();
      setProdutos(dados);
    }
    fetchProdutos();
  }, []);

  // Filtragem dos produtos
  const produtosFiltrados = produtos.filter(produto => {
    const nomeMatch = produto.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const tipoMatch = filtroTipo ? produto.tipo?.toLowerCase() === filtroTipo.toLowerCase() : true;
    const precoMatch = (
      (!precoMin || produto.preco >= Number(precoMin)) &&
      (!precoMax || produto.preco <= Number(precoMax))
    );
    return nomeMatch && tipoMatch && precoMatch;
  });

  // Extrair tipos únicos para o filtro
  const tiposUnicos = Array.from(new Set(produtos.map(p => p.tipo).filter(Boolean)));

  return (
    <section className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Produtos</h1>

      {/* Botão de filtro */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-700 text-white px-5 py-2 rounded shadow hover:bg-blue-800 transition"
          onClick={() => setShowModal(true)}
        >
          Filtro
        </button>
      </div>

      {/* Modal de filtros */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: "rgba(255,255,255,0.2)", backdropFilter: "blur(2px)"}}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
              title="Fechar"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Filtrar Produtos</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={filtroNome}
                  onChange={e => setFiltroNome(e.target.value)}
                  placeholder="Buscar por nome"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={filtroTipo}
                  onChange={e => setFiltroTipo(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="">Todos</option>
                  {tiposUnicos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
                  <input
                    type="number"
                    value={precoMin}
                    onChange={e => setPrecoMin(e.target.value)}
                    placeholder="0"
                    className="border rounded px-3 py-2 w-full"
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
                  <input
                    type="number"
                    value={precoMax}
                    onChange={e => setPrecoMax(e.target.value)}
                    placeholder="9999"
                    className="border rounded px-3 py-2 w-full"
                    min="0"
                  />
                </div>
              </div>
              <button
                className="mt-4 bg-blue-700 text-white px-5 py-2 rounded shadow hover:bg-blue-800 transition"
                onClick={() => setShowModal(false)}
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {produtosFiltrados.length === 0 ? (
        <p className="text-lg text-gray-700 text-center">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtosFiltrados.map(produto => (
            <div key={produto.id} className="border rounded-lg p-4 flex flex-col items-center bg-gray-50 shadow">
              <img src={produto.foto} alt={produto.nome} className="mb-3 rounded h-32 object-contain" />
              <h2 className="text-xl font-bold text-blue-800 mb-1">{produto.nome}</h2>
              <p className="text-sm text-gray-600 mb-1">Tipo: {produto.tipo || "—"}</p>
              <p className="text-sm text-gray-600 mb-1">Preço: R$ {Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
              <p className="text-sm text-gray-600 mb-1">Quantidade: {produto.quantidade}</p>
              {produto.descricao && <p className="text-xs text-gray-500 mt-2">{produto.descricao}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
