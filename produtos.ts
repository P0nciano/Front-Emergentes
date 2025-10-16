import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

import { verificaToken } from '../middewares/verificaToken'

const prisma = new PrismaClient()

const router = Router()

const produtoSchema = z.object({
  nome: z.string().min(2, { message: 'Nome deve possuir, no mínimo, 2 caracteres' }),
  tipo: z.enum(['OCULOS', 'LENTE', 'ACESSORIO']).optional(),
  codigo: z.string().nullable().optional(),
  descricao: z.string().nullable().optional(),
  preco: z.number(),
  quantidade: z.number().optional(),
  foto: z.string(),
  destaque: z.boolean().optional(),
  adminId: z.string().uuid().optional()
})

router.get('/', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      where: { ativo: true },
      
      orderBy: { id: 'desc' }
    })
    res.status(200).json(produtos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get('/destaques', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      where: { ativo: true, destaque: true },
      
      orderBy: { id: 'desc' }
    })
    res.status(200).json(produtos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const produto = await prisma.produto.findFirst({ where: { id: Number(id) }})
    res.status(200).json(produto)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post('/', async (req, res) => {
  const valida = produtoSchema.safeParse(req.body)
  if (!valida.success) return res.status(400).json({ erro: valida.error })

  const { nome, tipo, codigo = null, descricao = null, preco, quantidade = 0, foto, destaque = false, adminId } = valida.data

  try {
    const data: any = { nome, tipo, codigo, descricao, preco, quantidade, foto, destaque }
    if (adminId !== undefined) {
      data.adminId = adminId
    }
    const produto = await prisma.produto.create({ data })
    res.status(201).json(produto)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete('/:id', verificaToken, async (req, res) => {
  const { id } = req.params
  try {
    const produto = await prisma.produto.update({ where: { id: Number(id) }, data: { ativo: false } })

    const adminId = req.userLogadoId as string
    const adminNome = req.userLogadoNome as string

    const descricao = `Exclusão de: ${produto.nome}`
    const complemento = `Admin: ${adminNome}`

    const log = await prisma.log.create({ data: { descricao, complemento, adminId } })

    res.status(200).json(produto)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const valida = produtoSchema.safeParse(req.body)
  if (!valida.success) return res.status(400).json({ erro: valida.error })

  const { nome, tipo, codigo, descricao, preco, quantidade, foto, destaque, adminId } = valida.data

  try {
    const produto = await prisma.produto.update({ where: { id: Number(id) }, data: { nome, tipo, codigo, descricao, preco, quantidade, foto, destaque, adminId } })
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get('/pesquisa/:termo', async (req, res) => {
  const { termo } = req.params
  const termoNumero = Number(termo)

  if (isNaN(termoNumero)) {
    try {
      const produtos = await prisma.produto.findMany({  where: { ativo: true, OR: [ { nome: { contains: termo, mode: 'insensitive' } } ] } })
      res.status(200).json(produtos)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  } else {
    try {
      const produtos = await prisma.produto.findMany({  where: { ativo: true, preco: { lte: termoNumero } } })
      res.status(200).json(produtos)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
})

router.patch('/destacar/:id', verificaToken, async (req, res) => {
  const { id } = req.params
  try {
    const produtoDestacar = await prisma.produto.findUnique({ where: { id: Number(id) }, select: { destaque: true } })
    const produto = await prisma.produto.update({ where: { id: Number(id) }, data: { destaque: !produtoDestacar?.destaque } })
    res.status(200).json(produto)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
