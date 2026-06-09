import type { Locale } from "./copy";
import { siteCopy } from "./copy";

export const products = [
  {
    id: "pvc-001",
    name_cn: "熊出没 · 光头强 PVC 动作玩偶",
    name_en: "Boonie Bears · Logger Vick PVC Action Figure",
    category: "PVC" as const,
    series: "Boonie Bears",
    description_cn:
      "经典动画形象授权出品，身高 18cm，多关节可动。环保 PVC 材质，色彩鲜艳，经多项国际安全检测。",
    description_en:
      "Licensed classic animation figure. 18cm tall with multiple articulated joints. Eco-friendly PVC with vibrant colors and certified to international safety standards.",
    image_url:
      "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800&q=80",
    ],
    specs: [
      { k_cn: "材质", k_en: "Material", v_cn: "环保 PVC", v_en: "Eco-friendly PVC" },
      { k_cn: "尺寸", k_en: "Size", v_cn: "18 cm", v_en: "18 cm" },
      { k_cn: "适用", k_en: "Use", v_cn: "收藏 / 礼品", v_en: "Collectible / Gift" },
    ],
    is_active: true,
    display_order: 1,
  },
  {
    id: "abs-001",
    name_cn: "机甲战士 ABS 系列 · 01",
    name_en: "Mech Warrior ABS Series · 01",
    category: "ABS" as const,
    series: "Mech Warrior",
    description_cn: "高强度 ABS 材质，可拆装结构，附带武器配件。",
    description_en: "High-strength ABS with detachable parts and weapon accessories.",
    image_url:
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=800&q=80",
    gallery_images: [],
    specs: [
      { k_cn: "材质", k_en: "Material", v_cn: "ABS 塑料", v_en: "ABS plastic" },
      { k_cn: "尺寸", k_en: "Size", v_cn: "15 cm", v_en: "15 cm" },
    ],
    is_active: true,
    display_order: 2,
  },
  {
    id: "tpr-001",
    name_cn: "可爱小熊搪胶挂件",
    name_en: "Cute Bear TPR Keychain",
    category: "TPR" as const,
    series: "Cute Bear",
    description_cn: "柔软搪胶工艺，可做挂件或车载装饰，多色可选。",
    description_en: "Soft TPR craftsmanship, perfect as keychain or car decor. Multiple colors.",
    image_url:
      "https://images.unsplash.com/photo-1535378620166-273708d44ef4?w=800&q=80",
    gallery_images: [],
    specs: [
      { k_cn: "材质", k_en: "Material", v_cn: "搪胶", v_en: "TPR" },
      { k_cn: "尺寸", k_en: "Size", v_cn: "8 cm", v_en: "8 cm" },
    ],
    is_active: true,
    display_order: 3,
  },
  {
    id: "resin-001",
    name_cn: "复联英雄树脂胸像",
    name_en: "Avenger Hero Resin Bust",
    category: "Resin" as const,
    series: "Avenger Heroes",
    description_cn: "冷铸树脂工艺，细节精致，限量发售。",
    description_en: "Cold-cast resin with fine details. Limited release.",
    image_url:
      "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=800&q=80",
    gallery_images: [],
    specs: [
      { k_cn: "材质", k_en: "Material", v_cn: "冷铸树脂", v_en: "Cold-cast resin" },
      { k_cn: "尺寸", k_en: "Size", v_cn: "25 cm", v_en: "25 cm" },
    ],
    is_active: true,
    display_order: 4,
  },
  {
    id: "alloy-001",
    name_cn: "合金车模收藏款",
    name_en: "Alloy Die-cast Collectible Car",
    category: "Alloy" as const,
    series: "Collectibles",
    description_cn: "锌合金压铸，可开门设计，做工精细。",
    description_en: "Zinc alloy die-cast with opening doors. Fine craftsmanship.",
    image_url:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&q=80",
    gallery_images: [],
    specs: [
      { k_cn: "材质", k_en: "Material", v_cn: "锌合金", v_en: "Zinc alloy" },
      { k_cn: "比例", k_en: "Scale", v_cn: "1:32", v_en: "1:32" },
    ],
    is_active: true,
    display_order: 5,
  },
  {
    id: "pvc-002",
    name_cn: "汪汪队立大功 · 天天 PVC 玩偶",
    name_en: "PAW Patrol · Skye PVC Figure",
    category: "PVC" as const,
    series: "PAW Patrol",
    description_cn: "授权出品，造型可爱，适合儿童。",
    description_en: "Officially licensed. Cute design, child-friendly.",
    image_url:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80",
    gallery_images: [],
    specs: [
      { k_cn: "材质", k_en: "Material", v_cn: "环保 PVC", v_en: "Eco-friendly PVC" },
      { k_cn: "尺寸", k_en: "Size", v_cn: "12 cm", v_en: "12 cm" },
    ],
    is_active: true,
    display_order: 6,
  },
] as const;

export type Product = (typeof products)[number];

export function getProductName(p: Product, locale: Locale): string {
  return locale === "zh" ? p.name_cn : p.name_en;
}
export function getProductDescription(p: Product, locale: Locale): string {
  return locale === "zh" ? p.description_cn : p.description_en;
}
export function getCategoryLabel(cat: Product["category"], locale: Locale): string {
  return siteCopy[locale].products.categories[cat];
}
export function getSpecKV(s: Product["specs"][number], locale: Locale): { k: string; v: string } {
  return {
    k: locale === "zh" ? s.k_cn : s.k_en,
    v: locale === "zh" ? s.v_cn : s.v_en,
  };
}
