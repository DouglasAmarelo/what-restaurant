$(document).ready(function() {

	'use strict';

	// Lista de restaurantes
	var restaurants = [
		'Benedito <span>(Tente de novo)</span>',
		'Madero <span>(máximo 2x / mês)</span>',
		'SmartAurant',
		'Mulher que Dança',
		'Karina\'s',
		'Cantinho <br /> da Gula',
		'Mineiro',
		'Jasmin',
		'Tio da Bocha',
		'Vilinha',
		'Espetinho',
		'Atravessar a rua',
		'Purê <span(se tiver em 4 pessoas)</span>',
		'Viado Paulista',
		'Piscininha',
		'3B',
		'Guri',
		'Si Señor <span>(só com o VR cheio)</span>',
		'Brau',
		'Algum Kilinho',
		'Algum PF',
		'Vapiano',
		'PCC',
		'Pastel da Maria',
		'Prime Burger',
		'Bolados',
		'Cheese Dog',
		'New Dog',
		'Espeto Paulista',
		'Joakins',
		'Buger Lab',
		'Padaria Milionária',
		'The Fifties',
		'Dog Milionário',
		'SubWay',
		'La Pergoletta',
		'Butcher\'s'
	];


	// Variáveis
	var clickCounter = 0;
	var numTentativas = document.querySelector('.tentativas');
	var numTentativasText = parseInt(numTentativas.textContent);
	var restaurante = document.querySelector('.restaurante');
	var opcoes = document.querySelector('.opcoes');


	// Exibe a quantidade de restaurantes da lista
	opcoes.innerText = restaurants.length;


	// Sorteia o restaurante
	function randomRestaurant() {
		var i = Math.floor( Math.random() * restaurants.length );

		return restaurants[i];
	}


	// Sorteia e atualiza conteudo da página
	function updateContent() {

		if ( clickCounter <= 2 ) {

			restaurante.innerHTML = randomRestaurant();

			clickCounter +=1;
			numTentativasText -= 1;
			numTentativas.textContent = numTentativasText;
		}
		else {
			restaurante.innerHTML = '<span class="error">Suas tentativas terminaram.</span>';
		}
	}


	// Sorteia ao clicar na página ou ao pressionar a 'barra de espaço'
	document.addEventListener('click', updateContent);
	document.addEventListener('keyup', function(e){
		e.preventDefault();

		if( e.keyCode === 32 ) { updateContent(); }
	});


	// Quando a página inicia
	restaurante.innerHTML = randomRestaurant();

});
