var text;
var problemText;

Canvas = {

    ZOOM_MAX: 0.1,
    WIDTH: undefined,
    HEIGHT: undefined,
    RAPHAEL: undefined,
    RADIUS: 200,
    PROBLEM_RADIUS: 125,
    SOLUTION_RADIUS: 20,
    PROBLEM_COLOR: '#37517F',
    SOLUTION_COLOR: '#6DA2FF',
    CONNECTION_COLOR: '#666',
    solutions: [],
    lines: [],

    wrapText: function (content) {
        var words = content.split(" ");
        var tempText = "";
        for (var i=0; i<words.length; i++) {
          tempText = Canvas.fitTextToBox(i, tempText, words)
        }
        return tempText;
    },

    fitTextToBox: function(index, tempText, words) {
        var maxWidth = 120;
        text.attr("text", tempText + " " + words[index]);
        if (text.getBBox().width > maxWidth) {
            tempText += "\n" + words[index];
        } else {
            tempText += " " + words[index];
        }
        return tempText;
    },

    createProblemText: function () {
        Canvas.createText();
        problem = Canvas.createProblem();
        problemText = this.RAPHAEL.set();
        problemText.push(problem);
        problemText.push(text);
    },

    createProblem: function () {
        var problem = this.RAPHAEL.circle(this.WIDTH / 2, this.HEIGHT / 2, this.PROBLEM_RADIUS).attr({fill: this.PROBLEM_COLOR, stroke: "none"});
        problem.node.id = 'problem';
        return problem;
    },

    createText: function () {
        text = this.RAPHAEL.text(this.WIDTH / 2, this.HEIGHT / 2).attr({opacity: 0});
        var content = $.parseJSON(window.data).title;
        var tempText = this.wrapText(content);
        text.attr("text", tempText.substring(1));
        text.attr({ "font-size": 20, "font-family": "Opificio", "fill": "#BAD3FF"});
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
                    Canvas.hideSolutions();
                    text.animate({opacity: 0}, 1300);
                    // If zooming in on problem, append comment div
                    if ($("#used_and_abused")) {
                        Comments.appendDiv("problems", document.URL.substring(document.URL.lastIndexOf('/') + 1));
                    } else {
                        Comments.appendDiv("problems", document.URL.substring(document.URL.lastIndexOf('/') + 1));
                    }
                }
            },
            mouseenter: function () {
                if (!isZooming) {
                problemText.animate({transform: "s1.3"}, 400);
                text.animate({opacity: 1}, 300).toFront();
                text.node.setAttribute("pointer-events", "none");
                }
            },
            mouseleave: function () {
                if (!isZooming) {
                problemText.animate({transform: "s1"}, 400);
                text.animate({opacity: 0}, 300);
                }
            }
        });
        for (var i = 0; i < this.solutions.length; i++) {
            $('#' + i).bind({
                click: function () {
                    if (!isZooming) {
                        zoomIn(this);
                        if ($("#used_and_abused")) {
                            Comments.appendDiv("solutions", solutionNumber)
                        } else {
                            Comments.appendDiv("solutions", solutionNumber)
                        }
                        // replace comment form div elements with new for-looped comment HTML
                    }
                },
                mouseenter: function () {
                    Canvas.solutions[this.id].animate({transform: "s2"}, 250);
                },
                mouseleave: function () {
                    Canvas.solutions[this.id].animate({transform: "s1"}, 250)
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
        this.createProblemText();
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

    width: undefined,
    height: undefined,
    element: undefined,
    raphael: undefined,
    animationTimeout: undefined,
    nodes: [],
    data: undefined,

    init: function (data) {

        if (Menu.raphael) {
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
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].animate();
        }
        this.animationTimeout = setTimeout(this.animate, 1000);
    }
};

MenuNode = function (raphael) {
    this.raphael = raphael;
    this.sprite = raphael.circle(0, 0, 20).attr({fill: Canvas.SOLUTION_COLOR, stroke: "none"});
    this.direction = Math.round(Math.random()) == 0 ? -1 : 1;
    this.centerPos = Menu.height / 2;
};

MenuNode.prototype.animate = function () {
    var targetY = this.centerPos + (Math.random() * 25 * this.direction);
    this.sprite.animate({cy: targetY}, 1000);
    this.direction *= -1;
};

$(window).resize(function () {
    if ($("#canvas_container").length) {
        Canvas.init();
    }
    if ($("#bubble-container").length) {
        Menu.init(Menu.data);
    }
});



