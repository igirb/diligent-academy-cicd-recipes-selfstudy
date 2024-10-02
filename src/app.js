import {getRecipes} from "./recipes.js";


function element(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key.startsWith('on')) {
            const eventName = key.toLowerCase().substring(2)
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    })

    children.forEach((child) => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child))
        } else {
            element.appendChild(child);
        }
    })
    return element;
}

function createContainer({onShow}) {
    const container = element('div', {class: 'container'}, [element('h1', {}, ['My Recipes']), element('button', {
        class: 'btn btn-primary',
        onClick: onShow
    }, ['Show Recipes']), element('div', {id: 'recipeList'}),])
    return container;
}

export function setupApp(root) {

    let isVisible = false;

    function handleShow(event) {
        isVisible = !isVisible;
        const list = event.target.parentNode.querySelector('#recipeList');

        if (isVisible) {
            list.innerHTML = '';

            // Add "Recipe List" text
            list.appendChild(element('p', {}, ['Recipe List']));

            const recipes = getRecipes();

            recipes.forEach((recipe) => {
                const card = element('div', {class: 'col-sm-4'}, [element('div', {class: 'card mb-3'}, [element('div', {class: 'card-body'}, [element('h5', {class: 'card-title'}, [recipe.name])])])]);
                list.appendChild(card);
            });
        } else {
            list.innerText = '';
        }
    }

    root.appendChild(createContainer({onShow: handleShow}))
    return root;
}
