# VELMORA — static storefront

A responsive HTML/CSS/vanilla JavaScript chocolate storefront, ready to deploy to Vercel.

## Run locally
Open `index.html` in a browser, or run a local static server:
```bash
npx serve .
```

## Deploy to Vercel
1. Extract this ZIP and push the `velmora-website` folder contents to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Other**. Build command: leave blank. Output directory: `.`.
4. Deploy.

No build step or environment variables are required.

## Included
- Responsive landing page and navigation
- Product search, category filters and price sorting
- Add-to-cart, quantity controls, remove item, persistent cart (localStorage)
- Demo checkout and newsletter feedback
- Original AI-generated hero photograph in `assets/`
- Sample product photos loaded from Unsplash

## Before taking real orders
This is a front-end demo. Checkout does not charge a payment method or create a real order. Connect a secure backend, database, shipping workflow and payment provider (for example, a suitable Indian payment gateway) before launch. Replace sample prices, product descriptions, email/social links and nutrition/ingredient information with verified business details. Only label products “sugar-free” or “no added sugar” when they meet applicable Indian FSSAI requirements.
