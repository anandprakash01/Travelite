
const slideRow = document.querySelector('.slider-row');
const prevBtn=document.querySelector(".prev");
const nextBtn=document.querySelector(".next");
const interval = 3000;

let slides=document.querySelectorAll(".slide");
let index = 1;
let slideID;

const firstClone=slides[0].cloneNode(true);
const lastClone=slides[slides.length-1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slideRow.append(firstClone);
slideRow.prepend(lastClone);

const slideWidth=slides[index].clientWidth;
// const slideWidth=slides[index].offsetWidth;

slideRow.style.transform=`translateX(${-slideWidth*index}px)`;


const startSlide= ()=>{
    slideID= setInterval(()=>{
        moveToNextSlide();
    },interval);
}
const getSlides = () => document.querySelectorAll('.slide');

slideRow.addEventListener("transitionend",()=>{
    slides=getSlides();
    dotsLabel();
    if(slides[index].id===firstClone.id){
        slideRow.style.transition="none";
        index=1;
        slideRow.style.transform=`translateX(${-slideWidth*index}px)`;
    }
    if(slides[index].id===lastClone.id){
        slideRow.style.transition="none";
        index=slides.length-2;
        slideRow.style.transform=`translateX(${-slideWidth*index}px)`;
    }
})
const moveToNextSlide=()=>{
    slides=getSlides();
    if(index>=slides.length-1) return;
    index++;
    slideRow.style.transform=`translateX(${-slideWidth*index}px)`;
    slideRow.style.transition=".7s";
    dotsLabel("+");
}
const moveToPreviousSlide=()=>{
    slides=getSlides();
    if(index<=0) return;
    index--;
    slideRow.style.transform=`translateX(${-slideWidth*index}px)`;
    slideRow.style.transition=".7s";
    dotsLabel("-");
}
//on mouse over
slideRow.addEventListener("mouseenter",()=>{
    clearInterval(slideID);
});
slideRow.addEventListener("mouseleave",startSlide);
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);
startSlide();


//dots
let dots=document.getElementsByClassName("dot");
function dotsLabel(sign){
    if(index>dots.length){
        dots[dots.length-1].className=dots[dots.length-1].className.replace("active","");
        dots[0].classList.add("active");
        return;
    }
    if(index<=0){
        dots[0].className=dots[0].className.replace("active","");
        dots[dots.length-1].classList.add("active");
        return;
    }
    for(let i=0;i<dots.length;i++){
        dots[i].className=dots[i].className.replace("active","");
    }
    
    dots[index-1].classList.add("active");
}




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

setInterval(nextBrand,3000);