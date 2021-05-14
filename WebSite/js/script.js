const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children)
const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");
const dotsNavs = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNavs.children);

const slidewidth = slides[0].getBoundingClientRect().width;

//console.log(slidewidth)
 

// muda o slide pro proximo
const setSlidePosition = (slide, index)=>{
    slide.style.left = slidewidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = ( track, currentSlide,targetSlide)=>{
    track.style.transform = `translateX(-` + targetSlide.style.left +`)`;
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}
const updateDots = (currentDot, targetDot) =>{
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}
const hideShowArrows = (slides,prevButton,nextButton,targetIndex) =>{
    if(targetIndex === 0){
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    }else if(targetIndex === slides.length - 1 ){
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    }else{
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
}
//quando eu clico esquerda move pra esquerda
prevButton.addEventListener("click", e =>{
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNavs.querySelector(".current-slide")
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide )
    moveToSlide(track,currentSlide,prevSlide);
    updateDots(currentSlide,prevSlide);
    updateDots(currentDot,prevDot);
    hideShowArrows(slides,prevButton,nextButton,prevIndex);
});

// quando eu clico direita move direita
nextButton.addEventListener("click", e =>{
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const amoutToMove = nextSlide.style.left;
    const currentDot = dotsNavs.querySelector(".current-slide")
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide )
    track.style.transform = `translateX(-` + amoutToMove +`)`;
    currentSlide.classList.remove("current-slide");
    nextSlide.classList.add("current-slide");
    moveToSlide(track, currentSlide,nextSlide)
    updateDots(currentDot,nextDot);
    hideShowArrows(slides,prevButton,nextButton,nextIndex);
});

//quando clico no nav ele vai para o indicador

dotsNavs.addEventListener("click", e =>{
    const targetDot = e.target.closest("button");
    if(!targetDot) return;
    const currentSlide = track.querySelector(".current-slide")
    const currentDot = dotsNavs.querySelector(".current-slide")
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide,targetSlide);
    updateDots(currentDot,targetDot);
    hideShowArrows(slides,prevButton,nextButton,targetIndex);
})