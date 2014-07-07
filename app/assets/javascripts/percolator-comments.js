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
                    '<input type="submit" value="Comment"></form>'
        return form
    },

    commentHTML: function(type, description, user){
        // took out commentId---wasn't sure if it was necessary
        var comment = '<div class="' + type + '-comment">' +
                        '<div class="comment-description">' + description + '</div>' +
                        '<div class="comment-user">' + user + '</div>'
        return comment
    },

    appendDiv: function(type, typeId){
        // *****THIS*****
        if ($("#comment-form").length) {
            $("#comment-form").empty();
            this.appendCommentBox(type, typeId);
        } else {
            $("#problem-container").append(this.divHTML())
            this.appendCommentBox(type, typeId);
        }
    },

    appendCommentBox: function(type, typeId){
        $("#comment-form").append(this.formHTML(type, typeId))
        $("#comment-form").append(this.queryCommentDatabase(type, typeId))
    },

    queryCommentDatabase: function(commentCategory, typeId){
        var comments = [];
        this.$el = this
        $.ajax({
            type: "GET",
            url: "/" + commentCategory + "/comments/" + typeId + "/create"
        }).done(function(response){
            for(i = 0; i < response[commentCategory].length; i++) {
                // var user = response[commentCategory][i].user_id
                var username = response[commentCategory][i].username
                var type = response[commentCategory][i].description
                comments << this.$el.commentHTML(commentCategory, type, user)
            }
        })
        return comments
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
