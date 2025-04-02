function showProgram(event, programNumber) {
    event.preventDefault(); // Prevent the default anchor action

    let fileName = `program${programNumber}.txt`; // Example: program1.txt, program2.txt, etc.

    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then(code => {
            document.getElementById("program-code").textContent = code;
            Prism.highlightAll(); // Reapply syntax highlighting
        })
        .catch(error => {
            document.getElementById("program-code").textContent = "Error loading program.";
            console.error("Error fetching the file:", error);
        });
}
function copyCode() {
    let codeBlock = document.getElementById("program-code"); // Get the code block
    if (!codeBlock) {
        alert("No code found to copy!");
        return;
    }

    let text = codeBlock.textContent || codeBlock.innerText; // Get code text

    navigator.clipboard.writeText(text).then(() => {
        alert("Code copied to clipboard!"); // Success message
    }).catch(err => {
        console.error("Failed to copy:", err);
        alert("Failed to copy code. Please try again.");
    });
}