import { registerExtension } from '../../extensions.js';

function createEldritchEyeSVG() {
    return `
    <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer glow/sclera -->
        <ellipse cx="50" cy="30" rx="45" ry="25" fill="#1a0a0a" stroke="#3d0000" stroke-width="2"/>
        <!-- Iris -->
        <ellipse cx="50" cy="30" rx="20" ry="20" fill="#2d0000"/>
        <!-- Pupil (slit-like, inhuman) -->
        <ellipse cx="50" cy="30" rx="3" ry="18" fill="#000000"/>
        <!-- Inner glow -->
        <ellipse cx="50" cy="30" rx="15" ry="15" fill="none" stroke="#ff0000" stroke-width="1" opacity="0.5"/>
        <!-- Highlight -->
        <ellipse cx="42" cy="22" rx="5" ry="3" fill="#ff4444" opacity="0.6"/>
    </svg>`;
}

// Add floating eyes to background
function addFloatingEyes() {
    const container = document.createElement('div');
    container.className = 'eldritch-eyes-container';
    container.id = 'eldritch-eyes-bg';
    document.body.appendChild(container);
    
    for (let i = 0; i < 8; i++) {
        const eye = document.createElement('div');
        eye.className = 'eldritch-eye';
        eye.innerHTML = createEldritchEyeSVG();
        eye.style.left = Math.random() * 90 + '%';
        eye.style.top = Math.random() * 90 + '%';
        eye.style.animationDelay = Math.random() * 4 + 's';
        eye.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(eye);
        
        // Random visibility
        setInterval(() => {
            eye.classList.toggle('visible', Math.random() > 0.7);
        }, 3000 + Math.random() * 4000);
    }
}

// Add eyes to individual messages
function addMessageEyes() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList?.contains('message')) {
                    if (!node.querySelector('.eldritch-message-eye') && Math.random() > 0.6) {
                        const eye = document.createElement('div');
                        eye.className = 'eldritch-message-eye';
                        eye.innerHTML = createEldritchEyeSVG();
                        node.appendChild(eye);
                        
                        setTimeout(() => eye.classList.add('visible'), 500);
                    }
                }
            });
        });
    });
    
    const chat = document.getElementById('chat');
    if (chat) {
        observer.observe(chat, { childList: true, subtree: true });
    }
}

registerExtension({
    name: 'Eldritch Eyes',
    id: 'eldritchEyes',
    description: 'Adds blinking eldritch eyes to chat',
    version: '1.0.0',
    async init() {
        console.log('Eldritch Eyes extension initialized');
        addFloatingEyes();
        addMessageEyes();
    },
});
