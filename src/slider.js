export class Slider {
    constructor(sliderWrapperClass, sliderItemsClass) {
        this.slider = document.querySelector(sliderWrapperClass);
        this.slides = this.slider.querySelectorAll(sliderItemsClass);
        this.init();
    }

    init() {
        console.log(this);
        this.setActiveSlide();
        this.addArrows();
        this.addDots();
    }

    // todo: changeSlide() and setActiveSlide() duplicate some actions, needs improvement

    setActiveSlide(i) {
        if (typeof i === 'undefined') {
            this.slides.forEach(el => el.classList.remove('active'));
            this.slides[0].classList.add('active');
        } else {
            this.slides.forEach(el => el.classList.remove('active'));
            this.slides[i].classList.add('active');
        }
    }

    getActiveSlide(){
        this.index = 0;
        this.slides.forEach((el, i) => {
            if (el.classList.contains('active')) {
                this.index = i;
            }
        });
        return this.index;
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
            console.log(ev.target);
            console.log('prev', this.getActiveSlide());
            this.setActiveSlide(this.getActiveSlide() - 1);
        });

        this.nextButton.addEventListener('click', ev => {
            console.log(ev.target);
            console.log('next', this.getActiveSlide());
            this.setActiveSlide(this.getActiveSlide() + 1);
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

        this.dotsList.forEach((dot, idx) => {
            dot.addEventListener('click', ev => {
                this.changeSlide();
            });
        })
    }

    changeSlide () {
        let el = this.getActiveSlide();

        if (el > this.slides.length) {
            this.setActiveSlide(this.getActiveSlide(this.slides.length));
        }

        if (el < this.slides.lengh){
            this.setActiveSlide(this.getActiveSlide() + 1);
        }

    }

}
