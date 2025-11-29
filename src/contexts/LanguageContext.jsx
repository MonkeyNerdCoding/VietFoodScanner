import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const languages = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    apiCode: 'vi'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    apiCode: 'en'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    apiCode: 'fr'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    apiCode: 'zh'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Vietnamese
    const saved = localStorage.getItem('app_language');
    return saved && languages[saved] ? saved : 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    languages,
    currentLanguage: languages[language],
    changeLanguage,
    t: (key) => {
      // This will be used with translations
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

