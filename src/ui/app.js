const { remote } = require('electron');
const main = remote.require('./main');

const productForm = document.getElementById('pr');
const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDes = document.getElementById('description');
const prodcutList = document.getElementById('products');

let products = []

let editStatuts = false
let productId = ''

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const product = {
        name:productName.value,
        price:productPrice.value,
        description:productDes.value
    }

    if(!editStatuts){
        const result = await main.createProduct(product);
        console.log(result)
    } else {
        const result = await main.updateProduct(productId, product);
        editStatuts = false
        productId = ''
    }


    getProducts();

    productForm.reset();
    productName.focus();
})


async function deleteProduct(id){
    const response = confirm("Do you want to delete this record")

    if (response){
        const result = await main.deleteProduct(id);
        console.log(id);
        await getProducts();
    }
    return;
}

async function updateProduct(id){
    const product = await main.getProductById(id);

    productName.value = product.name;
    productPrice.value = product.price;
    productDes.value = product.description;
    productId = product.id;
    editStatuts = true;
}

function renderProducts(products){
    prodcutList.innerHTML = '';
    products.forEach(product => {
        prodcutList.innerHTML += `
            <div class="card card-body my-2 animate__animated animate__bounceInUp">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                        Delete
                    </button>
                    <button class="btn btn-secondary" onclick="updateProduct(${product.id})">
                        Edit
                    </button>
                </p>
            </div>
        `
    });
}

const  getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

async function init() {
    await getProducts();
}

init();
