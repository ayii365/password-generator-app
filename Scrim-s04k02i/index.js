const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


/* Background Mode */
const containerEl = document.querySelector(".container");

function changeBackgroundMode() {
    containerEl.classList.toggle("light");
}


/* Password Generation */

// 1. Generate 15 random numbers from 0 to array length.
        // example generation --> 1, 24, 9, 14, 2, 3, ..., 35 = randNums[]

/* 2. Create an array of lenth 15 and add the corresponding indexes from the previously generated numbers
        examplle: 
            password[0] = characters[ randNums[0] ] 
            password[1] = characters[ randNums[1] ] 
            ...
            password[14] = characters[ randNums[14] ] 

*/

function genRandNums() {
    let randNums = [];
    for (let i=0; i<15; i++){
        randNums[i] = Math.floor(Math.random() * characters.length)
    }
    return randNums;
}

function generatePassword() {
    const randNums = genRandNums();

    let password = "";
    for (let i=0; i<15; i++){
        password += characters[ randNums[i] ]
    }
    return password;
}

function renderPassword() {
    const passSlotEl = document.querySelectorAll(".pass-slot");
    passSlotEl.forEach( slot => {
        slot.textContent = generatePassword();
    });
    
}

console.log(generatePassword())