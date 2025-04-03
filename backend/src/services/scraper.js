const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class Scraper {
  constructor() {
    this.baseUrl = 'https://sede.red.gob.es/es/procedimientos/convocatoria-de-ayudas-destinadas-la-digitalizacion-de-empresas-del-segmento-iii';
    this.downloadDir = path.join(__dirname, '../../downloads');
  }

  async initialize() {
    // Crear directorio de descargas si no existe
    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }
  }

  async fetchPage() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  async extractPdfLinks() {
    const html = await this.fetchPage();
    const $ = cheerio.load(html);
    const pdfLinks = [];

    // Buscar enlaces a PDFs - esto necesitará ajustarse según la estructura de la página
    $('a[href$=".pdf"]').each((i, element) => {
      const link = $(element).attr('href');
      const text = $(element).text().trim();
      
      // Clasificar por tipo de resolución
      let type = 'unknown';
      if (text.includes('Concesión')) type = 'concesion';
      else if (text.includes('Desistidos')) type = 'desistidos';
      else if (text.includes('Desistimiento Expreso')) type = 'desistimiento_expreso';
      else if (text.includes('Inadmitidos')) type = 'inadmitidos';
      
      pdfLinks.push({
        url: link.startsWith('http') ? link : `https://sede.red.gob.es${link}`,
        text,
        type
      });
    });

    return pdfLinks;
  }

  async downloadPdf(url, filename) {
    try {
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'stream'
      });

      const filePath = path.join(this.downloadDir, filename);
      const writer = fs.createWriteStream(filePath);
      
      response.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
      });
    } catch (error) {
      console.error(`Error downloading PDF from ${url}:`, error);
      throw error;
    }
  }

  async downloadAllPdfs() {
    await this.initialize();
    const links = await this.extractPdfLinks();
    const results = [];

    for (const link of links) {
      const filename = `${link.type}_${Date.now()}.pdf`;
      try {
        const filePath = await this.downloadPdf(link.url, filename);
        results.push({
          url: link.url,
          type: link.type,
          filePath,
          success: true
        });
      } catch (error) {
        results.push({
          url: link.url,
          type: link.type,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }
}

module.exports = new Scraper(); 