var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
    thumbs: {
    swiper: swiper,
    },
});
const alertAddCartSuccess = () => {
    const divAlertSuccess = document.querySelector("[alert-add-cart-success]");
    divAlertSuccess.classList.remove("alert-hidden");
    setTimeout(() => {
        divAlertSuccess.classList.add("alert-hidden");
    }, 3000);
    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        divAlertSuccess.classList.add("alert-hidden");
    })
};

//Cart
const cart = localStorage.getItem("cart");
if(!cart){
    localStorage.setItem("cart", JSON.stringify([]));
}
const formAddToCart = document.querySelector(".form-add-to-cart");
if(formAddToCart){
    formAddToCart.addEventListener("submit", (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target[0].value);
        const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
        
        if(quantity>0 && tourId){
            const cart = JSON.parse(localStorage.getItem("cart"));
            
            const existTour = cart.find(item => item.tourId == tourId);

            if(existTour){
                existTour.quantity += quantity;
            }else{
                cart.push({
                    quantity: quantity,
                    tourId: tourId
                });
            }
            
            localStorage.setItem("cart",JSON.stringify(cart));
            alertAddCartSuccess();
        }
    })
}