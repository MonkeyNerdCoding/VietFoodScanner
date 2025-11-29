import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

function LoadingScreen({ imageFile, imagePreview, onResult, onError }) {
  const { language, currentLanguage } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [loadingText, setLoadingText] = useState(t('analyzing'));

  useEffect(() => {
    const identifyFood = async () => {
      try {
        // Convert image to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Image = e.target.result;
          
          // Update loading text
          setLoadingText(t('sendingToAI'));
          
          // Call API
          const response = await fetch('/api/identify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64Image,
              language: currentLanguage.apiCode
            })
          });

          setLoadingText(t('processingResult'));
          
          const data = await response.json();
          
          if (data.success) {
            onResult(data.data);
          } else {
            onError(data.error);
          }
        };
        
        reader.readAsDataURL(imageFile);
      } catch (error) {
        console.error('Error identifying food:', error);
        onError({
          code: 'NETWORK_ERROR',
          message: t('networkError')
        });
      }
    };

    identifyFood();
  }, [imageFile, onResult, onError]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-8">
      {/* Preview Image */}
      {imagePreview && (
        <div className="mb-8 w-full max-w-sm">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Loading Animation */}
      <div className="text-center">
        <div className="relative mb-8">
          {/* Animated pho bowl */}
          <div className="text-8xl animate-bounce">🍜</div>
          {/* Steam animation */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="text-4xl opacity-50 animate-pulse">💨</div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xl font-semibold text-gray-700 mb-2">
          {loadingText}
        </p>
        <p className="text-sm text-gray-500">
          {t('pleaseWait')}
        </p>

        {/* Loading Spinner */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#E23744] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;

