import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

function HomeScreen({ onStartScan }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="text-center max-w-md w-full">
        {/* Logo/Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#E23744] mb-4">
          {t('appName')}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {t('tagline')}
        </p>
        <p className="text-sm text-gray-500 mb-12">
          {t('subtitle')}
        </p>

        {/* CTA Button */}
        <button
          onClick={onStartScan}
          className="w-full bg-[#E23744] text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-[#c02e3a] transition-colors duration-200 transform hover:scale-105 active:scale-95"
        >
          {t('scanButton')}
        </button>

        {/* Instructions */}
        <p className="mt-8 text-sm text-gray-500">
          {t('instruction')}
        </p>

        {/* Sample dishes carousel placeholder */}
        <div className="mt-12 grid grid-cols-3 gap-4 opacity-50">
          <div className="bg-white rounded-lg p-2 shadow-sm text-center text-xs">
            Phở
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm text-center text-xs">
            Bánh Mì
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm text-center text-xs">
            Cà Phê
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;

