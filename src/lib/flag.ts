// src/lib/flag.ts

const nationalityToISO: Record<string, string> = {
  american: "us",
  argentine: "ar",
  australian: "au",
  brazilian: "br",
  british: "gb",
  canadian: "ca",
  dutch: "nl",
  french: "fr",
  german: "de",
  italian: "it",
  japanese: "jp",
  monegasque: "mc",
  newzealander: "nz",
  spanish: "es",
  thai: "th",
};

export function getFlagUrl(nationality: string): string | null {
  const code = nationalityToISO[nationality.toLowerCase().replace(/\s/g, '')]
  return code ? `https://flagcdn.com/w40/${code}.png` : null
}
