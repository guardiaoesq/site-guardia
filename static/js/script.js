const galleryData = {
    "carousel": ["20250729_120918.jpg", "470810974_2001471690329977_3285965425283018181_n.png", "blusa.png", "Elegancia.png", "janelas.png", "Seguranca.png"],
    "boxes": ["20250716_162926.jpg", "20250717_134316.jpg", "20250718_150234_1.jpg", "20250721_162346.jpg", "Box_de_Canto_temperados_8mm_incolor_e_kit_Preto..jpg", "boxe-canto-branco.jpg", "boxe-canto-preto.jpg"],
    "coberturas": ["Cobertura_de_vidro_8mm__pelicula_anti_vandalismo_ficou_show..png", "cobertura_telhado.jpg"],
    "corrimaos": ["corrimao_branco.jpg"],
    "covers": ["20250718_150234_1.jpg", "20250718_150350.jpg", "20250729_153301.jpg", "20250804_155623_1.jpg", "20250804_155851.jpg", "brise_fachada.png", "cobertura_telhado_o_branco.jpg", "corrimao_branco.jpg", "portao.png", "fechada_vidro.png"],
    "fachadas": ["brise_fachada.png"],
    "fechamentos": ["20250724_154629.jpg", "20250729_152039.jpg", "20250729_153301.jpg", "Brise_lado_esquerdo_20_pavimento....jpg", "fechamento_1.jpg", "fechamento_pia_1.jpg", "fechamento_2.jpg", "fechamento_painel_1.jpg", "parede_vidro.jpg", "fachada_restaurante.png", "fachada_restaurante_2.png"],
    "guarda-corpos": ["20250718_150350.jpg", "20250723_092746.jpg", "20250724_154629.jpg", "porta-guar-corpo.jpg", "sacada_vidro.jpg", "obra_colegio.jpg"],
    "janelas": ["20250721_162413.jpg", "20250729_152039.jpg", "20250729_153301.jpg", "20250731_152831.png", "fechamento_1.jpg", "IMG-20250722-WA0023.jpeg", "janela-04-folhas.jpg", "janela-basculante.jpg", "janela-correr-02-folhas.jpg", "janelas-correr-03-folhas-versatik.jpg", "janela_2_folhas.jpg"],
    "portas-de-correr": ["20250724_154629.jpg", "20250731_152831.png", "20250804_155851.jpg", "porta-correr-04-folhas-pr.jpg", "porta-guar-corpo.jpg", "porta-versatik-cs.jpg"],
    "portas-pivotantes": ["20250804_155623_1.jpg", "porta-pivotante-bs.jpg"],
    "portoes-": ["brise_fachada.png", "portao_garagem.jpg", "portao_cantina.jpg", "portao.png", "portao-garagem-branco.jpg"]
};

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MENU MOBILE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em qualquer link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- 2. CARROSSEL (PÁGINA INDEX) ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer && galleryData.carousel.length > 0) {
        carouselContainer.innerHTML = ''; 
        galleryData.carousel.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <img src="static/img/carousel/${img}" alt="Serviço Guardião">
                <div class="carousel-overlay"></div>
            `;
            carouselContainer.appendChild(slide);
        });

        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    }

    // --- 3. GALERIA E LIGHTBOX (PÁGINA PORTFOLIO) ---
    const grid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    
    if (grid) {
        const renderGallery = (filter) => {
            grid.innerHTML = '';
            Object.entries(galleryData).forEach(([category, images]) => {
                // Pular pastas que não são da galeria principal
                if (category === 'carousel' || category === 'covers') return;
                
                if (filter === 'all' || filter === category) {
                    images.forEach(imgName => {
                        const item = document.createElement('div');
                        item.className = 'gallery-item';
                        item.innerHTML = `
                            <img src="static/img/gallery/${category}/${imgName}" alt="${category}" loading="lazy">
                            <div class="gallery-info"><span>${category.replace(/-/g, ' ')}</span></div>
                        `;
                        
                        // Evento para abrir o Lightbox
                        item.addEventListener('click', () => {
                            if (lightbox) {
                                const fullImg = lightbox.querySelector('img');
                                fullImg.src = item.querySelector('img').src;
                                lightbox.style.display = 'flex';
                                document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
                            }
                        });
                        
                        grid.appendChild(item);
                    });
                }
            });
        };

        // Renderização inicial (Todos)
        renderGallery('all');

        // Configuração dos botões de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderGallery(btn.getAttribute('data-filter'));
            });
        });
    }

    // Lógica para fechar o Lightbox
    if (lightbox) {
        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Destrava o scroll
        };

        const closeBtn = document.querySelector('.close-lightbox');
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        
        // Fechar ao clicar fora da imagem
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});