# Guia de Upload de Banners - Gráfica In Focus

Este diretório armazena os arquivos de imagem para o carrossel de banners principais da seção inicial do site.

## 📏 Especificações Recomendadas

Para garantir o melhor carregamento e adaptação em computadores e celulares, recomendamos exportar os banners em duas versões:

### 1. Banners para Computador (Desktop)
*   **Resolução:** **`1920 x 800 pixels`** (ou `1920 x 700 pixels`)
*   **Formatos aceitos:** `.jpg` (ou `.png` / `.webp`)
*   **Nomes dos arquivos:**
    *   Slide 1: `banner1_desktop.jpg`
    *   Slide 2: `banner2_desktop.jpg`
    *   Slide 3: `banner3_desktop.jpg`

### 2. Banners para Celulares (Mobile/Responsivo)
*   **Resolução:** **`1080 x 1080 pixels`** (Quadrado 1:1)
*   **Formatos aceitos:** `.jpg` (ou `.png` / `.webp`)
*   **Nomes dos arquivos:**
    *   Slide 1: `banner1_mobile.jpg`
    *   Slide 2: `banner2_mobile.jpg`
    *   Slide 3: `banner3_mobile.jpg`

---

## 💡 Como Substituir os Placeholders:

1. Desenvolva as imagens do banner respeitando as proporções acima.
2. Salve as imagens com os nomes listados neste guia.
3. Faça o upload dos arquivos diretamente para esta pasta (`img/banners/`).
4. O site detectará automaticamente a presença das imagens físicas e ocultará os slides cinzas de fallback/placeholder.

*Nota: Se optar por salvar as imagens em outro formato (como `.png` ou `.webp`), lembre-se de alterar as extensões correspondentes nas tags `<picture>` dentro do arquivo `index.html`.*
