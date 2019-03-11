define(["../lib/jquery-1.11.2"], function (_jQuery) {
    var $ = _jQuery.noConflict(true);
    return {
        drawCircle: function (x, y, radius, color, canvas) {
            let circle = $("<div/>");
            circle.css({
                width: radius * 2 + "px",
                height: radius * 2 + "px",
                backgroundColor: color,
                position: "absolute",
                borderRadius: "50%",
                top: y + "px",
                left: x + "px"
            });
            $(canvas).append(circle);
        },
        drawRectangle: function (x, y, width, height, borderRadius, color, canvas) {
            let rectDom = $("<div/>");
            rectDom.css({
                width,
                height,
                backgroundColor: color,
                position: "absolute",
                borderRadius,
                top: y + "px",
                left: x + "px"
            });
            $(canvas).append(rectDom);
        }
    };
})