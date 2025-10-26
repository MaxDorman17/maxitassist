// Burger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Video fallback for unsupported browsers
const video = document.querySelector('.hero-video');
const fallback = document.querySelector('.hero-fallback');
if (video && fallback) {
    video.addEventListener('error', () => {
        video.style.display = 'none';
        fallback.style.display = 'block';
    });
}

// Form submission feedback
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (form && formMessage) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Message sent successfully!';
                form.reset();
                setTimeout(() => formMessage.style.display = 'none', 3000);
            } else {
                formMessage.style.display = 'block';
                formMessage.style.color = '#ff4d4d';
                formMessage.textContent = 'Error sending message. Please try again.';
            }
        } catch (error) {
            formMessage.style.display = 'block';
            formMessage.style.color = '#ff4d4d';
            formMessage.textContent = 'Network error. Please try again.';
        }
    });
}