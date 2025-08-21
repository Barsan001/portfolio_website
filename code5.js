document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.cursor');

  // Custom cursor movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  });

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      '.skill-bar, .stat-number, .project-card, .certificate-card'
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        if (element.classList.contains('skill-bar')) {
          const level = element.getAttribute('data-level');
          element.style.setProperty('--level', level + '%');
          element.style.width = level + '%';
        } else if (element.classList.contains('stat-number')) {
          const target = parseInt(element.getAttribute('data-count'));
          const duration = 2000;
          const increment = target / (duration / 16);

          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(timer);
              current = target;
            }
            element.textContent = Math.floor(current);
          }, 16);
        }
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burger.classList.remove('toggle');
    });
  });

  // Tab functionality for work section
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.background = 'rgba(4, 13, 74, 1)';
      header.style.boxShadow = '0 3px 3px rgba(9, 255, 0, 1)';
      header.style.padding = '15px 0';
    } else {
      header.style.background = 'transparent';
      header.style.boxShadow = 'none';
      header.style.padding = '20px 0';
    }
  });
/// Download CV button
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'BarsanRayCV.pdf';  // relative path to your CV
    link.download = 'BarsanRayCV.pdf';     // filename when downloading
    link.click();
  });
}

  // ---- Rotating Role Animation ----
  const roles = [
    'Software Developer',
    'UI Designer',
    'Frontend Developer',
    'Full Stack Developer',
    'React Developer',
  ];

  const rotator = document.getElementById('role-rotator');
  const nameLine = document.querySelector('.animated-text');

  const TYPE_SPEED = 70;
  const ERASE_SPEED = 45;
  const HOLD_AFTER_TYPE = 1200;
  const HOLD_AFTER_ERASE = 350;

  let roleIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function typeCycle() {
    const current = roles[roleIndex];

    if (!isErasing) {
      rotator.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        setTimeout(() => {
          isErasing = true;
          typeCycle();
        }, HOLD_AFTER_TYPE);
      } else {
        setTimeout(typeCycle, TYPE_SPEED);
      }
    } else {
      rotator.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isErasing = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeCycle, HOLD_AFTER_ERASE);
      } else {
        setTimeout(typeCycle, ERASE_SPEED);
      }
    }
  }

  const startTyping = () => {
    if (startTyping.started) return;
    startTyping.started = true;
    typeCycle();
  };

  if (nameLine) {
    nameLine.addEventListener('animationend', startTyping, { once: true });
    setTimeout(startTyping, 900);
  } else {
    startTyping();
  }

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
});
