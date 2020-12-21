// DOM elements
var resultEL = document.getElementById('password');
var lengthEL = document.getElementById('pwdLength');
var uppercaseEL = document.getElementById('uCase');
var lowercaseEL = document.getElementById('lCase');
var numbersEL = document.getElementById('numbers');
var specialcharactersEL = document.getElementById('spChar');
var generateEL = document.getElementById('generate');
var clipboardEL = document.getElementById('password');

var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  specialcharacters: getRandomSpecialCharacters
}; 

/* Check for greater than 128 */
lengthEL.addEventListener('input',() =>{
  if(+document.getElementById('pwdLength').value   == 0 )
  {
    document.getElementById('displayError').innerText = 'Please enter a length to generate password '  
  }
  else if(+document.getElementById('pwdLength').value  > 128 )
  {
    document.getElementById('displayError').innerText = 'Please enter a length no more than 128'
    
  }

  else if(+document.getElementById('pwdLength').value  < 8 )
  {
    document.getElementById('displayError').innerText = 'Please enter a length greater than 7'  
  }
  else{
    document.getElementById('displayError').innerText = ''
  }

})

/* Check for greater than 128 */

generateEL.addEventListener('click', () => {
  var length = +lengthEL.value;
  var hasLower = lowercaseEL.checked;
  var hasUpper = uppercaseEL.checked;
  var hasNumber = numbersEL.checked;
  var hasSpecialCharacters = specialcharactersEL.checked;

  resultEL.innerText = generatePassword(
    hasLower, 
    hasUpper, 
    hasNumber, 
    hasSpecialCharacters,
    length
    );
})


/*Generate password function*/
function generatePassword(lower, upper, number, specialcharacters, length) {
  let generatedPassword = '';
  var typesCount = lower + upper + number + specialcharacters ;
  var typeArray = [{ lower }, { upper }, { number }, { specialcharacters }].filter
  (item => Object.values(item)[0]
  );

/* Check if Password length was inputted and other criteria */
  if(typesCount === 0) {
    alert('Select ATLEAST ONE criteria on the checkbox to generate password')
    return 'Password not generated';

  }
  else if(length < 8 ) {
    alert('You must enter password length greater than 7 ');
    return 'Password not generated';
  }


  else if(length > 128 ) {
    alert('You must enter password less than 129 ');
    return 'Password not generated';

  }

  else{


  for(let i = 0; i < length; i += typesCount) {
    typeArray.forEach(type => {
      var funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName] ();
    });
  }
  }
  var finalPassword = generatedPassword.slice(0, length);/* Making sure the length of password == what was inputted */
  return finalPassword
 
}

/* Check if Password length was inputted  and other criteria */

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSpecialCharacters() {
// Array of special characters to be included in password
var specialCharacters = ['@', '%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];
  return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];  
}

