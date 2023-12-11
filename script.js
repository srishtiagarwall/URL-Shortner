const requestUrl = 'http://127.0.0.1:8001/URL-Shortner/?#';

const urlForm = document.querySelector('.input-container');
const shortenedUrlContainer = document.getElementById('shortenedURL');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('enterLink').value;

    try {
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: urlInput })
        });

        console.log(response);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        /*const data = await response.json(); // Parsing the response to JSON
        console.log('Received data:', data);

        const shortUrl = window.location.origin + '/' + data.id;
        console.log(shortUrl); // Log the shortened URL

        shortenedUrlContainer.innerText = `Shortened URL: ${shortUrl}`;

    } catch (error) {
        console.error('Error:', error); */

        if (data.shortenedUrl) {
            const shortUrl = window.location.origin + '/' + data.shortenedUrl; // Use the shortened URL from the server response
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