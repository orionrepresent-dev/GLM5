'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Search,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Users,
  Rocket,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Brain,
  Network,
  Menu,
  X,
  Bot,
  Linkedin,
  Instagram,
  Megaphone,
  LineChart,
  ClipboardList,
  DollarSign,
  Calendar,
  PieChart,
  Settings,
  RefreshCw,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const features = [
  {
    icon: Search,
    title: 'Análise SEO/AEO/GEO',
    description: 'Auditoria completa do seu site para motores de busca tradicionais, featured snippets e IA generativa.',
    color: 'text-purple-500'
  },
  {
    icon: Brain,
    title: 'Business Audience',
    description: 'Análise de ICP, mercado competitivo e posicionamento estratégico para seu negócio.',
    color: 'text-violet-500'
  },
  {
    icon: Megaphone,
    title: 'Gestão de Redes Sociais',
    description: 'Geração e agendamento de conteúdo otimizado para Instagram, LinkedIn e outras plataformas.',
    color: 'text-pink-500'
  },
  {
    icon: LineChart,
    title: 'Dashboard de ROI',
    description: 'Acompanhe o retorno de cada investimento e decisão de marketing em tempo real.',
    color: 'text-emerald-500'
  },
  {
    icon: ClipboardList,
    title: 'Roadmap de Execução',
    description: 'Cronograma visual de todas as ações mensais planejadas e executadas.',
    color: 'text-blue-500'
  },
  {
    icon: Bot,
    title: 'Agente de Manutenção',
    description: 'Monitoramento contínuo e ajustes automáticos para manter sua competitividade.',
    color: 'text-indigo-500'
  }
]

const plans = [
  {
    name: 'Starter',
    tier: 'starter',
    price: 'R$ 497',
    period: '/mês',
    description: 'Ideal para pequenos negócios que estão começando',
    features: [
      'Análise SEO mensal',
      'Relatório de ICP básico',
      '4 posts para redes sociais/mês',
      'Dashboard de resultados',
      'Suporte por email'
    ],
    cta: 'Começar Agora',
    popular: false
  },
  {
    name: 'Growth',
    tier: 'growth',
    price: 'R$ 997',
    period: '/mês',
    description: 'Para negócios em fase de crescimento acelerado',
    features: [
      'Tudo do plano Starter',
      'Análise completa SEO/AEO/GEO',
      'Business Audience detalhado',
      '12 posts para redes sociais/mês',
      'Roadmap de execução mensal',
      'Dashboard de ROI',
      'Suporte prioritário'
    ],
    cta: 'Escolher Growth',
    popular: true
  },
  {
    name: 'Scale',
    tier: 'scale',
    price: 'R$ 1.497',
    period: '/mês',
    description: 'Máxima performance para negócios estabelecidos',
    features: [
      'Tudo do plano Growth',
      'Análise de concorrentes avançada',
      'Benchmarking do segmento',
      'Posts ilimitados + agendamento',
      'Manutenção contínua automatizada',
      'Gestão de LinkedIn Business',
      'Consultor dedicado',
      'Relatórios executivos em PDF'
    ],
    cta: 'Falar com Consultor',
    popular: false
  }
]

const services = [
  {
    title: 'Análise Preliminar',
    price: 'Gratuito',
    description: 'Diagnóstico inicial do seu site com recomendações principais.',
    features: ['Análise SEO básica', 'Pontuação 0-100', '5 recomendações', 'Relatório online'],
    cta: 'Analisar Agora'
  },
  {
    title: 'ICP & Business Audience',
    price: 'R$ 497',
    description: 'Mapeamento completo do seu cliente ideal e posicionamento de mercado.',
    features: ['Análise de ICP', 'Pesquisa de mercado', 'Benchmarking', 'PDF executivo'],
    cta: 'Solicitar Análise'
  },
  {
    title: 'Auditoria Completa',
    price: 'R$ 997',
    description: 'Diagnóstico técnico completo com plano de ação detalhado.',
    features: ['SEO + AEO + GEO', 'Análise técnica', 'Plano de otimização', 'Call de apresentação'],
    cta: 'Agendar Auditoria'
  }
]

const stats = [
  { value: '150+', label: 'Clientes Ativos' },
  { value: '97%', label: 'Satisfação' },
  { value: '3.2x', label: 'ROI Médio' },
  { value: '24h', label: 'Tempo de Análise' }
]

