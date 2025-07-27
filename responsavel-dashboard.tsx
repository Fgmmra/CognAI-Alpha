"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Activity,
  ArrowLeft,
  Baby,
  Brain,
  Home,
  MessageSquare,
  Settings,
  Bell,
  BarChart3,
  Save,
  Download,
} from "lucide-react"
import { translations, type Language } from "./translations"

interface ResponsavelDashboardProps {
  onSwitchView: (view: "select" | "responsavel" | "crianca") => void
}

export default function ResponsavelDashboard({ onSwitchView }: ResponsavelDashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>("pt")

  // Função para obter tradução
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[currentLanguage]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  // Estados para configurações do perfil
  const [perfilCrianca, setPerfilCrianca] = useState({
    nomeCompleto: "Sofia Maria Santos",
    dataNascimento: "2017-03-15",
    diagnostico: "TEA - Nível 1 (Suporte)",
    gatilhos: "Mudanças bruscas de rotina, sons muito altos, multidões",
    preferencias: {
      sonsSuaves: true,
      texturasMacias: true,
      luzesBaixas: true,
      movimentosLentos: false,
    },
  })

  // Estados para monitoramento
  const [monitoramento, setMonitoramento] = useState({
    frequencia: "Tempo real (recomendado)",
    horarioInicio: "07:00",
    horarioFim: "20:00",
    alertas: {
      mudancasHumor: true,
      energiaBaixa: true,
      perdaConcentracao: false,
      sinaisAnsiedade: true,
      tempoExcessivo: true,
    },
  })

  // Estados para rotina
  const [rotina, setRotina] = useState({
    horarios: {
      despertar: "07:00",
      cafeManha: "07:30",
      atividadesMatinais: "09:00",
      almoco: "12:00",
      descanso: "13:00",
      atividadesVespertinas: "15:00",
      jantar: "18:00",
      rotinaNoturna: "19:30",
    },
    preferenciasAtividades: {
      duracao: "15-20 minutos",
      nivelEstimulo: "Estímulo moderado",
      melhorPeriodo: "Manhã (8h-12h)",
    },
  })

  // Estados para comunicação
  const [comunicacao, setComunicacao] = useState({
    contatos: [
      { id: 1, nome: "Mãe - Maria Santos", telefone: "(11) 99999-1111", principal: true },
      { id: 2, nome: "Pai - João Santos", telefone: "(11) 99999-2222", principal: true },
      { id: 3, nome: "Avó - Ana Santos", telefone: "(11) 99999-3333", principal: false },
    ],
    notificacoes: {
      alertasEmergencia: { email: true, sms: true, push: true },
      relatoriosDiarios: { email: true, sms: false, push: true },
      lembretesAtividades: { email: false, sms: false, push: true },
      mensagensEquipe: { email: true, sms: false, push: true },
    },
  })

  // Estados para privacidade
  const [privacidade, setPrivacidade] = useState({
    compartilhamento: {
      terapeutas: true,
      escola: true,
      pesquisasAnonimas: false,
      backupNuvem: true,
    },
  })

  // Estados para configurações técnicas
  const [configTecnicas, setConfigTecnicas] = useState({
    tema: "Claro",
    idioma: "Português (BR)",
    sincronizacao: {
      automatica: true,
      backupDiario: true,
      modoOffline: false,
    },
    relatorios: {
      frequencia: "Semanal",
      formato: "PDF",
    },
  })

  const [novoContato, setNovoContato] = useState({
    nome: "",
    telefone: "",
    principal: false,
  })

  // Aplicar tema
  useEffect(() => {
    if (configTecnicas.tema === "Escuro") {
      setIsDarkMode(true)
    } else if (configTecnicas.tema === "Claro") {
      setIsDarkMode(false)
    } else {
      // Automático - verificar preferência do sistema
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [configTecnicas.tema])

  // Aplicar idioma
  useEffect(() => {
    const languageMap: { [key: string]: Language } = {
      "Português (BR)": "pt",
      English: "en",
      Español: "es",
    }

    const newLanguage = languageMap[configTecnicas.idioma] || "pt"
    setCurrentLanguage(newLanguage)
  }, [configTecnicas.idioma])

  // Função para salvar todas as configurações
  const salvarConfiguracoes = () => {
    // Simular salvamento
    console.log("Salvando configurações:", {
      perfilCrianca,
      monitoramento,
      rotina,
      comunicacao,
      privacidade,
      configTecnicas,
    })
    setHasUnsavedChanges(false)

    // Feedback visual
    const button = document.querySelector("[data-save-button]")
    if (button) {
      button.textContent = "✓ " + t("settings.allSaved") + "!"
      setTimeout(() => {
        button.textContent = t("settings.saveChanges")
      }, 2000)
    }
  }

  // Função para marcar mudanças não salvas
  const marcarMudanca = () => {
    setHasUnsavedChanges(true)
  }

  // Função para adicionar contato
  const adicionarContato = () => {
    if (novoContato.nome && novoContato.telefone) {
      const novoId = Math.max(...comunicacao.contatos.map((c) => c.id)) + 1
      setComunicacao((prev) => ({
        ...prev,
        contatos: [...prev.contatos, { ...novoContato, id: novoId }],
      }))
      setNovoContato({ nome: "", telefone: "", principal: false })
      marcarMudanca()
    }
  }

  // Função para remover contato
  const removerContato = (id: number) => {
    setComunicacao((prev) => ({
      ...prev,
      contatos: prev.contatos.filter((c) => c.id !== id),
    }))
    marcarMudanca()
  }

  // Função para exportar dados
  const exportarDados = () => {
    const dadosCompletos = {
      perfil: perfilCrianca,
      monitoramento,
      rotina,
      comunicacao,
      privacidade,
      configuracoes: configTecnicas,
      dataExportacao: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(dadosCompletos, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cognai-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowExportDialog(false)
  }

  const menuItems = [
    { id: "dashboard", label: t("menu.dashboard"), icon: Home },
    { id: "monitoramento", label: t("menu.monitoring"), icon: Activity },
    { id: "relatorios", label: t("menu.reports"), icon: BarChart3 },
    { id: "comunicacao", label: t("menu.communication"), icon: MessageSquare },
    { id: "configuracoes", label: t("menu.settings"), icon: Settings },
  ]

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-50"} transition-colors duration-300`}
    >
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`w-64 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg border-r border-blue-100 transition-colors duration-300`}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>CognAI</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {t("menu.responsibleArea")}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => onSwitchView("select")}
              className={`w-full mb-6 ${isDarkMode ? "text-gray-300 hover:text-white border-gray-600" : "text-gray-600 hover:text-gray-800"}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("menu.back")}
            </Button>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700 shadow-sm dark:bg-blue-900 dark:text-blue-300"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {hasUnsavedChanges && (
              <div className="mt-6 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg border border-yellow-300 dark:border-yellow-700">
                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">{t("settings.unsavedChanges")}</span>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Baby className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <span className="font-medium text-pink-800 dark:text-pink-200">{t("menu.childArea")}</span>
              </div>
              <p className="text-sm text-pink-700 dark:text-pink-300 mb-3">
                Sofia está {t("header.online").toLowerCase()} agora
              </p>
              <Button
                size="sm"
                onClick={() => onSwitchView("crianca")}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Ver Atividades
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} border-b p-6 transition-colors duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-blue-200 dark:border-blue-600">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sofia" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    SF
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Sofia - 7 {t("header.years")}
                  </h2>
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t("header.lastActivity")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  {t("header.notifications")}
                </Button>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {t("header.online")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeSection === "configuracoes" && (
              <div className="space-y-6">
                {/* Header das Configurações */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      {t("settings.settings")}
                    </h2>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {t("settings.personalizeExperience")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          {t("settings.export")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("settings.exportSettings")}</DialogTitle>
                          <DialogDescription>{t("settings.downloadCompleteBackup")}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <h4 className="font-medium mb-2">{t("settings.whatWillBeExported")}:</h4>
                            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                              <li>• {t("settings.completeChildProfile")}</li>
                              <li>• {t("settings.monitoringSettings")}</li>
                              <li>• {t("settings.customizedRoutine")}</li>
                              <li>• {t("settings.contactsNotifications")}</li>
                              <li>• {t("settings.privacyPreferences")}</li>
                            </ul>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setShowExportDialog(false)} className="flex-1">
                              {t("settings.cancel")}
                            </Button>
                            <Button onClick={exportarDados} className="flex-1">
                              {t("settings.downloadBackup")}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      className={`${hasUnsavedChanges ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} transition-colors duration-200`}
                      onClick={salvarConfiguracoes}
                      data-save-button
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {hasUnsavedChanges ? t("settings.saveChanges") : t("settings.allSaved")}
                    </Button>
                  </div>
                </div>

                {/* Perfil da Criança */}
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-colors duration-300`}
                >
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      <Baby className="w-5 h-5 text-pink-500" />
                      {t("settings.childProfile")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {t("settings.fullName")}
                          </Label>
                          <Input
                            value={perfilCrianca.nomeCompleto}
                            onChange={(e) => {
                              setPerfilCrianca((prev) => ({ ...prev, nomeCompleto: e.target.value }))
                              marcarMudanca()
                            }}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {t("settings.birthDate")}
                          </Label>
                          <Input
                            type="date"
                            value={perfilCrianca.dataNascimento}
                            onChange={(e) => {
                              setPerfilCrianca((prev) => ({ ...prev, dataNascimento: e.target.value }))
                              marcarMudanca()
                            }}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {t("settings.diagnosis")}
                          </Label>
                          <Select
                            value={perfilCrianca.diagnostico}
                            onValueChange={(value) => {
                              setPerfilCrianca((prev) => ({ ...prev, diagnostico: value }))
                              marcarMudanca()
                            }}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TEA - Nível 1 (Suporte)">{t("settings.level1Support")}</SelectItem>
                              <SelectItem value="TEA - Nível 2 (Suporte Substancial)">
                                {t("settings.level2SubstantialSupport")}
                              </SelectItem>
                              <SelectItem value="TEA - Nível 3 (Suporte Muito Substancial)">
                                {t("settings.level3VerySubstantialSupport")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3 block`}>
                            {t("settings.sensorialPreferences")}
                          </Label>
                          <div className="space-y-3">
                            {[
                              { key: "sonsSuaves", nome: t("settings.softSounds") },
                              { key: "texturasMacias", nome: t("settings.softTextures") },
                              { key: "luzesBaixas", nome: t("settings.lowLights") },
                              { key: "movimentosLentos", nome: t("settings.slowMovements") },
                            ].map((pref) => (
                              <div key={pref.key} className="flex items-center space-x-3">
                                <Switch
                                  checked={
                                    perfilCrianca.preferencias[pref.key as keyof typeof perfilCrianca.preferencias]
                                  }
                                  onCheckedChange={(checked) => {
                                    setPerfilCrianca((prev) => ({
                                      ...prev,
                                      preferencias: { ...prev.preferencias, [pref.key]: checked },
                                    }))
                                    marcarMudanca()
                                  }}
                                />
                                <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  {pref.nome}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {t("settings.knownTriggers")}
                          </Label>
                          <Textarea
                            value={perfilCrianca.gatilhos}
                            onChange={(e) => {
                              setPerfilCrianca((prev) => ({ ...prev, gatilhos: e.target.value }))
                              marcarMudanca()
                            }}
                            className="mt-2 h-20"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações de Monitoramento */}
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-colors duration-300`}
                >
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      <Activity className="w-5 h-5 text-blue-500" />
                      {t("settings.monitoringAlerts")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {t("settings.monitoringFrequency")}
                          </Label>
                          <Select
                            value={monitoramento.frequencia}
                            onValueChange={(value) => {
                              setMonitoramento((prev) => ({ ...prev, frequencia: value }))
                              marcarMudanca()
                            }}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tempo real (recomendado)">
                                {t("settings.realTimeRecommended")}
                              </SelectItem>
                              <SelectItem value="A cada 5 minutos">{t("settings.every5Minutes")}</SelectItem>
                              <SelectItem value="A cada 15 minutos">{t("settings.every15Minutes")}</SelectItem>
                              <SelectItem value="A cada 30 minutos">{t("settings.every30Minutes")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2 block`}>
                            {t("settings.activeMonitoringSchedule")}
                          </Label>
                          <div className="flex gap-2 items-center">
                            <Input
                              type="time"
                              value={monitoramento.horarioInicio}
                              onChange={(e) => {
                                setMonitoramento((prev) => ({ ...prev, horarioInicio: e.target.value }))
                                marcarMudanca()
                              }}
                              className="flex-1"
                            />
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {t("settings.until")}
                            </span>
                            <Input
                              type="time"
                              value={monitoramento.horarioFim}
                              onChange={(e) => {
                                setMonitoramento((prev) => ({ ...prev, horarioFim: e.target.value }))
                                marcarMudanca()
                              }}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3 block`}>
                            {t("settings.alertTypes")}
                          </Label>
                          <div className="space-y-3">
                            {[
                              { key: "mudancasHumor", nome: t("settings.suddenMoodChanges"), cor: "red" },
                              { key: "energiaBaixa", nome: t("settings.lowEnergyLevel"), cor: "yellow" },
                              { key: "perdaConcentracao", nome: t("settings.concentrationLoss"), cor: "blue" },
                              { key: "sinaisAnsiedade", nome: t("settings.anxietySigns"), cor: "orange" },
                              { key: "tempoExcessivo", nome: t("settings.excessiveActivityTime"), cor: "purple" },
                            ].map((alerta) => (
                              <div
                                key={alerta.key}
                                className={`flex items-center justify-between p-3 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-3 h-3 rounded-full bg-${alerta.cor}-400`}></div>
                                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {alerta.nome}
                                  </span>
                                </div>
                                <Switch
                                  checked={monitoramento.alertas[alerta.key as keyof typeof monitoramento.alertas]}
                                  onCheckedChange={(checked) => {
                                    setMonitoramento((prev) => ({
                                      ...prev,
                                      alertas: { ...prev.alertas, [alerta.key]: checked },
                                    }))
                                    marcarMudanca()
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Configurações Técnicas */}
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} transition-colors duration-300`}
                >
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      <Settings className="w-5 h-5 text-gray-500" />
                      {t("settings.technicalSettings")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {t("settings.interface")}
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <Label className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} block mb-1`}>
                              {t("settings.theme")}
                            </Label>
                            <Select
                              value={configTecnicas.tema}
                              onValueChange={(value) => {
                                setConfigTecnicas((prev) => ({ ...prev, tema: value }))
                                marcarMudanca()
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Claro">{t("settings.light")}</SelectItem>
                                <SelectItem value="Escuro">{t("settings.dark")}</SelectItem>
                                <SelectItem value="Automático">{t("settings.automatic")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} block mb-1`}>
                              {t("settings.language")}
                            </Label>
                            <Select
                              value={configTecnicas.idioma}
                              onValueChange={(value) => {
                                setConfigTecnicas((prev) => ({ ...prev, idioma: value }))
                                marcarMudanca()
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Português (BR)">{t("settings.portugueseBR")}</SelectItem>
                                <SelectItem value="English">{t("settings.english")}</SelectItem>
                                <SelectItem value="Español">{t("settings.spanish")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {t("settings.synchronization")}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={configTecnicas.sincronizacao.automatica}
                              onCheckedChange={(checked) => {
                                setConfigTecnicas((prev) => ({
                                  ...prev,
                                  sincronizacao: { ...prev.sincronizacao, automatica: checked },
                                }))
                                marcarMudanca()
                              }}
                            />
                            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {t("settings.automaticSync")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={configTecnicas.sincronizacao.backupDiario}
                              onCheckedChange={(checked) => {
                                setConfigTecnicas((prev) => ({
                                  ...prev,
                                  sincronizacao: { ...prev.sincronizacao, backupDiario: checked },
                                }))
                                marcarMudanca()
                              }}
                            />
                            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {t("settings.dailyBackup")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={configTecnicas.sincronizacao.modoOffline}
                              onCheckedChange={(checked) => {
                                setConfigTecnicas((prev) => ({
                                  ...prev,
                                  sincronizacao: { ...prev.sincronizacao, modoOffline: checked },
                                }))
                                marcarMudanca()
                              }}
                            />
                            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {t("settings.offlineMode")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {t("settings.reports")}
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <Label className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} block mb-1`}>
                              {t("settings.frequency")}
                            </Label>
                            <Select
                              value={configTecnicas.relatorios.frequencia}
                              onValueChange={(value) => {
                                setConfigTecnicas((prev) => ({
                                  ...prev,
                                  relatorios: { ...prev.relatorios, frequencia: value },
                                }))
                                marcarMudanca()
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Diário">{t("settings.daily")}</SelectItem>
                                <SelectItem value="Semanal">{t("settings.weekly")}</SelectItem>
                                <SelectItem value="Mensal">{t("settings.monthly")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} block mb-1`}>
                              {t("settings.format")}
                            </Label>
                            <Select
                              value={configTecnicas.relatorios.formato}
                              onValueChange={(value) => {
                                setConfigTecnicas((prev) => ({
                                  ...prev,
                                  relatorios: { ...prev.relatorios, formato: value },
                                }))
                                marcarMudanca()
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PDF">{t("settings.pdf")}</SelectItem>
                                <SelectItem value="Excel">{t("settings.excel")}</SelectItem>
                                <SelectItem value="Email">{t("settings.emailFormat")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
