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


function montarListaProdutos(listaProdutos) {
    ul.innerHTML = '';

    listaProdutos.forEach((produto) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const span = document.createElement('span');

        img.src = produto.img;
        img.alt = produto.nome;
        h3.innerText = produto.nome;
        p.innerText = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        span.innerText = produto.secao;

        li.append(img, h3, p, span);

        ul.appendChild(li);
    });
}

function filtrarPorTodos() {
    montarListaProdutos(produtos);
    totalUpdate(produtos)
}

function filtrarPorHortifruti() {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    });
    montarListaProdutos(listaHortifruti);
    totalUpdate(listaHortifruti)
}

function filtrarPorPanificadora() {
    const listaPanificadora = produtos.filter((produto) => {
        return produto.secao === 'Panificadora';
    });
    montarListaProdutos(listaPanificadora);
    totalUpdate(listaPanificadora)
}

function filtrarPorLaticínio() {
    const listaLaticínio = produtos.filter((produto) => {
        return produto.secao === 'Laticínio';
    });
    montarListaProdutos(listaLaticínio);

    totalUpdate(listaLaticínio)
}

function totalUpdate(produtos){
    let preco = document.getElementById('precoTotal')

    let precoTotal = 0

    produtos.forEach(item => {
        precoTotal += Number(item.preco)
    })

    preco.innerText = `${precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
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
    totalUpdate(arr)
}