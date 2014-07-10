BubbleGraph = {

    ZOOM_MAX: 0.1,
    width: undefined,
    height: undefined,
    raphael: undefined,
    RADIUS: 220,
    CONNECTION_COLOR: '#666',
    solutions: [],
    lines: [],
    keyContents: [],
    toggle: true,

    init: function () {
        if(this.raphael)
        {
            this.raphael.remove();
            solutions = [];
            lines= [];
        }

        this.width = $(window).width();
        this.height = $(window).height() - 90;
        this.raphael = new Raphael($("#canvas_container").get(0), this.width, this.height);

        this.createSolutions();
        this.createProblem();
        this.createKeyIcon();
    },

    createProblem: function () {
        this.problem = new Problem(this.width / 2, this.height / 2, this.raphael);
        this.problem.addEventListeners();
    },

    createKeyIcon: function() {
        var icon = this.raphael.image("/images/question-mark.png", 5, 0, 30, 30);
        icon.click(function(){
            console.log(BubbleGraph.toggle);
            BubbleGraph.toggleKey();
        })
    },

    toggleKey: function () {
        if (!BubbleGraph.toggle){
            BubbleGraph.toggle = true;
            for (var i=0; i < BubbleGraph.keyContents.length; i++){
                BubbleGraph.keyContents[i].remove();
            }
        } else {
            BubbleGraph.toggle = false;
            BubbleGraph.createKey();
        }
    },

    createKey: function() {
        var frame = this.raphael.rect(5, 30, 275, 180, 10).attr({"fill": "white", "stroke": "none"});
        var gradient = this.raphael.rect(10, 35, 20, 165).attr({"fill": "90-#f00:5-#0f0:95"});
        var thumb_up = this.raphael.image("/images/thumbs-up.png", 35, 35, 30, 30);
        var thumb_down = this.raphael.image("/images/thumbs-down.png", 30, 175, 30, 30);
        var text = this.raphael.text(160, 115, "The bubble in the center is the\ncentral problem, and the outer\nbubbles represent possible\nsolutions. The colored borders\nequate to the user feedback, and the\nsize of the solution bubbles represent\nthe total number of votes for that\nsolution. Click on a problem or\nsolution to view details and\nparticipate in the discussion.").attr({ "font-size": 14, "font-family": "Opificio"});
        BubbleGraph.keyContents.push(frame, gradient, thumb_up, thumb_down, text);
    },

    createSolutions: function () {
        var radians = 0;
        var maxRadians = 2 * Math.PI;
        var solutions = $.parseJSON(window.data).solutions
        var step = (2 * Math.PI) / solutions.length;
        for (var i = 0; i < solutions.length; i++) {
            var radius = this.RADIUS + (50 * (i % 2));
            var posX = this.width / 2 + (Math.cos(radians) * radius);
            var posY = this.height / 2 + (Math.sin(radians) * radius);
            this.createLine(posX, posY);
            var solution = new Solution(posX, posY, i, this.raphael);
            solution.addEventListeners()
            BubbleGraph.solutions.push(solution);
            radians += step;
            if (radians > maxRadians) {
                radians -= maxRadians;
            }
        }
    },

    createLine: function (posX, posY) {
        var line = this.raphael.path("M" + posX + "," + posY + "L" + this.width / 2 + "," + this.height / 2).attr({stroke: this.CONNECTION_COLOR});
        this.lines.push(line);
        return line;
    },



    hideSolutions: function (target) {
        for (var i = 0; i < BubbleGraph.solutions.length; i++) {
            if (BubbleGraph.solutions[i] == target) {
                BubbleGraph.lines[i].animate({ opacity: 0 }, 2000);
            }
            else {
                BubbleGraph.solutions[i].animate({ opacity: 0 }, 1000);
                BubbleGraph.lines[i].animate({ opacity: 0 }, 500);
            }
        }
    },

    showSolutions: function () {
        for (var i = 0; i < BubbleGraph.solutions.length; i++) {
            BubbleGraph.solutions[i].animate({ opacity: 1 }, 1000);
            BubbleGraph.lines[i].animate({ opacity: 1 }, 2000);
        }
    },

    zoomIn: function (x, y, callback) {
        this.raphael.animateViewBox(x, y, this.width * this.ZOOM_MAX, this.height * this.ZOOM_MAX, 2000, '<>', callback);
    },

    zoomOut: function (x, y, callback) {
        this.raphael.animateViewBox(x, y, this.width, this.height, 2000, '<>', callback);
        BubbleGraph.problem.textSprite.animate({opacity: 1}, 1500);
    }
};
