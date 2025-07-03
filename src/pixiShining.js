// Aguardar o Pixi.js carregar
document.addEventListener('DOMContentLoaded', async () => {
  // Aguardar PIXI estar disponível
  while (typeof PIXI === 'undefined') {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  class HoloShiningEffect {
    constructor() {
      this.app = null;
      this.svgSprite = null;
      this.shiningOverlay = null;
      this.init();
    }

    async init() {
      try {
        console.log('🚀 Iniciando Holo Shining Effect...');
        
        // Criar aplicação Pixi v7
        this.app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
          antialias: true,
        });

        // Aguardar app estar pronto
        await new Promise(resolve => setTimeout(resolve, 100));

        // Criar container para o Pixi sobreposto ao CSS
        const pixiContainer = document.createElement('div');
        pixiContainer.id = 'pixi-holo-effect';
        pixiContainer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        `;
        document.body.appendChild(pixiContainer);
        
        // Adicionar canvas
        pixiContainer.appendChild(this.app.view);

        console.log('🎯 Carregando SVG...');

        // Carregar SVG original como sprite
        await this.loadSVGSprite();
        
        // Criar overlay de brilho animado
        this.createShiningOverlay();

        // Aplicar BloomFilter
        this.applyBloomFilter();

        // Iniciar animação
        this.startAnimation();

        // Redimensionar quando a janela mudar
        window.addEventListener('resize', () => this.resize());
        
        console.log('✅ Holo Shining Effect carregado com sucesso!');
        
      } catch (error) {
        console.error('❌ Erro ao inicializar Holo Shining Effect:', error);
      }
    }

    async loadSVGSprite() {
      try {
        console.log('📄 Carregando SVG original...');
        
        // Carregar o SVG original (sem modificações)
        const texture = await PIXI.Texture.fromURL('./assets/fundo.svg');
        console.log('📄 SVG carregado:', texture.width, 'x', texture.height);
        
        this.svgSprite = new PIXI.Sprite(texture);
        
        // Centralizar e escalar
        this.svgSprite.anchor.set(0.5);
        this.svgSprite.x = this.app.screen.width / 2;
        this.svgSprite.y = this.app.screen.height / 2;
        
        // Escalar para ficar bem visível
        const scaleX = this.app.screen.width / texture.width;
        const scaleY = this.app.screen.height / texture.height;
        const scale = Math.min(scaleX, scaleY) * 0.8; // 80% da tela
        this.svgSprite.scale.set(scale);
        
        this.app.stage.addChild(this.svgSprite);
        
        console.log('✅ SVG Sprite criado e posicionado');
        console.log('📋 Detalhes do sprite:');
        console.log('  - Posição:', this.svgSprite.x, 'x', this.svgSprite.y);
        console.log('  - Escala:', this.svgSprite.scale.x);
        
        return true;
      } catch (error) {
        console.error('❌ Erro ao carregar SVG:', error);
        return false;
      }
    }

    createShiningOverlay() {
      console.log('✨ Criando overlay de brilho...');
      
      // Criar um gradiente brilhante que se move
      this.shiningOverlay = new PIXI.Graphics();
      
      // Gradiente vertical que simula o feixe de luz
      const gradient = new PIXI.Graphics();
      gradient.beginFill(0xFFFFFF, 1);
      gradient.drawRect(-50, -this.app.screen.height, 100, this.app.screen.height * 2);
      gradient.endFill();
      
      // Posicionar fora da tela (esquerda)
      gradient.x = -200;
      gradient.y = 0;
      
      this.shiningOverlay.addChild(gradient);
      
      // Aplicar máscara usando o próprio SVG sprite
      if (this.svgSprite) {
        this.shiningOverlay.mask = this.svgSprite;
        console.log('✅ Máscara aplicada: overlay usará formato do SVG');
      }
      
      this.app.stage.addChild(this.shiningOverlay);
      
      console.log('✅ Overlay de brilho criado');
    }

    applyBloomFilter() {
      console.log('🌟 Aplicando BloomFilter...');
      
      try {
        // Verificar se BloomFilter está disponível
        if (PIXI.filters && PIXI.filters.BloomFilter) {
          const bloomFilter = new PIXI.filters.BloomFilter({
            strength: 3,      // Intensidade do bloom
            blur: 8,          // Desfoque do bloom  
            quality: 0.8,     // Qualidade do efeito
            resolution: 1     // Resolução do filtro
          });
          
          // Aplicar filtro ao SVG sprite
          this.svgSprite.filters = [bloomFilter];
          console.log('✅ BloomFilter aplicado ao SVG sprite');
          
        } else {
          console.warn('⚠️ BloomFilter não disponível, usando apenas overlay');
        }
        
      } catch (error) {
        console.error('❌ Erro ao aplicar BloomFilter:', error);
      }
    }

    startAnimation() {
      console.log('🎬 Iniciando animação...');
      
      const duration = 4000; // 4 segundos
      let startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % duration) / duration;
        
        if (this.shiningOverlay && this.shiningOverlay.children.length > 0) {
          const gradient = this.shiningOverlay.children[0];
          
          // Mover gradiente da esquerda para direita
          const startX = -300;
          const endX = this.app.screen.width + 300;
          gradient.x = startX + (endX - startX) * progress;
          
          // Variar opacidade para efeito mais suave
          gradient.alpha = 0.3 + 0.4 * Math.sin(progress * Math.PI);
          
          // Debug: mostrar progresso
          if (Math.floor(elapsed / 1000) !== this.lastLogSecond) {
            this.lastLogSecond = Math.floor(elapsed / 1000);
            console.log('🎬 Progresso:', Math.round(progress * 100) + '%', 'Alpha:', gradient.alpha.toFixed(2));
          }
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      console.log('✅ Animação iniciada!');
    }

    resize() {
      if (this.app && this.app.renderer) {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        
        if (this.svgSprite) {
          this.svgSprite.x = this.app.screen.width / 2;
          this.svgSprite.y = this.app.screen.height / 2;
          
          if (this.svgSprite.texture) {
            const scaleX = this.app.screen.width / this.svgSprite.texture.width;
            const scaleY = this.app.screen.height / this.svgSprite.texture.height;
            this.svgSprite.scale.set(Math.min(scaleX, scaleY) * 0.8);
          }
        }
      }
    }

    destroy() {
      if (this.app) {
        this.app.destroy(true);
      }
    }
  }

  // Criar efeito
  console.log('🎯 Iniciando HoloShiningEffect...');
  new HoloShiningEffect();
});

/*
🌟 NOVA ABORDAGEM: HOLO SHINING EFFECT
════════════════════════════════════════

Esta implementação combina:
✅ PixiJS para renderizar o SVG como sprite
✅ BloomFilter para efeito de brilho real
✅ Gradiente animado que se move pela máscara do SVG
✅ Animação suave com variação de opacidade

Vantagens:
- SVG carregado nativamente pelo PixiJS
- BloomFilter muito mais poderoso que CSS
- Máscara funciona perfeitamente
- Performance otimizada
- Efeito muito mais realista

Parâmetros ajustáveis:
- BloomFilter strength: intensidade do brilho
- BloomFilter blur: desfoque do efeito
- Animação duration: velocidade do movimento
- Gradiente width: largura do feixe de luz
- Alpha variation: variação da opacidade
*/ 