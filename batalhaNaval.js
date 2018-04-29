var TAMANHO_MAPA_X = 10; //Tamanho máximo recomendado 20
var TAMANHO_MAPA_Y = 10; //Tamanho máximo recomendado 20, máximo = 99
var TAMANHO_NAVIOS = [5,4,3,3,2]; //Cada número corresponde ao tamanho de um navio, é possível adicionar mais elementos ou modificar os números
var TEMPO_ENTRE_JOGADAS = 500; //Tempo em ms
var CORES = ["Aqua","Aquamarine","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HotPink","Indigo","Khaki","LawnGreen","LemonChiffon","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSlateGray","LightSlateGrey","LightYellow","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","Moccasin","Navy","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SlateBlue","SlateGray","SlateGrey","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"]
var naviosJogador = []; //Array que guarda a posição dos navios do jogador
var naviosComputador = []; //Array que guarda a posição dos navios do computador
var naviosSemDestruidosJogador = []; //Array sem os navios que já foram destruidos do jogador
var naviosSemDestruidosComputador = []; //Array sem os navios que já foram destruidos do computador 
var valoresIntroduzidosJogador = []; //Array que grava os valores introduzidos do jogador 
var valoresIntroduzidosComputador = []; //Array que grava os valores introduzidos do computador
var vezJogador = true; //Guarda de quem é a vez de jogar
var acabouJogo = false; //Guarda o estado do jogo
var numeroNavios = 0; //Cada subparte conta como 1
var totalJogadas = 0; //Guarda o total de jogadas
var index = 0; //Guarda o index do navio que foi atingido



//Primeira função a ser executada
function Init() {
	
	configurarJogo();
	}

//Configuração do jogo
function configurarJogo() {
		
	criarTabuleiro("tabuleiroJogador"); //Cria o tabuleiro do jogador
	criarNavios("tabuleiroJogador"); //Cria os navios do jogador
	//carregarTabuleiro("tabuleiroJogador");
	console.log(naviosJogador); //Coloca a posição dos navios do jogador na consola
	
	criarTabuleiro("tabuleiroComputador"); //Cria o tabuleiro do computador
	criarNavios("tabuleiroComputador"); //Cria os navios do computador
	carregarTabuleiro("tabuleiroComputador"); //Coloca visíveis os navios do computador
	
	//Define o tamanho da zona das informações
	//tamanho é igual à variável altura da função criarBotao
	var tamanho = 100 / (TAMANHO_MAPA_X + 1) * 0.01 * document.getElementById("tabuleiroJogador").clientWidth;
	document.getElementById("informacoes").style.marginTop = tamanho + "px";
	document.getElementById("informacoes").style.height = document.getElementById("tabuleiroJogador").clientWidth - tamanho + "px";
	
	//Avisa o jogador que pode jogar
	document.getElementById("informacoesJogador").innerHTML += "\r\nÉ a tua vez de jogar!\r\n";
	scrollAreaTexto("informacoesJogador"); //Serve para dar scroll automaticamente caso a caixa de texto fique cheia
}


//Cria o tabuleiro com os botões
function criarTabuleiro(tabuleiro) {
	
	//criarBotao(id, classe, texto, onClick, tabuleiro)
	//Cria o primeiro botão 
	criarBotao(null, "botaoInformacao", null, null, tabuleiro);
	
	//Cria o resto dos botões da fila de cima
	for (var i = 65; i < 65 + TAMANHO_MAPA_X; i++) {
		var letra = String.fromCharCode(i); //Muda o número i para a letra correspondente, A=65, B=66...
		criarBotao(null, "botaoInformacao", letra, null, tabuleiro);
	}
	
	for (var i = 1; i <= TAMANHO_MAPA_Y; i++) {
		//Cria os botões da coluna da esquerda
		criarBotao(null, "botaoInformacao", i, null, tabuleiro);
		
		//Cria os botões do resto do tabuleiro
		for (var j = 65; j < 65 + TAMANHO_MAPA_X; j++) {
			var letra = String.fromCharCode(j);
			
			if (tabuleiro === "tabuleiroJogador") {
				var id = "botaoJ" + letra + i; //ID=botaoJA1 ou botaoJB4...
			}
			else {
				var id = "botaoC" + letra + i; //ID=botaoCA1 ou botaoJC2...
			}
			
			//Função a ser executada quando o usuário clica no botão
			var funcao = function(){ 
				if ((vezJogador) && (!acabouJogo)) { //O botão apenas funciona se for a vez do jogador e o jogo não tiver acabado
					if (jogo(this.id.charAt(6), this.id.charAt(7) + this.id.charAt(8), tabuleiro)){; //Executa a função jogo com algums argumentos
						vezJogador = false; //Impede o jogador de jogar
						document.getElementById("informacoesComputador").innerHTML += "\r\nO computador está a jogar...\r\n";
						scrollAreaTexto("informacoesComputador"); //Caso a área de texto esteja cheia, dá scroll automaticamente
						setTimeout(jogadaComputador, TEMPO_ENTRE_JOGADAS); //Executa a função jogadaComputador passado algum tempo
						
					};
				}
			}
			
			criarBotao(id, "botaoJogo", null, funcao, tabuleiro);
		}
	}
}


