# 🌟 Opções de Efeito Glow para Holo-Lines

## Como Trocar o Efeito

Para alterar o tipo de efeito luminoso no `.holo-lines`, você precisa editar o arquivo `src/style.scss` e trocar a opção ativa.

### Opções Disponíveis:

#### 🔵 OPÇÃO 1: SPOT LUMINOSO (Atualmente Ativa)
- **Efeito:** Elipse brilhante que se move suavemente pela máscara
- **Características:** Efeito mais suave e orgânico
- **Código atual no CSS:** `radial-gradient` com formato elipse

#### ⚡ OPÇÃO 2: LASER VERTICAL  
- **Efeito:** Linha vertical fina e intensa que se move
- **Características:** Efeito mais preciso e direto
- **Para ativar:** Descomente a seção "OPÇÃO 2" e comente a "OPÇÃO 1"

#### ✨ OPÇÃO 3: MÚLTIPLOS PONTOS
- **Efeito:** Vários pontos de luz em diferentes alturas
- **Características:** Efeito mais complexo e dinâmico  
- **Para ativar:** Descomente a seção "OPÇÃO 3" e comente a "OPÇÃO 1"

## Como Trocar:

1. **Abra o arquivo:** `src/style.scss`
2. **Localize a seção:** `.holo-lines` (linha ~134)
3. **Comente a opção atual:** Adicione `/*` no início e `*/` no final da seção ativa
4. **Descomente a opção desejada:** Remova `/*` do início e `*/` do final da opção escolhida
5. **Salve o arquivo**

## Variáveis de Controle:

Você pode ajustar a intensidade e velocidade alterando essas variáveis no `:root`:

```scss
:root {
  --glow-intensity: 1;    // Intensidade do brilho (0.5 a 3)
  --holo-speed: 1;        // Velocidade da animação (0.5 a 3) 
  --holo-intensity: 1;    // Intensidade geral do efeito (0.5 a 2)
}
```

## Exemplo de Troca:

**Para trocar da OPÇÃO 1 para OPÇÃO 2:**

```scss
// Comente esta seção (OPÇÃO 1):
/*
background: 
  radial-gradient(
    ellipse calc(150px * var(--glow-intensity))...
  );
*/

// Descomente esta seção (OPÇÃO 2):
background: 
  linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0) calc(var(--spot-x, 0%) - 3%),
    ...
  );
``` 