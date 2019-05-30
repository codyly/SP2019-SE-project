import React from 'react';
import ReactDOM from 'react-dom';
import { service } from '../main.js';
import { m, s, u, a} from '../../index.js'
import Button from 'react-bootstrap/Button';
import { user, AdminUser } from '../../objects/users.js';
import { Stock } from '../../objects/stock.js';

export var per = [ 
    {username:'a', authority:'3'}, 
    {username:'sumsung', authority: '4'}
    ]; 
    
export var page_set = [];
var firstTime = 0;
export class AboutText extends React.Component{
    
    componentDidMount() {
        if(firstTime===0){
            Onload(0,9);
            firstTime =1;
        }
    }

    render(){
    return (<div class="mainframe"style={{padding:"1px 16px",height:"1000px"}}>
    
    <h1 class="text-center">账户管理</h1>

        <table class="table table-striped" id='managertable'>
        <tbody>
        <tr>
        <th>用户名</th>
        <th>用户权限</th>
        <th>管理操作</th>
        </tr>
        </tbody>
        </table>
        <br/>
        <div class="container col-md-4 col-md-offset-4" >
        <ul class="pagination " >
        <li><a class="inactive" href="javascript:void(0)" id="pre" onClick={Pagechange.bind(this,"pre")}>«</a></li>
        <li><a class="active" href="javascript:void(0)"   id="page-1" onClick={Pagechange.bind(this,"page-1")}>1</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="page-2" onClick={Pagechange.bind(this,"page-2")}>2</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="page-3" onClick={Pagechange.bind(this,"page-3")}>3</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="page-4" onClick={Pagechange.bind(this,"page-4")}>4</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="page-5" onClick={Pagechange.bind(this,"page-5")}>5</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="page-6" onClick={Pagechange.bind(this,"page-6")}>6</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="page-7" onClick={Pagechange.bind(this,"page-7")}>7</a></li>
        <li><a class="inactive" href="javascript:void(0)" id="next" onClick={Pagechange.bind(this,"next")}>»</a></li>
        </ul>
        </div>
        <br/>

    <div class="container col-md-12 col-md-pull-1">
    <form class="form-horizontal" role="form">
    <div class="form-group">
		<label for="lastname" class="col-md-2 control-label">按用户名搜索</label>
		<div class="container col-md-10">
            <div class="container col-md-10">
			<input type="text" class="form-control col-md-10" id="searchname" placeholder="请输入用户名" name="Searname"></input>
            </div>
            <div class="form-group container col-md-2">
			<button type="button" class="btn btn-default" onClick={search.bind(this, "username")}>搜索</button>
		    </div>
		</div></div></form>
	</div>
  <div class="container col-md-12 col-md-pull-1">
    <form class="form-horizontal" role="form">
    <div class="form-group">
		<label for="lastname" class="col-md-2 control-label">新增用户</label>
		<div class="container col-md-10">
            <div class="form-group container col-md-1" style={{"display": "inline-block"}}>
              <label style={{"paddingTop": "0.7vh"}}>用户名:</label>
            </div>
            <div class="form-group container col-md-3" style={{"display": "inline-block"}}>
               <input type="text" class="form-control col-md-2" id="Newname" placeholder="请输入用户名" name="Newname"></input>
            </div>
            <div class="form-group container col-md-1" style={{"display": "inline-block"}}>
              <label style={{"paddingTop": "0.7vh", "paddingLeft":"0.7vw"}}>权限:</label>     
            </div>
            <div class="form-group container col-md-3" style={{"display": "inline-block"}}>
              <input type="text" class="form-control col-md-2" id="Newauth" placeholder="请输入用户权限" name="Newauth"></input>
            </div>
            <div class="form-group container col-md-2">
			        <button type="button" class="btn btn-default" onClick={add_account.bind(this)} style={{"marginLeft":"0.7vw"}}>添加用户</button>
		        </div>
		</div></div></form>
	</div>
  </div>);
  }
}

function add_account(event){
    var new_username = document.getElementById('Newname').value;
    var new_auth = parseInt(document.getElementById('Newauth').value);
    if(new_username.length === 0){
        alert("account name cannot be empty!");
    }
    else if(new_username.length > 20){
        alert("invalid username(len<20)");
    }
    else if(new_auth < 2 || new_auth > 10){
        alert("invalid authority weight! range from 2-10");
    }
    else{
        user.add_account(new_username, new_auth);
    }
}

function search(method,event){
    if(firstTime<=2){
        if(method === "username"){
            var string = document.getElementById("searchname").value;
            var new_string = "%";
            for(var i=0;i<string.length;i++){
                new_string += string.charAt(i);
                new_string += "%";
            }
            console.log(new_string);
            user.search_user("username", new_string);
        }
    }
}

function reset_password(id, event){
    var row=document.getElementById(id);
    var user_name = row.childNodes[0].innerHTML;
    var user_auth = row.childNodes[1].innerHTML;
    var selected_user = new AdminUser(user_name, user_auth);
    user.reset_user_pwd(user_name);
}