//Coloca os navios visíveis
function carregarTabuleiro(tabuleiro){
	if (tabuleiro === "tabuleiroJogador") {
		var navios = naviosJogador;
		var id = "botaoJ";
	}
	else {
		var navios = naviosComputador;
		var id = "botaoC";
	}
	
	for (i=0; i < navios.length; i++) {
		var cor = corAleatoria();
		for (j=0; j < navios[i].length; j++) {
			document.getElementById(id + navios[i][j]).style.backgroundColor = cor;
		}
	}
}



function corAleatoria() {
	var cor = Math.floor(Math.random() * CORES.length);
	return CORES[cor];
}


//Cria os botões
function criarBotao(id, classe, texto, onClick, tabuleiro) {
	var botao = document.createElement("button"); //Variável com o botão
	botao.type = "button";
	
	
	var largura = 100 / (TAMANHO_MAPA_X + 1); //Largura do botão em %
	botao.style.width = largura + "%"; 
	
	var altura = largura * 0.01 * document.getElementById(tabuleiro).clientWidth; //Conversão de % para px, aspect ratio 1:1
	botao.style.height = altura + "px";
	
	
	//Define a classe
	if ((classe === "botaoJogo") && (tabuleiro === "tabuleiroJogador")) {
		botao.className = "botaoJogador";
	}
	else if ((classe === "botaoJogo") && (tabuleiro === "tabuleiroComputador")) {
		botao.className = "botaoComputador";
	}	
	else {
		botao.className = classe;
	}
	
	//Apenas define os valores se estes forem diferentes de null
	if (id != null) {
		botao.id = id;
	}
	
	if (texto != null) {
		botao.innerHTML = texto;
	}
	if ((onClick != null) && (tabuleiro === "tabuleiroJogador")) {
		botao.onclick = onClick;
	}
	document.getElementById(tabuleiro).appendChild(botao); //Adiciona o botão ao tabuleiro
}


//Gere a criação de navios
function criarNavios(tabuleiro) {
	
	if (tabuleiro === "tabuleiroJogador") {
		var navios = naviosJogador;
		var naviosSemDestruidos = naviosSemDestruidosJogador;
	}
	else {
		var navios = naviosComputador;
		var naviosSemDestruidos = naviosSemDestruidosComputador;
	}
	
	
	for (var i = 0; i < TAMANHO_NAVIOS.length; i++) {
		navios[i] = criarNavio(TAMANHO_NAVIOS[i], tabuleiro); //Guarda o navio criado no array navios
		numeroNavios += TAMANHO_NAVIOS[i] / 2; //Adiciona o número de subpartes do navio adicionado
	}
	
	for (var i = 0; i < navios.length; i++) {
		naviosSemDestruidos[i] = navios[i].slice(); //Copia o array navios para o array naviosSemDestruidos
	}	
}


//Cria os navios
function criarNavio(tamanho, tabuleiro) {
	
	var foraDoMapa = true; //Usado para saber se o navio criado está fora do mapa
	var colideComOutroNavio = true; //Usado para saber se o navio criado colidiu com outro navio
	var navio; //Guarda a posição do navio
	
	while (foraDoMapa || colideComOutroNavio) { //Enquanto o navio estiver fora do mapa ou colidir com outro barco, gerar outro navio
		var navio = []; //Reset
		foraDoMapa = true; //Reset
		colideComOutroNavio = true; //Reset
		var posicaoInicial = gerarPosicaoAleatoria(); //Gera a posição aleatória
		var posicaoInicialX = posicaoInicial.charCodeAt(0); //Letra - X
		var posicaoInicialY = parseInt(posicaoInicial.charAt(1) + posicaoInicial.charAt(2)); //Número - Y 
		var orientacao = Math.round(Math.random());//Gera um valor entre 0 e 1 para decidir a orientação do navio, 1 = horizontal.
		
		for (i = 0; i < tamanho; i++) { 
			if (orientacao) { //Cria o navio na horizontal
				var posicaoFinalX = posicaoInicialX + i;
				navio.push(String.fromCharCode(posicaoFinalX) + posicaoInicialY);
			}
			else { //Cria o navio na vertical
				var posicaoFinalY = posicaoInicialY + i;
				navio.push(String.fromCharCode(posicaoInicialX) + posicaoFinalY);
			}
		}
		foraDoMapa = colisoesNavioMapa(navio); //Verifica se o navio está fora do mapa
		colideComOutroNavio = colisoesNavioNavio(navio, tabuleiro); //Verifica se o navio colidiu com outro navio
	}
	return navio; //Devolve o navio criado
}


