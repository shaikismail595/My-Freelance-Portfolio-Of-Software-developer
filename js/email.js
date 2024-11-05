// Get form elements
const form = document.querySelector('form');
const nameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[type="email"]');
const phoneInput = document.querySelector('input[type="number"]');
const messageInput = document.querySelector('#msg');
const submitButton = form.querySelector('button[type="submit"]');

// Form validation function
function validateForm() {
    // Check for empty fields
    if (!nameInput.value.trim() || !emailInput.value.trim() || 
        !phoneInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill in all fields');
        return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        alert('Please enter a valid email address');
        return false;
    }

    // Validate phone number (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

    return true;
}

// Function to handle form submission and send email
async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Prepare email template parameters
    const templateParams = {
        from_name: nameInput.value.trim(),
        email_id: emailInput.value.trim(),
        phone_no: phoneInput.value.trim(),
        message: messageInput.value.trim()
    };

    try {
        // Replace these with your actual EmailJS credentials
        const serviceID = 'YOUR_SERVICE_ID';    // Get from EmailJS dashboard
        const templateID = 'YOUR_TEMPLATE_ID';  // Get from EmailJS dashboard

        const response = await emailjs.send(serviceID, templateID, templateParams);
        
        if (response.status === 200) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again.');
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

// Add form submission event listener
if (form) {
    form.addEventListener('submit', handleFormSubmit);
} else {
    console.error('Contact form not found in the document');
}

// Initialize EmailJS
// Uncomment and replace with your public key if not initialized in HTML
/*
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();
*/