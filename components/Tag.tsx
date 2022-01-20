import '/styles/components/Tag.scss'
function Tag({name,color}:any) {
    return <div className='xl-blog-tag' style={color}>{name}</div>
}

export  default Tag
