// function Canvas () {
//     this.windowWidth = $(window).width();
//     this.windowHeight = $(window).height() - 90;
//     this.paper = new Raphael($("#canvas_container").get(0), this.windowWidth, this.windowHeight)
//     this.data = $.parseJSON(window.data).solutions
// }

// Canvas.prototype.

// var PROBLEM_RADIUS = 75;
// var SOLUTION_RADIUS = 8;
// var PROBLEM_COLOR = '#37517F';
// var SOLUTION_COLOR = '#6DA2FF';
// var CONNECTION_COLOR = '#666';
// var solutionSprites = [];
// var lines = [];

// Canvas.prototype.createSolutions = function() {
//     var radians = 0;
//     var maxRadians = 2 * Math.PI;
//     var step = (2 * Math.PI) / this.data.length;

//     for (var i = 0; i < this.data.length; i++) {
//         var radius = 125 + (50 * (i % 2))

//         var posX = this.windowWidth / 2 + (Math.cos(radians) * radius);
//         var posY = this.windowHeight / 2 + (Math.sin(radians) * radius);
//         Factories.createLine(posX, posY)
//         Factories.createSolution(posX, posY, i, this.data[i])
//         addSolutionListeners(i);
//         radians += step;
//         if (radians > maxRadians) {
//             radians -= maxRadians;
//         }
//     }
// }

// Canvas.prototype.createLine = function (posX, posY, id) {
//     var solution = this.paper.circle(posX, posY, SOLUTION_RADIUS).attr({fill: SOLUTION_COLOR, stroke: "none"});
//     solution.id = id;
//     solution.node.id = id;
//     solutionSprites.push(solution);
//     return solution;
// }

// Canvas.prototype.createProblem = function() {

// }

// Canvas.prototype.addEventListeners = function() {
//     $('.chart-popup button#back').unbind('click').click(function () {
//         hideChartPopupElements();
//     });
//     $('.chart-popup button#render-solution-form').unbind('click').click(function () {
//         renderSolutionForm();
//     })
//     $('#new_solution').on("submit", function(e) {
//         e.preventDefault();
//         $(this.solution_title).val("");
//         $(this.solution_description).val("");
//         $(this).hide();
//     })
// }

// function View () {

// }

// View.prototype.initializeViews = function () {

// }

// function Disqus() {

// }

// Disqus.prototype.configure () {

// }

var paper;
var isZooming = false;
var solutionNumber;
var isLoaded = false;

function addEventListeners() {

        console.log("Adding lsteners")
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
}

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

function init() {
    if (paper) {
        paper.remove();
    };
    paper = new Raphael($("#canvas_container").get(0), Constants.WIDTH, Constants.HEIGHT);
    createSolutions();
    createProblem();
    addEventListeners();
}

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

function createProblem() {
    Factories.createProblem();
    addProblemListeners();
}

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
