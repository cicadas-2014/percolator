function Problem(posX, posY, raphael) {
    this.raphael = raphael;
    this.posX = posX;
    this.posY = posY;
    this.sprite = raphael.circle(posX, posY, 125).attr({fill: '#37517F', stroke: "none"});
    this.sprite.node.id = 'problem';
    this.textSprite = undefined;
    this.createText();

}

Problem.prototype.createText = function () {

    this.textSprite = this.raphael.text(this.posX, this.posY).attr({opacity: 0});
    var textSprite = this.textSprite;

    var text = $.parseJSON(window.data).title;
    var words = text.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        textSprite.attr("text", tempText + " " + words[i]);
        if (textSprite.getBBox().width > 100) {
            tempText += "\n" + words[i];
        } else {
            tempText += " " + words[i];
        }
    }

    textSprite.attr("text", tempText);
    textSprite.attr({ "font-size": 20, "font-family": "Opificio", "fill": "#BAD3FF"});
    textSprite.node.setAttribute("pointer-events", "none");
};

Problem.prototype.animate = function (direction) {
    var scale = direction == "in" ? "s1.3" : "s1.0";
    var opacity = direction == "in" ? 1 : 0;
    this.sprite.animate({transform: scale}, 400);
    this.textSprite.animate({transform: scale}, 400);
    this.textSprite.animate({opacity: opacity}, 300).toFront();
};

Problem.prototype.addEventListeners = function () {
    var target = $('#problem')
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                Percolator.zoomIn();
                BubbleGraph.hideSolutions();
                if ($("#used_and_abused")) {
                    Comments.appendDiv("problems", document.URL.substring(document.URL.lastIndexOf('/') + 1));
                } else {
                    Comments.appendDiv("problems", document.URL.substring(document.URL.lastIndexOf('/') + 1));
                }
            }
        },
        mouseenter: function () {
            if (!Percolator.isZooming) {
                BubbleGraph.problem.animate("in")
            }
        },
        mouseleave: function () {
            if (!Percolator.isZooming) {
                BubbleGraph.problem.animate("out")
            }
        }
    });
}
