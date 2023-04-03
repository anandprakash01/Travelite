let searchBtn=document.querySelector('#search-btn');
let searchBar=document.querySelector('.search-bar-container');
let formBtn=document.querySelector('#login-btn');
let loginForm=document.querySelector('.login-form-container');
let formClose=document.querySelector('#form-close');
let menu=document.querySelector('#menu-bar');
let navbar=document.querySelector('.navbar');
let videoBtn=document.querySelectorAll('.vid-btn');


window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}


menu.addEventListener('click',()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});
searchBtn.addEventListener('click',()=>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
    
});
formBtn.addEventListener('click',()=>{
    loginForm.classList.toggle('active');
});
formClose.addEventListener('click',()=>{
    loginForm.classList.remove('active');
});
videoBtn.forEach(btn =>{
    btn.addEventListener('click',()=>{
      document.querySelector('.controls .active').classList.remove('active');
      btn.classList.add('active'); 
      let src = btn.getAttribute('data-src');
      document.querySelector('#video-slider').src = src;
    });

});


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

let slideWidth;
// const slideWidth=slides[index].offsetWidth;

function getSlideWidth(){
    slideWidth=slides[index].clientWidth;
}
getSlideWidth();
window.addEventListener("resize",getSlideWidth);


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