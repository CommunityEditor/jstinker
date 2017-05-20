$("document").ready(function() {

    // Script Injection Dropdown
    $("#dropdownMenu2 li a").click(function(event){
        event.preventDefault();

        var dropdown = $(this).parents('.btn-group');

        var selText = $(this).text();
        dropdown.find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });

    // RUN Button
    $("#btnRun").click(function(event) {
        event.preventDefault();

        var previewDoc = window.frames[0].document;

        var css    = ace.edit("css-editor").getSession().getValue();
        var script = ace.edit("js-editor").getSession().getValue();
        var html   = ace.edit("html-editor").getSession().getValue();

        previewDoc.write("<!DOCTYPE html>");
        previewDoc.write("<html>");
        previewDoc.write("<head>");
        previewDoc.write("<style type='text/css'>" + css + "</style>");

        var dropdownMenu2Sel = $("#dropdownMenu2").parents('.btn-group').find('.dropdown-toggle').text().trim();

        if (dropdownMenu2Sel == "onLoad")
            previewDoc.write("<script type='text/javascript'>window.onload = function() {" + script + "}</script>");
        //else if (dropdownMenu2Sel == "onDomready")
        //
        else if (dropdownMenu2Sel == "No wrap - in head")
            previewDoc.write("<script type='text/javascript'>" + script + "</script>");
        previewDoc.write("</head>");
        previewDoc.write("<body>");
        previewDoc.write(html);
        if (dropdownMenu2Sel == "No wrap - in body")
            previewDoc.write("<script type='text/javascript'>" + script + "</script>");
        previewDoc.write("</body>");
        previewDoc.write("</html>");
        previewDoc.close();
    });

    // Preview code on page load
    $("#btnRun").click();

    // TIDYUP Button
    $("#btnTidyUp").click(function(event) {
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
    $("#btnTogether").click(function(event) {
      event.preventDefault();

      TogetherJS(this);
      return false;
    });
});
