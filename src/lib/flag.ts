const convertToISO: Record<string, string> = {
  // Nationalities
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

  // Countries
  australia: "au",
  china: "cn",
  japan: "jp",
  bahrain: "bh",
  saudiarabia: "sa",
  usa: "us",
  italy: "it",
  monaco: "mc",
  spain: "es",
  canada: "ca",
  austria: "at",
  uk: "gb",
  belgium: "be",
  hungary: "hu",
  netherlands: "nl",
  azerbaijan: "az",
  singapore: "sg",
  mexico: "mx",
  brazil: "br",
  qatar: "qa",
  uae: "ae",
};


export function getFlagUrl(identifier: string): string | null {
  const code = convertToISO[identifier.toLowerCase().replace(/\s/g, '')]
  return code ? `https://flagcdn.com/w40/${code}.png` : null
}