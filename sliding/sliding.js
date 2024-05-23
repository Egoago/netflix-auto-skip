function injectCSS(fileName) {
    const link = document.createElement('link');
    link.href = chrome.runtime.getURL(fileName);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

injectCSS('styles.css');

let prevButton = null;

function applySlideEffectAndAutoClick(button) {
    if (prevButton === button) return;
    if (button.classList.contains('button-slide-effect')) return;
    prevButton = button;
    console.log('sliding start');
    button.classList.add('button-slide-effect');

    // Set a timer to click the button after the animation duration (2 seconds)
    let timerId = setTimeout(() => {
        button.click();
        console.log('button clicked');
    }, 4000);

    function removeAnimationAndTimer() {
        button.classList.remove('button-slide-effect');
        clearTimeout(timerId);
        document.removeEventListener('mousemove', removeAnimationAndTimer);
        console.log('mouse moved during animation');
    }

    setTimeout(() => {
        document.addEventListener('mousemove', removeAnimationAndTimer);
    }, 800);

    setTimeout(() => {
        document.removeEventListener('mousemove', removeAnimationAndTimer);
    }, 4000);

}