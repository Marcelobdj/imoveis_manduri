'use strict'

// STAND-ALONE FUNCTIONS
const clearSearch = () => {
  const searchResultsDiv = document.querySelector('#searchResults');
  searchResultsDiv.innerHTML = '';
};

const openWhatsApp = () => {
  window.open('https://api.whatsapp.com/send?phone=5531996545514', '_blank');
};


//DISPLAY PRODUCTS FUNCTIONS
const displayProducts = async () => {
  const featuredList = document.querySelector('.featured');
  const allProductsList = document.querySelector('.allProducts');

  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    data.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('carousel-item');
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${product.img}" class="card-img-top" alt="Foto de ${product.title}">
          <div class="card-body d-block w-100">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.subtitle}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${product.transaction}</li>
            <li class="list-group-item">${product.type}</li>
            <li class="list-group-item">${product.adress}</li>
          </ul>
          <div class="card-body">
            <button id="${product.id}" type="button" data-toggle="modal" data-target="#staticBackdrop" class="btn btn-dark view-more">Ver Mais</button>
          </div>
        </div>
      `;
      if (product.featured === 'yes') {
        featuredList.appendChild(card);
      } else {
        allProductsList.appendChild(card);
      }

    });

    // Add the "active" class to the first card in each list
    const firstCard = featuredList.querySelector('.carousel-item');
    if (firstCard) {
      firstCard.classList.add('active');
    };
    const lastCard = allProductsList.querySelector('.carousel-item:last-child');
    if (lastCard) {
      lastCard.classList.add('active');
    };

    // DISPLAY MODAL FUNCTION
    const viewMoreButtons = document.querySelectorAll('.view-more');    
    viewMoreButtons.forEach((button) => {

      button.addEventListener('click', function() {
        let clickedButtonId = this.id;
        let selectedProduct = data.filter(product => product.id == clickedButtonId);
        console.log(selectedProduct[0].title);
      });
    });


  } catch (error) {
    console.error('Error:', error);
  }
};


//SEARCH PRODUCTS FUNCTIONS
const displaySearch = async (event) => {
  event.preventDefault();

  const transaction = document.querySelector('#transaction').selectedOptions[0].textContent;
  const type = document.querySelector('#type').selectedOptions[0].textContent;
  const searchResultsDiv = document.querySelector('#searchResults');

  try {
    const response = await fetch('http://localhost:3000/products');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const products = data;
    const filteredProducts = products.filter(product => product.type === type && product.transaction === transaction);

    clearSearch();

    if (filteredProducts.length > 0) {
      const msg = document.createElement('h1');
      msg.innerHTML = `${filteredProducts.length} resultados encontrados para ${type} ${transaction}`;
      searchResultsDiv.appendChild(msg);

      const foundCards = document.createElement('div');
      foundCards.setAttribute('id', 'foundCards');

      filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        card.innerHTML = `
          <img src="${product.img}" class="card-img-top" alt="Foto de ${product.title}">
          <div class="card-body d-block w-100">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.subtitle}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${product.transaction}</li>
            <li class="list-group-item">${product.type}</li>
            <li class="list-group-item">${product.adress}</li>
          </ul>
          <div class="card-body">
            <a href="www.imoveismanduri.com/index/products/${product.title.toLowerCase().replace(' ', '-')}" class="card-link">Ver mais</a>
          </div>
        `;
        
        foundCards.appendChild(card);
      });

      searchResultsDiv.appendChild(foundCards);
    } else {
      const msg = document.createElement('h1');
      msg.innerHTML = `Desculpe, não encontramos nenhum resultado para ${type} ${transaction}`;
      searchResultsDiv.appendChild(msg);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


//EVENTS FUNCTIONS
const searchForm = document.querySelector('form');
const clearButton = document.querySelector('#clearButton');
const vemDeZap = document.querySelector('#zapzap');

window.addEventListener('load', displayProducts);
searchForm.addEventListener('submit', displaySearch);
clearButton.addEventListener('click', clearSearch);
vemDeZap.addEventListener('click', openWhatsApp);




