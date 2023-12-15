const requestUrl = 'http://127.0.0.1:8001/url';

const urlForm = document.querySelector('.input-container');
const shortenedUrlContainer = document.getElementById('shortenedURL');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('enterLink').value;

    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "url": urlInput
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const request = await fetch("http://localhost:8001/url", requestOptions);        

        if (!request.ok) {
            throw new Error('Network response was not ok.');
        }

        const response = await request.json();
        console.log(response.id);

        if (response.id != "") {
            const shortUrl = window.location.origin + '/' + response.id; // Use the shortened URL from the server response
            shortenedUrlContainer.innerText = `Shortened URL: ${shortUrl}`; // Display the shortened URL to the user
        } else {
            throw new Error('Shortened URL not received.'); // Error handling if shortened URL is not available in the response
        }
    } catch (error) {
        console.error('Error:', error);
        // Display an error message to the user
        shortenedUrlContainer.innerText = `Error: ${error.message}. Please try again.`;
    }
});