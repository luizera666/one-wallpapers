// Parallax.js implementation
console.log("Script carregado!");

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
		calibrateX: true,
		calibrateY: true,
		invertX: true,
		invertY: true,
		limitX: false,
		limitY: false,
		scalarX: 3.0,
		scalarY: 3.0,
		frictionX: 0.1,
		frictionY: 0.1,
		originX: 0.5,
		originY: 0.5,
		precision: 1,
		pointerEvents: false,
		onReady: function() {
			console.log("Parallax inicializado com sucesso!");
		}
	});

	// Função para atualizar efeitos holográficos baseado no movimento
	function updateHoloEffects() {
		if (!logo || !holoLines) return;
		
		// Obtém a posição atual do logo
		const logoRect = logo.getBoundingClientRect();
		const sceneRect = scene.getBoundingClientRect();
		
		// Calcula o centro da cena
		const centerX = sceneRect.width / 2;
		const centerY = sceneRect.height / 2;
		
		// Calcula a posição relativa do logo
		const logoCenterX = logoRect.left + logoRect.width / 2 - sceneRect.left;
		const logoCenterY = logoRect.top + logoRect.height / 2 - sceneRect.top;
		
		// Calcula a distância do centro
		const distanceX = Math.abs(logoCenterX - centerX);
		const distanceY = Math.abs(logoCenterY - centerY);
		const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
		const currentDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		
		// Calcula intensidade baseada na distância
		const intensity = 1 + (currentDistance / maxDistance) * 2;
		const speed = 1 + (currentDistance / maxDistance) * 0.5;
		
		// Atualiza as variáveis CSS para o efeito holográfico
		document.body.style.setProperty('--holo-intensity', intensity.toString());
		document.body.style.setProperty('--holo-speed', speed.toString());
		
		// Deslocamento sutil do pattern do holo-lines
		const sutilX = (logoCenterX - centerX) * 0.1;
		const sutilY = (logoCenterY - centerY) * 0.1;
		holoLines.style.maskPosition = `${50 + sutilX}% ${50 + sutilY}%`;
		holoLines.style.webkitMaskPosition = `${50 + sutilX}% ${50 + sutilY}%`;
	}

	// Atualiza os efeitos quando o parallax se move
	let animationId;
	function animateHoloEffects() {
		updateHoloEffects();
		animationId = requestAnimationFrame(animateHoloEffects);
	}

	// Inicia a animação dos efeitos holográficos
	animateHoloEffects();

	// Event listeners para mouse
	scene.addEventListener("mousemove", () => {
		// Os efeitos são atualizados automaticamente pela animação
	});

	scene.addEventListener("mouseleave", () => {
		// Reseta as variáveis do efeito holográfico quando o mouse sai
		document.body.style.setProperty('--holo-intensity', '1');
		document.body.style.setProperty('--holo-speed', '1');
		
		if (holoLines) {
			holoLines.style.maskPosition = '50% 50%';
			holoLines.style.webkitMaskPosition = '50% 50%';
		}
	});

	// Limpeza quando a página é descarregada
	window.addEventListener('beforeunload', () => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
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