const testimonials = [
  {
    quote: 'O Growth Business Copilot transformou nossa presença digital. Em 3 meses, triplicamos o tráfego orgânico e finalmente entendemos nosso público-alvo.',
    author: 'Marina Costa',
    role: 'CEO, TechFlow Solutions',
    avatar: 'MC'
  },
  {
    quote: 'A análise de ICP e o Business Audience me deram clareza que eu não tinha nem com agências que paguei 5x mais. Recomendo demais!',
    author: 'Ricardo Santos',
    role: 'Fundador, Nexus Digital',
    avatar: 'RS'
  },
  {
    quote: 'O dashboard de ROI é incrível. Finalmente consigo ver exatamente onde está indo meu investimento e qual o retorno de cada ação.',
    author: 'Ana Oliveira',
    role: 'Diretora de Marketing, InovaBR',
    avatar: 'AO'
  }
]

const faqs = [
  {
    question: 'O que é Business Audience e ICP?',
    answer: 'Business Audience é uma análise completa do seu mercado, incluindo mapeamento de concorrentes, tendências e oportunidades. ICP (Ideal Customer Profile) é o perfil detalhado do seu cliente ideal, permitindo que você direcione seus esforços de marketing com precisão.'
  },
  {
    question: 'Como funciona a gestão de redes sociais?',
    answer: 'Nosso sistema utiliza IA para gerar conteúdo otimizado para cada plataforma, agenda automaticamente as publicações nos melhores horários, e fornece relatórios de engajamento. Você pode aprovar, editar ou solicitar ajustes antes da publicação.'
  },
  {
    question: 'Qual a diferença entre os planos?',
    answer: 'O plano Starter é ideal para quem está começando. O Growth oferece análise completa e mais posts. O Scale inclui gestão de LinkedIn, manutenção automatizada e consultor dedicado para máxima performance.'
  },
  {
    question: 'Como funciona o dashboard de ROI?',
    answer: 'Você acompanha em tempo real o retorno de cada investimento feito em marketing digital. O sistema conecta suas fontes de dados e mostra métricas claras: quanto gastou, quanto retornou, e qual a taxa de conversão de cada canal.'
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Todos os planos são mensais sem fidelidade. Você pode cancelar quando quiser e ainda terá acesso até o final do período pago.'
  }
]

