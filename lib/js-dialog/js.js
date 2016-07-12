
function showDialog(e, m, fn) {
    var wh = $(window).height();
    var t = $(e).css({ "z-index": 1002, "position": "fixed"});
    repositionDialog(t);
    $(window).resize(function() {
        repositionDialog(t);
    });
   
    showMask(m, function() { t.fadeIn(m && m.delay ? m.delay : 150, fn); }).dblclick(function() {
        hideDialog(e);
    });
}

function showMask(s, fn) {
    var c = { "opacity": 0.3, "bgcolor": "black", "delay": 150 };
    if (s) {
        if (s.opacity) c.opacity = s.opacity;
        if (s.bgcolor) c.bgcolor = s.bgcolor;
        if (s.delay) c.delay = s.delay;
    }
    if (!document.getElementById("maskDiv")) {
        var maskDiv = "<div id='maskDiv' style='display: none; width: 100%; height: " + $(document).height() + "px; ";
        maskDiv += "position: absolute; top: 0; left: 0; z-index: 1001; background-color: " + c.bgcolor + "; "
        maskDiv += "-moz-opacity: " + c.opacity + "; opacity: " + c.opacity + "; filter: alpha(opacity=" + c.opacity * 100 + ");'></div>";
        $("body").append(maskDiv);
    }
    return $("#maskDiv").fadeIn(c.delay, fn);
}

function repositionDialog(t) {
    t.css({
        "top": $(window).height() / 2 - t.outerHeight() / 2,
        "left": $(window).width() / 2 - t.outerWidth() / 2
    });
}

function hideDialog(e, fn) {
    $(e).fadeOut(150, function() {
        $("#maskDiv").fadeOut(150, function() {
            $(this).remove();
            if (typeof (fn)=="function") fn();
        });
    });
}