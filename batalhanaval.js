var parte1 = 3;
var parte2 = 4;
var parte3 = 5;

var posicaoAleatoria = 1 + Math.floor(Math.random() * 5);
var parte1 = posicaoAleatoria;
var parte2 = parte1+1;
var parte3 = parte2 +1;
var jogada;
var atingidas = 0;
var totalJogadas = 0;

var foiAfundado = false;


while (foiAfundado == false) {

   jogada = prompt("Escolhe um numero entre 1 e 7:");

   if (jogada < 1 || jogada > 7) {

      alert("Jogada inválida.");

   } else {

      totalJogadas = totalJogadas + 1;

      if (jogada == parte1 || jogada == parte2 || jogada == parte3) {

         alert("Acertaste!");

         atingidas = atingidas +1;

         if (atingidas == 3) {

            foiAfundado = true;

            alert("Navio inimigo afundado!");

         }

      } else {

         alert("Falhaste o tiro!");

      }

   }

}

var estatistica = "Necessitaste de " + totalJogadas + " jogadas para afundar o um unico navio, " + 
                          "o que quer dizer que a tua pontaria foi de " + (3/totalJogadas);

alert(estatistica);
