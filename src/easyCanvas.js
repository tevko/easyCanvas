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

/*global initCanvas*/

var initCanvas = function(cls, ctx) {
    'use strict';
    var cv = document.querySelector(cls),
        ct = cv.getContext(ctx);
        cv.style.height = '250px';
        cv.style.width = '250px';
        cv.style.backgroundColor = 'orange';
    return {
        canvas: cv,
        context: ct,
        width: '250px',
        height: '250px',
        bg: 'orange',
        shapesCount: 0,
        isDrawable: false,
        currentEventListenerCount: 0,
        imgCount: 0,
        setHeight: function(val) {
            this.height = val;
            cv.style.height = val;
            return this;
        },
        setWidth: function(val) {
            this.width = val;
            cv.style.width = val;
            return this;
        },
        setBG: function(color) {
            this.bg = color;
            cv.style.backgroundColor = color;
            return this;
        },
        rectangle: function(cords, fill, lineWidth, strokeStyle) {
            ct.fillStyle = fill;
            ct.lineWidth = lineWidth;
            ct.strokeStyle = strokeStyle;
            ct.fillRect.apply(ct, cords);
            ct.strokeRect.apply(ct, cords);
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
            ct.beginPath();
            ct.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            ct.fillStyle = fillStyle;
            ct.fill();
            ct.lineWidth = lineWidth;
            ct.strokeStyle = strokeStyle;
            ct.stroke();
            this.currentShapes = this.currentShapes || {};
            this.currentShapes[this.shapesCount] = {
                'centerX' : centerX, 
                'centerY' : centerY, 
                'radius' : radius, 
                'strokeStyle' : strokeStyle,
                'fillStyle' : fillStyle,
                'lineWidth' : lineWidth
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
                ct.clearRect(0, 0, ct.canvas.width, ct.canvas.height);
                ct.strokeStyle = strokeStyle;
                ct.lineJoin = lineJoin;
                ct.lineWidth = lineWidth;
                for(var i=0; i < clickX.length; i++) {		
                    ct.beginPath();
                    if (clickDrag[i] && i) {
                        ct.moveTo(clickX[i-1], clickY[i-1]);
                    } else {
                        ct.moveTo(clickX[i]-1, clickY[i]);
                    }
                    ct.lineTo(clickX[i], clickY[i]);
                    ct.closePath();
                    ct.stroke();
                }
            },
            msdn = function(e) {
                var mouseX = e.pageX - this.offsetLeft;
                var mouseY = e.pageY - this.offsetTop;
                paint = true;
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            },
            msm = function(e) {
                if (paint) {
                    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                    redraw();
                }
            },
            pfalse = function() {
                paint = false;
            }
            cv.addEventListener('mousedown', msdn);
            cv.addEventListener('mousemove', msm);
            cv.addEventListener('mouseup', pfalse);
            cv.addEventListener('mouseleave', pfalse);
            this.currentEventListeners = this.currentEventListeners || {};
            this.currentEventListeners[this.currentEventListenerCount] = {
                'mousedown' : {'name' : 'msdn', 'val' : msdn}, 
                'mousemove' : {'name' : 'msm', 'val' : msm}, 
                'mouseup' : {'name' : 'pfalse', 'val' : pfalse}, 
                'mouseleave' : {'name' : 'pfalse', 'val' : pfalse}
            };
            this.currentEventListenerCount += 1;
            return this;
        },
        drawImg: function(src, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight) {
            if (typeof src === 'string') {
                var i = new Image();
                i.src = src;
            }
            var src = i || src;
            ct.drawImage(src, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
            this.currentImgs = this.currentImgs || {};
            this.currentImgs[this.imgCount] = {
                'source' : src,
                'srcX' : srcX,
                'srcY' : srcY,
                'srcWidth' : srcWidth,
                'srcHeight' : srcHeight,
                'destX' : destX,
                'destY' : destY,
                'destWidth' : destWidth,
                'destHeight' : destHeight
            }
            return this;
        },
        clearCanvas: function() {
            ct.clearRect(0, 0, ct.canvas.width, ct.canvas.height);
            return this;
        },
        removeEvtListeners: function() {
            for (var evtl in this.currentEventListeners) {
                var eobj = this.currentEventListeners[evtl];
                for (var val in eobj) {
                    cv.removeEventListener(val, eobj[val].val);
                }
            }
            this.currentEventListenerCount = 0;
            this.currentEventListeners = null;
            return this;
        },
        resetAll: function() {
            cv.style.backgroundColor = 'transparent';
            cv.style.width = 'auto';
            cv.style.height = 'auto';
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
            ct.save();
            return this;
        },
        restore: function() {
            ct.restore();
            return this;
        }
    };
};