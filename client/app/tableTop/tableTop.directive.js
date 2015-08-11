'use strict';

angular.module('toyRobotApp')
  .directive('tableTop', function () {
    return {
      templateUrl: 'app/tableTop/tableTop.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

        // grid size set up
        var bw = 400;
        var bh = 400;
        var xGridCells = 5;
        var yGridCells = 5;
        var gridCellWidth = bw / xGridCells;
        var gridCellHeight = bh / yGridCells;
        var TO_RADIANS = Math.PI / 180;

        function drawBoard(ctx){
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
        }

        function directionToDegrees(direction) {
          switch (direction) {
            case 'NORTH':
              return 0;
            case 'SOUTH':
              return 180;
            case 'EAST':
              return 90;
            case 'WEST':
              return 270;
            default:
              return 0;
          }
        }

        function setRobotPosition(ctx, img, x, y, direction) {

          var angle = directionToDegrees(direction);
          // reverse y to get it into the canvas coordinate system
          y = yGridCells - 1 -y;
          x *= gridCellWidth;
          y *= gridCellHeight;

          ctx.save();
          ctx.translate(x, y);
          ctx.translate(gridCellWidth/2, gridCellHeight/2);
          ctx.rotate(angle * TO_RADIANS);
          ctx.drawImage(img, -gridCellWidth/2, -gridCellHeight/2, gridCellWidth, gridCellHeight);
          ctx.restore();
        }


        var canvas = $('<canvas/>').attr({width: bw + 1, height: bh + 1}).appendTo(element);
        var context = canvas.get(0).getContext('2d');

        drawBoard(context);

        var robot = new Image();
        robot.onload = function () {
          //setRobotPosition(context, robot, 3, 4, 'EAST');
        };
        robot.src = 'assets/images/robot.png';

      }
    };
  });
