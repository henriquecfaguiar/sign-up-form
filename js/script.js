const inputs = document.querySelectorAll('input');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const passwordInstructions = document.querySelector('.password-instructions');
const confirmPasswordInstructions = document.querySelector('.confirm-password-instructions');
const passwordConstraints = document.querySelectorAll('.constraint');
const createAccBtn = document.querySelector('.create-acc-btn')
const patterns = {
  'first_name': /^[a-z\s]+$/i,
  'last_name': /^[a-z\s]+$/i,
  'email': /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/,
  'phone_number': /^\d{11}$/,
  'password': /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{12,}$/,
  'first-constraint': /.{12,}/,
  'second-constraint': /(?=.*[a-z])(?=.*[A-Z])/,
  'third-constraint': /(?=.*[0-9])/,
  'forth-constraint': /(?=.*[\W])/,
}

// Check if both passwords match
confirmPassword.addEventListener('keyup', () => {
  if (confirmPassword.value === '') {
    confirmPassword.classList.remove('invalid');
    confirmPassword.classList.remove('valid');
    confirmPassword.nextElementSibling.classList.add('hidden');
  } else if (confirmPassword.value === password.value) {
    confirmPassword.classList.remove('invalid');
    confirmPassword.classList.add('valid');
  } else {
    confirmPassword.classList.remove('valid');
    confirmPassword.classList.add('invalid');
  }
})

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
    showInstructions(e.target);
  })
})

// Regex validation
function validate(field, regex) {
  // Ignore confirm password field
  if (field.id === 'confirm_password') return;

  if (regex.test(field.value)) {
    field.classList.add('valid');
    field.classList.remove('invalid');
  } else if (field.value === '') {
    field.classList.remove('invalid');
    field.classList.remove('valid');
  } else {
    field.classList.add('invalid');
    field.classList.remove('valid');
  }
}

// Show instructions if falsy regex test
function showInstructions(field) {
  // Ignore password field
  if (field.id === 'password') return;

  if (field.classList.contains('invalid')) {
    field.nextElementSibling.classList.remove('hidden');
  } else {
    field.nextElementSibling.classList.add('hidden');
  }
}

// Check each password constraint individually
password.addEventListener('keyup', () => {
  passwordConstraints.forEach(passwordConstraint => {
    let regex = patterns[passwordConstraint.dataset.constraint];
    if (regex.test(password.value)) {
      passwordConstraint.classList.remove('invalid-constraint');
      passwordConstraint.classList.add('valid-constraint');
    } else {
      passwordConstraint.classList.add('invalid-constraint');
      passwordConstraint.classList.remove('valid-constraint');
    }
  })
})

password.addEventListener('focus', (e) => {
  passwordInstructions.classList.remove('hidden');
})

password.addEventListener('focusout', (e) => {
  passwordInstructions.classList.add('hidden');
})

createAccBtn.addEventListener('click', createAccount);

function createAccount() {
  const numberOfValids = document.querySelectorAll('.valid').length;
  const numberOfInputs = inputs.length;
  if (numberOfInputs === numberOfValids) {
    alert('Account created successfully!');
  } else {
    alert('Please make sure all fields are filled correctly.');
  }
}