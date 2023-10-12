
const title= document .getElementById('title')
const brand= document .getElementById('brand')
const price= document .getElementById('price')
const item_weight= document .getElementById('itemWeight')
const items_in_stock= document .getElementById('itemsstock')
const seller = document.getElementById('seller')
const use= document.getElementById('itemUse')
const image= document.getElementById('image')
const itemsListUl= document.getElementById('items')
const productTitle= docunt.getElementById('')
const productBrand= docunt.getElementById('')
const productPrice= docunt.getElementById('')
const productWeight= docunt.getElementById('')
const productStockStatus= docunt.getElementById('')
const productSeller= docunt.getElementById('')
const productUse= docunt.getElementById('')





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
        itemsList.innerText = `${item.title}, ${item.brand}`
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






getAllItems()
