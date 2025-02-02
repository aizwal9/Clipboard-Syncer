document.getElementById("storeBtn").addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        const response = await fetch("http://localhost:8000/store/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        document.getElementById("tokenDisplay").innerText = `Token: ${data.token}`;
        navigator.clipboard.writeText(data.token);
        alert("Token copied to clipboard!");
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to store clipboard data.");
    }
});

document.getElementById("retrieveBtn").addEventListener("click", async () => {
    try {
        const token = document.getElementById("tokenInput").value.trim();
        const response = await fetch(`http://localhost:8000/retrieve/${token}`);
        const data = await response.json();
        document.getElementById("retrievedText").innerText = `Retrieved: ${data.text}`;
    } catch (error) {
        console.error("Error:", error);
        alert("Invalid or expired token.");
    }
});
