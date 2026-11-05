import { MenuItem, MenuCategory, MenuVariant, MenuExtra, MealUpgrade } from '@/types';
import aiImageIds from './ai-images.json';

/**
 * Burger House menu, transcribed from the printed in-store menu (Nugegoda).
 * Prices are in-store LKR prices. "No service charge" applies to all items.
 * Delivery-app prices (Uber Eats) may differ.
 */

export const CATEGORIES: { id: MenuCategory; label: string; description: string }[] = [
  { id: 'all', label: 'All Items', description: 'Browse our complete menu' },
  { id: 'burgers', label: 'Burgers', description: 'Add cheese, egg, or go Special with both' },
  { id: 'subs', label: 'Submarines', description: '9" and 12" subs, with cheese, egg or Special options' },
  { id: 'fried-rice', label: 'Fried Rice', description: 'Basmati rice with chopsuey & chilli paste. Normal serves 2, Full serves 3' },
  { id: 'kottu', label: 'Kottu & Dolphin', description: 'Kottu, cheese kottu, dolphin and cheese dolphin. Normal serves 2, Full serves 3' },
  { id: 'pasta', label: 'Pasta', description: 'Penne pasta, plain or with cheese' },
  { id: 'fries', label: 'Fries', description: 'French fries, loaded fries and cheesy meaty fries' },
  { id: 'chicken-bites', label: 'Chicken & Portions', description: 'Crispy chicken and sharing portions' },
  { id: 'drinks', label: 'Beverages', description: 'Milkshakes, mojitos, soft drinks and more' },
];

// ── Helpers ────────────────────────────────────────────────────────────
const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const IMG = {
  burgerClassic: U('1571091718767-18b5b1457add'),
  burgerVeggie: U('1550547660-d9450f859349'),
  burgerBeef: U('1568901346375-23c9450c58cd'),
  burgerStacked: U('1586190848861-99aa4a171e90'),
  burgerDoubleBeef: U('1553979459-d2229ba7433b'),
  burgerDoubleSmash: U('1607013251379-e6eecfffe234'),
  chickenBurgerEgg: '/menu/chicken-burger-with-egg.png',
  crispyChickenBurger: '/menu/crispy-chicken-burger.png',
  sub: U('1509722747041-616f39b57569'),
  pastaGarlic: '/menu/chicken-pasta.png',
  pastaCheesy: '/menu/chicken-pasta-with-cheese.png',
  rice: U('1603133872878-684f208fb84b'),
  riceSpecial: U('1512058564366-18510be2db19'),
  kottuA: U('1601050690597-df0568f70950'),
  kottuB: U('1541832676-9b763b0239ab'),
  frenchFries: U('1573080496219-bb080dd4f877'),
  loadedFries: '/menu/loaded-french-fries.png',
  cheesyMeatyFries: '/menu/cheesy-meaty-fries.png',
  chickenStrips: U('1562967914-608f82629710'),
  friedChicken: U('1626082927389-6cd097cdc6ec'),
  milkshake: U('1572490122747-3968b75cc699'),
  cola: U('1622483767028-3f66f32aef97'),
};

/** Items with a generated photo in public/menu/ai (written by scripts/generate-menu-images.mjs). */
const AI_IMAGES = new Set<string>(aiImageIds);

const lkr = (n: number) => `LKR ${n.toLocaleString('en-US')}`;
const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/["”']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

type ItemInput = {
  id?: string;
  name: string;
  category: Exclude<MenuCategory, 'all'>;
  description: string;
  price?: number;
  variants?: MenuVariant[];
  ingredients?: string[];
  servingNote?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  placeholder?: MenuItem['imagePlaceholderCategory'];
};

const LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label])) as Record<MenuCategory, string>;

