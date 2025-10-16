import express from 'express'
import cors from 'cors'

import 'dotenv/config'


import routesLogin from './routes/login'
import routesClientes from './routes/clientes'
import routesCompras from './routes/compras'
import routesDashboard from './routes/dashboard'
import routesAdminLogin from './routes/adminLogin'
import routesAdmins from './routes/admins'
import routesProdutos from './routes/produtos'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())


// expõe /oculos como alias para /produtos (domínio Ótica)
app.use("/oculos", routesProdutos)
app.use("/clientes/login", routesLogin)
app.use("/clientes", routesClientes)
app.use("/compras", routesCompras)
app.use("/dashboard", routesDashboard)
app.use("/admins/login", routesAdminLogin)
app.use("/admins", routesAdmins)
app.use('/produtos', routesProdutos)


app.get('/', (req, res) => {
  res.send('API: Ótica — gestão de produtos, vendas e clientes')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})