//Gera a posição aleatória
function gerarPosicaoAleatoria() {
	
	var letraAleatoria = String.fromCharCode(65 + Math.floor(Math.random() * (TAMANHO_MAPA_X))); // Entre A e a última letra
	var numeroAleatorio = 1 + Math.floor(Math.random() * (TAMANHO_MAPA_Y)); // Entre 1 e último número
	//console.log(letraAleatoria + numeroAleatorio);
	return letraAleatoria + numeroAleatorio; //Devolve os valores
}


//Verifica se o navio está fora do mapa
function colisoesNavioMapa(navio) { 
	
	for (var i = 0; i < navio.length; i++) {
		if (navio[i].charAt(0).charCodeAt(0) > 64 + TAMANHO_MAPA_X) { //.charAt(0).charCodeAt(0) devolvem o número correspondente à letra
			return true;
		}
		if (navio[i].charAt(1) + navio[i].charAt(2)> TAMANHO_MAPA_Y) { // Temos que verificar o 1º e o 2º digito pois o número pode ter mais que um digito
			return true;
		}
	}
	return false;
}


//Verifica se o navio colide com os outros navios
function colisoesNavioNavio(navio, tabuleiro) { 

	if (tabuleiro === "tabuleiroJogador") {
		var navios = naviosJogador;
	}
	else {
		var navios = naviosComputador;
	}

	//Compara todos as posições do navio com a dos outros navios
	for (var i = 0; i < navio.length; i++) {
		for (var j = 0; j < navios.length; j++) {
			for (var k = 0; k < navios[j].length; k++) {
				if (navio[i] == navios[j][k]) {
					return true;
				}
			}
		}		
	}
	return false;
}


//Função principal
function jogo(letra, numero, tabuleiro) {
	
	if (!verificarJogada(letra, numero, tabuleiro)) { //Verifica se a jogada é válida
		if (tabuleiro === "tabuleiroJogador") {
			document.getElementById("informacoesJogador").innerHTML += "Valor repetido. Tenta de novo!\r\n";
			scrollAreaTexto("informacoesJogador");
		}
		return false; //Sair da função
	}
	
	
	if (tabuleiro === "tabuleiroJogador") {
		totalJogadas++; //Conta mais uma jogada	
		var botaoEscolhido = "botaoJ" + letra + numero; //Botão selecionado
		document.getElementById("informacoesJogador").innerHTML += "Jogaste na posição " + letra + numero + ".\r\n";
		scrollAreaTexto("informacoesJogador");
	}
	else {
		var botaoEscolhido = "botaoC" + letra + numero; //Botão selecionado
		document.getElementById("informacoesComputador").innerHTML += "O computador jogou na posição " + letra + numero + ".\r\n";
		scrollAreaTexto("informacoesComputador");
	}
	
	
	if (verificarAcertouNavio(letra, numero, tabuleiro)) { //Verifica se acertou num navio
		document.getElementById(botaoEscolhido).style.backgroundColor = "DarkRed";
		if (tabuleiro === "tabuleiroJogador") {
			document.getElementById("informacoesJogador").innerHTML += "Acertaste num navio!\r\n";
			scrollAreaTexto("informacoesJogador");
			
		}
		else {
			document.getElementById("informacoesComputador").innerHTML += "O computador acertou num navio!\r\n";
			scrollAreaTexto("informacoesComputador");
		}
	}
	
	else { //Caso não acerte num navio
		document.getElementById(botaoEscolhido).style.backgroundColor = "SkyBlue";
		if (tabuleiro === "tabuleiroJogador") {
			document.getElementById("informacoesJogador").innerHTML += "Falhaste...\r\n";
			scrollAreaTexto("informacoesJogador");
		}
		else {
			
			document.getElementById("informacoesComputador").innerHTML += "O computador falhou!\r\n";
			scrollAreaTexto("informacoesComputador");
		}
	}
	
	if (verificarDestruiuNavio(index, tabuleiro)) { //Verifica se destruíu o navio
		if (tabuleiro === "tabuleiroJogador") {
			document.getElementById("informacoesJogador").innerHTML += "Afundas-te um navio!\r\n";
			scrollAreaTexto("informacoesJogador");
			explosao.load(); //Reset som
			explosao.play(); //Play som
			var navios = naviosJogador;			
		}
		else {
			document.getElementById("informacoesComputador").innerHTML += "O computador afundou um navio!\r\n";
			scrollAreaTexto("informacoesComputador");
			var navios = naviosComputador;
		}
		
		var cor = corAleatoria();
		for (var j=0; j < navios[index].length; j++) { //Coloca todos os pedaçõs do navio destruido a outra cor
			if (tabuleiro === "tabuleiroJogador") {
				var botao = "botaoJ" + navios[index][j];
			}
			else {
				var botao = "botaoC" + navios[index][j];
			}
			document.getElementById(botao).style.backgroundColor = cor;
		}
	}
	
	if (verificarAcabouJogo(tabuleiro)) { //Verifica se ganhou o jogo
	
		if (tabuleiro === "tabuleiroJogador") {
			alert("Ganhaste o jogo!");
			estatisticas(); //Mostra as estatisticas
		}
		else {
			alert("Perdeste o jogo :(");
		}
		acabouJogo = true;
	}
	return true;
}


