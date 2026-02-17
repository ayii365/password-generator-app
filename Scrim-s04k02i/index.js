const characters = {
    allCharacters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"],
    alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    symbols: ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
}

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
    const length = parseInt(dataObject.userPassLen); // Transform the length into an integer, as it is a string by default



    const isNumbers = checkboxStatus(dataObject.isNum);
    const isSymbols = checkboxStatus(dataObject.isSymb);

    renderPassword(length, isNumbers, isSymbols);

    console.log("The value of isNumbers is: " + isNumbers);
    console.log("The value of isSymbols is: " + isSymbols);
});

function checkboxStatus(input) {
    if (input === "on"){ // Checkbox was ticked
        return true;
    } else { // Checkbox not ticked
        return false;
    }
}

function genRandNums(length, isNumbers, isSymbols) {
    let randNums = [];

    if (isNumbers && isSymbols) {
        for (let i=0; i<length; i++){
            randNums[i] = Math.floor(Math.random() * characters.allCharacters.length)
        }
    } else if (isNumbers && !isSymbols) {
        for (let i=0; i<length; i++){
            const totalCharacters = [...characters.alphabet, ...characters.numbers]
            randNums[i] = Math.floor(Math.random() * totalCharacters.length)
        }
    } else if (!isNumbers && isSymbols) {
        for (let i=0; i<length; i++){
            const totalCharacters = [...characters.alphabet, ...characters.symbols]
            randNums[i] = Math.floor(Math.random() * totalCharacters.length)
        }
    } else {
        for (let i=0; i<length; i++){ // Alphabet only, no numbers and no symbols
            randNums[i] = Math.floor(Math.random() * characters.alphabet.length)
        }
    }

    return randNums;
}

function generatePassword(length, isNumbers, isSymbols) {
    if (!length){ // If no password length given, use default lenth of 15
        length = 15;
    }
    const randNums = genRandNums(length, isNumbers, isSymbols);

    let password = "";

    if (isNumbers && isSymbols) {
        for (let i=0; i<length; i++){ // All characters (numbers and symbols)
            password += characters.allCharacters[ randNums[i] ]
        }
    } else if (isNumbers && !isSymbols) { // Numbers only
        for (let i=0; i<length; i++){
            const totalCharacters = [...characters.alphabet, ...characters.numbers]
            password += totalCharacters[ randNums[i] ]
        }
    } else if (!isNumbers && isSymbols) {
        for (let i=0; i<length; i++){ // Symbols only
            const totalCharacters = [...characters.alphabet, ...characters.symbols]
            password += totalCharacters[ randNums[i] ]
        }
    } else {
        for (let i=0; i<length; i++){ // Alphabet only, no numbers and no symbols
            password += characters.alphabet[ randNums[i] ]
        }
    }

    return password;
}

function renderPassword(length, isNumbers, isSymbols) {
    const passSlotEl = document.querySelectorAll(".pass-slot");
    passSlotEl.forEach( slot => {
        slot.textContent = generatePassword(length, isNumbers, isSymbols);
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