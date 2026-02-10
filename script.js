document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const floatingHeartsContainer = document.getElementById('floating-hearts');
    const mainGif = document.getElementById('main-gif');
    const successGif = document.getElementById('success-gif');

    // Create floating hearts in background
    createFloatingHearts();

    // Replace GIFs with GIPHY CDN and use fallback if blocked
    [mainGif, successGif].forEach(img => {
        if (!img) return;
        img.addEventListener('error', () => {
            const fb = img.getAttribute('data-fallback');
            if (fb) img.src = fb;
        });
        // Try loading via Image first; if it fails quickly, fallback
        const test = new Image();
        test.onload = () => { /* ok */ };
        test.onerror = () => { const fb = img.getAttribute('data-fallback'); if (fb) img.src = fb; };
        test.src = img.src;
    });

    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        questionContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        createConfetti();
        createBurstHearts();
    });

    // No button - stays in place but pops after a few clicks
    let noButtonTries = 0;
    const maxTries = 5; // Button pops after 5 tries

    noBtn.addEventListener('click', handleNoClick);
    noBtn.addEventListener('touchend', handleNoClick);

    function handleNoClick(e) {
        e.preventDefault();
        if (noBtn.style.display === 'none') return;
        
        noButtonTries++;
        
        // Check if button should pop
        if (noButtonTries >= maxTries) {
            popBalloon();
            return;
        }
        
        // Make button shrink slightly with each try
        const shrinkFactor = 1 - (noButtonTries * 0.1);
        noBtn.style.transform = `scale(${shrinkFactor})`;
        
        // Add shake animation
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 400);
    }

    function popBalloon() {
        // Get button position for the pop effect
        const btnRect = noBtn.getBoundingClientRect();
        const centerX = btnRect.left + btnRect.width / 2;
        const centerY = btnRect.top + btnRect.height / 2;

        // Add pop animation class
        noBtn.classList.add('balloon-pop');
        
        // Create pop particles
        const colors = ['#9e9e9e', '#757575', '#616161', '#ff8a80', '#ff5252'];
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'pop-particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(particle);
            
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 80 + Math.random() * 60;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
            ], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)' });
            
            setTimeout(() => particle.remove(), 700);
        }

        // Create "POP!" text
        const popText = document.createElement('div');
        popText.className = 'pop-text';
        popText.textContent = 'POP! 🎈';
        popText.style.left = centerX + 'px';
        popText.style.top = centerY + 'px';
        document.body.appendChild(popText);
        
        popText.animate([
            { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
            { transform: 'translate(-50%, -150%) scale(1.5)', opacity: 0 }
        ], { duration: 800, easing: 'ease-out' });
        
        setTimeout(() => popText.remove(), 900);

        // Hide button after animation
        setTimeout(() => {
            noBtn.style.display = 'none';
        }, 300);
    }

    function createFloatingHearts() {
        const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '💓', '💞'];
        
        for (let i = 0; i < 18; i++) {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.animationDuration = (5 + Math.random() * 6) + 's';
            heart.style.fontSize = (12 + Math.random() * 22) + 'px';
            floatingHeartsContainer.appendChild(heart);
        }
    }

    function createBurstHearts() {
        const center = successGif.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
            const h = document.createElement('div');
            h.className = 'burst-heart';
            h.textContent = '💖';
            h.style.left = (center.left + center.width/2) + 'px';
            h.style.top = (center.top + center.height/2) + 'px';
            document.body.appendChild(h);
            const dx = (Math.random() - 0.5) * 300;
            const dy = -Math.random() * 300 - 40;
            h.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(${0.6+Math.random()})`, opacity: 0 }
            ], { duration: 1200 + Math.random()*600, easing: 'cubic-bezier(.2,.8,.2,1)' });
            setTimeout(() => h.remove(), 2200);
        }
    }

    function createConfetti() {
        const colors = ['#e91e63', '#ff4081', '#f48fb1', '#ff80ab', '#ff1744', '#f50057', '#c51162'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.width = (Math.random() * 10 + 6) + 'px';
                confetti.style.height = (Math.random() * 10 + 6) + 'px';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3500);
            }, i * 18);
        }
    }
});
