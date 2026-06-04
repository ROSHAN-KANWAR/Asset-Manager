import translations, { type Translations } from "@/constants/translations";
import { useCareer } from "@/context/CareerContext";

export function useTranslations(): Translations {
  const { language } = useCareer();
  return translations[language] as unknown as Translations;
}
