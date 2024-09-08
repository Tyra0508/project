function submitData() {
  const name = document.querySelector('.name').value;
  const mail = document.querySelector('.mail').value;
  const password = document.querySelector('.password').value;
  
  const data = { name, mail, password };

  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function togglePassword() {
  const passwordInput = document.querySelector('.password');
  const toggleIcon = document.querySelector('.toggle-password img');

  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.src = '/icons/eye-icon-open.png';
  } else {
      passwordInput.type = 'password';
      toggleIcon.src = '/icons/eye-icon.png';
  }
}
function change() {
  window.location.href = 'http://127.0.0.1:5500/mygrand/login/index.html';
}