function item(i: ItemInput): MenuItem {
  const variants = i.variants?.length ? i.variants : undefined;
  const base = variants ? Math.min(...variants.map((v) => v.priceLKR)) : (i.price ?? 0);
  const id = i.id ?? slugify(i.name);
  return {
    id,
    slug: id,
    name: i.name,
    category: i.category,
    categoryLabel: LABELS[i.category],
    sourceCategory: LABELS[i.category],
    description: i.description,
    priceLKR: base,
    priceFormatted: variants && variants.length > 1 ? `From ${lkr(base)}` : lkr(base),
    priceNote: 'In-store menu price · No service charge',
    branchAvailability: ['nugegoda', 'moratuwa'],
    isFeatured: i.featured,
    evidenceStatus: 'owner_printed_menu',
    sourceCitation: 'Burger House printed menu',
    sourceUrl: '',
    servingNote: i.servingNote,
    tags: i.tags,
    ingredients: i.ingredients,
    image: AI_IMAGES.has(id) ? `/menu/ai/${id}.jpg` : i.image,
    variants,
    imagePlaceholderCategory: i.placeholder,
  };
}

/** Builds Regular / With Cheese / With Egg / Special variants, skipping N/A (null). */
function cheeseEggSpecial(regular: number, cheese: number | null, egg: number | null, special: number | null): MenuVariant[] {
  const v: MenuVariant[] = [{ label: 'Regular', priceLKR: regular }];
  if (cheese != null) v.push({ label: 'With Cheese', priceLKR: cheese });
  if (egg != null) v.push({ label: 'With Egg', priceLKR: egg });
  if (special != null) v.push({ label: 'Special (Cheese & Egg)', priceLKR: special });
  return v;
}

const normalFull = (normal: number, full: number): MenuVariant[] => [
  { label: 'Normal · serves 2', priceLKR: normal },
  { label: 'Full · serves 3', priceLKR: full },
];

const SERVES = 'Normal is for 2 persons, Full is for 3 persons.';
const BURGER_BASE = ['Lettuce', 'Onion', 'Tomato', 'Cheesy mayonnaise', 'Tomato ketchup'];
const SUB_SAUCE = ['Onion sauce', 'Cheesy mayonnaise', 'Tomato ketchup'];

// ── Burgers ────────────────────────────────────────────────────────────
const BURGERS: MenuItem[] = [
  item({
    name: 'Egg Burger', category: 'burgers', placeholder: 'burger', image: IMG.burgerClassic,
    description: 'Fried egg with lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    variants: cheeseEggSpecial(500, 580, null, null),
    ingredients: ['Egg', ...BURGER_BASE],
  }),
  item({
    name: 'Veggie Burger', category: 'burgers', placeholder: 'burger', image: IMG.burgerVeggie, tags: ['Vegetarian'],
    description: 'Veggie patty with lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    variants: cheeseEggSpecial(580, 660, null, null),
    ingredients: ['Veggie patty', ...BURGER_BASE],
  }),
  item({
    id: 'chicken-burger', name: 'Chicken Burger', category: 'burgers', placeholder: 'burger', image: IMG.chickenBurgerEgg, featured: true,
    description: 'Chicken patty with lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup. Add cheese, egg, or go Special with both.',
    variants: cheeseEggSpecial(630, 710, 710, 790),
    ingredients: ['Chicken patty', ...BURGER_BASE],
    tags: ['Classic'],
  }),
  item({
    name: 'Beef Burger', category: 'burgers', placeholder: 'burger', image: IMG.burgerBeef,
    description: 'Beef patty with lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    variants: cheeseEggSpecial(850, 930, 930, 1010),
    ingredients: ['Beef patty', ...BURGER_BASE],
  }),
  item({
    id: 'crispy-chicken-burger', name: 'Crispy Chicken Burger', category: 'burgers', placeholder: 'burger', image: IMG.crispyChickenBurger, featured: true,
    description: 'Crispy chicken fillet with lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    variants: cheeseEggSpecial(850, 930, 930, 1010),
    ingredients: ['Crispy chicken fillet', ...BURGER_BASE],
    tags: ['Crispy', 'Bestseller'],
  }),
  item({
    id: 'burger-house-special-chicken', name: 'Burger House Special (Chicken)', category: 'burgers', placeholder: 'burger', image: IMG.burgerStacked, featured: true,
    description: 'Two chicken patties stacked with cheese and egg, lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    price: 910,
    ingredients: ['2 chicken patties', ...BURGER_BASE, 'Cheese', 'Egg'],
    tags: ['Signature'],
  }),
  item({
    id: 'burger-house-special-beef', name: 'Burger House Special (Beef)', category: 'burgers', placeholder: 'burger', image: IMG.burgerDoubleBeef,
    description: 'Two beef patties stacked with cheese and egg, lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    price: 1330,
    ingredients: ['2 beef patties', ...BURGER_BASE, 'Cheese', 'Egg'],
    tags: ['Signature'],
  }),
  item({
    id: 'burger-house-special-crispy-chicken', name: 'Burger House Special (Crispy Chicken)', category: 'burgers', placeholder: 'burger', image: IMG.burgerDoubleSmash,
    description: 'Two crispy chicken fillets stacked with cheese and egg, lettuce, onion, tomato, cheesy mayonnaise and tomato ketchup.',
    price: 1330,
    ingredients: ['2 crispy chicken fillets', ...BURGER_BASE, 'Cheese', 'Egg'],
    tags: ['Signature'],
  }),
];

