// --- INTERATIVIDADE DO MOUSE (comentada temporariamente) ---
/*
const card = document.querySelector(".card");

// Limites iguais ao keyframes idle
const RATIO_X_MIN = -0.75;
const RATIO_X_MAX = 0.6;
const RATIO_Y_MIN = -0.2;
const RATIO_Y_MAX = 0.2;

// Função de interpolação linear (lerp)
function lerp(a, b, t) {
	return a + (b - a) * t;
}

let targetRatioX = 0;
let targetRatioY = 0;
let currentRatioX = 0;
let currentRatioY = 0;
let animating = false;

function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val));
}

function animate() {
	currentRatioX = lerp(currentRatioX, targetRatioX, 0.15);
	currentRatioY = lerp(currentRatioY, targetRatioY, 0.15);
	card.style.setProperty("--ratio-x", currentRatioX);
	card.style.setProperty("--ratio-y", currentRatioY);
	if (Math.abs(currentRatioX - targetRatioX) > 0.001 || Math.abs(currentRatioY - targetRatioY) > 0.001) {
		requestAnimationFrame(animate);
	} else {
		currentRatioX = targetRatioX;
		currentRatioY = targetRatioY;
		card.style.setProperty("--ratio-x", currentRatioX);
		card.style.setProperty("--ratio-y", currentRatioY);
		animating = false;
	}
}

const updatePointerPosition = ({ x, y }) => {
	card.classList.remove('rotate');
	const rect = card.getBoundingClientRect();
	const hw = rect.width / 2;
	const hh = rect.height / 2;
	let ratioX = (x - (rect.x + hw)) / hw;
	let ratioY = (y - (rect.y + hh)) / hh;
	// Limitar os valores
	ratioX = clamp(ratioX, RATIO_X_MIN, RATIO_X_MAX);
	ratioY = clamp(ratioY, RATIO_Y_MIN, RATIO_Y_MAX);
	targetRatioX = ratioX;
	targetRatioY = ratioY;
	if (!animating) {
		animating = true;
		animate();
	}
};

card.addEventListener("pointermove", updatePointerPosition);

card.addEventListener("pointerleave", () => {
	targetRatioX = 0;
	targetRatioY = 0;
	card.classList.add('rotate');
	if (!animating) {
		animating = true;
		animate();
	}
});
*/
