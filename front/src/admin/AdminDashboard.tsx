import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoTipoProduto = {
  tipo: string
  num: number
}

type graficoClienteType = {
  cidade: string
  num: number
}

type geralDadosType = {
  clientes: number
  produtos: number
  compras: number
}

export default function AdminDashboard() {
  const [produtosTipo, setProdutosTipo] = useState<graficoTipoProduto[]>([])
  const [clientesCidade, setClientesCidade] = useState<graficoClienteType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoTipo() {
      const response = await fetch(`${apiUrl}/dashboard/produtosTipo`)
      const dados = await response.json()
      setProdutosTipo(dados)
    }
    getDadosGraficoTipo()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

  const totalProdutos = produtosTipo.reduce((acc, item) => acc + item.num, 0)
  const listaProdutosTipo = produtosTipo.map(item => ({
  x: `${((item.num / totalProdutos) * 100).toFixed(1)}%`,
  y: item.num
  }))

  const totalClientes = clientesCidade.reduce((acc, item) => acc + item.num, 0)
  const listaClientesCidade = clientesCidade.map(item => ({
  x: `${((item.num / totalClientes) * 100).toFixed(1)}%`,
  y: item.num
  }))

  return (
    <div className="container mt-24 ">
  <h2 className="text-4xl mb-8 font-extrabold text-black border-b-4 border-[#142a5c] pb-2">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-8">
        <div className="border-blue-600 border-2 rounded-xl p-6 w-1/3 me-3 bg-white shadow-md">
          <span className="bg-blue-100 text-blue-800 text-2xl text-center font-bold mx-auto block px-2.5 py-5 rounded-xl">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center text-black">Nº Clientes</p>
        </div>
        <div className="border-blue-600 border-2 rounded-xl p-6 w-1/3 me-3 bg-white shadow-md">
          <span className="bg-blue-100 text-blue-800 text-2xl text-center font-bold mx-auto block px-2.5 py-5 rounded-xl">
            {dados.produtos}</span>
          <p className="font-bold mt-2 text-center text-black">Nº Produtos</p>
        </div>
        <div className="border-blue-600 border-2 rounded-xl p-6 w-1/3 bg-white shadow-md">
          <span className="bg-green-100 text-green-800 text-2xl text-center font-bold mx-auto block px-2.5 py-5 rounded-xl">
            {dados.compras}</span>
          <p className="font-bold mt-2 text-center text-black">Nº Compras</p>
        </div>
      </div>

      <div className="div-graficos">
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '48px', minWidth: '380px'}}>
            <VictoryPie
              width={380}
              height={380}
              data={listaProdutosTipo}
              innerRadius={80}
              labelRadius={150}
              theme={VictoryTheme.material}
              colorScale={["#2563eb", "#22d3ee", "#f59e42", "#a7f3d0"]}
              labels={({ datum }) => `${datum.x}`}
              style={{
                labels: {
                  fontSize: 15,
                  fill: "#222",
                  fontFamily: "Arial",
                  fontWeight: "bold"
                }
              }}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{
                fontSize: 17,
                fill: "#2563eb",
                fontFamily: "Arial Black",
                fontWeight: "bold"
              }}
              x={190}
              y={190}
              text={["Produtos", " por Tipo"]}
            />
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {produtosTipo.map((item) => (
              <span key={item.tipo} style={{color: '#2563eb', fontWeight: 'bold', background: '#e0e7ff', borderRadius: 6, padding: '2px 10px'}}>
                {item.tipo}: {item.num} ({((item.num / (produtosTipo.reduce((acc, i) => acc + i.num, 0))) * 100).toFixed(1)}%)
              </span>
            ))}
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '48px', minWidth: '380px'}}>
            <VictoryPie
              width={380}
              height={380}
              data={listaClientesCidade}
              innerRadius={80}
              labelRadius={150}
              theme={VictoryTheme.material}
              colorScale={["#2563eb", "#22d3ee", "#f59e42", "#a7f3d0"]}
              labels={({ datum }) => `${datum.x}`}
              style={{
                labels: {
                  fontSize: 15,
                  fill: "#222",
                  fontFamily: "Arial",
                  fontWeight: "bold"
                }
              }}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{
                fontSize: 17,
                fill: "#2563eb",
                fontFamily: "Arial Black",
                fontWeight: "bold"
              }}
              x={190}
              y={190}
              text={["Clientes", " por Cidade"]}
            />
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {clientesCidade.map((item) => (
              <span key={item.cidade} style={{color: '#2563eb', fontWeight: 'bold', background: '#e0e7ff', borderRadius: 6, padding: '2px 10px'}}>
                {item.cidade}: {item.num} ({((item.num / (clientesCidade.reduce((acc, i) => acc + i.num, 0))) * 100).toFixed(1)}%)
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}