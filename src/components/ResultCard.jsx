import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

function ResultCard({ result, imagePreview, onScanAnother }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  if (!result) return null;

  const getSpiceLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'hot':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'mild':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpiceLevelText = (level) => {
    switch (level?.toLowerCase()) {
      case 'hot':
        return t('hot');
      case 'medium':
        return t('medium');
      case 'mild':
        return t('mild');
      default:
        return t('notSpicy');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-8 px-4 relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Hero Image */}
        {imagePreview && (
          <div className="mb-6">
            <img
              src={imagePreview}
              alt={result.name?.english || 'Food'}
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Name Section */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#E23744] mb-2">
              {result.name?.vietnamese || 'Món ăn'}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-2">
              {result.name?.english || 'Vietnamese Dish'}
            </h2>
            {result.name?.pronunciation && (
              <p className="text-gray-500 italic">
                {t('pronunciation')}: {result.name.pronunciation}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Description */}
          {result.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('description')}</h3>
              <p className="text-gray-600 leading-relaxed">{result.description}</p>
            </div>
          )}

          {/* Ingredients */}
          {result.ingredients && result.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('ingredients')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {result.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-[#FFF8F0] px-3 py-2 rounded-lg text-sm text-gray-700"
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Calories */}
            {result.calories && (
              <div className="bg-[#FFF8F0] p-4 rounded-xl">
                <div className="text-sm text-gray-500 mb-1">{t('calories')}</div>
                <div className="text-2xl font-bold text-[#E23744]">
                  {result.calories.estimate || result.calories.range || 'N/A'}
                </div>
                {result.calories.range && (
                  <div className="text-xs text-gray-500 mt-1">
                    {result.calories.range}
                  </div>
                )}
              </div>
            )}

            {/* Spice Level */}
            {result.spiceLevel && (
              <div className="bg-[#FFF8F0] p-4 rounded-xl">
                <div className="text-sm text-gray-500 mb-1">{t('spiceLevel')}</div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${getSpiceLevelColor(result.spiceLevel)}`}>
                  {getSpiceLevelText(result.spiceLevel)}
                </div>
              </div>
            )}
          </div>

          {/* Allergens */}
          {result.allergens && result.allergens.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('allergens')}</h3>
              <div className="flex flex-wrap gap-2">
                {result.allergens.map((allergen, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Note */}
          {result.culturalNote && (
            <div className="mb-6 p-4 bg-[#2D5A27]/10 rounded-xl border-l-4 border-[#2D5A27]">
              <h3 className="text-sm font-semibold text-[#2D5A27] mb-2">{t('culturalNote')}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{result.culturalNote}</p>
            </div>
          )}

          {/* Confidence */}
          {result.confidence && (
            <div className="text-xs text-gray-400 mb-6 text-center">
              {t('confidence')}: {Math.round(result.confidence * 100)}%
            </div>
          )}

          {/* Scan Another Button */}
          <button
            onClick={onScanAnother}
            className="w-full bg-[#E23744] text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-[#c02e3a] transition-colors duration-200"
          >
            {t('scanAnother')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;

