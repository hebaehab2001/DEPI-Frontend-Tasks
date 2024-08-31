const inputbox=document.getElementById('input-box');
const listcontainer=document.getElementById('list-container');
const body=document.getElementById('todoapp');

function addtask()
{
    if(inputbox.value =='')
    {
        alert("you must write something!");
    }
    else{
        let li =document.createElement("li");
        li.innerHTML=inputbox.value;
        listcontainer.appendChild(li);
        let span =document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }

    inputbox.value="";
    
}

listcontainer.addEventListener("click",function(e){
    if(e.target.tagName ==="LI")
    {
        e.target.classList.toggle("checked");
        
    }
    else if (e.target.tagName ==="SPAN")
    {
        e.target.parentElement.remove();
        
    } 

    }
,false);

function savedata()
{
    localStorage.setItem("data",listcontainer.innerHTML);
}

function showtask()
{
    listcontainer.innerHTML=localStorage.getItem("data");
}


showtask();
