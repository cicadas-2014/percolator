function Canvas (jQSelector, delegate) {
    // Assign controller object to delegate
    this.delegate = delegate
    this.jQSelector = jQSelector

    // Ready the canvas
    this.readyCanvas();
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height() - 90;
    this.solutionSprites = [];
    this.lines = [];
    this.paper;

    // Grab and parse window.data json object sent by javascript tag in problem#show
    this.solutionData = $.parseJSON(window.data).solutions
    // Draw canvas objects
    this.init();
}

Canvas.prototype.PROBLEM_RADIUS = 75;
Canvas.prototype.SOLUTION_RADIUS = 8;
Canvas.prototype.PROBLEM_COLOR = '#37517F';
Canvas.prototype.SOLUTION_COLOR = '#6DA2FF';
Canvas.prototype.CONNECTION_COLOR = '#666';
Canvas.prototype.ZOOM_MAX = 0.1;

Canvas.prototype.readyCanvas = function() {
    var problem = $.parseJSON(window.data)
    $('#chart-popup #problem-container').removeClass('hidden');
    $('#chart-popup #bubble-container').removeClass('hidden');
    $('#solution-form').hide();
    $('#chart-popup').hide();
    $('#page-title')[0].innerHTML = problem.title;
    $('#synopsis')[0].innerHTML = problem.description;
}

Canvas.prototype.init = function() {
    this.createRaphael();
    this.createProblem();
    this.createSolutions();

    // Tell controller to add event listeners after object creation
    this.delegate.addEventListeners();
}

Canvas.prototype.createRaphael = function() {
    this.paper = new Raphael($(this.jQSelector).get(0), this.windowWidth, this.windowHeight)
}

Canvas.prototype.createProblem = function() {
    var problem = this.paper.circle(this.windowWidth / 2, this.windowHeight / 2, this.PROBLEM_RADIUS).attr({fill: this.PROBLEM_COLOR, stroke: "none"});
    problem.node.id = 'problem';
    this.delegate.addProblemListeners();
}

Canvas.prototype.createSolutions = function() {
    var radians = 0;
    var maxRadians = 2 * Math.PI;
    var step = (2 * Math.PI) / this.solutionData.length;

    for (var i = 0; i < this.solutionData.length; i++) {
        var radius = 125 + (50 * (i % 2))

        var posX = this.windowWidth / 2 + (Math.cos(radians) * radius);
        var posY = this.windowHeight / 2 + (Math.sin(radians) * radius);

        this.createLine(posX, posY)
        this.createSolution(posX, posY, i, this.solutionData[i])
        this.delegate.addSolutionListeners(i);

        radians += step;
        if (radians > maxRadians) {
            radians -= maxRadians;
        }
    }
}

Canvas.prototype.createLine = function(posX, posY) {
    var line = this.paper.path("M" + posX + "," + posY + "L" + this.windowWidth / 2 + "," + this.windowHeight / 2).attr({stroke: this.CONNECTION_COLOR});
    this.lines.push(line);
    // return line;
}

Canvas.prototype.createSolution = function(posX, posY, id) {
    var solution = this.paper.circle(posX, posY, this.SOLUTION_RADIUS).attr({fill: this.SOLUTION_COLOR, stroke: "none"});
    solution.id = id;
    solution.node.id = id;
    this.solutionSprites.push(solution);
    // return solution;
}

