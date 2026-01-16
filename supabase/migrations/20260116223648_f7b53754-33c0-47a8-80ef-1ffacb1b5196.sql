-- Seed default professional document templates

-- Orçamento Padrão
INSERT INTO public.document_templates (nome, descricao, category_id, conteudo, is_active)
SELECT 
  'Orçamento Padrão',
  'Modelo profissional de orçamento com itens, valores e condições comerciais',
  dc.id,
  '<div class="highlight-box">
  <strong>ORÇAMENTO Nº {{numero_orcamento}}</strong><br>
  Data: {{data_emissao}} | Validade: {{validade_orcamento}}
</div>

<h2>Dados do Cliente</h2>
<table>
  <tr>
    <th width="30%">Cliente</th>
    <td>{{nome_cliente}}</td>
  </tr>
  <tr>
    <th>Empresa</th>
    <td>{{empresa_cliente}}</td>
  </tr>
  <tr>
    <th>CNPJ/CPF</th>
    <td>{{documento_cliente}}</td>
  </tr>
  <tr>
    <th>E-mail</th>
    <td>{{email_cliente}}</td>
  </tr>
  <tr>
    <th>Telefone</th>
    <td>{{telefone_cliente}}</td>
  </tr>
</table>

<h2>Serviços e Valores</h2>
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Descrição</th>
      <th>Qtd</th>
      <th>Valor Unit.</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {{itens_orcamento}}
  </tbody>
</table>

<div style="text-align: right;">
  <div class="total-box">
    <div class="total-label">VALOR TOTAL</div>
    <div class="total-value">R$ {{valor_total}}</div>
  </div>
</div>

<h2>Condições Comerciais</h2>
<ul>
  <li><strong>Forma de Pagamento:</strong> {{forma_pagamento}}</li>
  <li><strong>Prazo de Entrega:</strong> {{prazo_entrega}}</li>
  <li><strong>Validade do Orçamento:</strong> {{validade_orcamento}}</li>
</ul>

<h2>Observações</h2>
<p>{{observacoes}}</p>

<div class="signature-area">
  <div class="signature-box">
    <div class="signature-line">
      Responsável pela Proposta
    </div>
  </div>
  <div class="signature-box">
    <div class="signature-line">
      Aceite do Cliente
    </div>
  </div>
</div>

<p class="date-location">{{cidade}}, {{data_extenso}}</p>',
  true
FROM public.document_categories dc
WHERE dc.nome = 'Orçamentos'
LIMIT 1;

-- Contrato de Prestação de Serviços
INSERT INTO public.document_templates (nome, descricao, category_id, conteudo, is_active)
SELECT 
  'Contrato de Prestação de Serviços',
  'Contrato padrão para prestação de serviços com cláusulas essenciais',
  dc.id,
  '<div class="highlight-box">
  <strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS Nº {{numero_contrato}}</strong>
</div>

<p>Pelo presente instrumento particular, as partes abaixo qualificadas:</p>

<h2>1. Das Partes</h2>

<h3>CONTRATANTE:</h3>
<p>
  <strong>{{nome_contratante}}</strong>, pessoa {{tipo_pessoa_contratante}}, inscrita no {{tipo_documento_contratante}} sob nº {{documento_contratante}}, com sede/residência em {{endereco_contratante}}, neste ato representada por {{representante_contratante}}.
</p>

<h3>CONTRATADA:</h3>
<p>
  <strong>{{nome_contratada}}</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob nº {{cnpj_contratada}}, com sede em {{endereco_contratada}}, neste ato representada por seu representante legal.
</p>

<h2>2. Do Objeto</h2>
<p>{{objeto_contrato}}</p>

<h2>3. Do Prazo</h2>
<p>O presente contrato terá vigência de {{prazo_vigencia}}, iniciando-se em {{data_inicio}} e terminando em {{data_termino}}, podendo ser prorrogado mediante termo aditivo assinado por ambas as partes.</p>

