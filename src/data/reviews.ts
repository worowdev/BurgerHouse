export interface GoogleReviewLink {
  branch: 'Nugegoda' | 'Moratuwa';
  /** Google star rating out of 5. Update from the Google listing when it changes. */
  rating: number;
  /** Number of Google reviews, or null to hide the count. */
  reviewCount: number | null;
  url: string;
}

export const GOOGLE_REVIEWS: GoogleReviewLink[] = [
  {
    branch: 'Nugegoda',
    rating: 4.5,
    reviewCount: null,
    url: 'https://www.google.com/search?q=burger+house+-+nugegoda&si=AE1YtOqiKPb2pdLXAi8quZ9vbH4aVq_aX8-3H9iFBLpRNK95c1ocX1Ez4OSp6FCxJa3XLtuEzIorhm8dQk3_2aP6TEZMKLolrnSeW1mTCWsdBuEIj5R5R3j3i7f30-BdD0oXlWvRRgX2tmDEJ6gvuOGX1panzC3ZdQ%3D%3D',
  },
  {
    branch: 'Moratuwa',
    rating: 4.5,
    reviewCount: null,
    url: 'https://www.google.com/search?sca_esv=03a4f378d90a05b9&biw=1536&bih=730&sxsrf=AKL5yDgq_2Dpb4Ifq3LpyIb6GULWao87gA:1793864731252&q=burger+house+moratuwa&si=AE1YtOqiKPb2pdLXAi8quZ9vbH4aVq_aX8-3H9iFBLpRNK95c3wWoOUp6ElZtIo0Iwe9cooRhG4GVYUi_qlI21cg38c2pxQlsEfM-xHmXQgVNnWa8-wHE8UBCITf4QQ8Q0adBbL69QoCCfZI-NUqQ94F2oYQuLvXbA%3D%3D&uds=AE2AFgZ2jEs7pfCtrwfpxOWhzAe2HCZHFgwWPWNHh5F1QXv7CAFOPfF3mhcuRbvgN1dLe-0zx4DLqqYoUYOOkmNFkK1tLPhx49f27e-Df8MvSMVyvzq0Oxf9TzL3BrZV0W24IXk8CwdC&sa=X&ved=2ahUKEwiH5NLwqvCXAxVPzjgGHZF5DAwQrrQLegQIIRAA',
  },
];
