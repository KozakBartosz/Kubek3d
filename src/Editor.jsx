import { useRef, useState, useEffect } from 'react'
import { Image, Layer, Stage } from 'react-konva'
import useImage from 'use-image'
import View3d from './3d/View3d'
import { Rectangle } from './canvas/Rectangle'

export default function Editor({ initialLayers, bgUrl, modelUrl }) {
    const stageRef = useRef(null)

    const [textureUrl, setTextureUrl] = useState(null)

    const [rectangles, setRectangles] = useState(initialLayers)
    const [selectedMode, setSelectedMode] = useState(true)

    const [image] = useImage(bgUrl, 'anonymous')

    useEffect(() => {
        setRectangles(initialLayers)
    }, [initialLayers])

    return (
        <>
            <button
                onClick={() => {
                    const uri = stageRef.current.toDataURL()
                    setTextureUrl(uri)
                }}
            >
                Zapisz
            </button>

            <View3d textureUrl={textureUrl} modelUrl={modelUrl} />

            <Stage
                width={1025}
                height={308}
                onMouseDown={() => setSelectedMode(true)}
                onTouchStart={() => setSelectedMode(true)}
                style={{
                    border: '5px solid #ccc',
                    margin: '10px auto',
                    width: '100%',
                    maxWidth: 1025,
                }}
            >
                <Layer ref={stageRef}>
                    {rectangles.map((rect, i) => {
                        return (
                            <Rectangle
                                key={i}
                                layer={rect}
                                isSelected={selectedMode}
                                onChange={(newAttrs) => {
                                    const rects = rectangles.slice()
                                    rects[i] = newAttrs
                                    setRectangles(rects)
                                    const uri = stageRef.current.toDataURL()
                                    setTextureUrl(uri)
                                }}
                            />
                        )
                    })}
                    <Image image={image} width={1025} height={308} />
                </Layer>
                <Layer name="top-layer" />
            </Stage>
        </>
    )
}
