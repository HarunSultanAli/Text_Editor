const editor = document.getElementById("editor");
const newBtn = document.getElementById("newBtn");
const openBtn = document.getElementById("openBtn");
const saveBtn = document.getElementById("saveBtn");

let currentFile = null;

newBtn.addEventListener("click", () => {
    editor.value = "";
    currentFile = null;
});

openBtn.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                editor.value = reader.result;
                currentFile = file;
            };
            reader.readAsText(file);
        }
    });
    fileInput.click();
});

saveBtn.addEventListener("click", () => {
    if (currentFile) {
        const content = editor.value;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = currentFile.name;
        a.click();
    } else {
        const content = editor.value;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "untitled.txt";
        a.click();
    }
});
