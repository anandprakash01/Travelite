



// ---------------------------auto slide for brands------------------



const brandRow=document.querySelector(".brandRow");
const brands=document.getElementsByClassName("brand-slide");


let idxBrand=1;
let widthBrand;
function brandWidth(){
    // widthBrand=brands[0].offsetWidth;
    widthBrand=brands[0].clientWidth;
}
brandWidth();
window.addEventListener("resize",brandWidth);
brandRow.style.transform="translateX(" + (-widthBrand*idxBrand)+ "px)";

function nextBrand(){
    if(idxBrand>=brands.length-1) return;
    brandRow.style.transition="transform 0.4s";
    idxBrand++;
    brandRow.style.transform="translateX(" + (-widthBrand*idxBrand)+ "px)";
}

// loop
brandRow.addEventListener('transitionend', ()=>{
    // return to first slide from last
    if(brands[idxBrand].id==="first-slide"){
        brandRow.style.transition="none";
        idxBrand=brands.length-idxBrand;
        brandRow.style.transform="translateX(" + (-widthBrand*idxBrand)+ "px)";
    }
    
});

setInterval(nextBrand,1000);