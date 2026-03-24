/**
 * theme-loader.js
 * Injected into <head> to prevent theme flickering.
 */
(function () {
    try {
        const settings = JSON.parse(localStorage.getItem('user_settings') || '{}');
        if (settings.theme === 'light') {
            document.documentElement.classList.add('light-mode');
            // Adding to documentElement because body might not exist yet
            // We should ensure CSS uses .light-mode broadly or document.body inherits it.
            // Let's also add a listener to apply to body once loaded.
            window.addEventListener('DOMContentLoaded', () => {
                document.body.classList.add('light-mode');
            });
        }
    } catch (e) { }
})();
