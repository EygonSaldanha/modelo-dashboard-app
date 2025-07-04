import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, DollarSign, Star } from "lucide-react"

const mockProducts = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: "R$ 2.499,00",
    stock: 15,
    category: "Eletrônicos",
    status: "Ativo",
    rating: 4.5
  },
  {
    id: 2,
    name: "Notebook Gamer",
    price: "R$ 3.999,00", 
    stock: 8,
    category: "Informática",
    status: "Ativo",
    rating: 4.8
  },
  {
    id: 3,
    name: "Headset Bluetooth",
    price: "R$ 299,00",
    stock: 0,
    category: "Acessórios",
    status: "Inativo",
    rating: 4.2
  }
]

export default function EcommerceProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seu catálogo de produtos.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              91% do catálogo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 127,50</div>
            <p className="text-xs text-muted-foreground">
              +5.2% este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              ⭐⭐⭐⭐⭐
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>
            Seus produtos cadastrados no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category} • Estoque: {product.stock}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">{product.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  <Badge variant={product.status === "Ativo" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
