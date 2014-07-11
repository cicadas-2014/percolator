Comments = {
    comments: [],

    divHTML: function(){
        var div = '<div class="comment-form bubble frame" id="used_and_abused"></div>'
        return div
    },

    formHTML: function(type, typeId){
        var form = '<form accept-charset="UTF-8" class="comment_form" action="/' + type + '/comments/' + typeId +
        '/create" data-remote="true" id="new_comment_' + type + '" method="post">' +
        '<div style="display:none"><input name="utf8" type="hidden" value="✓"></div>' +
        '<label for="comment_description">Comment: </label><br> <textarea id="comment_description"' +
        'name="comment_description"></textarea><br>' +
        '<input name="commit" type="submit" value="Comment"> </form>'
        return form
    },

    commentHTML: function(type, description, user){
        // took out commentId---wasn't sure if it was necessary
        var comment =   '<div class="point"></div>' +
                        '<div class="' + type + '-comment _comment_ bubble-content">' +
                        '<div class="comment-user">' + user + '</div>' +
                        '<div class="comment-description">' + description + '</div>'

        return comment
    },

    appendDiv: function(type, typeId){
        if ($(".comment-form").length) {
            $(".comment-form").empty();
            this.appendCommentBox(type, typeId);
        } else {
            $("#detail-window-problem-container").append(this.divHTML())
            this.appendCommentBox(type, typeId);
        }
    },

    appendCommentBox: function(type, typeId){
        $(".comment-form").append(this.formHTML(type, typeId))
        this.queryCommentDatabase(type, typeId)
    },

    queryCommentDatabase: function(commentCategory, typeId){
        var comments = [];
        $.ajax({
            type: "GET",
            url: "/" + commentCategory + "/comments/" + typeId
        }).done(function(response){
            for(i = 0; i < response[commentCategory].length; i++) {
                var username = response[commentCategory][i].username
                var type = response[commentCategory][i].description
                comments.push(Comments.commentHTML(commentCategory, type, username))
            }
        $(".comment-form").append(comments)

        })
    },

    // showCommentMessage: function(validity){
    //     if (validity === true) {
    //         $(".comment-form").before('<div class="comment-save-pass">Comment Saved!!</div>')
    //     } else {
    //         $(".comment-form").before('<div class="comment-save-fail">Comment failed to save... ):</div>')
    //     }
    // }
}
