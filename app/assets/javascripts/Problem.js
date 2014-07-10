function Problem(posX, posY, raphael) {
    this.raphael = raphael;
    this.posX = posX;
    this.posY = posY;
    this.radius = 125;
    this.frameSprite = raphael.circle(posX, posY, this.radius + (this.radius * .05)).attr({fill: this.createVoteFrame(), stroke: 'none'});
    this.sprite = raphael.circle(posX, posY, this.radius).attr({fill: '#37517F', stroke: "none"});
    this.sprite.node.id = 'problem';
    this.textSprite = undefined;
    this.createText();
    this.frameColor = this.createVoteFrame();
}

Problem.prototype.createText = function () {

    this.textSprite = this.raphael.text(this.posX, this.posY).attr({opacity: 1});

    var text = Percolator.problem.title;
    var words = text.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        this.textSprite.attr("text", tempText + " " + words[i]);
        if (this.textSprite.getBBox().width > 100) {
            tempText += "\n" + words[i];
        } else {
            tempText += " " + words[i];
        }
    }

    this.textSprite.attr("text", tempText);
    this.textSprite.attr({ "font-size": 20, "font-family": "Opificio", "fill": "#BAD3FF"});
    this.textSprite.node.setAttribute("pointer-events", "none");
};

Problem.prototype.animate = function (direction) {
    var scale = direction == "in" ? "s1.3" : "s1.0";
    var opacity = 1;
    this.sprite.animate({transform: scale}, 400);
    this.textSprite.animate({transform: scale}, 400);
    this.frameSprite.animate({transform: scale}, 400);
    if (Percolator.currentState == "problem"){
        $('#render-solution-form').show();
        $("#improvement-button").hide();
    } else {
        $('#render-solution-form').hide();
        $("#improvement-button").show();
    };
};

Problem.prototype.addEventListeners = function () {
    var target = $('#problem')
    console.log(this);
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                Percolator.zoomIn();
                Percolator.currentState = "problem";
                BubbleGraph.hideSolutions();
                BubbleGraph.problem.textSprite.animate({opacity: 0}, 1500);
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
};

Problem.prototype.createVoteFrame = function() {
    var upvoteRatio = this.upvotes / (this.upvotes + this.downvotes)
    var downvoteRatio = this.downvotes / (this.upvotes + this.downvotes)
    if (upvoteRatio > downvoteRatio) {
        var r = 255*downvoteRatio;
        var g = 255;
        var b = 0;
    } else {
        var r = 255;
        var g = 255*upvoteRatio;
        var b = 0;
    };
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

// Problem.prototype.createVoteFrame = function() {
//     var upvoteRatio = $.parseJSON(window.data).upvotes / ($.parseJSON(window.data).upvotes + $.parseJSON(window.data).downvotes)
//     var downvoteRatio = $.parseJSON(window.data).downvotes / ($.parseJSON(window.data).upvotes + $.parseJSON(window.data).downvotes)
//     var r = 255*downvoteRatio;
//     var g = 255*upvoteRatio
// }
