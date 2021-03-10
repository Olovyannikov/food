const slides = document.querySelectorAll('.offer__slide');
const slider = document.querySelector('.offer__slider');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const total = document.querySelector('#total');
const current = document.querySelector('#current');
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
const slidesField = document.querySelector('.offer__slider-inner');
const width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = `${slides.length}`;
    current.textContent = `${slideIndex}`;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => slide.style.width = width);

slider.style.position = 'relative';

const indicators = document.createElement('ol');
const dots = [];
indicators.classList.add('carousel-indicators');

slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot')
    dot.setAttribute('data-slide-to', `${i + 1}`);

    if (i === 0) {
        dot.style.opacity = '1';
    }

    indicators.append(dot);
    dots.push(dot);
}

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
    if (offset === deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    currentSlide();
    dotsStyle();
})

prev.addEventListener('click', () => {
    if (offset === 0) {
        offset = deleteNotDigits(width) * (slides.length - 1)
    } else {
        offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideIndex === 1) {
        slideIndex = slides.length
    } else {
        slideIndex--;
    }

    currentSlide();
    dotsStyle();
})

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        currentSlide();
        dotsStyle();
    })
})

function currentSlide() {
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = `${slideIndex}`;
    }
}

function dotsStyle() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
}