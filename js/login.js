document.getElementById('signin-btn').addEventListener('click', function() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        alert('Sign-in successful!');
        window.location.href = './admin.html'; // Redirect to admin page
    } else {
        alert('Invalid username or password.');
    }
});
