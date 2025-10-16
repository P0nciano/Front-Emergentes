
export type ProdutoType = {
    id: number
    nome: string
    tipo?: string
    codigo?: string
    preco: number
    quantidade: number
    destaque: boolean
    foto: string
    descricao?: string | null
    createdAt: Date
    updatedAt: Date
}
