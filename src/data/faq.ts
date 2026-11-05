export interface FAQItem {
  question: string;
  answer: string;
  category: 'ordering' | 'branches' | 'menu' | 'dietary';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'branches',
    question: 'Where are your branches?',
    answer: 'We have two branches: 177d Stanley Thilakarathna Mawatha, Nugegoda, and 291 Old Galle Road, Moratuwa.'
  },
  {
    category: 'branches',
    question: 'What are your opening hours?',
    answer: 'Both branches are open every day from 8:00 AM to 1:00 AM.'
  },
  {
    category: 'ordering',
    question: 'How do I order?',
    answer: 'Order for delivery on Uber Eats, or come in for dine in or takeaway. You can also call the branch: Nugegoda +94 77 226 4477, Moratuwa +94 77 229 9827.'
  },
  {
    category: 'menu',
    question: 'Why are Uber Eats prices different?',
    answer: 'The prices on this site are our in-store prices, with no service charge. Uber Eats sets its own prices, which are usually higher.'
  },
  {
    category: 'menu',
    question: 'How many people does a Normal or Full portion serve?',
    answer: 'For fried rice, kottu and dolphin, a Normal portion serves 2 and a Full portion serves 3.'
  },
  {
    category: 'menu',
    question: 'Can I make it a meal?',
    answer: 'Yes. Add Meal Upgrade 1 for LKR 890 to any burger, sub or pasta. It includes fries, 2 nuggets, a mini Kiev or cheese ball, a drumstick, a fish finger and a 300 ml Pepsi. Meal Upgrade 2 is LKR 500 for fries and a Pepsi, and works with subs and pasta.'
  },
  {
    category: 'dietary',
    question: 'Do you have info on allergens or halal?',
    answer: 'Please call the branch and ask before you order. Our food can contain dairy, egg and gluten.'
  }
];
