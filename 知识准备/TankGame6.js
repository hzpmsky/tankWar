     //颜色数组
	 var  myTankColor =new Array("#BA9658","red");
	 var  enemyColor =new Array("blue","green","purple");

	 //定义炸弹类
	 function Bomb(x,y){
	   this.x=x;
	   this.y=y;
	   this.isLive=true;
	   this.blood=9;
	   this.bloodDown=function(){
	     if(this.blood>0){
		   this.blood--;
		 }else{
		   this.isLive=false;
		 }
	   }
	 }
	 
	 //子弹类
	 function Bullet(x,y,direct,speed){
	   this.x=x;
	   this.y=y;
	   this.direct=direct;
	   this.speed=1;
	   this.timer=null;
	   this.isLive=true;
	   this.run=function run(){
         //先判断子弹是否到边界，如果是，关闭定时器；否则继续修改子弹的坐标
         if (this.x<=0||this.x>=700||this.y<=0||this.y>=400)
         {
			 clearInterval(this.timer);
			 this.isLive=false;
         }else{
	     switch(this.direct){
		   case 0:
               this.y-=this.speed;
			   break;
		   case 1:
               this.x+=this.speed;
			   break;
		   case 2:
               this.y+=this.speed;
			   break;
		   case 3:
               this.x-=this.speed;
			   break;
		   }
		 }
		 document.getElementById('s1').innerHTML="子弹x:"+this.x+"子弹y:"+this.y;
	   }
	 }
	 //坦克类
	 function Tank(x,y,direct,color){
	    this.x=x;
		this.y=y;
		this.speed=1;
		this.direct=direct;
		this.isLive=true;
		this.color=color;
		//上
		this.moveUp=function(){
			this.y-=this.speed;
			this.direct=0;
		}
		//右
		this.moveRight=function(){
			this.x+=this.speed;
			this.direct=1;
		}

		//下
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
	  //定义MyTank类，继承自Tank
	  function MyTank(x,y,direct,color){
	    this.tank=Tank;
		this.tank(x,y,direct,color);
        //this.isLive=true;
		this.shot=function(){

	   //创建子弹，想想子弹的位置和方向与坦克的关系
	   switch(this.direct){
          case 0:
		  myBullet= new Bullet(this.x+10+14,this.y-10,this.direct,this.speed);
		  break;
		  case 1:
		  myBullet= new Bullet(this.x+40+10,this.y+10+14,this.direct,this.speed);
		  break;
		  case 2:
		  myBullet= new Bullet(this.x+10+14,this.y+40+10,this.direct,this.speed);
		  break;
		  case 3:
		  myBullet= new Bullet(this.x-10,this.y+10+14,this.direct,this.speed);
		  break;
	      }
		  myBullets.push(myBullet);
		   //创建 myBullet实例后，调用myBullet的run()方法
		   //每个子弹的定时期是独立的
		  var timer= setInterval("myBullets["+(myBullets.length-1)+"].run()",50);
		  //将timer赋给子弹
		  myBullets[myBullets.length-1].timer=timer;
		}
	  }
	  
	  //定义敌人EnemyTank类，继承自Tank
      function EnemyTank(x,y,direct,color){
	    this.tank=Tank;
		this.count=0;
		this.tank(x,y,direct,color);
		this.run= function run(){
		   switch(this.direct){
          case 0:
		    if(this.y>0){
		      this.y-=this.speed;
		  }
		  break;
		  case 1:
		   if(this.x<400){
		      this.x+=this.speed;
		  }
		  break;
		  case 2:
		 if(this.y<300){
		      this.y+=this.speed;
		  }
		  break;
		  case 3:
		  if(this.x>0){
		      this.x-=this.speed;
		  }
		  break;
	      }
		  if(this.count>30){
		    this.direct=Math.round(Math.random()*3);
			this.count=0
		  }
			this.count++;
			enemyBullets.push(enemyBullet);
		   //创建 myBullet实例后，调用myBullet的run()方法
		   //每个子弹的定时期是独立的
		  var timer= setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
		  //将timer赋给子弹
		  enemyBullets[enemyBullets.length-1].timer=timer;
		}
	  }
	  //画自己的子弹
     function drawMyBullet(){
		 for(var i=0;i<myBullets.length;i++){
			 var myBullet=myBullets[i];
		 if(myBullet!=null && myBullet.isLive){
	//当子弹不空且子弹还存活在的时候，绘画子弹
	   ctx.fillStyle='yellow';
	 //  console.log('myBullet.x'+myBullet.x);
	   ctx.fillRect(myBullet.x,myBullet.y,3,3);}
	   }
	 }
  //画敌方坦克的子弹
     function drawEnemyBullet(){
		 for(var i=0;i<enemyBullets.length;i++){
			 var myBullet=enemyBullets[i];
		 if(enemyBullets!=null && enemyBullets.isLive){
	//当子弹不空且子弹还存活在的时候，绘画子弹
	   ctx.fillStyle='yellow';
	 //  console.log('myBullet.x'+myBullet.x);
	   ctx.fillRect(enemyBullets.x,enemyBullets.y,3,3);}
	   }
	 }
    //绘制Tank
	function drawTank(tank){
      //画坦克的时候考虑方向,判断每个tank对象的isLive属性
	  if(tank.isLive){
	switch(tank.direct){
	  case 0:
	  case 2:
		  ctx.fillStyle=tank.color[0];
		  ctx.fillRect(tank.x,tank.y,10,40); 
		  ctx.beginPath();
		  ctx.fillStyle=tank.color[1];
		  ctx.arc(tank.x+10+14,tank.y+20,14,0,2*Math.PI,true);
		  ctx.closePath();
		  ctx.fill();
		  ctx.fillStyle=tank.color[0];
		  ctx.fillRect(tank.x+10+28,tank.y,10,40);
		 //console.log(tank.x,tank.y);
            ctx.strokeStyle='white';
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
		  ctx.fillStyle=tank.color[0];
          ctx.fillRect(tank.x,tank.y,40,10);
          ctx.beginPath();
		  ctx.fillStyle=tank.color[1];
		  ctx.arc(tank.x+20,tank.y+10+14,14,0,2*Math.PI,true);
		  ctx.closePath();
		  ctx.fill();
		  ctx.fillStyle=tank.color[0];
		  ctx.fillRect(tank.x,tank.y+10+14*2,40,10);
          //画炮杆
		  ctx.strokeStyle='white';
          ctx.lineWidth=1.5;
		  ctx.beginPath();

		  ctx.moveTo(tank.x+20,tank.y+10+14);
		  if(tank.direct==1){
		  ctx.lineTo(tank.x+20+30,tank.y+10+14);}
		  else if(tank.direct==3){
		  ctx.lineTo(tank.x+20-30,tank.y+10+14);}
		  ctx.closePath();
		  ctx.stroke();
		  break;
	     }
	   }
	 }

	 //判断子弹是否打中坦克
	 function isHitEnemyTank(){
		//遍历每颗子弹
	   for(i=0;i<myBullets.length;i++){
	     var myBullet=myBullets[i];
		// console.log('myBullet'+myBullet);
		 if(myBullet.isLive){ 
			 //如果子弹是活着的,让这颗子弹和所有的坦克进行比较
		    for(j=0;j<enemyTanks.length;j++){
			  var enemyTank=enemyTanks[j];
                // console.log('enemyTank.isLive'+enemyTank.isLive);
				//先判断坦克是否还存活
                 if(enemyTank.isLive){
					 console.log("进入case判断");
				    switch(enemyTank.direct){
						 
					   case 0:
                       case 2:
						   //判断子弹是否进入坦克的矩形区域，方向不同，矩形也就不同
						   if(myBullet.x>= enemyTank.x&&myBullet.x<=enemyTank.x+10+28+10&&
						   myBullet.y>= enemyTank.y&&myBullet.y<=enemyTank.y+40){
						  //击中，子弹和地方坦克死亡消失  
					       myBullet.isLive=false;
						   enemyTank.isLive=false;
						 //创建炸弹
						 var bomb=new Bomb(enemyTank.x,enemyTank.y);
						 bombs.push(bomb);
					   }

					   break;
					   case 1:
					   case 3:
                           if(myBullet.x>= enemyTank.x&&myBullet.x<=enemyTank.x+40&&
						   myBullet.y>= enemyTank.y&&myBullet.y<=enemyTank.y+10+28+10){
						   
					       myBullet.isLive=false;
						   enemyTank.isLive=false;
						var bomb=new Bomb(enemyTank.x,enemyTank.y);
						 bombs.push(bomb);
					   }
					   break;
					  
					}
				 }
			}
		 }
	   }
	 }

	//画炸弹
	function drawEnemyBomb(){
	  for(var i=0; i<bombs.length;i++){
	     //遍历炸弹
		 var bomb=bombs[i];
		 console.log(bomb);
         if(bomb.isLive){

		   if(bomb.blood>6){
			   var img1= new Image();
		     img1.src="bomb_1.gif";
				var x=bomb.x;
				var y=bomb.y;
				img1.onload=function(){
					cxt.drawImage(img1,x,y,30,30);
				}
		   }else if(bomb.blood>3){
		     var img2=new Image();
				img2.src="bomb_2.gif";
				var x=bomb.x;
				var y=bomb.y;
				img2.onload=function(){
					cxt.drawImage(img2,x,y,30,30);}
		   }else{
		   var img3=new Image();
				img3.src="bomb_3.gif";
				var x=bomb.x;
				var y=bomb.y;
				img3.onload=function(){
					cxt.drawImage(img3,x,y,30,30);

		   }
		 }
         bomb.bloodDown();
		 if(bomb.blood<=0){
		   bombs.splice(i,1);
		 }

	    }
	  }
	}

