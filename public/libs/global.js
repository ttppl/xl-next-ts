
// console.log('set global vars...')

window.runXlScript = function (e) {
    const code = e.target.getElementsByTagName('textarea')[0].value
    const container = e.target.parentNode.lastChild
    // container.innerHTML = code
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://www.ttppl.xyz:5000/runScript' );
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({script:code}));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const res = JSON.parse(xhr.responseText)
            if(res.success){
                let output = ''
                res.data.map((column)=>{
                    output+=(JSON.stringify(column)+'<br>')
                })
                container.innerHTML = output
            }else {
                container.innerHTML = JSON.stringify(res.msg)
            }
        }
    };
}
window.clearXlScriptOutput = function (e) {
    e.target.parentNode.lastChild.innerHTML = ''
}