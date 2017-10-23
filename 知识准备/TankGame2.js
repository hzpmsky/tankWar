     //tank构造函数
	 function Tank(x,y,direct){
	    this.x=x;
		this.y=y;
		this.speed=1;
		this.direct=direct;
		//向上
		this.moveUp=function(){
			this.y-=this.speed;
			this.direct=0;
		}
		//向右
		this.moveRight=function(){
			this.x+=this.speed;
			this.direct=1;
		}

		//下移
		this.moveDown=function(){
			this.y+=this.speed;
			this.direct=2;
		}
		//左
		this.moveLeft=function(){
			this.x-=this.speed;
			this.direct=3;
		}
	  }
    //绘制Tank函数
	function drawTank(tank){
      //画坦克的时候考虑方向
	switch(tank.direct){
	  case 0:
	  case 2:
		  ctx.strokeRect(tank.x,tank.y,10,40);
		  ctx.beginPath();
		  ctx.arc(tank.x+10+14,tank.y+20,14,0,2*Math.PI,true);
		  ctx.closePath();
		  ctx.stroke();
		  ctx.strokeRect(tank.x+10+28,tank.y,10,40);
		  console.log(tank.x,tank.y);

		  ctx.lineWidth=1.5;
		  ctx.beginPath();

		  ctx.moveTo(tank.x+10+14,tank.y+20);
		  if(tank.direct==0){
		  ctx.lineTo(tank.x+10+14,tank.y-10);}
		  else if(tank.direct==2){
		  ctx.lineTo(tank.x+10+14,tank.y+20+30);}

		  ctx.closePath();
		  ctx.stroke();
		  break;
	  case 1:
	  case 3:
          ctx.strokeRect(tank.x,tank.y,40,10);
          ctx.beginPath();
		  ctx.arc(tank.x+20,tank.y+10+14,14,0,2*Math.PI,true);
		  ctx.closePath();
		  ctx.stroke();
		  ctx.strokeRect(tank.x,tank.y+10+14*2,40,10);
          //画炮杆
          ctx.lineWidth=1.5;
		  ctx.beginPath();

		  ctx.moveTo(tank.x+20,tank.y+10+14);
		  if(tank.direct==1){
		  ctx.lineTo(tank.x+20+30,tank.y+10+14);}
		  else if(tank.direct==3){
		  ctx.lineTo(tank.x+10+14-30,tank.y+10+14);}

		  ctx.closePath();
		  ctx.stroke();
		  break;

	}
	 }
	