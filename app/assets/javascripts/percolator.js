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
        Canvas.init();
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
    Menu.init();
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
        posX = target.attributes[0].value - ((Canvas.WIDTH / 2) * Canvas.ZOOM_MAX);
        posY = target.attributes[1].value - ((Canvas.HEIGHT / 2) * Canvas.ZOOM_MAX);
        $("span.upvote").attr("id", "upvote")
        $("span.downvote").attr("id", "downvote")
    solutionNumber = $(target).attr("id");
        improvements(solutionNumber);

    }
    else {// if the click target is the problem
        posX = (Canvas.WIDTH / 2) - ((Canvas.WIDTH / 2) * Canvas.ZOOM_MAX);
        posY = (Canvas.HEIGHT / 2) - ((Canvas.HEIGHT / 2) * Canvas.ZOOM_MAX);
        $("span.upvote").attr("id", "problem_upvote");
        $("span.downvote").attr("id", "problem_downvote");
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
    problemText.animate({transform: "s1"}, 400);
    Canvas.zoomOut(0, 0, zoomOutComplete);
    Canvas.showSolutions();
    isZooming = true;3
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
        $("#improvement-form").hide();
        $('#chart-popup').hide();
        $('#page-title')[0].innerHTML = problem.title;
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
        addEventListeners();
        Canvas.init();
    }
});

$(window).resize(function () {
    Canvas.init();
});

$(document).on("ajax:success", "#solution-form", function(){

    $("#solution-form").find("input[type=text], textarea").val("");
    $("#solution-form").hide();

});
