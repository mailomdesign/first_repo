document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.portfolio-nav button');
  const track = document.getElementById('carousel-track');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      fetch(`get_images.php?category=${category}`)
        .then(response => response.json())
        .then(images => {
          track.innerHTML = '';
          images.forEach(src => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            div.style.backgroundImage = `url(${src})`;
            track.appendChild(div);
          });
        });
    });
  });
});

const imageData = {
  print: [],
  outdoor: [],
  branding: [],
  web: []
};

const track = document.querySelector('.carousel-track');
const buttons = document.querySelectorAll('.portfolio-nav button');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let scrollAmount = 0;
const scrollStep = 230 + 10; // ширина превью + gap (если 10px)



function loadCategory(category) {
  fetch(`getimages.php?category=${category}`)
    .then(res => res.json())
    .then(images => {
      track.innerHTML = '';
      scrollAmount = 0;
      track.style.transform = `translateX(0px)`;

      images.forEach(img => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.style.backgroundImage = `url(${img})`;
        track.appendChild(div);
      });
    });
}

loadCategory('print');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    loadCategory(cat);
  });
});

leftArrow.addEventListener('click', () => {
  scrollAmount -= scrollStep;
  if (scrollAmount < 0) scrollAmount = 0;
  track.style.transform = `translateX(-${scrollAmount}px)`;
});

rightArrow.addEventListener('click', () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  scrollAmount += scrollStep;
  if (scrollAmount > maxScroll) scrollAmount = maxScroll;
  track.style.transform = `translateX(-${scrollAmount}px)`;
});
