// Aguardar o Pixi.js carregar
document.addEventListener('DOMContentLoaded', async () => {
  // Aguardar PIXI estar disponível
  while (typeof PIXI === 'undefined') {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  class ShiningEffect {
    constructor() {
      this.app = null;
      this.container = null;
      this.maskSprite = null;
      this.shiningGraphics = null;
      this.init();
    }

    async init() {
      try {
        console.log('🚀 Iniciando Pixi.js...');
        
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

        // Criar container para o Pixi
        const pixiContainer = document.createElement('div');
        pixiContainer.id = 'pixi-shining';
        pixiContainer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        `;
        document.body.appendChild(pixiContainer);
        
        // Adicionar canvas
        pixiContainer.appendChild(this.app.view);

        // Container principal
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        // Criar máscara simples primeiro (fallback)
        this.createSimpleMask();
        
        // 🌟 ESCOLHA O EFEITO AQUI:
        // Descomente apenas UMA das opções abaixo:
        
        this.createBeamEffect();        // ⚡ OPÇÃO 1: FEIXE (linha vertical) - ATIVA
        // this.createSpotEffect();      // 🔵 OPÇÃO 2: SPOT (círculo)

        // Iniciar animação
        this.startAnimation();

        // Redimensionar quando a janela mudar
        window.addEventListener('resize', () => this.resize());
        
        console.log('✅ Pixi.js Shining Effect carregado com sucesso!');
        
        // Tentar carregar SVG depois (opcional)
        this.loadSVGMask();
        
      } catch (error) {
        console.error('❌ Erro ao inicializar Pixi.js:', error);
      }
    }

    createSimpleMask() {
      // Criar uma máscara simples de linhas horizontais
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFFFFFF);
      
      // Criar padrão de linhas que simula o SVG
      const lineHeight = 8;
      const spacing = 20;
      
      for (let y = 0; y < this.app.screen.height + spacing; y += spacing) {
        graphics.drawRect(0, y, this.app.screen.width, lineHeight);
      }
      
      graphics.endFill();
      
      this.maskSprite = graphics;
      this.container.addChild(this.maskSprite);
      console.log('✅ Máscara simples criada');
    }

    async loadSVGMask() {
      try {
        // Tentar carregar o SVG real (opcional)
        const response = await fetch('./assets/fundo.svg');
        if (response.ok) {
          const svgText = await response.text();
          
          // Criar versão branca do SVG
          const maskSvgText = svgText.replace(/fill="[^"]*"/g, 'fill="white"')
                                    .replace(/stroke="[^"]*"/g, 'stroke="white"');
          
          const svgBlob = new Blob([maskSvgText], { type: 'image/svg+xml' });
          const svgUrl = URL.createObjectURL(svgBlob);
          
          const texture = await PIXI.Texture.fromURL(svgUrl);
          const newMaskSprite = new PIXI.Sprite(texture);
          
          // Configurar nova máscara
          newMaskSprite.anchor.set(0.5);
          newMaskSprite.x = this.app.screen.width / 2;
          newMaskSprite.y = this.app.screen.height / 2;
          
          const scaleX = this.app.screen.width / texture.width;
          const scaleY = this.app.screen.height / texture.height;
          newMaskSprite.scale.set(Math.max(scaleX, scaleY) * 1.5);
          
          // Substituir máscara antiga
          this.container.removeChild(this.maskSprite);
          this.maskSprite = newMaskSprite;
          this.container.addChild(this.maskSprite);
          
          // Reaplicar máscara ao efeito
          if (this.shiningGraphics) {
            this.shiningGraphics.mask = this.maskSprite;
          }
          
          URL.revokeObjectURL(svgUrl);
          console.log('✅ SVG carregado e aplicado!');
        }
      } catch (error) {
        console.log('⚠️ SVG não pôde ser carregado, usando máscara simples');
      }
    }

    // ⚡ OPÇÃO 1: EFEITO FEIXE (linha vertical com glow)
    createBeamEffect() {
      this.shiningGraphics = new PIXI.Graphics();
      
      // Criar feixe vertical branco
      this.shiningGraphics.beginFill(0xFFFFFF, 0.9);
      this.shiningGraphics.drawRect(-30, 0, 60, this.app.screen.height);
      this.shiningGraphics.endFill();
      
      // Adicionar apenas GlowFilter (sem BlurFilter depreciado)
      try {
        const filters = [];
        
        if (PIXI.filters && PIXI.filters.GlowFilter) {
          const glowFilter = new PIXI.filters.GlowFilter({
            distance: 50,
            outerStrength: 4,
            innerStrength: 2,
            color: 0xFFFFFF,
            quality: 0.6
          });
          filters.push(glowFilter);
        }
        
        if (filters.length > 0) {
          this.shiningGraphics.filters = filters;
        }
      } catch (e) {
        console.warn('⚠️ Filters não disponíveis, usando efeito básico');
      }
      
      // Posicionar fora da tela (esquerda)
      this.shiningGraphics.x = -100;
      this.shiningGraphics.y = 0;
      
      // Aplicar máscara
      this.shiningGraphics.mask = this.maskSprite;
      
      this.container.addChild(this.shiningGraphics);
      console.log('✅ Efeito FEIXE criado');
    }

    // 🔵 OPÇÃO 2: EFEITO SPOT (círculo com glow)
    createSpotEffect() {
      this.shiningGraphics = new PIXI.Graphics();
      
      // Criar spot circular branco
      this.shiningGraphics.beginFill(0xFFFFFF, 0.8);
      this.shiningGraphics.drawCircle(0, 0, 100);
      this.shiningGraphics.endFill();
      
      // Adicionar apenas GlowFilter (sem BlurFilter depreciado)
      try {
        const filters = [];
        
        if (PIXI.filters && PIXI.filters.GlowFilter) {
          const glowFilter = new PIXI.filters.GlowFilter({
            distance: 80,
            outerStrength: 5,
            innerStrength: 3,
            color: 0xFFFFFF,
            quality: 0.7
          });
          filters.push(glowFilter);
        }
        
        if (filters.length > 0) {
          this.shiningGraphics.filters = filters;
        }
      } catch (e) {
        console.warn('⚠️ Filters não disponíveis, usando efeito básico');
      }
      
      // Posicionar fora da tela (esquerda)
      this.shiningGraphics.x = -150;
      this.shiningGraphics.y = this.app.screen.height / 2;
      
      // Aplicar máscara
      this.shiningGraphics.mask = this.maskSprite;
      
      this.container.addChild(this.shiningGraphics);
      console.log('✅ Efeito SPOT criado');
    }

    startAnimation() {
      const duration = 4000; // 4 segundos
      let startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % duration) / duration;
        
        if (this.shiningGraphics) {
          // Mover da esquerda para direita
          const startX = -200;
          const endX = this.app.screen.width + 200;
          this.shiningGraphics.x = startX + (endX - startX) * progress;
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      console.log('✅ Animação iniciada - feixe se movendo!');
    }

    resize() {
      if (this.app && this.app.renderer) {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        
        if (this.maskSprite) {
          this.maskSprite.x = this.app.screen.width / 2;
          this.maskSprite.y = this.app.screen.height / 2;
          
          if (this.maskSprite.texture) {
            const scaleX = this.app.screen.width / this.maskSprite.texture.width;
            const scaleY = this.app.screen.height / this.maskSprite.texture.height;
            this.maskSprite.scale.set(Math.max(scaleX, scaleY) * 1.5);
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
  console.log('🎯 Iniciando ShiningEffect...');
  new ShiningEffect();
});

/*
🌟 INSTRUÇÕES PARA TROCAR O EFEITO:
══════════════════════════════════════

OPÇÃO 1 (ATIVA): FEIXE VERTICAL ⚡
- Linha vertical que se move horizontalmente
- Mais visível e dramático
- Funciona mesmo sem glow filters

OPÇÃO 2: SPOT CIRCULAR 🔵  
- Círculo brilhante que se move horizontalmente
- Mais suave e orgânico
- Funciona mesmo sem glow filters

Para trocar:
1. Localize a seção "ESCOLHA O EFEITO AQUI" (linha ~60)
2. Comente a opção ativa (adicione // no início)
3. Descomente a opção desejada (remova // do início)
4. Salve o arquivo e atualize a página

O efeito funciona em duas etapas:
1. Primeiro cria uma máscara simples (linhas horizontais)
2. Depois tenta carregar o SVG real se disponível

Parâmetros ajustáveis:
- duration: velocidade da animação (linha ~205)
- Tamanho do feixe: drawRect(-30, 0, 60, ...) - largura = 60px
- Tamanho do spot: drawCircle(0, 0, 100) - raio = 100px
*/ 