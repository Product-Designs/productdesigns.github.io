/**
 * Pip-Boy Terminal Interface
 * Handles project navigation, theme switching, and terminal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements - Terminal Details
    const menuItems = document.querySelectorAll('.menu-item');
    const activeTitle = document.getElementById('activeTitle');
    const activeDescription = document.getElementById('activeDescription');
    const contentArea = document.getElementById('contentArea');

    // UI Elements - Meta Boxes
    const valType = document.getElementById('valType');
    const valRole = document.getElementById('valRole');
    const valYear = document.getElementById('valYear');

    // UI Elements - Theme Switcher
    const themeGreen = document.getElementById('themeGreen');
    const themeOrange = document.getElementById('themeOrange');

    /**
     * Updates the terminal display with project data
     * @param {HTMLElement} item - The clicked menu item 
     */
    function updateDisplay(item) {
        // Parse data from attributes
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const meta = JSON.parse(item.getAttribute('data-meta') || '[]');

        // Update core content
        activeTitle.textContent = title;
        activeDescription.textContent = description;

        // Update meta fields (filtering by known labels)
        const typeMeta = meta.find(m => ['platform', 'type'].includes(m.label.toLowerCase()));
        const roleMeta = meta.find(m => m.label.toLowerCase() === 'role');
        const yearMeta = meta.find(m => m.label.toLowerCase() === 'year');

        valType.textContent = typeMeta ? typeMeta.value : '---';
        valRole.textContent = roleMeta ? roleMeta.value : '---';
        valYear.textContent = yearMeta ? yearMeta.value : '---';

        // Update active menu state
        menuItems.forEach(mi => mi.classList.remove('active'));
        item.classList.add('active');

        // Trigger terminal flicker animation
        contentArea.style.animation = 'none';
        void contentArea.offsetWidth; // Force reflow
        contentArea.style.animation = 'text-flicker 0.3s ease-out';
    }

    // Event Listeners - Project Navigation
    menuItems.forEach(item => {
        item.addEventListener('click', () => updateDisplay(item));
    });

    // Event Listeners - Theme Switcher
    if (themeGreen && themeOrange) {
        themeGreen.addEventListener('click', () => {
            document.body.classList.remove('theme-orange');
            themeGreen.classList.add('active');
            themeOrange.classList.remove('active');
        });

        themeOrange.addEventListener('click', () => {
            document.body.classList.add('theme-orange');
            themeOrange.classList.add('active');
            themeGreen.classList.remove('active');
        });
    }

    // Initialize display with the first project
    if (menuItems.length > 0) {
        updateDisplay(menuItems[0]);
    }
});
