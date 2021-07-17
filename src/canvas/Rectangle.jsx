import { Rect, Transformer, Image } from 'react-konva';
import { useRef, useEffect } from 'react';

import useImage from 'use-image';
import { Portal } from 'react-konva-utils';

export const Rectangle = ({ layer, isSelected, onSelect, onChange }) => {
    const imgRef = useRef();
    const rectRef = useRef();
    const trRef = useRef();
    console.log(layer);

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([imgRef.current, rectRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const [image] = useImage(layer.url);

    return (
        <>
            <Image
                image={image}
                onClick={onSelect}
                onTap={onSelect}
                ref={imgRef}
                x={layer.x}
                y={layer.y}
                width={layer.width}
                height={layer.height}
                onDragEnd={(e) => {
                    onChange({
                        ...layer,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}
                onTransformEnd={(e) => {
                    onChange({
                        ...layer,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}

                // onTransformEnd={(e) => {
                //     // transformer is changing scale of the node
                //     // and NOT its width or height
                //     // but in the store we have only width and height
                //     // to match the data better we will reset scale on transform end
                //     const node = imgRef.current;

                //     const scaleX = node.scaleX();
                //     const scaleY = node.scaleY();

                //     const crop = getCrop(node.image(), {
                //         width: node.width() * scaleX,
                //         height: node.height() * scaleY
                //     });
                //     // console.log(crop);
                //     onChange({
                //         // ...crop,
                //         ...layer,
                //         x: node.x(),
                //         y: node.y(),
                //         // set minimal value
                //         width: Math.max(5, node.width() * scaleX),
                //         height: Math.max(node.height() * scaleY)
                //     });
                //     node.scaleX(1);
                //     node.scaleY(1);
                // }}
            />
            {isSelected && (
                <Portal selector=".top-layer" enabled>
                    <Rect
                        x={layer.x}
                        y={layer.y}
                        width={layer.width}
                        height={layer.height}
                        draggable
                        ref={rectRef}
                    ></Rect>
                    <Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            if (newBox.width < 10 || newBox.height < 10) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                </Portal>
            )}
        </>
    );
};

// function getCrop(image, size, clipPosition = 'center-middle') {
//     const width = size.width;
//     const height = size.height;
//     const aspectRatio = width / height;

//     let newWidth;
//     let newHeight;

//     const imageRatio = image.width / image.height;

//     if (aspectRatio >= imageRatio) {
//         newWidth = image.width;
//         newHeight = image.width / aspectRatio;
//     } else {
//         newWidth = image.height * aspectRatio;
//         newHeight = image.height;
//     }

//     let x = 0;
//     let y = 0;
//     if (clipPosition === 'left-top') {
//         x = 0;
//         y = 0;
//     } else if (clipPosition === 'left-middle') {
//         x = 0;
//         y = (image.height - newHeight) / 2;
//     } else if (clipPosition === 'left-bottom') {
//         x = 0;
//         y = image.height - newHeight;
//     } else if (clipPosition === 'center-top') {
//         x = (image.width - newWidth) / 2;
//         y = 0;
//     } else if (clipPosition === 'center-middle') {
//         x = (image.width - newWidth) / 2;
//         y = (image.height - newHeight) / 2;
//     } else if (clipPosition === 'center-bottom') {
//         x = (image.width - newWidth) / 2;
//         y = image.height - newHeight;
//     } else if (clipPosition === 'right-top') {
//         x = image.width - newWidth;
//         y = 0;
//     } else if (clipPosition === 'right-middle') {
//         x = image.width - newWidth;
//         y = (image.height - newHeight) / 2;
//     } else if (clipPosition === 'right-bottom') {
//         x = image.width - newWidth;
//         y = image.height - newHeight;
//     } else if (clipPosition === 'scale') {
//         x = 0;
//         y = 0;
//         newWidth = width;
//         newHeight = height;
//     } else {
//         console.error(new Error('Unknown clip position property - ' + clipPosition));
//     }

//     return {
//         cropX: x,
//         cropY: y,
//         cropWidth: newWidth,
//         cropHeight: newHeight
//     };
// }
