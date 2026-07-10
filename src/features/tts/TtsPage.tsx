import { useEffect, useState } from 'react';

import {
  Box,
  FieldHelperText,
  FieldLabel,
  FieldRoot,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react';

import { AppButton } from '@/components/primitives/AppButton';
import { AppCard } from '@/components/primitives/AppCard';
import { AppSection } from '@/components/primitives/AppSection';
import { AppState } from '@/components/primitives/AppState';
import { AppTag } from '@/components/primitives/AppTag';
import {
  findPreferredVoice,
  indianTtsLanguageOptions,
  isIndianVoice,
  ttsLanguageOptions,
  voiceMatchesLanguage,
} from '@/features/tts/tts-language-options';

const NativeSelect = chakra('select');
const NativeTextarea = chakra('textarea');
const NativeRange = chakra('input');

const border = 'var(--chakra-colors-border-default)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const focusRing = 'var(--chakra-colors-focus-ring)';
const raisedSurface = 'var(--chakra-colors-bg-elevated)';
const surface = 'var(--chakra-colors-bg-surface)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';
const accentSolid = 'var(--chakra-colors-accent-solid)';

const defaultText =
  'This page uses the browser speech synthesis engine and voices already installed on this device. No online TTS API is called.';

type PlaybackState = 'idle' | 'paused' | 'speaking';
type StatusTone = 'danger' | 'info' | 'success' | 'warning';

interface StatusState {
  description: string;
  label: string;
  tone: StatusTone;
}

interface RangeFieldProps {
  helperText: string;
  label: string;
  max: number;
  min: number;
  onChange: (nextValue: number) => void;
  step: number;
  value: number;
}

function RangeField({ helperText, label, max, min, onChange, step, value }: RangeFieldProps) {
  return (
    <FieldRoot gap="2.5">
      <Flex align="center" justify="space-between" gap="3">
        <FieldLabel color={fgHeading} fontWeight="600">
          {label}
        </FieldLabel>
        <Text color={fgMuted} fontSize="0.9rem" fontWeight="600">
          {value.toFixed(step < 1 ? 1 : 0)}
        </Text>
      </Flex>

      <NativeRange
        accentColor={accentSolid}
        max={max}
        min={min}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        step={step}
        type="range"
        value={value}
        w="full"
      />

      <FieldHelperText color={fgMuted}>{helperText}</FieldHelperText>
    </FieldRoot>
  );
}

function sortVoices(voices: SpeechSynthesisVoice[]) {
  return [...voices].sort((left, right) => {
    if (left.localService !== right.localService) {
      return left.localService ? -1 : 1;
    }

    if (left.default !== right.default) {
      return left.default ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });
}

function formatVoiceLabel(voice: SpeechSynthesisVoice) {
  const sourceLabel = voice.localService ? 'Local' : 'Remote';
  const defaultLabel = voice.default ? ' • Default' : '';
  return `${voice.name} (${voice.lang}) • ${sourceLabel}${defaultLabel}`;
}

export function TtsPage() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState('en');
  const [selectedVoiceUri, setSelectedVoiceUri] = useState('');
  const [text, setText] = useState(defaultText);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [status, setStatus] = useState<StatusState>({
    description: 'Checking browser support and loading voices from the current device.',
    label: 'Initializing',
    tone: 'info',
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      setStatus({
        description:
          'This browser does not expose window.speechSynthesis, so the page cannot speak locally here.',
        label: 'Unsupported',
        tone: 'danger',
      });
      return;
    }

    const synth = window.speechSynthesis;

    setIsSupported(true);

    const refreshVoices = () => {
      const nextVoices = sortVoices(synth.getVoices());
      setVoices(nextVoices);

      if (nextVoices.length === 0) {
        setStatus({
          description:
            'The browser API is available, but no voices are loaded yet. Some browsers populate voices asynchronously after page load.',
          label: 'Waiting For Voices',
          tone: 'warning',
        });
        return;
      }

      setStatus({
        description: `Loaded ${nextVoices.length} voices from this device. The selector below prefers voices marked local by the browser.`,
        label: 'Ready',
        tone: 'success',
      });
    };

    refreshVoices();

    const timerId = window.setTimeout(refreshVoices, 250);
    synth.addEventListener('voiceschanged', refreshVoices);

    return () => {
      window.clearTimeout(timerId);
      synth.removeEventListener('voiceschanged', refreshVoices);
      synth.cancel();
    };
  }, []);

  const selectedLanguage =
    ttsLanguageOptions.find((option) => option.id === selectedLanguageId) ?? ttsLanguageOptions[0];

  const localVoices = voices.filter((voice) => voice.localService);
  const selectableVoices = localVoices.length > 0 ? localVoices : voices;
  const hiddenRemoteCount = localVoices.length > 0 ? voices.length - localVoices.length : 0;

  const matchingVoices = selectableVoices.filter((voice) => voiceMatchesLanguage(voice, selectedLanguage));
  const voiceChoices = matchingVoices.length > 0 ? matchingVoices : selectableVoices;
  const hasLanguageFallback = matchingVoices.length === 0 && selectableVoices.length > 0;

  useEffect(() => {
    if (voiceChoices.length === 0) {
      setSelectedVoiceUri('');
      return;
    }

    if (voiceChoices.some((voice) => voice.voiceURI === selectedVoiceUri)) {
      return;
    }

    const preferredVoice = findPreferredVoice(voiceChoices, selectedLanguage);
    setSelectedVoiceUri(preferredVoice.voiceURI);
  }, [selectedLanguage, selectedVoiceUri, voiceChoices]);

  const selectedVoice =
    voiceChoices.find((voice) => voice.voiceURI === selectedVoiceUri) ?? voiceChoices[0] ?? null;

  const detectedIndianVoices = selectableVoices.filter(isIndianVoice);

  const languageAuditRows = indianTtsLanguageOptions.map((option) => {
    const allMatches = voices.filter((voice) => voiceMatchesLanguage(voice, option));
    const localMatches = localVoices.filter((voice) => voiceMatchesLanguage(voice, option));

    return {
      code: option.utteranceLang,
      label: option.label,
      localCount: localMatches.length,
      totalCount: allMatches.length,
    };
  });

  const speakText = () => {
    if (!isSupported) {
      return;
    }

    if (!text.trim()) {
      setStatus({
        description: 'Enter text before starting speech.',
        label: 'Missing Text',
        tone: 'warning',
      });
      return;
    }

    if (!selectedVoice) {
      setStatus({
        description:
          'No voice is currently available for playback. Wait for voices to load or install a voice pack in the operating system.',
        label: 'No Voice Available',
        tone: 'warning',
      });
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text.trim());

    synth.cancel();

    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang || selectedLanguage.utteranceLang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setPlaybackState('speaking');
      setStatus({
        description: `Speaking with ${selectedVoice.name} in ${selectedVoice.lang}.`,
        label: 'Speaking',
        tone: 'success',
      });
    };

    utterance.onpause = () => {
      setPlaybackState('paused');
      setStatus({
        description: 'Playback is paused. Use resume to continue from the current position.',
        label: 'Paused',
        tone: 'info',
      });
    };

    utterance.onresume = () => {
      setPlaybackState('speaking');
      setStatus({
        description: `Resumed playback with ${selectedVoice.name}.`,
        label: 'Speaking',
        tone: 'success',
      });
    };

    utterance.onend = () => {
      setPlaybackState('idle');
      setStatus({
        description: 'Speech completed successfully.',
        label: 'Finished',
        tone: 'success',
      });
    };

    utterance.onerror = (event) => {
      setPlaybackState('idle');
      setStatus({
        description: `Speech failed with browser error "${event.error}". This usually means the voice, language, or output device is unavailable in the current context.`,
        label: 'Playback Error',
        tone: 'danger',
      });
    };

    synth.speak(utterance);
  };

  const pauseSpeech = () => {
    if (!isSupported || playbackState !== 'speaking') {
      return;
    }

    window.speechSynthesis.pause();
    setPlaybackState('paused');
    setStatus({
      description: 'Playback paused locally in the browser.',
      label: 'Paused',
      tone: 'info',
    });
  };

  const resumeSpeech = () => {
    if (!isSupported || playbackState !== 'paused') {
      return;
    }

    window.speechSynthesis.resume();
    setPlaybackState('speaking');
    setStatus({
      description: 'Playback resumed.',
      label: 'Speaking',
      tone: 'success',
    });
  };

  const stopSpeech = () => {
    if (!isSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    setPlaybackState('idle');
    setStatus({
      description: 'Speech queue cleared and playback stopped.',
      label: 'Stopped',
      tone: 'info',
    });
  };

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        actions={<AppTag tone="brand">Local First</AppTag>}
        eyebrow="Browser TTS"
        title="Offline text-to-speech through the browser speech engine."
        description="This route does not call an online TTS API. It uses window.speechSynthesis and the voices already exposed by the current device."
        tone="hero"
      >
        <Stack gap="4">
          <Text color={fgMuted} fontSize={{ base: '1rem', md: '1.05rem' }} maxW="3xl">
            It is the broadest practical website-only option for desktop and mobile browsers. Indian
            language support depends on whether the browser and operating system already have those
            voices installed.
          </Text>
          <HStack gap="3" flexWrap="wrap">
            <AppTag tone="success">{selectableVoices.length} selectable voices</AppTag>
            <AppTag tone="info">{detectedIndianVoices.length} Indian-language voices detected</AppTag>
            <AppTag tone="surface">{hiddenRemoteCount} remote voices hidden</AppTag>
          </HStack>
        </Stack>
      </AppSection>

      {isSupported === false ? (
        <AppState
          description="Use a modern browser with SpeechSynthesis support such as current Chrome, Edge, Safari, or Firefox."
          label="Browser Gap"
          meta="No local TTS"
          title="SpeechSynthesis is not available here."
          tone="danger"
        />
      ) : null}

      <Grid gap="6" templateColumns={{ base: '1fr', xl: '1.15fr 0.85fr' }}>
        <AppCard.Root tone="default">
          <AppCard.Header>
            <AppCard.Eyebrow>Speak Text</AppCard.Eyebrow>
            <AppCard.Title as="h3" fontSize="1.55rem">
              Local speech demo
            </AppCard.Title>
            <AppCard.Description>
              Enter English text and press Speak. If your device has Indian voices installed, switch the
              language and voice selectors to test those too.
            </AppCard.Description>
          </AppCard.Header>

          <AppCard.Body>
            <Stack gap="6">
              <FieldRoot gap="2.5">
                <Flex align="center" justify="space-between" gap="3">
                  <FieldLabel color={fgHeading} fontWeight="600">
                    Text
                  </FieldLabel>
                  <AppButton onClick={() => setText(defaultText)} tone="ghost">
                    Reload sample
                  </AppButton>
                </Flex>

                <NativeTextarea
                  bg={surface}
                  borderColor={border}
                  borderRadius="1.15rem"
                  borderWidth="1px"
                  color={fgHeading}
                  minH="14rem"
                  onChange={(event) => setText(event.currentTarget.value)}
                  p="4"
                  resize="vertical"
                  transition="border-color 180ms ease, box-shadow 180ms ease"
                  value={text}
                  _focusVisible={{
                    borderColor: accentSolid,
                    boxShadow: `0 0 0 3px ${focusRing}`,
                    outline: 'none',
                  }}
                />

                <FieldHelperText color={fgMuted}>
                  This stays inside the browser speech engine. Nothing in this route sends your text to a
                  remote TTS service.
                </FieldHelperText>
              </FieldRoot>

              <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
                <FieldRoot gap="2.5">
                  <FieldLabel color={fgHeading} fontWeight="600">
                    Language
                  </FieldLabel>
                  <NativeSelect
                    bg={surface}
                    borderColor={border}
                    borderRadius="1rem"
                    borderWidth="1px"
                    color={fgHeading}
                    onChange={(event) => setSelectedLanguageId(event.currentTarget.value)}
                    px="3.5"
                    py="3"
                    value={selectedLanguageId}
                    _focusVisible={{
                      borderColor: accentSolid,
                      boxShadow: `0 0 0 3px ${focusRing}`,
                      outline: 'none',
                    }}
                  >
                    {ttsLanguageOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect>
                  <FieldHelperText color={fgMuted}>
                    Sets the target language you want the page to look for first.
                  </FieldHelperText>
                </FieldRoot>

                <FieldRoot gap="2.5">
                  <FieldLabel color={fgHeading} fontWeight="600">
                    Voice
                  </FieldLabel>
                  <NativeSelect
                    bg={surface}
                    borderColor={border}
                    borderRadius="1rem"
                    borderWidth="1px"
                    color={fgHeading}
                    onChange={(event) => setSelectedVoiceUri(event.currentTarget.value)}
                    px="3.5"
                    py="3"
                    value={selectedVoiceUri}
                    _focusVisible={{
                      borderColor: accentSolid,
                      boxShadow: `0 0 0 3px ${focusRing}`,
                      outline: 'none',
                    }}
                  >
                    {voiceChoices.length === 0 ? (
                      <option value="">No voices available</option>
                    ) : (
                      voiceChoices.map((voice) => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {formatVoiceLabel(voice)}
                        </option>
                      ))
                    )}
                  </NativeSelect>
                  <FieldHelperText color={fgMuted}>
                    {hasLanguageFallback
                      ? `No selectable voice matched ${selectedLanguage.label}, so the page fell back to the broader local voice list.`
                      : 'When voices are marked local by the browser, remote voices are excluded from this selector.'}
                  </FieldHelperText>
                </FieldRoot>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                <RangeField
                  helperText="1.0 is the default pace."
                  label="Rate"
                  max={2}
                  min={0.5}
                  onChange={setRate}
                  step={0.1}
                  value={rate}
                />
                <RangeField
                  helperText="1.0 is the default pitch."
                  label="Pitch"
                  max={2}
                  min={0}
                  onChange={setPitch}
                  step={0.1}
                  value={pitch}
                />
                <RangeField
                  helperText="1.0 is full volume."
                  label="Volume"
                  max={1}
                  min={0}
                  onChange={setVolume}
                  step={0.1}
                  value={volume}
                />
              </SimpleGrid>

              <HStack gap="3" flexWrap="wrap">
                <AppButton disabled={!selectedVoice || !text.trim() || isSupported !== true} onClick={speakText}>
                  Speak
                </AppButton>
                <AppButton disabled={playbackState !== 'speaking'} onClick={pauseSpeech} tone="secondary">
                  Pause
                </AppButton>
                <AppButton disabled={playbackState !== 'paused'} onClick={resumeSpeech} tone="secondary">
                  Resume
                </AppButton>
                <AppButton disabled={playbackState === 'idle'} onClick={stopSpeech} tone="ghost">
                  Stop
                </AppButton>
              </HStack>
            </Stack>
          </AppCard.Body>
        </AppCard.Root>

        <Stack gap="6">
          <AppState
            description={status.description}
            label={status.label}
            meta={selectedVoice ? selectedVoice.lang : 'No voice selected'}
            title="Current browser speech status"
            tone={status.tone}
          />

          <AppCard.Root tone="muted">
            <AppCard.Header>
              <AppCard.Eyebrow>Indian Voice Audit</AppCard.Eyebrow>
              <AppCard.Title as="h3" fontSize="1.45rem">
                What this device exposes right now
              </AppCard.Title>
              <AppCard.Description>
                The web page can only use voices the browser makes visible through
                SpeechSynthesis.getVoices().
              </AppCard.Description>
            </AppCard.Header>

            <AppCard.Body>
              <Stack gap="3">
                {languageAuditRows.map((row) => {
                  const tone = row.localCount > 0 ? 'success' : row.totalCount > 0 ? 'warning' : 'surface';

                  return (
                    <Flex
                      key={row.label}
                      align="center"
                      bg={raisedSurface}
                      borderColor={border}
                      borderRadius="1rem"
                      borderWidth="1px"
                      justify="space-between"
                      gap="4"
                      px="4"
                      py="3.5"
                    >
                      <Stack gap="0.5">
                        <Text color={fgHeading} fontWeight="600">
                          {row.label}
                        </Text>
                        <Text color={fgMuted} fontFamily="mono" fontSize="0.78rem">
                          {row.code}
                        </Text>
                      </Stack>
                      <AppTag tone={tone}>
                        {row.localCount > 0
                          ? `${row.localCount} local`
                          : row.totalCount > 0
                            ? `${row.totalCount} remote`
                            : 'Not found'}
                      </AppTag>
                    </Flex>
                  );
                })}
              </Stack>
            </AppCard.Body>
          </AppCard.Root>
        </Stack>
      </Grid>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
        <AppState
          description="If a language shows up here, this page can request it locally from the browser. If it does not show up, install the relevant system voice pack, then reload the page."
          label="Practical Limit"
          meta={`${detectedIndianVoices.length} detected`}
          title="Indian language support is device-dependent."
          tone={detectedIndianVoices.length > 0 ? 'success' : 'warning'}
        >
          <Stack gap="3">
            {detectedIndianVoices.length > 0 ? (
              detectedIndianVoices.map((voice) => (
                <Box
                  key={voice.voiceURI}
                  borderColor={border}
                  borderRadius="1rem"
                  borderWidth="1px"
                  px="4"
                  py="3"
                >
                  <Text color={fgHeading} fontWeight="600">
                    {voice.name}
                  </Text>
                  <Text color={fgMuted} fontSize="0.86rem">
                    {voice.lang} • {voice.localService ? 'Local voice' : 'Remote voice'}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color={fgMuted}>
                No Indian-language voices are visible from the current browser session. The report in
                `docs/tts-options-report.md` explains the fallback path using a bundled engine such as
                eSpeak NG.
              </Text>
            )}
          </Stack>
        </AppState>

        <AppCard.Root tone="accent">
          <AppCard.Header>
            <AppCard.Eyebrow>Implementation Notes</AppCard.Eyebrow>
            <AppCard.Title as="h3" fontSize="1.45rem">
              Why this route stays local
            </AppCard.Title>
            <AppCard.Description>
              The page is intentionally limited to browser-native synthesis so it can run without a cloud
              TTS dependency.
            </AppCard.Description>
          </AppCard.Header>

          <AppCard.Body>
            <Stack gap="3">
              <Text color={fgMuted}>
                `window.speechSynthesis` is the actual engine entry point.
              </Text>
              <Text color={fgMuted}>
                The selector prefers voices with `localService === true`, which is the browser signal for
                local synthesis.
              </Text>
              <Text color={fgMuted}>
                The route never posts text to a remote API endpoint. Any remote-vs-local distinction is
                limited to what the browser itself reports for installed voices.
              </Text>
              <Text borderTopWidth="1px" borderColor={border} color={fgMuted} pt="4">
                If you need guaranteed Indian-language coverage independent of OS voice packs, the next
                step is bundling an offline engine such as eSpeak NG through WebAssembly.
              </Text>
            </Stack>
          </AppCard.Body>
        </AppCard.Root>
      </SimpleGrid>

      <Box
        bg={subtleSurface}
        borderColor={border}
        borderRadius="1.25rem"
        borderWidth="1px"
        px={{ base: '4', md: '5' }}
        py={{ base: '4', md: '5' }}
      >
        <Text color={fgMuted} fontSize="0.92rem" lineHeight="1.7">
          Research notes and the browser/mobile support matrix were saved locally in
          `docs/tts-options-report.md`.
        </Text>
      </Box>
    </Stack>
  );
}
