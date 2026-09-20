// Module function to trigger audio playback
export function playSound(soundFile) {
    if (!soundFile) return;
    const audio = new Audio(`sounds/${soundFile}`);
    audio.play().catch(err => console.log("Audio playback error:", err));
}

