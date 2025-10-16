
import { PrismaClient, Prisma } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

// Schema para validação do corpo da requisição
const vendaSchema = z.object({
  descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
  preco: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Preço deve ser decimal válido como string" }),
  vendaStatus: z.string().min(1, { message: "Status da venda é obrigatório" }),
  clienteId: z.string().uuid({ message: "clienteId deve ser UUID válido" }),
  produtoId: z.number(),
})


// GET /vendas -> lista todas vendas, incluindo relacionamentos
router.get('/', async (req, res) => {
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        cliente: true,
        produto: true
      }
    })
    res.status(200).json(vendas)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})


// GET /vendas/:id -> busca venda pelo id
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const venda = await prisma.venda.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true,
        produto: true
      }
    })

    if (!venda) {
      res.status(404).json({ erro: 'Venda não encontrada' })
      return
    }

    res.status(200).json(venda)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})


// POST /vendas -> criar nova venda
router.post('/', async (req, res) => {
  const valida = vendaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error.errors })
    return
  }

  const { descricao, preco, vendaStatus, clienteId, produtoId } = valida.data

  try {
    const venda = await prisma.venda.create({
      data: {
        descricao,
        preco: new Prisma.Decimal(preco),  // converte string para Decimal
        vendaStatus,
        clienteId,
        produtoId,
      }
    })
    res.status(201).json(venda)
  } catch (error) {
    res.status(400).json({ error })
  }
})


// PUT /vendas/:id -> atualizar venda existente
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const valida = vendaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error.errors })
    return
  }

  const { descricao, preco, vendaStatus, clienteId, produtoId } = valida.data

  try {
    const venda = await prisma.venda.update({
      where: { id: Number(id) },
      data: {
        descricao,
        preco: new Prisma.Decimal(preco),
        vendaStatus,
        clienteId,
        produtoId,
      }
    })
    res.status(200).json(venda)
  } catch (error) {
    res.status(400).json({ error })
  }
})


// DELETE /vendas/:id -> deletar venda
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const venda = await prisma.venda.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(venda)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

export default router
