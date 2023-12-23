import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AlertSnackbar from '../../components/Alerts/AlertSnackbar';
import { getDashboardData } from '../../api/backend/Dashboard/GetDashboardData';

function Dashboard() {
  const [dataFromAPI, setDataFromAPI] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [colorAlert, setColorAlert] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    async function fetchDataWrapper() {
      try {
        const jsonData = await getDashboardData();
        setDataFromAPI(jsonData);

        setMessage('Dados carregados com sucesso.');
        setColorAlert('rgb(0, 170, 255)');
        setSnackbarOpen(true);

        console.log(jsonData);
      } catch (error) {
        console.error('Erro na requisição API:', error);

        setMessage('Algo deu errado. Entre em contato com o suporte.');
        setColorAlert('rgb(255, 0, 59)');
        setSnackbarOpen(true);
      }
    }

    fetchDataWrapper();
  }, []);

  return (
    <Fragment>
      <Box textAlign="left" mb={4}>
        <Grid container spacing={2} alignItems="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                padding: '6px',
                borderRadius: '10px',
                boxShadow: '2px 2px 5px rgba(0, 100, 255, 0.7)',
              }}
            ></div>
            <p
              style={{
                display: 'inline-block',
                fontWeight: 400,
                fontSize: '30px',
                textAlign: 'center',
                marginTop: '10px',
                marginLeft: '20px',
                fontFamily: '"Open Sans", sans-serif',
                marginBottom: '10px',
                color: '#1cb1e5',
              }}
            >
              Dashboard
            </p>
          </div>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vagas_publicadas" fill="#6fa5fc" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vagas_confidenciais" fill="#fcab6f" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_empresas" fill="#fccc6f" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="horas_entre_primeira_e_ultima_publicacao" fill="#8ab7d3" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="taxa_vagas_confidenciais" fill="#d38a8a" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="media_horas_entre_publicacoes" fill="#8ad3ab" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item>
            <Box width={300} height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[dataFromAPI]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax + 10']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="media_habilidades_por_vaga" fill="#b8d984" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          
        </Grid>
      </Box>

      <AlertSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={message}
        colorValue={colorAlert}
        duration={4000}
      />
    </Fragment>
  );
}

export default Dashboard;
