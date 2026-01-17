import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Download,
  Share2,
  RefreshCw,
  Lightbulb,
  Zap
} from 'lucide-react';
import { printDocument } from '@/lib/pdf-generator';

type ServiceType = 'data_science' | 'analytics' | 'people_analytics' | 'behavioral_analytics' | 'customer_intelligence' | 'bioestatistica';

interface ServiceBenchmark {
  label: string;
  avgROI: number;
  paybackMonths: number;
  description: string;
  benefits: string[];
}

const serviceBenchmarks: Record<ServiceType, ServiceBenchmark> = {
  data_science: {
    label: 'Data Science & Machine Learning',
    avgROI: 350,
    paybackMonths: 8,
    description: 'Modelos preditivos, automação de decisões e otimização de processos',
    benefits: [
      'Redução de custos operacionais em 15-30%',
      'Aumento de receita por upsell/cross-sell em 10-25%',
      'Otimização de estoque e logística em 20-40%',
      'Automação de processos manuais em 40-60%'
    ]
  },
  analytics: {
    label: 'Business Analytics',
    avgROI: 280,
    paybackMonths: 6,
    description: 'Dashboards, KPIs e análises para tomada de decisão',
    benefits: [
      'Redução do tempo de análise em 60-80%',
      'Melhoria na tomada de decisão em 35-50%',
      'Identificação de oportunidades de receita em 15-25%',
      'Redução de erros de relatórios em 70-90%'
    ]
  },
  people_analytics: {
    label: 'People Analytics',
    avgROI: 220,
    paybackMonths: 10,
    description: 'Análise de pessoas, turnover e desenvolvimento de talentos',
    benefits: [
      'Redução de turnover em 15-25%',
      'Melhoria no tempo de contratação em 30-45%',
      'Aumento de produtividade em 10-20%',
      'Redução de custos de recrutamento em 20-35%'
    ]
  },
  behavioral_analytics: {
    label: 'Behavioral Analytics',
    avgROI: 300,
    paybackMonths: 7,
    description: 'Análise de comportamento do consumidor e UX',
    benefits: [
      'Aumento de conversão em 15-35%',
      'Melhoria na retenção de clientes em 20-30%',
      'Redução de churn em 10-25%',
      'Aumento do LTV em 15-40%'
    ]
  },
  customer_intelligence: {
    label: 'Customer Intelligence',
    avgROI: 320,
    paybackMonths: 6,
    description: 'Segmentação, propensão e jornada do cliente',
    benefits: [
      'Aumento de vendas por segmentação em 20-35%',
      'Melhoria em campanhas de marketing em 25-45%',
      'Redução de custo de aquisição em 15-30%',
      'Aumento do NPS em 10-25 pontos'
    ]
  },
  bioestatistica: {
    label: 'Bioestatística',
    avgROI: 250,
    paybackMonths: 12,
    description: 'Análises estatísticas para área de saúde e farmacêutica',
    benefits: [
      'Aceleração de estudos clínicos em 20-35%',
      'Redução de custos de pesquisa em 15-25%',
      'Melhoria na precisão de diagnósticos em 10-20%',
      'Otimização de recursos de pesquisa em 25-40%'
    ]
  }
};

