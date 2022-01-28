export const sleep = (timeountMS:number) => new Promise((resolve) => {
    // console.log('timeBegin')
    setTimeout((e)=>{
        // console.log('timeOut')
        resolve(e)
    }, timeountMS);
});
