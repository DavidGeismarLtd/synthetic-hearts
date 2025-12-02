// ===== CHAPTER FILES CONFIGURATION =====
// Define chapter files at the top so they're available to all functions
const chapterFiles = {
    'index': 'chapters/00_INDEX.html',
    '01_world_history': 'chapters/01_WORLD_HISTORY.html',
    '02_the_city': 'chapters/02_THE_CITY.html',
    '03_mechanites': 'chapters/03_MECHANITES.html',
    '04_genovores': 'chapters/04_GENOVORES.html',
    '05_hybrid_cult': 'chapters/05_HYBRID_CULT.html',
    '06_technology': 'chapters/06_TECHNOLOGY.html',
    '07_characters': 'chapters/07_CHARACTERS.html',
    '08_themes': 'chapters/08_THEMES.html',
    '09_plot': 'chapters/09_SEASON_PLOT_OUTLINE.html',
    '10_visual_style': 'chapters/10_VISUAL_STYLE_BIBLE.html'
};

// ===== PARTICLE BACKGROUND =====
const particlesCanvas = document.getElementById('particles');
const ctx = particlesCanvas.getContext('2d');

function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.isMechanite = Math.random() > 0.5;
        this.color = this.isMechanite ? '#06B6D4' : '#10B981';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = p1.isMechanite === p2.isMechanite
                    ? `rgba(${p1.isMechanite ? '6, 182, 212' : '16, 185, 129'}, ${1 - distance / 100})`
                    : `rgba(168, 85, 247, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// ===== CITY CANVAS =====
const cityCanvas = document.getElementById('cityCanvas');
const cityCtx = cityCanvas.getContext('2d');

function resizeCityCanvas() {
    cityCanvas.width = cityCanvas.offsetWidth;
    cityCanvas.height = cityCanvas.offsetHeight;
    drawCity();
}

function drawCity() {
    const width = cityCanvas.width;
    const height = cityCanvas.height;

    // Clear
    cityCtx.clearRect(0, 0, width, height);

    // Background gradient
    const bgGradient = cityCtx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#1E3A8A');
    bgGradient.addColorStop(0.5, '#0A0A0A');
    bgGradient.addColorStop(1, '#064E3B');
    cityCtx.fillStyle = bgGradient;
    cityCtx.fillRect(0, 0, width, height);

    // Upper Machinarium (Mechanite buildings)
    for (let i = 0; i < 15; i++) {
        const x = (i / 15) * width;
        const buildingWidth = width / 20;
        const buildingHeight = Math.random() * (height * 0.4) + height * 0.1;

        const gradient = cityCtx.createLinearGradient(x, 0, x + buildingWidth, 0);
        gradient.addColorStop(0, '#1E3A8A');
        gradient.addColorStop(1, '#06B6D4');

        cityCtx.fillStyle = gradient;
        cityCtx.fillRect(x, 0, buildingWidth - 5, buildingHeight);

        // Windows
        cityCtx.fillStyle = '#06B6D4';
        for (let j = 0; j < buildingHeight / 20; j++) {
            if (Math.random() > 0.3) {
                cityCtx.fillRect(x + 5, j * 20 + 5, buildingWidth - 15, 10);
            }
        }
    }

    // Verdant Depths (Genovore organic structures)
    for (let i = 0; i < 20; i++) {
        const x = (i / 20) * width;
        const treeHeight = Math.random() * (height * 0.5) + height * 0.3;
        const treeWidth = 30;

        // Organic shape
        cityCtx.fillStyle = '#10B981';
        cityCtx.globalAlpha = 0.6;
        cityCtx.beginPath();
        cityCtx.moveTo(x, height);
        cityCtx.quadraticCurveTo(x + treeWidth / 2, height - treeHeight, x + treeWidth, height);
        cityCtx.fill();

        // Bioluminescent glow
        const glowGradient = cityCtx.createRadialGradient(x + treeWidth / 2, height - treeHeight / 2, 0, x + treeWidth / 2, height - treeHeight / 2, 50);
        glowGradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
        glowGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        cityCtx.fillStyle = glowGradient;
        cityCtx.fillRect(x - 20, height - treeHeight / 2 - 20, treeWidth + 40, 40);
    }

    cityCtx.globalAlpha = 1;
}

if (cityCanvas) {
    resizeCityCanvas();
    window.addEventListener('resize', resizeCityCanvas);
}

// ===== CHARACTER PORTRAITS =====
function drawRomeoPortrait() {
    const canvas = document.getElementById('romeoPortrait');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#1E3A8A');
    bgGradient.addColorStop(1, '#06B6D4');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Cybernetic patterns
    ctx.strokeStyle = '#C0C0C0';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }

    // Glowing eye
    const eyeGradient = ctx.createRadialGradient(width * 0.7, height * 0.3, 0, width * 0.7, height * 0.3, 50);
    eyeGradient.addColorStop(0, '#06B6D4');
    eyeGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.fillStyle = eyeGradient;
    ctx.fillRect(width * 0.6, height * 0.2, 100, 100);

    // Circuit lines
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 30, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

function drawJuliennePortrait() {
    const canvas = document.getElementById('juliennePortrait');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#064E3B');
    bgGradient.addColorStop(0.5, '#10B981');
    bgGradient.addColorStop(1, '#8B5CF6');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Bioluminescent patterns
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 20 + 5;

        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        glowGradient.addColorStop(0, '#10B981');
        glowGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Organic flowing lines
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * height);
        for (let j = 0; j < width; j += 50) {
            ctx.quadraticCurveTo(
                j + 25, Math.random() * height,
                j + 50, Math.random() * height
            );
        }
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

// ===== FACTION VISUALS =====
function drawMechaniteVisual() {
    const canvas = document.getElementById('mechaniteVisual');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Geometric grid
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;

    const gridSize = 30;
    for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.globalAlpha = 1;

    // Glowing nodes
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, '#06B6D4');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 20, y - 20, 40, 40);
    }
}

function drawGenovoreVisual() {
    const canvas = document.getElementById('genovoreVisual');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Organic background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    bgGradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Flowing organic shapes
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 15; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#10B981' : '#8B5CF6';
        ctx.beginPath();
        ctx.arc(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 40 + 10,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// ===== MECHA VISUAL =====
function drawMechaVisual() {
    const canvas = document.getElementById('mechaVisual');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#1E3A8A');
    bgGradient.addColorStop(0.5, '#0A0A0A');
    bgGradient.addColorStop(1, '#064E3B');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Mecha silhouette (simplified)
    const centerX = width / 2;
    const centerY = height / 2;

    // Body
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(centerX - 40, centerY - 60, 80, 120);

    // Head
    ctx.fillRect(centerX - 30, centerY - 100, 60, 40);

    // Arms
    ctx.fillRect(centerX - 80, centerY - 40, 30, 80);
    ctx.fillRect(centerX + 50, centerY - 40, 30, 80);

    // Legs
    ctx.fillRect(centerX - 30, centerY + 60, 25, 80);
    ctx.fillRect(centerX + 5, centerY + 60, 25, 80);

    // Glowing eyes
    const eyeGradient = ctx.createRadialGradient(centerX, centerY - 80, 0, centerX, centerY - 80, 30);
    eyeGradient.addColorStop(0, '#06B6D4');
    eyeGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.fillStyle = eyeGradient;
    ctx.fillRect(centerX - 30, centerY - 95, 60, 30);

    // Energy lines
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 60);
        ctx.lineTo(centerX + (Math.random() - 0.5) * 100, centerY + (Math.random() - 0.5) * 100);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

// ===== INITIALIZE ALL VISUALS =====
function initializeVisuals() {
    drawRomeoPortrait();
    drawJuliennePortrait();
    drawMechaniteVisual();
    drawGenovoreVisual();
    drawMechaVisual();
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVisuals);
} else {
    initializeVisuals();
}

// Redraw on resize
window.addEventListener('resize', () => {
    setTimeout(initializeVisuals, 100);
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.concept-card, .district-card, .faction, .character-card, .timeline-item, .theme-card, .visual-column').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== RAIN EFFECT =====
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    if (!rainContainer) {
        console.error('Rain container not found');
        return;
    }

    const rainCount = 50;

    for (let i = 0; i < rainCount; i++) {
        const rain = document.createElement('div');
        rain.className = 'rain';
        rain.style.left = Math.random() * 100 + '%';
        rain.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        rain.style.animationDelay = Math.random() * 2 + 's';
        rainContainer.appendChild(rain);
    }
}

// Initialize rain effect when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createRain);
} else {
    createRain();
}

// ===== CHAPTER READER =====
function showChapter(chapterId) {
    console.log('showChapter called with:', chapterId);

    const chapterModal = document.getElementById('chapterModal');

    if (!chapterModal) {
        console.error('Chapter modal element not found!');
        return;
    }

    chapterModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update active state in sidebar
    document.querySelectorAll('.chapter-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-chapter') === chapterId) {
            link.classList.add('active');
        }
    });

    // Load chapter content
    loadChapter(chapterId);
}

function closeChapter() {
    const chapterModal = document.getElementById('chapterModal');
    if (!chapterModal) return;

    chapterModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

async function loadChapter(chapterId) {
    console.log('loadChapter called with:', chapterId);
    console.log('Chapter file path:', chapterFiles[chapterId]);

    const chapterContent = document.getElementById('chapterContent');

    if (!chapterContent) {
        console.error('Chapter content element not found!');
        return;
    }

    chapterContent.innerHTML = '<div class="loading">Loading chapter...</div>';

    try {
        const filePath = chapterFiles[chapterId];
        console.log('Fetching:', filePath);
        const response = await fetch(filePath);
        console.log('Response status:', response.status);

        if (!response.ok) throw new Error('Chapter not found');

        const html = await response.text();
        console.log('Loaded HTML length:', html.length);
        chapterContent.innerHTML = html;
        chapterContent.scrollTop = 0;
    } catch (error) {
        console.error('Error loading chapter:', error);
        chapterContent.innerHTML = `
            <div class="loading">
                <h2>Error Loading Chapter</h2>
                <p>Could not load the chapter content. Please try again.</p>
                <p style="color: var(--text-dim); font-size: 0.9rem;">File: ${chapterFiles[chapterId]}</p>
                <p style="color: var(--text-dim); font-size: 0.9rem;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

    return html;
}

// ===== NAVIGATION FUNCTIONS =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeNav() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

function toggleDropdown(event) {
    event.preventDefault();
}

// ===== GALLERY VIDEO TOGGLE =====
function toggleVideo(button) {
    const videoItem = button.closest('.video-item');
    const video = videoItem.querySelector('video');

    if (video.paused) {
        video.play();
        button.textContent = '⏸';
    } else {
        video.pause();
        button.textContent = '▶';
    }
}

// Close chapter modal on escape key
document.addEventListener('keydown', (e) => {
    const chapterModal = document.getElementById('chapterModal');
    if (e.key === 'Escape' && chapterModal && chapterModal.classList.contains('active')) {
        closeChapter();
    }
});

// Close chapter modal on background click
document.addEventListener('click', (e) => {
    const chapterModal = document.getElementById('chapterModal');
    if (chapterModal && e.target === chapterModal) {
        closeChapter();
    }
});
