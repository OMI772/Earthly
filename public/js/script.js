'use strict';

//////////////////////////////////////
// Move section title
const sections = document.querySelectorAll('.section');
const titleLeft = document.querySelector('.section__title--left');
const titleRight = document.querySelector('.section__title--right');

sections.forEach((sec) => {
  const initialCoords = sec.getBoundingClientRect();

  window.addEventListener('scroll', function () {
    if (window.scrollY > initialCoords.top) {
      const moveRight = (window.scrollY - initialCoords.top) / 10;

      sec.children[0].children[0].style.transform = `translateX(${moveRight}px)`;
      sec.children[0].children[1].style.transform = `translateX(-${moveRight}px)`;

      if (moveRight * 3 < 150) {
        sec.children[1].children[0].children[0].style.transform = `translateX(-${
          moveRight * 3
        }px)`;
        sec.children[1].children[0].children[1].style.transform = `translateX(${
          moveRight * 3
        }px)`;

        sec.children[1].children[0].children[2].style.transform = `translateY(${
          moveRight * 3
        }px)`;
      }
    }
  });
});

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});
