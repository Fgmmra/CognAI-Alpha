"use client"

import { useState } from "react"
import ResponsavelDashboard from "../responsavel-dashboard"
import CriancaDashboard from "../crianca-dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Users, Baby } from "lucide-react"

export default function CognAIApp() {
  const [currentView, setCurrentView] = useState<"select" | "responsavel" | "crianca">("select")

  if (currentView === "responsavel") {
    return <ResponsavelDashboard onSwitchView={setCurrentView} />
  }

  if (currentView === "crianca") {
    return <CriancaDashboard onSwitchView={setCurrentView} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">CognAI</h1>
              <p className="text-lg text-gray-600">Cuidado Inteligente e Carinhoso</p>
            </div>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Escolha como você gostaria de acessar a plataforma hoje
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Área dos Responsáveis */}
          <Card
            className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:shadow-xl group"
            onClick={() => setCurrentView("responsavel")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Área dos Responsáveis</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Monitore o progresso, visualize relatórios detalhados e configure as preferências da criança
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Monitoramento emocional</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>Insights e relatórios</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Comunicação com terapeutas</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3">
                Acessar Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Área da Criança */}
          <Card
            className="border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 cursor-pointer hover:shadow-xl group"
            onClick={() => setCurrentView("crianca")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Baby className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Área da Criança</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Atividades divertidas, jogos interativos e experiências sensoriais personalizadas
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🎨</span>
                  <span>Atividades criativas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🎮</span>
                  <span>Jogos interativos</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🌈</span>
                  <span>Experiências sensoriais</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3">
                Vamos Brincar!
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">Desenvolvido com 💜 para famílias e crianças especiais</p>
        </div>
      </div>
    </div>
  )
}
