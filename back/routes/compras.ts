import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()
const router = Router()

const compraSchema = z.object({
  clienteId: z.string(),
  produtoId: z.number(),
  preco: z.number(),
})



router.get("/", async (req, res) => {
  try {
    const compras = await prisma.compra.findMany({
      include: {
        cliente: true,
        produto: {}
      },
      orderBy: { id: 'desc'}
    })
    res.status(200).json(compras)
  } catch (error) {
    console.log("Erro ao criar compra:", error);
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  console.log("Dados recebidos na compra:", req.body);
  const valida = compraSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }
  const { clienteId, produtoId, preco } = valida.data
  try {
    const compra = await prisma.compra.create({
      data: {
        clienteId,
        produtoId,
        preco,
        descricao: "",
        status: "Aguardando"
      }
    })
    res.status(201).json(compra)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:clienteId", async (req, res) => {
  const { clienteId } = req.params
  try {
    const compras = await prisma.compra.findMany({
      where: { clienteId },
      include: {
        produto: {}
      }
    })
    res.status(200).json(compras)
  } catch (error) {
    res.status(400).json(error)
  }
})


// PATCH para alterar status do pedido
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ erro: "Status é obrigatório" });
  }
  try {
    const compra = await prisma.compra.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.status(200).json(compra);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router
