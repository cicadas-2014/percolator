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

    console.log("LIKELY ERROR HERE")
    var text = $.parseJSON(window.data).solutions[this.id].title || "Failure";
    var words = text.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        textSprite.attr("text", tempText + " " + words[i]);
        if (textSprite.getBBox().width > 50) {
            tempText += "\n" + words[i];
        } else {
            tempText += " " + words[i];
        }
    }

    textSprite.attr("text", tempText);
    textSprite.attr({ "font-size": 14, "font-family": "Opificio", "fill": "#FFFFFF"});
    textSprite.node.setAttribute("pointer-events", "none");
};

Solution.prototype.animate = function (direction) {
    var scale = direction == "in" ? "s1.3" : "s1.0";
    var opacity = direction == "in" ? 1 : 0;
    this.sprite.animate({transform: scale}, 400);
    this.textSprite.animate({transform: scale}, 400);
    this.textSprite.animate({opacity: opacity}, 300).toFront();
};

Solution.prototype.addEventListeners = function () {
    var target = $('#' + this.id)
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                Percolator.solutionNumber = this.id;
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
