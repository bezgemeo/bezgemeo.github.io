export class Slider {
    constructor(sliderClass, sliderItemsClass, settings) {
        this.settings = {...settings};
        this.slider = document.querySelector(sliderClass);
        this.slides = this.slider.querySelectorAll(sliderItemsClass);
        this.innerWrapper = this.slider.querySelector('.slider-wrapper');
        this.init();
    }

    init() {
        console.log(this.settings);
        this.setInitialSlide();
        // this.addClonedSlides();
        this.addArrows();
        this.addDots();
        this.setInitialDot();
        this.settings.autoplay && this.runSliderAutoplay();
        this.initializeStyles();
    }

    addClonedSlides() {
        this.slides.forEach((el) => {
            const clone = el.cloneNode(true);
            clone.classList.add('slider-item-cloned');
            this.innerWrapper.appendChild(clone);
        });
    }

    setInitialSlide() {
        this.slides.forEach(el => el.classList.remove('active'));
        this.slides[0].classList.add('active');
    }

    getActiveSlide() {
        this.index = 0;
        this.slides.forEach((el, i) => {
            if (el.classList.contains('active')) {
                this.index = i;
            }
        });
        return this.index;
    }

    setInitialDot() {
        this.dotsList = this.dotsWrapper.querySelectorAll('.slider-dots-item');
        this.dotsList[0].classList.add('current');
    }

    addArrows() {
        const buttonsWrapper = document.createElement('div');
        this.previousButton = document.createElement('button');
        this.nextButton = document.createElement('button');

        buttonsWrapper.classList.add('slider-buttons');
        this.previousButton.classList.add('slider-buttons-previous', 'slider-buttons-item');
        this.nextButton.classList.add('slider-buttons-next', 'slider-buttons-item');

        buttonsWrapper.append(this.previousButton, this.nextButton)
        this.slider.appendChild(buttonsWrapper);

        this.addButtonsListener();
    }

    addButtonsListener() {
        this.previousButton.addEventListener('click', ev => {
            this.changeSlide(this.getActiveSlide() - 1);
            clearInterval(this.setInterval);
            this.settings.autoplay && this.runSliderAutoplay();
        });

        this.nextButton.addEventListener('click', ev => {
            this.changeSlide(this.getActiveSlide() + 1);
            clearInterval(this.setInterval);
            this.settings.autoplay && this.runSliderAutoplay();
        });

    }

    addDots() {
        this.dotsWrapper = document.createElement('div');
        this.dotsWrapper.classList.add('slider-dots');

        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dots-item');
            this.dotsWrapper.appendChild(dot);
        }

        this.slider.appendChild(this.dotsWrapper);

        this.addDotsListener();
    }

    addDotsListener() {
        this.dotsList = this.dotsWrapper.childNodes;

        this.dotsList.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                this.changeSlide(i);
                this.changeCurrentDot(i);
                clearInterval(this.setInterval);
                this.settings.autoplay && this.runSliderAutoplay();
            });
        });
    }

    changeSlide(i) {
        const activeClass = 'active';
        if (i > this.slides.length - 1) {
            this.slides.forEach(el => el.classList.remove(activeClass));
            this.slides[0].classList.add(activeClass);
            this.changeCurrentDot(0);
            this.moveSlide(0);
        } else if (i < 0) {
            this.slides.forEach(el => el.classList.remove(activeClass));
            this.slides[this.slides.length - 1].classList.add(activeClass);
            this.changeCurrentDot(this.slides.length - 1);
            this.moveSlide(this.slides.length - 1);
        } else {
            this.slides.forEach(el => el.classList.remove(activeClass));
            this.slides[i].classList.add(activeClass);
            this.changeCurrentDot(i);
            this.moveSlide(i);
        }
    }

    changeCurrentDot(i) {
        this.dotsList.forEach((el, i) => {
            el.classList.remove('current');
        });

        this.dotsList[i].classList.add('current');
    }

    runSliderAutoplay() {
        this.setInterval = setInterval(
            () => this.changeSlide(this.getActiveSlide() + 1),
            this.settings.interval * 1000);
    }

    initializeStyles() {
        this.sliderWidth = this.slides.length * this.slider.clientWidth;
        this.innerWrapper.style.width = `${this.sliderWidth}px`;
        this.innerWrapper.style.transform = 'translateX(0)';
    }

    moveSlide(slideNumber) {
        const afterAnimation = () => {
            this.innerWrapper.classList.remove('scrolling');
        }
        this.innerWrapper.removeEventListener('transitionend', afterAnimation());
        this.innerWrapper.addEventListener('transitionend', afterAnimation());

        this.innerWrapper.classList.add('scrolling');
        this.innerWrapper.style.transform = `translateX(${this.innerWrapper.clientWidth / this.slides.length * slideNumber * -1}px)`;
    }

}
