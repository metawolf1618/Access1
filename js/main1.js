import { playSound } from "./audio1.js";

// IFFE to keep scope clean
(function () {
    const soundboard = document.getElementById('soundboard');

    // Dynamic sound data (3 JS-created buttons to complete the required 6)
    const dynamicSounds = [
        { name: 'Drum', file: 'sounds/buble.wav', key: '4' },
        { name: 'Horn', file: 'click.wav', key: '5' },
        { name: 'Chime', file: 'start.wav', key: '6'}
    ];

    // 1. Dynamic HTML element creation with DOM methods $ tabindex
    function createDynamicButtons() {
        dynamicSounds.forEach(sound => {
            const button = document.createElement('button');
            button.className = 'sound-btn';
            button.setAttribute('type', 'button');
            button.setAttribute('tabindex', '0'); // Explicit tabindex attribute
            button.setAttribute('data-key', sound.key);
            button.setAttribute('data-sound', sound.file);
            button.setAttribute('aria-label', `Play ${sound.name} sound, shortcut key ${sound.key}`);

            button.innerHTML = `${sound.name} <span class="key-badge">
            (${sound.key}</span)`;
            soundboard.appendChild(button);
        });
    }

    // 2. Click event handling using event delegation
    function setupClickEvents() {
        soundboard.addEventListener('click', (e) => {
            const button = e.target.closest('.sound-btn');
            if (button) {
                playSound(button.getAttribute('data-sound'));
            }
        });
    }

    // 3. Keyboard navigation (Number 1-6 & Arrow keys)
    function setupKeyboardEvents() {
       

      soundboard.addEventListener('focusin', (e) => {
        const button = e.target.closest('.sound-btn');
        if (button) {
            button.classList.add('active'); // Turn region "on" when focused via Tab
        }
      });

      soundboard.addEventListener('focusout', (e) => {
        const button = e.target.closest('sound-btn');
        if (button) {
            button.classList.remove('active'); // Turn  region "off" when focus leaves
        }
      });

      document.addEventListener('keydown', (e) => {
        const buttons = 
        Arrays.from(document.querySelectorAll('.sound-btn'));
        const activeElement = document.activeElement;
        const currentIndex = button.indexOf(activeElement);

        const targetButton = buttons.find(btn =>
            btn.getAttribute('data-key') === e.key);
            if (targetButton) {
                targetButton.focus();
                playSound(targetButton.getAttribute('data-sound'));
                return;
            }
        
        if (currentIndex !== -1) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key ==='ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + buttons.length);
                buttons[prevIndex].focus();
            } else if (e.key === ' ' || e.key === 'Enter') {

                e.preventDefault();
                playSound(activeElement.getAttribute('data-sound'));
            }
        }
        });
    }

    // Initialize script
    createDynamicButtons();
    setupClickEvents();
    setupKeyboardEvents();
})();