<h2>4. Do Valor e Forma de Pagamento</h2>
<p>Pela execução dos serviços objeto deste contrato, a CONTRATANTE pagará à CONTRATADA o valor de <strong>R$ {{valor_contrato}}</strong> ({{valor_extenso}}), a ser pago da seguinte forma:</p>
<p>{{forma_pagamento}}</p>

<h2>5. Das Obrigações da Contratada</h2>
<ul>
  {{obrigacoes_contratada}}
</ul>

<h2>6. Das Obrigações do Contratante</h2>
<ul>
  {{obrigacoes_contratante}}
</ul>

<h2>7. Da Rescisão</h2>
<p>{{clausula_rescisao}}</p>

<h2>8. Do Foro</h2>
<p>Fica eleito o foro da Comarca de {{cidade_foro}}, Estado de {{estado_foro}}, para dirimir quaisquer dúvidas ou litígios oriundos deste contrato, renunciando as partes a qualquer outro, por mais privilegiado que seja.</p>

<p>E, por estarem assim justas e contratadas, as partes firmam o presente instrumento em 02 (duas) vias de igual teor e forma, na presença de 02 (duas) testemunhas.</p>

<p class="date-location">{{cidade}}, {{data_extenso}}</p>

<div class="signature-area">
  <div class="signature-box">
    <div class="signature-line">
      <strong>CONTRATANTE</strong><br>
      {{nome_contratante}}
    </div>
  </div>
  <div class="signature-box">
    <div class="signature-line">
      <strong>CONTRATADA</strong><br>
      {{nome_contratada}}
    </div>
  </div>
</div>

<div class="signature-area" style="margin-top: 40px;">
  <div class="signature-box">
    <div class="signature-line">
      Testemunha 1<br>
      CPF: _______________
    </div>
  </div>
  <div class="signature-box">
    <div class="signature-line">
      Testemunha 2<br>
      CPF: _______________
    </div>
  </div>
</div>',
  true
FROM public.document_categories dc
WHERE dc.nome = 'Contratos'
LIMIT 1;

-- Relatório de Projeto
INSERT INTO public.document_templates (nome, descricao, category_id, conteudo, is_active)
SELECT 
  'Relatório de Projeto',
  'Modelo de relatório de acompanhamento de projeto com métricas e status',
  dc.id,
  '<div class="highlight-box">
  <strong>RELATÓRIO DE PROJETO</strong><br>
  Período: {{periodo_relatorio}} | Status: {{status_projeto}}
</div>

<h2>1. Informações do Projeto</h2>
<table>
  <tr>
    <th width="30%">Nome do Projeto</th>
    <td>{{nome_projeto}}</td>
  </tr>
  <tr>
    <th>Cliente</th>
    <td>{{nome_cliente}}</td>
  </tr>
  <tr>
    <th>Responsável</th>
    <td>{{responsavel_projeto}}</td>
  </tr>
  <tr>
    <th>Data de Início</th>
    <td>{{data_inicio}}</td>
  </tr>
  <tr>
    <th>Previsão de Término</th>
    <td>{{data_previsao_termino}}</td>
  </tr>
</table>

<h2>2. Resumo Executivo</h2>
<p>{{resumo_executivo}}</p>

<h2>3. Progresso Atual</h2>
<div class="highlight-box">
  <strong>Percentual de Conclusão: {{percentual_conclusao}}%</strong>
</div>

<h3>3.1. Entregas Realizadas</h3>
<ul>
  {{entregas_realizadas}}
</ul>

<h3>3.2. Próximas Entregas</h3>
<ul>
  {{proximas_entregas}}
</ul>

<h2>4. Indicadores de Performance</h2>
<table>
  <thead>
    <tr>
      <th>Indicador</th>
      <th>Meta</th>
      <th>Realizado</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {{indicadores_performance}}
  </tbody>
</table>

<h2>5. Riscos e Impedimentos</h2>
<table>
  <thead>
    <tr>
      <th>Descrição</th>
      <th>Impacto</th>
      <th>Probabilidade</th>
      <th>Mitigação</th>
    </tr>
  </thead>
  <tbody>
    {{riscos_impedimentos}}
  </tbody>
