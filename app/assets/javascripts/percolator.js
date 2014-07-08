var solutionNumber;

Percolator = {

    isZooming: false,

    zoomIn: function (target) {

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
        $('#improvement-form').show();
        Percolator.isZooming.isZooming = true;
        BubbleGraph.zoomIn(posX, posY, zoomInComplete);
        BubbleGraph.hideSolutions();
    }
}

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
     $('#improvement-form').unbind('click').click(function () {
        console.log("getting there");
        improvements(solutionNumber);
    });

}
// GTG

function showPopup() {
    $('#chart-popup').hide().slideDown(500);
    BubbleMenu.init($.parseJSON(window.data).solutions);
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
    isZooming = true;
    BubbleGraph.zoomIn(posX, posY, zoomInComplete);
    BubbleGraph.hideSolutions();
}
// GTG
function improvements(solutionNumber) {
        console.log("oobama1")
        $('#improvement-form').show();

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


function zoomOut() {
    BubbleGraph.zoomOut(0, 0, zoomOutComplete);
    BubbleGraph.showSolutions();
    Percolator.isZooming = true;
}

function zoomInComplete()
{
    showPopup();
    Percolator.isZooming = false;
}

function zoomOutComplete()
{
    Percolator.isZooming = false;
}

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

$(document).ready(function () {
    if ($("#canvas_container").length) {
        var problem = $.parseJSON(window.data);
        $('#problem-container').removeClass('hidden');
        $('#bubble-container').removeClass('hidden');
        $('#solution-form').hide();
        $("#improvement-form").hide();
        $('#chart-popup').hide();
        $('#synopsis')[0].innerHTML = problem.description;
        upvote();
        downvote();
        addEventListeners();
        BubbleGraph.init();
    }
    $('.problem_title').keypress(function(){

    if(this.value.length > 87){
        return false;
    }
    if(this.value.length === 87){
        $("#too_many_chars").html("Max characters for title: 88").css({"margin-left": "auto", "margin-right": "auto", "color": "red"});
    };
});
});

$(window).resize(function () {
    Canvas.init();
});

$(document).on("ajax:complete", function(event, xhr){
    console.log("I'm in the ajax complete")
    console.log(xhr)
    if (xhr.readyState === 4 && xhr.status === 200) {
        $("target").innerHTML = xhr.responseText
        var parsedText = $.parseJSON(xhr.responseText)
        if (parsedText.saved === true) {
            Comments.showCommentMessage(true)
            $(".comment-form").append(Comments.commentHTML(parsedText.commentable_type, parsedText.commentable_id,
                parsedText.username))
        } else if (parsedText.saved === false) {
            Comments.showCommentMessage(false)
        } else {
            $("#solution-form").find("input[type=text], textarea").val("");
            $("#solution-form").hide();
            $("#improvement-form").find("input[type=text], textarea").val("");
            $("#improvement-form").hide();
        }
        console.log($.parseJSON(xhr.responseText))
    }
    console.log("I'm in the ajax complete")
});

$(window).resize(function () {
    if ($("#canvas_container").length) {
        BubbleGraph.init();
    }
    if ($("#bubble-container").length) {
        BubbleMenu.init(BubbleMenu.data);
    }
});
