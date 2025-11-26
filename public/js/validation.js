document.addEventListener('DOMContentLoaded', () => {
  const accountForm = document.querySelector('form[action="/account/update"]');
  const passwordForm = document.querySelector('form[action="/account/update-password"]');

  if (accountForm) {
    accountForm.addEventListener('submit', e => {
      const firstname = accountForm.firstname.value.trim();
      const lastname = accountForm.lastname.value.trim();
      const email = accountForm.email.value.trim();
      if (!firstname || !lastname || !email) {
        alert('All fields are required');
        e.preventDefault();
      }
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener('submit', e => {
      const password = passwordForm.password.value;
      if (password.length < 8) {
        alert('Password must be at least 8 characters');
        e.preventDefault();
      }
    });
  }
});
