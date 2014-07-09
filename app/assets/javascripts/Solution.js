function Solution(posX, posY, id, raphael) {
    this.parseID(id);
    this.targetWidth = 200;
    this.posX = posX;
    this.posY = posY;
    this.data = $.parseJSON(window.data).solutions[id];
    this.raphael = raphael;
    this.upvotes = $.parseJSON(window.data).solutions[this.id].upvotes;
    this.downvotes = $.parseJSON(window.data).solutions[this.id].downvotes;
    this.radius = 10 + (this.upvotes + this.downvotes) / 2;
    this.frameSprite = raphael.circle(posX, posY, this.radius + (this.radius * .1)).attr({fill: this.createVoteFrame(), stroke: 'none', opacity: .3});
    this.sprite = raphael.circle(posX, posY, this.radius).attr({fill: '#6DA2FF', stroke: "none", XXX: "SIGNIFIER", opacity: .3});
    this.sprite.node.id = id;
    this.textSprite = undefined;
    this.createText();
    this.frameColor = this.createVoteFrame();
}

Solution.prototype.createText = function () {

    this.textSprite = this.raphael.text(this.posX, (this.posY - 5)).attr({opacity: 0});

    var text = $.parseJSON(window.data).solutions[this.id].title || "Failure";
    if (text.length > 55) {
        text = text.substring(0, 45) + "...";
    };

    var words = text.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        this.textSprite.attr("text", tempText + " " + words[i]);
        if (this.textSprite.getBBox().width > (3.2 * this.radius)) {
            tempText += "\n" + words[i];
        } else {
            tempText += " " + words[i];
        }
    }

    this.textSprite.attr("text", tempText);
    this.textSprite.attr({ "font-size": ((this.radius * .15) + 2), "font-family": "Opificio", "fill": "#FFFFFF"});
    this.textSprite.node.setAttribute("pointer-events", "none");
};

Solution.prototype.animate = function (direction) { // only called during the initial wave of creates
    var targetScale = "s" + (this.targetWidth / (this.radius * 2.5)).toString();
    console.log(targetScale);
    var scale = direction == "in" ? targetScale : "s1.0";
    var opacity = direction == "in" ? 1 : 0;
    this.sprite.animate({transform: scale}, 400);
    this.textSprite.animate({transform: scale}, 400);
    this.textSprite.animate({opacity: opacity}, 300);//.toFront();
    this.frameSprite.animate({transform: scale}, 400);
};

Solution.prototype.addEventListeners = function () {
    var delegate = this
    var target = delegate.original_id ? $("#" + this.original_id) : $('#' + this.id);
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                if (Percolator.isDetailWindowOpen == false) {
                    delegate.original_id ? Percolator.zoomIn($("#" + delegate.original_id)[0]) : Percolator.zoomIn(this);
                    Percolator.currentState = "solution";
                    Comments.appendDiv("solutions", solutionNumber)
                }
                else
                {
                    Percolator.solutionNumber = delegate.id;
                    Percolator.zoomOutAndZoomInOnSolution()
                }
            }
        },
        mouseenter: function () {
            if (!Percolator.isZooming) {
                if (!delegate.original_id) {
                    BubbleGraph.solutions[this.id].animate("in")
                } else {
                    var parsedId = delegate.idParser(delegate.id)
                    BubbleMenu.solutions[parsedId].animate("in")
                }
            }
        },
        mouseleave: function () {
            if (!Percolator.isZooming) {
                if (!delegate.original_id) {
                    BubbleGraph.solutions[this.id].animate("out")
                } else {
                    var parsedId = delegate.idParser(delegate.id)
                    BubbleMenu.solutions[parsedId].animate("out")
                }
            }
        }
    });
};

Solution.prototype.createVoteFrame = function () {
    var upvoteRatio = this.upvotes / (this.upvotes + this.downvotes)
    var downvoteRatio = this.downvotes / (this.upvotes + this.downvotes)
    if (upvoteRatio > downvoteRatio) {
        var r = 255 * downvoteRatio;
        var g = 255;
        var b = 0;
    } else {
        var r = 255;
        var g = 255 * upvoteRatio;
        var b = 0;
    }
    ;
    return rgbToHex(r, g, b);
    function rgbToHex(r, g, b) {
        return "#" + toHex(r) + toHex(g) + toHex(b)
    }

    function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16)
            + "0123456789ABCDEF".charAt(n % 16);
    }
};

Solution.prototype.idParser = function (id) {
    var stringId = id.replace(/_/g, '')
    var numId = parseInt(stringId, "10")
    return numId
}

Solution.prototype.parseID = function (id) {
    if (typeof id === "number") {
        this.id = id;
    } else {
        this.id = id.replace(/_/g, '');
        this.original_id = id
    }
}
