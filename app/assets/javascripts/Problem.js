function Problem(posX, posY, raphael) {
    this.raphael = raphael;
    this.posX = posX;
    this.posY = posY;
    this.sprite = raphael.circle(posX, posY, 125).attr({fill: '#37517F', stroke: "none"});
    this.sprite.node.id = 'problem';
    this.textSprite = undefined;
}

Problem.prototype.createText = function () {
    this.textSprite = this.raphael.text(this.posX, this.posY).attr({opacity: 0});
    //var tempText = this.wrapText($.parseJSON(window.data).title);
    //this.textSprite.attr("text", tempText.substring(1));
    //this.textSprite.attr({ "font-size": 20, "font-family": "Opificio", "fill": "#BAD3FF"});
};

Problem.prototype.wrapText = function (content) {
    var words = content.split(" ");
    var tempText = "";
    for (var i = 0; i < words.length; i++) {
        tempText = this.fitTextToBox(i, tempText, words)
    }
    return tempText;
}

Problem.prototype.fitTextToBox = function (index, tempText, words) {
    var maxWidth = 120;
    this.textSprite.attr("text", tempText + " " + words[index]);
    if (this.textSprite.getBBox().width > maxWidth) {
        tempText += "\n" + words[index];
    } else {
        tempText += " " + words[index];
    }
    return tempText;
}
