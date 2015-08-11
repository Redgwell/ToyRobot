'use strict';

angular.module('toyRobotApp')
  .directive('tableTop', function () {
    return {
      templateUrl: 'app/tableTop/tableTop.html',
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel'
      },
      link: function (scope, element) {

        // grid size set up
        var bw = 400;
        var bh = 400;
        var xGridCells = 5;
        var yGridCells = 5;
        var gridCellWidth = bw / xGridCells;
        var gridCellHeight = bh / yGridCells;
        var TO_RADIANS = Math.PI / 180;

        // draws the board with the grid lines
        function drawBoard(){
          var container = element.find('.table-top-canvas-container');
          var canvas = $('<canvas/>').attr({width: bw + 1, height: bh + 1}).appendTo(container);
          var ctx = canvas.get(0).getContext('2d');

          for (var x = 0; x <= bw; x += gridCellWidth) {
              ctx.moveTo(0.5 + x, 0);
              ctx.lineTo(0.5 + x, bh);
          }

          for (var y = 0; y <= bh; y += gridCellHeight) {
              ctx.moveTo(0, 0.5 + y);
              ctx.lineTo(bw, 0.5 + y);
          }

          ctx.strokeStyle = 'black';
          ctx.stroke();

          canvas = $('<canvas class="overlay"/>').attr({width: bw + 1, height: bh + 1}).appendTo(container);
          return canvas.get(0).getContext('2d');

          //return ctx;
        }

        function directionToDegrees(direction) {
          switch (direction) {
            case 'NORTH':
              return 90;
            case 'SOUTH':
              return 270;
            case 'EAST':
              return 0;
            case 'WEST':
              return 180;
            default:
              return 0;
          }
        }

        function setRobotPosition() {
          var model = scope.model;
          if (!model || isNaN(parseInt(model.x)) || isNaN(parseInt(model.y))) {
            return;
          }

          var angle = directionToDegrees(model.direction);

          var x = model.x * gridCellWidth;
          // reverse y to get it into the canvas coordinate system
          var y = (yGridCells - 1 - model.y) * gridCellHeight;

          var ctx = scope.context;
          ctx.clearRect(0, 0, bw, bh);

          ctx.save();
          ctx.translate(x, y);
          ctx.translate(gridCellWidth/2, gridCellHeight/2);
          ctx.rotate(angle * TO_RADIANS);
          ctx.drawImage(scope.robotImage, -gridCellWidth/2, -gridCellHeight/2, gridCellWidth, gridCellHeight);
          ctx.restore();
        }

        scope.context = drawBoard();

        scope.robotImage = new Image();
        scope.robotImage.onload = setRobotPosition;
        scope.robotImage.src = 'assets/images/robot.png';

        scope.$watch('model', setRobotPosition);

      }
    };
  });
