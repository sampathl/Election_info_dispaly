export type WorkspacePageCardTone = 'accent' | 'default' | 'muted';
export type WorkspacePageTagTone = 'accent' | 'brand' | 'info' | 'success' | 'surface' | 'warning';

export interface WorkspacePage {
  description: string;
  id: string;
  navLabel: string;
  note?: string;
  showInHome: boolean;
  showInNav: boolean;
  status: string;
  statusTone: WorkspacePageTagTone;
  title: string;
  to: string;
  tone: WorkspacePageCardTone;
}

export const workspacePages: WorkspacePage[] = [
  {
    description:
      'Temporary launchpad for in-progress routes while the rest of the app is being built.',
    id: 'home',
    navLabel: 'Pages',
    note: 'Keep this route intentionally light until the real home page is ready.',
    showInHome: false,
    showInNav: true,
    status: 'Active',
    statusTone: 'brand',
    title: 'Page Directory',
    to: '/',
    tone: 'muted',
  },
  {
    description:
      'Inspect the current Chakra wrappers, tones, spacing, and state styling while building the rest of the app.',
    id: 'preview',
    navLabel: 'Preview',
    note: 'Use this as the visual reference page while new routes come online.',
    showInHome: true,
    showInNav: true,
    status: 'Ready',
    statusTone: 'success',
    title: 'Theme Preview',
    to: '/preview',
    tone: 'default',
  },
  {
    description:
      'Map-first area dashboard with a reference-matched three-row grid, dominant center canvas, and right-rail metadata panels.',
    id: 'area-overview',
    navLabel: 'Area',
    note: 'Swap the inline placeholder illustration for the final area map asset when it is ready.',
    showInHome: true,
    showInNav: true,
    status: 'Draft',
    statusTone: 'warning',
    title: 'Area Overview',
    to: '/area-overview',
    tone: 'default',
  },
  {
    description:
      'Contract-driven candidate profile route with a dedicated media rail, summary panel, crime meter, and gated accordion details.',
    id: 'profile',
    navLabel: 'Profile',
    note: 'Built as a lightweight feature page so the content and layout can evolve without rewriting page structure.',
    showInHome: true,
    showInNav: true,
    status: 'Ready',
    statusTone: 'success',
    title: 'Candidate Profile',
    to: '/profile',
    tone: 'accent',
  },
  {
    description:
      'Overview route for listing multiple contestants or winners with a full-width summary, a split middle section, and a results table.',
    id: 'contestants-summary',
    navLabel: 'Contestants',
    note: 'Use this page for multi-candidate snapshots before linking to individual profile routes.',
    showInHome: true,
    showInNav: true,
    status: 'Ready',
    statusTone: 'success',
    title: 'Contestants Summary',
    to: '/contestants-summary',
    tone: 'default',
  },
  {
    description:
      'Card-based directory of political parties rebuilt from the provided MyNeta-style HTML with centered symbols and direct year links.',
    id: 'party-directory',
    navLabel: 'Parties',
    note: 'Designed as a responsive four-card desktop grid instead of a table with dropdown selectors.',
    showInHome: true,
    showInNav: true,
    status: 'Ready',
    statusTone: 'success',
    title: 'Party Directory',
    to: '/party-directory',
    tone: 'accent',
  },
  {
    description:
      'Local browser text-to-speech lab that prefers device voices, audits Indian-language availability, and avoids cloud TTS APIs.',
    id: 'tts',
    navLabel: 'TTS',
    note: 'Use this route to validate speechSynthesis support and inspect which local voices the current device exposes.',
    showInHome: true,
    showInNav: true,
    status: 'Ready',
    statusTone: 'success',
    title: 'Local TTS Demo',
    to: '/tts',
    tone: 'default',
  },
];

export const homeSelectablePages = workspacePages.filter((page) => page.showInHome);
export const shellPages = workspacePages.filter((page) => page.showInNav);
