import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

const Container = styled.div`
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  padding: 20px;
  background-color: #ffe6e6;
  border-radius: 4px;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
`;

const ExpedientesList = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpedientes();
  }, []);

  const fetchExpedientes = async () => {
    try {
      setError(null);
      console.log('Intentando conectar a Supabase...');
      console.log('URL:', process.env.REACT_APP_SUPABASE_URL);
      
      const { data, error: supabaseError } = await supabase
        .from('expedientes')
        .select('*');
      
      if (supabaseError) {
        console.error('Error de Supabase:', supabaseError);
        throw supabaseError;
      }
      
      console.log('Datos recibidos:', data);
      setExpedientes(data || []);
    } catch (err) {
      console.error('Error detallado:', err);
      setError(`Error al cargar los expedientes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Container>Cargando expedientes...</Container>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <h2>Lista de Expedientes</h2>
      {expedientes.length === 0 ? (
        <p>No hay expedientes disponibles.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo de Resolución</th>
              <th>Fecha de Procesamiento</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.map((expediente) => (
              <tr key={expediente.id || expediente.codigo}>
                <td>{expediente.codigo}</td>
                <td>{expediente.tipo_resolucion}</td>
                <td>{new Date(expediente.fecha_procesamiento).toLocaleDateString()}</td>
                <td>
                  {expediente.url_pdf && (
                    <a href={expediente.url_pdf} target="_blank" rel="noopener noreferrer">
                      Ver PDF
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ExpedientesList; 