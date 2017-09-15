<p>I stumbled upon a very neat piece of code written by <a href="http://www.blog.jonnycornwell.com/">Jonny Cornwell</a> for a particle smoke effect. The concept was really neat, but I really wanted it to be easier to use. The end result is a jQuery plugin that allows the developer to add a particle smoke effect background to any element on the page.</p>
<hr />
<script
  src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
  crossorigin="anonymous"></script>
<script src="/src/jquery.bloodforge.smoke-effect.js"></script>
<canvas width="400" height="300" id="smoke-effect"></canvas>
<script>
  $('#smoke-effect').SmokeEffect();
</script>
<hr />
<h2>Version History</h2>
<ul>
<li><strong>1.3</strong>: Allow the dynamic setting of SmokeEffect options.</li>
<li><strong>1.2</strong>: Smoke is now drawn directly to the canvas. You can now set the color of the smoke. Added <em>color</em>, <em>opacity</em>, and <em>particleRadius</em> settings. Removed <em>backgroundColor</em>, <em>image</em>, <em>imageWidth</em>, <em>imageHeight</em> settings.</li>
<li><strong>1.1</strong>: Removed webkit-specific drawing since it is no longer supported. Removed <em>forceBackgroundRenderer</em> setting.</li>
<li><strong>1.0</strong>: Initial release.</li>
</ul>
<hr />
<h2>Support all modern browsers</h2>
<p><code>&lt;div id="smoke-effect" style="padding: 2em;"&gt;<br />&nbsp;&nbsp;&nbsp;This works in all modern browsers!<br />&lt;/div&gt;
&lt;script&gt;
&nbsp;&nbsp;&nbsp;$('#smoke-effect').SmokeEffect();
&lt;/script&gt;</code></p>
<p>NOTE: In Microsoft Edge, this may cause flashing of the background. Instead, write directly to a canvas as described below.</p>
<hr />
<h2>Write directly to a canvas element</h2>
<p>Also, if you call this directly on a <strong>CANVAS</strong> tag, it will draw directly to that element. This is the ideal method of using this plugin since it has the least impact on performance.</p>
<p><code>&lt;canvas id="smoke-effect-canvas" width="300" height="100" /&gt;
&lt;script&gt; <br />&nbsp;&nbsp;&nbsp;$('#smoke-effect-canvas').SmokeEffect(); <br />&lt;/script&gt;</code></p>
<hr />
<h2>Options</h2>
<ul>
<li><strong>color</strong>: The color of the smoke. Default is <strong>black</strong>. If you pass a RGBA value, the alpha component will be ignored. To set the alpha, see <em>opacity</em> below.</li>
<li><strong>opacity</strong>: The opacity of the <em>color</em> defined above. Default is <strong>0.2</strong></li>
<li><strong>density</strong>: A number indicating how dense the smoke is. The higher the number, the more dense. The default is <strong>8</strong>.</li>
<li><strong>maximumVelocity</strong>: A number indicating how quickly the smoke travels. Default is <strong>1</strong></li>
<li><strong>fps</strong>: A number indicating how often to redraw the smoke. Default is <strong>15</strong></li>
<li><strong>particleRadius</strong>: The radius of each smoke particle. Default is <strong>128</strong> pixels.</li>
</ul>
<p>Example of setting all options (you don&rsquo;t need to set all}.</p>
<p><code>$('selector').SmokeEffect( {
<br>&nbsp;&nbsp;&nbsp; color: 'red',
<br>&nbsp;&nbsp;&nbsp; opacity: '0.35',
<br>&nbsp;&nbsp;&nbsp; density: 12,
<br>&nbsp;&nbsp;&nbsp; maximumVelocity: 1.5,
<br>&nbsp;&nbsp;&nbsp; fps: 20,
<br>&nbsp;&nbsp;&nbsp; particleRadius: 300,
<br>} );
</code></p>

<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="src/jquery.bloodforge.smoke-effect.js"></script>
<script>
$('#smoke-effect').SmokeEffect();
</script>
