var inputDate=document.getElementById('bday-input');

var btn=document.getElementById('submit');
var output=document.getElementById('outbox');


// var para=document.getElementById('#Abdul');
btn.addEventListener('click',clickHandle);

function clickHandle(e){
    output.innerHTML="";
    var message="";
    var bdaystr=inputDate.value;
    if(bdaystr!=''){
        var arrayDate=bdaystr.split('-');
        var date={
            day:Number(arrayDate[2]),
            month:Number(arrayDate[1]),
            year:Number(arrayDate[0])
        };
        if(checkPallindromeForAllFormat(date)===true){
             message="Yeah!! Your Birthdate is Pallindrome 😀😀";
             showOutput(message);
        }
        else{
            var next=getNextPallindrome(date);
            var prev=getPrevPallindrome(date);
            var nearest;
            var nearest;
            console.log(next);
            console.log(prev);

            if(Number(next[0])>Number(prev[0])){
                nearest=prev[1];
                nearestDay=prev[0];
                showOutput(message);
            }
            else{
                nearest=next[1];
                nearestDay=next[0];
            }
            console.log(nearest);

            message=`No It's not a pallindrome, But the nearest pallindrome ${nearest.day} - ${nearest.month} - ${nearest.year} . you missed it by ${nearestDay} days ! 😞😟`;

            var m1=`Nearest Next Pallindrome is in ${next[0]} on ${next[1].day} ,  ${next[1].month}, ${next[1].year}`;
            var m2=`Nearest prev Pallindrome is in ${prev[0]} on ${prev[1].day} ,  ${prev[1].month}, ${prev[1].year}`
            showOutput(message);
            showOutput(m1);
            showOutput(m2);
        }

    }
} 

function showOutput(message){
    var para = document.createElement("div");
    para.innerHTML=message;
    output.append(para);
}







//reverse and chk for pallindrome...........

function isPallindrome(str){
    var revstr= str.split('').reverse().join('');
    return (str===revstr)

}

function dateToString(date){
    var dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day="0"+date.day;
    }
    else{
        dateStr.day=date.day.toString();

    }
    if(date.month<10){
        dateStr.month="0"+date.month;
    }
    else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();

    return dateStr;
}
function getAllDateFormat(date){
    var dateStr=dateToString(date);
    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];

}

function checkPallindromeForAllFormat(date){
    var listOfPallindromes=getAllDateFormat(date);
    var is_Pallindrome=false;
    for(var i=0;i<listOfPallindromes.length;i++){
        if(isPallindrome(listOfPallindromes[i])===true){
            is_Pallindrome=true;
            break;
        }
    }
    
    return is_Pallindrome;


}

// console.log(checkPallindromeForAllFormat(date));

//find next pallindrome date and days in between

function getNextPallindrome(date){
    var count=0;
    var nextDate=getNextDate(date);
    while(1){
        count++;
        if(checkPallindromeForAllFormat(nextDate)){
           break;
        }
        nextDate=getNextDate(nextDate);
    }
    return [count,nextDate];
}

function getPrevDate(date){
    var day=date.day-1;
    var month=date.month;
    var year=date.year;
    var dayInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(day<1){
        if(month==3){
            if(isLeapYear(year)){
                day=29;
                month=2;
            }
            else{
                month=2;
                day=28;
            }
        }
        else{
            day=dayInMonth[date.month-2];
            month--;
        }
        

    }
    if(month<1){
        day=31;
        month=1;
        year--;
    }

    return {day:day,month:month,year:year};
}



function getPrevPallindrome(date){
    var ctr=0;
    var prevDate=getPrevDate(date);
    while(1){
        ctr++;
        if(checkPallindromeForAllFormat(prevDate)){
            break;
        }
        prevDate=getPrevDate(prevDate);
    }
    return [ctr,prevDate];

}

function isLeapYear(year){
    if(year%400==0){
        return true;
    }
    if(year%100===0){
        return false
    }
    if(year%4===0){
        return true;
    }
    return false;
    
}

function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;
    var dayInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 2){ //check if month is feb
        //check for leap  year
        if(isLeapYear(year)){
            if(day===30){
                day=1;
                month=3;
            }

        }
        else{
            if(day===29){
                day=1;
                month=3;
            }

        }

    }
    else{
        if(day>dayInMonth[date.month-1]){ // check days in month
            day=1;
            month=month+1;
        }
    }

    if(month>=12){
// chk month is more than 12
        month=1;
        year++;
    }

    return {
        day:day,month:month,year:year
    };
}


