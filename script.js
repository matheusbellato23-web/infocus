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
       Product Card Budget Trigger
       ========================================================================== */
    const cardRequestButtons = document.querySelectorAll('.btn-card-request');
    const productSelect = document.getElementById('form-product');
    const budgetSection = document.getElementById('orcamento');
    
    cardRequestButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.getAttribute('data-product');
            
            if (productSelect) {
                // Set the value of select option matching product name
                // First search the options
                for (let i = 0; i < productSelect.options.length; i++) {
                    if (productSelect.options[i].value === productName) {
                        productSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Scroll smoothly to budget form section
            budgetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Focus on quantity input
            setTimeout(() => {
                const qtyInput = document.getElementById('form-quantity');
                if (qtyInput) qtyInput.focus();
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
});
