function loadDoc() {
    let xhttp = new XMLHttpRequest();
    let filename = document.getElementById("file").value;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let word = document.getElementById("word").value;
            let res = searchWord(this, word);
            if (res === -1) {
                document.getElementById("result").innerHTML = "Not found!";
            } else {
                document.getElementById("result").innerHTML = "Found in line number " + res;
        }
        }
    }
    xhttp.open("GET", filename, true);
    xhttp.send();
}

function searchWord(txt, word) {
    let texts = txt.responseText.splits("\n");
    for (let i = 0; i < texts.length; i += 1) {
        if (texts[i].includes(word)) {
            return i + 1;
        }
    }
    return -1;
}