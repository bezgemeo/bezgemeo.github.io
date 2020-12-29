export class Slider {
    constructor(sliderWrapperClass, sliderItemsClass) {
        this.slider = document.querySelector(sliderWrapperClass);
        this.slides = this.slider.querySelectorAll(sliderItemsClass);
        this.init();
    }

    init() {
        this.setInitialSlide();
        this.addArrows();
        this.addDots();
        this.setInitialDot();
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
            this.changeCurrentDot(this.getActiveSlide());
        });

        this.nextButton.addEventListener('click', ev => {
            this.changeSlide(this.getActiveSlide() + 1);
            this.changeCurrentDot(this.getActiveSlide());
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
            });
        });
    }

    changeSlide(i) {
        if (i > this.slides.length - 1) {
            this.slides.forEach(el => el.classList.remove('active'));
            this.slides[0].classList.add('active');
        } else if (i < 0) {
            this.slides.forEach(el => el.classList.remove('active'));
            this.slides[this.slides.length - 1].classList.add('active');
        } else {
            this.slides.forEach(el => el.classList.remove('active'));
            this.slides[i].classList.add('active');
        }
    }


    changeCurrentDot(i) {
        this.dotsList.forEach((el, i) => {
            el.classList.remove('current');
            console.log(el);
        });

        this.dotsList[i].classList.add('current');
    }

}
