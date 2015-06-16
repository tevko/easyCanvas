/* easyCanvas.js
*
* A JavaScript library to make working with the Canvas element easier
*
* Author: Tim Evko
* https://twitter.com/tevko
* https://timevko.com
* https://github.com/tevko/easyCanvas
* License: MIT
*
*/

/*eslint-env browser */
(function(window) {
    'use strict';
    /*eslint-disable no-unused-vars*/
    var easyCanvas = window.easyCanvas = window.easyCanvas || {
    /*eslint-enable no-unused-vars*/
        init: function(cls, ctx) {
            var cv = document.querySelector(cls),
                    ct = cv.getContext(ctx);
            this.canvas = cv;
            this.context = ct;
            this.width = window.getComputedStyle(cv).getPropertyValue('width');
            this.height = window.getComputedStyle(cv).getPropertyValue('height');
            this.bg = window.getComputedStyle(cv).getPropertyValue('background-color');
            this.shapesCount = 0;
            this.isDrawable = false;
            this.currentEventListenerCount = 0;
            this.imgCount = 0;
            return this;
        },
        setHeight: function(val) {
            this.height = val;
            this.canvas.style.height = val;
            return this;
        },
        setWidth: function(val) {
            this.width = val;
            this.canvas.style.width = val;
            return this;
        },
        setBG: function(color) {
            this.bg = color;
            this.canvas.style.backgroundColor = color;
            return this;
        },
        rectangle: function(cords, fill, lineWidth, strokeStyle) {
            this.context.fillStyle = fill;
            this.context.lineWidth = lineWidth;
            this.context.strokeStyle = strokeStyle;
            this.context.fillRect.apply(this.context, cords);
            this.context.strokeRect.apply(this.context, cords);
            this.currentShapes = this.currentShapes || {};
            this.currentShapes[this.shapesCount] = {
                'cords': cords,
                'fill': fill,
                'lineWidth': lineWidth,
                'strokeStyle': strokeStyle
            };
            this.shapesCount += 1;
            return this;
        },
        circle: function(centerX, centerY, radius, fillStyle, lineWidth, strokeStyle) {
            this.context.beginPath();
            this.context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            this.context.fillStyle = fillStyle;
            this.context.fill();
            this.context.lineWidth = lineWidth;
            this.context.strokeStyle = strokeStyle;
            this.context.stroke();
            this.currentShapes = this.currentShapes || {};
            this.currentShapes[this.shapesCount] = {
                'centerX': centerX,
                'centerY': centerY,
                'radius': radius,
                'strokeStyle': strokeStyle,
                'fillStyle': fillStyle,
                'lineWidth': lineWidth
        };
            this.shapesCount += 1;
            return this;
        },
        makeDrawable: function(strokeStyle, lineJoin, lineWidth) {
            this.isDrawable = true;
            var clickX = [],
            clickY = [],
            clickDrag = [],
            paint,
            addClick = function(x, y, dragging) {
                clickX.push(x);
                clickY.push(y);
                clickDrag.push(dragging);
            },
            redraw = function() {
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this.context.strokeStyle = strokeStyle;
                this.context.lineJoin = lineJoin;
                this.context.lineWidth = lineWidth;
                for (var i = 0; i < clickX.length; i++) {
                    this.context.beginPath();
                    if (clickDrag[i] && i) {
                        this.context.moveTo(clickX[i - 1], clickY[i - 1]);
                    } else {
                        this.context.moveTo(clickX[i] - 1, clickY[i]);
                    }
                    this.context.lineTo(clickX[i], clickY[i]);
                    this.context.closePath();
                    this.context.stroke();
                }
            },
            msdn = function(e) {
                paint = true;
                addClick(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
            },
            msm = function(e) {
                if (paint) {
                    addClick(e.clientX - this.offsetLeft, e.clientY - this.offsetTop, true);
                    redraw();
                }
            },
            pfalse = function() {
                paint = false;
            };
            this.context.addEventListener('mousedown', msdn);
            this.context.addEventListener('mousemove', msm);
            this.context.addEventListener('mouseup', pfalse);
            this.context.addEventListener('mouseleave', pfalse);
            this.currentEventListeners = this.currentEventListeners || {};
            this.currentEventListeners[this.currentEventListenerCount] = {
                'mousedown': {'name': 'msdn', 'val': msdn},
                'mousemove': {'name': 'msm', 'val': msm},
                'mouseup': {'name': 'pfalse', 'val': pfalse},
                'mouseleave': {'name': 'pfalse', 'val': pfalse}
            };
            this.currentEventListenerCount += 1;
            return this;
        },
        drawImg: function(src, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight) {
            if (typeof src === 'string') {
                var i = new Image();
                i.src = src;
            }
            var nsrc = i || src;
            this.context.drawImage(nsrc, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
            this.currentImgs = this.currentImgs || {};
            this.currentImgs[this.imgCount] = {
                'source': nsrc,
                'srcX': srcX,
                'srcY': srcY,
                'srcWidth': srcWidth,
                'srcHeight': srcHeight,
                'destX': destX,
                'destY': destY,
                'destWidth': destWidth,
                'destHeight': destHeight
            };
            this.imgCount += 1;
            return this;
        },
        clearCanvas: function() {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            return this;
        },
        removeEvtListeners: function() {
            for (var evtl in this.currentEventListeners) {
                var eobj = this.currentEventListeners[evtl];
                for (var val in eobj) {
                    this.context.removeEventListener(val, eobj[val].val);
                }
            }
            this.currentEventListenerCount = 0;
            this.currentEventListeners = null;
            return this;
        },
        resetAll: function() {
            this.context.style.backgroundColor = 'transparent';
            this.context.style.width = 'auto';
            this.context.style.height = 'auto';
            this.removeEvtListeners();
            this.clearCanvas();
            this.currentEventListenerCount = 0;
            this.bg = 'transparent';
            this.currentShapes = null;
            this.height = 'auto';
            this.width = 'auto';
            this.isDrawable = false;
            this.shapesCount = 0;
            this.imgCount = 0;
            this.currentImgs = null;
            return this;
        },
        save: function() {
            this.context.save();
            return this;
        },
        restore: function() {
            this.context.restore();
            return this;
        }
    };
})(window);
