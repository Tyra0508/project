const danger = document.querySelector('.older-button');
const urgent = document.querySelector('.relative-button');

function changeColor(button) {
    if (button === danger) {
      
        if (!danger.classList.contains('red-button') && !urgent.classList.contains('red-button')) {
         
            danger.classList.add('red-button');
            urgent.classList.add('red-button');
        }
     
        else if (danger.classList.contains('red-button') && urgent.classList.contains('red-button')) {
        
            danger.classList.remove('red-button');
            urgent.classList.remove('red-button');
        }
    }
     else if (button === urgent) {
        
        if (urgent.classList.contains('red-button')) {
            danger.classList.remove('red-button');
            urgent.classList.remove('red-button');
        }
    }
}

danger.addEventListener('click', function() {
    changeColor(danger);
});

urgent.addEventListener('click', function() {
    changeColor(urgent);
});
