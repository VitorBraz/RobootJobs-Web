export async function getDashboardData() {
  try {
    const response = await fetch('http://localhost:3000/dashboarddata', {
      credentials: 'include', // Inclui os cookies na requisição
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    throw new Error('Erro ao obter dados da API');
  }
}
