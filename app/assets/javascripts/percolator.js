var paper;
var isZoomed = false;

function addEventListeners() {
    $('.chart-popup button#back').unbind('click').click(function () {
        hideChartPopupElements();
    });
    $('.chart-popup button#render-solution-form').unbind('click').click(function () {
        renderSolutionForm();
    })
    $('#solution-form').on("submit", function(e) {
        e.preventDefault();
        console.log("holla")
    })
}

// Tell ajax before it sends that we want js request
jQuery.ajaxSetup({
    'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

// ajax events can't be bound to the original DOM element
$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("");
    $("#solution-form").hide();
})

function init() {
    paper = new Raphael(document.getElementById('canvas_container'), Constants.WIDTH, Constants.HEIGHT);
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
        Factories.createLine(posX, posY);
        Factories.createSolution(posX, posY, i);
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

function showChartPopupElements() {
    $('.chart-popup #problem-container').hide().slideDown(500);
    $('.chart-popup #bubble-container').hide().slideDown(500);
}

function hideChartPopupElements() {
    $('.chart-popup #problem-container').show().slideUp(500);
    $('.chart-popup #bubble-container').show().slideUp(500, zoomOut);
}

// function showProblemElements(visible) {
//     if (visible)
//         $('#problem_detail_left').show();
//     else
//         $('#problem_detail_left').hide();
// }

// function handleProblemClick() {
//     if (isZoomed) {
//         paper.animateViewBox(0, 0, WIDTH, HEIGHT, 2000, '<>', showProblemElements(false))
//     }
//     else {
//         paper.animateViewBox((WIDTH / 2) - ((WIDTH / 2) * ZOOM_MAX), (HEIGHT / 2) - ((HEIGHT / 2) * ZOOM_MAX), WIDTH * ZOOM_MAX, HEIGHT * ZOOM_MAX, 2000, '<>',showProblemElements(true))
function renderSolutionForm() {
    var solutionForm = $('#solution-form').detach();
    console.log("hello");
    console.log(solutionForm)
    $(solutionForm).appendTo("#problem-container");
    $("#solution-form").show();
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
    paper.animateViewBox(posX, posY, modWidth, modHeight, 2000, '<>', showChartPopupElements);
    isZoomed = true;
}

function zoomOut() {
    paper.animateViewBox(0, 0, Constants.WIDTH, Constants.HEIGHT, 2000, '<>', showSolutions);
    isZoomed = false;
}

function handleSolutionMouseEnter() {
    $('.solution').html("DIE");
}

function handleSolutionMouseLeave() {
    $('.solution').html("");
}

function upvote() {
    $("#upvote").on("click",function(){
        $.ajax({
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            url: "/upvote",
            type: "POST"
        }).done(function(r){
            var response = $.parseJSON(r);
            $("#upvote").html("upvote"+response[0]+"");
            $("#downvote").html("downvote"+response[1]+"");
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
            $("#upvote").html("upvote"+response1[0]+"");
            $("#downvote").html("downvote"+response1[1]+"");
        });
    });
}


$(document).ready(function () {
    var problem = $.parseJSON(window.data);
    if ($("#canvas_container").length) {
        Constants.WIDTH = $(window).width();
        Constants.HEIGHT = $(window).height() - 90;
        $('.chart-popup #problem-container').hide();
        $('.chart-popup #bubble-container').hide();
        $('#solution-form').hide();
        init();
        $('#page-title')[0].innerHTML = problem.title;
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
    }
});


$(window).resize(function () {
    Constants.WIDTH = $(window).width();
    Constants.HEIGHT = $(window).height() - 90;
    if (paper) {
        paper.remove();
    }
    init();
});
