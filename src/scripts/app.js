$(document).ready(function() {

	'use strict';

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

	function randomRestaurant() {
		var i = Math.floor( Math.random() * restaurants.length );
		console.log(i);

		var h1 = document.querySelector('h1');

		h1.innerHTML = restaurants[i];
	}

	randomRestaurant();

});
