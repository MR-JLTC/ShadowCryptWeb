function processCipher() {
    const operation = document.getElementById('operation').value;
    const cipherType = document.getElementById('cipherType').value;
    const inputText = document.getElementById('inputText').value;
    const key = document.getElementById('key').value;
    let output = '';
    const errorMessageElement = document.getElementById('error-message');

    // Clear previous error message
    errorMessageElement.style.display = 'none';
    errorMessageElement.innerText = '';

    // Check if the key is numeric for Shift and Shift ASCII ciphers
    if ((cipherType === 'shift' || cipherType === 'shift-ascii') && isNaN(key)) {
        errorMessageElement.innerText = "Key must be a numeric value for Shift Ciphers.";
        errorMessageElement.style.display = 'block'; // Show error message
        return;
    }

    // Check if the key is alphabetic for Vigenère cipher
    if (cipherType === 'vigenere' && !/^[a-zA-Z]+$/.test(key)) {
        errorMessageElement.innerText = "Key must consist of alphabetic characters only for Vigenère Cipher.";
        errorMessageElement.style.display = 'block'; // Show error message
        return;
    }

    if (cipherType === 'shift') {
        const shiftKey = parseInt(key);
        if (operation === 'encrypt') {
            output = shiftCipher(inputText, shiftKey);
        } else {
            output = shiftCipher(inputText, -shiftKey); // Decrypt by shifting in the opposite direction
        }
    } else if (cipherType === 'shift-ascii') {
        const shiftKey = parseInt(key);
        if (operation === 'encrypt') {
            output = shiftCipherASCII(inputText, shiftKey);
        } else {
            output = shiftCipherASCII(inputText, -shiftKey); // Decrypt by shifting in the opposite direction
        }
    } else if (cipherType === 'vigenere') {
        if (operation === 'encrypt') {
            output = vigenereCipher(inputText, key);
        } else {
            output = vigenereDecipher(inputText, key);
        }
    } else if (cipherType === 'vigenere-ascii') {
        if (operation === 'encrypt') {
            output = vigenereCipherASCII(inputText, key);
        } else {
            output = vigenereDecipherASCII(inputText, key);
        }
    }

    document.getElementById('output').innerText = output;
}

function shiftCipher(input, key) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        if (char >= 65 && char <= 90) {
            output += String.fromCharCode(((char - 65 + key) % 26 + 26) % 26 + 65);
        } else if (char >= 97 && char <= 122) {
            output += String.fromCharCode(((char - 97 + key) % 26 + 26) % 26 + 97);
        } else {
            output += input[i]; // Non-alphabetic characters remain unchanged
        }
    }
    return output;
}

function shiftCipherASCII(input, key) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        output += String.fromCharCode(char + key); // Shift ASCII value
    }
    return output;
}

function vigenereCipher(input, key) {
    let output = '';
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        if (char >= 97 && char <= 122) {
            let shift = key.charCodeAt(keyIndex % key.length) - 97;
            output += String.fromCharCode(((char - 97 + shift) % 26) + 97);
            keyIndex++;
        } else if (char >= 65 && char <= 90) {
            let shift = key.charCodeAt(keyIndex % key.length) - 65; // Adjust for uppercase
            output += String.fromCharCode(((char - 65 + shift) % 26) + 65);
            keyIndex++;
        } else {
            output += input[i]; // Non-alphabetic characters remain unchanged
        }
    }
    return output;
}

function vigenereDecipher(input, key) {
    let output = '';
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        if (char >= 97 && char <= 122) {
            let shift = key.charCodeAt(keyIndex % key.length) - 97;
            output += String.fromCharCode(((char - 97 - shift + 26) % 26) + 97);
            keyIndex++;
        } else if (char >= 65 && char <= 90) {
            let shift = key.charCodeAt(keyIndex % key.length) - 65; // Adjust for uppercase
            output += String.fromCharCode(((char - 65 - shift + 26) % 26) + 65);
            keyIndex++;
        } else {
            output += input[i]; // Non-alphabetic characters remain unchanged
        }
    }
    return output;
}

function vigenereCipherASCII(input, key) {
    let output = '';
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        let shift = key.charCodeAt(keyIndex % key.length);
        output += String.fromCharCode(char + shift);
        keyIndex++;
    }
    return output;
}

function vigenereDecipherASCII(input, key) {
    let output = '';
    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        let shift = key.charCodeAt(keyIndex % key.length);
        output += String.fromCharCode(char - shift);
        keyIndex++;
    }
    return output;
}