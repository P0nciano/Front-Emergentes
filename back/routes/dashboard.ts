import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/produtosTipo", async (req, res) => {
  try {
    const produtos = await prisma.produto.groupBy({
      by: ['tipo'],
      _count: { tipo: true },
      where: { ativo: true }
    })
    const tipos = produtos.map((item: any) => ({
      tipo: item.tipo || 'NÃO DEFINIDO',
      num: item._count.tipo
    }))
    res.status(200).json(tipos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const produtos = await prisma.produto.count()
    const compras = await prisma.compra.count()
    res.status(200).json({ clientes, produtos, compras })
  } catch (error) {
    res.status(400).json(error)
  }
})



type ClienteGroupByCidade = {
  cidade: string
  _count: {
    cidade: number
  }
}

router.get("/clientesCidade", async (req, res) => {
  try {
    const clientes = await prisma.cliente.groupBy({
      by: ['cidade'],
      _count: {
        cidade: true,
      },
    })

    const clientes2 = clientes.map((cliente: ClienteGroupByCidade) => ({
      cidade: cliente.cidade,
      num: cliente._count.cidade
    }))

    res.status(200).json(clientes2)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
