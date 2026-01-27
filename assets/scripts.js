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
});
