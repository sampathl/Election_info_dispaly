# Local TTS Options For Website Delivery

Research date: July 9, 2026

## Executive Summary

For a website that must speak text without calling an online TTS API, the most practical choice today is the browser's built-in `SpeechSynthesis` interface from the Web Speech API.

- It is broadly supported across modern desktop and mobile browsers.
- It can use voices already installed on the device.
- It does not require a cloud TTS endpoint.
- Indian language support is possible, but it is not guaranteed by the web standard itself. The browser can only expose voices that already exist on the user's device.

If you need predictable Indian-language coverage even when the device does not have the right voices installed, the best local fallback is to bundle an offline engine such as `eSpeak NG` through WebAssembly. The tradeoff is voice quality: coverage is strong, but the output is much less natural than many native system voices.

## What The Web Platform Gives You

MDN describes the Web Speech API as the browser API for speech recognition and text-to-speech, with `SpeechSynthesis` as the text-to-speech side. `SpeechSynthesis.getVoices()` returns the voices available on the current device, not a universal browser-managed catalog.

Practical implication:

- A website can request `hi-IN`, `ta-IN`, `te-IN`, `bn-IN`, and similar language tags.
- The request only works well if the browser exposes a matching local voice.
- The same code can show different voices on Windows, macOS, Android, and iPhone.

The current Web Speech specification also exposes:

- `SpeechSynthesisVoice.lang` as a BCP 47 language tag
- `SpeechSynthesisVoice.localService` to distinguish local vs remote voices
- error states such as `language-unavailable`, `voice-unavailable`, `synthesis-unavailable`, `network`, and `not-allowed`

That means a browser page can stay local only if it selects voices that are actually local on the device.

## Browser Support Matrix

Source used: Can I Use support table for Speech Synthesis API, opened July 9, 2026.

### Desktop Browsers

| Browser | Support status | Practical reading |
| --- | --- | --- |
| Chrome | Supported from 33+ | Good choice for desktop local TTS |
| Edge | Supported from 14+, and Chromium Edge 79+ | Good choice for desktop local TTS |
| Safari | Supported from 7+ | Good choice on macOS |
| Firefox | Supported from 49+; 31-48 disabled by default | Good current support |
| Internet Explorer | Not supported | Do not target for local TTS |
| Opera | Supported from 27+ | Generally usable |

### Mobile Browsers

| Browser | Support status | Practical reading |
| --- | --- | --- |
| Chrome for Android | Supported | Good Android path |
| Safari on iOS | Supported from iOS 7+ | Good iPhone/iPad path |
| Samsung Internet | Supported from 5+ | Good Android path |
| Firefox for Android | Supported | Viable Android path |
| Opera Mobile | Not supported in current table | Do not rely on it |
| Android Browser | Not supported | Legacy only, avoid |
| UC Browser for Android | Not supported in current table | Avoid for this feature |

Can I Use also reports global usage support at `95.03%` for the Speech Synthesis API at the time of research.

## Local TTS Options For A Website

### Option 1: Browser-native `speechSynthesis`

This is the option implemented in the app.

Pros:

- No external API dependency
- Already works in most modern desktop and mobile browsers
- Uses device voices that are often higher quality than tiny bundled engines
- Minimal bundle size

Cons:

- Voice availability is not uniform across devices
- Indian language coverage depends on operating-system voice packs
- Some browsers expose remote voices alongside local ones, so the page must filter carefully

Recommendation:

- Use `window.speechSynthesis`
- Enumerate voices with `getVoices()`
- Prefer `voice.localService === true`
- Let the user inspect the actual voice list on their current device

### Option 2: Bundle `eSpeak NG` locally

`eSpeak NG` is a compact open-source speech synthesizer. Its repository states that it supports more than 100 languages and accents, and its documented language list includes many Indian languages.

Relevant Indian-language entries documented by `eSpeak NG`:

- Assamese
- Bengali
- Gujarati
- Hindi
- Kannada
- Konkani
- Malayalam
- Marathi
- Nepali
- Oriya/Odia
- Punjabi
- Sindhi
- Tamil
- Telugu
- Urdu

Pros:

- Fully local and self-contained
- Predictable language coverage once bundled
- Works even when the OS does not ship the required Indian voice pack

Cons:

- Voice quality is much more robotic than many native device voices
- Adds integration work if compiled into WebAssembly
- You own the full packaging and performance footprint

Recommendation:

- Use this as the fallback path when native browser voices are not enough
- Keep the browser-native path as the default because it is lighter and usually sounds better

## Indian Language Guidance

The important distinction is this:

- Browser support for `SpeechSynthesis` is broad
- Browser support for specific Indian voices is device-dependent

For Indian-language testing, probe these language tags first:

- `as-IN`
- `bn-IN`
- `gu-IN`
- `hi-IN`
- `kn-IN`
- `kok-IN`
- `ml-IN`
- `mr-IN`
- `ne-IN`
- `or-IN`
- `pa-IN`
- `ta-IN`
- `te-IN`
- `ur-IN`

If the browser shows no matching voice for those tags, the website itself cannot manufacture a native local voice. At that point, you either:

1. Install the needed voice pack at the OS level and reload the page
2. Bundle a local engine such as `eSpeak NG`

## Recommended Architecture

### Best default for this project

1. Use browser-native `speechSynthesis`
2. Filter to local voices when the browser exposes `localService`
3. Let the user select a detected Indian-language voice when available
4. Keep the page fully client-side and offline

### Best fallback if Indian coverage must be guaranteed

1. Keep the native browser path for English and for devices with good voice packs
2. Add a second local engine path using bundled `eSpeak NG` in WebAssembly
3. Route Indian-language requests to the bundled engine when no native local voice is available

## What Was Built In This Repo

A local browser TTS route was added at `/tts`.

It:

- accepts text input
- speaks locally through `window.speechSynthesis`
- prefers voices that the browser marks as local
- audits which Indian-language voices are visible on the current device
- does not call an online TTS API

This is the right first implementation because it satisfies the local/offline requirement with the broadest browser reach.

## Sources

- MDN Web Speech API: [https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- MDN `SpeechSynthesis.getVoices()`: [https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)
- Web Speech API specification: [https://webaudio.github.io/web-speech-api/](https://webaudio.github.io/web-speech-api/)
- Can I Use Speech Synthesis API: [https://caniuse.com/speech-synthesis](https://caniuse.com/speech-synthesis)
- eSpeak NG repository: [https://github.com/espeak-ng/espeak-ng](https://github.com/espeak-ng/espeak-ng)
- eSpeak NG supported languages list: [https://github.com/espeak-ng/espeak-ng/blob/master/docs/languages.md](https://github.com/espeak-ng/espeak-ng/blob/master/docs/languages.md)
