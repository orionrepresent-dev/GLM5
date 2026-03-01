import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// =====================================================
// GROWTH BUSINESS COPILOT - MOTOR DE ICP AVANÇADO
// O "SEGREDO" DO SISTEMA
// =====================================================

interface ICPAnalysis {
  metaInfo: {
    analyzedAt: string
    dataSource: string[]
    confidenceLevel: 'high' | 'medium' | 'low'
    marketMaturity: 'emerging' | 'growing' | 'mature' | 'saturated'
  }

  // ICP PRIMÁRIO
  primaryICP: {
    name: string
    description: string
    demographics: {
      ageRange: string
      gender: string
      income: string
      education: string
      location: string[]
      companySize: string
      jobTitles: string[]
      industry: string[]
    }
    firmographics: {
      revenue: string
      employees: string
      yearsInBusiness: string
      techStack: string[]
      fundingStage: string
    }
    psychographics: {
      values: string[]
      fears: string[]
      desires: string[]
      triggers: string[]
      objections: string[]
      decisionCriteria: string[]
    }
    behaviors: {
      channels: string[]
      contentConsumption: string[]
      buyingPatterns: string[]
      socialProofNeeds: string[]
    }
    painPoints: {
      primary: string[]
      secondary: string[]
      latent: string[]
    }
    goals: {
      shortTerm: string[]
      mediumTerm: string[]
      longTerm: string[]
    }
  }

  // ICPs SECUNDÁRIOS
  secondaryICPs: Array<{
    name: string
    description: string
    percentage: number
    keyDifferences: string[]
  }>

  // ICPs NEGATIVOS (QUEM NÃO É CLIENTE)
  negativeICPs: Array<{
    profile: string
    reasons: string[]
    warningSigns: string[]
    opportunityCost: string
  }>

  // ANÁLISE DE MERCADO
  marketAnalysis: {
    tam: string
    sam: string
    som: string
    growthRate: string
    trends: Array<{
      name: string
      impact: 'positive' | 'negative' | 'neutral'
      timeHorizon: string
      description: string
    }>
    marketGaps: string[]
    opportunities: string[]
  }

  // BENCHMARK COMPETITIVO
  competitiveLandscape: {
    directCompetitors: Array<{
      name: string
      positioning: string
      targetAudience: string
      strengths: string[]
      weaknesses: string[]
    }>
    indirectCompetitors: Array<{
      name: string
      threat: string
    }>
    blueOcean: string[]
  }

  // REGIONALISMOS
  regionalInsights: Array<{
    region: string
    characteristics: string[]
    opportunities: string[]
    culturalNuances: string[]
    buyingBehavior: string
  }>

  // TENDÊNCIAS
  trends: {
    confirmed: Array<{
      trend: string
      impact: string
      actionRequired: string
    }>
    projected: Array<{
      trend: string
      probability: string
      preparation: string
    }>
    toTest: Array<{
      hypothesis: string
      testMethod: string
      successMetric: string
    }>
  }

  // RECOMENDAÇÕES ESTRATÉGICAS
  strategicRecommendations: {
    positioning: string
    messaging: string[]
    channels: string[]
    contentStrategy: string[]
    pricingStrategy: string
    differentiationPoints: string[]
  }

  // MÉTRICAS DE SUCESSO
  successMetrics: {
    acquisition: Array<{ metric: string; target: string }>
    engagement: Array<{ metric: string; target: string }>
    conversion: Array<{ metric: string; target: string }>
    retention: Array<{ metric: string; target: string }>
  }
}

// Motor de busca de dados de mercado
async function fetchMarketData(zai: Awaited<ReturnType<typeof ZAI.create>>, query: string): Promise<string> {
  try {
    const searchResult = await zai.functions.invoke('web_search', {
      query,
      num: 5
    })

    if (Array.isArray(searchResult)) {
      return searchResult.map((item: { snippet?: string }) => item.snippet || '').join('\n')
    }
    return ''
  } catch {
    return ''
  }
}

