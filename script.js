let startWrapper = document.querySelector('.start-wrapper');
let quizWrapper = document.querySelector('.quiz-wrapper');
let startButton = document.querySelector('.start-button');
let questions = document.querySelector('.question-heading');

let signs = ['+', '-'];

let resultHeading = document.querySelector('.result-heading');  

let num1;
let num2;
let sign;

let buttonRightIndex = 0;
let listButton = document.querySelectorAll('.answer-row>button');

let rightCounter = 0;
let wrongCounter = 0;
let amountCounter = 0;




function startGame() {
    startWrapper.classList.add('hide');
    quizWrapper.classList.remove('hide');
    setTimeout(showResult, 10000)

}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
function generateQuestion() {
  num1 = getRandomInt(50);
  num2 = getRandomInt(50);
  sign = signs[getRandomInt(signs.length)];
  let result = 0
  questions.innerHTML = `${num1} ${sign} ${num2}`;

  buttonRightIndex = getRandomInt(listButton.length);

  if (sign === "-") {
    result = num1 - num2;
  }
  else {
    result = num1 + num2
  }


  for (let i = 0; i < listButton.length; i+= 1) {
    if (i === buttonRightIndex) {
      listButton[i].innerHTML = result; 
      listButton[i].classList.add('right');
    } else {
      listButton[i].innerHTML = getRandomInt(50);
      listButton[i].classList.add('wrong');
    }
  }
}
  
function removeClasses() {
  for (let i = 0; i < listButton.length; i += 1) {
    if (listButton[i].classList.contains('right')) {
      listButton[i].classList.remove('right');
    }
    if (listButton[i].classList.contains('wrong')) {
      listButton[i].classList.remove('wrong');
    }
  }
}
startButton.addEventListener('click', startGame);

function checkAnswer(item) {
  return function() {
    if (listButton[item].classList.contains('right')) {
      rightCounter += 1;
    } else {
      wrongCounter += 1;
    }
    amountCounter += 1;
  }
}

function endGame() {
  startWrapper.classList.remove('hide');
  quizWrapper.classList.add('hide');
  resultHeading.classList.remove('hide');
  resultHeading.innerHTML = 'total: ${amountCounter}, right: ${rightCounter}, wrong: ${wrongCounter}'
}


generateQuestion();

for (let i = 0; i < listButton.length; i += 1) {
  listButton[i].addEventListener('click', generateQuestion);
  listButton[i].addEventListener('mouseup', removeClasses);
  listButton[i].addEventListener('click', checkAnswer(i));
}


function showResult() {
  resultHeading.innerHTML = `total: ${amountCounter}, wrong: ${wrongCounter}, right: ${rightCounter}`;
  resultHeading.classList.remove('hide');
  startWrapper.classList.remove('hide');
  quizWrapper.classList.remove('hide');

}
