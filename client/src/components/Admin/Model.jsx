// Model.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Model() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/images');
                setImages(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Images</h2>
            <div>
                {images.map((image, index) => (
                    <img key={index} src={`http://localhost:5555/uploads/${image.slipImage}`} alt={`Image ${index}`} />
                ))}
            </div>
        </div>
    );
}

export default Model;