// ── Submarines ─────────────────────────────────────────────────────────
type SubRow = [name: string, filling: string[], r: number, c: number | null, e: number | null, s: number | null];
const SUBS_9: SubRow[] = [
  ['Mayonnaise Sub', [], 410, 490, null, null],
  ['Omelette Sub', ['Omelette'], 420, 500, null, null],
  ['Umbalakada Sub', ['Umbalakada', 'Onion sauce'], 430, 510, 510, 590],
  ['Veggie Sub', ['Carrot', 'Cabbage', 'Lettuce', 'Onion', 'Tomato', 'Onion sauce'], 450, 530, null, null],
  ['Sausage Sub', ['2 sausages', 'Onion sauce'], 450, 530, 530, 610],
  ['Chicken Sub', ['Chicken', 'Onion sauce'], 460, 540, 540, 620],
  ['Fried Chicken Sub', ['Fried chicken', 'Onion sauce'], 490, 570, 570, 650],
  ['Crispy Chicken Sub', ['Crispy chicken', 'Onion sauce'], 590, 670, 670, 750],
  ['Drumstick Sub', ['2 drumsticks', 'Onion sauce'], 510, 590, 590, 670],
  ['Nugget Sub', ['5 nuggets', 'Onion sauce'], 510, 590, 590, 670],
  ['Fish Finger Sub', ['2 fish fingers', 'Onion sauce'], 510, 590, 590, 670],
  ['Hotdog Sub', ['Hotdog', 'Onion sauce'], 510, 590, 590, 670],
  ['Mini Kiev Sub', ['3 mini kievs / cheese balls', 'Onion sauce'], 520, 600, 600, 680],
  ['Kochi Bite Sub', ['3 kochi bites / spicy cheese balls', 'Onion sauce'], 520, 600, 600, 680],
  ['Beef Sub', ['Beef', 'Onion sauce'], 690, 770, 770, 850],
];

const SUBS: MenuItem[] = [
  ...SUBS_9.map(([name, filling, r, c, e, s]) => {
    const ingredients = [...filling.filter((f) => f !== 'Onion sauce'), ...(filling.includes('Onion sauce') ? SUB_SAUCE : ['Cheesy mayonnaise', 'Tomato ketchup'])];
    return item({
      id: `${slugify(name)}-9`,
      name: `${name} 9"`,
      category: 'subs', placeholder: 'sub', image: IMG.sub,
      description: `9-inch submarine with ${ingredients.join(', ').toLowerCase()}.`,
      variants: cheeseEggSpecial(r, c, e, s),
      ingredients,
      featured: name === 'Crispy Chicken Sub',
    });
  }),
  ...([
    ['Hotdog', 1150],
    ['Chicken', 1350],
    ['Spicy Chicken', 1400],
    ['Crispy Chicken', 1450],
    ['Beef', 1600],
  ] as const).map(([filling, price]) =>
    item({
      id: `${slugify(filling)}-sub-12`,
      name: `${filling} Submarine 12"`,
      category: 'subs', placeholder: 'sub', image: IMG.sub,
      description: `Footlong 12-inch ${filling.toLowerCase()} submarine.`,
      price,
      tags: ['12 inch'],
    })
  ),
];