function jogadaComputador() {
	var jogadaValida = false;
	while (!jogadaValida){
		var posicaoAleatoria = gerarPosicaoAleatoria();
		var letraAleatoria = posicaoAleatoria.charAt(0);
		var numeroAleatorio = parseInt(posicaoAleatoria.charAt(1) + posicaoAleatoria.charAt(2));
		jogadaValida = jogo(letraAleatoria, numeroAleatorio, "tabuleiroComputador");
		vezJogador = true;
	}
	
	if (!acabouJogo) { //Apenas se não acabou o jogo
		document.getElementById("informacoesJogador").innerHTML += "\r\nÉ a tua vez de jogar!\r\n";
		scrollAreaTexto("informacoesJogador");
	}
}


//Verifica a jogada
function verificarJogada(letra, numero, tabuleiro) {
	
	if (tabuleiro === "tabuleiroJogador") {
		var valoresIntroduzidos = valoresIntroduzidosJogador;
	}
	else {
		var valoresIntroduzidos = valoresIntroduzidosComputador;
	}
	
	if (valoresIntroduzidos.includes(letra + numero)) { //Verifica se o valor introduzido está no array
		return false;
	}
	else {
		valoresIntroduzidos.push(letra + numero); //Coloca o valor introduzido no array
		return true;
	}
}


//Verifica se acertou num navio
function verificarAcertouNavio(letra, numero, tabuleiro) { //Verifica se o jogador acertou num navio

	if (tabuleiro === "tabuleiroJogador") {
		var naviosSemDestruidos = naviosSemDestruidosJogador;
	}
	else {
		var naviosSemDestruidos = naviosSemDestruidosComputador;
	}

	for (var i = 0; i < naviosSemDestruidos.length; i++) {
		for (var j = 0; j < naviosSemDestruidos[i].length; j++) {
			if ((letra + numero) == naviosSemDestruidos[i][j]) {
				naviosSemDestruidos[i].splice(j, 1);
				index = i;
				return true;
			}
		}
	}
	return false;
}


//Verifica se destruiu um navio
function verificarDestruiuNavio(index, tabuleiro) {
	
	if (tabuleiro === "tabuleiroJogador") {
		var naviosSemDestruidos = naviosSemDestruidosJogador;
	}
	else {
		var naviosSemDestruidos = naviosSemDestruidosComputador;
	}
	
	for (i=0; i<naviosSemDestruidosJogador.length; i++) {
		if (naviosSemDestruidos[i].length == 0) {
			naviosSemDestruidos[i]=-1; //Define o valor dos navios destruidos para -1
			return true;
		}
	}
	return false;
}


//Verifica se acabou o jogo
function verificarAcabouJogo(tabuleiro) {
	
	if (tabuleiro === "tabuleiroJogador") {
		var navios = naviosJogador;
		var naviosSemDestruidos = naviosSemDestruidosJogador;
	}
	else {
		var navios = naviosComputador;
		var naviosSemDestruidos = naviosSemDestruidosComputador;
	}	
	
	for (i=0; i < navios.length; i++) {
		if(naviosSemDestruidos[i] != -1) { //-1 = navio destruido
			return false;
		}
	}
	return true;
}


//Mostra as estatísticas
function estatisticas() {
	
	var estatistica = "\r\nFoi preciso um total de " + totalJogadas + " jogadas para afundar os navios, o que quer dizer que a tua pontaria foi de " + Math.round((numeroNavios/totalJogadas)*100) + "%\r\n";
	document.getElementById("informacoesJogador").innerHTML += estatistica;
	scrollAreaTexto("informacoesJogador");
}


//Faz o scroll automatico das áreas de texto
function scrollAreaTexto(id){
   var textarea = document.getElementById(id);
   if(textarea.selectionStart == textarea.selectionEnd) {
      textarea.scrollTop = textarea.scrollHeight;
   }
}
