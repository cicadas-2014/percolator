var text;
var problemSet;

BubbleGraph = {

    ZOOM_MAX: 0.1,
    width: undefined,
    height: undefined,
    raphael: undefined,
    RADIUS: 220,
    SOLUTION_RADIUS: 40,
    SOLUTION_COLOR: '#6DA2FF',
    CONNECTION_COLOR: '#666',
    solutions: [],
    lines: [],

    wrapText: function (content) {
        var words = content.split(" ");
        var tempText = "";
        for (var i=0; i<words.length; i++) {
            tempText = this.fitTextToBox(i, tempText, words)
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

    createText: function () {
        text = this.raphael.text(this.width / 2, this.height / 2).attr({opacity: 0});
        var content = $.parseJSON(window.data).title;
        var tempText = this.wrapText(content);
        text.attr("text", tempText.substring(1));
        text.attr({ "font-size": 20, "font-family": "Opificio", "fill": "#BAD3FF"});
    },

    createProblem: function () {
        var problem = new Problem(this.width / 2, this.height / 2, this.raphael);
        this.createText();
        problemSet = this.raphael.set();
        problemSet.push(problem.sprite);
        problemSet.push(text);
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
            this.createSolution(posX, posY, i, solutions[i]);
            radians += step;
            if (radians > maxRadians) {
                radians -= maxRadians;
            }
        }
    },

    createSolution: function (posX, posY, id) {
        var solution = this.raphael.circle(posX, posY, this.SOLUTION_RADIUS).attr({fill: this.SOLUTION_COLOR, stroke: "none"});
        solution.id = id;
        solution.node.id = id;
        var solutionText = this.raphael.text(posX, posY).attr("text", $.parseJSON(window.data).solutions[id].title).attr({opacity: 0, "font-family": "Opificio", "fill": "white"});
        solutionText.node.setAttribute('pointer-events', 'none');
        var solutionWithText = this.raphael.set();
        solutionWithText.push(solution);
        solutionWithText.push(solutionText);
        BubbleGraph.solutions.push(solutionWithText);
        return solutionWithText;
    },

    createLine: function (posX, posY) {

        var line = this.raphael.path("M" + posX + "," + posY + "L" + this.width / 2 + "," + this.height / 2).attr({stroke: this.CONNECTION_COLOR});
        this.lines.push(line);
        return line;
    },

    addEventListeners: function () {
        $('#problem').bind({
            // console.log("adding event listeners")
            click: function () {
                if (!isZooming) {
                    zoomIn();
                    BubbleGraph.hideSolutions();
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
                    problemSet.animate({transform: "s1.3"}, 400);
                    text.animate({opacity: 1}, 300).toFront();
                    text.node.setAttribute("pointer-events", "none");
                }
            },
            mouseleave: function () {
                if (!isZooming) {
                    problemSet.animate({transform: "s1"}, 400);
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
                    if (!isZooming) {
                        BubbleGraph.solutions[this.id].forEach(function (element) {
                            element.animate({transform: "s1.5"}, 250);
                            if (element.type === "text") {
                            element.animate({opacity: 1}, 250);
                            };
                        });
                    }
                },
                mouseleave: function () {
                    if (!isZooming) {
                        BubbleGraph.solutions[this.id].forEach(function (element) {
                            element.animate({transform: "s1"}, 250);
                            if (element.type === "text") {
                                element.animate({opacity: 0}, 250);
                            };
                        });
                    }
                }
            });
        }
    },
    init: function () {
        if (this.raphael) {
            this.raphael.remove();
        }

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







