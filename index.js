
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
const deleteButton= document.getElementById('deleteButton')

let organicFarmInputs= []
let selectedItemId;



// Fetch all items

function getAllItems(){
    fetch('http://localhost:3000/organicFarmInputs')
    .then(response => response.json())
    .then(data => 
        {
            organicFarmInputs = data
            selectedItemId = String(organicFarmInputs[0].id)
            renderAllItems()
            setRamenDetailsById(selectedItemId)
        })
    
}
// Add individual items to the list
function renderAllItems() {
    itemsListUl.innerHTML= 'Click on item to view info!'
    organicFarmInputs.forEach(item => {
        const itemsList = document.createElement('li')
        itemsList.style.cursor="pointer"
        itemsList.style.backgroundColor='greenyellow'
        itemsList.style.marginBottom='30 px'  
        itemsList.innerHTML = `${item.title}, ${item.brand}`
        itemsListUl.append(itemsList)

    // Add click event to display each item's info when clicked

    itemsList.addEventListener('click', () => displayInfo(item))    
        
    });
}



// Display item info

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


// set details of selected item by id
function setItemsDetailsById(id){
    const selected = organicFarmInputs.find(item => item.id == id)
    title.innerText = selected.title
    brand.innerText = selected.brand
    price.innerText = selected.price_ksh
    item_weight.innerText = selected.item_weight_kgs
    items_in_stock.innerText = selected.items_in_stock
    seller.innerText = selected.Seller
    use.innerText= selected.use
    image.src = selected.image
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
        id: productId.value,
        title: productTitle.value,
        brand: productBrand.value,
        item_weight_kgs: productWeight.value,
        price_ksh: productPrice.value,
        items_in_stock: productStockStatus.value,
        Seller: productSeller.value,
        use: productUse.value,
        image: productimage.value,
    
    
      }),
    })
        .then(response => response.json())
        .then(data => {
            organicFarmInputs.push(data)
            displayInfo(data)
        })
        .catch(error => console.error(error))
        
        
 })




// Delete item
function deleteItem() {
    deleteButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/organicFarmInputs/${selectedItemId}`,{
        method: 'DELETE'
    })
    
   . then(response => {
        if (response) {
            organicFarmInputs = organicFarmInputs.filter(item => response.id != selectedItemId)
            selectedItemId = organicFarmInputs.id
            setItemDetailsById(selectedItemId)
            renderAllItems()
            alert('Item Deleted Successfully')
        }
    })
})
}


getAllItems()
deleteItem()
