import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan las variables de entorno de Supabase. Por favor, configura el archivo .env');
}

// Asegurarse de que la URL termine con /
const formattedUrl = supabaseUrl?.endsWith('/') ? supabaseUrl : `${supabaseUrl}/`;

export const supabase = createClient(formattedUrl, supabaseKey); 