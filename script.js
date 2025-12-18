// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Fetch GitHub repositories
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/coderXdevelop/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        const container = document.getElementById('projects-container');
        
        if (repos.length === 0) {
            container.innerHTML = '<p class="loading">No projects found. Check back soon!</p>';
            return;
        }

        container.innerHTML = '';
        
        // Add GitHub repos
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <p style="font-size: 0.9rem; color: rgba(255,255,255,0.5); margin-bottom: 1rem;">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
                <a href="${repo.html_url}" target="_blank" class="project-link">View Project →</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        document.getElementById('projects-container').innerHTML = 
            '<p class="loading">Unable to load projects. Please visit my <a href="https://github.com/coderXdevelop" target="_blank" style="color: #667eea;">GitHub profile</a>.</p>';
    }
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate single field
function validateField(field, errorElement, validationFunction, errorMessage) {
    const value = field.value.trim();
    
    if (value === '') {
        errorElement.textContent = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
        field.classList.add('invalid');
        field.classList.remove('valid');
        return false;
    }
    
    if (validationFunction && !validationFunction(value)) {
        errorElement.textContent = errorMessage;
        field.classList.add('invalid');
        field.classList.remove('valid');
        return false;
    }
    
    errorElement.textContent = '';
    field.classList.remove('invalid');
    field.classList.add('valid');
    return true;
}

// Real-time validation
function setupFormValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Name validation
    nameField.addEventListener('blur', () => {
        validateField(nameField, nameError);
    });
    
    nameField.addEventListener('input', () => {
        if (nameField.classList.contains('invalid')) {
            validateField(nameField, nameError);
        }
    });
    
    // Email validation
    emailField.addEventListener('blur', () => {
        validateField(emailField, emailError, validateEmail, 'Please enter a valid email address');
    });
    
    emailField.addEventListener('input', () => {
        if (emailField.classList.contains('invalid')) {
            validateField(emailField, emailError, validateEmail, 'Please enter a valid email address');
        }
    });
    
    // Message validation
    messageField.addEventListener('blur', () => {
        validateField(messageField, messageError);
    });
    
    messageField.addEventListener('input', () => {
        if (messageField.classList.contains('invalid')) {
            validateField(messageField, messageError);
        }
    });
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Validate all fields
    const isNameValid = validateField(nameField, nameError);
    const isEmailValid = validateField(emailField, emailError, validateEmail, 'Please enter a valid email address');
    const isMessageValid = validateField(messageField, messageError);
    
    // If all fields are valid, submit the form
    if (isNameValid && isEmailValid && isMessageValid) {
        const name = nameField.value;
        const email = emailField.value;
        
        alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon!`);
        
        // Clear form and validation states
        this.reset();
        nameField.classList.remove('valid', 'invalid');
        emailField.classList.remove('valid', 'invalid');
        messageField.classList.remove('valid', 'invalid');
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    fetchGitHubProjects();
    setupFormValidation();
});