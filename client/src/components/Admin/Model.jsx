import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import NavbarSidebar from './NavbarSidebar'; 
import './Model.css';

function Model() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const formatDate = (dateString) => {
        
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavbarSidebar /> 
            <table className="image-grid">
                <tbody>
                    {images.map((image, index) => (
                        <tr key={index} className="image-item">
                            <td>
                                <p>Port Number: {image.portNumber}</p>
                                <p>Upload Date: {formatDate(image.uploadDateTime)}</p> 
                            </td>
                            <td>
                                <button onClick={() => openModal(image)}>View Image</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <ReactModal
                    isOpen={selectedImage !== null}
                    onRequestClose={closeModal}
                >
                    {selectedImage && (
                        <div>
                            <img className="image-popup" src={`http://localhost:5555/${selectedImage.slipImage}`} alt={`Selected Image`} />
                            <button onClick={closeModal}>Close</button>
                        </div>
                    )}
                </ReactModal>
            </table>
        </div>
    );
}

export default Model;
