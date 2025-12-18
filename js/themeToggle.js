document.addEventListener('DOMContentLoaded', () => {
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    const lightThemeLink = document.createElement('link');
    lightThemeLink.rel = 'stylesheet';
    lightThemeLink.href = 'css/light-theme.css';
    lightThemeLink.id = 'light-theme';

    const toggleTheme = () => {
        if (document.getElementById('light-theme')) {
            document.getElementById('light-theme').remove();
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.head.appendChild(lightThemeLink);
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    themeIcon.addEventListener('click', toggleTheme);
    themeLabel.addEventListener('click', toggleTheme);
}); 