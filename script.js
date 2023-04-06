// async function genImg(){
//     const orderMessage = document.getElementById("order-message");
//     const loadMessage = document.getElementById("load-message");
//     const inputText = document.querySelector("input").value;
//     const result = document.getElementById("result");
//     const Img = document.querySelector("img");

//     orderMessage.style.display = "none";
//     loadMessage.style.display = "block";
//     result.style.display = "none";
//     Img.src = "";

//     var data ={
//         "model": "image-alpha-001",
//         "prompt": inputText,
//         "num_images": 1
//     }
//     await fetch("https://api.openai.com/v1/images/generations",{
//         method: "POST",
//         headers:{
//             "Content-Type": "application/json",
//             "Authorization": "Bearer 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" // API KEY 키 입력
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data =>{
//         Img.src = data.data[0].url;
//         result.style.display = "flex";
//         loadMessage.style.display = "none";
//         orderMessage.textContent = inputText;
//         orderMessage.style.display = "block";
//     })
// }

// function handleKeyDown(event){
//     if (event.keyCode === 13){ // Enter key code
//         event.preventDefault();
//         genImg();
//     }
// }

const orderMessage = document.getElementById("order-message");
const loadMessage = document.getElementById("load-message");
const inputText = document.querySelector("input");
const result = document.getElementById("result");
const Img = document.querySelector("img");

const API_KEY = "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";

function showLoadMessage() {
  orderMessage.style.display = "none";
  loadMessage.style.display = "block";
  result.style.display = "none";
  Img.src = "";
}

function showResultMessage(inputText) {
  result.style.display = "flex";
  loadMessage.style.display = "none";
  orderMessage.textContent = inputText;
  orderMessage.style.display = "block";
}

async function genImg() {
  showLoadMessage();

  const prompt = inputText.value;
  const data = {
    model: "image-alpha-001",
    prompt,
    num_images: 1,
  };

  try {
    const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    const imgUrl = responseData.data[0].url;

    Img.src = imgUrl;
    showResultMessage(prompt);
  } catch (error) {
    console.error("Error:", error);
  }
}

function handleKeyDown(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        genImg();
    }
}