// ── Fried Rice ─────────────────────────────────────────────────────────
const RICE_BASE = ['Basmati rice', 'Chopsuey', 'Chilli paste'];
const RICE: MenuItem[] = ([
  ['Crispy Chicken Rice', ['Crispy chicken'], 1420, 2120, IMG.rice, true],
  ['Beef Rice', ['Beef'], 1640, 2340, IMG.rice, false],
  ['Seafood Rice', ['Prawns', 'Cuttlefish', 'Fish'], 1690, 2390, IMG.rice, false],
  ['Mixed Rice', ['Chicken', 'Prawns', 'Hotdog', 'Fish'], 1740, 2440, IMG.rice, false],
  ['Nasigoreng', ['Chicken', 'Prawns', 'Hotdog', 'Bullseye egg'], 1690, 2390, IMG.riceSpecial, false],
  ['Mongolian Rice', ['Chicken', 'Prawns', 'Hotdog'], 1790, 2690, IMG.riceSpecial, false],
  ['Burger House Special Rice', ['Chicken', 'Fish', 'Prawns', 'Cuttlefish', 'Hotdog', 'Bullseye egg'], 1940, 2940, IMG.riceSpecial, true],
] as const).map(([name, protein, normal, full, image, featured]) =>
  item({
    name, category: 'fried-rice', placeholder: 'rice', image, featured,
    description: `Basmati fried rice with ${protein.join(', ').toLowerCase()}, served with chopsuey and chilli paste.`,
    variants: normalFull(normal, full),
    ingredients: [...protein, ...RICE_BASE],
    servingNote: SERVES,
  })
);

// ── Kottu & Dolphin ────────────────────────────────────────────────────
type KottuRow = [protein: string, contents: string[] | null, normal: number, full: number];
const KOTTU_PROTEINS = {
  chicken: ['Chicken'],
  beef: ['Beef'],
  seafood: ['Prawns', 'Cuttlefish', 'Fish'],
  mixed: ['Chicken', 'Fish', 'Prawns', 'Hotdog'],
  special: ['Chicken', 'Fish', 'Prawns', 'Cuttlefish', 'Hotdog'],
};

function kottuGroup(
  style: 'Kottu' | 'Cheese Kottu' | 'Dolphin' | 'Cheese Dolphin',
  prices: Record<keyof typeof KOTTU_PROTEINS, [number, number]>,
  images: [string, string]
): MenuItem[] {
  const isCheese = style.startsWith('Cheese');
  const isDolphin = style.endsWith('Dolphin');
  const base = isDolphin ? 'dolphin kottu' : 'chopped roti kottu';
  const names: Record<keyof typeof KOTTU_PROTEINS, string> = {
    chicken: `Chicken ${style}`,
    beef: `Beef ${style}`,
    seafood: `Seafood ${style}`,
    mixed: `Mixed ${style}`,
    special: `Burger House Special ${style}`,
  };
  return (Object.keys(KOTTU_PROTEINS) as (keyof typeof KOTTU_PROTEINS)[]).map((k, i) =>
    item({
      name: names[k],
      category: 'kottu', placeholder: 'kottu', image: images[i % 2],
      description: `${isCheese ? 'Cheesy ' : base[0].toUpperCase()}${isCheese ? base : base.slice(1)} with ${KOTTU_PROTEINS[k].join(', ').toLowerCase()}${isCheese ? ', finished with melted cheese' : ''}.`,
      variants: normalFull(...prices[k]),
      ingredients: [...KOTTU_PROTEINS[k], isDolphin ? 'Dolphin' : 'Roti', ...(isCheese ? ['Cheese'] : [])],
      servingNote: SERVES,
      featured: (k === 'special' && style === 'Kottu') || (k === 'chicken' && style === 'Cheese Kottu'),
      tags: [isDolphin ? 'Dolphin' : 'Kottu', ...(isCheese ? ['Cheese'] : [])],
    })
  );
}

