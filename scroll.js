//Prendo dal DOM il mio scrollIndicator
const scrollIndicator = document.getElementById("scrollIndicator");

//Attraverso un EventListner posso capire quando l'utente scrolla
//E quindi allo scroll faccio eseguire => qualcosa
window.addEventListener("scroll",()=>{
    //Con questa operazione ottengo l'altezza della pagina
    const scrollLabelHeight = document.documentElement.scrollHeight - window.innerHeight;

    //Ottengo quanto l'utente ha già scrollato
    const currentScrolled = window.scrollY;

    //Il metodo Ceil restituisce l'intero più grande più vicino.
    //Ex: Math.ceil(7.3)--->return 8
    
    //Quindi faccio il rapporto tra la quantità scrollata con
    //l'altezza della pagina in percentuale.
    const scrollIndicatorWidth = Math.ceil(currentScrolled/scrollLabelHeight*100);

    scrollIndicator.style.width=scrollIndicatorWidth+"%";
})