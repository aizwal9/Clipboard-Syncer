chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "store") {
        fetch("http://localhost:8000/store/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: request.text }),
        })
            .then(response => response.json())
            .then(data => sendResponse({ token: data.token }))
            .catch(error => console.error("Error:", error));
        return true;
    }
});
