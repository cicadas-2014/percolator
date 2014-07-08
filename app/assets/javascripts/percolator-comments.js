Comments = {
    comments: [],

    divHTML: function(){
        var div = '<div class="comment-form" id="used_and_abused"></div>'
        return div
    },

    formHTML: function(type, typeId){
        var form = '<form accept-charset="UTF-8" action="/' + type + '/' + typeId +'/comments/create"' +
                    ' class="new_' + type + '" data-remote="true" id="new_' + type + '"method="post">' +
                    '<input class="comment-box" type="textarea"><br>' +
                    '<input class="' + type + '" type="submit" value="Comment"></form>'
        return form
    },

    commentHTML: function(type, description, user){
        // took out commentId---wasn't sure if it was necessary
        var comment = '<div class="' + type + '-comment _comment_">' +
                        '<div class="comment-description">' + description + '</div>' +
                        '<div class="comment-user">' + user + '</div>'
        return comment
    },

    appendDiv: function(type, typeId){
        // *****THIS*****
        if ($(".comment-form").length) {
            $(".comment-form").empty();
            this.appendCommentBox(type, typeId);
        } else {
            $("#problem-container").append(this.divHTML())
            this.appendCommentBox(type, typeId);
        }
    },

    appendCommentBox: function(type, typeId){
        console.log("made it in the appendcommentbox")
        $(".comment-form").append(this.formHTML(type, typeId))
        // MARIO ADD IT AFTER THIS LINE
        // MARIO ADD IT AFTER THIS LINE
        // MARIO ADD IT AFTER THIS LINE
        // MARIO ADD IT AFTER THIS LINE
        this.queryCommentDatabase(type, typeId)

        console.log("made it to the end of appendcommentbox")
    },

    queryCommentDatabase: function(commentCategory, typeId){
        console.log(commentCategory)
        var comments = [];
        console.log("I'm inside the queryCommentDatabase")
        console.log(this)
        console.log("I'm inside the queryCommentDatabase")
        console.log("I'm before this.$el is defined")
        this.$el = $(this)
        console.log(this.$el)
        console.log("I'm aftter this.$el is defined")
        $.ajax({
            type: "GET",
            url: "/" + commentCategory + "/comments/" + typeId
        }).done(function(response){
            console.log("ajax was successful")
            console.log(response[commentCategory].problems)
            for(i = 0; i < response[commentCategory].problems.length; i++) {
                // var user = response[commentCategory][i].user_id
                var username = response[commentCategory].problems[i].username
                var type = response[commentCategory].problems[i].description
                comments.push(Comments.commentHTML(commentCategory, type, username))
            }
        $(".comment-form").append(comments)
        })
    },

    init: function(){

    }


  //return form html
  //return
  //ajaxgrabcomments("solution"/"improvement"/"problem")
  //hide and show comments based on S/I/P
  //append comments form
  //append comments
  //append
}

$(document).ready(function(){
  //Event listeners

  // $("")
})
