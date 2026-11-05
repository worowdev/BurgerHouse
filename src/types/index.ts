export type BranchId = 'nugegoda' | 'moratuwa';

export interface Branch {
  id: BranchId;
  name: string;
  slug: string;
  mapAddress: string;
  conflictNote?: string;
  phone: string;
  telephoneUri: string;
  googleMapsPlaceId: string;
  googleMapsDirectionsUrl: string;
  uberEatsUrl: string;
  hoursDisplay: string;
  provisionalHours: string;
  addressStatus: 'confirmed' | 'conflict_pending_confirmation';
  verificationNotes: string;
  badge: string;
  tagline: string;
  features: string[];
}

export type MenuCategory =
  | 'all'
  | 'burgers'
  | 'subs'
  | 'fries'
  | 'pasta'
  | 'fried-rice'
  | 'kottu'
  | 'chicken-bites'
  | 'combos'
  | 'drinks';

export type EvidenceStatus =
  | 'search_indexed_owner_confirmation_required'
  | 'retrieved_platform_snapshot_owner_approval_required'
  | 'owner_printed_menu';

/** One priced option of an item, e.g. "With Cheese" or "Full · 3 persons". */
export interface MenuVariant {
  label: string;
  priceLKR: number;
}

/** Add-on, extra portion or sauce cup listed on the printed menu. */
export interface MenuExtra {
  name: string;
  priceLKR: number | null; // null = listed without a price
}

/** "Upgrade to a meal" bundles. */
export interface MealUpgrade {
  id: string;
  name: string;
  priceLKR: number;
  includes: string[];
  appliesTo: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  sourceCategory: string;
  description: string;
  priceLKR: number;
  priceFormatted: string;
  priceNote: string;
  branchAvailability: BranchId[]; // ['nugegoda', 'moratuwa'] or single branch
  isFeatured?: boolean;
  evidenceStatus: EvidenceStatus;
  sourceCitation: string;
  sourceUrl: string;
  servingNote?: string;
  tags?: string[];
  allergensNotice?: string;
  ingredients?: string[];
  imagePlaceholderCategory?: 'burger' | 'rice' | 'kottu' | 'pasta' | 'fries' | 'sub' | 'chicken' | 'drink';
  /** Photo path or URL. Items without one show a branded placeholder. */
  image?: string;
  /** Priced options. priceLKR is the lowest (the "from" price). */
  variants?: MenuVariant[];
}

export interface ReviewItem {
  id: string;
  quote: string;
  reviewerName: string | null;
  branch: string;
  branchId: BranchId | 'both';
  source: string;
  sourceUrl: string;
  ratingLabel?: string;
  dateNote: string;
  publicationStatus: 'draft_pending_rights_approval' | 'approved';
  attributionNote: string;
}

export interface ContactFormData {
  name: string;
  emailOrPhone: string;
  branch: BranchId | 'general';
  category: 'general' | 'feedback' | 'catering' | 'dietary';
  message: string;
}

export interface SiteSettings {
  previewMode: boolean;
  directOrderingEnabled: boolean;
  whatsappOrderingEnabled: boolean;
  pickMeEnabled: boolean;
  approvedHoursEnabled: boolean;
  foodExplorerEnabled: boolean;
  contactFormEnabled: boolean;
}
