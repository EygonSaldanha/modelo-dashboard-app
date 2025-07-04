import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar } from "lucide-react"

export default function AnalyticsReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere e baixe relatórios detalhados do sistema.
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Gerar Relatório
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatório de Vendas
            </CardTitle>
            <CardDescription>
              Análise completa das vendas do período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Última atualização: Hoje</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Relatório Mensal
            </CardTitle>
            <CardDescription>
              Resumo de atividades do mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Última atualização: Ontem</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Baixar Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatório de Usuários
            </CardTitle>
            <CardDescription>
              Estatísticas de usuários ativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Última atualização: 2 dias atrás</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Baixar CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
