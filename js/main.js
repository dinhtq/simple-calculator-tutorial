var calcContainerEle = document.querySelector('#calculator-container')
calcContainerEle.addEventListener('click', e => onButtonClick(e))

function onButtonClick(e) {
  console.log('btnClickedHtml', e.target.innerHTML)
}