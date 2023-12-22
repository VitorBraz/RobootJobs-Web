export async function fetchDataFromAPI() {
    try {
        const response = await fetch('http://dev01.briotecnologia.com.br:5000/api/n8n/configuration-instances', {
            method: 'POST', // Certifique-se de estar usando o método POST aqui
            credentials: 'include', // Inclui os cookies na requisição
            headers: {
              'Content-Type': 'application/json',
            },          });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
      throw new Error('Erro ao obter dados da API');
    }
  }