const roadmapExample = [
  { week: 'Semana 1', task: 'Análise SEO completa', status: 'completed' },
  { week: 'Semana 2', task: 'Configuração Business Audience', status: 'completed' },
  { week: 'Semana 3', task: 'Criação de conteúdo redes sociais', status: 'active' },
  { week: 'Semana 4', task: 'Otimização técnica do site', status: 'pending' }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Orion Growth Studio" 
                width={180} 
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#plans" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Planos
              </a>
              <a href="#dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/analyze">
                <Button variant="ghost" size="sm">
                  Análise Grátis
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Área do Cliente
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-sm font-medium">Recursos</a>
              <a href="#plans" className="block text-sm font-medium">Planos</a>
              <a href="#dashboard" className="block text-sm font-medium">Dashboard</a>
              <a href="#faq" className="block text-sm font-medium">FAQ</a>
              <div className="pt-4 space-y-2">
                <Link href="/analyze" className="block">
                  <Button variant="outline" className="w-full">Análise Grátis</Button>
                </Link>
                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600">Área do Cliente</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950/20 dark:via-violet-950/20 dark:to-indigo-950/20" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-violet-400/20 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-orange-500/10 to-purple-500/10 border-orange-500/30">
                <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                IA First Business
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text">Orion Growth Studio</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-orange-500 font-semibold mb-4"
            >
              IA FIRST BUSINESS
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Análise SEO/AEO/GEO, Business Audience, Gestão de Redes Sociais e Dashboard de ROI. 
              Tudo em um só lugar para você escalar com inteligência.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/analyze">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-lg px-8 h-12 w-full sm:w-auto">
                  <Search className="w-5 h-5 mr-2" />
                  Análise Gratuita
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8 h-12 w-full sm:w-auto border-2">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Ver Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Recursos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ecossistema Completo de{' '}
              <span className="gradient-text">Autoridade Digital</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo o que você precisa para construir presença digital sólida e mensurável.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 hover:border-purple-500/50 card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-950 dark:to-violet-950 flex items-center justify-center mb-4">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Dashboard</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Painel do Cliente{' '}
              <span className="gradient-text">Completo e Transparente</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acompanhe todos os serviços, roadmaps e resultados em um só lugar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-auto">
                      <Image src="/logo.png" alt="Orion" width={120} height={32} className="h-8 w-auto brightness-0 invert" />
                    </div>
                    <span className="text-white font-medium">Painel do Cliente</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    Plano Growth
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                    <TabsTrigger value="roi">ROI</TabsTrigger>
                    <TabsTrigger value="services">Serviços</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-muted-foreground">Tráfego Orgânico</span>
                          </div>
                          <div className="text-2xl font-bold">+127%</div>
                          <Progress value={75} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-muted-foreground">ROI Mensal</span>
                          </div>
                          <div className="text-2xl font-bold">3.2x</div>
                          <Progress value={80} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">SEO Score</span>
                          </div>
                          <div className="text-2xl font-bold">78/100</div>
                          <Progress value={78} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-pink-500" />
                            <span className="text-sm text-muted-foreground">Engajamento</span>
                          </div>
                          <div className="text-2xl font-bold">+45%</div>
                          <Progress value={65} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="roadmap">
                    <div className="space-y-3">
                      {roadmapExample.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.status === 'completed' ? 'bg-emerald-500' :
                            item.status === 'active' ? 'bg-purple-500' : 'bg-muted'
                          }`}>
                            {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-white" /> :
                             item.status === 'active' ? <RefreshCw className="w-5 h-5 text-white animate-spin" /> :
                             <Calendar className="w-5 h-5 text-muted-foreground" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.week}</div>
                            <div className="text-sm text-muted-foreground">{item.task}</div>
                          </div>
                          <Badge variant={item.status === 'completed' ? 'default' : item.status === 'active' ? 'secondary' : 'outline'}>
                            {item.status === 'completed' ? 'Concluído' : item.status === 'active' ? 'Em progresso' : 'Pendente'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="roi">
                    <div className="text-center py-8">
                      <PieChart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Visualização detalhada de ROI disponível na área do cliente</p>
                      <Link href="/dashboard">
                        <Button className="mt-4 bg-gradient-to-r from-purple-600 to-violet-600">
                          Acessar Dashboard Completo
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="services">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Análise SEO Mensal</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Auditoria completa com recomendações</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Business Audience</span>
                        </div>
                        <p className="text-sm text-muted-foreground">ICP e análise de mercado</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Gestão Redes Sociais</span>
                        </div>
                        <p className="text-sm text-muted-foreground">12 posts/mês otimizados</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Dashboard de ROI</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Métricas em tempo real</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Planos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Investimento que{' '}
              <span className="gradient-text">Cabe no Seu Bolso</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              De R$ 497 a R$ 1.497/mês. Escolha o plano ideal para sua fase de crescimento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-purple-500 ring-2 ring-purple-500/20 scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-violet-600">Mais Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-end justify-center gap-1 mt-4">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/analyze" className="w-full">
                      <Button
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Serviços Avulsos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Soluções{' '}
              <span className="gradient-text">Pontuais</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Não precisa de assinatura? Contrate serviços específicos sob demanda.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full card-hover">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <div className="text-2xl font-bold gradient-text">
                      {service.price}
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/analyze" className="w-full">
                      <Button variant="outline" className="w-full">
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Depoimentos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              O que nossos{' '}
              <span className="gradient-text">Clientes Dizem</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic mb-6">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Perguntas{' '}
              <span className="gradient-text">Frequentes</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-600 to-violet-700 border-0 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10" />
              <CardContent className="relative pt-8 pb-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Pronto para Escalar seu Negócio?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Comece agora com uma análise gratuita e descubra como a Orion Growth Studio pode transformar sua presença digital com inteligência artificial.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/analyze">
                    <Button size="lg" variant="secondary" className="text-lg px-8 h-12 w-full sm:w-auto">
                      <Search className="w-5 h-5 mr-2" />
                      Análise Gratuita
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="text-lg px-8 h-12 w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Ver Planos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Orion Growth Studio" 
                  width={160} 
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma IA-First de crescimento digital para negócios que querem escalar com inteligência.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/analyze" className="hover:text-foreground transition-colors">Análise SEO/AEO/GEO</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Business Audience</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Redes Sociais</a></li>
                <li><a href="/dashboard" className="hover:text-foreground transition-colors">Dashboard ROI</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Planos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#plans" className="hover:text-foreground transition-colors">Starter - R$ 497/mês</a></li>
                <li><a href="#plans" className="hover:text-foreground transition-colors">Growth - R$ 997/mês</a></li>
                <li><a href="#plans" className="hover:text-foreground transition-colors">Scale - R$ 1.497/mês</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contato@orionconsultoria.com.br</li>
                <li>+55 (11) 99999-9999</li>
                <li>São Paulo, Brasil</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Orion Growth Studio. <span className="text-blue-400">IA FIRST BUSINESS</span>. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
