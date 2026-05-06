// Resolva a questão 1 aqui

// a
type Pedido = {
    id: number,
    cliente: string,
    valor: number,
    entregue: boolean
}
// NÃO INTERFERE NA FUNÇÃO. SERVE APENAS PARA TESTES!
const pedidos1: Pedido[] = [
    { id: 1, cliente: "João", valor: 150.5, entregue: true },
    { id: 2, cliente: "Maria", valor: 200, entregue: false },
    { id: 3, cliente: "Carlos", valor: 99.9, entregue: true }
];

const pedidos2: Pedido[] = [
    { id: 4, cliente: "Ana", valor: 300, entregue: false },
    { id: 5, cliente: "Pedro", valor: 120, entregue: true },
    { id: 6, cliente: "Lucas", valor: 75.75, entregue: false }
];

// b
const filtrarPedidosEntregues = (xablau: Pedido[]):  => {
    return xablau.filter((valor) => valor.entregue === true)
}

console.log(filtrarPedidosEntregues(pedidos1))

// c
// dica: conclua a função e por último faça a sua tipagem
const calcularTotalPedidos = (pedido: Pedido[]): number => {
    return pedido.reduce((acc, curr) => acc + curr.valor, 0)
}

// d
type PedidoSemId = Omit<Pedido, "id">

// Partial: todas as propriedades são opcionais.
type PedidoOpcionais = Partial<Pedido>
let pedidos4: PedidoOpcionais = {}

// Pick: as propriedades indicadas são obrigatórias. É o inverso do Omit.
type PedidoItemObrigatorio = Pick<Pedido, "cliente" | "valor">

let pedidos5: PedidoItemObrigatorio = {
}



console.log(calcularTotalPedidos(pedidos1))