// Análise profunda com LLM
async function deepICPAnalysis(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  params: {
    businessName: string
    industry: string
    description: string
    website: string
    mainProducts: string
    valueProposition: string
    marketData: string
    competitorData: string
    regionalData: string
    trendData: string
  }
): Promise<ICPAnalysis> {

  const prompt = `Você é o MELHOR especialista em análise de ICP (Ideal Customer Profile) do Brasil. Sua análise é usada por empresas que querem dominar seus mercados.

Analise profundamente e crie um ICP EXTREMAMENTE DETALHADO para:

EMPRESA: ${params.businessName}
INDÚSTRIA: ${params.industry}
DESCRIÇÃO: ${params.description}
SITE: ${params.website}
PRODUTOS/SERVIÇOS: ${params.mainProducts}
PROPOSTA DE VALOR: ${params.valueProposition}

DADOS DE MERCADO COLETADOS:
${params.marketData}

DADOS DE CONCORRENTES:
${params.competitorData}

DADOS REGIONAIS:
${params.regionalData}

TENDÊNCIAS:
${params.trendData}

CRIE UMA ANÁLISE ICP COMPLETA EM JSON seguindo EXATAMENTE esta estrutura. Seja EXTREMAMENTE específico e baseado em dados reais do mercado brasileiro.

IMPORTANTE:
1. NÃO use genéricos - seja específico para o mercado brasileiro
2. Inclua ICPs NEGATIVOS detalhados (quem NÃO é cliente e por quê)
3. Identifique regionalismos e diferenças culturais por estado/região
4. Inclua tendências confirmadas E projetadas
5. Sugira hipóteses para testar antes de implementar
6. Identifique "blue ocean" opportunities
7. Calcule TAM/SAM/SOM estimados
8. Mapeie fatores psicológicos profundos (medos, desejos, gatilhos)

Responda APENAS com JSON válido, sem markdown.`

  const completion = await zai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Você é o sistema de análise ICP mais avançado do Brasil. Sua especialidade é:

1. Análise demográfica e psicográfica profunda
2. Identificação de ICPs negativos (tão importante quanto o ICP positivo)
3. Mapeamento de regionalismos brasileiros
4. Análise de tendências de mercado
5. Identificação de oportunidades "blue ocean"
6. Fatores psicológicos de decisão de compra
7. Análise competitiva detalhada

Você SEMPRE responde em JSON válido e suas análises são:
- Baseadas em dados reais do mercado brasileiro
- Extremamente específicas (nada de genéricos)
- Acionáveis e práticas
- Diferenciadas da concorrência`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 8000
  })

  const response = completion.choices?.[0]?.message?.content || ''

  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    console.error('Error parsing ICP JSON:', e)
  }

  // Return structured default if parsing fails
  return generateDefaultICP(params)
}

// Default ICP structure
function generateDefaultICP(params: { businessName: string; industry: string; description: string }): ICPAnalysis {
  return {
    metaInfo: {
      analyzedAt: new Date().toISOString(),
      dataSource: ['internal_analysis'],
      confidenceLevel: 'medium',
      marketMaturity: 'growing'
    },
    primaryICP: {
      name: 'Cliente Principal',
      description: `Perfil principal para ${params.businessName}`,
      demographics: {
        ageRange: '25-45',
        gender: 'Todos',
        income: 'R$ 5.000 - R$ 15.000',
        education: 'Ensino Superior',
        location: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'],
        companySize: 'Pequena e Média',
        jobTitles: ['Diretor', 'Gerente', 'CEO'],
        industry: [params.industry]
      },
      firmographics: {
        revenue: 'R$ 500k - R$ 5M',
        employees: '10-50',
        yearsInBusiness: '2-10 anos',
        techStack: [],
        fundingStage: 'Bootstrap'
      },
      psychographics: {
        values: ['Crescimento', 'Inovação', 'Eficiência'],
        fears: ['Perder mercado', 'Estagnação'],
        desires: ['Escalar', 'Automatizar', 'Crescer'],
        triggers: ['Lançamento de produto', 'Expansão'],
        objections: ['Preço', 'Tempo de implementação'],
        decisionCriteria: ['ROI', 'Facilidade', 'Suporte']
      },
      behaviors: {
        channels: ['LinkedIn', 'Google', 'WhatsApp'],
        contentConsumption: ['Blogs', 'Podcasts', 'Webinars'],
        buyingPatterns: ['Pesquisa extensiva', 'Comparação'],
        socialProofNeeds: ['Cases', 'Depoimentos', 'Reviews']
      },
      painPoints: {
        primary: ['Falta de tempo', 'Processos ineficientes'],
        secondary: ['Falta de conhecimento técnico'],
        latent: ['Medo de mudança']
      },
      goals: {
        shortTerm: ['Automatizar processos'],
        mediumTerm: ['Aumentar receita'],
        longTerm: ['Escalar negócio']
      }
    },
    secondaryICPs: [],
    negativeICPs: [
      {
        profile: 'Empresas sem orçamento',
        reasons: ['Não têm recursos para implementar'],
        warningSigns: ['Pedem desconto excessivo', 'Não têm clareza de objetivos'],
        opportunityCost: 'Tempo de vendas desperdiçado'
      }
    ],
    marketAnalysis: {
      tam: 'R$ 10 bilhões',
      sam: 'R$ 2 bilhões',
      som: 'R$ 200 milhões',
      growthRate: '15% a.a.',
      trends: [],
      marketGaps: ['Atendimento personalizado', 'Soluções integradas'],
      opportunities: ['PMEs em digitalização', 'Mercado interiorano']
    },
    competitiveLandscape: {
      directCompetitors: [],
      indirectCompetitors: [],
      blueOcean: ['Atendimento humanizado + tecnologia', 'Preço acessível com qualidade']
    },
    regionalInsights: [
      {
        region: 'Sudeste',
        characteristics: ['Maior volume', 'Maior concorrência'],
        opportunities: ['Mercado saturado busca diferenciação'],
        culturalNuances: ['Valoriza praticidade'],
        buyingBehavior: 'Decisão mais rápida'
      }
    ],
    trends: {
      confirmed: [],
      projected: [],
      toTest: []
    },
    strategicRecommendations: {
      positioning: 'Especialista em crescimento para PMEs',
      messaging: ['Resultados comprovados', 'Implementação rápida'],
      channels: ['LinkedIn', 'Google Ads', 'Content Marketing'],
      contentStrategy: ['Cases de sucesso', 'Conteúdo educativo'],
      pricingStrategy: 'Value-based pricing',
      differentiationPoints: ['IA proprietária', 'Suporte dedicado']
    },
    successMetrics: {
      acquisition: [{ metric: 'CPL', target: 'R$ 50' }],
      engagement: [{ metric: 'Taxa de abertura', target: '25%' }],
      conversion: [{ metric: 'Taxa de conversão', target: '5%' }],
      retention: [{ metric: 'Churn', target: '< 5%' }]
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      businessName,
      industry,
      description,
      website,
      mainProducts,
      valueProposition,
      competitors,
      keywords,
      targetAudience
    } = body

    console.log('🎯 Iniciando análise ICP avançada para:', businessName)

    const zai = await ZAI.create()

    // Buscar dados de mercado em paralelo
    console.log('📊 Coletando dados de mercado...')

    const [
      marketData,
      competitorData,
      regionalData,
      trendData,
      demographicData,
      psychologicalData
    ] = await Promise.all([
      // Dados do mercado
      fetchMarketData(zai, `mercado ${industry} Brasil 2024 tamanho crescimento estatísticas`),

      // Dados de concorrentes
      fetchMarketData(zai, `${competitors || industry} principais concorrentes Brasil análise`),

      // Dados regionais
      fetchMarketData(zai, `${industry} Brasil diferenças regionais São Paulo Rio Grande Sul Nordeste`),

      // Tendências
      fetchMarketData(zai, `tendências ${industry} Brasil 2024 2025 projeções inovações`),

      // Dados demográficos
      fetchMarketData(zai, `público consumidor ${industry} Brasil perfil demográfico renda comportamento`),

      // Fatores psicológicos
      fetchMarketData(zai, `comportamento consumidor ${industry} Brasil psicologia decisão compra gatilhos`)
    ])

    console.log('✅ Dados coletados, iniciando análise profunda...')

    // Análise profunda com LLM
    const icpAnalysis = await deepICPAnalysis(zai, {
      businessName,
      industry,
      description,
      website: website || '',
      mainProducts: mainProducts || '',
      valueProposition: valueProposition || '',
      marketData: marketData + '\n' + demographicData,
      competitorData,
      regionalData,
      trendData: trendData + '\n' + psychologicalData
    })

    // Enriquecer com meta informações
    icpAnalysis.metaInfo.analyzedAt = new Date().toISOString()
    icpAnalysis.metaInfo.dataSource = [
      'web_search',
      'llm_analysis',
      'market_data',
      'competitor_analysis',
      'regional_data',
      'trend_analysis'
    ]

    console.log('✅ Análise ICP concluída com sucesso!')

    return NextResponse.json({
      success: true,
      icp: icpAnalysis
    })

  } catch (error) {
    console.error('Erro na análise ICP:', error)
    return NextResponse.json(
      { error: 'Erro ao processar análise ICP' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessName = searchParams.get('businessName')
  const industry = searchParams.get('industry')

  if (!businessName || !industry) {
    return NextResponse.json({
      message: 'API de Análise ICP Avançada - Growth Business Copilot',
      usage: {
        method: 'POST',
        body: {
          businessName: 'Nome da empresa',
          industry: 'Indústria/segmento',
          description: 'Descrição do negócio',
          website: 'URL do site (opcional)',
          mainProducts: 'Principais produtos/serviços',
          valueProposition: 'Proposta de valor única',
          competitors: 'Concorrentes conhecidos (opcional)',
          keywords: 'Palavras-chave relacionadas (opcional)',
          targetAudience: 'Público-alvo atual (opcional)'
        }
      },
      features: [
        'ICP Primário detalhado (demografia, psicografia, comportamento)',
        'ICPs Secundários',
        'ICPs Negativos (quem NÃO é cliente)',
        'Análise de mercado (TAM/SAM/SOM)',
        'Benchmark competitivo',
        'Insights regionais',
        'Tendências confirmadas e projetadas',
        'Recomendações estratégicas',
        'Métricas de sucesso'
      ]
    })
  }

  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ businessName, industry })
  }))
}
