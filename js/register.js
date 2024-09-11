function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Username already exists!');
        return;
    }

    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign-up successful! You can now sign in.');
    window.location.href = './index.html'; // Redirect to sign-in page
}

document.getElementById('signup-btn').addEventListener('click', signUp);
