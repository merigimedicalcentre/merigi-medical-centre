/**
 * Merigi Medical Centre - Core Website Logic
 * Handles: Navigation, Modals, Forms, and Animations
 */

// --- 1. Global Selectors & Configuration ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const serviceModal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');
const backToTopBtn = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('current-year');

const serviceData = {
    outpatient: {
        title: "Outpatient Services",
        icon: "🩺",
        text: "Our outpatient department provides quick and efficient care for non-emergency conditions. We offer general consultations, specialized clinics, and follow-up care for patients of all ages."
    },
    inpatient: {
        title: "Inpatient Services",
        icon: "🏥",
        text: "Our wards are designed to provide a healing environment. With 24/7 nursing care and modern monitoring equipment, we ensure your recovery is smooth and well-managed."
    },
    maternity: {
        title: "24/7 Maternity Care",
        icon: "👶",
        text: "We specialize in safe motherhood. Our services include Antenatal Care (ANC), skilled delivery, emergency C-sections, and dedicated postnatal wards."
    },
    lab: {
        title: "Laboratory & Diagnostics",
        icon: "🧪",
        text: "Our lab is NEMA and KMLTTB compliant, providing accurate tests in Hematology, Biochemistry, and Parasitology to ensure correct diagnosis."
    },
    pharmacy: {
        title: "Qualified Pharmacy",
        icon: "💊",
        text: "We stock genuine and affordable medications. Our pharmacists provide expert counseling on your prescriptions."
    },
    imaging: {
        title: "Diagnostic Imaging Department",
        icon: "🩻",
        text: `
            <p>Our imaging department uses modern technology for accurate medical decisions:</p>
            <div class="modal-list" style="margin-top: 15px;">
                <div style="background: #f7fafc; padding: 12px; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid var(--merigi-teal);">
                    <strong>📟 Ultrasound:</strong> Obstetric, abdominal, and pelvic examinations.
                </div>
                <div style="background: #f7fafc; padding: 12px; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid var(--merigi-teal);">
                    <strong>🦴 Digital X-Ray:</strong> High-resolution imaging for fractures and chest assessments.
                </div>
            </div>`
    }
};

// --- 2. Navigation & Mobile Menu ---
const toggleMenu = () => {
    navLinks.classList.toggle('mobile-active');
    hamburger.classList.toggle('toggle');
};

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-active')) toggleMenu();
    });
});

// --- 3. Modal Logic ---
window.openModal = function(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data || !serviceModal) return;

    modalBody.innerHTML = `
        <div style="font-size: 3.5rem; text-align:center; margin-bottom:10px;">${data.icon}</div>
        <h2 style="color: #003b5c; text-align:center; margin-bottom:15px;">${data.title}</h2>
        <div style="color: #4a5568; line-height: 1.6; font-size: 1.1rem;">${data.text}</div>
        <button onclick="closeModal()" class="btn-primary" style="margin-top:25px; width:100%;">Close Details</button>
    `;
    
    serviceModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
};

window.closeModal = function() {
    if (serviceModal) {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Close modal on outside click or Escape key
window.addEventListener('click', (e) => { if (e.target === serviceModal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// --- 4. Contact Form Simulation ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Thank you! Your inquiry has been sent to Merigi Medical Centre.`);
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// --- 5. Scroll Effects (Back to Top & Reveal) ---
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.scrollY > 400);
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Automatic Year
if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

// Intersection Observer for animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .timeline-item, .blog-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    scrollObserver.observe(el);
});