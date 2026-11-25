(function () {
  var PHONE = '+79399519277';

  // Окно «Записаться»
  var modal = document.getElementById('book-modal');
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // Копирование номера
  var copyBtn = document.querySelector('[data-copy-phone]');
  copyBtn.addEventListener('click', function () {
    var done = function () {
      copyBtn.textContent = 'Скопировано';
      setTimeout(function () { copyBtn.textContent = 'Скопировать'; }, 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(PHONE).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var t = document.createElement('textarea');
      t.value = PHONE;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); } catch (err) {}
      document.body.removeChild(t);
      done();
    }
  });

  // Просмотр фото на весь экран
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbFrom = null;
    var closeLightbox = function () {
      lightbox.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
      if (lbFrom) lbFrom.focus();
    };
    document.querySelectorAll('[data-zoom]').forEach(function (el) {
      el.addEventListener('click', function () {
        lbFrom = el;
        var img = el.querySelector('img');
        lbImg.src = el.getAttribute('data-zoom');
        lbImg.alt = img ? img.alt : '';
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        lightbox.querySelector('[data-close-lightbox]').focus();
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target !== lbImg) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  // Меню на телефоне
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
