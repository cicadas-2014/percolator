
// GTG
var paper;
var isZooming = false;
var solutionNumber;
var isLoaded = false;
// GTG



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
        // window.data = response
        init();
    })
})


function clearPaper(paper){
    var paperDom = paper.canvas;
    paperDom.parentNode.removeChild(paperDom);
}

// GTG
function addEventListeners() {
        $('#chart-popup button#back').unbind('click').click(function () {
            zoomOut();
            hideChartPopupElements();
            console.log("Firing back")
        });
        $('#chart-popup button#render-solution-form').unbind('click').click(function () {
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
// function addSolutionListeners(id) {
//     $('#' + id).bind({
//         click: function () {
//             if (!isZooming) {
//                 zoomIn(this);
//             }
//         },
//         mouseenter: function () {
//         },
//         mouseleave: function () {
//         }
//     });
// }
// // GTG

// // GTG
// function addProblemListeners() {
//     $('#problem').bind({
//         click: function () {
//             if (!isZooming) {
//                 zoomIn();
//                 hideSolutions()
//             }
//         },
//         mouseenter: function () {
//         },
//         mouseleave: function () {
//         }
//     });
// }
// GTG

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
// GTG

// GTG
function showSolutions() {
    for (var i = 0; i < solutionSprites.length; i++) {
        solutionSprites[i].animate({ opacity: 1 }, 1000);
        lines[i].animate({ opacity: 1 }, 2000);
    }
}
// GTG

function showPopup(obj) {
    $('#chart-popup').hide().slideDown(500);
    console.log(solutionNumber)
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

// Canvas.prototype.zoomIn = function(target) {
//     var posX;
//     var posY;
//     if (target) {//it is a solution
//         posX = target.attributes[0].value - ((this.windowWidth / 2) * this.ZOOM_MAX);
//         posY = target.attributes[1].value - ((this.windowHeight / 2) * this.ZOOM_MAX);
//         $("span.upvote").attr("id", "upvote")
//         $("span.downvote").attr("id", "downvote")
//     }
//     else { //it is a problem
//         posX = (this.windowWidth / 2) - ((this.windowWidth / 2) * this.ZOOM_MAX);
//         posY = (this.windowHeight / 2) - ((this.windowHeight / 2) * this.ZOOM_MAX);
//         $("span.upvote").attr("id", "problem_upvote")
//         $("span.downvote").attr("id", "problem_downvote")
//     }
//     solutionNumber = $(target).attr("id");
//     this.isZooming = true;
//     this.paper.animateViewBox(0, 0, this.windowWidth * this.ZOOM_MAX, this.windowHeight * this.ZOOM_MAX, 2000, '<>', zoomOutComplete)
//     Canvas.zoomIn(posX, posY, zoomInComplete);
//     this.$el.hideSolutions();
// }

// Canvas.prototype.zoomOut = function() {
//     this.paper.animateViewBox(0, 0, this.windowWidth, this.windowHeight, 2000, '<>', zoomOutComplete)
//     // Canvas.zoomOut(0, 0, zoomOutComplete);
//     this.$el.showSolutions();
//     this.isZooming = true;
// }

// GTG
function zoomIn(target) {
    var posX;
    var posY;
    if (target) {//it is a solution
        posX = target.attributes[0].value - ((Constants.WIDTH / 2) * Constants.ZOOM_MAX);
        posY = target.attributes[1].value - ((Constants.HEIGHT / 2) * Constants.ZOOM_MAX);
        $("span.upvote").attr("id", "upvote")
        $("span.downvote").attr("id", "downvote")
    solutionNumber = $(target).attr("id");
        improvements(solutionNumber);
    }
    else { //it is a problem
        posX = (Constants.WIDTH / 2) - ((Constants.WIDTH / 2) * Constants.ZOOM_MAX);
        posY = (Constants.HEIGHT / 2) - ((Constants.HEIGHT / 2) * Constants.ZOOM_MAX);
        $("span.upvote").attr("id", "problem_upvote")
        $("span.downvote").attr("id", "problem_downvote")
    }

     $('#improvement-form').show();

    console.log($(target).closest('span'))

    // if (typeof($(target).attr("id")) == 'undefined' ) {

    // } else {

    // }
    isZooming = true;
    Canvas.zoomIn(posX, posY, zoomInComplete);
    Canvas.hideSolutions();
}
// GTG
 function improvements(solutionNumber) {
    id = $.parseJSON(window.data).solutions[solutionNumber].id;
    $('.Improve').on("click",function(e){
        e.preventDefault();
        var args = {};
        args.title = $("#improvement_title").val();
        args.description = $("#improvement_description").val();
    $.ajax({
        type: "post",
        url: "/solutions/"+id+"/improvements/create",
        data: args
    });

 });

}


function comments() {
    id = $.parseJSON(window.data).solutions[solutionNumber].id;
    $('#submit_comment').on("click",function(e){
        e.preventDefault();
        var comments = {};
        args.description = $("#improvement_description").val();
        $.ajax({
            type: "post",
            url: "/solutions/"+id+"/improvements/create",
            data: args
        });

    });
}


// GTG
function zoomOut() {
    Canvas.zoomOut(0, 0, zoomOutComplete);
    Canvas.showSolutions();
    isZooming = true;3
}
// GTG

function zoomInComplete()
{
    showPopup()
    isZooming = false;
}

function zoomOutComplete()
{
    isZooming = false;
}

// GTG
function upvote() {
    $("#upvote").on("click",function(e){
        $.ajax({
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            url: "/solution_upvote",
            type: "POST",
            data: {solution_number: solutionNumber.toString()}
        }).done(function(r){
            var response = $.parseJSON(r);
            count = response[0] - response[1];
            $("#count").html(""+count+"");
        });
    });
}
// GTG

// GTG
function downvote() {
    $("#downvote").on("click",function(){
        $.ajax({
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            url: "/solution_downvote",
            type: "POST",
            data: {solution_number: solutionNumber.toString()}
        }).done(function(r){
            var response1 = $.parseJSON(r);
             count = response1[0] - response1[1];
            $("#count").html(""+count+"");

        });
    });
}
// GTG

// function ajaxUpvote() {
//     $.ajax({
//         beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
//         url: "/solution_upvote",
//         type: "POST"
//     }).done(function(r){
//         var response = $.parseJSON(r);
//         count = response[0] - response[1];
//         $("#count").html(""+count+"");
//     });
// }

// function ajaxDownvote() {

// }

// GTG
$(document).ready(function () {
    if ($("#canvas_container").length) {
        var problem = $.parseJSON(window.data)
        Constants.WIDTH = $(window).width();
        Constants.HEIGHT = $(window).height() - 90;
        $('#chart-popup #problem-container').removeClass('hidden');
        $('#chart-popup #bubble-container').removeClass('hidden');
        $('#solution-form').hide();
        $("#improvement-form").hide();
        $('#chart-popup').hide();
        $('#page-title')[0].innerHTML = problem.title;
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
        addEventListeners();
        Canvas.init();
    };
});
// GTG

$(window).resize(function () {
    Constants.WIDTH = $(window).width();
    Constants.HEIGHT = $(window).height() - 90;
    Canvas.init();
});

$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("")
    // $("#solution-form").hide();
});
