"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Brain,
  Calendar,
  FileText,
  Heart,
  Home,
  Plus,
  Settings,
  Smile,
  Star,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

export default function CognAIDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  const menuItems = [
    { id: "inicio", label: "Início", icon: Home },
    { id: "atividades", label: "Atividades", icon: Star },
    { id: "emocoes", label: "Emoções", icon: Heart },
    { id: "relatorios", label: "Relatórios", icon: FileText },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-blue-100">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CognAI</h1>
                <p className="text-sm text-gray-500">Cuidado Inteligente</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-blue-200">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sofia" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">SF</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Olá, Sofia! 👋</h2>
                  <p className="text-gray-600">Como você está se sentindo hoje?</p>
                </div>
              </div>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Atividade
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Criar Nova Atividade
                    </DialogTitle>
                    <DialogDescription>Vamos criar uma atividade especial para você!</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome da Atividade</Label>
                      <Input id="nome" placeholder="Ex: Pintura com texturas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Atividade</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sensitiva">🎨 Sensitiva</SelectItem>
                          <SelectItem value="verbal">🗣️ Verbal</SelectItem>
                          <SelectItem value="motora">🏃 Motora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimulo">Nível de Estímulo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixo">🟢 Baixo</SelectItem>
                          <SelectItem value="medio">🟡 Médio</SelectItem>
                          <SelectItem value="alto">🔴 Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tempo">Tempo Estimado (minutos)</Label>
                      <Input id="tempo" type="number" placeholder="15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição (opcional)</Label>
                      <Textarea id="descricao" placeholder="Descreva a atividade..." />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      Criar Atividade
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Monitoramento ao Vivo */}
              <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Activity className="w-5 h-5" />
                    Monitoramento ao Vivo
                  </CardTitle>
                  <CardDescription>Estado atual e comportamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Humor</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <Smile className="w-3 h-3 mr-1" />
                      Feliz
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Energia</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-16 h-2" />
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Foco</span>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="w-16 h-2" />
                      <span className="text-sm text-gray-600">60%</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">Última atualização: há 2 min</p>
                  </div>
                </CardContent>
              </Card>

              {/* Atividades Sensoriais */}
              <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Zap className="w-5 h-5" />
                    Atividades Personalizadas
                  </CardTitle>
                  <CardDescription>Sugestões baseadas no perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm font-medium">Música Relaxante</span>
                    </div>
                    <p className="text-xs text-gray-600">Recomendada para este momento</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm font-medium">Quebra-cabeça Tátil</span>
                    </div>
                    <p className="text-xs text-gray-600">Estimula coordenação motora</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm font-medium">Respiração Guiada</span>
                    </div>
                    <p className="text-xs text-gray-600">Para momentos de ansiedade</p>
                  </div>
                </CardContent>
              </Card>

              {/* Relatórios e Insights */}
              <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <TrendingUp className="w-5 h-5" />
                    Insights Diários
                  </CardTitle>
                  <CardDescription>Progresso e padrões identificados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">7</div>
                    <div className="text-sm text-gray-600">Atividades concluídas hoje</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Melhor horário: 10h-12h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Humor mais estável pela manhã</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Interação social: +15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Seção de Atividades Recentes */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Atividades Recentes
                </CardTitle>
                <CardDescription>Histórico das últimas atividades realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      nome: "Pintura com Dedos",
                      tipo: "Sensitiva",
                      tempo: "15 min",
                      status: "Concluída",
                      cor: "green",
                    },
                    { nome: "História Interativa", tipo: "Verbal", tempo: "20 min", status: "Concluída", cor: "blue" },
                    { nome: "Dança Livre", tipo: "Motora", tempo: "10 min", status: "Em Progresso", cor: "yellow" },
                    { nome: "Massinha Sensorial", tipo: "Sensitiva", tempo: "25 min", status: "Agendada", cor: "gray" },
                  ].map((atividade, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-${atividade.cor}-400`}></div>
                        <div>
                          <h4 className="font-medium text-gray-800">{atividade.nome}</h4>
                          <p className="text-sm text-gray-600">
                            {atividade.tipo} • {atividade.tempo}
                          </p>
                        </div>
                      </div>
                      <Badge variant={atividade.status === "Concluída" ? "default" : "secondary"}>
                        {atividade.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
