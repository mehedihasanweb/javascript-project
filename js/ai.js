/* all data fetch */
const allFetchData = (limitCard) =>{
    spinner(true)
    const URL = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(URL)
    .then(res => res.json())
    .then(json => showAllDataCard(json.data.tools, limitCard))
}


/* show all data card */
const showAllDataCard = (cards, limitCard) =>{
    // console.log(cards)
    document.getElementById('cards-container').innerHTML= ''
    // document.getElementById('cards-container');
    const showAll = document.getElementById('see-more-btn');
    // cards = cards.slice(0, 6);

    if(cards.length > 6 && limitCard){
        cards = cards.slice(0, 6);
        showAll.classList.remove('d-none')
    }else{
        showAll.classList.add('d-none')
    }

    cards.forEach(card =>{
        console.log(card);
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML += `
        <div class="card w-fll bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${card.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-2xl">Features</h2>
          <p class="font-semibold text-gray-400">1. ${card.features[0]}</p>
          <p class="font-semibold text-gray-400">2. ${card.features[1]}</p>
          <p class="font-semibold text-gray-400">3. ${card.features[2]}</p>
          
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


const spinner = (isLoading) =>{
    const toggleSpinner = document.getElementById('spinner');
    if(isLoading){
        toggleSpinner.classList.remove('d-none')
    }else{
        toggleSpinner.classList.add('d-none')
    }
}


const showModalCard = (cardId) =>{
    console.log(cardId);
}

/* modal close function */
// document.getElementById('close-btn').addEventListener('click', function(e){
//    e.target.parentNode.remove(e.target.parentNode)
// //    document.getElementById('modal-card').classList.add('d-none')
//    allFetchData()
// })



document.getElementById('see-more-btn').addEventListener('click', function(){
    allFetchData()
})

allFetchData(6)
