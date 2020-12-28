import printMe from './print.js';
import './file.js';
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

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
