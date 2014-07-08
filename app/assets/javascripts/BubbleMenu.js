BubbleMenu = {

    width: undefined,
    height: undefined,
    element: undefined,
    raphael: undefined,
    animationTimeout: undefined,
    nodes: [],
    data: undefined,

    init: function (data) {

        if (BubbleMenu.raphael) {
            this.nodes = [];
            this.raphael.remove();
            clearTimeout(this.animationTimeout);
        }
        this.data = data
        this.element = $("#bubble-container");
        this.width = this.element.width();
        this.height = this.element.height();
        this.raphael = new Raphael(this.element.get(0), this.width, this.height);

        this.createSolutions();
        this.animate();
    },

    createSolutions: function () {
        var period = this.width / (this.data.length + 1);
        for (var i = 0; i < this.data.length; i++) {
            var node = new MenuNode(this.raphael);
            var pos = (period * (i + 1))
            node.sprite.attr({'cx': pos.toString()});
            node.sprite.attr({'cy': this.height.toString()});
            this.nodes.push(node)
        }
    },

    animate: function () {
        if (this.nodes) {
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].animate();
        }
        this.animationTimeout = setTimeout(this.animate, 1000);
    },

    appendAndReInit: function(newSolution) {
        console.log("in the appendAndReInit")
        console.log(newSolution)
        console.log("in the appendAndReInit")
        console.log("sandwiching window.data.add")
        $($.parseJSON(window.data).solutions).add(newSolution);
        console.log($.parseJSON(window.data).solutions)
        console.log("sandwiching window.data.add")
        console.log("--------------------")
        console.log("sandwiching upvote")
        upvote();
        console.log("sandwiching upvote")
        console.log("--------------------")
        console.log("sandwiching downvote")
        downvote();
        console.log("sandwiching downvote")
        console.log("--------------------")
        console.log("sandwiching addEventListeners")
        addEventListeners();
        console.log("sandwiching addEventListeners")
        console.log("--------------------")
        console.log("sandwiching bubble init")
        BubbleGraph.init();
        console.log("sandwiching bubble init")
        this.zoomToNewSolution();
    },

    zoomToNewSolution: function(solutionNumber) {

    }
};

MenuNode = function (raphael) {
    this.raphael = raphael;
    this.sprite = raphael.circle(0, 0, 20).attr({fill: BubbleGraph.SOLUTION_COLOR, stroke: "none"});
    this.direction = Math.round(Math.random()) == 0 ? -1 : 1;
    this.centerPos = BubbleMenu.height / 2;
};

MenuNode.prototype.animate = function () {
    var targetY = this.centerPos + (Math.random() * 25 * this.direction);
    this.sprite.animate({cy: targetY}, 1000);
    this.direction *= -1;
};
