const submitBtn = document.getElementById('submit');
const textArea = document.getElementById('message');
const inputChildren = Array.from(document.getElementById('inputs').children);
let elText = submitBtn.textContent;

submitBtn.addEventListener('click', () => {
  const isChildrenEmpty = inputChildren.some(child => child.value === ''),
  isChildEmpty = textArea.value === '';
  
  if (isChildrenEmpty || isChildEmpty) {
    alert('All info must be written');
  } 
  else {
    submitBtn.disabled = true;
    submitBtn.style.animation = 'none';
    submitBtn.offsetHeight;
    submitBtn.style.animation = 'clicked 0.8s forwards ease-in-out';
    inputChildren.forEach(child => {child.value = '';})
    textArea.value = '';
    submitBtn.textContent = "Message Sent!"
  }

  submitBtn.addEventListener('animationend', () => {
    submitBtn.disabled = false;
    submitBtn.textContent = elText;
  }, { once: true });
});
