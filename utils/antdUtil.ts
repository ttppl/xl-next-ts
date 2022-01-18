export function formatFormData(data: Array<{ name: Array<string>, value: string }>) {
    const tmpData: any = {}
    data?.map?.(d => {
        if (d.name?.length > 0 && d.value) {
            tmpData[d.name[0]] = d.value
        }
    })
    return tmpData
}


export function assignKey(data: Array<any>, columnName: string): Array<any> {
    return data.map(d => {
        const keyedData = {
            key: d[columnName],
            ...d
        }
        if (d.children) {
            keyedData.children = assignKey(d.children, columnName)
        }
        return keyedData
    })
}

export function findItem(data:Array<any>, keyName:string, value:string):any {
    for (const d of data) {
        if (d[keyName] === value) {
            return d
        } else if (d.children) {
            const found = findItem(d.children, keyName,value)
            if (found) return found
        }
    }
    return null
}
