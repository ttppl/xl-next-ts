import {isFunction, isObject, isString} from "./check";

export const sleep = (timeountMS:number) => new Promise((resolve) => {
    // console.log('timeBegin')
    setTimeout((e)=>{
        // console.log('timeOut')
        resolve(e)
    }, timeountMS);
});

type ClassType = Array<ClassType>|string|object

export const getClass=(className:ClassType):string=>{
    const classNames:Array<string> = []
    if(isString(className)){
        classNames.push(className as string)
    }
    if(Array.isArray(className)){
        className.forEach(classNameItem=>classNames.push(getClass(classNameItem)))
    }
    if(isObject(className)){
        Object.keys(className).forEach(key=>{
            if((className as any)[key]){
                classNames.push(key)
            }
        })
    }
    return classNames.join(' ')
}


export function asyncDownloadFile(url: string, options?: {
    fileName:string,
    onProgress?: (progress: number) => void
}) {
    return new Promise((resolve, reject) => {
        url = url.replace(/\\/g, '/');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url), true);
        xhr.responseType = 'blob';
        // xhr.withCredentials = true;
        xhr.onload = () => {
            if (xhr.status === 200) {
                // 获取文件blob数据并保存
                const fileName = options?.fileName||getFileName(url);
                saveAs(xhr.response, fileName);
                resolve(true)
            } else {
                reject()
            }
        };
        if (isFunction(options?.onProgress)) {
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    const percentComplete = evt.loaded / evt.total;
                    (options?.onProgress as Function)(percentComplete)
                }
            }, false)
            xhr.send();
        }
    })
}

/**
 * URL方式保存文件到本地
 * @param data 文件的blob数据
 * @param name 文件名
 */
function saveAs(data: BlobPart, name: string) {
    const urlObject = window.URL || window.webkitURL || window;
    const export_blob = new Blob([data]);
    downloadFile(urlObject.createObjectURL(export_blob), name)
}

export const downloadFile = (url: string, name: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', name);
    a.click();
}

/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
function getFileName(url: string) {
    const num = url.lastIndexOf('/') + 1;
    let fileName = url.substring(num);
    //把参数和文件名分割开
    fileName = decodeURI(fileName.split("?")[0]);
    return fileName;
}
