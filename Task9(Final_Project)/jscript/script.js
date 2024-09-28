
/*actions*/ 
let toggle = document.querySelector(".toggle");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let close = document.querySelector(".close");
let body = document.querySelector("body");  
toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        left.classList.toggle("active");
        right.classList.toggle("overlay");
        body.style.overflow = "hidden";
    });
close.onclick = () => {
        toggle.classList.remove("active");
        left.classList.remove("active");
        right.classList.remove("overlay");
        body.style.overflow = "";
    };
window.onclick = (e) => {
    if (e.target == right) {
        toggle.classList.remove("active");
        left.classList.remove("active");
        right.classList.remove("overlay");
        body.style.overflow = "";
        }
    };
/*dashboard nav*/


const navItems=document.querySelectorAll('.nav-item');
const navItem1 = document.getElementById('nav-item-1');
const navItem2 = document.getElementById('nav-item-2');
const navItem3 = document.getElementById('nav-item-3');
const dashboardSection1 = document.getElementById('section1');
const dashboardSection2 = document.getElementById('section2');
const dashboardSections =document.querySelectorAll('.dashboardSections');


navItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetSectionId  = item.dataset.section;;
    dashboardSections.forEach(section => {
      section.style.display = 'none';
    });
    const targetSection = document.getElementById(targetSectionId);
     if (targetSection==navItem1) {
      dashboardSection1.style.display = 'block';
     }
     else if(targetSection==navItem2)
     {
      dashboardSection2.style.display = 'block';
     }
     
  });
});


/*calendar*/
const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const inputbox=document.getElementById('input-box');
const tasklistcontainer=document.getElementById('list-container');
const todobody=document.getElementById('todoapp');
const addbtn=document.getElementById('addbtntask');


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];




let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
var selectedDate;
let events = {};
let eventList =[];
let inputvalue='';


function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'today day'
        : 'day';
    let sdate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    datesHtml += `<li class="${className}" data-date="${sdate}">${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
  fulldate=`${date|month|year}`.toString();
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();





function savedata(assigndate,taskname)
{
  
  let d=`${assigndate}`;

      // Check if the date already exists in the events object
  if (events[d]) {
    // If it exists, append the new task to the existing array
    events[d].push(taskname);
  } else {
    // If it doesn't exist, create a new array and add the task
    events[d] = [taskname];
  }
   console.log(events);
}

document.querySelectorAll('.day').forEach(sday => {
          sday.addEventListener('click', (e) => {
            console.log('Element clicked!');
              selectedDate = e.target.getAttribute('data-date');
              showEvents( selectedDate);
              // Remove previous selected date style 
              document.querySelectorAll(".day.selected").forEach(selectedDay => {
                selectedDay.classList.remove('selected');
              });
              
              // Add background style to the clicked date
              e.target.classList.add('selected'); // Replace 'selected' with your desired class name
            });
          });

function showEvents(seldate) {
  console.log(seldate)
      eventList = events[seldate] || [] ;
      console.log(eventList);
      tasklistcontainer.innerHTML = "";
      if (eventList.length > 0) {
        eventList.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            tasklistcontainer.appendChild(li);
            let span =document.createElement("span");
              span.innerHTML="\u00d7";
              li.appendChild(span);
        });
      }
      else {
            tasklistcontainer.innerHTML = "<li>No events for this day</li>";
      }
      
  }
addbtn.addEventListener("click", (e) =>
       { 
        inputvalue=inputbox.value;
          if(inputvalue =='')
          {
            alert("you must write something to add!");
          }
          else
          {
            const li = document.createElement('li');
            li.textContent = inputbox.value;
            tasklistcontainer.appendChild(li);
            tasklistcontainer.style.height="40%"
            let span =document.createElement("span");
              span.innerHTML="\u00d7";
              li.appendChild(span);
              showEvents(selectedDate);
              savedata(selectedDate,inputvalue);
          }
          inputbox.value="";
        }); 

tasklistcontainer.addEventListener("click",function(e){
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