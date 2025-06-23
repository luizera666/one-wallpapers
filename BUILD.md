# 🚀 Como Compilar o Projeto

## Pré-requisitos
- Node.js instalado (https://nodejs.org/)
- npm (vem com Node.js)

## 📦 Instalação

1. **Instalar dependências:**
```bash
npm install
```

## 🔨 Comandos de Build

### **Compilação Única:**
```bash
npm run build
```
Este comando compila todos os arquivos de uma vez.

### **Compilação com Watch (Desenvolvimento):**
```bash
npm run dev
```
Este comando compila e fica observando mudanças nos arquivos, recompilando automaticamente.

### **Comandos Individuais:**

**Compilar apenas Pug:**
```bash
npm run build:pug
```

**Compilar apenas SCSS:**
```bash
npm run build:scss
```

**Watch apenas Pug:**
```bash
npm run watch:pug
```

**Watch apenas SCSS:**
```bash
npm run watch:scss
```

## 📁 Estrutura de Arquivos

```
src/
├── index.pug      → Compila para → dist/index.html
├── style.scss     → Compila para → dist/style.css
└── script.js      → Copiado para → dist/script.js

dist/
├── index.html     ← Arquivo final
├── style.css      ← CSS compilado
└── script.js      ← JavaScript
```

## 🎯 Fluxo de Trabalho

1. **Edite os arquivos em `src/`**
2. **Execute `npm run dev`** (para desenvolvimento)
3. **Abra `dist/index.html`** no navegador
4. **As mudanças são compiladas automaticamente**

## 🔧 Compilação Manual (Sem Node.js)

Se você não quiser usar Node.js, pode usar ferramentas online:

### **Pug → HTML:**
- https://pugjs.org/playground/
- Cole o conteúdo de `src/index.pug`
- Copie o HTML gerado para `dist/index.html`

### **SCSS → CSS:**
- https://www.sassmeister.com/
- Cole o conteúdo de `src/style.scss`
- Copie o CSS gerado para `dist/style.css` 