Canvas.prototype.addSolutionListeners = function(id) {
    $('#' + id).bind({
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


function SolutionFormModel (jQSelector, delegate) {
    this.jQSelector = jQSelector
    this.delegate = delegate
    this.problemData;
}

function ImprovementFormModel (jQSelector, delegate) {
    this.jQSelector = jQSelector
    this.delegate = delegate
    this.solutionData;
}

function ApplicationController (jQSelector) {
    this.$cntrel = this
    this.jQSelector = jQSelector
    this.canvas = new Canvas("#canvas_container", this.$cntrel)
    this.view = new View(this.jQSelector, this.$cntrel)
    // ***************************
    // ***************************
    this.solutionModel = new FormModel("#solution-form", this.$cntrel);
    this.improvementModel = new ImprovementFormModel("#improvement-form", this.$cntrel);

    // Event Binding
    this.jQSelector.find("#solution-form").on("submit", this.solutionModel.postAjaxForm)
    this.jQSelector.find("#improvement-form").
}

ApplicationController.prototype.addEventListeners = function() {
    $('.chart-popup button#back').unbind('click').click(function () {
        hideChartPopupElements();
    });
    $('.chart-popup button#render-solution-form').unbind('click').click(function () {
        renderSolutionForm();
    })
    $('#new_solution').on("submit", function(e) {
        e.preventDefault();
        $(this.solution_title).val("");
        $(this.solution_description).val("");
        $(this).hide();
    })
}

ApplicationController.prototype.addSolutionListeners = function(id) {
    $('#' + id).bind({
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

ApplicationController.prototype.addProblemListeners = function() {
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
}

$(document).ready(function(){
    if ($("#canvas_container").length) {
        new ApplicationController("#chart-popup")
    }
})

$(document).ready(function () {
    if ($("#canvas_container").length) {
        var problem = $.parseJSON(window.data)
        Constants.WIDTH = $(window).width();
        Constants.HEIGHT = $(window).height() - 90;
        $('#chart-popup #problem-container').removeClass('hidden');
        $('#chart-popup #bubble-container').removeClass('hidden');
        $('#solution-form').hide();
        $('#chart-popup').hide();
        $('#page-title')[0].innerHTML = problem.title;
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
        addEventListeners();
        Canvas.init();
    };
});

var paper;
var isZooming = false;
var solutionNumber;
var isLoaded = false;



jQuery.ajaxSetup({
    'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

// ajax events can't be bound to the original DOM element
$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("")
    $("#solution-form").hide();
    var ajaxRequest = $.ajax({
        type: "POST",
        url: problem_solutions_create_path()
    })
    ajaxRequest.done(function( response ) {
        console.log(response)
        window.data = response
        init();
    })
})


function clearPaper(paper){
    var paperDom = paper.canvas;
    paperDom.parentNode.removeChild(paperDom);
}

// GTG
function addEventListeners() {
        $('#chart-popup button#back').click(function () {
            zoomOut();
            hideChartPopupElements();
            console.log("Firing back")
        });
        $('#chart-popup button#render-solution-form').click(function () {
            renderSolutionForm();
            console.log("Firing form")
        });

        $('#new_solution').on("submit", function (e) {
            e.preventDefault();
            $(this.solution_title).val("");
            $(this.solution_description).val("");
            $(this).hide();
        })

        // $('#new_improvement').on("submit", function(e) {
        //     e.preventDefault();

        // })
}
// GTG

// GTG
function init() {
    if (paper) {
        paper.remove();
    };
    paper = new Raphael($("#canvas_container").get(0), Constants.WIDTH, Constants.HEIGHT);
    createSolutions();
    createProblem();
    addEventListeners();
}
// GTG

// GTG
function createSolutions() {
    var radians = 0;
    var maxRadians = 2 * Math.PI;
    var solutions = $.parseJSON(window.data).solutions
    var step = (2 * Math.PI) / solutions.length;

    for (var i = 0; i < solutions.length; i++) {
        var radius = 125 + (50 * (i % 2))

        var posX = Constants.WIDTH / 2 + (Math.cos(radians) * radius);
        var posY = Constants.HEIGHT / 2 + (Math.sin(radians) * radius);
        Factories.createLine(posX, posY)
        Factories.createSolution(posX, posY, i, solutions[i])
        addSolutionListeners(i);
        radians += step;
        if (radians > maxRadians) {
            radians -= maxRadians;
        }
    }
}
// GTG

// GTG
function createProblem() {
    Factories.createProblem();
    addProblemListeners();
}
// GTG

// GTG
function addSolutionListeners(id) {
    $('#' + id).bind({
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
// GTG

// GTG
function addProblemListeners() {
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
}
// GTG

function hideSolutions(target) {
    for (var i = 0; i < solutionSprites.length; i++) {
        if (solutionSprites[i][0] == target) {
            lines[i].animate({ opacity: 0 }, 2000);
        }
        else {
            solutionSprites[i].animate({ opacity: 0 }, 1000);
            lines[i].animate({ opacity: 0 }, 500);
        }
    }
}

function showSolutions() {
    for (var i = 0; i < solutionSprites.length; i++) {
        solutionSprites[i].animate({ opacity: 1 }, 1000);
        lines[i].animate({ opacity: 1 }, 2000);
    }
}

function showPopup(obj) {
    $('#chart-popup').hide().slideDown(500);
    $('#page-title')[0].innerHTML = $.parseJSON(window.data).solutions[solutionNumber].title
    // SAVE COMMENT
    // ADD $.parseJSON(window.data) as a this.problemData element when OOJSing so
    // these queries can access the correct solution number without making another query
    $('#synopsis')[0].innerHTML = $.parseJSON(window.data).solutions[solutionNumber].description
}

function hideChartPopupElements() {
    $('#chart-popup').show().slideUp(500);
}

function renderSolutionForm() {
    var solutionForm = $('#solution-form').detach();
    $(solutionForm).appendTo("#problem-container");
    $("#solution-form").show();
    $("#new_solution").show();
}

function zoomIn(target) {
    var posX;
    var posY;
    if (target) {//it is a solution
        posX = target.attributes[0].value - ((Constants.WIDTH / 2) * Constants.ZOOM_MAX);
        posY = target.attributes[1].value - ((Constants.HEIGHT / 2) * Constants.ZOOM_MAX);
    }
    else { //it is a problem
        posX = (Constants.WIDTH / 2) - ((Constants.WIDTH / 2) * Constants.ZOOM_MAX);
        posY = (Constants.HEIGHT / 2) - ((Constants.HEIGHT / 2) * Constants.ZOOM_MAX);
    }
    solutionNumber = $(target).attr("id");
    isZooming = true;
    Canvas.zoomIn(posX, posY, zoomInComplete);
    Canvas.hideSolutions();
}

function zoomOut() {
    Canvas.zoomOut(0, 0, zoomOutComplete);
    Canvas.showSolutions();
    isZooming = true;
}

function zoomInComplete()
{
    showPopup()
    isZooming = false;
}

function zoomOutComplete()
{
    isZooming = false;
}

function upvote() {
    $("#upvote").on("click",function(){
        $.ajax({
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            url: "/upvote",
            type: "POST"
        }).done(function(r){
            var response = $.parseJSON(r);
            count = response[0] - response[1];
            $("#count").html(""+count+"");
        });
    });
}

function downvote() {
    $("#downvote").on("click",function(){
        $.ajax({
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            url: "/downvote",
            type: "POST"
        }).done(function(r){
            var response1 = $.parseJSON(r);
             count = response1[0] - response1[1];
            $("#count").html(""+count+"");

        });
    });
}


$(document).ready(function () {
    if ($("#canvas_container").length) {
        var problem = $.parseJSON(window.data)
        Constants.WIDTH = $(window).width();
        Constants.HEIGHT = $(window).height() - 90;
        $('#chart-popup #problem-container').removeClass('hidden');
        $('#chart-popup #bubble-container').removeClass('hidden');
        $('#solution-form').hide();
        $('#chart-popup').hide();
        $('#page-title')[0].innerHTML = problem.title;
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
        addEventListeners();
        Canvas.init();
    };
});

$(window).resize(function () {
    Constants.WIDTH = $(window).width();
    Constants.HEIGHT = $(window).height() - 90;
    Canvas.init();
});

$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("")
    $("#solution-form").hide();
});
