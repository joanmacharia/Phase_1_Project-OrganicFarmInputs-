
const title= document .getElementById('title')
const brand= document .getElementById('brand')
const price= document .getElementById('price')
const item_weight= document .getElementById('itemWeight')
const items_in_stock= document .getElementById('itemsstock')
const seller = document.getElementById('seller')
const use= document.getElementById('itemUse')
const image= document.getElementById('image')
const itemsListUl= document.querySelector('#items')
const productTitle= document.getElementById('product_title')
const productBrand= document.getElementById('product_brand')
const productPrice= document.getElementById('product_price')
const productWeight= document.getElementById('product-weight')
const productStockStatus= document.getElementById('product_stock_status')
const productSeller= document.getElementById('product_seller')
const productUse= document.getElementById('product_use')
const productimage= document.getElementById('product_image')
const productId= document.getElementById('product_id')
const postForm= document.getElementById('postForm')





// Fetch every item

function getAllItems(){
    fetch('http://localhost:3000/organicFarmInputs')
    .then(response => response.json())
    .then(renderAllItems)
}

function renderAllItems(items ) {
    itemsListUl.innerHTML= 'Click on item to view info!'
    items.forEach(item => {
        const itemsList = document.createElement('li')
        itemsList.style.cursor="pointer"
        itemsList.style.backgroundColor='green'
        itemsList.style.marginBottom='30 px'  
        itemsList.innerHTML = `${item.title}, ${item.brand}`
        itemsListUl.append(itemsList)

    // Add click event to display each item's info when clicked

    itemsList.addEventListener('click', () => displayInfo(item))    
        
    });
}



// Display film info

function displayInfo(item){
    title.innerText = item.title
    brand.innerText = item.brand
    price.innerText = item.price_ksh
    item_weight.innerText = item.item_weight_kgs
    items_in_stock.innerText = item.items_in_stock
    seller.innerText = item.Seller
    use.innerText= item.use
    image.src = item.image
}



// Add an event litesner to the post form

postForm.addEventListener('submit', function(e){
    e.preventDefault()

    // Fetch request for adding a new item using the post method


        fetch("http://localhost:3000/organicFarmInputs",{
            method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: productId,
        title: productTitle,
        brand: productBrand,
        item_weight_kgs: productWeight,
        price_ksh: productPrice,
        items_in_stock: productStockStatus,
        Seller: productSeller,
        use: productUse,
        image: productimage,
    
    
      }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        
        
    
    
    
})

// Add new item using the post method




function deleteItem(id) {
    fetch(`http://localhost:3000/organicFarmInputs/${id}`,{
        method: 'DELETE'
    })
    
    .then(response => response.json())
    .then(() => alert('Item deleted succesfully'))
    .catch(error => console.error(error))
}


getAllItems()
deleteItem()
