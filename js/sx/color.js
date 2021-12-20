"use strict";

var gl;


function init(){
  // 获取 <canvas> 元素
  var canvas = document.getElementById('webgl');

  // 获取WebGL渲染上下文
	gl = WebGLUtils.setupWebGL( canvas );
  if (!gl) {
    alert( "WebGL isn't available" );
  }
  
 
  // 顶点坐标和颜色
  var verticesColors = new Float32Array([    
    //  0.0,  0.5,  1.0,  0.0,  0.0, 
    // -0.5, -0.5,  0.0,  1.0,  0.0, 
    //  0.5, -0.5,  0.0,  0.0,  1.0, 
	//四边形
	0.0,0.0, 0.0,  1.0,  0.0,
	0.0,1.0, 0.0,  1.0,  0.0,
	1.0,1.0, 0.0,  1.0,  0.0,
	1.0,0.0, 0.0,  1.0,  0.0,
	//三角形
	-0.1,0.0,0.0,  0.0,  1.0,
	-1.0,0.0,0.0,  0.0,  1.0,
	-0.5,1.0,0.0,  0.0,  1.0,
	//R-G-B三角形
	 0.0,  -0.1, 0.0,  0.0,  1.0,
	-0.5, -1.0,  1.0,  0.0,  0.0, 
	 0.5, -1.0,  0.0,  1.0,  0.0, 
  ]);

  gl.viewport( 0, 0, canvas.width, canvas.height );
  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  
  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );
  
  var n = 10; // 点的个数
  var FSIZE = verticesColors.BYTES_PER_ELEMENT;   //数组中每个元素的字节数

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 向缓冲区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  //获取着色器中attribute变量a_Position的地址 
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 5*FSIZE, 0);

  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(vPosition);

  //获取着色器中attribute变量a_Color的地址 
  var a_Color = gl.getAttribLocation(program, 'a_Color');
  // 将缓冲区对象分配给a_Color变量
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  // 连接a_Color变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Color);  

  render();

}
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 4, 3);
	gl.drawArrays( gl.TRIANGLES, 7, 3);
	}