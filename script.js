const orderMessage = document.getElementById("order-message");
const loadMessage = document.getElementById("load-message");
const result = document.getElementById("result");
const Img = document.querySelector("img");

const API_KEY = "YOUR_API_KEY";

function showLoadMessage() {
    loadMessage.style.display = "block";
    orderMessage.textContent = "";
    result.style.display = "none";
    Img.src = "";
}

function showResultMessage(inputText, res) {
    Img.src = res.data[0].url;
    result.style.display = "flex";
    loadMessage.style.display = "none";
    orderMessage.textContent = inputText;
}

async function genImg() {
    const inputText = document.querySelector("input").value;
    showLoadMessage();
    var data ={
        "model": "image-alpha-001",
        "prompt": inputText,
        "num_images": 1
    }
    await fetch("https://api.openai.com/v1/images/generations",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res =>{
        showResultMessage(inputText, res);
    })
}

function handleKeyDown(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        genImg();
    }
}
