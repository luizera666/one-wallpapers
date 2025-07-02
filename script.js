// Parallax.js implementation
console.log("Script carregado! - DEV MODE");

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
	console.log("DOM carregado!");
	
	const scene = document.getElementById('scene');
	const logo = document.querySelector(".logo");
	const holoLines = document.querySelector('.holo-lines');
	
	console.log("Scene encontrada:", scene);
	console.log("Logo encontrada:", logo);
	
	if (!scene) {
		console.error("Elemento scene não encontrado!");
		return;
	}

	// Inicializa o Parallax
	const parallaxInstance = new Parallax(scene, {
		relativeInput: true,
		hoverOnly: false,
		clipRelativeInput: true,    // 🔥 EVITA BORDAS! Limita movimento às bordas do elemento
		calibrateX: true,
		calibrateY: true,
		invertX: true,
		invertY: true,
		limitX: 15,                 // 🔥 MUITO SUTIL - Movimento bem restrito e suave
		limitY: 15,                 // 🔥 MUITO SUTIL - Movimento bem restrito e suave
		scalarX: 1.5,               // 🔥 SUPER SUTIL - Intensidade bem baixa para sutileza
		scalarY: 1.5,               // 🔥 SUPER SUTIL - Intensidade bem baixa para sutileza
		frictionX: 0.06,            // 🔥 ULTRA SUAVE - Movimento bem gradual e elegante
		frictionY: 0.06,            // 🔥 ULTRA SUAVE - Movimento bem gradual e elegante
		originX: 0.5,               // Centro é mais seguro para evitar gaps
		originY: 0.5,               // Centro é mais seguro para evitar gaps
		precision: 1,               // Menos precisão = melhor performance
		pointerEvents: false,
		onReady: function() {
			console.log("Parallax inicializado - Modo Ultra Sutil e Suave!");
		}
	});

	// Limpeza quando a página é descarregada
	window.addEventListener('beforeunload', () => {
		if (parallaxInstance) {
			parallaxInstance.destroy();
		}
	});
	
	console.log("Parallax configurado!");
});

// --- CÓDIGO ORIGINAL COMENTADO ---
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
