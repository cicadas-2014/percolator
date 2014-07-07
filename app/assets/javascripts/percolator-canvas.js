Canvas = {

    ZOOM_MAX: 0.1,
    WIDTH: undefined,
    HEIGHT: undefined,
    RAPHAEL: undefined,
    PROBLEM_RADIUS: 75,
    SOLUTION_RADIUS: 8,
    PROBLEM_COLOR: '#37517F',
    SOLUTION_COLOR: '#6DA2FF',
    CONNECTION_COLOR: '#666',
    solutions: [],
    lines: [],

    createProblem: function () {
        var problem = this.RAPHAEL.circle(this.WIDTH / 2, this.HEIGHT / 2, this.PROBLEM_RADIUS).attr({fill: this.PROBLEM_COLOR, stroke: "none"});
        problem.node.id = 'problem';
    },

    createSolutions: function () {
        var radians = 0;
        var maxRadians = 2 * Math.PI;
        var solutions = $.parseJSON(window.data).solutions
        var step = (2 * Math.PI) / solutions.length;

        for (var i = 0; i < solutions.length; i++) {
            var radius = 125 + (50 * (i % 2));
            var posX = this.WIDTH / 2 + (Math.cos(radians) * radius);
            var posY = this.HEIGHT / 2 + (Math.sin(radians) * radius);
            this.createLine(posX, posY);
            this.createSolution(posX, posY, i, solutions[i]);
            radians += step;
            if (radians > maxRadians) {
                radians -= maxRadians;
            }
        }
    },

    createSolution: function (posX, posY, id) {
        var solution = this.RAPHAEL.circle(posX, posY, this.SOLUTION_RADIUS).attr({fill: this.SOLUTION_COLOR, stroke: "none"});
        solution.id = id;
        solution.node.id = id;
        Canvas.solutions.push(solution);
        return solution;
    },

    createLine: function (posX, posY) {
        var line = this.RAPHAEL.path("M" + posX + "," + posY + "L" + this.WIDTH / 2 + "," + this.HEIGHT / 2).attr({stroke: this.CONNECTION_COLOR});
        lines.push(line);
        return line;
    },

    addEventListeners: function () {
        $('#problem').bind({
            click: function () {
                if (!isZooming) {
                    zoomIn();
                    Canvas.hideSolutions()
                }
            },
            mouseenter: function () {
            },
            mouseleave: function () {
            }
        });
        for (var i = 0; i < Canvas.solutions.length; i++) {
            $('#' + i).bind({
                click: function () {
                    if (!isZooming) {
                        zoomIn(this);
                    }
                },
                mouseenter: function () {
                },
                mouseleave: function () {
                }
            });
        }
    },
    init: function () {
        if (this.RAPHAEL) {
            this.RAPHAEL.remove();
        }
        ;
        this.WIDTH = $(window).width();
        this.HEIGHT = $(window).height() - 90;
        this.RAPHAEL = new Raphael($("#canvas_container").get(0), this.WIDTH, this.HEIGHT);

        this.createSolutions();
        this.createProblem();
        this.addEventListeners();
    },

    hideSolutions: function (target) {
        for (var i = 0; i < Canvas.solutions.length; i++) {
            if (Canvas.solutions[i] == target) {
                lines[i].animate({ opacity: 0 }, 2000);
            }
            else {
                Canvas.solutions[i].animate({ opacity: 0 }, 1000);
                lines[i].animate({ opacity: 0 }, 500);
            }
        }
    },

    showSolutions: function () {
        for (var i = 0; i < Canvas.solutions.length; i++) {
            Canvas.solutions[i].animate({ opacity: 1 }, 1000);
            lines[i].animate({ opacity: 1 }, 2000);
        }
    },

    zoomIn: function (x, y, callback) {
        this.RAPHAEL.animateViewBox(x, y, this.WIDTH * this.ZOOM_MAX, this.HEIGHT * this.ZOOM_MAX, 2000, '<>', callback);
    },

    zoomOut: function (x, y, callback) {
        this.RAPHAEL.animateViewBox(x, y, this.WIDTH, this.HEIGHT, 2000, '<>', callback);
    }
};

Menu = {

    WIDTH: undefined,
    HEIGHT: undefined,
    ELEMENT: undefined,
    RAPHAEL: undefined,

    init: function () {
        if (Menu.RAPHAEL) {
            Menu.RAPHAEL.remove();
        }
        this.ELEMENT = $("#bubble-container");
        this.WIDTH = this.ELEMENT.width();
        this.HEIGHT = this.ELEMENT.height();
        this.RAPHAEL = new Raphael(this.ELEMENT.get(0), this.WIDTH, this.HEIGHT);

        this.createSolutions();
    },

    createSolutions: function () {
        this.RAPHAEL.circle(0, 0, 20).attr({fill: Canvas.SOLUTION_COLOR, stroke: "none"});
    }
}

