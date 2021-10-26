const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let jsonDeProductos = fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf8');
let productosParseados = JSON.parse(jsonDeProductos);

const controller = {
	root: (req, res) => {
		let productosInSale = productosParseados.filter(function(elemento) {
			return elemento.category == "in-sale";
		});
		let productosVisitados = productosParseados.filter(function(elemento) {
			return elemento.category == "visited";
		});
		res.render('index', {
			productosInSale: productosInSale,
			productosVisitados: productosVisitados
		});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
