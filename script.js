document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Header Scroll Effect
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially on load

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is active
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       Active Link Navigation on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-80px 0px 0px 0px" // Account for header height
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);
    
    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* ==========================================================================
       Product Category Tabs Switch
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Accessibility state
            tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            button.setAttribute('aria-selected', 'true');
            
            // Switch contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === `content-${targetTab}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    /* ==========================================================================
       Product Card Budget Trigger & Dynamic Form Logic
       ========================================================================== */
    const cardRequestButtons = document.querySelectorAll('.btn-card-request');
    const productSelect = document.getElementById('form-product');
    const budgetSection = document.getElementById('orcamento');
    const dynamicFieldsContainer = document.getElementById('dynamic-fields-container');
    
    // Function to render dynamic fields based on product category/name
    const updateDynamicFields = () => {
        if (!productSelect || !dynamicFieldsContainer) return;
        
        const selectedValue = productSelect.value;
        if (!selectedValue || selectedValue === 'Orçamento Especial') {
            dynamicFieldsContainer.classList.remove('show');
            setTimeout(() => {
                dynamicFieldsContainer.innerHTML = '';
            }, 400);
            return;
        }
        
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const optgroup = selectedOption.parentNode;
        const category = optgroup.tagName === 'OPTGROUP' ? optgroup.getAttribute('label') : '';
        
        let htmlContent = '';
        
        if (category === 'Comunicação Visual') {
            htmlContent = `
                <div class="form-group">
                    <label for="dynamic-dimensions">Dimensões (Largura x Altura) *</label>
                    <input type="text" id="dynamic-dimensions" required placeholder="Ex: 1x2m, 80x120cm, 5x5cm">
                </div>
                <div class="form-group">
                    <label for="dynamic-material">Material / Acabamento *</label>
                    <select id="dynamic-material" required>
                        <option value="Lona com Bastão e Cordão (Padrão Banner)">Lona com Bastão e Cordão (Padrão Banner)</option>
                        <option value="Lona com Ilhós nas Bordas">Lona com Ilhós nas Bordas</option>
                        <option value="Adesivo Vinil Brilho">Adesivo Vinil Brilho</option>
                        <option value="Adesivo Vinil Fosco">Adesivo Vinil Fosco</option>
                        <option value="Adesivo Vinil Transparente">Adesivo Vinil Transparente</option>
                        <option value="Placa de Sinalização (PVC/PS)">Placa de Sinalização (PVC/PS)</option>
                        <option value="Outro / Deixar sob recomendação da gráfica">Outro / Deixar sob recomendação</option>
                    </select>
                </div>
            `;
        } else if (category === 'Impressos Gráficos' || category === 'Papelaria') {
            htmlContent = `
                <div class="form-group">
                    <label for="dynamic-paper">Tipo de Papel *</label>
                    <select id="dynamic-paper" required>
                        <option value="Couchê 250g (Mais leve, flexível)">Couchê 250g (Mais leve, flexível)</option>
                        <option value="Couchê 300g (Mais encorpado, ideal para cartões)">Couchê 300g (Mais encorpado, ideal para cartões)</option>
                        <option value="Sulfite 75g (Padrão corporativo)">Sulfite 75g (Padrão corporativo)</option>
                        <option value="Sulfite 90g (Mais grosso)">Sulfite 90g (Mais grosso)</option>
                        <option value="PVC Rígido (Crachás)">PVC Rígido (Crachás)</option>
                        <option value="Deixar sob recomendação da gráfica">Deixar sob recomendação da gráfica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dynamic-finish">Acabamento *</label>
                    <select id="dynamic-finish" required>
                        <option value="Verniz Localizado + Laminação Fosca (Premium)">Verniz Localizado + Laminação Fosca (Premium)</option>
                        <option value="Verniz Total Brilho">Verniz Total Brilho</option>
                        <option value="Laminação Fosca">Laminação Fosca</option>
                        <option value="Cantos Arredondados">Cantos Arredondados</option>
                        <option value="Corte Reto Simples">Corte Reto Simples</option>
                        <option value="Sem Acabamento Adicional">Sem Acabamento Adicional</option>
                    </select>
                </div>
            `;
        } else if (category === 'Serviços de Papelaria') {
            htmlContent = `
                <div class="form-group">
                    <label for="dynamic-color">Tipo de Impressão/Cópia *</label>
                    <select id="dynamic-color" required>
                        <option value="Preto e Branco (P&B)">Preto e Branco (P&B)</option>
                        <option value="Colorida">Colorida</option>
                        <option value="Mista (Preto e Branco e Colorida)">Mista (Preto e Branco e Colorida)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dynamic-pages">Total de Páginas / Folhas *</label>
                    <input type="text" id="dynamic-pages" required placeholder="Ex: 50 páginas, 2 folhas">
                </div>
            `;
        } else if (category === 'Brindes & Especiais') {
            if (selectedValue.toLowerCase().includes('camiseta')) {
                htmlContent = `
                    <div class="form-group">
                        <label for="dynamic-size">Tamanho da Camiseta *</label>
                        <select id="dynamic-size" required>
                            <option value="P">Tamanho P</option>
                            <option value="M">Tamanho M</option>
                            <option value="G">Tamanho G</option>
                            <option value="GG">Tamanho GG</option>
                            <option value="XGG">Tamanho XGG</option>
                            <option value="Vários tamanhos (especificados em Detalhes)">Vários tamanhos (especificar em Detalhes)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dynamic-color-gift">Cor da Camiseta *</label>
                        <select id="dynamic-color-gift" required>
                            <option value="Preta">Preta</option>
                            <option value="Branca">Branca</option>
                            <option value="Azul Escuro">Azul Escuro</option>
                            <option value="Cinza">Cinza</option>
                            <option value="Outra / Especificar em Detalhes">Outra (especificar em Detalhes)</option>
                        </select>
                    </div>
                `;
            } else if (selectedValue.toLowerCase().includes('carimbo')) {
                htmlContent = `
                    <div class="form-group">
                        <label for="dynamic-stamp-model">Modelo do Carimbo *</label>
                        <select id="dynamic-stamp-model" required>
                            <option value="Automático (Auto-entintado)">Automático (Auto-entintado)</option>
                            <option value="Madeira Simples">Madeira Simples</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dynamic-stamp-text">Texto para o Carimbo *</label>
                        <input type="text" id="dynamic-stamp-text" required placeholder="Ex: Nome, Cargo, CNPJ, etc.">
                    </div>
                `;
            } else {
                htmlContent = `
                    <div class="form-group">
                        <label for="dynamic-gift-model">Tipo / Modelo do Item *</label>
                        <select id="dynamic-gift-model" required>
                            <option value="Caneca de Cerâmica Branca">Caneca de Cerâmica Branca</option>
                            <option value="Caneca de Chopp Vidro Jateado">Caneca de Chopp Vidro Jateado</option>
                            <option value="Caneca Mágica">Caneca Mágica</option>
                            <option value="Azulejo Cerâmico 20x20cm">Azulejo Cerâmico 20x20cm</option>
                            <option value="Azulejo Cerâmico 10x10cm">Azulejo Cerâmico 10x10cm</option>
                            <option value="Agenda Capa Dura Personalizada">Agenda Capa Dura</option>
                            <option value="Calendário de Mesa/Parede">Calendário de Mesa/Parede</option>
                            <option value="Ímã com Calendário">Ímã com Calendário</option>
                            <option value="Outro / Deixar sob recomendação">Outro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dynamic-art">Situação da Arte *</label>
                        <select id="dynamic-art" required>
                            <option value="Já tenho a arte pronta para impressão">Já tenho a arte pronta</option>
                            <option value="Preciso que criem a arte para mim">Preciso que criem a arte (+ taxa de criação)</option>
                        </select>
                    </div>
                `;
            }
        }
        
        dynamicFieldsContainer.innerHTML = htmlContent;
        dynamicFieldsContainer.classList.add('show');
    };
    
    // Listen to selection changes
    if (productSelect) {
        productSelect.addEventListener('change', updateDynamicFields);
    }
    
    // Bind click events on product cards
    cardRequestButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.getAttribute('data-product');
            
            if (productSelect) {
                // Set the value of select option matching product name
                for (let i = 0; i < productSelect.options.length; i++) {
                    if (productSelect.options[i].value === productName) {
                        productSelect.selectedIndex = i;
                        // Trigger change event programmatically to update dynamic fields
                        productSelect.dispatchEvent(new Event('change'));
                        break;
                    }
                }
            }
            
            // Scroll smoothly to budget form section
            budgetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Focus on the first dynamic input, or fallback to quantity or details
            setTimeout(() => {
                if (dynamicFieldsContainer) {
                    const firstDynamicInput = dynamicFieldsContainer.querySelector('input, select');
                    if (firstDynamicInput) {
                        firstDynamicInput.focus();
                        return;
                    }
                }
                
                if (productName === 'Orçamento Especial') {
                    const detailsTextarea = document.getElementById('form-details');
                    if (detailsTextarea) detailsTextarea.focus();
                } else {
                    const qtyInput = document.getElementById('form-quantity');
                    if (qtyInput) qtyInput.focus();
                }
            }, 800);
        });
    });

    /* ==========================================================================
       WhatsApp Form Generator Link
       ========================================================================== */
    const whatsForm = document.getElementById('whats-form');
    
    if (whatsForm) {
        whatsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const product = document.getElementById('form-product').value;
            const quantity = document.getElementById('form-quantity').value.trim();
            const details = document.getElementById('form-details').value.trim();
            
            const whatsappNumber = '5511989302831'; // Gráfica In Focus Phone
            
            // Constructing WhatsApp prefilled text using bold formatting
            let text = `Olá Gráfica In Focus! Gostaria de solicitar um orçamento pelo site:\n\n`;
            text += `*Nome:* ${name}\n`;
            text += `*Produto:* ${product}\n`;
            text += `*Quantidade:* ${quantity}\n`;
            
            // Collect dynamic fields if present
            let dynamicDetails = '';
            
            const dimField = document.getElementById('dynamic-dimensions');
            if (dimField && dimField.value.trim()) dynamicDetails += `*Dimensões:* ${dimField.value.trim()}\n`;
            
            const matField = document.getElementById('dynamic-material');
            if (matField) dynamicDetails += `*Material:* ${matField.value}\n`;
            
            const papField = document.getElementById('dynamic-paper');
            if (papField) dynamicDetails += `*Papel:* ${papField.value}\n`;
            
            const finField = document.getElementById('dynamic-finish');
            if (finField) dynamicDetails += `*Acabamento:* ${finField.value}\n`;
            
            const colField = document.getElementById('dynamic-color');
            if (colField) dynamicDetails += `*Impressão/Cor:* ${colField.value}\n`;
            
            const pagField = document.getElementById('dynamic-pages');
            if (pagField && pagField.value.trim()) dynamicDetails += `*Páginas/Folhas:* ${pagField.value.trim()}\n`;
            
            const sizeField = document.getElementById('dynamic-size');
            if (sizeField) dynamicDetails += `*Tamanho:* ${sizeField.value}\n`;
            
            const colorGiftField = document.getElementById('dynamic-color-gift');
            if (colorGiftField) dynamicDetails += `*Cor do Item:* ${colorGiftField.value}\n`;
            
            const stampModelField = document.getElementById('dynamic-stamp-model');
            if (stampModelField) dynamicDetails += `*Modelo:* ${stampModelField.value}\n`;
            
            const stampTextField = document.getElementById('dynamic-stamp-text');
            if (stampTextField && stampTextField.value.trim()) dynamicDetails += `*Texto do Carimbo:* ${stampTextField.value.trim()}\n`;
            
            const giftModelField = document.getElementById('dynamic-gift-model');
            if (giftModelField) dynamicDetails += `*Modelo/Tipo:* ${giftModelField.value}\n`;
            
            const artField = document.getElementById('dynamic-art');
            if (artField) dynamicDetails += `*Situação da Arte:* ${artField.value}\n`;
            
            if (dynamicDetails) {
                text += dynamicDetails;
            }
            
            if (details) {
                text += `*Detalhes/Especificações:* ${details}\n`;
            }
            
            // URI Encode message text
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            // Open Link in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    /* ==========================================================================
       Hero Banner Carousel Logic
       ========================================================================== */
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    let slideInterval;
    
    const showSlide = (index) => {
        if (carouselSlides.length === 0) return;
        
        // Remove active class from current slide & dot
        carouselSlides[currentSlide].classList.remove('active');
        carouselDots[currentSlide].classList.remove('active');
        
        // Update index
        currentSlide = (index + carouselSlides.length) % carouselSlides.length;
        
        // Add active class to new slide & dot
        carouselSlides[currentSlide].classList.add('active');
        carouselDots[currentSlide].classList.add('active');
    };
    
    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };
    
    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };
    
    const startAutoSlide = () => {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 6000); // Change banner every 6 seconds
    };
    
    const stopAutoSlide = () => {
        if (slideInterval) clearInterval(slideInterval);
    };
    
    // Event listeners for arrows
    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reset timer
        });
        nextArrow.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reset timer
        });
    }
    
    // Event listeners for dots
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide(); // Reset timer
        });
    });
    
    // Check if images fail to load to display styled fallbacks
    const carouselImages = document.querySelectorAll('.carousel-image');
    carouselImages.forEach(img => {
        const handleImageError = () => {
            img.style.display = 'none';
            const slide = img.closest('.carousel-slide');
            if (slide) {
                slide.classList.add('show-fallback');
            }
        };

        img.addEventListener('error', handleImageError);
        
        // If image has already failed to load before script executed
        if (img.complete && img.naturalWidth === 0) {
            handleImageError();
        }
    });
    
    // Start auto slide on load
    startAutoSlide();
});
