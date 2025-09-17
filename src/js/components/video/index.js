export default {
    init() {
      const videoBoxes = document.querySelectorAll('.video-box');
  
      videoBoxes.forEach(box => {
        const video = box.querySelector('video');
        const playBtn = box.querySelector('[data-btn-play="video-play-btn"]');
        const pauseBtn = box.querySelector('[data-btn-pause="video-pause-btn"]');
  
        if (!video || !playBtn || !pauseBtn) return;
  
        playBtn.classList.remove('video-btn--hidden');
        pauseBtn.classList.add('video-btn--hidden');
  
        playBtn.addEventListener('click', () => {
          video.play();
          playBtn.classList.add('video-btn--hidden'); // Скрываем Play
          box.classList.add('is-playing'); // Pause появится при наведении
        });
  
        pauseBtn.addEventListener('click', () => {
          video.pause();
          playBtn.classList.remove('video-btn--hidden'); // Play снова виден
          box.classList.remove('is-playing'); // Pause скрыта
        });
  
        video.addEventListener('ended', () => {
          playBtn.classList.remove('video-btn--hidden'); // Play снова виден
          box.classList.remove('is-playing'); // Pause скрыта
        });
      });
    }
  };