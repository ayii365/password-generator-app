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
const passStrengthEl = document.getElementById("pass-strength");

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

function randFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]; // Returns a random element from the array, e.g. arr[7]
}


// Fisher-Yates shuffle
function shuffleArray(arr) {
    for (let i=0; i< arr.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i] ]
    }
    return arr;
}


function generatePassword(length, isNumbers, isSymbols) {
    if (!length){ // If no password length given, use default lenth of 15
        length = 15;
    }

    // If user selects all boxes (isNumbers and isSymbols is true), then the minimum length of
    // the password must be 3 (1 for alphabet, 1 for number, 1 for symbol)
    // so the program needs to automatically increase user provided length if the length is <3
    // to be able to satisfy all requirements
    const requiredCount = (isNumbers ? 1 : 0) + (isSymbols ? 1 : 0); //  = 2 if user selects numbers and symbols
    if (length < requiredCount) {
        length = requiredCount + 1 // plus 1 for alphabet char
    }

    // Build allowed pool once
    let allowed = [...characters.alphabet];
    if (isNumbers){
        allowed = allowed.concat(characters.numbers);
    }
    if (isSymbols){
        allowed = allowed.concat(characters.symbols);
    }

    let passwordChars = [];

    // Garuntee inclusion: 1 of each. 3 total
    passwordChars.push(randFrom(characters.alphabet)); // alphabet char

    if (isNumbers){
        passwordChars.push(randFrom(characters.numbers)); // numbers char
    }
    if (isSymbols){
        passwordChars.push(randFrom(characters.symbols)); // symbols char
    }

    // Fill the rest of the array to satisfy the required length
    while (passwordChars.length < length){
        passwordChars.push(randFrom(allowed));
    }

    // Shuffle array to avoid having the garunteed characters from always being at the start of array
    shuffleArray(passwordChars);

    // Return as a string
    return passwordChars.join("");
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