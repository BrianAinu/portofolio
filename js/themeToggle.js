document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const lightThemeLink = document.createElement('link');
    lightThemeLink.rel = 'stylesheet';
    lightThemeLink.href = 'css/light-theme.css';
    lightThemeLink.id = 'light-theme';

    // Check for saved theme preference or default to dark theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.head.appendChild(lightThemeLink);
        document.body.classList.add('light-theme');
        themeToggle.checked = true; // Checked = kanan = light theme
    }

    const toggleTheme = () => {
        if (themeToggle.checked) {
            // Switch to light theme (kanan = terang)
            document.head.appendChild(lightThemeLink);
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme (kiri = gelap)
            const existingLightTheme = document.getElementById('light-theme');
            if (existingLightTheme) {
                existingLightTheme.remove();
            }
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    };

    themeToggle.addEventListener('change', toggleTheme);
}); 