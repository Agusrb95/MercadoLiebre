const fs = require('fs');
const path = require('path');

let jsonDeProductos = fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf8');
let productosParseados = JSON.parse(jsonDeProductos);

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products', {
			productos: productosParseados
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = req.params.productId;
		for(let i = 0; i < productosParseados.length; i++) {
			if(productosParseados[i].id == idProducto) {
				res.render('detail', {
					producto: productosParseados[i]
				})
			}
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let nuevoProducto = {
			id: Number(productosParseados.length + 1),
			...req.body
		};
		productosParseados.push(nuevoProducto);
		let listaActualizada = JSON.stringify(productosParseados);
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), listaActualizada);
		res.redirect('/products/detail/' + nuevoProducto.id);
		//res.redirect('/products');
		//res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		for(let i = 0; i < productosParseados.length; i++) {
			if(productosParseados[i].id == req.params.productId) {
				res.render('product-edit-form', {
					producto: productosParseados[i]
				})
			}
		}
		//res.render('product-edit-form')
	},
	// Update - Method to update
	update: (req, res) => {
		let productoActualizado = {
			id: Number(req.params.productId),
			...req.body
		}
		for(let i = 0; i < productosParseados.length; i++) {
			if(productosParseados[i].id == productoActualizado.id) {
				productosParseados[i] = productoActualizado;
				fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productosParseados));
				res.redirect('/products/detail/' + productoActualizado.id)
			}
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		for(let i = 0; i < productosParseados.length; i++) {
			if(productosParseados[i].id == req.params.productId) {
				let index = productosParseados.indexOf(productosParseados[i]);
				productosParseados.splice(index, 1);
				fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productosParseados));
				res.redirect('/products?status=ok')
			}
		}
	}
};

module.exports = controller;