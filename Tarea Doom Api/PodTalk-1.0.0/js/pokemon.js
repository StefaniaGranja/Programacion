const getPokemon = async(offset = 0, limit= 5)=>{

    let pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    pokemons = await pokemons.json()
    if(pokemons.results){
        for(let index =0; index < pokemons.results.length; index++){
             let pokedata = await fetch(pokemons.results[index].url)
             pokemons.results[index].data = await pokedata.json()
         }
    }
    // console.log(pokemons);
    return pokemons
}
    

 const setPokemonAleatorioDOM = (AleatorioPokemon) =>{
    let html = ''
    let $divAleatorio = document.querySelector('.aleatorio')
     $($divAleatorio).trigger('destroy.owl.carousel')
//     $divAleatorio.innerHTML = html
//     console.log(AleatorioPokemon)

    for (let i =0; i<AleatorioPokemon.results.length; i++){
        html = html + `
            <div class="owl-carousel-info-wrap item">
                <img src="${AleatorioPokemon.results[i].data.sprites.front_default}"
                    class="owl-carousel-image img-fluid" alt="">

                <div class="owl-carousel-info">
                    <h4 class="mb-2">${AleatorioPokemon.results[i].name}</h4>

                    <span class="badge">${AleatorioPokemon.results[i].data.species.name}</span>
                </div>
            </div>
        `
     }
     $divAleatorio.innerHTML = html
     $($divAleatorio).owlCarousel({ 
         center: true,
         loop: true,
         margin: 30,
         autoplay: true,
         responsiveClass: true,
         responsive:{
             0:{
                 items: 2,
             },
             767:{
                 items: 3,
             },
             1200:{
                 items: 4,
             }
         }
     })
 }

window.addEventListener('load', async function(){
    // const waitForElement = async () =>{
    //     const $divAleatorio = document.querySelector('.aleatorio')
    //     if($divAleatorio){
    //         // elemento encontrado, proceda
             let min = 1
             let max = 1282
             let aleatorio = Math.floor(Math.random()*(max - min)) + min
             let AleatorioPokemon = await getPokemon(aleatorio,10)
             setPokemonAleatorioDOM(AleatorioPokemon)
    //     }else{
    //         setTimeout(waitForElement, 100) 
    //     }
    // }
    // waitForElement()


})
