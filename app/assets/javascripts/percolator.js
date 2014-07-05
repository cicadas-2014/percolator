var paper;
var isZoomed = false;

function init() {
    paper = new Raphael(document.getElementById('canvas_container'), WIDTH, HEIGHT);
    createSolutions();
    createProblem();
}

function createSolutions() {
    var radians = 0;
    var maxRadians = 2 * Math.PI;
    var step = (2 * Math.PI) / data.problem.solutions.length;

    for (var i = 0; i < data.problem.solutions.length; i++) {
        var radius = 125 + (50 * (i % 2))

        var posX = WIDTH / 2 + (Math.cos(radians) * radius);
        var posY = HEIGHT / 2 + (Math.sin(radians) * radius);
        Factories.createLine(posX, posY);
        Factories.createSolution(posX, posY, i, data.problem.solutions[i].votes);
        addSolutionListeners('solution_' + i);
        radians += step;
        if (radians > maxRadians) {
            radians -= maxRadians;
        }
    }
}

function createProblem() {
    Factories.createProblem();
    addProblemListeners();
}

function addSolutionListeners(id) {
    $('#' + id).bind({
        click: function () {
            handleSolutionClick(this);
        },
        mouseenter: function () {
            handleSolutionMouseEnter(this);
        },
        mouseleave: function () {
            handleSolutionMouseLeave();
        }
    });
}

function addProblemListeners() {
    $('#problem').bind({
        click: function () {
            handleProblemClick(this);
        },
        mouseenter: function () {
            handleSolutionMouseEnter(this);
        },
        mouseleave: function () {
            handleSolutionMouseLeave();
        }
    });
}

function hideSolutions(target) {
    for (var i = 0; i < solutions.length; i++) {
        if (solutions[i][0] != target) {
            solutions[i].animate({ opacity: 0 }, 1000);
            lines[i].animate({ opacity: 0 }, 500);
        }
    }
}

function showSolutions() {
    for (var i = 0; i < solutions.length; i++) {
        solutions[i].animate({ opacity: 1 }, 1000);
        lines[i].animate({ opacity: 1 }, 2000);
    }
}

function handleSolutionClick(target) {
    if (isZoomed) {
        paper.animateViewBox(0, 0, WIDTH, HEIGHT, 2000, '<>')
        showSolutions(target)
    }
    else {
        paper.animateViewBox(target.attributes[0].value - ((WIDTH / 2) * ZOOM_MAX), target.attributes[1].value - ((HEIGHT / 2) * ZOOM_MAX), WIDTH * ZOOM_MAX, HEIGHT * ZOOM_MAX, 2000, '<>')
        hideSolutions(target)
    }
    isZoomed = !isZoomed;
}

function showProblemElements(visible) {
    if (visible)
        $('#problem_detail_left').show();
    else
        $('#problem_detail_left').hide();
}

function handleProblemClick() {
    if (isZoomed) {
        paper.animateViewBox(0, 0, WIDTH, HEIGHT, 2000, '<>', showProblemElements(false))
    }
    else {
        paper.animateViewBox((WIDTH / 2) - ((WIDTH / 2) * ZOOM_MAX), (HEIGHT / 2) - ((HEIGHT / 2) * ZOOM_MAX), WIDTH * ZOOM_MAX, HEIGHT * ZOOM_MAX, 2000, '<>',showProblemElements(true))
    }
    isZoomed = !isZoomed;
}

function handleSolutionMouseEnter(target) {
    $('.solution').html("DIE");
}

function handleSolutionMouseLeave(target) {
    $('.solution').html("");
}

$(document).ready(function () {
    console.log("(document).ready");
    $('#problem_detail_left').hide();
    init();
});


$(window).resize(function () {
    WIDTH = $(window).width();
    HEIGHT = $(window).height() - 100;
    paper.remove();
    init();
});