const KOTTU_PRICES = { chicken: [1420, 2120], beef: [1640, 2340], seafood: [1690, 2390], mixed: [1740, 2440], special: [1940, 2940] } as Record<keyof typeof KOTTU_PROTEINS, [number, number]>;
const CHEESE_PRICES = { chicken: [1820, 2720], beef: [2040, 2940], seafood: [2090, 2990], mixed: [2140, 3040], special: [2340, 3540] } as Record<keyof typeof KOTTU_PROTEINS, [number, number]>;

const KOTTU: MenuItem[] = [
  ...kottuGroup('Kottu', KOTTU_PRICES, [IMG.kottuA, IMG.kottuB]),
  ...kottuGroup('Cheese Kottu', CHEESE_PRICES, [IMG.kottuB, IMG.kottuA]),
  ...kottuGroup('Dolphin', KOTTU_PRICES, [IMG.kottuA, IMG.kottuB]),
  ...kottuGroup('Cheese Dolphin', CHEESE_PRICES, [IMG.kottuB, IMG.kottuA]),
];

// ── Pasta ──────────────────────────────────────────────────────────────
const PASTA: MenuItem[] = ([
  ['Veggie Pasta', 'vegetables', 690, 790, IMG.pastaCheesy],
  ['Egg Pasta', 'egg', 750, 850, IMG.pastaCheesy],
  ['Sausage Pasta', 'sausage', 820, 920, IMG.pastaCheesy],
  ['Hotdog Pasta', 'hotdog', 860, 960, IMG.pastaCheesy],
  ['Chicken Pasta', 'seasoned chicken', 930, 1030, IMG.pastaGarlic],
  ['Crispy Chicken Pasta', 'crispy chicken', 990, 1090, IMG.pastaCheesy],
  ['Beef Pasta', 'beef', 960, 1060, IMG.pastaCheesy],
] as const).map(([name, protein, regular, cheese, image]) =>
  item({
    name, category: 'pasta', placeholder: 'pasta', image,
    description: `Penne pasta tossed with ${protein}. Make it cheesy for LKR ${cheese - regular} more.`,
    variants: [
      { label: 'Regular', priceLKR: regular },
      { label: 'With Cheese', priceLKR: cheese },
    ],
    featured: name === 'Chicken Pasta',
  })
);

// ── Fries ──────────────────────────────────────────────────────────────
const FRIES: MenuItem[] = [
  item({ name: 'French Fries', category: 'fries', placeholder: 'fries', image: IMG.frenchFries, price: 700, description: 'Hot, crispy golden french fries.' }),
  item({
    id: 'loaded-french-fries', name: 'Loaded French Fries', category: 'fries', placeholder: 'fries', image: IMG.loadedFries, price: 1190, featured: true,
    description: 'Crispy fries loaded with chopped crispy chicken, seasoned sauce and creamy mayonnaise.',
    tags: ['Popular'],
  }),
  item({
    id: 'cheesy-meaty-fries', name: 'Cheesy Meaty Fries', category: 'fries', placeholder: 'fries', image: IMG.cheesyMeatyFries, price: 1340,
    description: 'Golden fries smothered with melted cheese sauce and savoury meat topping.',
  }),
];

