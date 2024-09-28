function getEle(id) {
    return document.getElementById(id);
}

const api = new Api();

function getListProduct() {
    const promise = api.fecthData();
    promise
        .then(function (result) {
            console.log(result.data);
            renderUI(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getListProduct();

function renderUI(data) {
    let content = "";
    data.forEach(function (product, index) {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
        <img src="././asset/img/${product.image}" />
        </td>
        <td>${product.description}</td>
        <td>
            <button class ="btn btn-info" data-toggle="modal" data-target="#myModal" onclick ="editProduct(${product.id})">Edit</button>
            <button class ="btn btn-danger" onclick = "deleteProduct(${product.id})" >Delete</button>
        </td>
        </tr>
        `
    })
    getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * Delete Product
 */
function deleteProduct(id) {
    const promise = api.delete(id);
    promise
        .then(function (result) {
            //re-fetch data
            getListProduct();
        })
        .catch(function (error) {
            console.log(error)
        });
}

getEle("btnThemSP").onclick = function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

    //create button Add Product
    const btnAdd = `<button onclick ="addProduct()">Add Product</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
}
/**
 * Add Product
 */
function addProduct(){
    const name = getEle("TenSP").value;
    const price = getEle("GiaSP").value;
    const image = getEle("HinhSP").value;
    const desc = getEle("MoTa").value;
    
    //tạo object product từ Product
    const product = new Product("", name, price, image, desc);
    const promise = api.add(product);
    promise
    .then (function(result){
        // close modal
        document.getElementsByClassName("close")[0].click();
        // re-fetch data
        getListProduct();
    })
    .catch (function(error){
        console.log(error);
    })
}

/**
 * Edit Product
 */
function editProduct(id){
    //change title modal
    document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
    //create button "Update Product"
    const btnUpdate = `<button class="btn btn-success" onclick="updateProduct(id)">Update Product</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

    const promise = api.getProductById(id);
    promise
    .then(function(result){
        const product = result.data;
        //Show thông tin ra ngoài các thẻ input
        getEle("TenSP").value = product.name;
        getEle("GiaSP").value = product.price;
        getEle("HinhSP").value = product.image;
        getEle("MoTa").value = product.description;
    })
    .catch(function(error){
        console.log(error);
    });
   
}

/**
 * Update Product
 */
function updateProduct(id){
    const name = getEle("TenSP").value;
    const price = getEle("GiaSP").value;
    const image = getEle("HinhSP").value;
    const desc = getEle("MoTa").value;

    //tạo object product từ Product
    const product = new Product (id, name, price, image, desc)
    console.log(product);
    const promise = api.update(product);
    promise
    .then(function(result){
        document.getElementsByClassName("close")[0].click();
        getListProduct();
    })
    .catch(function(error){
        console.log(error);
    })
}
