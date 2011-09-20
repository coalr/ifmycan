<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>

<title>Canvas and Jquery</title>
<link rel="stylesheet" type="text/css" href="style.css" />
<script
	src="jquery.min.js"
	type="text/javascript"></script>
<script src="jquery.watermarkinput.js" type="text/javascript"></script>
<script type="text/javascript" src="smartCanvas.js"></script>
</head>
<body ontouchmove="BlockMove(event);">
	<div id="wrapper">
		<div id="bgimage">
			<img id="slide"
				src="http://speakingpowerpoint.files.wordpress.com/2011/05/slide9.jpg" />
		</div>
		<div id="textinput">
			<form name="textform">
				Text: <input id="textinput1" type="text" maxlength="200" size="50" name="texttowrite" />
			</form>
		</div>
		<div id="canvasholder">
			<canvas id="canvas"> </canvas>
		</div>

		
		<div id="toolbar">
			<div id="clr">
				<div style="background-color: black;"></div>
				<div style="background-color: white;"></div>
				<div id="red" style="background-color: red;"></div>
				<div style="background-color: green;"></div>
				<div style="background-color: blue;"></div>
				<div style="background-color: orange;"></div>
			</div>

			<a href="#" id="pen">Pen</a> 
			<a href="#" id="text">Text</a> 
			<a id="eraser" href="#">Eraser</a> 
			<a href="#" id="clear">Clear</a> 
			<a href="#" id="undo">Undo</a> 
			
			<a id="save" href="#">Save</a> 
			<span id="result"><br />
			<br />
			</span>

			<form action="" method="post" id="frm" />
			<input type="hidden" name="data" id="data" />
			</form>

		</div>
		<div id="preview">
		<a href="#" id="load">Load</a> 
		</div>
	</div>
</body>
</html>