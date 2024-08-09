const submitButton = document.querySelector('#btn-login');

submitButton.addEventListener('click', function() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: email, password: password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert('Đăng nhập thành công! ID của bạn là: ' + data.id);
      change()
    } else {
      alert('Đăng nhập thất bại: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
  });
});
const submit = document.querySelector('.btn-login')
const modal = document.querySelector('.js-modal')
const question = document.querySelector('.modal-login')
function showQuestion(){
  modal.classList.add('open')
}
submit.addEventListener('click', showQuestion)
function hideQuestion(){
  modal.classList.remove('open')
}
modal.addEventListener('click', hideQuestion)
question.addEventListener('click', function(event){
  event.stopPropagation()
})

function change() {
  window.location.href = 'http://127.0.0.1:5500/login/question.html';
}