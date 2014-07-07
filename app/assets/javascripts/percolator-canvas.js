var text;
var problemText;

Canvas = {

    ZOOM_MAX: 0.1,
    WIDTH: undefined,
    HEIGHT: undefined,
    RAPHAEL: undefined,
    RADIUS: 125,
    PROBLEM_RADIUS: 75,
    SOLUTION_RADIUS: 8,
    PROBLEM_COLOR: '#37517F',
    SOLUTION_COLOR: '#6DA2FF',
    CONNECTION_COLOR: '#666',
    solutions: [],
    lines: [],

    createProblem: function () {
        text = this.RAPHAEL.text(this.WIDTH / 2, this.HEIGHT / 2).attr({opacity: 0});
        var content = $.parseJSON(window.data).title;
        var words = content.split(" ");
        var tempText = "";
        var maxWidth = 60;
        for (var i=0; i<words.length; i++) {
          text.attr("text", tempText + " " + words[i]);
          if (text.getBBox().width > maxWidth) {
            tempText += "\n" + words[i];
          } else {
            tempText += " " + words[i];
          }
        }
        text.attr("text", tempText.substring(1));
        text.attr({ "font-size": 18, "font-family": "Opificio", "fill": "#BAD3FF"});
        var problem = this.RAPHAEL.circle(this.WIDTH / 2, this.HEIGHT / 2, this.PROBLEM_RADIUS).attr({fill: this.PROBLEM_COLOR, stroke: "none"});
        problem.node.id = 'problem';
        problemText = this.RAPHAEL.set();
        problemText.push(problem);
        problemText.push(text);
    },

    createSolutions: function () {
        var radians = 0;
        var maxRadians = 2 * Math.PI;
        var solutions = $.parseJSON(window.data).solutions
        var step = (2 * Math.PI) / solutions.length;

        for (var i = 0; i < solutions.length; i++) {

            var radius = this.RADIUS + (50 * (i % 2));
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
                problemText.animate({transform: "s1.5"}, 400);
                text.animate({opacity: 1}, 300).toFront();
                text.node.setAttribute("pointer-events", "none");
            },
            mouseleave: function () {
                problemText.animate({transform: "s1"}, 400);
                text.animate({opacity: 0}, 300);
            }
        });
        for (var i = 0; i < this.solutions.length; i++) {
            $('#' + i).bind({
                click: function () {
                    if (!isZooming) {
                        zoomIn(this);
                    }
                },
                mouseenter: function () {
                    Canvas.solutions[i-1].animate({transform: "s1.7"}, 250);
                    // console.log(Canvas.solutions[0]);

                },
                mouseleave: function () {
                    Canvas.solutions[i-1].animate({transform: "s1"}, 250)
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
    NODES: [],

    init: function () {
        if (Menu.RAPHAEL) {
            this.NODES = []
            this.RAPHAEL.remove();
        }
        this.ELEMENT = $("#bubble-container");
        this.WIDTH = this.ELEMENT.width();
        this.HEIGHT = this.ELEMENT.height();
        this.RAPHAEL = new Raphael(this.ELEMENT.get(0), this.WIDTH, this.HEIGHT);

        this.createSolutions();
        this.animate();
    },

    createSolutions: function () {
        var node = this.RAPHAEL.circle(0, 0, 20).attr({fill: Canvas.SOLUTION_COLOR, stroke: "none"});
        this.NODES.push(node)
    },

    animate: function () {
        for (var i = 0; i < this.NODES.length; i++) {
            this.NODES[i].animate({cx: Math.random() * this.WIDTH, cy: Math.random() * this.HEIGHT}, 1000);
        }
        setTimeout(this.animate, 1000);
    }
};

