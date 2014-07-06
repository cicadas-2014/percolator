var isZooming = false;
var paper;
var isZoomed = false;

function addEventListeners() {
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

// Tell ajax before it sends that we want js request
jQuery.ajaxSetup({
    'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

// ajax events can't be bound to the original DOM element
$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("")
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
    var problem = $.parseJSON(window.data).solutions
    var step = (2 * Math.PI) / problem.length;

    for (var i = 0; i < problem.length; i++) {
        var radius = 125 + (50 * (i % 2))

        var posX = Constants.WIDTH / 2 + (Math.cos(radians) * radius);
        // console.log(posX)
        var posY = Constants.HEIGHT / 2 + (Math.sin(radians) * radius);
        // console.log(posY)
        Factories.createLine(posX, posY);
        Factories.createSolution(posX, posY, i, problem[i]);
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
            if (!isZooming) {
            zoomIn(this);
            }
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
            if (!isZooming) {
            zoomIn();
            hideSolutions()
            }
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
    // isZooming = false;
}

function showSolutions() {
    for (var i = 0; i < solutions.length; i++) {
        solutions[i].animate({ opacity: 1 }, 1000);
        lines[i].animate({ opacity: 1 }, 2000);
    }
    // isZooming = false;
}

function showChartPopupElements() {
    $('.chart-popup #problem-container').hide().slideDown(500);
    $('.chart-popup #bubble-container').hide().slideDown(500);
    isZooming = false;

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
    $("#new_solution").show();
}

function zoomIn(target) {
    isZooming = true;
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
    zoomOutComplete = false;
    paper.animateViewBox(0, 0, Constants.WIDTH, Constants.HEIGHT, 2000, '<>');
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
            console.log(r)
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
        $('.chart-popup #problem-container').hide();
        $('.chart-popup #bubble-container').hide();
        $('#solution-form').hide();
        $('.chart-popup #problem-container').removeClass('hidden');
        $('.chart-popup #bubble-container').removeClass('hidden');
        init();
        $('#page-title')[0].innerHTML = problem.title
        $('#synopsis')[0].innerHTML = problem.description
        upvote();
        downvote();
    }

});


$(window).resize(function () {
    Constants.WIDTH = $(window).width();
    Constants.HEIGHT = $(window).height() - 90;
    if (paper) {
        paper.remove();
    };
    init();
});
