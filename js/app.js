let imgSuperior;
let imgInferior;
let sep;
let sepCircle;
let wrapperApp;

imgSuperior = document.querySelector('.img-2');
imgInferior = document.querySelector('.img-1');
sep = document.querySelector('.sep');
sepCircle = document.querySelector('.sep-circle');
wrapperApp = document.querySelector('.wrapper-app');

//Largura atual da imagem superior
var currentWidth = imgSuperior.offsetWidth;
var currentMousePosition = 0;
var currentSepPosition = 0;

//Essa função aumenta e diminui a width da imagem que está em cima
function changeWidth(pixels) {
	imgSuperior.style.width = (currentWidth + pixels) + "px";
}

/* ========================== VERSAO DESKTOP ===========================*/
function callbackMousemove(e) {
	if(e.clientX != currentMousePosition){
		currentSepPosition = currentSepPosition + (e.clientX - currentMousePosition);
		currentMousePosition = e.clientX;
	}
	
	if(currentSepPosition == 0 || (currentSepPosition > -currentWidth && currentSepPosition < currentWidth)){
		sep.style.transform = 'translate3d('+ currentSepPosition +'px, 0, 0)';
		sepCircle.style.transform = 'translate3d('+ currentSepPosition +'px, 0, 0)';
		changeWidth(currentSepPosition);
	}	
}

function callbackMouseudown(e) {
	e.preventDefault();
	currentMousePosition = e.clientX;
	wrapperApp.addEventListener('mousemove', callbackMousemove);
}

function callbackMouseup(e) {
	wrapperApp.removeEventListener('mousemove', callbackMousemove);
}

sepCircle.addEventListener('mousedown', callbackMouseudown);
window.addEventListener('mouseup', callbackMouseup);

/* ========================== VERSAO DESKTOP ===========================*/

/* ========================== VERSAO MOBILE ===========================*/

function callbackTouchemove(e) {
	if(e.targetTouches[0].clientX != currentMousePosition){
		currentSepPosition = currentSepPosition + (e.targetTouches[0].clientX - currentMousePosition);
		currentMousePosition = e.targetTouches[0].clientX;
	}
	
	if(currentSepPosition == 0 || (currentSepPosition > -(currentWidth) && currentSepPosition < currentWidth)){
		sep.style.transform = 'translate3d('+ currentSepPosition +'px, 0, 0)';
		sepCircle.style.transform = 'translate3d('+ currentSepPosition +'px, 0, 0)';
		changeWidth(currentSepPosition);
	}	
}

function callbackToucheStart(e) {
	e.preventDefault();
	currentMousePosition = e.targetTouches[0].clientX;
	wrapperApp.addEventListener('touchmove', callbackTouchemove);
}

function callbackToucheEnd(e) {
	wrapperApp.removeEventListener('touchmove', callbackTouchemove);
}

sepCircle.addEventListener('touchstart', callbackToucheStart);
window.addEventListener('touchend', callbackToucheEnd);

/* ========================== VERSAO MOBILE ===========================*/