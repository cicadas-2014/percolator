function addProblemListeners() {
    var target = $('#problem')
    target.bind({
        click: function () {
            if (!isZooming) {
                zoomIn();
                BubbleGraph.hideSolutions();
                if ($("#used_and_abused")) {
                    Comments.appendDiv("problems", document.URL.substring(document.URL.lastIndexOf('/') + 1));
                } else {
                    Comments.appendDiv("problems", document.URL.substring(document.URL.lastIndexOf('/') + 1));
                }
            }
        },
        mouseenter: function () {
            if (!isZooming) {
                BubbleGraph.problem.animate("in")
            }
        },
        mouseleave: function () {
            if (!isZooming) {
                BubbleGraph.problem.animate("out")
            }
        }
    });
}
function addSolutionListeners() {
    for (var i = 0; i < this.solutions.length; i++) {
        var target = $('#' + this.solutions[i].id)
        target.bind({
            click: function () {
                if (!isZooming) {
                    zoomIn(this);
                    if ($("#used_and_abused")) {
                        Comments.appendDiv("solutions", solutionNumber)
                    } else {
                        Comments.appendDiv("solutions", solutionNumber)
                    }
                }
            },
            mouseenter: function () {
                if (!isZooming) {
                    BubbleGraph.solutions[this.id].animate("in")
                }
            },
            mouseleave: function () {
                if (!isZooming) {
                    BubbleGraph.solutions[this.id].animate("out")
                }
            }
        });
    }
}
BubbleGraph = {

    ZOOM_MAX: 0.1,
    width: undefined,
    height: undefined,
    raphael: undefined,
    RADIUS: 220,
    CONNECTION_COLOR: '#666',
    solutions: [],
    lines: [],


    createProblem: function () {
        this.problem = new Problem(this.width / 2, this.height / 2, this.raphael);
    },


    createSolutions: function () {
        var radians = 0;
        var maxRadians = 2 * Math.PI;
        var solutions = $.parseJSON(window.data).solutions
        var step = (2 * Math.PI) / solutions.length;
        for (var i = 0; i < solutions.length; i++) {
            var radius = this.RADIUS + (50 * (i % 2));
            var posX = this.width / 2 + (Math.cos(radians) * radius);
            var posY = this.height / 2 + (Math.sin(radians) * radius);
            this.createLine(posX, posY);
            var solution = new Solution(posX, posY, i, this.raphael)
            BubbleGraph.solutions.push(solution);
            radians += step;
            if (radians > maxRadians) {
                radians -= maxRadians;
            }
        }
    },

    createLine: function (posX, posY) {
        var line = this.raphael.path("M" + posX + "," + posY + "L" + this.width / 2 + "," + this.height / 2).attr({stroke: this.CONNECTION_COLOR});
        this.lines.push(line);
        return line;
    },

    addEventListeners: function () {
        addProblemListeners();
        addSolutionListeners.call(this);
    },

    init: function () {
        this.raphael && this.raphael.remove();
        this.width = $(window).width();
        this.height = $(window).height() - 90;
        this.raphael = new Raphael($("#canvas_container").get(0), this.width, this.height);

        this.createSolutions();
        this.createProblem();
        this.addEventListeners();
    },

    hideSolutions: function (target) {
        for (var i = 0; i < BubbleGraph.solutions.length; i++) {
            if (BubbleGraph.solutions[i] == target) {
                BubbleGraph.lines[i].animate({ opacity: 0 }, 2000);
            }
            else {
                BubbleGraph.solutions[i].animate({ opacity: 0 }, 1000);
                BubbleGraph.lines[i].animate({ opacity: 0 }, 500);
            }
        }
    },

    showSolutions: function () {
        for (var i = 0; i < BubbleGraph.solutions.length; i++) {
            BubbleGraph.solutions[i].animate({ opacity: 1 }, 1000);
            BubbleGraph.lines[i].animate({ opacity: 1 }, 2000);
        }
    },

    zoomIn: function (x, y, callback) {
        this.raphael.animateViewBox(x, y, this.width * this.ZOOM_MAX, this.height * this.ZOOM_MAX, 2000, '<>', callback);
    },

    zoomOut: function (x, y, callback) {
        this.raphael.animateViewBox(x, y, this.width, this.height, 2000, '<>', callback);
    }
};