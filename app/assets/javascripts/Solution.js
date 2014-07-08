function Solution(posX, posY, id, raphael) {
    this.posX = posX;
    this.posY = posY;
    this.id = id;
    this.data = $.parseJSON(window.data).solutions[id];
    this.raphael = raphael;
    this.sprite = raphael.circle(posX, posY, 40).attr({fill: '#6DA2FF', stroke: "none"});
    this.sprite.node.id = id;
    this.textSprite = undefined;
    this.createText();
}

Solution.prototype.createText = function () {

    this.textSprite = this.raphael.text(this.posX, this.posY).attr({opacity: 0});
    var textSprite = this.textSprite;

    var text = $.parseJSON(window.data).solutions[1].title || "Failure";
    if (text.length > 55) {
        text = text.substring(0, 45) + "...";
    };

    var words = text.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        textSprite.attr("text", tempText + " " + words[i]);
        if (textSprite.getBBox().width > 60) {
            tempText += "\n" + words[i];
        } else {
            tempText += " " + words[i];
        }
    }

    textSprite.attr("text", tempText);
    textSprite.attr({ "font-size": 10, "font-family": "Opificio", "fill": "#FFFFFF"});
    textSprite.node.setAttribute("pointer-events", "none");
};

Solution.prototype.animate = function (direction) {
    var scale = direction == "in" ? "s1.3" : "s1.0";
    var opacity = direction == "in" ? 1 : 0;
    this.sprite.animate({transform: scale}, 400);
    this.textSprite.animate({transform: scale}, 400);
    this.textSprite.animate({opacity: opacity}, 300);//.toFront();
};

Solution.prototype.addEventListeners = function () {
    var target = $('#' + this.id)
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                Percolator.zoomIn(this);
                if ($("#used_and_abused")) {
                    Comments.appendDiv("solutions", solutionNumber)
                } else {
                    Comments.appendDiv("solutions", solutionNumber)
                }
            }
        },
        mouseenter: function () {
            if (!Percolator.isZooming) {
                BubbleGraph.solutions[this.id].animate("in")
            }
        },
        mouseleave: function () {
            if (!Percolator.isZooming) {
                BubbleGraph.solutions[this.id].animate("out")
            }
        }
    });
};
