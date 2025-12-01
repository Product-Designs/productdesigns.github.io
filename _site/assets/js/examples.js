// Examples page interactions

document.addEventListener('DOMContentLoaded', () => {
    // Replay animations button
    const replayButton = document.getElementById('replayAnimations');
    const animationExamples = document.querySelector('.animation-examples');

    if (replayButton && animationExamples) {
        replayButton.addEventListener('click', () => {
            // Remove animations
            animationExamples.classList.add('replaying');

            // Force reflow
            void animationExamples.offsetWidth;

            // Re-add animations after a brief delay
            setTimeout(() => {
                animationExamples.classList.remove('replaying');
            }, 50);
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.design-card-example');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log('Card hovered - demo interaction');
        });
    });

    // Animate progress bar on scroll into view
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation
                    progressFill.style.transition = 'none';
                    progressFill.style.width = '0%';

                    setTimeout(() => {
                        progressFill.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
                        progressFill.style.width = '60%';
                    }, 100);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(progressFill.parentElement);
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
