import { Branch } from '@/types';

export const BRANCHES: Record<string, Branch> = {
  nugegoda: {
    id: 'nugegoda',
    name: 'Burger House Nugegoda',
    slug: 'nugegoda',
    mapAddress: '177d Stanley Thilakarathna Mawatha, Nugegoda 10250',
    phone: '+94 77 226 4477',
    telephoneUri: 'tel:+94772264477',
    googleMapsPlaceId: 'ChIJRX2zOKJb4joR2pxF5T7Q22k',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Burger+House+Nugegoda&query_place_id=ChIJRX2zOKJb4joR2pxF5T7Q22k',
    uberEatsUrl: 'https://www.ubereats.com/lk/store/burger-house/FjjZmj8DQDGcI0rj53zamQ',
    hoursDisplay: 'Open Daily: 8:00 AM to 1:00 AM',
    provisionalHours: 'Open daily for dine in, takeaway and delivery',
    addressStatus: 'confirmed',
    verificationNotes: 'Stanley Thilakarathna Mawatha, Nugegoda',
    badge: 'Nugegoda Branch',
    tagline: 'Stanley Thilakarathna Mawatha, Nugegoda',
    features: ['Dine In', 'Takeaway', 'Uber Eats Delivery', 'Late Night Bites']
  },
  moratuwa: {
    id: 'moratuwa',
    name: 'Burger House Moratuwa',
    slug: 'moratuwa',
    mapAddress: '291 Old Galle Road, Moratuwa 10400',
    phone: '+94 77 229 9827',
    telephoneUri: 'tel:+94772299827',
    googleMapsPlaceId: 'ChIJtQBPB1pF4joRBr6Pi0rlfHE',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Burger+House+Moratuwa&query_place_id=ChIJtQBPB1pF4joRBr6Pi0rlfHE',
    uberEatsUrl: 'https://www.ubereats.com/lk/store/burger-house-moratuwa/HcEXXYHXUrWlLFVVtBAYCA',
    hoursDisplay: 'Open Daily: 8:00 AM to 1:00 AM',
    provisionalHours: 'Open daily for dine in, takeaway and delivery',
    addressStatus: 'confirmed',
    verificationNotes: 'Old Galle Road, Moratuwa',
    badge: 'Moratuwa Branch',
    tagline: 'Old Galle Road, Moratuwa Town',
    features: ['Dine In', 'Takeaway', 'Uber Eats Delivery', 'Friendly Service']
  }
};

export const BRANCH_LIST: Branch[] = Object.values(BRANCHES);
