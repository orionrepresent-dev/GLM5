'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Search,
  ArrowLeft,
  Globe,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const analysisTypes = [
  {
    id: 'seo',
    title: 'SEO Analysis',
    icon: Search,
    description: 'Análise completa de otimização para motores de busca',
    color: 'text-emerald-500'
  },
  {
    id: 'aeo',
    title: 'AEO Analysis',
    icon: Zap,
    description: 'Otimização para featured snippets e respostas diretas',
    color: 'text-blue-500'
  },
  {
    id: 'geo',
    title: 'GEO Analysis',
    icon: Globe,
    description: 'Otimização para engines de IA generativa',
    color: 'text-purple-500'
  }
]

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Análise Completa',
    description: 'Mais de 50 fatores de SEO avaliados'
  },
  {
    icon: BarChart3,
    title: 'Relatório Detalhado',
    description: 'Recomendações priorizadas por impacto'
  },
  {
    icon: Shield,
    title: 'Dados Seguros',
    description: 'Suas informações protegidas'
  }
]

export default function AnalyzePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    url: '',
    email: '',
    name: '',
    company: '',
    phone: '',
    goals: '',
    competitors: '',
    budget: '',
    timeline: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.url) {
      setError('Por favor, insira uma URL válida.')
      return
    }

    if (!validateUrl(formData.url)) {
      setError('Por favor, insira uma URL válida (ex: https://seusite.com.br)')
      return
    }

    if (!formData.email) {
      setError('Por favor, insira seu email.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erro ao processar análise')
      }

      const data = await response.json()
      
      // Store results in sessionStorage for the results page
      sessionStorage.setItem('analysisResults', JSON.stringify(data))
      sessionStorage.setItem('analysisFormData', JSON.stringify(formData))
      
      router.push('/results')
    } catch (err) {
      setError('Ocorreu um erro ao processar sua análise. Por favor, tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="Orion Growth Studio" 
                width={140} 
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-4 h-4 mr-2 text-emerald-500" />
            Análise Gratuita
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Analise seu Site para{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              SEO, AEO e GEO
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insira a URL do seu site e receba um relatório completo com pontuação e recomendações priorizadas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Informações do Site</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para iniciar a análise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* URL Input */}
                  <div className="space-y-2">
                    <Label htmlFor="url">URL do Site *</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="url"
                        name="url"
                        type="text"
                        placeholder="https://seusite.com.br"
                        value={formData.url}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nome da empresa"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="space-y-2">
                    <Label htmlFor="goals">Objetivos Principais</Label>
                    <Textarea
                      id="goals"
                      name="goals"
                      placeholder="Ex: Aumentar tráfego orgânico, melhorar posicionamento para palavras-chave específicas..."
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Competitors */}
                  <div className="space-y-2">
                    <Label htmlFor="competitors">Concorrentes (opcional)</Label>
                    <Textarea
                      id="competitors"
                      name="competitors"
                      placeholder="Liste URLs de concorrentes para análise comparativa..."
                      value={formData.competitors}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Orçamento Estimado</Label>
                      <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Até R$ 500</SelectItem>
                          <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                          <SelectItem value="1000-3000">R$ 1.000 - R$ 3.000</SelectItem>
                          <SelectItem value="3000-5000">R$ 3.000 - R$ 5.000</SelectItem>
                          <SelectItem value="above-5000">Acima de R$ 5.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Prazo Desejado</Label>
                      <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgente (1-2 semanas)</SelectItem>
                          <SelectItem value="normal">Normal (1-2 meses)</SelectItem>
                          <SelectItem value="flexible">Flexível (3+ meses)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Iniciar Análise Gratuita
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Analysis Types */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipos de Análise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisTypes.map((type) => (
                  <div key={type.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <type.icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{type.title}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O que você recebe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <benefit.icon className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{benefit.title}</div>
                      <div className="text-xs text-muted-foreground">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <Card className="bg-gradient-to-br from-purple-600 to-violet-700 border-0 text-white">
              <CardContent className="pt-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="font-semibold mb-2">100% Gratuito</h3>
                <p className="text-sm text-white/90">
                  Análise inicial sem compromisso. Receba seu relatório em minutos.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
