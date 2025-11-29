import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

function ErrorMessage({ error, imagePreview, onRetry, onBack }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const getErrorMessage = () => {
    if (!error) return t('unknownError');
    
    switch (error.code) {
      case 'NOT_FOOD':
        return t('notFoodError');
      case 'NETWORK_ERROR':
        return t('networkError');
      case 'API_ERROR':
        return t('apiError');
      default:
        return error.message || t('unknownError');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-8 relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      {/* Preview Image (if available) */}
      {imagePreview && (
        <div className="mb-6 w-full max-w-sm">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-2xl shadow-lg opacity-50"
          />
        </div>
      )}

      {/* Error Icon */}
      <div className="text-6xl mb-6">❌</div>

      {/* Error Message */}
      <div className="text-center max-w-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {t('cannotIdentify')}
        </h2>
        <p className="text-gray-600 mb-2">
          {getErrorMessage()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={onRetry}
          className="w-full bg-[#E23744] text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:bg-[#c02e3a] transition-colors"
        >
          {t('retry')}
        </button>
        
        <button
          onClick={onBack}
          className="w-full bg-white text-[#E23744] py-4 px-8 rounded-full font-semibold border-2 border-[#E23744] hover:bg-[#E23744] hover:text-white transition-colors"
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;

