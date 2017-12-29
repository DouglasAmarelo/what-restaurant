'use strict';

// Lista de background images
var images = [
	'background-1.jpg',
	'background-2.jpg',
	'background-3.jpg',
	'background-4.jpg',
	'background-5.jpg',
	'background-6.jpg',
	'background-7.jpg'
];

// Lista de restaurantes
var restaurants = [
	'Benedito <span>(Tente de novo)</span>',
	'Madero <span>(máximo 2x / mês)</span>',
	'SmartAurant',
	'Mulher que Dança',
	'Karina\'s',
	'Cantinho <br /> da Gula',
	'Mineiro',
	'Jasmim',
	'Tio da Bocha',
	'Vilinha',
	'Espetinho',
	'Atravessar a rua',
	'Purê <span(se tiver em 4 pessoas)</span>',
	'ViRado Paulista',
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
var restaurante       = document.querySelector('.restaurante');
var opcoes            = document.querySelector('.opcoes');
var numTentativas     = document.querySelector('.tentativas');
var docBody           = document.querySelector('body');
var numTentativasText = parseInt(numTentativas.textContent);
var clickCounter      = 0;
var ctaSortear        = docBody.querySelector('.sortear');

// Função genérica de sorteio
function randomAll( itemsList ) {
	var i = Math.floor( Math.random() * itemsList.length );

	return itemsList[i];
}

// Exibe a quantidade de restaurantes da lista
opcoes.innerText = restaurants.length;

// Sorteia as imagens de fundo
function randomBackground(){ return randomAll( images ); }


// Sorteia o restaurante
function randomRestaurant() { return randomAll( restaurants ); }


// Sorteia e atualiza conteudo da página
function updateContent() {

	// Altera a imagem de fundo
	docBody.style.backgroundImage = 'url("images/' + randomBackground() + '")';

	if ( clickCounter <= 2 ) {

		// Altera nome do restaurante
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
// document.addEventListener('click', updateContent);
// document.addEventListener('keyup', function(e){
// 	e.preventDefault();

// 	if( e.keyCode === 32 ) { updateContent(); }
// });

// Sorteia ao clicar no botão
ctaSortear.addEventListener('click', function(event) {
	event.preventDefault();

	this.classList.add('is--active');

	if ( clickCounter > 2 ) {

		this.classList.add('restart');

		clickCounter++;
	}

	if ( clickCounter === 5 && this.classList.contains('restart') ) {
		window.location.href = '/';
	}

	updateContent();
});

// Quando a página inicia
// restaurante.innerHTML = randomRestaurant();