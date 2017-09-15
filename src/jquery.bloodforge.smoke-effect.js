/*
Bloodforge Smoke Effect v1.3

Copyright (c) 2017 Filip Stanek (http://bloodforge.com)
Based off code written by Johny Cornwell (http://www.blog.jonnycornwell.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// A function to create a particle object.
function Particle(context, canvasWidth, canvasHeight) {

    // Set the initial x and y positions
    this._x = 0;
    this._y = 0;

    // Set the initial velocity
    this._xVelocity = 0.5;
    this._yVelocity = 0.5;

    // Store the context which will be used to draw the particle
    this._context = context;   

    this._innerColor = 'rgba(0, 0, 0, 0.2)';
    this._outerColor = 'rgba(0, 0, 0, 0)';

    this._radius = 128;

    // Set the dimensions of the canvas as variables so they can be used.
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;
}

// The function to draw the particle on the canvas.
Particle.prototype.Draw = function () {    
    var gradient = this._context.createRadialGradient(this._x, this._y, 5, this._x, this._y, this._radius);
    gradient.addColorStop(0, this._innerColor);
    gradient.addColorStop(1, this._outerColor);    

    this._context.beginPath();
    this._context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
    this._context.fillStyle = gradient;
    this._context.fill();
    this._context.closePath();
};

// Update the particle.
Particle.prototype.Update = function () {
    // Update the position of the particle with the addition of the velocity.
    this._x += this._xVelocity;
    this._y += this._yVelocity;

    // Check if has crossed the right edge
    if (this._x >= this._canvasWidth) {
        this._xVelocity = -this._xVelocity;
        this._x = this._canvasWidth;
    }
        // Check if has crossed the left edge
    else if (this._x <= 0) {
        this._xVelocity = -this._xVelocity;
        this._x = 0;
    }

    // Check if has crossed the bottom edge
    if (this._y >= this._canvasHeight) {
        this._yVelocity = -this._yVelocity;
        this._y = this._canvasHeight;
    }

        // Check if has crossed the top edge
    else if (this._y <= 0) {
        this._yVelocity = -this._yVelocity;
        this._y = 0;
    }
};

// A function to set the position of the particle.
Particle.prototype.SetPosition = function (x, y) {
    this._x = x;
    this._y = y;
};

// Function to set the velocity.
Particle.prototype.SetVelocity = function (v) {
    this._xVelocity = this.GenerateRandom(-v, v);
    this._yVelocity = this.GenerateRandom(-v, v);
};

Particle.prototype.SetRadius = function (r) {
    this._radius = r;
};

Particle.prototype.SetColor = function (rgb, a) {
    this._innerColor = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + a + ')';
    this._outerColor = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + 0 + ')';
};

Particle.prototype.GenerateRandom = function (min, max) {
    return Math.random() * (max - min) + min;
};

(function ($) {

    var PLUGIN_NAME = 'SmokeEffect';

    var methods = {

        init: function (options) {

            return this.each(function () {
                var $container = $(this);

                var settings = $.extend({
                    color: 'black',
                    opacity: 0.2,
                    density: 8,
                    maximumVelocity: 1,
                    fps: 15,
                    particleRadius: 128,
                }, options);

                var bInitialized = $container.data(PLUGIN_NAME);
                if (!bInitialized) {

                    var canvas;
                    var width = $container.outerWidth();
                    var height = $container.outerHeight();

                    if ($container.prop('tagName') == 'CANVAS') {
                        canvas = $container[0];
                    }
                    else {
                        canvas = document.createElement('CANVAS');
                        canvas.width = width;
                        canvas.height = height;
                    }

                    if (canvas && canvas.getContext) {
                        var context;
                        if ($container.prop('tagName') == 'CANVAS') {
                            context = canvas.getContext('2d');
                        }
                        else {
                            context = canvas.getContext('2d');
                        }

                        var particles = [];

                        // Create the particles and set their initial positions and velocities
                        var totalPixels = width * height;
                        var imgpixels = settings.particleRadius * settings.particleRadius * Math.PI;
                        var areaRatio = imgpixels / totalPixels;
                        var particleCount = Math.ceil(settings.density / areaRatio);

                        settings.color = methods.colorToRGBA(settings.color);

                        for (var i = 0; i < particleCount; ++i) {
                            var particle = new Particle(context, width, height);

                            // Set particle properties
                            particle.SetPosition(particle.GenerateRandom(0, width), particle.GenerateRandom(0, height));
                            particle.SetVelocity(settings.maximumVelocity);
                            particle.SetRadius(settings.particleRadius);
                            particle.SetColor(settings.color, settings.opacity);

                            particles.push(particle);
                        }

                        settings.context = context;
                        settings.particles = particles;

                        $container.data(PLUGIN_NAME, settings);

                        setInterval(function () {

                            $container.SmokeEffect('update');
                            $container.SmokeEffect('draw');

                        }, 1000 / settings.fps);
                    }
                    else {
                        $.error('Cannot create SmokeEffect because the browser lacks support');
                    }
                }

            });
        },

        colorToRGBA: function (color) {
            var cvs, ctx;
            cvs = document.createElement('canvas');
            cvs.height = 1;
            cvs.width = 1;
            ctx = cvs.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            return ctx.getImageData(0, 0, 1, 1).data;
        },

        update: function () {
            // Update the scene

            var settings = $(this).data(PLUGIN_NAME);

            if (settings) {
                settings.particles.forEach(function (particle) {
                    particle.Update();
                });
            }
        },

        draw: function () {
            // The function to draw the scene

            var settings = $(this).data(PLUGIN_NAME);

            if (settings) {
                // Clear the drawing surface and fill it with a black background
                settings.context.clearRect(0, 0, $(this).outerWidth(), $(this).outerHeight());

                // Go through all of the particles and draw them.
                settings.particles.forEach(function (particle) {
                    particle.Draw();
                });

                if ($(this).prop('tagName') != 'CANVAS') {
                    var $container = $(this);
                    var img = new Image();
                    img.onload = function () {
                        $container.css('backgroundImage', 'url(' + this.src + ')');
                    }               
                    img.src = settings.context.canvas.toDataURL();
                }
            }
        },

        resize: function () {
            var $container = $(this);
            var settings = $container.data(PLUGIN_NAME);
            var newWidth = $container.outerWidth();
            var newHeight = $container.outerHeight();
            settings.context.clearRect(0, 0, newWidth, newHeight);
            //settings.context = document.getCSSCanvasContext('2d', settings.canvasID, newWidth, newHeight);
            $container.data(PLUGIN_NAME, settings);
        },

        option: function (sName, vValue) {
            var $container = $(this);
            var settings = $container.data(PLUGIN_NAME);
            if (typeof (sName) == "string") {
                if (vValue == undefined) return settings[sName];	// getter of option

                settings[sName] = vValue;	// setter of option
            }
            else {
                settings = $.extend(settings, sName);
            }

            switch (sName) {
                case "maximumVelocity":
                    settings.particles.forEach(function (particle) {
                        particle.SetVelocity(vValue);
                    });
                    break;
                case "particleRadius":
                    settings.particles.forEach(function (particle) {
                        particle.SetRadius(vValue);
                    });
                    break;
                case "color":
                    settings.color = methods.colorToRGBA(vValue);
                    settings.particles.forEach(function (particle) {
                        particle.SetColor(settings.color, settings.opacity);
                    });
                    break;
                case "opacity":
                    settings.particles.forEach(function (particle) {
                        particle.SetColor(settings.color, vValue);
                    });
                    break;
            }

            $container.data(PLUGIN_NAME, settings);
        }

    };

    $.fn.SmokeEffect = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error("Method '" + method + "' does not exist on plugin '" + PLUGIN_NAME + "'");
        }
    };
}(jQuery));