function Pagechange(location,event){
    user.load_all_stock();  
    var capcity=10;
    var destpage=document.getElementById(location).innerHTML;
    if(location=='pre')
    {
        destpage=document.getElementById('page-4').innerHTML;
        destpage=parseInt(destpage)-7;
        if(destpage<=4) destpage=4;
        Setmiddle(destpage);
    }
    else if(location=='next')
    {
        destpage=document.getElementById('page-4').innerHTML;
        destpage=parseInt(destpage)+7;
        Setmiddle(destpage);
    }
    else
    {
        Unload();
        Onload((destpage-1)*capcity,destpage*capcity-1);
        Setmiddle(destpage);
    }

}

export function UpdatePage(page){
    Setmiddle(page);
}

function Setmiddle(page)
{
    var max_page = parseInt(per.length / 10) + 1;
    var convert=new Array('pre','page-1','page-2','page-3','page-4','page-5','page-6','page-7','next');
    page=parseInt(page);
    if(page>=4)
    {
        var over_page = false;
        var head = 'page-';
        var base = page - 4;
        Setactive(convert[4]);
        for(var i=1;i<=7;i+=1){
            document.getElementById(head + i.toString()).innerHTML = base + i;
            if(base + i>max_page){
                document.getElementById(head + i.toString()).style.display = "none";
                over_page = true;
            }else{
                document.getElementById(head + i.toString()).style.display = "inline";
            }
        }
        if(over_page){
            document.getElementById("next").style.display = "none";
        }else{
            document.getElementById("next").style.display = "inline";
        }
    }
    else
    {
        var over_page = false;
        var head = 'page-';
        Setactive(convert[page]);
        for(var i=1;i<=7;i+=1){
            document.getElementById(head + i.toString()).innerHTML = i;
            if(i>max_page){
                document.getElementById(head + i.toString()).style.display = "none";
                over_page = true;
            }else{
                document.getElementById(head + i.toString()).style.display = "inline";
            }
        }
        if(over_page){
            document.getElementById("next").style.display = "none";
        }else{
            document.getElementById("next").style.display = "inline";
        }
    }
}


function Setactive(location)
{
    for(var i = 1; i<=7; i++){
        document.getElementById('page-'+i.toString()).setAttribute('class','inactive');
    }

    document.getElementById(location).setAttribute('class','active');
}

function getDataRow(s,i){ 
    var row = document.createElement('tr'); //创建行 
    //(i%2)==0?row.setAttribute('class','alt'):row.setAttribute('class','noalt');
    row.setAttribute('id','managerrow'+i);
    var nameCell = document.createElement('td'); //创建第一列name
    nameCell.innerHTML = s.username; //填充数据 
    row.appendChild(nameCell); //加入行 ，下面类似 
    var idCell = document.createElement('td');//创建第二列id
    idCell.innerHTML = s.authority; 
    row.appendChild(idCell); 
    var btnCell = document.createElement('td');//创建第四列，操作列 
    row.appendChild(btnCell); 
    var btndetail = document.createElement('button'); 
    btndetail.setAttribute('class',"btn btn-primary");
    btndetail.innerHTML='更改权限';//8 restart
    //删除操作 
    btndetail.onclick=modify.bind(this,'managerrow'+i,"auth",i);
    btnCell.appendChild(btndetail); //把删除按钮加入td，别忘 
    var btndetail2 = document.createElement('button'); 
    btndetail2.setAttribute('class',"btn btn-primary");
    btndetail2.style.marginLeft = "3vw";
    btndetail2.innerHTML='重置密码';//8 restart
    //删除操作 
    btndetail2.onclick=reset_password.bind(this,'managerrow'+i,i);
    btnCell.appendChild(btndetail2); //把删除按钮加入td，别忘 
    return row; //返回tr数据   
}

function modify(id,type,num,event){
  var v=prompt("输入数值");
  var row=document.getElementById(id);
  var username = row.childNodes[0].innerText;
  if(type==='auth')
  {
      if(v===null){
          v = row.childNodes[1].innerHTML;
      }
      row.childNodes[1].innerHTML=v+' ';
      user.modify_auth(username, parseInt(v));
  }
}
    function Onload(start,end){ //显示 start<=i<=end   每页10个  0-9  10-19  
         var tbody = document.getElementById('managertable').childNodes[0]; 
         console.log(per);
         for(var i = start;(i < per.length)&&(i<=end); i++){ //遍历一下json数据 
           var trow = getDataRow(per[i],i); //定义一个方法,返回tr数据 
           tbody.appendChild(trow); 
        }
        }

    function Unload(){ 
        var tbody = document.getElementById('managertable').childNodes[0]; 
        var childs = tbody.childNodes; 
        for(var i = childs .length - 1; i >= 1; i--) {
        tbody.removeChild(childs[i]);
        }
    }

export function SetPer_user(data){
    per = data;
    if(firstTime){
        Unload();
        Onload(0,9);
        Pagechange("page-1");
    }
}
