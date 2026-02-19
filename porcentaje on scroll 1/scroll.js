const scrollToTopBtn = document.getElementById('scroll-to-top');
const progressText = document.getElementById('progress-text');
const arrow = document.getElementById('arrow');
const progressCircle = document.getElementById('progress-circle');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const clampedPercent = Math.min(Math.floor(scrollPercent), 100);

    progressText.textContent = `${clampedPercent}%`;

    const angle = clampedPercent * 3.6;
    progressCircle.style.background = `conic-gradient(#333 ${angle}deg, #ddd ${angle}deg 360deg)`;

    if (clampedPercent >= 100) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
