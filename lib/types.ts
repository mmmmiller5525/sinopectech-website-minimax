// 数据模型类型
export type Category = "PVC" | "ABS" | "Resin" | "TPR" | "Alloy" | string;

export type Product = {
  id: number;
  name_cn: string;
  name_en: string;
  category: Category;
  series: string;
  description_cn: string;
  description_en: string;
  image_url: string;
  gallery_images: string[];
  is_active: boolean;
  display_order: number;
  specs: { k_cn: string; k_en: string; v_cn: string; v_en: string }[];
  created_at?: string;
  updated_at?: string;
};

export type About = {
  id: number;
  title_cn: string;
  title_en: string;
  subtitle_cn: string;
  subtitle_en: string;
  content_cn: string;
  content_en: string;
};

export type Company = {
  id: number;
  name_cn: string;
  name_en: string;
  address_cn: string;
  address_en: string;
  description_cn: string;
  description_en: string;
  images: string[];
};

export type Partner = {
  id: number;
  name: string;
  region: "USA" | "Japan" | "Europe" | "South Africa" | "Other" | string;
  logo_url: string;
  website: string;
};

export type Contact = {
  id: 1;
  phone: string;
  email: string;
  address_cn: string;
  address_en: string;
  wechat: string;
  whatsapp: string;
};

export type InquiryStatus = "new" | "contacted" | "closed";
export type Inquiry = {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  product: string;
  message: string;
  products_interested: string[];
  status: InquiryStatus;
  created_at: string;
};

export type Settings = {
  id: 1;
  site_name_cn: string;
  site_name_en: string;
  site_name_short_cn: string;
  site_name_short_en: string;
  logo_url: string;
  favicon_url: string;
  hero_title_cn: string;
  hero_title_en: string;
  hero_subtitle_cn: string;
  hero_subtitle_en: string;
  hero_video_url: string;
  hero_image_url: string;
  seo_title_cn: string;
  seo_title_en: string;
  seo_description_cn: string;
  seo_description_en: string;
  seo_keywords_cn: string;
  seo_keywords_en: string;
  home_stats: HomeStat[];
  home_featured_title_cn: string;
  home_featured_title_en: string;
  home_featured_subtitle_cn: string;
  home_featured_subtitle_en: string;
  home_featured_cta_cn: string;
  home_featured_cta_en: string;
  home_about_title_cn: string;
  home_about_title_en: string;
  home_about_body_cn: string;
  home_about_body_en: string;
  home_about_cta_cn: string;
  home_about_cta_en: string;
};

export type HomeStat = {
  value_cn: string;
  value_en: string;
  label_cn: string;
  label_en: string;
};