</table>

<h2>6. Observações e Recomendações</h2>
<p>{{observacoes}}</p>

<h2>7. Próximos Passos</h2>
<ul>
  {{proximos_passos}}
</ul>

<p class="date-location">Relatório elaborado em {{data_elaboracao}} por {{elaborado_por}}</p>',
  true
FROM public.document_categories dc
WHERE dc.nome = 'Relatórios'
LIMIT 1;

-- Proposta Comercial
INSERT INTO public.document_templates (nome, descricao, category_id, conteudo, is_active)
SELECT 
  'Proposta Comercial',
  'Proposta comercial completa com escopo, metodologia e investimento',
  dc.id,
  '<div class="highlight-box">
  <strong>PROPOSTA COMERCIAL</strong><br>
  Ref: {{referencia_proposta}} | Data: {{data_proposta}}
</div>

<h2>Prezado(a) {{nome_cliente}},</h2>

<p>Agradecemos a oportunidade de apresentar nossa proposta comercial para {{objeto_proposta}}. Segue abaixo nossa proposta detalhada:</p>

<h2>1. Sobre Nós</h2>
<p>{{sobre_empresa}}</p>

<h2>2. Entendimento da Necessidade</h2>
<p>{{entendimento_necessidade}}</p>

<h2>3. Solução Proposta</h2>
<p>{{solucao_proposta}}</p>

<h3>3.1. Escopo do Projeto</h3>
<ul>
  {{escopo_projeto}}
</ul>

<h3>3.2. Metodologia</h3>
<p>{{metodologia}}</p>

<h3>3.3. Cronograma</h3>
<table>
  <thead>
    <tr>
      <th>Fase</th>
      <th>Atividades</th>
      <th>Duração</th>
    </tr>
  </thead>
  <tbody>
    {{cronograma}}
  </tbody>
</table>

<h2>4. Investimento</h2>
<table>
  <thead>
    <tr>
      <th>Descrição</th>
      <th>Valor</th>
    </tr>
  </thead>
  <tbody>
    {{itens_investimento}}
  </tbody>
</table>

<div style="text-align: right;">
  <div class="total-box">
    <div class="total-label">INVESTIMENTO TOTAL</div>
    <div class="total-value">R$ {{valor_total}}</div>
  </div>
</div>

<h2>5. Condições Comerciais</h2>
<ul>
  <li><strong>Forma de Pagamento:</strong> {{forma_pagamento}}</li>
  <li><strong>Prazo de Execução:</strong> {{prazo_execucao}}</li>
  <li><strong>Validade da Proposta:</strong> {{validade_proposta}}</li>
</ul>

<h2>6. Diferenciais</h2>
<ul>
  {{diferenciais}}
</ul>

<h2>7. Próximos Passos</h2>
<p>{{proximos_passos}}</p>

<p>Colocamo-nos à disposição para esclarecer quaisquer dúvidas e estamos ansiosos para colaborar com o sucesso do seu projeto.</p>

<p>Atenciosamente,</p>

<div class="signature-area">
  <div class="signature-box">
    <div class="signature-line">
      {{nome_responsavel}}<br>
      {{cargo_responsavel}}<br>
      {{contato_responsavel}}
    </div>
  </div>
</div>

<p class="date-location">{{cidade}}, {{data_extenso}}</p>',
  true
FROM public.document_categories dc
WHERE dc.nome = 'Propostas'
LIMIT 1;

-- Insert template fields for Orçamento Padrão
INSERT INTO public.template_fields (template_id, nome, label, tipo, obrigatorio, ordem, grupo, fonte_dados, campo_fonte, placeholder)
SELECT 
  dt.id,
  field.nome,
  field.label,
  field.tipo,
  field.obrigatorio,
  field.ordem,
  field.grupo,
  field.fonte_dados,
  field.campo_fonte,
  field.placeholder
