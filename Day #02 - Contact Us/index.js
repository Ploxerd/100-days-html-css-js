const SubmitBtn = document.getElementById('submit');
const inputChildren = Array.from(document.getElementById('inputs').children);
inputChildren.push(document.getElementById('message'));

SubmitBtn.addEventListener('click', () => {
  SubmitBtn.disabled = true;
  SubmitBtn.style.animation = 'none';
  SubmitBtn.offsetHeight;
  SubmitBtn.style.animation = 'clicked 0.5s forwards ease-in-out';
  inputChildren.forEach(child => {
    child.value = '';
  })


  SubmitBtn.addEventListener('animationend', () => {
    SubmitBtn.disabled = false;
  }, { once: true });
});