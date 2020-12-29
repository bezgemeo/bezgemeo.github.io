import './file.js';
import {Slider} from './slider.js';
import './styles.scss';

/*function component() {
    const element = document.createElement('main');
    const h1 = document.createElement('h1');

    h1.innerHTML = 'Page h1 title! Yaaay!';

    element.appendChild(h1);
    console.log(element);

    return element;
}*/

// document.body.appendChild(component());

new Slider('.slider', '.slider-item');

