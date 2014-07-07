Canvas = {

    createProblem: function () {
        var problem = paper.circle(Constants.WIDTH / 2, Constants.HEIGHT / 2, PROBLEM_RADIUS).attr({fill: PROBLEM_COLOR, stroke: "none"});
        problem.node.id = 'problem';
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
                    hideSolutions()
                }
            },
            mouseenter: function () {
            },
            mouseleave: function () {
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
                },
                mouseleave: function () {
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

