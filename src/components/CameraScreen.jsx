import { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

function CameraScreen({ onImageSelect, onBack }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const compressImage = (file, maxWidth = 1280, quality = 0.75) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          
          // Calculate new dimensions
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = (height / width) * maxWidth;
              width = maxWidth;
            } else {
              width = (width / height) * maxWidth;
              height = maxWidth;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress with quality
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          }, 'image/jpeg', quality);
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(t('invalidImageType'));
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(t('imageTooLarge'));
        return;
      }

      try {
        // Always compress image to reduce size
        const compressedBlob = await compressImage(file, 1280, 0.75);
        const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });
        const preview = URL.createObjectURL(compressedBlob);
        onImageSelect(compressedFile, preview);
      } catch (error) {
        console.error('Error compressing image:', error);
        alert(t('imageProcessingError'));
      }
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert(t('cameraError'));
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Calculate dimensions (max 1280px)
      let width = video.videoWidth;
      let height = video.videoHeight;
      const maxDimension = 1280;
      
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }
      
      // Set canvas size
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, width, height);
      
      // Compress captured image
      canvas.toBlob((blob) => {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        const preview = URL.createObjectURL(blob);
        stopCamera();
        onImageSelect(file, preview);
      }, 'image/jpeg', 0.75);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <button
          onClick={onBack}
          className="text-[#E23744] font-semibold"
        >
          {t('back')}
        </button>
        <h2 className="text-lg font-semibold">{t('captureTitle')}</h2>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Camera View or Upload Area */}
      <div className="flex-1 relative">
        {showCamera ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Camera Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8">
              <div className="flex justify-center items-center gap-6">
                <button
                  onClick={stopCamera}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={capturePhoto}
                  className="bg-white w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                <div className="w-16"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-2">{t('selectFromLibraryTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('selectFromLibrarySubtitle')}</p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#E23744] text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:bg-[#c02e3a] transition-colors"
              >
                {t('selectFromLibrary')}
              </button>
              
              <button
                onClick={startCamera}
                className="bg-white text-[#E23744] py-4 px-8 rounded-full font-semibold border-2 border-[#E23744] hover:bg-[#E23744] hover:text-white transition-colors"
              >
                {t('takeNewPhoto')}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraScreen;

