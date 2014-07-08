var isZooming = false;
var solutionNumber;
var isLoaded = false;
// GTG

jQuery.ajaxSetup({
    'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
})

$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("");
    $("#solution-form").hide();
    var ajaxRequest = $.ajax({
        type: "POST",
        url: problem_solutions_create_path()
    });
    ajaxRequest.done(function( response ) {
        console.log(response);
        BubbleGraph.init();
    })
});

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
    });
}
// GTG

function showPopup() {
    $('#chart-popup').hide().slideDown(500);
    //$('#page-title')[0].innerHTML = $.parseJSON(window.data).solutions[solutionNumber].title
    // SAVE COMMENT
    // ADD $.parseJSON(window.data) as a this.problemData element when OOJSing so
    // these queries can access the correct solution number without making another query
    //$('#synopsis')[0].innerHTML = $.parseJSON(window.data).solutions[solutionNumber].description
    sendIdAjax();
    BubbleMenu.init($.parseJSON(window.data).solutions);
}

function sendIdAjax() {
    $.ajax({
        type: "POST",
        url: '/improvements',
        data: solutionNumber
    });
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
    if (target) {
        posX = target.attributes[0].value - ((BubbleGraph.width / 2) * BubbleGraph.ZOOM_MAX);
        posY = target.attributes[1].value - ((BubbleGraph.height / 2) * BubbleGraph.ZOOM_MAX);
        $("span.upvote").attr("id", "upvote");
        $("span.downvote").attr("id", "downvote");
        solutionNumber = $(target).attr("id");
    }
    else {
        posX = (BubbleGraph.width / 2) - ((BubbleGraph.width / 2) * BubbleGraph.ZOOM_MAX);
        posY = (BubbleGraph.height / 2) - ((BubbleGraph.height / 2) * BubbleGraph.ZOOM_MAX);
        $("span.upvote").attr("id", "problem_upvote");
        $("span.downvote").attr("id", "problem_downvote");
    }
    solutionNumber = $(target).attr("id");
    console.log(solutionNumber);
    isZooming = true;
    BubbleGraph.zoomIn(posX, posY, zoomInComplete);
    BubbleGraph.hideSolutions();
}
// GTG

// GTG
function zoomOut() {
    problemSet.animate({transform: "s1"}, 400);
    BubbleGraph.zoomOut(0, 0, zoomOutComplete);
    BubbleGraph.showSolutions();
    isZooming = true;
}
// GTG

function zoomInComplete()
{
    showPopup();
    isZooming = false;
}

function zoomOutComplete()
{
    isZooming = false;
}
// function improvement() {
//     $()
// }


// GTG
function upvote() {
    $("#upvote").on("click",function(){
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
            var count = response1[0] - response1[1];
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
        var problem = $.parseJSON(window.data);
        $('#problem-container').removeClass('hidden');
        $('#bubble-container').removeClass('hidden');
        $('#solution-form').hide();
        $('#chart-popup').hide();
        $('#page-title')[0].innerHTML = problem.title;
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
        addEventListeners();
        BubbleGraph.init();
    }
});

$(document).on("ajax:success", "#solution-form", function(){
    $("#solution-form").find("input[type=text], textarea").val("");
    $("#solution-form").hide();
});

$(window).resize(function () {
    if ($("#canvas_container").length) {
        BubbleGraph.init();
    }
    if ($("#bubble-container").length) {
        BubbleMenu.init(BubbleMenu.data);
    }
});
