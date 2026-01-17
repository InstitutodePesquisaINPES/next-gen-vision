// Proposal PDF Generator with professional template
import { printDocument, type PDFGeneratorOptions } from './pdf-generator';

export interface ProposalData {
  numero: string | null;
  titulo: string;
  descricao: string | null;
  tipoServico: string;
  clienteNome: string | null;
  clienteEmpresa: string | null;
  valorTotal: number | null;
  descontoPercentual: number | null;
  valorFinal: number | null;
  prazoExecucaoDias: number | null;
  validadeProposta: string | null;
  escopo: { titulo: string; descricao: string }[];
  entregaveis: { titulo: string; descricao: string }[];
  cronograma: { fase: string; duracao: string; descricao: string }[];
  termosCondicoes: string | null;
}

const serviceTypeLabels: Record<string, string> = {
  data_science: 'Data Science & Machine Learning',
  analytics: 'Business Analytics',
  people_analytics: 'People Analytics',
  behavioral_analytics: 'Behavioral Analytics',
  customer_intelligence: 'Customer Intelligence',
  bioestatistica: 'Bioestatística',
  sistemas: 'Desenvolvimento de Sistemas',
  plataformas: 'Plataformas Digitais',
  educacao: 'Educação Corporativa',
  outro: 'Consultoria Especializada'
};

export function generateProposalPDF(data: ProposalData): void {
  const formatCurrency = (value: number | null) => {
    if (!value) return 'A definir';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'A definir';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const tipoServicoLabel = serviceTypeLabels[data.tipoServico] || data.tipoServico;

  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <p style="font-size: 14px; color: #64748b; margin-bottom: 10px;">PROPOSTA COMERCIAL</p>
      <h2 style="font-size: 28px; margin: 0; color: #1a365d;">${data.titulo}</h2>
      ${data.numero ? `<p style="font-size: 12px; color: #64748b; margin-top: 10px;">Nº ${data.numero}</p>` : ''}
    </div>

    <div class="highlight-box">
      <h3 style="margin-top: 0; color: #1a365d;">Informações do Cliente</h3>
      <table style="width: 100%; border: none;">
        <tr style="background: transparent;">
          <td style="border: none; padding: 5px 0;"><strong>Cliente:</strong></td>
          <td style="border: none; padding: 5px 0;">${data.clienteNome || 'A definir'}</td>
        </tr>
        <tr style="background: transparent;">
          <td style="border: none; padding: 5px 0;"><strong>Empresa:</strong></td>
          <td style="border: none; padding: 5px 0;">${data.clienteEmpresa || 'A definir'}</td>
        </tr>
        <tr style="background: transparent;">
          <td style="border: none; padding: 5px 0;"><strong>Tipo de Serviço:</strong></td>
          <td style="border: none; padding: 5px 0;">${tipoServicoLabel}</td>
        </tr>
      </table>
    </div>

    ${data.descricao ? `
      <h2>Resumo Executivo</h2>
      <p>${data.descricao}</p>
    ` : ''}

    ${data.escopo && data.escopo.length > 0 ? `
      <h2>Escopo do Projeto</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 30%;">Item</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          ${data.escopo.map(item => `
            <tr>
              <td><strong>${item.titulo}</strong></td>
              <td>${item.descricao}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}

    ${data.entregaveis && data.entregaveis.length > 0 ? `
      <h2>Entregáveis</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 30%;">Entregável</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          ${data.entregaveis.map(item => `
            <tr>
              <td><strong>${item.titulo}</strong></td>
              <td>${item.descricao}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}

    ${data.cronograma && data.cronograma.length > 0 ? `
      <h2>Cronograma</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Fase</th>
            <th style="width: 20%;">Duração</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          ${data.cronograma.map(item => `
            <tr>
              <td><strong>${item.fase}</strong></td>
              <td>${item.duracao}</td>
              <td>${item.descricao}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}

    <h2>Investimento</h2>
    <table>
      <tr>
        <td style="width: 50%;"><strong>Valor Total</strong></td>
        <td style="text-align: right;">${formatCurrency(data.valorTotal)}</td>
      </tr>
      ${data.descontoPercentual && data.descontoPercentual > 0 ? `
        <tr>
          <td><strong>Desconto</strong></td>
          <td style="text-align: right; color: #16a34a;">${data.descontoPercentual}%</td>
        </tr>
      ` : ''}
      <tr style="background: #1a365d; color: white;">
        <td><strong>VALOR FINAL</strong></td>
        <td style="text-align: right; font-size: 18px; font-weight: bold;">${formatCurrency(data.valorFinal || data.valorTotal)}</td>
      </tr>
    </table>

    <div style="display: flex; gap: 40px; margin-top: 30px;">
      <div style="flex: 1;">
        <div class="highlight-box">
          <h4 style="margin: 0 0 10px 0;">Prazo de Execução</h4>
          <p style="font-size: 24px; font-weight: bold; margin: 0; color: #1a365d;">
            ${data.prazoExecucaoDias ? `${data.prazoExecucaoDias} dias` : 'A definir'}
          </p>
        </div>
      </div>
      <div style="flex: 1;">
        <div class="highlight-box">
          <h4 style="margin: 0 0 10px 0;">Validade da Proposta</h4>
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #1a365d;">
            ${formatDate(data.validadeProposta)}
          </p>
        </div>
      </div>
    </div>

    ${data.termosCondicoes ? `
      <h2>Termos e Condições</h2>
      <div style="font-size: 11px; color: #64748b; line-height: 1.6;">
        ${data.termosCondicoes}
      </div>
    ` : `
      <h2>Termos e Condições</h2>
      <div style="font-size: 11px; color: #64748b; line-height: 1.6;">
        <p><strong>Forma de Pagamento:</strong> A ser acordada entre as partes.</p>
        <p><strong>Início do Projeto:</strong> Mediante aprovação formal desta proposta.</p>
        <p><strong>Confidencialidade:</strong> Todas as informações compartilhadas durante o projeto serão tratadas com total confidencialidade.</p>
        <p><strong>Propriedade Intelectual:</strong> Os entregáveis desenvolvidos serão de propriedade do cliente após a conclusão e pagamento integral.</p>
      </div>
    `}

    <div class="signature-area">
      <div class="signature-box">
        <div class="signature-line">
          <strong>Vixio</strong><br>
          Representante Comercial
        </div>
      </div>
      <div class="signature-box">
        <div class="signature-line">
          <strong>${data.clienteEmpresa || 'Cliente'}</strong><br>
          Representante Legal
        </div>
      </div>
    </div>

    <div class="date-location">
      <p>Documento gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>
  `;

  printDocument({
    title: `Proposta Comercial - ${data.titulo}`,
    content,
    companyName: 'Vixio',
    companyInfo: {
      website: 'www.vixio.com.br',
      email: 'contato@vixio.com.br',
      phone: '(11) 99999-9999'
    },
    showHeader: true,
    showFooter: true,
    headerColor: '#1a365d'
  });
}
