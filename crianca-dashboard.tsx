"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Heart, Trophy, Play } from "lucide-react"

interface CriancaDashboardProps {
  onSwitchView: (view: "select" | "responsavel" | "crianca") => void
}

export default function CriancaDashboard({ onSwitchView }: CriancaDashboardProps) {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null)

  const atividades = [
    {
      id: "pintura",
      nome: "Pintura Mágica",
      emoji: "🎨",
      cor: "from-pink-400 to-purple-500",
      descricao: "Vamos criar arte com cores incríveis!",
      duracao: "15 min",
      tipo: "Criativa",
    },
    {
      id: "musica",
      nome: "Música Relaxante",
      emoji: "🎵",
      cor: "from-blue-400 to-cyan-500",
      descricao: "Sons suaves para se acalmar",
      duracao: "10 min",
      tipo: "Sensorial",
    },
    {
      id: "historia",
      nome: "História Interativa",
      emoji: "📚",
      cor: "from-green-400 to-emerald-500",
      descricao: "Uma aventura cheia de surpresas!",
      duracao: "20 min",
      tipo: "Verbal",
    },
    {
      id: "jogo",
      nome: "Quebra-cabeça",
      emoji: "🧩",
      cor: "from-orange-400 to-red-500",
      descricao: "Encaixe as peças e complete o desenho",
      duracao: "25 min",
      tipo: "Cognitiva",
    },
    {
      id: "danca",
      nome: "Dança Livre",
      emoji: "💃",
      cor: "from-purple-400 to-pink-500",
      descricao: "Mova seu corpo no ritmo da música!",
      duracao: "15 min",
      tipo: "Motora",
    },
    {
      id: "respiracao",
      nome: "Respiração Mágica",
      emoji: "🌬️",
      cor: "from-teal-400 to-blue-500",
      descricao: "Respire fundo como um dragão gentil",
      duracao: "8 min",
      tipo: "Relaxamento",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Header Lúdico */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => onSwitchView("select")}
              className="text-purple-600 hover:text-purple-800 border-purple-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">👧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Olá, Sofia! 🌟</h1>
                <p className="text-purple-600">Que atividade vamos fazer hoje?</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">12 ⭐</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full">
              <Heart className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Feliz</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Progresso do Dia */}
        <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Seu Progresso Hoje
              </h2>
              <Badge className="bg-purple-100 text-purple-700 text-lg px-4 py-2">7/10 Atividades</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Atividades Concluídas</span>
                <div className="flex items-center gap-3">
                  <Progress value={70} className="w-32 h-3" />
                  <span className="font-bold text-purple-600">70%</span>
                </div>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ))}
                {[8, 9, 10].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{i}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Atividades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {atividades.map((atividade) => (
            <Card
              key={atividade.id}
              className="border-2 border-transparent hover:border-purple-300 transition-all duration-300 cursor-pointer hover:shadow-xl group overflow-hidden"
              onClick={() => setCurrentActivity(atividade.id)}
            >
              <CardContent className="p-0">
                <div
                  className={`h-32 bg-gradient-to-br ${atividade.cor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  <span className="text-6xl">{atividade.emoji}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{atividade.nome}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {atividade.tipo}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{atividade.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">⏱️ {atividade.duracao}</span>
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r ${atividade.cor} hover:opacity-90 text-white font-semibold`}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Começar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Conquistas */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Suas Conquistas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { nome: "Primeira Pintura", emoji: "🎨", conquistado: true },
                { nome: "Música Maestro", emoji: "🎵", conquistado: true },
                { nome: "Contador de Histórias", emoji: "📚", conquistado: true },
                { nome: "Dançarino Estrela", emoji: "💃", conquistado: false },
              ].map((conquista, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    conquista.conquistado
                      ? "bg-yellow-100 border-2 border-yellow-300 shadow-md"
                      : "bg-gray-100 border-2 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{conquista.emoji}</div>
                  <p className={`text-sm font-medium ${conquista.conquistado ? "text-yellow-800" : "text-gray-500"}`}>
                    {conquista.nome}
                  </p>
                  {conquista.conquistado && (
                    <div className="mt-2">
                      <Badge className="bg-yellow-200 text-yellow-800">Conquistado!</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mascote/Personagem de Apoio */}
        <div className="fixed bottom-6 right-6">
          <div className="bg-white rounded-full p-4 shadow-lg border-2 border-purple-200 hover:scale-110 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-3xl">🦄</span>
            </div>
          </div>
          <div className="absolute -top-16 right-0 bg-white rounded-lg p-3 shadow-lg border border-purple-200 max-w-48">
            <p className="text-sm text-gray-700">"Você está indo muito bem! Continue assim! 🌟"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
