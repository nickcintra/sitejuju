document.addEventListener('DOMContentLoaded', function () {

    const text = document.querySelector('.texto')
    text.innerHTML = text.innerText.split('').map(
        (char, i) => `<span style="transform:rotate(${i * 6.3}deg)">${char}</span>`
    ).join('');
    
});
