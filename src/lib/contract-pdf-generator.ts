// Contract PDF Generator for approved proposals with digital signature fields
import { printDocument } from './pdf-generator';

export interface ContractData {
  numero: string | null;
  titulo: string;
  tipoServico: string;
  clienteNome: string | null;
  clienteEmpresa: string | null;
  clienteDocumento?: string | null;
  valorFinal: number | null;
  prazoExecucaoDias: number | null;
  dataAprovacao?: string | null;
  escopo: { titulo: string; descricao: string }[];
  entregaveis: { titulo: string; descricao: string }[];
  cronograma: { fase: string; duracao: string; descricao: string }[];
  termosCondicoes: string | null;
  formaPagamento?: string | null;
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

export function generateContractPDF(data: ContractData): void {
  const formatCurrency = (value: number | null) => {
    if (!value) return 'A definir';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const tipoServicoLabel = serviceTypeLabels[data.tipoServico] || data.tipoServico;
  const dataAtual = new Date().toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  const content = `
    <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1a365d; padding-bottom: 20px;">
      <h1 style="font-size: 24px; margin: 0; color: #1a365d; text-transform: uppercase; letter-spacing: 2px;">
        Contrato de Prestação de Serviços
      </h1>
      ${data.numero ? `<p style="font-size: 12px; color: #64748b; margin-top: 10px;">Contrato Nº ${data.numero}</p>` : ''}
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        1. DAS PARTES CONTRATANTES
      </h2>
      
      <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0 0 10px 0;"><strong>CONTRATADA:</strong></p>
        <p style="margin: 0; padding-left: 20px;">
          <strong>VIXIO CONSULTORIA E TECNOLOGIA LTDA</strong><br>
          CNPJ: XX.XXX.XXX/0001-XX<br>
          Endereço: São Paulo, SP<br>
          E-mail: contato@vixio.com.br
        </p>
      </div>

      <div style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0 0 10px 0;"><strong>CONTRATANTE:</strong></p>
        <p style="margin: 0; padding-left: 20px;">
          <strong>${data.clienteEmpresa || 'Empresa do Cliente'}</strong><br>
          ${data.clienteDocumento ? `CNPJ/CPF: ${data.clienteDocumento}<br>` : ''}
          Representado por: ${data.clienteNome || 'Nome do Representante'}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        2. DO OBJETO
      </h2>
      <p style="text-align: justify; line-height: 1.8;">
        O presente contrato tem por objeto a prestação de serviços de <strong>${tipoServicoLabel}</strong>, 
        conforme especificações detalhadas abaixo, referente ao projeto: <strong>"${data.titulo}"</strong>.
      </p>
    </div>

    ${data.escopo && data.escopo.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
          3. DO ESCOPO DOS SERVIÇOS
        </h2>
        <p style="margin-bottom: 15px;">A CONTRATADA se compromete a executar os seguintes serviços:</p>
        <table style="width: 100%;">
          <thead>
            <tr style="background: #1a365d; color: white;">
              <th style="padding: 12px; text-align: left;">Item</th>
              <th style="padding: 12px; text-align: left;">Descrição</th>
            </tr>
          </thead>
          <tbody>
            ${data.escopo.map((item, index) => `
              <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'};">
                <td style="padding: 12px; font-weight: bold;">${item.titulo}</td>
                <td style="padding: 12px;">${item.descricao}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    ${data.entregaveis && data.entregaveis.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
          4. DOS ENTREGÁVEIS
        </h2>
        <p style="margin-bottom: 15px;">Ao término do projeto, serão entregues os seguintes produtos:</p>
        <table style="width: 100%;">
          <thead>
            <tr style="background: #1a365d; color: white;">
              <th style="padding: 12px; text-align: left;">Entregável</th>
              <th style="padding: 12px; text-align: left;">Descrição</th>
            </tr>
          </thead>
          <tbody>
            ${data.entregaveis.map((item, index) => `
              <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'};">
                <td style="padding: 12px; font-weight: bold;">${item.titulo}</td>
                <td style="padding: 12px;">${item.descricao}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    ${data.cronograma && data.cronograma.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
          5. DO CRONOGRAMA
        </h2>
        <table style="width: 100%;">
          <thead>
            <tr style="background: #1a365d; color: white;">
              <th style="padding: 12px; text-align: left;">Fase</th>
              <th style="padding: 12px; text-align: left;">Duração</th>
              <th style="padding: 12px; text-align: left;">Descrição</th>
            </tr>
          </thead>
          <tbody>
            ${data.cronograma.map((item, index) => `
              <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'};">
                <td style="padding: 12px; font-weight: bold;">${item.fase}</td>
                <td style="padding: 12px;">${item.duracao}</td>
                <td style="padding: 12px;">${item.descricao}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        6. DO PRAZO
      </h2>
      <p style="text-align: justify; line-height: 1.8;">
        O prazo para execução dos serviços é de <strong>${data.prazoExecucaoDias || 'XX'} (${data.prazoExecucaoDias ? numberToWords(data.prazoExecucaoDias) : 'XX'}) dias</strong>, 
        contados a partir da data de assinatura deste contrato.
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        7. DO VALOR E FORMA DE PAGAMENTO
      </h2>
      <div style="background: linear-gradient(135deg, #1a365d, #2d4a7c); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 15px 0;">
        <p style="margin: 0 0 5px 0; font-size: 14px; opacity: 0.8;">VALOR TOTAL DO CONTRATO</p>
        <p style="margin: 0; font-size: 32px; font-weight: bold;">${formatCurrency(data.valorFinal)}</p>
      </div>
      ${data.formaPagamento ? `
        <p style="margin-top: 15px; text-align: justify; line-height: 1.8;">
          <strong>Forma de Pagamento:</strong> ${data.formaPagamento}
        </p>
      ` : `
        <p style="margin-top: 15px; text-align: justify; line-height: 1.8;">
          <strong>Forma de Pagamento:</strong> O pagamento será realizado conforme acordado entre as partes, 
          mediante emissão de nota fiscal pela CONTRATADA.
        </p>
      `}
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        8. DAS OBRIGAÇÕES DAS PARTES
      </h2>
      
      <p style="margin: 15px 0 10px 0;"><strong>8.1 Obrigações da CONTRATADA:</strong></p>
      <ul style="margin: 0; padding-left: 30px; line-height: 1.8;">
        <li>Executar os serviços conforme especificações acordadas;</li>
        <li>Manter sigilo sobre as informações confidenciais do CONTRATANTE;</li>
        <li>Entregar os produtos nos prazos estabelecidos;</li>
        <li>Prestar suporte técnico durante a vigência do contrato.</li>
      </ul>

      <p style="margin: 15px 0 10px 0;"><strong>8.2 Obrigações do CONTRATANTE:</strong></p>
      <ul style="margin: 0; padding-left: 30px; line-height: 1.8;">
        <li>Fornecer as informações necessárias para execução do projeto;</li>
        <li>Efetuar os pagamentos nas datas acordadas;</li>
        <li>Designar responsáveis para acompanhamento do projeto;</li>
        <li>Aprovar os entregáveis dentro dos prazos estabelecidos.</li>
      </ul>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        9. DA CONFIDENCIALIDADE
      </h2>
      <p style="text-align: justify; line-height: 1.8;">
        As partes se comprometem a manter sigilo absoluto sobre todas as informações confidenciais 
        trocadas durante a vigência deste contrato, bem como após seu término, pelo prazo de 5 (cinco) anos.
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        10. DA PROPRIEDADE INTELECTUAL
      </h2>
      <p style="text-align: justify; line-height: 1.8;">
        Todos os entregáveis desenvolvidos durante a execução deste contrato serão de propriedade 
        exclusiva do CONTRATANTE, após a conclusão dos serviços e quitação integral do valor contratado.
      </p>
    </div>

    ${data.termosCondicoes ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
          11. TERMOS ADICIONAIS
        </h2>
        <p style="text-align: justify; line-height: 1.8;">${data.termosCondicoes}</p>
      </div>
    ` : ''}

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a365d; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        ${data.termosCondicoes ? '12' : '11'}. DO FORO
      </h2>
      <p style="text-align: justify; line-height: 1.8;">
        Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer questões oriundas do presente contrato, 
        com renúncia expressa a qualquer outro, por mais privilegiado que seja.
      </p>
    </div>

    <div style="margin: 40px 0; text-align: center; font-style: italic;">
      <p>E, por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma.</p>
      <p style="margin-top: 20px;">São Paulo, ${dataAtual}</p>
    </div>

    <div style="display: flex; gap: 40px; margin-top: 60px; page-break-inside: avoid;">
      <div style="flex: 1; text-align: center;">
        <div style="border-top: 2px solid #1a365d; margin: 0 20px; padding-top: 15px;">
          <p style="margin: 0; font-weight: bold; color: #1a365d;">VIXIO CONSULTORIA E TECNOLOGIA</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">CONTRATADA</p>
        </div>
        <div style="height: 80px; margin: 20px 0; border: 2px dashed #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <span style="color: #94a3b8; font-size: 12px;">Assinatura Digital</span>
        </div>
      </div>
      <div style="flex: 1; text-align: center;">
        <div style="border-top: 2px solid #1a365d; margin: 0 20px; padding-top: 15px;">
          <p style="margin: 0; font-weight: bold; color: #1a365d;">${data.clienteEmpresa || 'EMPRESA CONTRATANTE'}</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">CONTRATANTE</p>
        </div>
        <div style="height: 80px; margin: 20px 0; border: 2px dashed #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <span style="color: #94a3b8; font-size: 12px;">Assinatura Digital</span>
        </div>
      </div>
    </div>

    <div style="margin-top: 40px; padding: 15px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; font-size: 11px; color: #92400e;">
      <p style="margin: 0;"><strong>⚠️ INSTRUMENTO PARTICULAR COM FORÇA DE CONTRATO</strong></p>
      <p style="margin: 5px 0 0 0;">
        Este documento possui validade jurídica conforme Art. 104 do Código Civil Brasileiro. 
        A assinatura digital possui mesma validade de assinatura manuscrita conforme MP 2.200-2/2001.
      </p>
    </div>
  `;

  printDocument({
    title: `Contrato - ${data.titulo}`,
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

function numberToWords(num: number): string {
  const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  if (num === 0) return 'zero';
  if (num === 100) return 'cem';

  let result = '';

  if (num >= 100) {
    result += hundreds[Math.floor(num / 100)];
    num %= 100;
    if (num > 0) result += ' e ';
  }

  if (num >= 20) {
    result += tens[Math.floor(num / 10)];
    num %= 10;
    if (num > 0) result += ' e ';
  } else if (num >= 10) {
    result += teens[num - 10];
    return result;
  }

  if (num > 0) {
    result += units[num];
  }

  return result;
}
