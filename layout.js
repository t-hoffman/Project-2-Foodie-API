const icon = document.querySelector('.icon');
const navLinks = document.querySelector('.nav-links');
icon.addEventListener('click', () => {
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
});