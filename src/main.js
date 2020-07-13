const {BrowserWindow, Notification} = require('electron')
const {getConnection} = require('./database');

async function createProduct(product) {
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const res = await conn.query('INSERT INTO products SET ?',product )
    console.log(res)

    new Notification({
        title: 'electron',
        body:'new product added'
    }).show();

    product.id = res.insertId;
    return product;
}

async function getProducts(){
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM products');
    console.log(result);
    return result;
}

async function deleteProduct(id){
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM products WHERE id =?', id);
    console.log(result);
    return result
}

async function getProductById(id){
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM products WHERE id =?', id);
    console.log(result);
    return result[0];
}

async function updateProduct(id, product){
    const conn = await getConnection();
    const result = await conn.query('UPDATE products SET ? WHERE id =?', [product,id]);
}

let window 

function createWindow() {
    window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        }
    })
    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
}