export default function ROICalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>('data_science');
  const [investmentValue, setInvestmentValue] = useState('50000');
  const [currentCost, setCurrentCost] = useState('100000');
  const [expectedReduction, setExpectedReduction] = useState([25]);
  const [revenueIncrease, setRevenueIncrease] = useState('50000');
  const [implementationMonths, setImplementationMonths] = useState('6');
  const [projectDurationYears, setProjectDurationYears] = useState('3');

  const calculations = useMemo(() => {
    const investment = parseFloat(investmentValue) || 0;
    const cost = parseFloat(currentCost) || 0;
    const reduction = expectedReduction[0] / 100;
    const revenue = parseFloat(revenueIncrease) || 0;
    const implMonths = parseInt(implementationMonths) || 6;
    const duration = parseInt(projectDurationYears) || 3;

    // Cálculos
    const annualCostSavings = cost * reduction;
    const annualRevenueGain = revenue;
    const totalAnnualBenefit = annualCostSavings + annualRevenueGain;
    const totalBenefitOverPeriod = totalAnnualBenefit * duration;
    const netBenefit = totalBenefitOverPeriod - investment;
    const roi = investment > 0 ? ((netBenefit / investment) * 100) : 0;
    const paybackMonths = totalAnnualBenefit > 0 
      ? Math.ceil((investment / totalAnnualBenefit) * 12) + implMonths
      : 0;
    const monthlyBenefit = totalAnnualBenefit / 12;

    // Projeção mensal
    const monthlyProjection = [];
    let cumulativeBenefit = -investment;
    for (let month = 1; month <= duration * 12; month++) {
      if (month <= implMonths) {
        cumulativeBenefit = -investment;
      } else {
        cumulativeBenefit += monthlyBenefit;
      }
      if (month % 3 === 0) {
        monthlyProjection.push({
          month,
          value: cumulativeBenefit
        });
      }
    }

    return {
      investment,
      annualCostSavings,
      annualRevenueGain,
      totalAnnualBenefit,
      totalBenefitOverPeriod,
      netBenefit,
      roi,
      paybackMonths,
      monthlyProjection
    };
  }, [investmentValue, currentCost, expectedReduction, revenueIncrease, implementationMonths, projectDurationYears]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const benchmark = serviceBenchmarks[serviceType];

  const handleGenerateReport = () => {
    const content = `
      <div class="highlight-box">
        <h3 style="margin-top: 0;">Resumo Executivo</h3>
        <p>Esta análise de ROI foi preparada para avaliar o retorno sobre investimento de um projeto de <strong>${benchmark.label}</strong>.</p>
      </div>

      <h2>Parâmetros do Projeto</h2>
      <table>
        <tr><th>Parâmetro</th><th>Valor</th></tr>
        <tr><td>Tipo de Serviço</td><td>${benchmark.label}</td></tr>
        <tr><td>Investimento Total</td><td>${formatCurrency(calculations.investment)}</td></tr>
        <tr><td>Custo Atual (Anual)</td><td>${formatCurrency(parseFloat(currentCost))}</td></tr>
        <tr><td>Redução de Custos Esperada</td><td>${expectedReduction[0]}%</td></tr>
        <tr><td>Aumento de Receita (Anual)</td><td>${formatCurrency(parseFloat(revenueIncrease))}</td></tr>
        <tr><td>Tempo de Implementação</td><td>${implementationMonths} meses</td></tr>
        <tr><td>Período de Análise</td><td>${projectDurationYears} anos</td></tr>
      </table>

      <h2>Resultados da Análise</h2>
      <table>
        <tr><th>Métrica</th><th>Valor</th></tr>
        <tr><td>Economia Anual Projetada</td><td>${formatCurrency(calculations.annualCostSavings)}</td></tr>
        <tr><td>Ganho de Receita Anual</td><td>${formatCurrency(calculations.annualRevenueGain)}</td></tr>
        <tr><td>Benefício Anual Total</td><td>${formatCurrency(calculations.totalAnnualBenefit)}</td></tr>
        <tr><td>Benefício Total (${projectDurationYears} anos)</td><td>${formatCurrency(calculations.totalBenefitOverPeriod)}</td></tr>
        <tr><td>Benefício Líquido</td><td>${formatCurrency(calculations.netBenefit)}</td></tr>
        <tr style="font-weight: bold;"><td>ROI</td><td>${formatPercent(calculations.roi)}</td></tr>
        <tr><td>Payback</td><td>${calculations.paybackMonths} meses</td></tr>
      </table>

      <h2>Benchmark do Setor</h2>
      <p>${benchmark.description}</p>
      <table>
        <tr><th>Métrica</th><th>Benchmark</th><th>Seu Projeto</th></tr>
        <tr><td>ROI Médio</td><td>${benchmark.avgROI}%</td><td>${formatPercent(calculations.roi)}</td></tr>
        <tr><td>Payback Médio</td><td>${benchmark.paybackMonths} meses</td><td>${calculations.paybackMonths} meses</td></tr>
      </table>

      <h2>Benefícios Típicos</h2>
      <ul>
        ${benchmark.benefits.map(b => `<li>${b}</li>`).join('')}
      </ul>

      <h2>Conclusão</h2>
      <p>
        ${calculations.roi >= benchmark.avgROI 
          ? `O projeto apresenta um ROI acima da média do mercado, indicando uma excelente oportunidade de investimento.`
          : calculations.roi > 0
            ? `O projeto apresenta um ROI positivo, indicando que o investimento deve trazer retorno financeiro.`
            : `O projeto requer revisão dos parâmetros para garantir viabilidade financeira.`}
      </p>
      <p>
        Com um payback de ${calculations.paybackMonths} meses, o investimento inicial de ${formatCurrency(calculations.investment)} 
        deve gerar um retorno líquido de ${formatCurrency(calculations.netBenefit)} ao longo de ${projectDurationYears} anos.
      </p>

      <div class="date-location">
        <p>Documento gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    `;

    printDocument({
      title: `Análise de ROI - ${benchmark.label}`,
      content,
      companyName: 'Vixio',
      companyInfo: {
        website: 'www.vixio.com.br',
        email: 'contato@vixio.com.br'
      },
      showHeader: true,
      showFooter: true,
      headerColor: '#1a365d'
    });
  };

  const resetCalculator = () => {
    setServiceType('data_science');
    setInvestmentValue('50000');
    setCurrentCost('100000');
    setExpectedReduction([25]);
    setRevenueIncrease('50000');
    setImplementationMonths('6');
    setProjectDurationYears('3');
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Calculadora de ROI"
        description="Simule o retorno sobre investimento para projetos de consultoria"
        icon={Calculator}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Parâmetros do Projeto
              </CardTitle>
              <CardDescription>Insira os dados para calcular o ROI estimado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Serviço</Label>
                <Select value={serviceType} onValueChange={(v) => setServiceType(v as ServiceType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceBenchmarks).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">{benchmark.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Investimento Total (R$)</Label>
                  <Input
                    type="number"
                    value={investmentValue}
                    onChange={(e) => setInvestmentValue(e.target.value)}
                    placeholder="50000"
                  />
                  <p className="text-xs text-muted-foreground">Custo total do projeto de consultoria</p>
                </div>

                <div className="space-y-2">
                  <Label>Custo Operacional Atual (R$/ano)</Label>
                  <Input
                    type="number"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(e.target.value)}
                    placeholder="100000"
                  />
                  <p className="text-xs text-muted-foreground">Custos atuais que serão otimizados</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Redução de Custos Esperada</Label>
                    <span className="font-medium">{expectedReduction[0]}%</span>
                  </div>
                  <Slider
                    value={expectedReduction}
                    onValueChange={setExpectedReduction}
                    min={5}
                    max={60}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservador (5%)</span>
                    <span>Agressivo (60%)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Aumento de Receita Esperado (R$/ano)</Label>
                  <Input
                    type="number"
                    value={revenueIncrease}
                    onChange={(e) => setRevenueIncrease(e.target.value)}
                    placeholder="50000"
                  />
                  <p className="text-xs text-muted-foreground">Receita adicional gerada pelo projeto</p>
                </div>

                <div className="space-y-2">
                  <Label>Tempo de Implementação (meses)</Label>
                  <Input
                    type="number"
                    value={implementationMonths}
                    onChange={(e) => setImplementationMonths(e.target.value)}
                    placeholder="6"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Período de Análise (anos)</Label>
                  <Select value={projectDurationYears} onValueChange={setProjectDurationYears}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ano</SelectItem>
                      <SelectItem value="2">2 anos</SelectItem>
                      <SelectItem value="3">3 anos</SelectItem>
                      <SelectItem value="5">5 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={resetCalculator} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Resetar
                </Button>
                <Button onClick={handleGenerateReport} className="gap-2">
                  <Download className="h-4 w-4" />
                  Gerar Relatório PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benchmark Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Benefícios Típicos - {benchmark.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benchmark.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* ROI Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  ROI Estimado
                </span>
                {calculations.roi >= benchmark.avgROI ? (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Acima do Benchmark
                  </Badge>
                ) : calculations.roi > 0 ? (
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Positivo
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Revisar
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-primary">
                  {formatPercent(calculations.roi)}
                </p>
                <p className="text-muted-foreground mt-2">
                  Benchmark do setor: {benchmark.avgROI}%
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Payback</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {calculations.paybackMonths} meses
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Benefício Líquido</span>
                  <span className="font-semibold text-emerald-500">
                    {formatCurrency(calculations.netBenefit)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Detalhamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Investimento</span>
                <span className="font-medium">{formatCurrency(calculations.investment)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Economia Anual</span>
                <span className="font-medium text-emerald-500">
                  {formatCurrency(calculations.annualCostSavings)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Ganho de Receita</span>
                <span className="font-medium text-emerald-500">
                  {formatCurrency(calculations.annualRevenueGain)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Benefício Anual</span>
                <span className="font-medium">
                  {formatCurrency(calculations.totalAnnualBenefit)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">
                  Total ({projectDurationYears} anos)
                </span>
                <span className="font-bold text-lg">
                  {formatCurrency(calculations.totalBenefitOverPeriod)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Projection Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Projeção de Retorno
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {calculations.monthlyProjection.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-20">
                      Mês {point.month}
                    </span>
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden relative">
                      <div
                        className={`h-full transition-all duration-300 ${
                          point.value >= 0 ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.abs(point.value / calculations.totalBenefitOverPeriod) * 100)}%`
                        }}
                      />
                    </div>
                    <span className={`text-sm font-medium w-24 text-right ${
                      point.value >= 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {formatCurrency(point.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
