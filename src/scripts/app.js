$(document).ready(function() {

	'use strict';

	var restaurante = document.querySelector('.restaurante');
	var container = document.querySelector('body');

	var restaurants = [
		'Benedito <span>(Tente de novo)</span>',
		'Madero <span>(2x / mês)</span>',
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
		'Hoje não quero ajudar!',
		'Purê <span(se tiver em 4 pessoas)</span>',
		'Viado Paulista',
		'Piscina',
		'3B',
		'Guri',
		'Si Señor <span>(VR cheio)</span>',
		'Brau',
		'Kilinho',
		'PF'
	];

	var clickCounter = 0;

	function randomRestaurant() {
		var i = Math.floor( Math.random() * restaurants.length );

		restaurante.innerHTML = restaurants[i];
	}

	container.addEventListener('click', function(){

		if (clickCounter <= 2 ) {

			randomRestaurant();

			clickCounter +=1;
		}
		else {
			restaurante.innerHTML = '<span class="error">apenas 3 tentativas</span>';
		}
	});

	randomRestaurant();

});
