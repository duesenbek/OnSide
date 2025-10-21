document.addEventListener('DOMContentLoaded', function () {
  var dtEl = document.getElementById('liveDatetime');
  var select = document.getElementById('bgSelect');
  if (dtEl) {
    function tick() {
      var now = new Date();
      var opts = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      dtEl.textContent = now.toLocaleString(undefined, opts);
    }
    tick();
    setInterval(tick, 1000);
  }
  if (select) {
    var key = 'onside_bg_color';
    var saved = localStorage.getItem(key) || '';
    if (saved) {
      document.body.style.backgroundColor = saved;
      Array.from(select.options).forEach(function (o) { if (o.value === saved) select.value = saved; });
    }
    select.addEventListener('change', function () {
      var val = select.value;
      document.body.style.backgroundColor = val || '';
      localStorage.setItem(key, val || '');
    });
  }
});

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

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('todoForm');
  var input = document.getElementById('todoInput');
  var list = document.getElementById('todoList');
  var errorBox = document.getElementById('todoError');
  var categorySel = document.getElementById('todoCategory');
  if (!form || !input || !list) return;
  var STORAGE_KEY = 'onside_news_todos';
  function loadTodos() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(data)) return [];
      return data;
    } catch (e) {
      return [];
    }
  }
  function saveTodos(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  function render(items) {
    list.innerHTML = '';
    items.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'list-group-item d-flex align-items-center justify-content-between';
      var left = document.createElement('div');
      left.className = 'd-flex align-items-center gap-2';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'form-check-input me-2';
      cb.dataset.id = String(t.id);
      cb.checked = !!t.done;
      var label = document.createElement('label');
      label.className = 'form-check-label';
      label.textContent = t.text;
      var cat = t.category || 'Other';
      var badge = document.createElement('span');
      badge.className = 'badge bg-secondary ms-2';
      badge.textContent = cat;
      if (t.done) {
        label.style.textDecoration = 'line-through';
        li.classList.add('list-group-item-success');
      }
      left.appendChild(cb);
      left.appendChild(label);
      left.appendChild(badge);
      var del = document.createElement('button');
      del.className = 'btn btn-sm btn-outline-danger';
      del.dataset.action = 'delete';
      del.dataset.id = String(t.id);
      del.textContent = 'Delete';
      li.appendChild(left);
      li.appendChild(del);
      list.appendChild(li);
    });
  }
  function setError(msg) {
    if (!errorBox) return;
    errorBox.textContent = msg || '';
    if (msg) errorBox.classList.remove('d-none'); else errorBox.classList.add('d-none');
  }
  var todos = loadTodos();
  render(todos);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = (input.value || '').trim();
    if (text.length === 0) {
      setError('Task cannot be empty');
      return;
    }
    setError('');
    var catVal = categorySel && categorySel.value ? categorySel.value : 'Other';
    var item = { id: Date.now(), text: text, done: false, category: catVal };
    todos.unshift(item);
    saveTodos(todos);
    render(todos);
    input.value = '';
    if (categorySel) categorySel.value = categorySel.options[0] ? categorySel.options[0].value : 'Other';
  });
  list.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var id = target.getAttribute('data-id');
    if (target.getAttribute('data-action') === 'delete' && id) {
      var idNum = Number(id);
      todos = todos.filter(function (t) { return t.id !== idNum; });
      saveTodos(todos);
      render(todos);
      return;
    }
    if (target.matches('input[type="checkbox"]') && id) {
      var idNum2 = Number(id);
      todos = todos.map(function (t) { return t.id === idNum2 ? { id: t.id, text: t.text, done: !t.done } : t; });
      saveTodos(todos);
      render(todos);
      return;
    }
  });
});
