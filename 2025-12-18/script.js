const iframe = document.getElementById('form-frame');
iframe.onload = () => {
  document.getElementById('loader').style.display = 'none';
  iframe.classList.add('visible');
};
