let global = [];
/* all data fetch */
const allFetchData = (limitCard) => {
    spinner(true)
    const URL = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(URL)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data.tools)
            global = json.data.tools
            // global.push(`${json.data.tools}`)
            showAllDataCard(json.data.tools, limitCard)
        })
        
        
}

/* show all data card */
const showAllDataCard = (cards,limitCard) => {
    
    document.getElementById('cards-container').innerHTML = ''
    // document.getElementById('cards-container');
    

    const showAll = document.getElementById('see-more-btn');
    if (cards.length > 6 && limitCard) {
        cards = cards.slice(0, 6);
        showAll.classList.remove('d-none')
    } 
    else {
        showAll.classList.add('d-none')
    }
    
    cards.forEach(card => {
        
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML += `
        <div class="card w-fll bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${card.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-2xl">Features</h2>
          <p class="font-semibold text-gray-400">1. ${card.features[0]?card.features[0] : "No data found" }</p>
          <p class="font-semibold text-gray-400">2. ${card.features[1]?card.features[1] : "No data found"}</p>
          <p class="font-semibold text-gray-400">3. ${card.features[2]?card.features[2] : "No data found"}</p>
          
          <div class="card-footer flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-semibold">${card.name}</h2>
                <div class="flex items-center my-2">
                    <i class="fa-regular fa-calendar"></i>
                    <p class="mx-2">${card.published_in}</p>
                </div>
            </div>
            <div>
            
            <label onclick="showModalCard('${card.id}')" for="my-modal-3" class="btn"><i class="fa-solid fa-arrow-right"></i></label>
            </div>
          </div>
        </div>
      </div>
        `
    })
    spinner(false)
}

/* show modal card */
const showModalCard = (cardId) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${cardId}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            showModalDetails(data);
        })
}


const showModalDetails = (modalDetails) => {
    const modalContainer = document.getElementById('modal-container');
    document.getElementById('modal-container').innerHTML = ''
    modalContainer.innerHTML += `
    <div class="card w-full bg-red-100 shadow-xl">
    <div class="card-body items-center text-center">
        <h2 class="card-title">${modalDetails.data.description}</h2>
        <div class="flex justify-content-center gap-1 w-full">
            <div class="bg-gray-100 rounded">
                <p class="text-green-500">${(modalDetails.data.pricing === null) || (modalDetails.data.pricing[0].price === "No cost")  ? "Free Of cost/basic":modalDetails.data.pricing[0].price}</p>
            </div>
            <div class="bg-gray-100 rounded">
                <p class="text-orange-500">${(modalDetails.data.pricing === null) || (modalDetails.data.pricing[1].price === "No cost") ? "Free Of cost/basic": modalDetails.data.pricing[1].price}</p>
            </div>
            <div class="bg-gray-100 rounded">
                <p class="text-red-500">${modalDetails.data.pricing === null ?"Free of Cost /Enterprise": modalDetails.data.pricing[2].price}</p>
            </div>
        </div>
        <div class="flex justify-between gap-4">
            <div>
                <h2>Features</h2>
                <p class="font-semibold text-gray-400">1.${modalDetails.data.features?modalDetails.data.features[1].feature_name : 'no name'} </p>
                <p class="font-semibold text-gray-400">2.${modalDetails.data.features?modalDetails.data.features[2].feature_name : 'no name'} </p>
                <p class="font-semibold text-gray-400">3.${modalDetails.data.features? modalDetails.data.features[3].feature_name : 'no data' } </p>
            </div>
            <div>
                <h2>Integration}</h2>
                <p class="font-semibold text-gray-400">1.${(modalDetails.data.integrations === null)||(modalDetails.data.integrations[0] === undefined)?'no data':modalDetails.data.integrations[0]} </p>
                <p class="font-semibold text-gray-400">2.${(modalDetails.data.integrations===null)||(modalDetails.data.integrations[1] === undefined) ?'no data':modalDetails.data.integrations[1]} </p>
                <p class="font-semibold text-gray-400">3.${(modalDetails.data.integrations === null)||(modalDetails.data.integrations[2] === undefined)?'no data':modalDetails.data.integrations[2]} </p>
            </div>
        </div>
    </div>
</div>
<div class="card w-full bg-base-100 shadow-xl">
    <div class="px-10 pt-10">
    ${showBadge(modalDetails.data.accuracy.score)}
    <figure><img src="${modalDetails.data.image_link[0]}" alt="" /></figure>
    </div>
    <div class="card-body items-center text-center">
        <h4 class="text-2xl font-semibold">${modalDetails.data.input_output_examples === null ? "Can you give any example": modalDetails.data.input_output_examples[0].input}</h4>
        <p>${modalDetails.data.input_output_examples === null ? "No! Not Yet! Take a break!!!" : modalDetails.data.input_output_examples[0].output}</p>
    </div>
</div>
    `
    
}


/* spinner function */
const spinner = (isLoading) => {
    const toggleSpinner = document.getElementById('spinner');
    if (isLoading) {
        toggleSpinner.classList.remove('d-none')
    } else {
        toggleSpinner.classList.add('d-none')
    }
}

document.getElementById('see-more-btn').addEventListener('click', function () {
    // const totalData = global.length
    // console.log(totalData);
    allFetchData()
    // console.log(global.length);
    // let sortValue = global.sort(sorting);
    // showAllDataCard(sortValue,global.length)
})


/* show badge function */
const showBadge = (score) =>{
    if(!score){
        return ''
    }
    return `
    <div id="badge" class="badge badge-secondary absolute top-0 right-0">${score * 100}%Accuracy</div>
    
    `
}


const sorting = (a,b) =>{
    const x = new Date(a.published_in)
    console.log(x)
    const y = new Date(b.published_in)
    console.log(y);
    if(x > y){
        return 1
    }else if( x < y ){
        return -1
    }else{
        return 0
    }
}
// console.log(global);


document.getElementById('sorting-btn').addEventListener('click', function(){
    // console.log(global.sort(sorting));
    // spinner(true)
    // console.log(global.length);
    // global.sort(function(a, b){return b - a})
    // allFetchData(sortValue.length)
    // console.log(global);
    let sortValue = global.sort(sorting);
    // console.log(sortValue.length);
    // console.log(sortValue.length);
    showAllDataCard(sortValue, sortValue.length)
})


allFetchData(6)