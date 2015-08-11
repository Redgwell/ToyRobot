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

        function setRobotDirection(ctx, img, x, y, direction)
        {
            var angle = 0;
            switch (direction) {
              case 'NORTH':
                angle = 0;
                break;
              case 'SOUTH':
                angle = 180;
                break;
              case 'EAST':
                angle = 90;
                break;
              case 'WEST':
                angle = 270;
                break;
            }

            // save the current co-ordinate system
            // before we screw with it
            ctx.save();

            // move to the middle of where we want to draw our image
            ctx.translate(x, y);

            // rotate around that point, converting our
            // angle from degrees to radians
            ctx.rotate(angle * TO_RADIANS);

            // draw it up and to the left by half the width
            // and height of the image
            ctx.drawImage(img, -(img.width/2), -(img.height/2));

            // and restore the co-ords to how they were when we began
            ctx.restore();
        }

        function setRobotPosition(ctx, img, x, y, direction) {

          var angle = directionToDegrees(direction);
          angle = 90;
          // reverse y to get it into the canvas coordinate system
          y = yGridCells - y;
          x *= gridCellWidth;
          y *= gridCellHeight;

          ctx.save();
          ctx.translate(x + (gridCellWidth/2), y - (gridCellHeight/2));
          ctx.rotate(angle * TO_RADIANS);
          ctx.drawImage(img, x - gridCellWidth, (gridCellHeight/2), gridCellWidth, gridCellHeight);
          ctx.restore();
        }


        var canvas = $('<canvas/>').attr({width: bw + 1, height: bh + 1}).appendTo(element);
        var context = canvas.get(0).getContext('2d');

        drawBoard(context);

        var robot = new Image();
        robot.onload = function () {
          setRobotPosition(context, robot, 2, 2, 'SOUTH');
        };
        robot.src = 'assets/images/robot.png';

      }
    };
  });
