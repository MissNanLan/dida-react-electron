var schedule = require("node-schedule");  

function test1(){

    let s = schedule.scheduleJob('0 0 14 3 4 *',(f)=>{
        console.log(f)
    })
    // console.log(s.nextInvocation().get())
}
test1()