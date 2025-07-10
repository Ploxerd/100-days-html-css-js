const uppercaseBtn = document.getElementById('uppercase');
const lowercaseBtn = document.getElementById('lowercase');
const numbersBtn = document.getElementById('numbers');
const symbolsBtn = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const display = document.getElementById('password')
const passLength = document.getElementById('password-length');
const currentLength = document.getElementById('current-length');
const refreshBtn = document.getElementById('refresh-button');
const copyBtn = document.getElementById('copy-button');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
currentLength.textContent = passLength.value;

let isUpperCase = false;
let isLowerCase = false;
let isNumbers = false;
let isSymbols = false;

const condition = {
    'isUpperCase': "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    'isLowerCase': "abcdefghijklmnopqrstuvwxyz",
    'isNumbers': "0123456789",
    'isSymbols': '!@#$%^&*()_+-=[]{}|;:",.<>?/\\\`'
}

function generatePassword() {
    let chars = '';
    if (isUpperCase) chars += condition.isUpperCase;
    if (isLowerCase) chars += condition.isLowerCase;
    if (isNumbers) chars += condition.isNumbers;
    if (isSymbols) chars += condition.isSymbols;
    if (chars === '') return alert('Please include something')

    let password = '';
    for (let i = 0; i < passLength.value; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return display.textContent = password
}

function includeItem() {
    uppercaseBtn.checked ? isUpperCase = true : isUpperCase = false;
    lowercaseBtn.checked ? isLowerCase = true : isLowerCase = false;
    numbersBtn.checked ? isNumbers = true : isNumbers = false;
    symbolsBtn.checked ? isSymbols = true : isSymbols = false;
}

checkBoxes.forEach(el => {
    el.addEventListener('input', () => {
        el.checked ? el.parentElement.style.opacity = '100%' : el.parentElement.style.opacity = '25%'
    })
})

refreshBtn.addEventListener('click', () => {
    includeItem()
    generatePassword()
})

copyBtn.addEventListener('click', () => {
    if (isUpperCase || isLowerCase || isNumbers || isSymbols) {
        navigator.clipboard.writeText(display.textContent);
        alert('Password Copied!');
    }
    else {
        alert('Please include something')
    }
})

passLength.addEventListener('input', () => {
    currentLength.textContent = passLength.value
})

generateBtn.addEventListener('click', () => {
    includeItem()
    generatePassword()
})

// redo all this and gotta apply them individually so their condition also appliesn