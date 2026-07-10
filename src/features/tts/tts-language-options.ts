export interface TtsLanguageOption {
  id: string;
  isIndianLanguage?: boolean;
  label: string;
  matchPrefixes: string[];
  utteranceLang: string;
}

export const ttsLanguageOptions: TtsLanguageOption[] = [
  {
    id: 'en',
    label: 'English',
    matchPrefixes: ['en'],
    utteranceLang: 'en-US',
  },
  {
    id: 'hi',
    isIndianLanguage: true,
    label: 'Hindi',
    matchPrefixes: ['hi'],
    utteranceLang: 'hi-IN',
  },
  {
    id: 'as',
    isIndianLanguage: true,
    label: 'Assamese',
    matchPrefixes: ['as'],
    utteranceLang: 'as-IN',
  },
  {
    id: 'bn',
    isIndianLanguage: true,
    label: 'Bengali',
    matchPrefixes: ['bn'],
    utteranceLang: 'bn-IN',
  },
  {
    id: 'gu',
    isIndianLanguage: true,
    label: 'Gujarati',
    matchPrefixes: ['gu'],
    utteranceLang: 'gu-IN',
  },
  {
    id: 'kn',
    isIndianLanguage: true,
    label: 'Kannada',
    matchPrefixes: ['kn'],
    utteranceLang: 'kn-IN',
  },
  {
    id: 'kok',
    isIndianLanguage: true,
    label: 'Konkani',
    matchPrefixes: ['kok'],
    utteranceLang: 'kok-IN',
  },
  {
    id: 'ml',
    isIndianLanguage: true,
    label: 'Malayalam',
    matchPrefixes: ['ml'],
    utteranceLang: 'ml-IN',
  },
  {
    id: 'mr',
    isIndianLanguage: true,
    label: 'Marathi',
    matchPrefixes: ['mr'],
    utteranceLang: 'mr-IN',
  },
  {
    id: 'ne',
    isIndianLanguage: true,
    label: 'Nepali',
    matchPrefixes: ['ne'],
    utteranceLang: 'ne-IN',
  },
  {
    id: 'or',
    isIndianLanguage: true,
    label: 'Odia',
    matchPrefixes: ['or'],
    utteranceLang: 'or-IN',
  },
  {
    id: 'pa',
    isIndianLanguage: true,
    label: 'Punjabi',
    matchPrefixes: ['pa'],
    utteranceLang: 'pa-IN',
  },
  {
    id: 'ta',
    isIndianLanguage: true,
    label: 'Tamil',
    matchPrefixes: ['ta'],
    utteranceLang: 'ta-IN',
  },
  {
    id: 'te',
    isIndianLanguage: true,
    label: 'Telugu',
    matchPrefixes: ['te'],
    utteranceLang: 'te-IN',
  },
  {
    id: 'ur',
    isIndianLanguage: true,
    label: 'Urdu',
    matchPrefixes: ['ur'],
    utteranceLang: 'ur-IN',
  },
];

export const indianTtsLanguageOptions = ttsLanguageOptions.filter((option) => option.isIndianLanguage);

export function voiceMatchesLanguage(voice: SpeechSynthesisVoice, option: TtsLanguageOption) {
  const normalizedLang = voice.lang.toLowerCase();

  return option.matchPrefixes.some((prefix) => {
    const normalizedPrefix = prefix.toLowerCase();
    return normalizedLang === normalizedPrefix || normalizedLang.startsWith(`${normalizedPrefix}-`);
  });
}

export function isIndianVoice(voice: SpeechSynthesisVoice) {
  return indianTtsLanguageOptions.some((option) => voiceMatchesLanguage(voice, option));
}

export function findPreferredVoice(
  voices: SpeechSynthesisVoice[],
  option: TtsLanguageOption,
) {
  const exactMatch = voices.find((voice) => voice.lang.toLowerCase() === option.utteranceLang.toLowerCase());

  if (exactMatch) {
    return exactMatch;
  }

  const prefixMatch = voices.find((voice) => voiceMatchesLanguage(voice, option));

  if (prefixMatch) {
    return prefixMatch;
  }

  const defaultVoice = voices.find((voice) => voice.default);

  if (defaultVoice) {
    return defaultVoice;
  }

  return voices[0];
}
