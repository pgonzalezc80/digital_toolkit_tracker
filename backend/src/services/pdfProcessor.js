const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const supabaseClient = require('./supabaseClient');

class PdfProcessor {
  constructor() {
    this.processedDir = path.join(__dirname, '../../processed');
  }

  async initialize() {
    if (!fs.existsSync(this.processedDir)) {
      fs.mkdirSync(this.processedDir, { recursive: true });
    }
  }

  async extractTextFromPdf(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error(`Error extracting text from PDF ${filePath}:`, error);
      throw error;
    }
  }

  extractExpedienteCodes(text, type) {
    // Esta función necesitará ser adaptada según el formato exacto de los PDFs
    // Ejemplo básico usando expresiones regulares
    const expedienteRegex = /\b[A-Z]{2}\d{8}\b/g; // Patrón ejemplo: XX12345678
    const matches = text.match(expedienteRegex) || [];
    
    return matches.map(code => ({
      codigo: code,
      tipo_resolucion: type,
      fecha_procesamiento: new Date().toISOString()
    }));
  }

  async processPdf(filePath, type, sourceUrl) {
    await this.initialize();
    
    try {
      // Extraer texto del PDF
      const text = await this.extractTextFromPdf(filePath);
      
      // Extraer códigos de expediente
      const expedientes = this.extractExpedienteCodes(text, type);
      
      // Guardar en Supabase
      if (expedientes.length > 0) {
        for (const expediente of expedientes) {
          await supabaseClient.insertExpediente({
            ...expediente,
            url_pdf: sourceUrl
          });
        }
      }
      
      // Mover archivo a carpeta de procesados
      const fileName = path.basename(filePath);
      const newPath = path.join(this.processedDir, fileName);
      fs.renameSync(filePath, newPath);
      
      return {
        success: true,
        expedientesCount: expedientes.length,
        filePath: newPath
      };
    } catch (error) {
      console.error(`Error processing PDF ${filePath}:`, error);
      return {
        success: false,
        error: error.message,
        filePath
      };
    }
  }
}

module.exports = new PdfProcessor(); 