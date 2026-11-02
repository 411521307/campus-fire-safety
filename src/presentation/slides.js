/**
 * CAMPUS FIRE DEFENSE SYSTEM — PRESENTATION SLIDES CONTROLLER
 * Keyboard, Touch, Fullscreen, and Print Support
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnPrint = document.getElementById('btnPrint');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const slideCounter = document.getElementById('slideCounter');
  const progressFill = document.getElementById('progressFill');
  const dotBtns = document.querySelectorAll('.dot-btn');

  function updateDeck(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;
    currentSlide = slideNum;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx + 1 === currentSlide);
    });

    dotBtns.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentSlide);
    });

    if (slideCounter) {
      slideCounter.textContent = `Slide ${currentSlide} / ${totalSlides}`;
    }

    if (progressFill) {
      const pct = (currentSlide / totalSlides) * 100;
      progressFill.style.width = `${pct}%`;
    }

    if (btnPrev) btnPrev.disabled = currentSlide === 1;
    if (btnNext) btnNext.disabled = currentSlide === totalSlides;
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      updateDeck(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      updateDeck(currentSlide - 1);
    }
  }

  // Button Listeners
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnPrev) btnPrev.addEventListener('click', prevSlide);

  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.target, 10);
      if (!isNaN(target)) updateDeck(target);
    });
  });

  // Print as PDF
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Fullscreen Mode
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
        btnFullscreen.textContent = '✕ Exit Fullscreen';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          btnFullscreen.textContent = '⛶ Fullscreen';
        }
      }
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ': // Spacebar
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        updateDeck(1);
        break;
      case 'End':
        e.preventDefault();
        updateDeck(totalSlides);
        break;
      case 'f':
      case 'F':
        if (btnFullscreen) btnFullscreen.click();
        break;
      case 'p':
      case 'P':
        if (e.ctrlKey || e.metaKey) {
          // allow native print
        } else {
          window.print();
        }
        break;
    }
  });

  // Touch Swipe for mobile/tablets
  let touchStartX = 0;
  let touchEndX = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Initial update
  updateDeck(1);
});
