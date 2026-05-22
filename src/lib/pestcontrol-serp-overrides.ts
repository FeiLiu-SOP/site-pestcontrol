/**
 * Per-slug Rockwell pest control SERP overrides (CTR tests). Keys = entry slug without .md.
 */
export type PestcontrolSerpOverride = {
  pageTitle: string;
  pageH1: string;
  metaDescription: string;
};

const PEST_OVERRIDE_TITLE_MAX = 120;
const PEST_OVERRIDE_META_MAX = 155;

function clipMetaDescription(text: string, max = PEST_OVERRIDE_META_MAX): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd().replace(/[,;\s]+$/, "")}…`;
}

function assertPestOverrideTitleFits(title: string, context: string): string {
  if (title.length > PEST_OVERRIDE_TITLE_MAX) {
    throw new Error(
      `[pestcontrol-serp-overrides] Title exceeds ${PEST_OVERRIDE_TITLE_MAX} chars (${title.length}). ctx=${context}`,
    );
  }
  return title;
}

const RAW: Record<string, Omit<PestcontrolSerpOverride, "metaDescription"> & { metaDescription: string }> = {
  "pest-control-temescal-valley-ca-92883": {
    pageTitle: "Temescal Valley Emergency Pest Control | FixitGrid",
    pageH1: "Emergency Pest Control — Temescal Valley, CA",
    metaDescription:
      "Emergency pest control in Temescal Valley, CA 92883. Ants, rodents & seasonal pests. Local service — call for same-day help.",
  },
};

export function getPestcontrolSerpOverride(slug: string): PestcontrolSerpOverride | null {
  const row = RAW[slug];
  if (!row) return null;
  const metaDescription = clipMetaDescription(row.metaDescription, PEST_OVERRIDE_META_MAX);
  const pageTitle = assertPestOverrideTitleFits(row.pageTitle, `override:${slug}`);
  return { pageTitle, pageH1: row.pageH1, metaDescription };
}
