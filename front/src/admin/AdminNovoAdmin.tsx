import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminNovoAdmin() {
  console.log('Componente AdminNovoAdmin renderizado');
  const [novoAdmin, setNovoAdmin] = useState({ nome: '', email: '', senha: '', nivel: 1 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { admin } = useAdminStore()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    console.log('Submit chamado! Dados:', novoAdmin)
    try {
      const response = await fetch(`${apiUrl}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.token}`
        },
        body: JSON.stringify(novoAdmin)
      })
      console.log('Resposta recebida:', response.status)
      setLoading(false)
      const respText = await response.text()
      console.log('Corpo da resposta:', respText)
      if (response.status === 201) {
        alert('Admin cadastrado com sucesso!')
        navigate('/admin/cadAdmin')
      } else {
        console.log('Erro ao cadastrar admin:', response.status, respText)
        alert('Erro ao cadastrar admin!')
      }
    } catch (err) {
      setLoading(false)
      console.log('Erro de conexão ou JS:', err)
      alert('Erro ao cadastrar admin!')
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-32 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#142a5c]">Cadastrar Novo Admin</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={novoAdmin.nome}
          onChange={e => setNovoAdmin({ ...novoAdmin, nome: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={novoAdmin.email}
          onChange={e => setNovoAdmin({ ...novoAdmin, email: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={novoAdmin.senha}
          onChange={e => setNovoAdmin({ ...novoAdmin, senha: e.target.value })}
          className="border rounded px-3 py-2"
          required
        />
        <select
          value={novoAdmin.nivel}
          onChange={e => setNovoAdmin({ ...novoAdmin, nivel: Number(e.target.value) })}
          className="border rounded px-3 py-2"
        >
          <option value={1}>Nível 1</option>
          <option value={2}>Nível 2</option>
          <option value={3}>Nível 3</option>
        </select>
        <button type="submit" className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" className="bg-gray-300 text-gray-800 font-bold px-5 py-2 rounded-lg mt-2" onClick={() => navigate('/admin/cadAdmin')}>
          Cancelar
        </button>
      </form>
    </div>
  )
}
