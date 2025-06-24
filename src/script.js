// Animação automática apenas - sem interação do mouse
// O cartão permanecerá na animação idle (rotate) automaticamente
// A classe 'rotate' no HTML já ativa a animação automática 

// Controlador unificado para amplitude X e Y das transformações

document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  const amplitudeXSlider = document.getElementById('amplitude-x');
  const amplitudeYSlider = document.getElementById('amplitude-y');
  const speedSlider = document.getElementById('animation-speed');
  const toggleBtn = document.getElementById('animation-toggle');
  
  let isAnimationPaused = false;
  
  // Função para atualizar variáveis CSS
  function updateCSSVariable(variable, value) {
    document.documentElement.style.setProperty(`--${variable}`, value);
  }
  
  // Função para atualizar o valor exibido
  function updateDisplayValue(element, value, suffix = '') {
    const displayElement = element.parentElement.querySelector('.value');
    if (displayElement) {
      displayElement.textContent = value + suffix;
    }
  }
  
  // Controlador de amplitude X
  amplitudeXSlider.addEventListener('input', function() {
    const value = this.value;
    updateCSSVariable('amplitude-x', value);
    updateDisplayValue(this, parseFloat(value).toFixed(1));
  });
  
  // Controlador de amplitude Y
  amplitudeYSlider.addEventListener('input', function() {
    const value = this.value;
    updateCSSVariable('amplitude-y', value);
    updateDisplayValue(this, parseFloat(value).toFixed(1));
  });
  
  // Controlador de velocidade da animação
  speedSlider.addEventListener('input', function() {
    const value = this.value;
    updateCSSVariable('animation-speed', value);
    updateDisplayValue(this, value, 's');
  });
  
  // Controlador de pausar/retomar animação
  toggleBtn.addEventListener('click', function() {
    isAnimationPaused = !isAnimationPaused;
    
    if (isAnimationPaused) {
      card.style.animationPlayState = 'paused';
      this.textContent = 'Retomar';
    } else {
      card.style.animationPlayState = 'running';
      this.textContent = 'Pausar';
    }
  });
  
  // Inicializar valores exibidos
  updateDisplayValue(amplitudeXSlider, amplitudeXSlider.value);
  updateDisplayValue(amplitudeYSlider, amplitudeYSlider.value);
  updateDisplayValue(speedSlider, speedSlider.value, 's');
  
  // Adicionar interação do mouse para controle manual
  let isMouseDown = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  
  card.addEventListener('mousedown', function(e) {
    isMouseDown = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    card.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isMouseDown) return;
    
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    
    // Calcular novos valores de ratio baseados no movimento do mouse
    const sensitivity = 0.01;
    const newRatioX = Math.max(-2, Math.min(2, deltaX * sensitivity));
    const newRatioY = Math.max(-2, Math.min(2, deltaY * sensitivity));
    
    // Atualizar as variáveis CSS
    card.style.setProperty('--ratio-x', newRatioX);
    card.style.setProperty('--ratio-y', newRatioY);
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });
  
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
    card.style.cursor = 'grab';
    
    // Retornar aos valores da animação após soltar o mouse
    setTimeout(() => {
      if (!isMouseDown) {
        card.style.removeProperty('--ratio-x');
        card.style.removeProperty('--ratio-y');
      }
    }, 100);
  });
  
  // Adicionar cursor grab ao card
  card.style.cursor = 'grab';
}); 