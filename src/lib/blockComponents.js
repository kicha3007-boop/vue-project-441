import CtaBlock from "../components/blocks/CtaBlock.vue";
import FaqBlock from "../components/blocks/FaqBlock.vue";
import FeaturesBlock from "../components/blocks/FeaturesBlock.vue";
import HeroBlock from "../components/blocks/HeroBlock.vue";

// Карта «тип — компонент». Живёт отдельно от справочника типов,
// чтобы справочник и выгрузка обходились без Vue.
export const blockComponents = {
  hero: HeroBlock,
  features: FeaturesBlock,
  cta: CtaBlock,
  faq: FaqBlock,
};
