// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// ===== SEARCH TABS =====
document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const returnField = document.getElementById('returnField');
        if (tab.dataset.tab === 'return' || tab.dataset.tab === 'multicity') {
            returnField.style.display = 'flex';
        } else {
            returnField.style.display = 'none';
        }
    });
});

// ===== SWAP CITIES =====
document.getElementById('swapBtn').addEventListener('click', () => {
    const from = document.getElementById('fromCity');
    const to = document.getElementById('toCity');
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    document.getElementById('swapBtn').style.transform = 'rotate(180deg)';
    setTimeout(() => document.getElementById('swapBtn').style.transform = '', 300);
});

// ===== PASSENGER PICKER =====
const paxState = { adults: 1, children: 0, infants: 0 };
const paxTrigger = document.getElementById('paxTrigger');
const paxDropdown = document.getElementById('paxDropdown');
const paxSummary = document.getElementById('paxSummary');

function updatePaxSummary() {
    const parts = [];
    if (paxState.adults) parts.push(paxState.adults + ' Adult' + (paxState.adults > 1 ? 's' : ''));
    if (paxState.children) parts.push(paxState.children + ' Child' + (paxState.children > 1 ? 'ren' : ''));
    if (paxState.infants) parts.push(paxState.infants + ' Infant' + (paxState.infants > 1 ? 's' : ''));
    paxSummary.textContent = parts.join(', ');
    document.getElementById('adultCount').textContent = paxState.adults;
    document.getElementById('childCount').textContent = paxState.children;
    document.getElementById('infantCount').textContent = paxState.infants;
}

paxTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    paxDropdown.classList.toggle('open');
});

document.querySelectorAll('.pax-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.dataset.type;
        const action = btn.dataset.action;
        if (action === 'plus' && paxState[type] < 9) paxState[type]++;
        if (action === 'minus' && paxState[type] > (type === 'adults' ? 1 : 0)) paxState[type]--;
        updatePaxSummary();
    });
});

document.getElementById('paxDone').addEventListener('click', (e) => {
    e.stopPropagation();
    paxDropdown.classList.remove('open');
});

document.addEventListener('click', () => paxDropdown.classList.remove('open'));

// ===== SEARCH BUTTON ANIMATION =====
document.getElementById('searchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    btn.innerHTML = '<span class="spinner"></span> Searching...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = 'Search Flights <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        btn.disabled = false;
        alert('This is a prototype demo! In the live version, this would show flight results.');
    }, 1500);
});

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('.stat-number');
const observerOptions = { threshold: 0.5 };
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
            counterObserver.unobserve(el);
        }
    });
}, observerOptions);
counters.forEach(c => counterObserver.observe(c));

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.usp-card, .deal-card, .dest-card, .review-card, .section-header, .faq-item, .newsletter-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) item.classList.add('active');
    });
});

// ===== NEWSLETTER =====
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.newsletter-btn');
    const email = document.getElementById('newsletterEmail').value;
    btn.textContent = 'Subscribing...';
    setTimeout(() => {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#10B981';
        document.getElementById('newsletterEmail').value = '';
        setTimeout(() => {
            btn.textContent = 'Subscribe →';
            btn.style.background = '';
        }, 3000);
    }, 1000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });
});
