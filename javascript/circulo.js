document.addEventListener('DOMContentLoaded', function () {
    const text = document.querySelector('.texto');
    let textArr = ['photo', '-', 'video', '-', 'design', '-', 'photo', '-', 'video', '-', 'design', '-', 'photo', '-'].map(
      word => word + '\n'
    );
  
    let textSpotted = 'photo';
    let textIndex = 0;
  
    text.innerHTML = textArr.reduce((acc, word) => {
      word.split('').forEach(char => {
        textIndex++;
        acc += `<span ${
          word.match(textSpotted) == textSpotted ? 'class="spotted"' : ''
        } style="transform:rotate(${textIndex * 6.3}deg)">${char}</span>`;
      });
  
      return acc;
    }, '');
  });