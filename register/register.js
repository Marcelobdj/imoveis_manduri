'use strict';

const form = document.querySelector('form');

// FUNCTIONS
const submitForm = (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const subtitle = document.querySelector('#subtitle').value;
    const img = document.querySelector('#img').value;
    const transaction = document.querySelector('#transaction');
    const type = document.querySelector('#type');
    const adress = document.querySelector('#adress').value;
    const featured = document.querySelector('#featuredCheck1');

    const data = {
        title: title,
        subtitle: subtitle,
        img: img,
        transaction: transaction.selectedOptions[0].textContent,
        type: type.selectedOptions[0].textContent,
        adress: adress,
        featured: featured.checked ? 'yes' : 'no'
    };

    fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    
    .then(data => {
        alert('Produto cadastrado com sucesso!');
      })
      .catch(error => {
        alert(error)
    });

}


// EVENTS
form.addEventListener('submit', submitForm);

fetch("http://localhost:3000/products")
.then(response => response.json())
.then();