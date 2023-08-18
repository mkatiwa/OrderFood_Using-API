document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const categorySelect = document.getElementById('categorySelect');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function () {
        const selectedCategory = categorySelect.value;
        if (selectedCategory) {
            fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
                .then(response => response.json())
                .then(products => {
                    if (products.length === 0) {
                        productList.innerHTML = '<p>No results found.</p>';
                    } else {
                        productList.innerHTML = '';
                        products.forEach(product => {
                            const productDiv = document.createElement('div');
                            productDiv.classList.add('product');

                            const image = document.createElement('img');
                            image.src = product.image;
                            image.alt = product.title;
                            productDiv.appendChild(image);

                            const productContent = document.createElement('div');
                            productContent.classList.add('product-content');

                            const productName = document.createElement('h2');
                            productName.textContent = product.title;
                            productContent.appendChild(productName);

                            const productPrice = document.createElement('p');
                            productPrice.textContent = `$${product.price.toFixed(2)}`;
                            productContent.appendChild(productPrice);

                            const addToCartBtn = document.createElement('button');
                            addToCartBtn.textContent = 'Add to Cart';
                            addToCartBtn.addEventListener('click', () => {
                                alert(`Added ${product.title} to the cart!`);
                            });
                            productContent.appendChild(addToCartBtn);

                            productDiv.appendChild(productContent);
                            productList.appendChild(productDiv);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    productList.innerHTML = 'An error occurred while fetching data.';
                });
        }
    });
});