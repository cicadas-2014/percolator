var paper;
var isZoomed = false;

function addEventListeners() {
    $('.chart-popup button').click(function () {
        hideChartPopupElements();
    });
}
function init() {
    paper = new Raphael(document.getElementById('canvas_container'), Constants.WIDTH, Constants.HEIGHT);
    createSolutions();
    createProblem();
    addEventListeners();
}

function createSolutions() {
    var radians = 0;
    var maxRadians = 2 * Math.PI;
    var step = (2 * Math.PI) / data.problem.solutions.length;

    for (var i = 0; i < data.problem.solutions.length; i++) {
        var radius = 125 + (50 * (i % 2))

        var posX = Constants.WIDTH / 2 + (Math.cos(radians) * radius);
        var posY = Constants.HEIGHT / 2 + (Math.sin(radians) * radius);
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
            zoomIn(this);
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
            zoomIn();
            hideSolutions()
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
        if (solutions[i][0] == target) {
            lines[i].animate({ opacity: 0 }, 2000);
        }
        else {
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

function showChartPopupElements() {
    $('.chart-popup #problem-container').hide().slideDown(500);
    $('.chart-popup #bubble-container').hide().slideDown(500);
}

function hideChartPopupElements() {
    $('.chart-popup #problem-container').show().slideUp(500);
    $('.chart-popup #bubble-container').show().slideUp(500, zoomOut);
}

function zoomIn(target) {
    var posX;
    var posY;
    var modWidth = Constants.WIDTH * Constants.ZOOM_MAX;
    var modHeight = Constants.HEIGHT * Constants.ZOOM_MAX;
    if (target) {
        posX = target.attributes[0].value - ((Constants.WIDTH / 2) * Constants.ZOOM_MAX);
        posY = target.attributes[1].value - ((Constants.HEIGHT / 2) * Constants.ZOOM_MAX);
    }
    else {
        posX = (Constants.WIDTH / 2) - ((Constants.WIDTH / 2) * Constants.ZOOM_MAX);
        posY = (Constants.HEIGHT / 2) - ((Constants.HEIGHT / 2) * Constants.ZOOM_MAX);
    }
    paper.animateViewBox(posX, posY, modWidth, modHeight, 2000, '<>', showChartPopupElements)
    isZoomed = true;
}

function zoomOut() {
    paper.animateViewBox(0, 0, Constants.WIDTH, Constants.HEIGHT, 2000, '<>');
    isZoomed = false;
}

function handleSolutionMouseEnter() {
    $('.solution').html("DIE");
}

function handleSolutionMouseLeave() {
    $('.solution').html("");
}

$(document).ready(function () {
    Constants.WIDTH = $(window).width();
    Constants.HEIGHT = $(window).height() - 90;
    $('.chart-popup #problem-container').hide();
    $('.chart-popup #bubble-container').hide();
    var foo = problem
    var problemData = $.parseJSON(foo);

    $('#page-title')[0].innerHTML = problemData.title;
    console.log(problemData);
    init();
});


$(window).resize(function () {
    Constants.WIDTH = $(window).width();
    Constants.HEIGHT = $(window).height() - 90;
    paper.remove();
    init();
});
