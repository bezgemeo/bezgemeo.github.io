import html from './file.html';

const section = () => {
    const main = document.createElement('main');
    main.innerHTML = html;

    return main;
}

document.body.appendChild(section());

