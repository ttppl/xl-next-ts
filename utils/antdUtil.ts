export function formatFormData(data:Array<{name:Array<string>,value:string}>){
    const tmpData:any = {}
    data?.map?.(d=>{
        if(d.name?.length>0&&d.value){
            tmpData[d.name[0]] = d.value
        }
    })
    return tmpData
}
