const invalidemail= document.getElementById('invalidemail');
const invalidfname= document.getElementById('invalidfname');
const invalidlname= document.getElementById('invalidlname');
const invalidpassword= document.getElementById('invalidpass');
const invalidcpass= document.getElementById('invalidcpass');
const invalidpnum= document.getElementById('invalidpnum');
const invalidimage= document.getElementById('invalidimage');

const phone= document.getElementById('phone');
const email= document.getElementById('email');
const fname= document.getElementById('fname');
const lname= document.getElementById('lname');
const pass= document.getElementById('pass');
const confirmpass= document.getElementById('confirmpass');
const image= document.getElementById('image');
const form=document.getElementById('form');
const formbtn=document.getElementById('formbtn');

const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const passRegex =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
const phoneRegex=/^01[0125][0-9]{8}$/

let isemailvalid,ispassvalid,iscpassvalid,isfnamevalid,islnamevalid,isphonevalid,isimagevalid =false;

const forminputvalue={
    fname:'',
    Lname:'',
    email:'',
    password:'',
    cpassword:'',
    phone:'',
    file:null
}
fname.addEventListener('input', (e) =>
{
    const value=e.target.value;
    if(value.length>10 || value.trim().length ==0  )
    {
        invalidfname.style.display='block';
        fname.style.border= '2px solid red';
        fname.style.borderRadius = '5px';
        isfnamevalid=false;

    }
    else{
        invalidfname.style.display='none';
        isfnamevalid=true;
        forminputvalue.fname=value;
    }
})

lname.addEventListener('input', (e) =>
{
    const value=e.target.value;
    if(value.length>10 || value.trim().length ==0 )
    {
        invalidlname.style.display='block';
        lname.style.border= '2px solid red';
        lname.style.borderRadius = '5px';
        islnamevalid=false;
    }
    else{
        invalidlname.style.display='none';
        islnamevalid=true;
        forminputvalue.Lname=value;
    }
})

email.addEventListener('input', (e) =>
{
    const value=e.target.value;
    if(emailRegex.test(value))
    {
        invalidemail.style.display='none';
        isemailvalid=true;
        forminputvalue.email=value;
    }
    else{
        invalidemail.style.display='block';
        email.style.border='2px solid red';
        email.style.borderRadius = '5px';
        isemailvalid=false;
    }
})


pass.addEventListener('input', (e) =>
{
    const value=e.target.value;
    if(passRegex.test(value) )
    {
        invalidpassword.style.display='none';
        ispassvalid=true;
    }
    else{
        invalidpassword.style.display='block';
        pass.style.border='2px solid red';
        pass.style.borderRadius = '5px';
        ispassvalid=false;
    }
})

confirmpass.addEventListener('input', (e) =>
{
    const value=e.target.value;
    if(passRegex.test(value) && value==pass.value)
    {
        invalidcpass.style.display='none';
        iscpassvalid=true;
        forminputvalue.password=value;
    }
    else{
        invalidcpass.style.display='block';
        confirmpass.style.border='2px solid red';
        confirmpass.style.borderRadius = '5px';
        iscpassvalid=false;
    }
})

phone.addEventListener('input', (e) =>
{
    const value=e.target.value;
    if(phoneRegex.test(value))
    {
        invalidpnum.style.display='none';
        isphonevalid=true;
        forminputvalue.phone=value;
    }
    else{
        invalidpnum.style.display='block';
        phone.style.border='2px solid red';
        phone.style.borderRadius = '5px';
        isphonevalid=false;
    }
})

image.addEventListener('input', (e) =>
{
    const file =e.target.files[0];
    const fileSize =file.size/(1024*1024);
    if(fileSize > 5 || file == null || file == undefined)
    {
        invalidimage.style.display='block';
        image.style.border='2px solid red';
        image.style.borderRadius = '5px';
        isimagevalid=false;
    }
    else{
        invalidimage.style.display='none';
        isimagevalid=true;
        forminputvalue.file=file;
    }
})


formbtn.addEventListener('click', (e) =>
{
    e.preventDefault();
    const token = 'kfjkf';

    const inputs =document.querySelectorAll('input');
    inputs.forEach((input)=>
    {
        if(input.value.trim().length==0);{
            input.style.border='2px solid red';
        }
    })

    if(isemailvalid && isfnamevalid && isfnamevalid && ispassvalid && iscpassvalid && isphonevalid && isimagevalid)
    {
        //form is valid 
        console.log(forminputvalue);

        //send data to back-end
        fetch("url",
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : 'Bearer' +token,
                },
                body: forminputvalue
            }).then((response) =>
            {
            console.log(response);
            })
    }
    else{
        console.log('send is fail');
    }
})

