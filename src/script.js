// Parallax suave na logo
console.log("Script carregado!");

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
	console.log("DOM carregado!");
	
	const logo = document.querySelector(".logo");
	const holoLines = document.querySelector('.holo-lines');
	const card = document.body;
	
	console.log("Logo encontrada:", logo);
	console.log("Card encontrado:", card);
	
	if (!logo || !card) {
		console.error("Elementos não encontrados!");
		return;
	}

	let targetX = 0;
	let targetY = 0;
	let currentX = 0;
	let currentY = 0;
	let isAnimating = false;

	// Função de interpolação suave (lerp)
	function lerp(start, end, factor) {
		return start + (end - start) * factor;
	}

	// Função de animação suave
	function animateLogo() {
		// Interpolação suave para X e Y
		currentX = lerp(currentX, targetX, 0.08); // 0.08 = muito suave
		currentY = lerp(currentY, targetY, 0.08);
		
		// Aplica o transform na logo (acumula centralização)
		logo.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;
		
		// Calcula a intensidade do efeito baseado na distância do centro
		const distance = Math.sqrt(currentX * currentX + currentY * currentY);
		const maxDistance = Math.sqrt(22 * 22 + 12 * 12); // Valores máximos de targetX e targetY
		const intensity = 1 + (distance / maxDistance);
		const speed = 1 + (distance / maxDistance) * 0.5;
		
		// Deslocamento sutil do pattern do holo-lines
		if (holoLines) {
			const sutilX = currentX * 0.12; // movimento ainda mais sutil
			const sutilY = currentY * 0.12;
			holoLines.style.maskPosition = `${50 + sutilX}% ${50 + sutilY}%`;
			holoLines.style.webkitMaskPosition = `${50 + sutilX}% ${50 + sutilY}%`;
			
			// Atualiza as variáveis CSS para o efeito holográfico
			document.body.style.setProperty('--holo-intensity', intensity.toString());
			document.body.style.setProperty('--holo-speed', speed.toString());
		}
		
		// Continua animando se ainda há diferença
		if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
			requestAnimationFrame(animateLogo);
		} else {
			// Para a animação quando chega muito perto do target
			currentX = targetX;
			currentY = targetY;
			logo.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;
			if (holoLines) {
				const sutilX = currentX * 0.12;
				const sutilY = currentY * 0.12;
				holoLines.style.maskPosition = `${50 + sutilX}% ${50 + sutilY}%`;
				holoLines.style.webkitMaskPosition = `${50 + sutilX}% ${50 + sutilY}%`;
				
				// Atualiza as variáveis CSS para o efeito holográfico
				document.body.style.setProperty('--holo-intensity', intensity.toString());
				document.body.style.setProperty('--holo-speed', speed.toString());
			}
			isAnimating = false;
		}
	}

	// Movimento do mouse
	card.addEventListener("mousemove", (e) => {
		console.log("Mouse moveu!", e.clientX, e.clientY);
		
		const rect = card.getBoundingClientRect();
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		// Calcula a posição relativa do mouse (-1 a 1)
		const mouseX = (e.clientX - rect.left - centerX) / centerX;
		const mouseY = (e.clientY - rect.top - centerY) / centerY;
		
		// Aplica o parallax (ajuste a intensidade aqui)
		targetX = mouseX * 22; // movimento mais sutil
		targetY = mouseY * 12; // movimento mais sutil
		
		console.log("Target:", targetX, targetY);
		
		// Inicia animação se não estiver rodando
		if (!isAnimating) {
			isAnimating = true;
			animateLogo();
		}
	});

	// Volta suavemente ao centro quando o mouse sai
	card.addEventListener("mouseleave", () => {
		console.log("Mouse saiu!");
		targetX = 0;
		targetY = 0;
		
		// Reseta as variáveis do efeito holográfico
		document.body.style.setProperty('--holo-intensity', '1');
		document.body.style.setProperty('--holo-speed', '1');
		
		if (!isAnimating) {
			isAnimating = true;
			animateLogo();
		}
	});
	
	// Teste inicial
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
