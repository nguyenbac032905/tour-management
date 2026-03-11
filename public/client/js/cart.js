const fetchApiCart = () => {
    fetch("http://localhost:3000/cart/list-json", {
        method:"POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: localStorage.getItem("cart")
    })
        .then(res => res.json())
        .then(data => {
            const tableTourInfo = document.querySelector("[table-tour-info]");
            if(tableTourInfo){
                const tbodyTourInfo = tableTourInfo.querySelector("tbody");
                const htmlsArray = data.tours.map((tour,index) => {
                    return `<tr>
                        <td>${index}</td>
                        <td><img src=${tour.image} alt=${tour.slug} width="88"></td>
                        <td><a href="/tours/detail/${tour.slug}">${tour.title}</a></td>
                        <td>${tour.priceSpecial.toLocaleString()}₫</td>
                        <td><input type="number" name="quantity" value=${tour.quantity} min="1" tour-id=${tour.id} style="width:60px"></td>
                        <td>${tour.total.toLocaleString()}đ</td>
                        <td><button class="btn btn-sm btn-danger" btn-delete=${tour.id}> Xóa </button> </td>
                    </tr>`
                })
                const totalSpan = document.querySelector("[total-price]");
                totalSpan.innerHTML = `${data.total.toLocaleString()}đ`;
                tbodyTourInfo.innerHTML = htmlsArray;
                setButtonDelete();
                setInputQuantity();
            }
        })
};
const setButtonDelete = () => {
    const buttonsDelete = document.querySelectorAll("[btn-delete]");
    if(buttonsDelete.length > 0){
        buttonsDelete.forEach(button => {
            button.addEventListener("click", () => {
                const tourId = button.getAttribute("btn-delete");
                const cart = JSON.parse(localStorage.getItem("cart"));
                const newCart = cart.filter(item => item.tourId != tourId);
                localStorage.setItem("cart",JSON.stringify(newCart));
                fetchApiCart();
            })
        }) 
    }
};
const setInputQuantity = () => {
    const tableTourInfo = document.querySelector("[table-tour-info]");
    if(tableTourInfo){
        const inputsQuantity = tableTourInfo.querySelectorAll("input[name='quantity']");
        if(inputsQuantity.length > 0){
            inputsQuantity.forEach(input => {
                input.addEventListener("change", () => {
                    const tourId = input.getAttribute("tour-id");
                    const quantity = input.value;
                    const cart = JSON.parse(localStorage.getItem("cart"));
                    cart.forEach(item => {
                        if(item.tourId == tourId){
                            item.quantity = parseInt(quantity);
                        }
                    })
                    localStorage.setItem("cart", JSON.stringify(cart));
                    fetchApiCart();
                });
            })
        }
    }
};
fetchApiCart();
const formOrder = document.querySelector("[form-order]");
if(formOrder){
    formOrder.addEventListener("submit", (e) => {
        e.preventDefault();
        const fullName = e.target.elements["fullName"].value;
        const phone = e.target.elements["phone"].value;
        const note = e.target.elements["note"].value;
        const cart = JSON.parse(localStorage.getItem("cart"));

        const data = {
            info: {
                fullName: fullName,
                phone: phone,
                note: note
            },
            cart: cart
        };
        fetch("/order",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.code === 200){
                    localStorage.removeItem("cart");
                    window.location.href = `/order/success?ordercode=${data.orderCode}`;
                }else{
                    alert("Dat hang khong thanh cong");
                }
            })
    })
}
