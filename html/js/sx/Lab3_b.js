"use strict";

var gl;
var canvas ;
var thetaLoc;
var theta=0.0;
var direction = 1;
var delay = 200;

function changeDir(){
	direction *= -1;
}
 function init(){
	canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	// Three Vertices
	 var verticesColors = new Float32Array([  
	//红色四边形	
    -0.8,-0.6,0.92549,0.1098,0.141176,
	-0.8,0.6,0.92549,0.1098,0.141176,
	0.8,0.6,0.92549,0.1098,0.141176,
	0.8,-0.6,0.92549,0.1098,0.141176,
	//蓝色四边形
	-0.6,-0.5, 0.2549,  0.4117647,  1.0,
	-0.6,0.5, 0.2549,  0.4117647,  1.0,
	0.6,0.5, 0.2549,  0.4117647,  1.0,
	0.6,-0.5, 0.2549,  0.4117647,  1.0,
	//R-G-B三角形
	 -0.4,-0.3, 0.0,  0.0,  1.0,
	-0.0, 0.3,  1.0,  0.0,  0.0, 
	 0.4, -0.3,  0.0,  1.0,  0.0,
	 //天线
	 0.0,0.6,0.0,0.0,0.0,
	 -0.3,0.8,0.0,0.0,0.0,
	  0.0,0.6,0.0,0.0,0.0,
	  0.3,0.8,0.0,0.0,0.0,
  ]);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT; 
	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER,verticesColors , gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 5*FSIZE, 0 );
	gl.enableVertexAttribArray( vPosition );
	var a_Color = gl.getAttribLocation(program, "a_Color");
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	
	// 连接a_Color变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Color);  
	thetaLoc = gl.getUniformLocation(program, "theta");
	document.getElementById( "controls" ).onclick = function( event ){
		switch( event.target.index ){
			case 0:
				direction *= -1;
				break;
			case 1:
				delay /= 2.0;
				break;
			case 2:
				delay *= 2.0;
				break;	
		}
	};
	render();
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT);
	theta+=direction*0.1;
	if( theta > 2 * Math.PI )
	    theta -= (2 * Math.PI);
		else if( theta < -2 * Math.PI )
			theta += ( 2 * Math.PI );
	gl.uniform1f( thetaLoc, theta );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 4, 4 );
	gl.drawArrays( gl.TRIANGLES, 8, 3);
	gl.drawArrays( gl.LINES, 11, 2);
	gl.drawArrays( gl.LINES, 13, 2);
	setTimeout( function (){ requestAnimFrame( render ); }, delay );
}