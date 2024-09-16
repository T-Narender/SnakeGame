const endDate=new Date("29 oct,2024 24:00:00").getTime();
const startDate=new Date().getTime();

let x=setInterval(function updateTime(){
    const now=new Date().getTime();
    const distanceCovered=now-startDate;
    const distancePending=endDate-now;


    const oneDayInMills=(24*60*60*1000);
    const oneHourInMills=(60*60*1000);
    const oneMinuteInMills=(60*1000);
    const oneSecondInMills=(1000);
    const days=Math.floor(distancePending/(oneDayInMills));
    const hrs=Math.floor((distancePending%(oneDayInMills)/(oneHourInMills)));
    const mins=Math.floor((distancePending%(oneHourInMills))/(oneMinuteInMills));
    const secs=Math.floor((distancePending%(oneMinuteInMills))/(oneSecondInMills));

    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hrs;
    document.getElementById("minutes").innerHTML=mins;
    document.getElementById("seconds").innerHTML=secs; 
    const totalDistance=endDate-startDate;
    const percentageDist=(distanceCovered/totalDistance)*100;

    document.getElementById("progress-bar").style.width=percentageDist+"%";

    if(distancePending<0){
        clearInterval(x);
        document.getElementsByClassName("countdown").innerHTML="EXPRIRED";
        document.getElementById("progress-bar").style.width="100%";
    }
}
, 1000)
// setInterval(updateTime,1000);