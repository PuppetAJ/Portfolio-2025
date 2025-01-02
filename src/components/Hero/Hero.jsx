import { useRef, useEffect } from 'react';

const Hero = () => {
  // CREDIT FOR ORIGINAL CODE:
  // https://codepen.io/hakimel/pen/QdWpRv?utm_source=extension&utm_medium=click&utm_campaign=muzli
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current?.getContext('2d');

    // Future idea: add friction to the velocity to make it feel more natural
    let time = 0,
      velocity = 0.1,
      velocityTarget = 0.015,
      width,
      height,
      lastX,
      lastY,
      r1;

    // Spacing options
    // 3, 4, 5, 6, 7, 8, 9
    const MAX_OFFSET = 450;
    const SPACING = 4;
    const POINTS = Math.floor(MAX_OFFSET / SPACING);
    const PEAK = MAX_OFFSET;
    const POINTS_PER_LAP = 5;
    const SHADOW_STRENGTH = 10;

    const render = () => {
      let x,
        y,
        cx = width / 2,
        cy = height / 2;

      // Gradient
      let grd = context.createRadialGradient(cx, cy, r1, width, height, 30);

      grd.addColorStop(0.5, 'rgb(248, 108, 253');
      grd.addColorStop(0.6, 'rgb(80, 102, 228');
      grd.addColorStop(0.2, 'rgb(80, 102, 228');

      context.globalCompositeOperation = 'lighter';
      context.strokeStyle = grd;
      context.shadowColor = grd;
      context.lineWidth = 2;
      context.beginPath();

      // 112

      for (let i = POINTS; i > 0; i--) {
        let value = i * SPACING + (time % SPACING);

        const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI,
          ay = Math.cos(value / POINTS_PER_LAP) * Math.PI * 0.9;

        (x = ax * value), (y = ay * value * 0.35);

        const o = 1 - Math.floor(PEAK / PEAK);

        y -= Math.pow(o, 2) * 200;
        y += (200 * value) / MAX_OFFSET;
        y += (x / cx) * width * 0.1;

        y -= 15;

        y = Math.floor(y);

        context.globalAlpha = 1 - value / MAX_OFFSET;
        context.shadowBlur = SHADOW_STRENGTH * o;

        context.lineTo(cx + x, cy + y);
        context.stroke();

        context.beginPath();
        context.moveTo(cx + x, cy + y);
      }

      // context.lineTo(cx, cy - 500);
      // context.lineTo(cx, 0);
      // context.stroke();
    };

    const onMouseDown = (event) => {
      lastX = event.clientX;
      lastY = event.clientY;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event) => {
      let vx = (event.clientX - lastX) / 100;
      let vy = (event.clientY - lastY) / 100;

      if (event.clientY < height / 2) vx *= -1;
      if (event.clientX > width / 2) vy *= -1;

      velocityTarget = vx + vy;

      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onMouseUp = (e) => {
      // e.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onTouchStart = (event) => {
      // event.stopPropagation();
      // event.preventDefault();

      lastX = event.touches[0].clientX;
      lastY = event.touches[0].clientY;

      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    };

    const onTouchMove = (event) => {
      let vx = (event.touches[0].clientX - lastX) / 100;
      let vy = (event.touches[0].clientY - lastY) / 100;

      if (event.touches[0].clientY < height / 2) vx *= -1;
      if (event.touches[0].clientX > width / 2) vy *= -1;

      velocityTarget = vx + vy;

      lastX = event.touches[0].clientX;
      lastY = event.touches[0].clientY;
    };

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    const resize = () => {
      width = canvas.current.width = window.innerWidth;
      height = canvas.current.height = window.innerHeight;

      // console.log('resize');
      // console.log(width);

      if (window.innerWidth > 1500) {
        r1 = window.innerWidth * 0.5;
      } else if (window.innerWidth <= 1500 && window.innerWidth > 1000) {
        r1 = 700;
      } else if (window.innerWidth <= 1000) {
        r1 = 450;
      }
    };

    const clear = () => {
      context.clearRect(0, 0, width, height);
    };

    const step = () => {
      time += velocity;
      velocity += (velocityTarget - velocity) * 0.3;
      clear();
      render();
      // console.log('step');

      requestAnimationFrame(step);
    };

    const setup = () => {
      resize();
      step();
      // console.log('setup');
      // console.log('width', width);

      window.addEventListener('resize', resize);
      window.addEventListener('mousedown', onMouseDown);
      document.addEventListener('touchstart', onTouchStart);
    };

    setup();

    return (_) => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('touchstart', onTouchStart);
    };
  }, [canvas, window.innerWidth, window.innerHeight]);

  return (
    <div className='head-wrapper'>
      <section className='container hero'>
        <canvas id='canvas' ref={canvas}></canvas>
        <div className='hero-content font-mulish'>
          <div className='md:text-red-500'>test</div>
          <h4>
            Hi, I'm Adrian Jimenez. A passionate Software Engineer driven by the
            unconventional.
          </h4>
          <div className='typing'>
            <h1>
              Full-Stack Web <span>Developer</span>
            </h1>
            <span className='rounded'></span>
          </div>
          <div>
            <a href='./resources/PDF/AdrianJResume.pdf' target='_blank'>
              <button className='resume-btn mulish-reg'>Resume</button>
            </a>
            <a href='#contact'>
              <button className='contact-btn mulish-reg'>Contact Me</button>
            </a>
          </div>
        </div>
        <div className='focus'></div>
      </section>
    </div>
  );
};

export default Hero;
