BubbleMenu = {

    width: undefined,
    height: undefined,
    element: undefined,
    raphael: undefined,
    animationTimeout: undefined,
    solutions: [],
    data: undefined,

    init: function () {

        if (BubbleMenu.raphael) {
            this.solutions = [];
            this.raphael.remove();
            clearTimeout(this.animationTimeout);
        }
        this.data = $.parseJSON(window.data).solutions;
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
            var pos = (period * (i + 1));
            var solution = new Solution(0, 0, this.data[i].id, this.raphael);
            solution.sprite.attr({'cx': pos.toString()});
            solution.sprite.attr({'cy': this.height.toString()});
            this.solutions.push(solution);
        }
    },

    animate: function () {
        if (this.nodes) {
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].animate();
        }
        this.animationTimeout = setTimeout(this.animate, 1000);
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
