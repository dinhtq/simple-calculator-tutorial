var calcContainerEle = document.querySelector('#calculator-container')
calcContainerEle.addEventListener('click', e => onButtonClick(e))

var resultEle = document.querySelector('#result')

var operationSymbolMap = {
  '/': 'divide',
  '+': 'add',
  '-': 'minus',
  'x': 'multiply'
}

var curOperation, curNumber1, curNumber2
var activeOperationBtnEle

function compute(num1, num2, op) {
  var n1 = Number(num1)
  var n2 = Number(num2)
  var result
  if (op === '+') {
    result = n1 + n2
  } else if (op === '-') {
    result = n1 - n2
  } else if (op === '/') {
    result = n1 / n2
  } else {
    // must be multiply
    result = n1 * n2
  }
  return result
}

function doNumber(num) {
  var newNum
  if (curOperation) {
    curNumber2 = curNumber2 ? `${curNumber2}${num}` : num
    newNum = curNumber2
  } else {
    curNumber1 = curNumber1 ? `${curNumber1}${num}` : num
    newNum = curNumber1
  }
  resultEle.innerHTML = newNum
}

function doOperation(operation) {
  var prevOperation = curOperation

  // if curNumber2 is active, then must be a continous operation (1 + 4 - 3),
  // so perform curOperation on num1 and num2 and assign result to num1
  if (curNumber2) {
    var result = compute(curNumber1, curNumber2, curOperation)
    curNumber1 = result
    curNumber2 = 0
    resultEle.innerHTML = result
  }

  curOperation = operation

  // make prev selected operation unactive (if necessary)
  if (prevOperation) {
    var prevBtnEle = document.querySelector(`#${operationSymbolMap[prevOperation]}`)
    prevBtnEle.classList.remove('active')
  }

  // make operation button active
  activeOperationBtnEle = document.querySelector(`#${operationSymbolMap[curOperation]}`)
  activeOperationBtnEle.classList.add('active')
}

function reset(lastComputedNum) {
  if (activeOperationBtnEle) {
    activeOperationBtnEle.classList.remove('active')
    activeOperationBtnEle = null
  }

  if (lastComputedNum) {
    // equal button clicked
    curNumber1 = lastComputedNum
  } else {
    // reset button clicked
    curNumber1 = null
    resultEle.innerHTML = '0'
  }
  curNumber2 = null
  curOperation = null
}

function makePosNeg() {
  console.log('makePosNeg')
}

function makeDecimal() {
  console.log('makeDecimal')
}

function doEqual() {
  if (curNumber1 && curNumber2 && curOperation) {
    var result = compute(curNumber1, curNumber2, curOperation)
    resultEle.innerHTML = result
    reset(result)
  }
}

function flashElement(ele) {
  // flash white on button clicked
  var prevColor = ele.style.backgroundColor
  ele.style.backgroundColor = 'white'
  ele.style.opacity = 0.5
  setTimeout(function() {
    ele.style.backgroundColor = prevColor
    ele.style.opacity = 1
  }, 100)
}

function onButtonClick(e) {
  flashElement(e.target)

  var btnClickedValue = e.target.innerHTML

  if (Number.isInteger(parseInt(btnClickedValue))) {
    doNumber(btnClickedValue)
    return
  }
  
  switch (btnClickedValue) {
    case 'AC':
      reset()
      break
    case '+/-':
      makePosNeg()
      break
    case '/':
      doOperation('/')
      break
    case 'x':
      doOperation('x')
      break
    case '-':
      doOperation('-')
      break
    case '+':
      doOperation('+')
      break
    case '.':
      makeDecimal()
      break
    case '=':
      doEqual()
      break
    default:
      break
  }
}