define([
    "dojo/_base/declare", "mxui/widget/_WidgetBase", "dijit/_TemplatedMixin",
    "dojo/_base/lang",
    "./utils",
    // "trainingWidget/lib/jquery-1.11.2",
    "dojo/text!trainingWidget/widget/template/trainingWidget.html"
], function (declare, _WidgetBase, _TemplatedMixin, lang, utils, /*_jQuery,*/ widgetTemplate) {
    "use strict";
    // var $ = _jQuery.noConflict(true);
    return declare("trainingWidget.widget.trainingWidget", [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,
        // DOM elements
        canvas: null,
        // Parameters configured in the Modeler.
        circleEntity: null,
        rectangleEntity: null,
        borderRadius: null,
        shapetoFlow: null,
        radius: null,
        width: null,
        height: null,
        xcoord: null,
        ycoord: null,
        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];

        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {

            //this._updateRendering(); // Not use this step
            this._setupEvents();

        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {

            var _this = this;
            this._contextObj = obj;
            //this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
            if(obj){
                let ctxID = obj.getGuid();
                this.retrieveDataThenRender(ctxID);
            }else
            {
                console.log("No context object!");
            }
            this._executeCallback(callback, "_updateRendering");
        },

        retrieveDataThenRender (ctxID) {
            this.canvas.innerHTML = "";
            utils.retrieveEntity(this.circleEntity, this.shapeToFlow, ctxID)
                .then(circleObjs => {
                    utils.subscribeObjects(circleObjs, (changedGuid) => this.refreshAll(changedGuid));
                    return circleObjs;
                })
                .then(circles => this.drawCircles(circles));//ES6
            utils.retrieveEntity(this.rectangleEntity, this.shapeToFlow, ctxID)
                .then(rectObjs => {
                    utils.subscribeObjects(rectObjs, (changedGuid) => this.refreshAll(changedGuid));
                    return rectObjs;
                })
                .then(rectObjs => this.drawRectangles(rectObjs));//ES6 
        },

        refreshAll: function (guid) {
            console.log(`Shape with id ${guid} was changed!`);//ES6 
            this.retrieveDataThenRender(this._contextObj.getGuid());
        },

        enable: function () { },
        disable: function () { },
        resize: function (box) { },
        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // Attach events to HTML dom elements
        _setupEvents: function () {
        },

        drawCircles: function (cirleObjects) {
            cirleObjects.forEach(circle => this.drawCircle(circle, this.canvas));
        },
        drawCircle: function (circleEntity, canvas) {
            var radius = circleEntity.get(this.radius) * 1;
            var xcoord = circleEntity.get(this.xCoord) * 1;
            var ycoord = circleEntity.get(this.yCoord) * 1;
            var color = circleEntity.get(this.color);
            drawing.drawCircle(xcoord, ycoord, radius, color, canvas);
        },
        drawRectangles: function (rectObjs) {
            rectObjs.forEach(rect => this.drawRectangle(rect, this.canvas));
        },
        drawRectangle: function (rectObj, canvas) {
            var width = rectObj.get(this.width) * 1;
            var height = rectObj.get(this.height) * 1;
            var borderRadius = rectObj.get(this.borderRadius) * 1;
            var xcoord = rectObj.get(this.xCoord) * 1;
            var ycoord = rectObj.get(this.yCoord) * 1;
            var color = rectObj.get(this.color);
            drawing.drawRectangle(xcoord, ycoord, width, height, borderRadius, color, canvas);
        },
        _executeCallback: function (cb, from) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["trainingWidget/widget/trainingWidget"]);
