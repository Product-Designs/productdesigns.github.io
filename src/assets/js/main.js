// Main JavaScript for design showcase carousel

document.addEventListener('DOMContentLoaded', () => {
    const trail = document.getElementById('trail');
    const nextHint = document.getElementById('nextHint');
    const prevHint = document.getElementById('prevHint');
    const progressIndicator = document.getElementById('progressIndicator');
    const cards = document.querySelectorAll('.design-card');
    const detailSection = document.getElementById('detailSection');
    const detailClose = document.getElementById('detailClose');
    const detailImage = document.getElementById('detailImage');
    const detailScreenshot = document.getElementById('detailScreenshot');
    const detailBadge = document.getElementById('detailBadge');
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailMeta = document.getElementById('detailMeta');

    // Get card data from data attributes
    const cardData = Array.from(cards).map(card => ({
        title: card.dataset.title,
        badge: card.dataset.badge,
        gradient: card.dataset.gradient,
        screenshot: card.dataset.screenshot,
        description: card.dataset.description,
        meta: JSON.parse(card.dataset.meta || '[]')
    }));

    // Function to show detail section with card data
    function showDetail(index) {
        const data = cardData[index];

        // Populate detail section
        detailImage.style.backgroundImage = data.gradient;
        detailBadge.textContent = data.badge;
        detailScreenshot.src = data.screenshot;
        detailTitle.textContent = data.title;
        detailDescription.textContent = data.description;

        // Clear and populate meta items
        detailMeta.innerHTML = '';
        data.meta.forEach(item => {
            const metaItem = document.createElement('div');
            metaItem.className = 'meta-item';
            metaItem.innerHTML = `
                <div class="meta-label">${item.label}</div>
                <div class="meta-value">${item.value}</div>
            `;
            detailMeta.appendChild(metaItem);
        });

        // Show detail section
        detailSection.classList.add('active');

        // Scroll to detail section smoothly
        setTimeout(() => {
            detailSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Function to hide detail section
    function hideDetail() {
        detailSection.classList.remove('active');
    }

    // Close button handler
    if (detailClose) {
        detailClose.addEventListener('click', hideDetail);
    }

    // Create progress dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (index === 0) dot.classList.add('active');
        progressIndicator.appendChild(dot);
    });

    const dots = document.querySelectorAll('.progress-dot');

    // Set first card as focused initially
    if (cards.length > 0) {
        cards[0].classList.add('focused');
    }

    // Function to update navigation buttons visibility
    function updateNavButtons(currentIndex) {
        // Show/hide next button
        if (currentIndex >= cards.length - 1) {
            nextHint.style.opacity = '0';
            nextHint.style.pointerEvents = 'none';
        } else {
            nextHint.style.opacity = '1';
            nextHint.style.pointerEvents = 'auto';
        }

        // Show/hide prev button
        if (currentIndex <= 0) {
            prevHint.style.opacity = '0';
            prevHint.style.pointerEvents = 'none';
        } else {
            prevHint.style.opacity = '1';
            prevHint.style.pointerEvents = 'auto';
        }
    }

    // Get card width accounting for responsive sizing
    function getCardWidth() {
        const gap = window.innerWidth <= 768 ? 20 : 30;
        return cards[0].offsetWidth + gap;
    }

    // Update card visibility and progress based on scroll
    trail.addEventListener('scroll', () => {
        // Find which card is closest to the center of the viewport
        const trailRect = trail.getBoundingClientRect();
        const centerX = trailRect.left + trailRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(centerX - cardCenterX);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        // Update all cards based on their distance from the focused card
        cards.forEach((card, index) => {
            const distance = Math.abs(index - closestIndex);

            if (distance === 0) {
                card.classList.remove('peeking');
                card.classList.add('focused');
                dots[index].classList.add('active');
            } else {
                card.classList.remove('focused');
                if (distance === 1) {
                    card.classList.add('peeking');
                    const translateX = window.innerWidth <= 768 ? '30px' : '50px';
                    const scale = window.innerWidth <= 768 ? '0.9' : '0.85';
                    card.style.transform = `scale(${scale}) translateX(${translateX})`;
                    dots[index].classList.remove('active');
                } else {
                    card.classList.add('peeking');
                    const translateX = window.innerWidth <= 768 ? '50px' : '80px';
                    const scale = window.innerWidth <= 768 ? '0.85' : '0.75';
                    card.style.transform = `scale(${scale}) translateX(${translateX})`;
                    dots[index].classList.remove('active');
                }
            }
        });

        updateNavButtons(closestIndex);
    });

    // Next button functionality
    nextHint.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        trail.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    // Previous button functionality
    prevHint.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        trail.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Card click to expand and show details
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Scroll card into view
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });

            // Show detail section after a brief delay
            setTimeout(() => {
                showDetail(index);
            }, 600);
        });
    });

    // Handle window resize to recalculate positions
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Find which card is closest to center after resize
            const trailRect = trail.getBoundingClientRect();
            const centerX = trailRect.left + trailRect.width / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(centerX - cardCenterX);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            updateNavButtons(closestIndex);
        }, 100);
    });
});
