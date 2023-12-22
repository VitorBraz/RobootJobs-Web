export async function fetchDataFromAPI() {
  try {
    const response = await fetch('http://dev01.briotecnologia.com.br:5000/api/n8n/instances', {
      credentials: 'include', // Inclui os cookies na requisição
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    throw new Error('Erro ao obter dados da API');
  }
}
