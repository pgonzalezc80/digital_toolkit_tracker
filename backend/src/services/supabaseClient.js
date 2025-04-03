const { createClient } = require('@supabase/supabase-js');

class SupabaseClient {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  async insertExpediente(expedienteData) {
    try {
      const { data, error } = await this.supabase
        .from('expedientes')
        .insert([expedienteData])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error inserting expediente:', error);
      throw error;
    }
  }

  async getExpedientesByType(type) {
    try {
      const { data, error } = await this.supabase
        .from('expedientes')
        .select('*')
        .eq('tipo_resolucion', type);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error getting expedientes of type ${type}:`, error);
      throw error;
    }
  }

  async registerProcessedDocument(documentData) {
    try {
      const { data, error } = await this.supabase
        .from('documentos')
        .insert([documentData])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error registering document:', error);
      throw error;
    }
  }
}

module.exports = new SupabaseClient(); 