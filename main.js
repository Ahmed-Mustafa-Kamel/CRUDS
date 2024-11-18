let title = document.getElementById('title');
let price = document.getElementById('Price');
let ads = document.getElementById('ads');
let tax = document.getElementById('tax');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let mood = 'create';
let tmp ;

// get total
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +tax.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background ='#050';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#ebcb14';
    }
}


//create product

let PData;
if(localStorage.product != null)
{
    PData = JSON.parse(localStorage.product)
}
else{
    PData = [];
}



submit.onclick = function ()
{
    let NewPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != ''
    && price.value !='' 
    && category.value !='' 
    && NewPro.count <101){

    if (mood === 'create'){
        if(NewPro.count > 1){
            for(i=0;i <NewPro.count;i++){
                PData.push(NewPro);
            }
        }else{
            PData.push(NewPro);
        }
    }else{
        PData [tmp] =NewPro;
        mood ='create';
        submit.innerHTML='create';
        count.style.display = 'block';
    }
    clearData ();

    }

    //save localStorage
    localStorage.setItem('product',JSON.stringify(PData));

    showData();
}

//clear inputs  
function clearData (){
    title.value ='';
    price.value ='';
    tax.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
}

//read
function showData()
{
    let table ='';
    for(let i = 0;i < PData.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${PData[i].title}</td>
        <td>${PData[i].price}</td>
        <td>${PData[i].tax}</td>
        <td>${PData[i].ads}</td>
        <td>${PData[i].discount}</td>
        <td>${PData[i].total}</td>
        <td>${PData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
        
    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let deletebtn =document.getElementById('deleteAll');
    if(PData.length > 0){
        deletebtn.innerHTML = `
        <button onclick='deleteAll()'>Delete  All(${PData.length})</button>
        `
    }else{
        deletebtn.innerHTML =''
    }
    getTotal();
}
showData();


//delete
function deleteData(i){
    PData.splice(i,1);
    localStorage.product = JSON.stringify(PData);
showData();
}
function deleteAll(){
    localStorage.clear();
    PData.splice(0);
    showData();
}
    //update
    function updateData(i){
        title.value = PData[i].title;
        price.value = PData[i].price;
        tax.value = PData[i].tax;
        ads.value = PData[i].ads;
        discount.value = PData[i].discount;
        total.value = PData[i].total;
        category.value = PData[i].category;
        getTotal();
        count.style.display ='none';
        submit.innerHTML = 'Update Data';
        mood = 'update';
        tmp = i;
        scroll({top :0,
            behavior:"smooth",
        })
    }
//search
let searchMood = 'title';

function getSearch (id)
{
    let search = document.getElementById('search');
    if( id =='Stitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else
    {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData(); 
}


function searchData(value){
    let table = '';
    if(searchMood =='title')
    {

        for (let i = 0; i < PData.length; i++){
            if(PData[i].title.includes(value.toLowerCase())){
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${PData[i].title}</td>
                    <td>${PData[i].price}</td>
                    <td>${PData[i].tax}</td>
                    <td>${PData[i].ads}</td>
                    <td>${PData[i].discount}</td>
                    <td>${PData[i].total}</td>
                    <td>${PData[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                    
                </tr>`;
            }
        }   
    }




    else{
        for (let i = 0; i < PData.length; i++){
            if(PData[i].category.includes(value.toLowerCase())){
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${PData[i].title}</td>
                    <td>${PData[i].price}</td>
                    <td>${PData[i].tax}</td>
                    <td>${PData[i].ads}</td>
                    <td>${PData[i].discount}</td>
                    <td>${PData[i].total}</td>
                    <td>${PData[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">Delete</button></td>
                    
                </tr>`;
            }
        }   
    }
    
    document.getElementById('tbody').innerHTML = table;
}
