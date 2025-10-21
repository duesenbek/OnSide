document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var subjectInput = document.getElementById('subject');
  var messageInput = document.getElementById('message');
  var formError = document.getElementById('formError');
  var formSuccess = document.getElementById('formSuccess');

  function setError(input, msg) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    var fb = input.parentElement.querySelector('.invalid-feedback');
    if (fb) fb.textContent = msg;
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    var fb = input.parentElement.querySelector('.invalid-feedback');
    if (fb) fb.textContent = '';
  }

  function validate() {
    var valid = true;
    if (formError) {
      formError.classList.add('d-none');
      formError.textContent = '';
    }
    if (formSuccess) {
      formSuccess.classList.add('d-none');
      formSuccess.textContent = '';
    }

    var nameVal = nameInput.value.trim();
    if (nameVal.length < 2) {
      setError(nameInput, 'Name must be at least 2 characters');
      valid = false;
    } else {
      clearError(nameInput);
    }

    var emailVal = emailInput.value.trim();
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailVal)) {
      setError(emailInput, 'Enter a valid email');
      valid = false;
    } else {
      clearError(emailInput);
    }

    var subjectVal = subjectInput.value.trim();
    if (subjectVal.length < 3) {
      setError(subjectInput, 'Subject must be at least 3 characters');
      valid = false;
    } else {
      clearError(subjectInput);
    }

    var messageVal = messageInput.value.trim();
    if (messageVal.length < 10) {
      setError(messageInput, 'Message must be at least 10 characters');
      valid = false;
    } else {
      clearError(messageInput);
    }

    return valid;
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(function (el) {
    el.addEventListener('input', function () {
      validate();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = validate();
    if (!ok) {
      if (formError) {
        formError.textContent = 'Please fix errors and try again';
        formError.classList.remove('d-none');
      }
      return;
    }
    if (formSuccess) {
      formSuccess.textContent = 'Message sent successfully';
      formSuccess.classList.remove('d-none');
    }
    if (formError) formError.classList.add('d-none');
    form.reset();
    [nameInput, emailInput, subjectInput, messageInput].forEach(function (el) {
      el.classList.remove('is-valid', 'is-invalid');
      var fb = el.parentElement.querySelector('.invalid-feedback');
      if (fb) fb.textContent = '';
    });
  });
});
