// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener('DOMContentLoaded', function () {
  const hearts = document.querySelectorAll('.like-glyph');
  hearts.forEach(heart => {
    heart.addEventListener('click', handleHeartClick);
  });
});

function handleHeartClick(event) {
  mimicServerCall()
    .then(() => {
      toggleHeart(event.target);
    })
    .catch(error => {
      displayError(error);
      setTimeout(() => hideError(), 3000);
    });
}

function toggleHeart(heart) {
  heart.classList.toggle('activated-heart');
  if (heart.innerText === EMPTY_HEART) {
    heart.innerText = FULL_HEART;
  } else {
    heart.innerText = EMPTY_HEART;
  }
}

function displayError(error) {
  const errorMessage = document.getElementById('modal-message');
  errorMessage.innerText = error;
  const errorModal = document.getElementById('modal');
  errorModal.classList.remove('hidden');
}

function hideError() {
  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden');
}
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
