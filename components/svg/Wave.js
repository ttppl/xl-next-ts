import {useCallback} from "react";

function getCurves(start, gap, height, count) {
    const curves = []
    for (let i = 0; i < count; i++) {
        curves.push(`T ${start + gap * i} ${height}`)
    }
    return curves.join(' ')
}

function Wave({height, color, width, waveCount,className}) {
    const generatePath = useCallback((curvature, gap) => {
        const start = `M 0 ${height}`
        const curve = `Q 100 ${curvature.toFixed(1)}, ${gap} ${height}`
        const curveCount = Math.ceil(width / gap)
        const curves = getCurves(gap * 2, gap, height, curveCount)
        const end = 'V 0 H 0'
        return [start, curve, curves, end].join(' ')

    }, [height])

    const getAnimation = (gap, duration) => {
        return <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to={gap * -2}
                                 dur={`${duration}s`} repeatCount="indefinite"/>
    }

    const getWaves = useCallback((count = 5) => {
        const waveArray = []
        for (let i = 0; i < count; i++) {
            const gap = 200 + (i * 200 / count)
            const curvature = Math.random() * (height / 2)
            waveArray.push(<g fill={color} fillOpacity={Math.random() * 0.1 + 0.1} key={i}>
                <path
                    d={generatePath(curvature, gap)}
                    transform={`translate(${Math.random() * 20},0)`}
                />
                {getAnimation(gap, Math.random() * 2 + 1)}
            </g>)
        }
        return waveArray
    }, [color])
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            className={className}
        >
            {getWaves(waveCount || 5)}
        </svg>
    );
}

export default Wave
