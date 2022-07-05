window.onload = function () {
    getProductList();
}

/* ------------------GET ALL ------------------------------- */
function getProductList() {
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET',
    });

    promise.then(function (result) {
        console.log(result.data);
        renderProductList(result.data, 'tblProductList');
    })
}
/* --------------------RENDER TABLE LIST---------------------- */
function renderProductList(arrPro, idBody) {
    let htmlContent = '';
    for (let i = 0; i < arrPro.length; i++) {
        let product = arrPro[i];
        htmlContent += `
        <tr>
        <td>${product.id}</td>
        <td>${product.img}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${product.type}</td>
        <td>
            <button class="btn btn-danger" onclick= "deleteProduct('${product.id}')"><i class="bi bi-trash"></i></button>
            <button class="btn btn-primary" onclick = "editProduct('${product.id}')"><i class="bi bi-pencil-square"></i></button>
        </td>
        </tr>`
    }
    document.getElementById(idBody).innerHTML = htmlContent;
}
/* --------------------CREATE NEW ________________________ */
document.getElementById('btnCreate').onclick = async function () {
    let product = new Product();
    product.id = document.getElementById('id').value;
    product.name = document.getElementById('name').value;
    product.price = document.getElementById('price').value;
    product.img = document.getElementById('img').value;
    product.description = document.getElementById('description').value;
    product.type = document.getElementById('type').value;

    console.log(product);

    let mess = '';
    try {
        let result = await axios({
            url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
            method: 'POST',
            data: product

        });
        mess = result.data;

        getProductList();
    }
    catch (err) {
        alert(err.response?.data);
    }

}

/* ---------------------EDIT----------------------- */

function editProduct(productId) {

    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + productId,
        method: 'GET',
    });

    promise.then(function (result) {
        console.log(result.data);
        let product = result.data;

        document.getElementById('id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.value;
        document.getElementById('img').value = product.img;
        document.getElementById('description').value = product.description;
        document.getElementById('type').value = type;
    });

    promise.catch((err) => {
        console.log('err', err);
    })

}

/* ------------------UPDATE--------------------------------- */

document.getElementById('btnUpdate').onclick = function () {
    let productUpdate = new Product();

    productUpdate.id = document.getElementById('id').value;
    productUpdate.name = document.getElementById('name').value;
    productUpdate.price = document.getElementById('price').value;
    productUpdate.img = document.getElementById('img').value;
    productUpdate.description = document.getElementById('description').value;
    productUpdate.type = document.getElementById('type').value;

    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + productUpdate.id,
        method: 'PUT',
        data: productUpdate,
    });

    promise.then(function (result) {
        console.log(result);
        getProductList();
    });

    promise.catch(function (err) {
        console.log('err', err);
    })
}

/* ----------------------DELETE------------------------------ */
function deleteProduct(productId) {

    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + productId,
        method: 'DELETE'
    });

    promise.then(function () {
        getProductList();
    });
    promise.catch(function (err) {
        console.log('err', err);
    })
}

/* --------------------SEARCH BY NAME ------------------*/

document.getElementById('btnSearch').addEventListener('click', function(){

    let promise = axios({
        url:'http://svcy.myclass.vn/api/Product/SearchByName?name=' + document.getElementById('searchByName').value, 
        method: 'GET',
    })

    promise.then(function (result) {
        console.log(result.data);
        renderProductList(result.data, 'tblProductList');
    })

});