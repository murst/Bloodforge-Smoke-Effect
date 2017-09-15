# Bloodforge Smoke Effect
I stumbled upon a very neat piece of code written by [Jonny Cornwell](http://www.blog.jonnycornwell.com/) for a particle smoke effect. The concept was really neat, but I really wanted it to be easier to use. The end result is a jQuery plugin that allows the developer to add a particle smoke effect background to any element on the page.

See it in action by visiting my blog at https://bloodforge.com/#!/post/the-jquery-bloodforge-smoke-effect
## Version History
* **1.3:** Allow the dynamic setting of SmokeEffect options.
* **1.2:** Smoke is now drawn directly to the canvas. You can now set the color of the smoke. Added *color*, *opacity*, and *particleRadius* settings. Removed *backgroundColor*, *image*, *imageWidth*, *imageHeight* settings.
* **1.1:** Removed webkit-specific drawing since it is no longer supported. Removed *forceBackgroundRenderer* setting.
* **1.0:** Initial release.

## Support all modern browsers
```HTML
<div id="smoke-effect" style="padding: 2em;">
   This works in all modern browsers!
</div>
<script>    
  $('#smoke-effect').SmokeEffect();
</script>
```
*NOTE: In Microsoft Edge, this may cause flashing of the background. Instead, write directly to a canvas as described below.*

## Write directly to a canvas element
Also, if you call this directly on a **CANVAS** tag, it will draw directly to that element. This is the ideal method of using this plugin since it has the least impact on performance.

```HTML
<canvas id="smoke-effect-canvas" width="300" height="100" />
<script>
   $('#smoke-effect-canvas').SmokeEffect();
</script>
```

## Options
* **color:** The color of the smoke. Default is `black`. If you pass a RGBA value, the alpha component will be ignored. To set the alpha, see **opacity** below.
* **opacity:** The opacity of the **color** defined above. Default is `0.2`
* **density:** A number indicating how dense the smoke is. The higher the number, the more dense. The default is `8`
* **maximumVelocity:** A number indicating how quickly the smoke travels. Default is `1`
* **fps:** A number indicating how often to redraw the smoke. Default is `15`
* **particleRadius:** The radius of each smoke particle. Default is `128` pixels.

Example of setting all options (you don't need to set all}:
```javascript
$('selector').SmokeEffect( {
    color: 'red',
    opacity: '0.35',
    density: 12,
    maximumVelocity: 1.5,
    fps: 20,
    particleRadius: 300,
} );
```

### Dynamically chaning options

You can also change certain settings after initialization. This applies to `color`, `opacity`, `maximumVelocity`, and `particleRadius`. For example:

```javascript
$('selector').SmokeEffect('option', 'color', '#ff00ff');
```
