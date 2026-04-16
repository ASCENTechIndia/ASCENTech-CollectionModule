import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiService';
import { X, Loader2 } from 'lucide-react';

const ImageViewer = ({ imageCode, onClose }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageCode) {
      fetchImage();
    }
  }, [imageCode]);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/transactionReports/getImage?imageCode=${imageCode}`);
      if (res?.data?.success && res?.data?.data) {
        // Convert base64 to image data URL
        setImageSrc(`data:image/png;base64,${res.data.data}`);
      } else {
        alert('Failed to load image');
      }
    } catch (err) {
      console.error(err);
      alert('Error loading image');
    } finally {
      setLoading(false);
    }
  };

  if (!imageCode) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Image Preview</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : (
          <img src={imageSrc} alt="Preview" className="max-w-full h-auto" />
        )}
      </div>
    </div>
  );
};

export default ImageViewer;