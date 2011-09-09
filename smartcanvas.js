var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var clickText = new Array();
var clickXundo = new Array();
var clickYundo = new Array();
var clickColorundo = new Array();
var clickToolundo = new Array();
var clickSizeundo = new Array();
var clickDragundo = new Array();
var clickTextundo = new Array();
var paint = false;
var curColor = "red";
var curTool = "pen";
var ctx;
var canvas;

$(document).ready(function() {

		var x, y = '';

		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		
		$("#slide").fullBg();
		//$('#slide').css("background-image", "url(http://speakingpowerpoint.files.wordpress.com/2011/05/slide9.jpg)"); 
		//$('#slide').width(window.innerWidth -($("#toolbar").outerWidth() + 20));
		//$('#slide').height(window.innerHeight - $("#preview").outerHeight());
		
		// Spanning the canvas to 100%
		ctx.canvas.width  = window.innerWidth -($("#toolbar").outerWidth() + 20);
		ctx.canvas.height = window.innerHeight - $("#preview").outerHeight();

		ctx.strokeStyle = 'red';

		ctx.lineWidth = 15;
		ctx.lineCap = "round";
		
		// prepare everything
		$("#textinput").hide();
		$("#pen").addClass("highlight");
		$("#red").addClass("highlight");
        
		//code for color pallete
		$("#clr > div").click(
		function(){
			curColor = $(this).css("background-color");
			$("#clr > div").each(function(){
				$(this).removeClass("highlight");
			});
			$(this).addClass("highlight");
		});
        
        //Texttool
		$("#text").click(function(){
			curTool = "text";
			$("#textinput").show();
			$("#toolbar > a").each(function(){
				$(this).removeClass("highlight");
			});
			$(this).addClass("highlight");
		});
		$("#pen").click(function(){
			curTool = "pen";
			$("#textinput").hide();
			$("#toolbar > a").each(function(){
				$(this).removeClass("highlight");
			});
			$(this).addClass("highlight");
		});
        //Eraser
		$("#eraser").click(function(){
			curTool = "eraser";
			$("#textinput").hide();
			$("#toolbar > a").each(function(){
				$(this).removeClass("highlight");
			});
			$(this).addClass("highlight");
		});

		//Code for save the image
		$("#save").click(function(){ 
			$("#textinput").hide();
			$("#result").html('<br /><br /><img src='+canvas.toDataURL()+' /><br /><a href="#" id="get">&nbsp;Download</a>');
			$("#data").val(canvas.toDataURL());
			$("#get").click(function(){
					$("#frm").trigger('submit');
	       });
		});
        
		//Clear 
		$("#clear").click(function(){
			curTool = "clear";
			addClick(0, 0, false);
			redraw();
			$("#toolbar > a").each(function(){
				$(this).removeClass("highlight");
			});
			$(this).addClass("highlight");
		});
		
		//UndoClear 
		$("#undo").click(function(){
			clickXundo.push(clickX.pop()); 
			clickYundo.push(clickY.pop()); 
			clickColorundo.push(clickColor.pop()); 
			clickToolundo.push(clickTool.pop()); 
			clickSizeundo.push(clickSize.pop()); 
			clickDragundo.push(clickDrag.pop()); 
			clickTextundo.push(clickText.pop()); 
			redraw();
		});
		
		// Add mouse events
		// ----------------
		$('#canvas').mousedown(function(e){
			paint = true;
			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.offsetTop;
			addClick(mouseX, mouseY, false);
			redraw();
		});
		
		$('#canvas').mousemove(function(e){
			if(paint==true){
				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
				redraw();
			}
		});
		
		$('#canvas').mouseup(function(e){
			paint = false;
		  	redraw();
		});
		
		$('#canvas').mouseleave(function(e){
			paint = false;
		});	
});

/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
function addClick(x, y, dragging){
	clickX.push(x);
	clickY.push(y);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickDrag.push(dragging);
	clickText.push(document.textform.texttowrite.value);
}

function redraw(){
		
	var radius = 20;
	var i = 0;
	// Clearing the canvas
	canvas.width = canvas.width;

	for(; i < clickX.length; i++)
	{		
	
		ctx.lineWidth = radius;
		if(clickTool[i] == "text")
		{
			ctx.font = (radius*2)+"px 'optimer'";
			ctx.textAlign = 'left';
			ctx.textBaseline = 'middle';
			ctx.strokeStyle = clickColor[i];
			ctx.fillStyle = clickColor[i];
			ctx.globalCompositeOperation = "source-over";
			ctx.fillText(clickText[i], clickX[i], clickY[i]);
			
		}else if(clickTool[i] == "clear"){
			ctx.fillStyle = "rgba(255,255,255,1.0)";
			ctx.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}else{
			
			if(clickTool[i] == "eraser"){
				ctx.strokeStyle = "rgba(255,255,255,1.0)";
				ctx.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
				ctx.strokeStyle = 'white';
			}else{
				ctx.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
				ctx.fillStyle = clickColor[i];
				ctx.strokeStyle = clickColor[i];
			}
			
			
			if(clickDrag[i] && i){
				ctx.beginPath();
				ctx.moveTo(clickX[i-1], clickY[i-1]);
				ctx.lineTo(clickX[i], clickY[i]);
				ctx.lineWidth = radius;
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = radius/2;
				ctx.arc(clickX[i], clickY[i], radius/4, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}else{
				
				ctx.beginPath();
				ctx.moveTo(clickX[i], clickY[i]);
				ctx.lineWidth = radius/2;
				ctx.arc(clickX[i], clickY[i], radius/4, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
			
			ctx.fill();
			ctx.stroke();
		}
		
	}
	
	//ctx.globalCompositeOperation = "source-over";// To erase instead of draw over with white
	ctx.restore();
	
}

(function($) {
  $.fn.fullBg = function(){
    var bgImg = $(this);		
 
    function resizeImg() {
      var imgwidth = bgImg.width();
      var imgheight = bgImg.height();
 
      var winwidth = $(window).width()-100;
      var winheight = $(window).height()-100;
 
      var widthratio = winwidth / imgwidth;
      var heightratio = winheight / imgheight;
 
      var widthdiff = heightratio * imgwidth;
      var heightdiff = widthratio * imgheight;
 
      if(heightdiff<winheight) {
        bgImg.css({
          width: winwidth+'px',
          height: heightdiff+'px'
        });
      } else {
        bgImg.css({
          width: widthdiff+'px',
          height: winheight+'px'
        });		
      }
    } 
    resizeImg();
    $(window).resize(function() {
      resizeImg();
    }); 
  };
})(jQuery)
