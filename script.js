document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const floatingHeartsContainer = document.getElementById('floating-hearts');

    // Create floating hearts in background
    createFloatingHearts();

    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        questionContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        createConfetti();
    });

    // Make the No button escape from the cursor
    let isMoving = false;

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('mouseenter', moveButton);
    noBtn.addEventListener('touchstart', moveButton);

    function moveButton(e) {
        if (isMoving) return;
        isMoving = true;

        const container = questionContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate available space
        const maxX = container.width - btnRect.width - 40;
        const maxY = container.height - btnRect.height - 40;
        
        // Get random position within the container
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;
        
        // Make sure it doesn't go too close to current position
        const currentX = btnRect.left - container.left;
        const currentY = btnRect.top - container.top;
        
        // If new position is too close, move it further
        if (Math.abs(newX - currentX) < 100 && Math.abs(newY - currentY) < 100) {
            newX = (currentX + 150) % maxX;
            newY = (currentY + 150) % maxY;
        }

        // Ensure values are positive
        newX = Math.max(20, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY));

        // Apply position
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';

        // Reset the moving flag after a short delay
        setTimeout(() => {
            isMoving = false;
        }, 100);
    }

    // Also move button when cursor gets close (within 50px)
    document.addEventListener('mousemove', function(e) {
        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenterX, 2) + 
            Math.pow(e.clientY - btnCenterY, 2)
        );

        if (distance < 80) {
            moveButton(e);
        }
    });

    function createFloatingHearts() {
        const hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '💓', '💞'];
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            floatingHeartsContainer.appendChild(heart);
        }
    }

    function createConfetti() {
        const colors = ['#e91e63', '#ff4081', '#f48fb1', '#ff80ab', '#ff1744', '#f50057', '#c51162'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 30);
        }
    }
});
