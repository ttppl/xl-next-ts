import {useMemo} from "react";
import {isNumber} from "../../utils/check";

type useSizeCallback = (style: Object) => any
type Size = {
    width?: string
    height?: string
}
 const useSize = ({width, height}) => {
    return useMemo(() => {
        const style: Size = {}
        style.width = isNumber(width) ? `${width}px` : width
        style.height = isNumber(height) ? `${height}px` : height
        return style
    }, [height, width])
}
export default useSize
