/**
 * Ayush Rana - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Typing Text Effect
  // -------------------------------------------------------------------------
  const typingElement = document.getElementById('typingText');
  const words = [
    'Algorithmic Problem Solving',
    'Python & Logical Reasoning',
    'Applied Mathematics',
    'Football & Tactical Play',
    'Fast Badminton Rallies'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  // -------------------------------------------------------------------------
  // 2. Dark / Light Theme Toggle
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check persisted preference
  const savedTheme = localStorage.getItem('ayush_portfolio_theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('ayush_portfolio_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('ayush_portfolio_theme', 'light');
    }
  });

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Menu
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
    });
  });

  // -------------------------------------------------------------------------
  // 4. Navbar Scroll Shadow & Active Link Observer
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
      navbar.style.borderBottomColor = 'rgba(0, 242, 254, 0.2)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.borderBottomColor = 'var(--border-color)';
    }
  });

  // Section Active Highlighting
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 5. Basketball Exception Fun Fact Button
  // -------------------------------------------------------------------------
  const funFactBtn = document.getElementById('basketballFactBtn');
  const funFactMsg = document.getElementById('funFactMessage');

  const funMessages = [
    '"Ask me in person why basketball didn\'t make the cut!" 😉',
    '"Football on grass? Yes! Badminton on court? Yes! Basketball hoop? 404 Not Found! 🚫🏀"',
    '"Football builds team synergy, badminton builds lightning reflexes... basketball has too much bouncing! 😄"',
    '"I will play literally 99 sports with you, but let\'s keep basketball off the schedule!" ⚽🏸'
  ];
  let msgIdx = 0;

  if (funFactBtn && funFactMsg) {
    funFactBtn.addEventListener('click', () => {
      funFactMsg.classList.remove('hidden');
      funFactMsg.textContent = funMessages[msgIdx];
      msgIdx = (msgIdx + 1) % funMessages.length;
    });
  }

  // -------------------------------------------------------------------------
  // 6. Interactive Contact Form
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.className = 'form-status success';
        formStatus.textContent = '🎉 Thank you, message sent! I will get back to you soon.';
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
        }, 6000);
      }, 1000);
    });
  }
});

