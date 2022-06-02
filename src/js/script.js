const ul = document.querySelector('.containerListaProdutos ul');

const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti');
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti);

const botaoMostrarPanificadora = document.querySelector('.estiloGeralBotoes--filtrarPanificadora');
botaoMostrarPanificadora.addEventListener('click', filtrarPorPanificadora);

const botaoMostrarLaticínio = document.querySelector('.estiloGeralBotoes--filtrarLaticínio');
botaoMostrarLaticínio.addEventListener('click', filtrarPorLaticínio);

const botaoMostrarTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos');
botaoMostrarTodos.addEventListener('click', filtrarPorTodos);

let busca = document.querySelector('.campoBuscaPorNome')

let listaProdutosCarrinho = [];

function montarListaProdutos(listaProdutos) {
    ul.innerHTML = '';

    listaProdutos.forEach((produto) => {
        const li     = document.createElement('li');
        const img    = document.createElement('img');
        const h3     = document.createElement('h3');
        const p      = document.createElement('p');
        const ol     = document.createElement('ol');
        const span   = document.createElement('span');
        const div    = document.createElement('div');
        const button = document.createElement('button');
        button.classList.add('estiloGeralBotoes', 'estiloGeralBotoes--comprar')
        button.addEventListener('click', addItem)

        button.innerText= 'Comprar'
        button.id       = produto.id;
        img.src         = produto.img;
        img.alt         = produto.nome;
        h3.innerText    = produto.nome;
        span.innerText  = produto.secao;
        p.innerText     = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        produto.componentes.forEach((componente) => {
            const li     = document.createElement('li');
            li.innerHTML = componente
            ol.appendChild(li)
        })

        div.append(p, button)
        li.append(img, h3, span, ol, div);

        ul.appendChild(li);
    });
}

function criarProdutosCart() {
    let limpar = document.querySelector('.cart__checkout--product')
    limpar.innerHTML = '';

    for(let i = 0; i < listaProdutosCarrinho.length; i++){
        let cartProduct         = document.querySelector('.cart__checkout--product')
        let productPositioning  = document.createElement('div')
        let productInfoContainer= document.createElement('div')
        let productContainer    = document.createElement('div')
        let productImg          = document.createElement('img')
        let productName         = document.createElement('h3')
        let productType         = document.createElement('p')
        let productPrice        = document.createElement('span')
        let productRemoval      = document.createElement('button')
        
        productInfoContainer.classList.add('cart_checkout--product--info')
        productContainer.classList.add('product__container')
        productPositioning.classList.add('product-positioning')
        productImg.classList.add('product__img')
        productName.classList.add('product__name')
        productType.classList.add('product__type')
        productPrice.classList.add('product__price')
        productRemoval.classList.add('trash')
        productPositioning.id = 'removal';

        productRemoval.addEventListener('click', removeItem)

        productImg.src          = listaProdutosCarrinho[i].img
        productName.innerText   = listaProdutosCarrinho[i].nome
        productType.innerText   = listaProdutosCarrinho[i].secao
        productPrice.innerText  = listaProdutosCarrinho[i].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        productRemoval.id       = listaProdutosCarrinho[i].id
        productRemoval.innerHTML= `<i class="fa-solid fa-trash trash"></i>`

        productInfoContainer.append(productName, productType, productPrice);
        productContainer.append(productImg, productInfoContainer);
        productPositioning.append(productContainer, productRemoval)
        cartProduct.append(productPositioning);
    }
}

function addItem(event){
    let productId  = event.target.id
    let productReceiver = produtos.find(item => item.id == productId)
    
    listaProdutosCarrinho.push(productReceiver)
    totalUpdate(listaProdutosCarrinho)
    criarProdutosCart()
}

function removeItem(event){
    let removeBtn   = event.target;
    const productId = removeBtn.id
    removeBtn.closest('.product-positioning').remove()

    const indice = listaProdutosCarrinho.findIndex(produto => produto.id == productId)
    listaProdutosCarrinho.splice(indice, 1)
    totalUpdate(listaProdutosCarrinho)
    criarProdutosCart()
}

function filtrarPorTodos() {
    montarListaProdutos(produtos);
}

function filtrarPorHortifruti() {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    });
    montarListaProdutos(listaHortifruti);
}

function filtrarPorPanificadora() {
    const listaPanificadora = produtos.filter((produto) => {
        return produto.secao === 'Panificadora';
    });
    montarListaProdutos(listaPanificadora);
}

function filtrarPorLaticínio() {
    const listaLaticínio = produtos.filter((produto) => {
        return produto.secao === 'Laticinio';
    });
    montarListaProdutos(listaLaticínio);
}

function totalUpdate(listaProdutosCarrinho){
    const itemQty   = document.querySelector('.quantity--value')
    const itemTotal = document.querySelector('.totalPrice--value')

    let quantidade  = listaProdutosCarrinho.length
    let precoTotal  = 0

    listaProdutosCarrinho.forEach(item => {
        precoTotal += Number(item.preco)
    })
    console.log(listaProdutosCarrinho)

    itemTotal.innerText = `${precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

    itemQty.innerText   = quantidade
}

function searchBox(){
    busca.addEventListener('keyup', function(e){
        filteredSearch(e.target.value, produtos)
    })
}
searchBox()

function filteredSearch(input, produtos){
    let loweredCaseInput = input.toLowerCase()
    let arr = [];
    ul.innerHTML = '';

    produtos.filter((item) => {
        if (item.nome.toLowerCase().includes(loweredCaseInput)){
            arr.push(item)
            ul.innerHTML = '';
        }
    })
    montarListaProdutos(arr)
}