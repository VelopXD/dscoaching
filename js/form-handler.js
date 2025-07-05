/**
 * Form Handler for DS Coaching Classes
 * Handles form validation and submission for contact and newsletter forms
 */

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contact-success');
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    // Modal Newsletter Form
    const modalNewsletterForm = document.getElementById('modalNewsletterForm');
    const modalNewsletterSuccess = document.getElementById('modal-newsletter-success');
    
    // Form Validation Function
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                markInvalid(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                markInvalid(input, 'Please enter a valid email address');
                isValid = false;
            } else if (input.type === 'tel' && !validatePhone(input.value)) {
                markInvalid(input, 'Please enter a valid phone number');
                isValid = false;
            } else {
                markValid(input);
            }
            
            // Add input event listener to clear error on typing
            input.addEventListener('input', function() {
                markValid(this);
            });
        });
        
        return isValid;
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        // Basic validation - can be customized for specific formats
        const re = /^[0-9\+\-\s]{10,15}$/;
        return re.test(phone);
    }
    
    function markInvalid(input, message) {
        input.classList.add('is-invalid');
        
        // Create or update error message
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function markValid(input) {
        input.classList.remove('is-invalid');
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Handle Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle the submission
            // But still validate the form
            if (!validateForm(contactForm)) {
                e.preventDefault();
                return false;
            }
            
            // If using AJAX submission instead of Formspree redirect:
            // Uncomment this section and comment out the Formspree action in HTML
            /*
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                contactForm.style.display = 'none';
                contactSuccess.style.display = 'block';
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again later.');
            });
            */
        });
    }
    
    // Handle Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            if (!validateForm(newsletterForm)) {
                e.preventDefault();
                return false;
            }
            
            // If using AJAX submission instead of Formspree redirect:
            // Uncomment this section and comment out the Formspree action in HTML
            /*
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            
            fetch(newsletterForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                newsletterForm.style.display = 'none';
                newsletterSuccess.style.display = 'block';
                newsletterForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again later.');
            });
            */
        });
    }
    
    // Handle Modal Newsletter Form
    if (modalNewsletterForm) {
        modalNewsletterForm.addEventListener('submit', function(e) {
            if (!validateForm(modalNewsletterForm)) {
                e.preventDefault();
                return false;
            }
            
            // If using AJAX submission instead of Formspree redirect:
            // Uncomment this section and comment out the Formspree action in HTML
            /*
            e.preventDefault();
            
            const formData = new FormData(modalNewsletterForm);
            
            fetch(modalNewsletterForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                modalNewsletterForm.style.display = 'none';
                modalNewsletterSuccess.style.display = 'block';
                modalNewsletterForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again later.');
            });
            */
        });
    }
});