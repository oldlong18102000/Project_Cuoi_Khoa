import React, { useState, useEffect } from "react";

const ImageUpLoad = (props) => {
    const { setIma, Ima } = props;
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    function onImageChange(e) {
        console.log("e", e.target.files)
        setImages([...e.target.files]);
        setIma([e.target.files]);
    }

    return (
        <>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />
            <div style={{ display: 'flex', gap: 8 }}>
                {imageURLS.map((imageSrc, index) => (
                    <img src={imageSrc} key={index} alt="not fount" id="previewImage" />
                ))}
            </div>
        </>
    );
};

export default ImageUpLoad;