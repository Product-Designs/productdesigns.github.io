// Pip-Boy Terminal Interface JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const activeTitle = document.getElementById('activeTitle');
    const activeDescription = document.getElementById('activeDescription');
    const valType = document.getElementById('valType');
    const valRole = document.getElementById('valRole');
    const valYear = document.getElementById('valYear');

    function updateDisplay(item) {
        // Update content
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const meta = JSON.parse(item.getAttribute('data-meta') || '[]');

        activeTitle.textContent = title;
        activeDescription.textContent = description;

        // Update meta fields
        // We look for specific labels: 'Platform' or 'Type', 'Role', 'Year'
        const typeMeta = meta.find(m => m.label.toLowerCase() === 'platform' || m.label.toLowerCase() === 'type');
        const roleMeta = meta.find(m => m.label.toLowerCase() === 'role');
        const yearMeta = meta.find(m => m.label.toLowerCase() === 'year');

        valType.textContent = typeMeta ? typeMeta.value : '---';
        valRole.textContent = roleMeta ? roleMeta.value : '---';
        valYear.textContent = yearMeta ? yearMeta.value : '---';

        // Update active state in menu
        menuItems.forEach(mi => mi.classList.remove('active'));
        item.classList.add('active');

        // Add a little flicker effect on update
        const contentArea = document.getElementById('contentArea');
        contentArea.style.animation = 'none';
        void contentArea.offsetWidth; // trigger reflow
        contentArea.style.animation = 'textFlicker 0.3s ease-out';
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            updateDisplay(item);
        });
    });

    // Theme Switcher Logic
    const themeGreen = document.getElementById('themeGreen');
    const themeOrange = document.getElementById('themeOrange');

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

    // Initialize with first item
    if (menuItems.length > 0) {
        updateDisplay(menuItems[0]);
    }
});
