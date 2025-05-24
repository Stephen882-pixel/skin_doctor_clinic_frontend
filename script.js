document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonialSlider');
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        
        let currentSlide = 0;
        
        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the current slide and activate corresponding dot
            slides[n].classList.add('active');
            dots[n].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        }
        
        // Event listeners for next and previous buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                currentSlide = slideIndex;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // FAQ Accordion
    const faqContainer = document.getElementById('faqContainer');
    if (faqContainer) {
        const faqItems = faqContainer.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle active class on the clicked item
                item.classList.toggle('active');
                
                // Update the icon
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-toggle i');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });
            });
        });
    }
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationModal = document.getElementById('confirmationModal');
    
    if (appointmentForm) {
        // Show/hide "Other Service" field based on service selection
        const serviceSelect = document.getElementById('service');
        const otherServiceGroup = document.getElementById('otherServiceGroup');
        
        if (serviceSelect && otherServiceGroup) {
            serviceSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherServiceGroup.style.display = 'block';
                } else {
                    otherServiceGroup.style.display = 'none';
                }
            });
        }
        
        // Set minimum date for appointment to today
        const appointmentDateInput = document.getElementById('appointmentDate');
        if (appointmentDateInput) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            
            const todayString = yyyy + '-' + mm + '-' + dd;
            appointmentDateInput.setAttribute('min', todayString);
        }
        
        // Form submission
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to the server here
            // For now, we'll just show the confirmation modal
            
            // Get form values for summary
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service');
            const serviceName = service.options[service.selectedIndex].text;
            const doctor = document.getElementById('doctor');
            const doctorName = doctor.value ? doctor.options[doctor.selectedIndex].text : 'No preference';
            const appointmentDate = document.getElementById('appointmentDate').value;
            const appointmentTime = document.getElementById('appointmentTime');
            const timeName = appointmentTime.options[appointmentTime.selectedIndex].text;
            
            // Create appointment summary
            const appointmentSummary = document.getElementById('appointmentSummary');
            appointmentSummary.innerHTML = `
                <h4>Appointment Details</h4>
                <ul>
                    <li><strong>Name:</strong> ${fullName}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Service:</strong> ${serviceName}</li>
                    <li><strong>Doctor:</strong> ${doctorName}</li>
                    <li><strong>Date:</strong> ${formatDate(appointmentDate)}</li>
                    <li><strong>Time:</strong> ${timeName}</li>
                </ul>
                <p>We will contact you shortly to confirm your appointment.</p>
            `;
            
            // Show the modal
            confirmationModal.style.display = 'flex';
            
            // Reset the form
            appointmentForm.reset();
        });
        
        // Format date for display
        function formatDate(dateString) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
        }
    }
    
    // Modal functionality
    if (confirmationModal) {
        const closeModal = document.querySelector('.close-modal');
        const closeModalBtn = document.getElementById('closeModal');
        
        // Close modal when clicking the X
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                confirmationModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking the Close button
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                confirmationModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(e) {
            if (e.target === confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the email to the server here
            // For now, we'll just show an alert
            
            const email = document.getElementById('newsletterEmail').value;
            alert(`Thank you for subscribing to our newsletter with email: ${email}`);
            
            // Reset the form
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or empty
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add current year to footer copyright
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', year);
    }
});