FROM public.document_templates dt
CROSS JOIN (
  VALUES 
    ('numero_orcamento', 'Número do Orçamento', 'text', true, 1, 'Identificação', 'manual', NULL::text, 'Ex: ORC-2024-001'),
    ('data_emissao', 'Data de Emissão', 'date', true, 2, 'Identificação', 'manual', NULL, NULL),
    ('validade_orcamento', 'Validade', 'text', true, 3, 'Identificação', 'manual', NULL, 'Ex: 15 dias'),
    ('nome_cliente', 'Nome do Cliente', 'text', true, 4, 'Cliente', 'lead', 'nome', NULL),
    ('empresa_cliente', 'Empresa', 'text', false, 5, 'Cliente', 'lead', 'empresa', NULL),
    ('documento_cliente', 'CNPJ/CPF', 'text', false, 6, 'Cliente', 'manual', NULL, NULL),
    ('email_cliente', 'E-mail', 'text', false, 7, 'Cliente', 'lead', 'email', NULL),
    ('telefone_cliente', 'Telefone', 'text', false, 8, 'Cliente', 'lead', 'telefone', NULL),
    ('itens_orcamento', 'Itens do Orçamento', 'textarea', true, 9, 'Itens', 'manual', NULL, 'Adicione os itens em formato de tabela HTML'),
    ('valor_total', 'Valor Total', 'currency', true, 10, 'Valores', 'lead', 'valor_estimado', NULL),
    ('forma_pagamento', 'Forma de Pagamento', 'text', true, 11, 'Condições', 'manual', NULL, 'Ex: 50% entrada + 50% na entrega'),
    ('prazo_entrega', 'Prazo de Entrega', 'text', true, 12, 'Condições', 'manual', NULL, 'Ex: 30 dias úteis'),
    ('observacoes', 'Observações', 'textarea', false, 13, 'Adicional', 'manual', NULL, NULL),
    ('cidade', 'Cidade', 'text', true, 14, 'Local', 'manual', NULL, 'Ex: São Paulo'),
    ('data_extenso', 'Data por Extenso', 'text', true, 15, 'Local', 'manual', NULL, 'Ex: 16 de janeiro de 2024')
) AS field(nome, label, tipo, obrigatorio, ordem, grupo, fonte_dados, campo_fonte, placeholder)
WHERE dt.nome = 'Orçamento Padrão';

-- Insert template fields for Contrato
INSERT INTO public.template_fields (template_id, nome, label, tipo, obrigatorio, ordem, grupo, placeholder)
SELECT 
  dt.id,
  field.nome,
  field.label,
  field.tipo,
  field.obrigatorio,
  field.ordem,
  field.grupo,
  field.placeholder
FROM public.document_templates dt
CROSS JOIN (
  VALUES 
    ('numero_contrato', 'Número do Contrato', 'text', true, 1, 'Identificação', 'Ex: CTR-2024-001'),
    ('nome_contratante', 'Nome do Contratante', 'text', true, 2, 'Contratante', NULL::text),
    ('tipo_pessoa_contratante', 'Tipo de Pessoa', 'select', true, 3, 'Contratante', NULL),
    ('tipo_documento_contratante', 'Tipo de Documento', 'select', true, 4, 'Contratante', NULL),
    ('documento_contratante', 'Documento', 'text', true, 5, 'Contratante', 'CPF ou CNPJ'),
    ('endereco_contratante', 'Endereço', 'text', true, 6, 'Contratante', NULL),
    ('representante_contratante', 'Representante Legal', 'text', false, 7, 'Contratante', NULL),
    ('nome_contratada', 'Nome da Contratada', 'text', true, 8, 'Contratada', NULL),
    ('cnpj_contratada', 'CNPJ da Contratada', 'text', true, 9, 'Contratada', NULL),
    ('endereco_contratada', 'Endereço da Contratada', 'text', true, 10, 'Contratada', NULL),
    ('objeto_contrato', 'Objeto do Contrato', 'textarea', true, 11, 'Objeto', NULL),
    ('prazo_vigencia', 'Prazo de Vigência', 'text', true, 12, 'Prazo', 'Ex: 12 meses'),
    ('data_inicio', 'Data de Início', 'date', true, 13, 'Prazo', NULL),
    ('data_termino', 'Data de Término', 'date', true, 14, 'Prazo', NULL),
    ('valor_contrato', 'Valor do Contrato', 'currency', true, 15, 'Valor', NULL),
    ('valor_extenso', 'Valor por Extenso', 'text', true, 16, 'Valor', NULL),
    ('forma_pagamento', 'Forma de Pagamento', 'textarea', true, 17, 'Pagamento', NULL),
    ('obrigacoes_contratada', 'Obrigações da Contratada', 'textarea', true, 18, 'Obrigações', 'Liste as obrigações'),
    ('obrigacoes_contratante', 'Obrigações do Contratante', 'textarea', true, 19, 'Obrigações', 'Liste as obrigações'),
    ('clausula_rescisao', 'Cláusula de Rescisão', 'textarea', true, 20, 'Rescisão', NULL),
    ('cidade_foro', 'Cidade do Foro', 'text', true, 21, 'Foro', NULL),
    ('estado_foro', 'Estado do Foro', 'text', true, 22, 'Foro', NULL),
    ('cidade', 'Cidade', 'text', true, 23, 'Local', NULL),
    ('data_extenso', 'Data por Extenso', 'text', true, 24, 'Local', NULL)
) AS field(nome, label, tipo, obrigatorio, ordem, grupo, placeholder)
WHERE dt.nome = 'Contrato de Prestação de Serviços';

