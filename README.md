# ToyRobot
An overkill solution to the toy-robot test.

_Bootstrapped using yeoman + https://github.com/DaftMonk/generator-angular-fullstack_

This takes advantage of a socket client/server so you can see other client's robots being created and moving around in your session.

Installation
------------
1. Clone the repo
2. npm install
3. bower install

Running unit tests
------------------
1. grunt test

Startup
-------
1. grunt serve for preview, and grunt serve:dist for a preview of the built app

Commands
--------
**PLACE**
Sets the position of the robot. You must specify the x/y coordinates and direction to face the robot in the format: _x,y,direction_ where direction is one of [NORTH,SOUTH,EAST,WEST] and 0,0 is the south west corner.

**MOVE**
Moves the robot forward one space. Has no effect if the robot is at the edge of the board.

**LEFT**
Rotates the robot left 90 degrees.

**RIGHT**
Rotates the robot right 90 degrees.

**REPORT**
Reports the position of the robot.
