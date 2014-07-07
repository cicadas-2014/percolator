var text;
var problemText;

Canvas = {

    createProblem: function () {
        text = paper.text(Constants.WIDTH / 2, Constants.HEIGHT / 2).attr({opacity: 0});
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
        var problem = paper.circle(Constants.WIDTH / 2, Constants.HEIGHT / 2, PROBLEM_RADIUS).attr({fill: PROBLEM_COLOR, stroke: "none"});
        problem.node.id = 'problem';
        problemText = paper.set();
        problemText.push(problem);
        problemText.push(text);
    },

    createSolutions: function () {
        var radians = 0;
        var maxRadians = 2 * Math.PI;
        var solutions = $.parseJSON(window.data).solutions
        var step = (2 * Math.PI) / solutions.length;

        for (var i = 0; i < solutions.length; i++) {
            var radius = 125 + (50 * (i % 2))
            var posX = Constants.WIDTH / 2 + (Math.cos(radians) * radius);
            var posY = Constants.HEIGHT / 2 + (Math.sin(radians) * radius);
            Canvas.createLine(posX, posY)
            Canvas.createSolution(posX, posY, i, solutions[i])
            radians += step;
            if (radians > maxRadians) {
                radians -= maxRadians;
            }
        }
    },

    createSolution: function (posX, posY, id) {
        var solution = paper.circle(posX, posY, SOLUTION_RADIUS).attr({fill: SOLUTION_COLOR, stroke: "none"});
        solution.id = id;
        solution.node.id = id;
        solutionSprites.push(solution);
        return solution;
    },

    createLine: function (posX, posY) {
        var line = paper.path("M" + posX + "," + posY + "L" + Constants.WIDTH / 2 + "," + Constants.HEIGHT / 2).attr({stroke: CONNECTION_COLOR});
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
        for (var i = 0; i < solutionSprites.length; i++) {
            $('#' + i).bind({
                click: function () {
                    if (!isZooming) {
                        zoomIn(this);
                    }
                },
                mouseenter: function () {
                    solutionSprites[i-1].animate({transform: "s1.7"}, 250);

                },
                mouseleave: function () {
                    solutionSprites[i-1].animate({transform: "s1"}, 250)
                }
            });
        }
    },
    init: function () {
        if (paper) {
            paper.remove();
        }
        ;
        paper = new Raphael($("#canvas_container").get(0), Constants.WIDTH, Constants.HEIGHT);
        Canvas.createSolutions();
        Canvas.createProblem();
        Canvas.addEventListeners();
    },

    hideSolutions: function (target) {
        for (var i = 0; i < solutionSprites.length; i++) {
            if (solutionSprites[i][0] == target) {
                lines[i].animate({ opacity: 0 }, 2000);
            }
            else {
                solutionSprites[i].animate({ opacity: 0 }, 1000);
                lines[i].animate({ opacity: 0 }, 500);
            }
        }
    },

    showSolutions: function () {
        for (var i = 0; i < solutionSprites.length; i++) {
            solutionSprites[i].animate({ opacity: 1 }, 1000);
            lines[i].animate({ opacity: 1 }, 2000);
        }
    },

    zoomIn: function (x, y, callback) {
        paper.animateViewBox(x, y, Constants.WIDTH * Constants.ZOOM_MAX, Constants.HEIGHT * Constants.ZOOM_MAX, 2000, '<>', callback);
    },

    zoomOut: function (x, y, callback) {
        paper.animateViewBox(x, y, Constants.WIDTH, Constants.HEIGHT, 2000, '<>', callback);
    }
};

