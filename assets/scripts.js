// Minimal site JS for accessibility and small behaviors
document.addEventListener('DOMContentLoaded', function(){
  // Ensure skip link focuses main
  const skip = document.querySelector('.skip-link');
  if(skip){
    skip.addEventListener('click', function(){
      const main = document.getElementById('main');
      if(main){ main.setAttribute('tabindex','-1'); main.focus(); }
    });
  }

  // Improve keyboard focus for small header buttons (visually subtle)
  const headerBtns = document.querySelectorAll('header nav a');
  headerBtns.forEach(btn => btn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ btn.click(); }
  }));

  // Hamburger / nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('header');
  const primaryNav = document.getElementById('primary-nav');
  if(navToggle && header && primaryNav){
    navToggle.addEventListener('click', function(){
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      header.classList.toggle('nav-open');
      primaryNav.setAttribute('aria-hidden', String(expanded));
      if(!expanded){ // when opening, move focus to first link
        const first = primaryNav.querySelector('a, button');
        if(first) first.focus();
      } else {
        navToggle.focus();
      }
    });
  }
});