// ── Crispy Chicken & Portions ──────────────────────────────────────────
const CHICKEN: MenuItem[] = [
  item({ name: 'Crispy Strips', category: 'chicken-bites', placeholder: 'chicken', image: IMG.chickenStrips, price: 180, description: 'Crispy crumb-fried chicken strip (per piece).' }),
  item({ name: 'Crispy Thigh', category: 'chicken-bites', placeholder: 'chicken', image: IMG.friedChicken, price: 400, description: 'Crispy fried chicken thigh (per piece).' }),
  ...([
    ['Drumsticks', IMG.friedChicken, '5 pcs', '10 pcs + 1 free'],
    ['Fish Fingers', IMG.chickenStrips, '5 pcs', '10 pcs + 1 free'],
    ['Mini Kievs / Cheese Balls', IMG.chickenStrips, '5 pcs', '10 pcs + 1 free'],
    ['Kochi Bites / Spicy Cheese Balls', IMG.chickenStrips, '5 pcs', '10 pcs + 1 free'],
    ['Nuggets', IMG.chickenStrips, '15 pcs', '30 pcs + 2 free'],
  ] as const).map(([name, image, small, large]) =>
    item({
      id: `${slugify(name)}-portion`,
      name: `${name} Portion`,
      category: 'chicken-bites', placeholder: 'chicken', image,
      description: `Sharing portion of ${name.toLowerCase()}. Go large for a free extra.`,
      variants: [
        { label: small, priceLKR: 550 },
        { label: large, priceLKR: 1100 },
      ],
      servingNote: `${small} for LKR 550, or ${large} for LKR 1,100.`,
      tags: ['Sharing'],
    })
  ),
];

// ── Beverages ──────────────────────────────────────────────────────────
const drink = (name: string, price: number, image?: string, description?: string) =>
  item({ name, category: 'drinks', placeholder: 'drink', image, price, description: description ?? `${name}, made to order.` });

const DRINKS: MenuItem[] = [
  drink('Vanilla Milkshake', 580, IMG.milkshake, 'Thick, creamy vanilla milkshake.'),
  drink('Chocolate Milkshake', 580, IMG.milkshake, 'Thick, creamy chocolate milkshake.'),
  drink('Strawberry Milkshake', 580, IMG.milkshake, 'Thick, creamy strawberry milkshake.'),
  drink('Mango Milkshake', 580, IMG.milkshake, 'Thick, creamy mango milkshake.'),
  drink('Fruit & Nut Milkshake', 580, IMG.milkshake, 'Milkshake blended with fruit and nuts.'),
  drink('Mojito (Pomegranate)', 580, undefined, 'Refreshing pomegranate mojito.'),
  drink('Mojito (Curacao)', 580, undefined, 'Refreshing blue curacao mojito.'),
  drink('Mojito (Pineapple)', 580, undefined, 'Refreshing pineapple mojito.'),
  drink('Mojito (Lemon & Mint)', 580, undefined, 'Classic lemon and mint mojito.'),
  drink('Faluda', 580, undefined, 'Traditional rose-flavoured faluda.'),
  drink('Iced Coffee', 580, undefined, 'Chilled iced coffee.'),
  drink('Iced Milo', 580, undefined, 'Chilled iced Milo.'),
  drink('Pepsi (300 ml)', 250, undefined, 'Chilled Pepsi, 300 ml.'),
  drink('Coca Cola (300 ml)', 250, IMG.cola, 'Chilled Coca Cola, 300 ml.'),
  drink('Sprite (300 ml)', 250, undefined, 'Chilled Sprite, 300 ml.'),
  drink('Nescafe', 100, undefined, 'Hot Nescafe.'),
  drink('Nestea', 100, undefined, 'Nestea.'),
  item({
    name: 'Water Bottle', category: 'drinks', placeholder: 'drink', description: 'Bottled drinking water.',
    variants: [
      { label: '500 ml', priceLKR: 70 },
      { label: '1000 ml', priceLKR: 100 },
    ],
  }),
];

export const MENU_ITEMS: MenuItem[] = [...BURGERS, ...SUBS, ...RICE, ...KOTTU, ...PASTA, ...FRIES, ...CHICKEN, ...DRINKS];

