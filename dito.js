  const cd = document.getElementById('cd');
  const slot = document.getElementById('slot');
  const led = document.getElementById('led');
  const video = document.getElementById('video');
  const resetBtn = document.getElementById('resetBtn');

  let inserted = false;

  cd.addEventListener('click', () => {
    if (inserted) return;
    inserted = true;


    cd.style.animation = 'none';

  
    const cdRect = cd.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();

    const cdCenterX = cdRect.left + cdRect.width / 2;
    const cdCenterY = cdRect.top + cdRect.height / 2;
    const slotCenterX = slotRect.left + slotRect.width / 2;
    const slotCenterY = slotRect.top + slotRect.height / 2;

    const dx = slotCenterX - cdCenterX;
    const dy = slotCenterY - cdCenterY;

    cd.style.transition = 'transform 700ms ease';

    cd.style.transform = `translate(${dx}px, ${dy}px) rotateX(75deg)`;

    cd.addEventListener('transitionend', step2, { once: true });
  });

  function step2(){

    cd.style.transition = 'transform 900ms cubic-bezier(.2,.7,.2,1), opacity 900ms ease';
    const current = cd.style.transform || '';
    cd.style.transform = `${current} translateY(-6px) scale(.65)`;
    cd.style.opacity = '0.0';


    setTimeout(() => {
      led.classList.add('on');
      video.style.display = 'block';
   
      video.play().catch(() => {});
      resetBtn.style.display = 'inline-block';
    }, 900);
  }

  resetBtn.addEventListener('click', () => {
    inserted = false;
    cd.style.transition = 'none';
    cd.style.transform = 'none';
    cd.style.opacity = '1';
    cd.style.animation = 'spin 5s linear infinite';
    led.classList.remove('on');
    video.pause();
    video.currentTime = 0;
    video.style.display = 'none';
    resetBtn.style.display = 'none';
    void cd.offsetWidth;
  });