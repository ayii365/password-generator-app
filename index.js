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
    const lengthFinal = getFinalLength(length, isNumbers, isSymbols);

    renderPassword(lengthFinal, isNumbers, isSymbols);

    // Printing the status of the password
    let statusEl = document.getElementById("pass-status");
    let status = getPasswordStatus(lengthFinal, isNumbers, isSymbols);
    statusEl.textContent = "Password Strength: " + status;

});

function getPasswordStatus(len, isNum, isSymb) {
    let points = 0;

    if (len <=5) { // If length is 5 or below
        points += 1;
    } else if (len > 5 && len <=9) { // If length is 5 to 9
        points += 2;
    } else { // If length is 10 or more
        points += 3
    }

    // If isNum
        // 1 else 0
    if (isNum) {
        points += 1;
    }

    // If isSymb
        // 1 else 0
    if (isSymb) {
        points += 1;
    }

    // ----- Points System
    // max points = 5
    // min points = 1
    if (points === 1) {
        return "Very Weak";
    } else if (points === 2) {
        return "Weak";
    } else if (points === 3) {
        return "Good";
    } else if (points === 4) {
        return "Strong";
    } else {
        return "Very Strong";
    }

}

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
    // the password must be 3 (1 for alphabet (default), 1 for number, 1 for symbol)
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

function getFinalLength(length, isNumbers, isSymbols) {

    // Default length
    if (!length) {
        length = 15;
    }

    // Count how many extra char types required
    const requiredFlags = [isNumbers, isSymbols];
    let requiredCount = 0;

    for (let i =0; i< requiredFlags.length; i++) {
        if (requiredFlags[i] === true) {
            requiredCount++;
        }
    }

    // +1 because alphabet is always required
    const minimumLength = requiredCount + 1;

    if (length < minimumLength) {
        length = minimumLength;
    }

    return length;
}

function renderPassword(length, isNumbers, isSymbols) {
    const passSlotEl = document.querySelectorAll(".pass-slot");
    passSlotEl.forEach( slot => {
        slot.textContent = generatePassword(length, isNumbers, isSymbols);
    });
    
}

/* Copy on click functionality */
function showStatus(msg) {
    document.getElementById("copy-status").textContent = msg;
}

async function copyText(el) {

    // Extract the textContent
    const text = el.textContent.trim(); //trim() removes leading and trailing whitespaces

    // There is no text to copy
    if( !text) { 
        return;
    }

    // Copy the text to clipboard
    try {
        await navigator.clipboard.writeText(text);
        showStatus(`Copied to clipboard`);
    } catch (e) {
        showStatus(`Copy failed`)
    }
    
}