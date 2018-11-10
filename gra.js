var list=new Array(14);
for(var i=0;i<14;i++)
    {
        list[i]=new Array(28);
        for(var j=0;j<28;j++)
            {
                
                    list[i][j]=0;
            }
    }
var point=0;
var point_array=new Array(2);
var snake_array=new Array(100);
var length=0;
for(var a=0;a<100;a++)
    {
        snake_array[a]=new Array(2);
    }
var course=new Array(2);
course[0]=0;
course[1]=1;
//var pojemnik='<div id="'+i+','+j+'" class="pojemnik" style="left:'+(50*j)+'; top:'+(50*i)+';"></div>';
var block='<div class="block"></div>';
var pointer='<div class="point"></div>';
window.addEventListener('keydown',keypress, false);
function keypress(ev)
{
    switch(ev.keyCode)
        {
            case 38:
                if(course[0]!=1)
                    {
                        course[0]=-1;
                        course[1]=0;
                    }
                break;
            case 39:
                if(course[1]!=-1)
                {
                    course[0]=0;
                    course[1]=1;
                }
                break;
            case 37:
                if(course[1]!=1)
                    {
                        course[0]=0;
                        course[1]=-1;
                    }
                break;
            case 40:
                if(course[0]!=-1)
                    {
                        course[0]=1;
                        course[1]=0;
                    }
                break;
        }
}
function set_point()
{
    while(true)
        {
            var a=Math.floor(Math.random()*14);
            var b=Math.floor(Math.random()*28);
            if(list[a][b]==1)
                {
                    continue;
                }
            list[a][b]=2;
            point_array[0]=a;
            point_array[1]=b;
            point=1;
            break;
        }
}
function snake_move()
{
    var i=snake_array[0][0],j=snake_array[0][1];
    snake_array[0][0]+=course[0];
    snake_array[0][1]+=course[1];
    if(snake_array[0][0]>=14)
        {
            snake_array[0][0]=0;
        }
    if(snake_array[0][1]>=28)
        {
            snake_array[0][1]=0;
        }
    if(snake_array[0][0]<0)
        {
            snake_array[0][0]=13;
        }
    if(snake_array[0][1]<0)
        {
            snake_array[0][1]=27;
        }
    for(var a=1;a<length;a++)
        {
            var i_2=snake_array[a][0];
            var j_2=snake_array[a][1];
            snake_array[a][0]=i;
            snake_array[a][1]=j;
            i=i_2;
            j=j_2;
        }
    for(var a=0;a<length;a++)
        {
            for(var b=a+1;b<length;b++)
                {
                    if(snake_array[b][0]==snake_array[a][0]&&snake_array[b][1]==snake_array[a][1])
                        {
                            document.getElementById(snake_array[b][0]+","+snake_array[b][1]).innerHTML='<div class="block" style=" background-color:#FF0000 !important;"></div>';
                            return 1;
                        }
                }
        }
    return 0;
}
function snake_grow()
{
    snake_array[length][0]=snake_array[length-1][0];
    snake_array[length][1]=snake_array[length-1][1];
    length++;
}
function update()
{
    for(var i=0;i<14;i++)
        {
            for(var j=0;j<28;j++)
                {
                    list[i][j]=0;
                }
        }
    for(var a=0;a<length;a++)
        {
            list[snake_array[a][0]][snake_array[a][1]]=1;
            if((snake_array[a][0]==point_array[0])&&(snake_array[a][1]==point_array[1]))
                {
                    snake_grow();
                    point=0;
                }
        }
    if(point==0)
        {
            set_point();
        }
    else
        {
            list[point_array[0]][point_array[1]]=2;
        }
    for(var i=0;i<14;i++)
        {
            for(var j=0;j<28;j++)
                {
                    if(list[i][j]==0)
                        {
                            document.getElementById(i+','+j).innerHTML="";
                        }
                    if(list[i][j]==1)
                        {
                            document.getElementById(i+','+j).innerHTML=block;
                        }
                    if(list[i][j]==2)
                        {
                            document.getElementById(i+','+j).innerHTML=pointer;
                        }
                }
        }
    document.getElementById("table").innerHTML=""+(length-3);
    if(snake_move()==1)
        {
            document.getElementById("game-area").innerHTML+='<div class="go"><span>Game Over<br/>Twój wynik to :'+(length-3)+'</span><br/><button onclick="reload()">Jescze raz?</button></div>';
            return 0;
        }
    setTimeout("update()",60);
    
}
function start()
{
    var odp="";
    for(var i=0;i<14;i++)
        {
            for(var j=0;j<28;j++)
                {
                    odp+='<div id="'+i+','+j+'"class="pojemnik"></div>';
                }
        }
    document.getElementById("game-area").innerHTML=odp;
    for(var i=0;i<14;i++)
        {
            for(var j=0;j<28;j++)
                {
                    document.getElementById(i+','+j).style.left=(j*50)+'px';
                    document.getElementById(i+','+j).style.top=(i*50)+'px';
                }
        }
    var a=Math.floor(Math.random()*14);
    var b=Math.floor(Math.random()*28);
    list[a][b]=1;
    snake_array[length][0]=a;
    snake_array[length++][1]=b;
    switch(Math.floor(Math.random()*4))
        {
            case 0:
                list[(a+1)%14][b]=1;
                list[(a+2)%14][b]=1;
                snake_array[length][0]=(a+1)%14;
                snake_array[length++][1]=b;
                snake_array[length][0]=(a+2)%14;
                snake_array[length++][1]=b;
                break;
            case 1:
                if(a-1<0)
                    {
                        list[14+(a-1)][b]=1;
                        snake_array[length][0]=14+(a-1);
                        snake_array[length++][1]=b;
                    }
                else
                    {
                        list[a-1][b]=1;
                        snake_array[length][0]=a-1;
                        snake_array[length++][1]=b;
                    }
                if(a-2<0)
                    {
                        list[14+(a-2)][b]=1;
                        snake_array[length][0]=14+(a-2);
                        snake_array[length++][1]=b;
                    }
                else
                    {
                        list[a-2][b]=1;
                        snake_array[length][0]=a-2;
                        snake_array[length++][1]=b;
                    }
                break;
            case 2:
                list[a][(b+1)%28]=1;
                list[a][(b+2)%28]=1;
                snake_array[length][0]=a;
                snake_array[length++][1]=(b+1)%28;
                snake_array[length][0]=a;
                snake_array[length++][1]=(b+2)%28;
                break;
            case 3:
                if(b-1<0)
                    {
                        list[a][28+(b-1)]=1;
                        snake_array[length][0]=a;
                        snake_array[length++][1]=28+(b-1);
                    }
                else
                    {
                        list[a][b-1][0]=1;
                        snake_array[length][0]=a;
                        snake_array[length++][1]=b-1;
                    }
                if(b-2<0)
                    {
                        list[a][28+(b-2)]=1;
                        snake_array[length][0]=a;
                        snake_array[length++][1]=28+(b-2);
                    }
                else
                    {
                        list[a][b-2]=1;
                        snake_array[length][0]=a;
                        snake_array[length++][1]=b-2;
                    }
                break;
                    
        }
    set_point();
    update();
}
function reload()
{
    window.location.reload(false);
}