import { Grid, Stack } from '@chakra-ui/react';

import { AppSection } from '@/components/primitives/AppSection';
import { ProfileAssetsPanel } from '@/features/profile/components/ProfileAssetsPanel';
import { CandidateProfileHeroPanel } from '@/features/profile/components/CandidateProfileHeroPanel';
import { ProfileCrimeMeterPanel } from '@/features/profile/components/ProfileCrimeMeterPanel';
import { ProfileDetailTabs } from '@/features/profile/components/ProfileDetailTabs';
import { ProfileSummaryPanel } from '@/features/profile/components/ProfileSummaryPanel';
import { profilePageCopy } from '@/features/profile/profile-page.copy';
import { buildCandidateProfilePageViewModel } from '@/features/profile/profile-page.mapper';
import { sampleCandidateProfileSource } from '@/features/profile/profile-page.mock';

const candidateProfilePage = buildCandidateProfilePageViewModel(sampleCandidateProfileSource);

export function ProfilePage() {
  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <CandidateProfileHeroPanel hero={candidateProfilePage.hero} />

      <Grid templateColumns={{ base: '1fr', xl: 'repeat(3, minmax(0, 1fr))' }} gap="6">
        <ProfileCrimeMeterPanel crime={candidateProfilePage.crime} />
        <ProfileSummaryPanel summary={candidateProfilePage.summary} />
        <ProfileAssetsPanel assets={candidateProfilePage.assets} />
      </Grid>

      <AppSection
        eyebrow={profilePageCopy.details.eyebrow}
        title={profilePageCopy.details.title}
        description={profilePageCopy.details.description}
        tone="muted"
      >
        <ProfileDetailTabs sections={candidateProfilePage.detailSections} />
      </AppSection>
    </Stack>
  );
}
