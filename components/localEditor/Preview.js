import '/styles/components/localEditor/Preview.scss'

Preview.defaultProps={
    code:''
}
function Preview({code}) {
    return <iframe className='iframe' srcDoc={code}></iframe>

}

export default Preview
