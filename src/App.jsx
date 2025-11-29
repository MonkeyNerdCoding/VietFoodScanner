import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultCard from './components/ResultCard';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [screen, setScreen] = useState('home'); // home, camera, loading, result, error
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = (file, preview) => {
    setImageFile(file);
    setImagePreview(preview);
    setScreen('loading');
    setError(null);
  };

  const handleResult = (data) => {
    setResult(data);
    setScreen('result');
  };

  const handleError = (errorData) => {
    setError(errorData);
    setScreen('error');
  };

  const handleScanAnother = () => {
    setScreen('home');
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {screen === 'home' && (
        <HomeScreen onStartScan={() => setScreen('camera')} />
      )}
      
      {screen === 'camera' && (
        <CameraScreen
          onImageSelect={handleImageSelect}
          onBack={() => setScreen('home')}
        />
      )}
      
      {screen === 'loading' && (
        <LoadingScreen
          imageFile={imageFile}
          imagePreview={imagePreview}
          onResult={handleResult}
          onError={handleError}
        />
      )}
      
      {screen === 'result' && (
        <ResultCard
          result={result}
          imagePreview={imagePreview}
          onScanAnother={handleScanAnother}
        />
      )}
      
      {screen === 'error' && (
        <ErrorMessage
          error={error}
          imagePreview={imagePreview}
          onRetry={() => setScreen('camera')}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  );
}

export default App;

