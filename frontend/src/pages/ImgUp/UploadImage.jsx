import React, { useState } from "react";
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const UploadImage = () => {
    const [uploadedData, setUploadedData] = useState('');

    const handleUpload = async (files) => {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append("file", file);
            formData.append("upload_preset", "c1xbmqbk");

            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dvusaqmma/image/upload", formData);

                // Xây dựng dữ liệu sản phẩm
                const productData = {
                    // productId: "65d7680576b8ec22c2d7c5bf",
                    // productVariantId: "65d7bdbdc7282e8d2f8dea9d",
                    image: [response.data.url], // Sử dụng URL ảnh tải lên từ Cloudinary
                };

                // Gọi API tạo sản phẩm
                const updateProductResponse = await axios.put
                (`http://localhost:5000/api/v1/product/65d7b819c7282e8d2f8de9fc/update`, productData);

                // Xử lý kết quả từ việc tạo sản phẩm
                console.log("Created product:", updateProductResponse.data);

                // Cập nhật state hoặc hiển thị thông báo nếu cần
                setUploadedData(prevData => prevData + response.data.url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const files = e.target.form.elements["files[]"].files;
        handleUpload(files);
    };

    const createProductVariant = async (imageUrl) => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/productVariant/create", {
                imageUrl: imageUrl
                // Thêm các thông tin khác của productVariant tại đây nếu cần
            });
            console.log("Created product variant:", response.data);
        } catch (error) {
            console.error('Error creating product variant:', error);
        }
    };

    return (
        <Card>
            <Form>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Choose multiple files to upload:</Form.Label>
                    <Form.Control type="file" name="files[]" multiple />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Upload Files
                </Button>
            </Form>
            <div id="data">{uploadedData}</div>
        </Card>
    );
};

export default UploadImage;
