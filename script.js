document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // --- Mobile Navigation ---
    const openMobileNav = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeMobileNav = () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (mobileNavToggle && mobileNav && mobileNavClose) {
        mobileNavToggle.addEventListener('click', openMobileNav);
        mobileNavClose.addEventListener('click', closeMobileNav);

        // Close nav when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        // Close nav if clicking outside the nav area (optional)
        // mobileNav.addEventListener('click', (event) => {
        //     if (event.target === mobileNav) {
        //         closeMobileNav();
        //     }
        // });
    }

    // --- Scroll-to-Top Button ---
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth Scrolling for Navbar Links (if CSS method isn't enough) ---
    // const navLinks = document.querySelectorAll('header nav a[href^="#"], .mobile-nav-link[href^="#"]');
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             // Calculate offset if you have a sticky header
    //             const headerOffset = document.querySelector('header').offsetHeight || 64;
    //             const elementPosition = targetElement.getBoundingClientRect().top;
    //             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    //             window.scrollTo({
    //                 top: offsetPosition,
    //                 behavior: 'smooth'
    //             });

    //             // Close mobile nav if open
    //             if (mobileNav.classList.contains('open')) {
    //                closeMobileNav();
    //             }
    //         }
    //     });
    // });


    // --- Contact Form Handling ---
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Basic validation feedback (optional, enhance as needed)
            let isValid = true;
            contactForm.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    // Add some visual indication if needed
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = ''; // Reset border color
                }
            });

            if (!isValid) {
                 formStatus.textContent = 'Please fill out all required fields.';
                 formStatus.className = 'mt-4 text-center error';
                 return; // Stop submission
            }


            // Simulate form submission
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'mt-4 text-center'; // Reset class

            // Simulate network delay
            setTimeout(() => {
                // Display success message
                formStatus.textContent = "Thank you for your message! We'll get back to you soon.";
                formStatus.className = 'mt-4 text-center success'; // Use success class

                // Reset the form
                contactForm.reset();

                 // Clear the status message after a few seconds
                 setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'mt-4 text-center';
                 }, 5000); // Clear after 5 seconds

            }, 1000); // Simulate 1 second delay
        });

        // Reset border color on input change after validation fail
        contactForm.querySelectorAll('[required]').forEach(input => {
            input.addEventListener('input', () => {
                if (input.style.borderColor === 'red') {
                    input.style.borderColor = '';
                }
            })
        });
    }

});