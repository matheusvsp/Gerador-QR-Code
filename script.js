function GerarQRCode() {
  // Obtém o valor inserido pelo usuário no campo de textarea e remove espaços em branco nas extremidades.
  const inputUsuario = document.querySelector("textarea").value.trim();

  // Seleciona o elemento onde o QR Code gerado será exibido.
  const qrcodeContainer = document.getElementById("QRCodeImage");

  // Exibe o valor de entrada do usuário no console (útil para depuração).
  console.log(inputUsuario);

  // Limpa qualquer QR Code previamente gerado no container.
  qrcodeContainer.innerHTML = "";

  // Verifica se o campo de entrada está vazio.
  if (!inputUsuario) {
    // Alerta o usuário caso nenhum texto ou URL tenha sido inserido.
    alert("Por favor, insira um texto ou URL para gerar o QR Code.");
    return; // Interrompe a execução da função se não houver entrada válida.
  }

  // Tenta gerar o QR Code com base no valor de entrada do usuário.
  try {
    QRCode.toCanvas(
      document.createElement("canvas"), // Cria um novo elemento canvas para o QR Code.
      inputUsuario, // Usa o valor de entrada do usuário como conteúdo do QR Code.
      function (error, canvas) {
        // Função de callback para manipular o resultado.
        if (error) {
          // Se ocorrer um erro durante a geração do QR Code, ele é registrado no console.
          console.error("Erro ao gerar QR Code:", error);

          // Alerta o usuário sobre o erro.
          alert("Erro ao gerar QR Code. Por favor, tente novamente.");
          return; // Interrompe a execução se houver erro.
        }
        // Se nenhum erro ocorrer, o QR Code gerado é adicionado ao container.
        qrcodeContainer.appendChild(canvas);
      }
    );
  } catch (error) {
    // Captura qualquer outro erro que possa ocorrer durante o processo.
    console.error("Erro ao gerar QR Code:", error);

    // Alerta o usuário sobre o erro.
    alert("Erro ao gerar QR Code. Por favor, tente novamente.");
  }
}

function downloadQRCode(format) {
  // Seleciona o elemento canvas onde o QR Code gerado está desenhado.
  const canvas = document.querySelector("#QRCodeImage canvas");

  // Verifica se o QR Code já foi gerado.
  if (!canvas) {
    // Alerta o usuário para gerar o QR Code antes de tentar fazer o download.
    alert("Por favor, gere um QR Code primeiro.");
    return; // Interrompe a execução se o QR Code ainda não foi gerado.
  }

  // Verifica se o formato de download solicitado é PNG.
  if (format !== "png") {
    // Alerta o usuário que apenas o formato PNG é suportado.
    alert("Formato não suportado!");
    return; // Interrompe a execução se o formato não for suportado.
  }

  // Converte o conteúdo do canvas (QR Code) para uma URL de dados em formato PNG.
  const url = canvas.toDataURL("image/png");

  // Cria um elemento <a> temporário para facilitar o download da imagem.
  const a = document.createElement("a");
  a.href = url; // Define o link para a URL da imagem.
  a.download = "qrcode.png"; // Define o nome do arquivo para download.
  a.click(); // Simula um clique no link para iniciar o download.
}
