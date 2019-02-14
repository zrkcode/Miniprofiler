(function () {
    window.angular=true;

    //Create a mini profiler script tag with the right properites 
    var MiniProfiler = $('#api_info > div:nth-child(3)').text();

    const attributes = [
        'src', 'data-version', 'data-path', 'data-current-id', 'data-ids',
        'data-position', 'data-trivial-milliseconds', 'data-max-traces',
        'data-authorized', 'data-toggle-shortcut', 'data-ignored-duplicate-execute-types'
    ];

    var GetAttr = function (input, attributeName) {
        const myRegexp = attributeName + '="(.*?)"';
        const re = new RegExp(myRegexp, "g");
        const match = re.exec(input);
        return match[1];
    }
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.id = "mini-profiler";
    s.async = true; 

    for (var i = 0; i < attributes.length; i++) {
        var element = attributes[i];
        s.setAttribute(element, GetAttr(MiniProfiler, element));
    }

    document.body.appendChild(s);

    // Remove injected tag from view 
    $('#api_info > div:nth-child(3)').text('');
})();