// ── Extras ─────────────────────────────────────────────────────────────
export const BURGER_ADDONS: MenuExtra[] = [
  { name: 'Cheese', priceLKR: 120 },
  { name: 'Egg', priceLKR: 90 },
  { name: 'Veggie Patty', priceLKR: 250 },
  { name: 'Chicken Patty', priceLKR: 200 },
  { name: 'Beef Patty', priceLKR: 350 },
  { name: 'Crispy Chicken Fillet', priceLKR: 450 },
  { name: 'Cordon Bleu Patty', priceLKR: null },
];

export const SUB_PASTA_ADDONS: MenuExtra[] = [
  { name: 'Cheese', priceLKR: 120 },
  { name: 'Egg', priceLKR: 90 },
  { name: 'Sausage', priceLKR: 80 },
  { name: 'Chicken', priceLKR: 200 },
  { name: 'Fried Chicken', priceLKR: 200 },
  { name: 'Crispy Chicken', priceLKR: 250 },
  { name: 'Drumstick', priceLKR: 100 },
  { name: 'Nugget', priceLKR: 50 },
  { name: 'Fish Finger', priceLKR: 100 },
  { name: 'Hotdog', priceLKR: 200 },
  { name: 'Mini Kiev / Cheese Ball', priceLKR: 100 },
  { name: 'Kochi Bite / Spicy Cheese Ball', priceLKR: 100 },
  { name: 'Beef', priceLKR: 300 },
];

export const RICE_KOTTU_EXTRA_PORTIONS: MenuExtra[] = [
  { name: 'Chicken', priceLKR: 500 },
  { name: 'Beef', priceLKR: 650 },
  { name: 'Hotdog', priceLKR: 200 },
  { name: 'Prawns', priceLKR: 400 },
  { name: 'Cuttlefish', priceLKR: 400 },
  { name: 'Fish', priceLKR: 400 },
];

export const SAUCE_EXTRAS: MenuExtra[] = [
  { name: 'Extra Mayonnaise Cup (Medium)', priceLKR: 120 },
  { name: 'Extra Mayonnaise Cup (Large)', priceLKR: 160 },
];

export const MEAL_UPGRADES: MealUpgrade[] = [
  {
    id: 'meal-option-1',
    name: 'Meal Upgrade 1',
    priceLKR: 890,
    includes: ['French Fries', '2 Nuggets', '1 Mini Kiev / Cheese Ball', '1 Drumstick', '1 Fish Finger', 'Pepsi 300 ml'],
    appliesTo: 'Burgers, submarines and pasta',
  },
  {
    id: 'meal-option-2',
    name: 'Meal Upgrade 2',
    priceLKR: 500,
    includes: ['French Fries', 'Pepsi 300 ml'],
    appliesTo: 'Submarines and pasta',
  },
];

/** Which extras apply to an item's category (used by the item detail view). */
export function extrasFor(category: MenuCategory): { title: string; items: MenuExtra[] }[] {
  switch (category) {
    case 'burgers':
      return [{ title: 'Burger Add-ons', items: BURGER_ADDONS }, { title: 'Sauces', items: SAUCE_EXTRAS }];
    case 'subs':
    case 'pasta':
      return [{ title: 'Add-ons', items: SUB_PASTA_ADDONS }, { title: 'Sauces', items: SAUCE_EXTRAS }];
    case 'fried-rice':
    case 'kottu':
      return [{ title: 'Additional Portions', items: RICE_KOTTU_EXTRA_PORTIONS }];
    case 'fries':
    case 'chicken-bites':
      return [{ title: 'Sauces', items: SAUCE_EXTRAS }];
    default:
      return [];
  }
}

export function mealUpgradesFor(category: MenuCategory): MealUpgrade[] {
  if (category === 'burgers') return MEAL_UPGRADES.filter((m) => m.id === 'meal-option-1');
  if (category === 'subs' || category === 'pasta') return MEAL_UPGRADES;
  return [];
}

export const formatLKR = lkr;
