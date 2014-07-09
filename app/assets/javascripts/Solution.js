function Solution(posX, posY, id, raphael) {
    this.posX = posX;
    this.posY = posY;
    this.id = id;
    this.data = $.parseJSON(window.data).solutions[id];
    this.raphael = raphael;
    this.upvotes = $.parseJSON(window.data).solutions[this.id].upvotes;
    this.downvotes = $.parseJSON(window.data).solutions[this.id].downvotes;
    this.radius = 10 + (this.upvotes + this.downvotes)
    this.frameSprite = raphael.circle(posX, posY, this.radius + (this.radius * .1)).attr({fill: this.createVoteFrame(), stroke: 'none'});
    this.sprite = raphael.circle(posX, posY, this.radius).attr({fill: '#6DA2FF', stroke: "none"});
    this.sprite.node.id = id;
    this.textSprite = undefined;
    this.createText();
    this.frameColor = this.createVoteFrame();
}

Solution.prototype.createText = function () {

    this.textSprite = this.raphael.text(this.posX, (this.posY - 5)).attr({opacity: 0});
    var textSprite = this.textSprite;

    //TODO
    console.log("LIKELY ERROR HERE")
    if (Percolator.currentState == "problem"){
        $('#render-solution-form').show();
        $("#improvement-button").hide();
    } else {
        $('#render-solution-form').hide();
        $("#improvement-button").show();
    };

    var text = $.parseJSON(window.data).solutions[this.id].title || "Failure";
    if (text.length > 55) {
        text = text.substring(0, 45) + "...";
    };

    var words = text.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        textSprite.attr("text", tempText + " " + words[i]);
        if (textSprite.getBBox().width > (1.3*this.radius)) {
            tempText += "\n" + words[i];
        } else {
            tempText += " " + words[i];
        }
    }

    textSprite.attr("text", tempText);
    textSprite.attr({ "font-size": ((this.radius * .15)+3), "font-family": "Opificio", "fill": "#FFFFFF"});
    textSprite.node.setAttribute("pointer-events", "none");
};

Solution.prototype.animate = function (direction) {
    var scale = direction == "in" ? "s1.3" : "s1.0";
    var opacity = direction == "in" ? 1 : 0;
    this.sprite.animate({transform: scale}, 400);
    this.textSprite.animate({transform: scale}, 400);
    this.textSprite.animate({opacity: opacity}, 300);//.toFront();
    this.frameSprite.animate({transform: scale}, 400);
};

Solution.prototype.addEventListeners = function () {
    var target = $('#' + this.id)
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                Percolator.solutionNumber = this.id;
                Percolator.zoomIn(this);
                Percolator.currentState = "solution";
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

Solution.prototype.createVoteFrame = function() {
    var upvoteRatio = this.upvotes / (this.upvotes + this.downvotes)
    var downvoteRatio = this.downvotes / (this.upvotes + this.downvotes)
    var r = 255*downvoteRatio;
    var g = 255*upvoteRatio;
    var b = 0;
    return rgbToHex(r,g,b);
    function rgbToHex(r,g,b) {return "#"+toHex(r)+toHex(g)+toHex(b)}
    function toHex(n) {
       n = parseInt(n,10);
       if (isNaN(n)) return "00";
       n = Math.max(0,Math.min(n,255));
       return "0123456789ABCDEF".charAt((n-n%16)/16)
       + "0123456789ABCDEF".charAt(n%16);
   }
};
