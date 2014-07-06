Factories = {

    createProblem: function () {
        var problem = paper.circle(Constants.WIDTH / 2, Constants.HEIGHT / 2, PROBLEM_RADIUS).attr({fill: PROBLEM_COLOR, stroke: "none"});
        problem.node.id = 'problem';
    },

    createSolution: function (posX, posY, id) {
        var solution = paper.circle(posX, posY, SOLUTION_RADIUS).attr({fill: SOLUTION_COLOR, stroke: "none"});
        solution.id = id;
        solution.node.id = id;
        solutionSprites.push(solution);
        return solution;
    },

    createLine: function (posX, posY) {
        var line = paper.path("M" + posX + "," + posY + "L" + Constants.WIDTH / 2 + "," + Constants.HEIGHT / 2).attr({stroke: CONNECTION_COLOR});
        lines.push(line);
        return line;
    }
}

