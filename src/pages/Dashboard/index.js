import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AlertSnackbar from '../../components/Alerts/AlertSnackbar';
import {
  AccessTime,
  Business,
  Visibility,
  VisibilityOffOutlined,
  TrendingUp,
  TrendingDownOutlined,
  ScheduleOutlined,
} from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Material UI - representa o ícone de start
import { getDashboardData } from '../../api/backend/Dashboard/GetDashboardData';

const dataCards = [
  { title: 'Vagas Publicadas', dataKey: 'vagas_publicadas', icon: Visibility },
  { title: 'Vagas Confidenciais', dataKey: 'vagas_confidenciais', icon: VisibilityOffOutlined },
  { title: 'Total Empresas', dataKey: 'total_empresas', icon: Business },
  { title: 'Última Publicação', dataKey: 'horas_entre_primeira_e_ultima_publicacao', icon: AccessTime },
  { title: 'Vagas Confidenciais', dataKey: 'taxa_vagas_confidenciais', icon: TrendingDownOutlined },
  { title: 'Habilidades por Vaga', dataKey: 'media_habilidades_por_vaga', icon: TrendingUp },
];

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

  // Função para converter os dados para inteiros
  const parseDataToInt = (data) => {
    return parseInt(data, 10) || 0; // Se a conversão falhar, retorna 0
  };

  return (
    <Fragment>
      <Box textAlign="left" mb={4}>
        <Grid container spacing={2} alignItems="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p
              style={{
                display: 'inline-block',
                fontWeight: '800',
                fontSize: '30px',
                textAlign: 'center',
                marginTop: '10px',
                fontFamily: '"Open Sans", sans-serif',
                marginBottom: '10px',
                color: 'rgb(0, 0, 0, 55%)',
              }}
            >
              DASHBOARD
            </p>
          </div>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {dataCards.map((card, index) => (
            <Grid item key={index} xs={3}>
              <Typography variant="subtitle1" color="text.secondary">
                {card.title}
              </Typography>              <Card
                sx={{
                  borderRadius: '2px',
                  backgroundColor: 'rgb(255, 255, 255)',
                  padding: '10px',
                  height: '120px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'right',
                }}
              >
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Parte 1: Ícone à esquerda */}
                    <div style={{
                      width: '70px',  // Ajuste o tamanho do círculo conforme necessário
                      height: '70px',  // Ajuste o tamanho do círculo conforme necessário
                      borderRadius: '50%',  // Adiciona borda circular
                      backgroundColor: 'orange',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {React.createElement(card.icon, { style: { fontSize: '40px', color: '#fff' } })}
                    </div>

                    {/* Parte 2: Número alinhado à direita */}
                    <div style={{ marginLeft: 'auto' }}>
                      <Typography variant="h4" sx={{ marginLeft: '10px', fontWeight: 'bold', color: "rgb(0 0 0 / 50%)" }} color="text.primary">
                        {parseDataToInt(dataFromAPI ? dataFromAPI[card.dataKey] : '-')}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
