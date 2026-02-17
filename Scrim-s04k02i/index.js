const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


/* Background Mode */
const containerEl = document.querySelector(".container");

function changeBackgroundMode() {
    containerEl.classList.toggle("light");
}

/* Password Generation */
const form = document.getElementById("user-input-form");

form.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Collect all form data using the FormData object
    const formData = new FormData(form);

    // Convert FormData into a plain javascript object
    const dataObject = Object.fromEntries(formData.entries());

    // Generate password with the given password length
    renderPassword(dataObject.userPassLen);
});

function genRandNums(length) {
    let randNums = [];
    for (let i=0; i<length; i++){
        randNums[i] = Math.floor(Math.random() * characters.length)
    }
    return randNums;
}

function generatePassword(length) {
    if (!length){ // If no password length given, use default lenth of 15
        length = 15;
    }
    const randNums = genRandNums(length);

    let password = "";
    for (let i=0; i<length; i++){
        password += characters[ randNums[i] ]
    }
    return password;
}

function renderPassword(length) {
    const passSlotEl = document.querySelectorAll(".pass-slot");
    passSlotEl.forEach( slot => {
        slot.textContent = generatePassword(length);
    });
    
}

/* Copy on click functionality */
function copyText(el) {

    // Extract the textContent
    const text = el.textContent.trim(); //trim() removes leading and trailing whitespaces

    // There is no text to copy
    if( !text) { 
        return;
    }

    // Copy the text to clipboard
    navigator.clipboard.writeText(text);

    // Alert the user that the text has been copied
    alert("Copied text: " + text);
}