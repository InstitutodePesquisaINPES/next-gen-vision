// PDF Generation utility using browser print
export interface PDFGeneratorOptions {
  title: string;
  content: string;
  logoUrl?: string;
  companyName?: string;
  companyInfo?: {
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    cnpj?: string;
  };
  showHeader?: boolean;
  showFooter?: boolean;
  headerColor?: string;
}

export function generatePDFContent(options: PDFGeneratorOptions): string {
  const {
    title,
    content,
    logoUrl,
    companyName = "Vixio",
    companyInfo = {},
    showHeader = true,
    showFooter = true,
    headerColor = "#1a365d",
  } = options;

  const headerHtml = showHeader
    ? `
    <div class="header" style="background: ${headerColor}; color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
      <div style="display: flex; align-items: center; gap: 15px;">
        ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="height: 50px; object-fit: contain;" />` : ""}
        <div>
          <h1 style="margin: 0; font-size: 24px; font-weight: bold;">${companyName}</h1>
          ${companyInfo.website ? `<p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">${companyInfo.website}</p>` : ""}
        </div>
      </div>
      <div style="text-align: right; font-size: 11px; opacity: 0.9;">
        ${companyInfo.phone ? `<p style="margin: 0;">${companyInfo.phone}</p>` : ""}
        ${companyInfo.email ? `<p style="margin: 3px 0 0 0;">${companyInfo.email}</p>` : ""}
        ${companyInfo.cnpj ? `<p style="margin: 3px 0 0 0;">CNPJ: ${companyInfo.cnpj}</p>` : ""}
      </div>
    </div>
  `
    : "";

  const footerHtml = showFooter
    ? `
    <div class="footer" style="position: fixed; bottom: 0; left: 0; right: 0; background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748b;">
      <div>
        ${companyInfo.address || ""}
      </div>
      <div>
        Documento gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  `
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        @media print {
          @page {
            size: A4;
            margin: 15mm 10mm 25mm 10mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #1e293b;
          margin: 0;
          padding: 0;
          background: white;
        }
        
        .document-content {
          padding: 0 30px 60px 30px;
        }
        
        .document-title {
          font-size: 22px;
          font-weight: bold;
          color: ${headerColor};
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid ${headerColor};
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: ${headerColor};
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        h1 { font-size: 20px; }
        h2 { font-size: 18px; }
        h3 { font-size: 16px; }
        
        p {
          margin: 0.8em 0;
          text-align: justify;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 13px;
        }
        
        th, td {
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          text-align: left;
        }
        
        th {
          background: ${headerColor};
          color: white;
          font-weight: 600;
        }
        
        tr:nth-child(even) {
          background: #f8fafc;
        }
        
        .highlight-box {
          background: #f0f9ff;
          border-left: 4px solid ${headerColor};
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .signature-area {
          margin-top: 60px;
          display: flex;
          justify-content: space-between;
          gap: 40px;
        }
        
        .signature-box {
          flex: 1;
          text-align: center;
        }
        
        .signature-line {
          border-top: 1px solid #1e293b;
          padding-top: 10px;
          margin-top: 60px;
          font-size: 13px;
        }
        
        .total-box {
          background: ${headerColor};
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          display: inline-block;
          margin-top: 20px;
        }
        
        .total-label {
          font-size: 12px;
          opacity: 0.9;
        }
        
        .total-value {
          font-size: 24px;
          font-weight: bold;
        }
        
        ul, ol {
          margin: 1em 0;
          padding-left: 25px;
        }
        
        li {
          margin: 0.4em 0;
        }
        
        .date-location {
          text-align: right;
          margin-top: 40px;
          font-style: italic;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      ${headerHtml}
      
      <div class="document-content">
        <h1 class="document-title">${title}</h1>
        ${content}
      </div>
      
      ${footerHtml}
    </body>
    </html>
  `;
}

export function printDocument(options: PDFGeneratorOptions): void {
  const htmlContent = generatePDFContent(options);
  const printWindow = window.open("", "_blank");
  
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}

export function downloadAsPDF(options: PDFGeneratorOptions): void {
  // For actual PDF download, we use print to PDF functionality
  printDocument(options);
}
