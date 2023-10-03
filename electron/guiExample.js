const { exec } = require("child_process");
const nodeConsole = require("console");
const { ipcRenderer } = require("electron");
const fs = require("fs"); // Import the 'fs' module


const terminalConsole = new nodeConsole.Console(process.stdout, process.stderr);

const fileSavePath = "data/mock_data_NEW.csv"
let child;

ipcRenderer.send("run-command", "ls");
ipcRenderer.on("run-command-result", (event, result) => {
  if (result.error) {
    console.error("Error:", result.error);
  } else {
    console.log("Output:", result.output);
  }
});

const printBoth = (str) => {
  console.log(`Javascript: ${str}`);
  terminalConsole.log(`Javascript: ${str}`);
};

const saveFileToData = (fileInput) => {
  // save the file input to the data subdir
  const selectedFile = fileInput.files[0];

  if (!selectedFile) {
    alert("Please select a file before executing the Python program.");
    return;
  }

  printBoth(`Selected File: ${selectedFile.name}`);
  
  fs.readFile(selectedFile.path, (err, data) => {
    if (err) {
      alert("Error reading the file: " + err.message);
      return;
    }
    fs.writeFile(fileSavePath, data, (err) => {
      if (err) {
        alert("Error saving the file: " + err.message);
        return;
      }
      alert(`File saved to: ${fileSavePath}`);
    })
  })

}

const runPythonProgram = () => {
  child = exec("python -i ./python/pythonExample.py", (error) => {
    if (error) {
      printBoth(`exec error: ${error}`);
    }
  });
}


const startCodeFunction = () => {
  // Get the selected file input element
  const fileInput = document.getElementById("file_received");
  saveFileToData(fileInput);
  runPythonProgram();
}  

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start_code").addEventListener("click", startCodeFunction);
});

