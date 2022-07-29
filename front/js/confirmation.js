const orderId = window.location.search;
const urlSearchParams = new URLSearchParams(orderId);
const _id = urlSearchParams.get("orderId")

document.getElementById("orderId").innerText = _id;
localStorage.clear();

