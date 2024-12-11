alert("Hello World");

function addRedDiv() {
    const newDiv = document.createElement('div');
    newDiv.style.backgroundColor = 'red';
    document.body.appendChild(newDiv);
}

addRedDiv();