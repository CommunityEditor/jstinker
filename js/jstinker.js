var titleLabel;
var titleInput = document.createElement("input");
titleInput.setAttribute("maxlength", "45");
titleInput.setAttribute("id", "program-title");
titleInput.addEventListener("change", removeTitleInput);
titleInput.addEventListener("blur", removeTitleInput);
titleInput.addEventListener("keypress", function (e) {
    //If the enter or return key is pressed.
    if (e.which === 13) {
        removeTitleInput();
    }
});

function removeTitleInput () {
    if (titleInput.parentNode === null) return;
    titleLabel.innerText = titleInput.value;
    titleInput.parentNode.insertBefore(titleLabel, titleInput);
    titleInput.parentNode.removeChild(titleInput);
}

function runProgram (event) {
    if (event) {
        event.preventDefault();
    }

    //Insert JS
    var html = ace.edit("html-editor").getSession().getValue();
    html = html.replace(/\/\*\[OurJSEditor insert:(js|css)\]\*\//gi, function (comment, language, position, code) {
        return ace.edit(language.toLowerCase() + "-editor").getSession().getValue();
    })

    var frame = document.getElementById("preview");
    //This removes the frame element from the DOM (and then replaces it), clearing the user's old code.
    frame.parentNode.replaceChild(frame, frame);
    var outputDoc = frame.contentDocument;
    outputDoc.write(html);
    outputDoc.close();
}

document.addEventListener("DOMContentLoaded", function() {

    // TIDYUP Button
    document.getElementById("btnTidyUp").addEventListener("click", function(event) {
        event.preventDefault();

        var html = ace.edit("html-editor").getSession().getValue();
        var html2 = style_html(html);

        ace.edit("html-editor").getSession().setValue(html2);

        var css = ace.edit("css-editor").getSession().getValue();
        var css2 = css_beautify(css);

        ace.edit("css-editor").getSession().setValue(css2);

        var js = ace.edit("js-editor").getSession().getValue();
        var js2 = js_beautify(js);

        ace.edit("js-editor").getSession().setValue(js2);
    });

    // Together Button
    document.getElementById("btnTogether").addEventListener("click", function(event) {
      event.preventDefault();

      TogetherJS(this);
      return false;
    });

    document.getElementById("btnRun").addEventListener("click", runProgram);

    titleLabel = document.getElementById("program-title");
    titleLabel.classList.add("editable");
    titleLabel.addEventListener("click", function (event) {
        event.preventDefault();

        titleInput.value = this.innerText;
        titleLabel.parentNode.insertBefore(titleInput, titleLabel);
        titleLabel.parentNode.removeChild(titleLabel);
        titleInput.focus();
    });
});

//Run program on window load. That way Ace is definitely loaded.
window.addEventListener("load", function () {
    runProgram();
});