-- Insert template fields for Relatório de Projeto
INSERT INTO public.template_fields (template_id, nome, label, tipo, obrigatorio, ordem, grupo, placeholder)
SELECT 
  dt.id,
  field.nome,
  field.label,
  field.tipo,
  field.obrigatorio,
  field.ordem,
  field.grupo,
  field.placeholder
FROM public.document_templates dt
CROSS JOIN (
  VALUES 
    ('periodo_relatorio', 'Período do Relatório', 'text', true, 1, 'Identificação', 'Ex: Janeiro/2024'),
    ('status_projeto', 'Status do Projeto', 'select', true, 2, 'Identificação', NULL::text),
    ('nome_projeto', 'Nome do Projeto', 'text', true, 3, 'Projeto', NULL),
    ('nome_cliente', 'Cliente', 'text', true, 4, 'Projeto', NULL),
    ('responsavel_projeto', 'Responsável', 'text', true, 5, 'Projeto', NULL),
    ('data_inicio', 'Data de Início', 'date', true, 6, 'Projeto', NULL),
    ('data_previsao_termino', 'Previsão de Término', 'date', true, 7, 'Projeto', NULL),
    ('resumo_executivo', 'Resumo Executivo', 'textarea', true, 8, 'Resumo', NULL),
    ('percentual_conclusao', 'Percentual de Conclusão', 'number', true, 9, 'Progresso', 'Ex: 75'),
    ('entregas_realizadas', 'Entregas Realizadas', 'textarea', true, 10, 'Entregas', 'Liste as entregas'),
    ('proximas_entregas', 'Próximas Entregas', 'textarea', true, 11, 'Entregas', 'Liste as próximas entregas'),
    ('indicadores_performance', 'Indicadores de Performance', 'textarea', false, 12, 'Indicadores', 'Formato tabela HTML'),
    ('riscos_impedimentos', 'Riscos e Impedimentos', 'textarea', false, 13, 'Riscos', 'Formato tabela HTML'),
    ('observacoes', 'Observações', 'textarea', false, 14, 'Observações', NULL),
    ('proximos_passos', 'Próximos Passos', 'textarea', true, 15, 'Próximos Passos', 'Liste os próximos passos'),
    ('data_elaboracao', 'Data de Elaboração', 'date', true, 16, 'Assinatura', NULL),
    ('elaborado_por', 'Elaborado Por', 'text', true, 17, 'Assinatura', NULL)
) AS field(nome, label, tipo, obrigatorio, ordem, grupo, placeholder)
WHERE dt.nome = 'Relatório de Projeto';