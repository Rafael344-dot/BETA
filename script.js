const axios = require('axios');
const readline = require('readline');

// Configurar entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para seguir redirecionamentos
async function bypassShortener(url) {
  try {
    // Configurar a requisição para seguir redirecionamentos
    const response = await axios.get(url, {
      maxRedirects: 10, // Define o limite de redirecionamentos
      validateStatus: status => status < 400, // Continua enquanto não há erro
    });

    // Exibe o link final
    console.log(`🔗 Link final: ${response.request.res.responseUrl}`);
  } catch (error) {
    console.error('❌ Ocorreu um erro:', error.message);
  }
}

// Pedir o link ao usuário
rl.question('Digite o link encurtado: ', url => {
  bypassShortener(url).then(() => {
    rl.close();
  });
});
