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

    this.textSprite = this.raphael.text(this.posX, this.posY).attr({opacity: 1});

    var text = $.parseJSON(window.data).title;
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
    this.textSprite.animate({opacity: opacity}, 300).toFront();
    if (Percolator.currentState == "solution"){
        $('#render-solution-form').show();
        $("#improvement-button").hide();
    } else {
        $('#render-solution-form').hide();
        $("#improvement-button").show();
    };
};

Problem.prototype.addEventListeners = function () {
    var target = $('#problem')
    target.bind({
        click: function () {
            if (!Percolator.isZooming) {
                Percolator.zoomIn();
                Percolator.currentState = "problem";
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

// Problem.prototype.createVoteFrame = function() {
//     var upvoteRatio = $.parseJSON(window.data).upvotes / ($.parseJSON(window.data).upvotes + $.parseJSON(window.data).downvotes)
//     var downvoteRatio = $.parseJSON(window.data).downvotes / ($.parseJSON(window.data).upvotes + $.parseJSON(window.data).downvotes)
//     var r = 255*downvoteRatio;
//     var g = 255*upvoteRatio
// }
