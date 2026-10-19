export type Audience = "Men" | "Women";
export type GarmentCategory = "T-shirts" | "Shirts" | "Blazers" | "Trousers" | "Jackets";
export type CatalogProduct = {
  slug: string;
  sku: string;
  audience: Audience;
  category: GarmentCategory;
  name: string;
  color: string;
  priceInr: number;
  image: string;
  alt: string;
  retailer: string;
  sourceUrl: string;
  sourceType: "product" | "category";
  composition: string;
  construction: string[];
  designNote: string;
  featured?: boolean;
};

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "mens-faded-pink-heavyweight-tee", sku: "REF-M-TS-01", audience: "Men", category: "T-shirts", name: "Faded Pink Heavyweight Tee", color: "Faded pink",
    priceInr: 1890, image: "https://static.zara.net/assets/public/d8f0/7eb4/e0564f2fb3c6/ca1e7db7a326/00761840633-p/00761840633-p.jpg?ts=1777993183374&w=375",
    alt: "Model wearing a faded pink short-sleeve T-shirt with a relaxed silhouette and dark trousers.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/basic-heavyweight-t-shirt--03-p01887410.html", sourceType: "product",
    composition: "Retailer product reference: compact cotton is specified for the heavyweight tee style. Re-check the linked page for this colour's current composition.",
    construction: ["Crew neckline", "Short sleeves", "Heavier-looking jersey surface"],
    designNote: "A substantial, relaxed base layer gives the outfit structure without relying on a printed logo.", featured: true
  },
  {
    slug: "mens-white-slim-stretch-tee", sku: "REF-M-TS-02", audience: "Men", category: "T-shirts", name: "White Slim Stretch Tee", color: "White",
    priceInr: 1290, image: "https://static.zara.net/assets/public/2692/a590/ec404fda858c/1406bf4fa2b0/05584401250-p/05584401250-p.jpg?ts=1765295541239&w=375",
    alt: "Model wearing a white slim-fit short-sleeve T-shirt with dark trousers.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/basic-slim-fit-t-shirt--01-p05584401.html", sourceType: "product",
    composition: "The linked product describes a stretch-cotton T-shirt; see its current composition and care section for exact percentages.",
    construction: ["Slim fit", "Crew neck", "Short sleeves"],
    designNote: "The slimmer silhouette provides a lower-bulk layer under an overshirt or blazer."
  },
  {
    slug: "mens-green-stripe-tee", sku: "REF-M-TS-03", audience: "Men", category: "T-shirts", name: "Green and Ecru Stripe Tee", color: "Green / ecru",
    priceInr: 2190, image: "https://static.zara.net/assets/public/3c65/6203/b5464cccac57/2b0121d3174d/05644420104-000-p/05644420104-000-p.jpg?ts=1772613515263",
    alt: "Model wearing a green and off-white horizontally striped short-sleeve T-shirt.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/au/en/striped-short-sleeve-t-shirt-p05644420.html", sourceType: "product",
    composition: "The linked retailer's regional listing describes a polyester/cotton blend. Exact percentages can vary by colour and region; verify on source.",
    construction: ["Horizontal stripes", "Contrast rib neckline", "Short sleeves"],
    designNote: "The stripe supplies pattern through the knit itself, so extra graphics are unnecessary."
  },
  {
    slug: "mens-mint-pocket-tee", sku: "REF-M-TS-04", audience: "Men", category: "T-shirts", name: "Mint Pocket Tee", color: "Mint green",
    priceInr: 1790, image: "https://static.zara.net/assets/public/add5/8444/29884044ae4e/57f5da4e2464/00962304530-p/00962304530-p.jpg?ts=1779435843855",
    alt: "Model wearing a mint green regular-fit T-shirt with a small chest patch pocket.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/regular-fit-t-shirt-with-patch-pocket-p00962304.html", sourceType: "product",
    composition: "Not recorded from the retrieved product details. Check the linked listing before making a fibre-content claim.",
    construction: ["Regular fit", "Chest patch pocket", "Crew neck"],
    designNote: "A functional pocket changes the front panel without turning the garment into a graphic tee."
  },
  {
    slug: "mens-black-heavyweight-tee", sku: "REF-M-TS-05", audience: "Men", category: "T-shirts", name: "Black Heavyweight Tee", color: "Black",
    priceInr: 1890, image: "https://static.zara.net/assets/public/555b/2039/64144984b0a0/2ddc3f69a90b/01887410800-000-a1/01887410800-000-a1.jpg?ts=1776080848335",
    alt: "Model wearing a black heavyweight crew-neck T-shirt in a studio portrait.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/man-tshirts-l855.html", sourceType: "category",
    composition: "The image is a heavyweight tee reference. The exact item listing and composition are not verified from the category-level source.",
    construction: ["Crew neck", "Short sleeves", "Dark solid surface"],
    designNote: "A clean black base keeps attention on proportion and how the fabric falls."
  },
  {
    slug: "womens-white-v-neck-tee", sku: "REF-W-TS-01", audience: "Women", category: "T-shirts", name: "White Interlock V-Neck Tee", color: "White",
    priceInr: 1490, image: "https://static.zara.net/assets/public/c535/e11e/9dfe4dc3a615/c29bfa260170/03641008250-a1/03641008250-a1.jpg?ts=1770718901384",
    alt: "Model wearing a white short-sleeve V-neck T-shirt with a clean, close-fitting silhouette.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/interlock-v-neck-t-shirt-p03641008.html", sourceType: "product",
    composition: "The exact fibre percentages were not captured in the available product description. See the linked product page.",
    construction: ["V neckline", "Short sleeves", "Interlock-knit appearance"],
    designNote: "A V neckline changes the visual frame of the upper body while keeping the rest of the garment simple.", featured: true
  },
  {
    slug: "womens-brown-stripe-wide-sleeve-tee", sku: "REF-W-TS-02", audience: "Women", category: "T-shirts", name: "Brown Stripe Wide-Sleeve Tee", color: "Brown / ecru",
    priceInr: 1790, image: "https://static.zara.net/assets/public/d643/2e57/918d49c2b95b/eb7ac91a4429/04424629178-p/04424629178-p.jpg?ts=1783419434211&w=375",
    alt: "Model wearing a brown-and-light striped short-sleeve T-shirt with wider sleeves.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/striped-wide-sleeve-t-shirt-p04424629.html", sourceType: "product",
    composition: "Not confirmed in the retrieved product details; consult the live product page for fibre composition.",
    construction: ["Horizontal stripe", "Wide short sleeves", "Crew neckline"],
    designNote: "The sleeve volume is the defining feature; the stripe is kept consistent with the relaxed proportion."
  },
  {
    slug: "mens-beige-100-linen-shirt", sku: "REF-M-SH-01", audience: "Men", category: "Shirts", name: "Light Beige Linen Shirt", color: "Light beige",
    priceInr: 3290, image: "https://static.zara.net/assets/public/6600/c341/1f6942c899ae/d63a5d217a0e/03090010052-a1/03090010052-a1.jpg?ts=1740385814911",
    alt: "Model wearing a light beige long-sleeve linen shirt with the cuffs rolled up.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/100-linen-shirt-p03090010.html", sourceType: "product",
    composition: "Product title identifies 100% linen. The live page's listed selling price and availability may change.",
    construction: ["Regular fit", "Button front", "Long sleeves with buttoned cuffs"],
    designNote: "The visible natural slub gives the neutral colour depth. Linen wrinkles are a characteristic of the fibre, not a defect.", featured: true
  },
  {
    slug: "mens-navy-stripe-boxy-shirt", sku: "REF-M-SH-02", audience: "Men", category: "Shirts", name: "Navy Stripe Boxy Shirt", color: "Navy / white",
    priceInr: 2790, image: "https://static.zara.net/assets/public/f07d/4a6a/8a8c427b9ad4/32a01f96fe08/01000818422-p/01000818422-p.jpg?f=auto&ts=1777454619599&w=792",
    alt: "Model wearing a navy and white striped boxy short-sleeve shirt with a camp collar.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/boxy-fit-striped-shirt-p01000818.html", sourceType: "product",
    composition: "Exact fibre composition should be confirmed on the linked listing.",
    construction: ["Boxy fit", "Camp collar", "Short sleeves", "Vertical graphic-like stripe pattern"],
    designNote: "A boxy cut gives the shirt a more squared outline; the stripe provides its primary visual contrast."
  },
  {
    slug: "womens-white-poplin-shirt", sku: "REF-W-SH-01", audience: "Women", category: "Shirts", name: "White Cotton Poplin Shirt", color: "White",
    priceInr: 2790, image: "https://static.zara.net/assets/public/c5f3/7f29/e89144ce8108/9f76ddbf6f1b/06100600250-p/06100600250-p.jpg?ts=1778063339697&w=560",
    alt: "Model wearing a white cotton poplin button-up shirt with a curved hem and blue jeans.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/zw-collection-poplin-shirt-p06100600.html", sourceType: "product",
    composition: "The source listing describes the main fabric as spun cotton. Check its care tab for precise composition.",
    construction: ["Regular collar", "Long cuffed sleeves", "Asymmetric rounded hem", "Concealed front placket"],
    designNote: "The curved hem and concealed placket create a cleaner front while retaining a conventional button-up structure.", featured: true
  },
  {
    slug: "womens-blue-denim-shirt", sku: "REF-W-SH-02", audience: "Women", category: "Shirts", name: "Light Blue Denim Shirt", color: "Light blue",
    priceInr: 2990, image: "https://static.zara.net/assets/public/f227/9f71/adef4f39978d/9ee407be9670/07147021405-1-a1/07147021405-1-a1.jpg?ts=1772723200151",
    alt: "Model wearing a relaxed light blue denim shirt with a chest pocket and rolled sleeves.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/sa/en/woman-shirts-denim-l1786.html", sourceType: "category",
    composition: "The supplied page is a category listing. Exact item identity and fibre composition are not confirmed here.",
    construction: ["Denim surface", "Relaxed fit", "Chest pocket", "Rolled sleeves in styling"],
    designNote: "A denim shirt can act as a mid-layer as well as a shirt; the visible topstitching helps define its panel construction."
  },
  {
    slug: "womens-ivory-navy-stripe-shirt", sku: "REF-W-SH-03", audience: "Women", category: "Shirts", name: "Ivory and Navy Stripe Shirt", color: "Ivory / navy",
    priceInr: 2490, image: "https://di2ponv0v5otw.cloudfront.net/posts/2025/06/14/684e43fb32b786588b1d0a12/m_wp_684e4405e9c77dcb533e90b9.webp",
    alt: "Model wearing an ivory button-up shirt with navy vertical stripes and a relaxed collar.",
    retailer: "Poshmark listing", sourceUrl: "https://poshmark.com/listing/Zara-ivory-and-Navy-Striped-ButtonUp-Shirt-satin-silky-684e43fb32b786588b1d0a12", sourceType: "product",
    composition: "The resale listing describes a satin-like surface but does not provide a verified fibre breakdown.",
    construction: ["Vertical stripes", "Button front", "Long sleeves", "Soft drape visible in styling"],
    designNote: "The sheen and vertical stripe make this a dressier reference than a matte poplin shirt."
  },
  {
    slug: "mens-indigo-linen-cotton-blazer", sku: "REF-M-BL-01", audience: "Men", category: "Blazers", name: "Indigo Double-Breasted Blazer", color: "Indigo",
    priceInr: 8990, image: "https://static.zara.net/assets/public/d85a/58ae/57d54fe586ac/1dfaf608ceef/04552594405-p/04552594405-p.jpg?f=auto&ts=1777967984545&w=792",
    alt: "Model wearing an indigo double-breasted blazer with notched lapels and matching tailored trousers.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/double-breasted-linen-cotton-suit-blazer-p04552594.html", sourceType: "product",
    composition: "The product title identifies a linen/cotton blend. See the retailer page for exact proportions.",
    construction: ["Double-breasted fastening", "Notched lapels", "Hip flap pockets", "Buttoned cuffs"],
    designNote: "The crossing front adds structure and visual weight. A linen/cotton blend is a different hand-feel proposition from a fully wool tailored jacket.", featured: true
  },
  {
    slug: "mens-beige-linen-suit-blazer", sku: "REF-M-BL-02", audience: "Men", category: "Blazers", name: "Light Beige 100% Linen Blazer", color: "Light beige",
    priceInr: 8990, image: "https://static.zara.net/assets/public/9376/bbdf/53da486dbd82/c3cee0a31362/04283333052-a3/04283333052-a3.jpg?ts=1770281735806&w=%7Bwidth%7D",
    alt: "Model wearing a light beige single-breasted linen blazer with matching trousers.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/100-linen-suit-blazer-p04283333.html", sourceType: "product",
    composition: "Product title identifies 100% linen. Verify the linked item's current composition and lining details.",
    construction: ["Regular fit", "Notched lapels", "Chest welt pocket", "Hip flap pockets", "Back vents"],
    designNote: "The pale linen and visible natural texture create a lighter visual weight than a dark, tightly woven suit.", featured: true
  },
  {
    slug: "mens-brown-check-blazer", sku: "REF-M-BL-03", audience: "Men", category: "Blazers", name: "Brown Check Suit Blazer", color: "Brown check",
    priceInr: 9990, image: "https://static.zara.net/assets/public/4ff7/4505/e65449ffa768/0cf4a9c0b88f/05746439719-p/05746439719-p.jpg?f=auto&ts=1755171666603&w=792",
    alt: "Model wearing a brown check tailored blazer with a beige V-neck knit and matching trousers.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/check-suit-blazer-p05746439.html", sourceType: "product",
    composition: "The product listing describes a wool-blend style; confirm current percentages on the live page.",
    construction: ["Notched lapels", "Welt chest pocket", "Hip flap pockets", "Matching check trousers in the photograph"],
    designNote: "A restrained check adds surface complexity without needing oversized artwork."
  },
  {
    slug: "womens-white-linen-blazer", sku: "REF-W-BL-01", audience: "Women", category: "Blazers", name: "White Linen Blazer", color: "White",
    priceInr: 8990, image: "https://static.zara.net/assets/public/197c/0171/fd5644388b69/4f1c4b05f6cb/02909681250-a4/02909681250-a4.jpg?ts=1779377049996&w=560",
    alt: "Model wearing a white linen blazer with wide-leg trousers in a minimalist studio.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/us/en/zw-collection-100-linen-blazer-p02909681.html", sourceType: "product",
    composition: "Product title identifies 100% linen. This source is a US regional listing; price and availability may differ by region.",
    construction: ["Stand-up collar", "Straight hem", "Front button fastening", "Buttoned sleeve vents"],
    designNote: "A low-contrast monochrome outfit makes the garment's cut and seam placement more visible."
  },
  {
    slug: "womens-black-shoulder-pad-blazer", sku: "REF-W-BL-02", audience: "Women", category: "Blazers", name: "Black Tailored Blazer with Shoulder Pads", color: "Black",
    priceInr: 7990, image: "https://static.zara.net/assets/public/3929/5422/e95240d29e4d/971fd9060354/07973668800-p/07973668800-p.jpg?ts=1788274132821&w=560",
    alt: "Model wearing a black tailored blazer with structured shoulders and notched lapels.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/sg/en/tailored-blazer-with-shoulder-pads-p07973668.html", sourceType: "product",
    composition: "The exact fibre composition is not recorded. The linked regional page should be checked before stating one.",
    construction: ["Structured shoulders", "Notched lapels", "Long sleeves", "Front button fastening"],
    designNote: "Shoulder structure changes the silhouette and how the blazer sits over a lighter base layer."
  },
  {
    slug: "womens-sand-tailored-blazer", sku: "REF-W-BL-03", audience: "Women", category: "Blazers", name: "Sand Tailored Blazer", color: "Sand",
    priceInr: 8990, image: "https://static.zara.net/assets/public/e340/d9c0/df7b480bb804/926abe7e5866/03004369711-a11/03004369711-a11.jpg?ts=1776337766723&w=%7Bwidth%7D",
    alt: "Model wearing a sand-coloured tailored blazer with a white top and coordinating trousers.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/us/en/zw-collection-limited-edition-fitted-blazer-p03004369.html", sourceType: "product",
    composition: "Not recorded from the retrieved source. Verify the product page before publishing fibre content.",
    construction: ["Tailored lapels", "Single-button front", "Rolled sleeve styling in the photograph"],
    designNote: "A warm neutral makes the cut easy to read; the visible contrast comes from styling rather than a large logo."
  },
  {
    slug: "mens-black-wide-leg-trousers", sku: "REF-M-TR-01", audience: "Men", category: "Trousers", name: "Black Wide-Leg Pleated Trousers", color: "Black",
    priceInr: 3990, image: "https://static.zara.net/assets/public/6b16/152d/db584e04b54f/37686741deb5/05070401800-p/05070401800-p.jpg?ts=1753860146244&w=%7Bwidth%7D",
    alt: "Model wearing black wide-leg pleated trousers with a grey crew-neck T-shirt.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/man-trousers-black-l2524.html", sourceType: "category",
    composition: "Category-level visual reference only. The exact product and fibre composition have not been identified from this image.",
    construction: ["Wide leg", "Pleated front appearance", "Dark solid colour"],
    designNote: "A wider leg changes the line of the outfit and allows fabric to fall away from the calf."
  },
  {
    slug: "mens-navy-mohair-trousers", sku: "REF-M-TR-02", audience: "Men", category: "Trousers", name: "Navy Kid-Mohair Trousers", color: "Navy",
    priceInr: 14990, image: "https://www.prada.com/content/dam/pradabkg_products/P/P27/P273I/12I1F0008/P273I_12I1_F0008_S_OOO_MDF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1200.1200.jpg",
    alt: "Product image of navy tailored trousers with a clean, straight line and subtle fabric texture.",
    retailer: "Prada", sourceUrl: "https://www.prada.com/us/en/p/kid-mohair-pants/P273I_12I1_F0008_S_OOO", sourceType: "product",
    composition: "The exact composition was not captured in the retrieved product data; follow the source page for full fibre details.",
    construction: ["Tailored trouser shape", "Navy colour", "Clean front presentation"],
    designNote: "A dark monochrome trouser is a useful reference for studying drape and tailoring without a high-contrast print."
  },
  {
    slug: "womens-ecru-pleated-wide-leg-trousers", sku: "REF-W-TR-01", audience: "Women", category: "Trousers", name: "Ecru Pleated Wide-Leg Trousers", color: "Ecru",
    priceInr: 4490, image: "https://static.zara.net/assets/public/975b/b76a/3efc4cd8968f/223fc4965786/01950199712-p/01950199712-p.jpg?ts=1778063213476",
    alt: "Model wearing ecru wide-leg pleated trousers with a sleeveless knit top.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/wide-leg-pleated-trousers-zw-collection-p01950199.html", sourceType: "product",
    composition: "The retrieved page describes 100% polyester. See the retailer listing for current composition and care instructions.",
    construction: ["Front pleats", "Wide leg", "Concealed side-seam pockets", "Zip, button and hook closure"],
    designNote: "Front pleats create controlled volume at the waist; the wide leg carries that volume through the silhouette."
  },
  {
    slug: "womens-black-wide-leg-trousers", sku: "REF-W-TR-02", audience: "Women", category: "Trousers", name: "Black High-Waist Wide-Leg Trouser Study", color: "Black",
    priceInr: 3490, image: "https://static.zara.net/assets/public/5eaf/2f83/12504f3190ed/3499f085be0d/04786096250-p/04786096250-p.jpg?ts=1781682288316",
    alt: "Model styled in black high-waist wide-leg trousers with a white shirt.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/woman-trousers-l1335.html", sourceType: "category",
    composition: "Category-level styling reference. Exact product identity and fibre composition are unverified.",
    construction: ["High waist appearance", "Wide leg", "Dark solid surface"],
    designNote: "The monochrome contrast makes leg line and trouser volume easier to study without assigning an unverified fibre claim."
  },
  {
    slug: "mens-sand-cotton-lyocell-jacket", sku: "REF-M-JK-01", audience: "Men", category: "Jackets", name: "Sand Cotton-Lyocell Utility Jacket", color: "Sand",
    priceInr: 5990, image: "https://static.zara.net/assets/public/1094/7926/aed14e858b11/d45d4052a58c/03046520711-p/03046520711-p.jpg?ts=1782222731325",
    alt: "Model wearing a sand cotton-lyocell jacket with a high collar and flap pockets.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/in/en/cotton-lyocell-regular-fit-jacket-p03046520.html", sourceType: "product",
    composition: "The listing describes a cotton and lyocell blend. Confirm exact percentages on the linked page.",
    construction: ["High collar", "Zip front", "Flap pockets at the hip", "Elasticated trims"],
    designNote: "The large pockets are visible and practical-looking without adding unnecessary surface graphics."
  },
  {
    slug: "mens-brown-technical-hooded-jacket", sku: "REF-M-JK-02", audience: "Men", category: "Jackets", name: "Brown Technical Hooded Jacket", color: "Brown",
    priceInr: 6990, image: "https://static.zara.net/assets/public/b11a/ffc4/763842b3a60b/9368df412ee8/00155792700-p/00155792700-p.jpg?ts=1788191281768&w=560",
    alt: "Model wearing a brown cropped technical jacket with a high neck and hood.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/uk/en/cropped-fit-technical-hooded-jacket-p00155792.html", sourceType: "product",
    composition: "Exact fibre content not captured; the source is a UK regional listing, so availability and price may differ.",
    construction: ["Cropped fit", "High neck with hood", "Welt pockets", "Adjustable hem"],
    designNote: "An adjustable hem and higher neck show how small construction decisions can change the jacket's shape."
  },
  {
    slug: "mens-light-blue-denim-jacket", sku: "REF-M-JK-03", audience: "Men", category: "Jackets", name: "Light Blue Denim Jacket", color: "Light blue",
    priceInr: 4990, image: "https://static.zara.net/assets/public/aa76/e1c4/56f340749b64/acc3c37ef4e6/06688488406-a1/06688488406-a1.jpg?ts=1769442767854",
    alt: "Model wearing a light blue denim jacket with chest flap pockets and faded finish.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/tr/en/limited-edition-denim-jacket-p06688488.html", sourceType: "product",
    composition: "The source description identifies 100% cotton denim. This is a Turkey regional listing.",
    construction: ["Denim fabric", "Chest flap pockets", "Button front", "Faded finish"],
    designNote: "Denim makes panel seams and topstitching visible. This is a useful construction reference for a utility-led outer layer."
  },
  {
    slug: "womens-black-faux-leather-bomber", sku: "REF-W-JK-01", audience: "Women", category: "Jackets", name: "Black High-Neck Faux-Leather Bomber", color: "Black",
    priceInr: 6990, image: "https://static.zara.net/assets/public/0d62/4c5b/dfdd4139b6d9/a88e8ac75613/06318250800-a5/06318250800-a5.jpg?ts=1756916774453&w=%7Bwidth%7D",
    alt: "Model wearing a black high-neck faux-leather bomber jacket over a denim shirt.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/th/en/high-neck-faux-leather-bomber-jacket-p06318250.html", sourceType: "product",
    composition: "Faux-leather describes the surface category, not the backing composition. See the retailer's composition section for exact materials.",
    construction: ["High neck", "Front snap fastening", "Welt pockets", "Elasticated hem"],
    designNote: "The glossy surface and elasticated hem give this reference a different visual and fit profile from matte woven jackets."
  },
  {
    slug: "womens-black-belted-leather-effect-jacket", sku: "REF-W-JK-02", audience: "Women", category: "Jackets", name: "Black Belted Leather-Effect Jacket", color: "Black",
    priceInr: 7990, image: "https://static.zara.net/assets/public/c46b/abf3/4dd34f12aca3/89d476d3c486/04341823800-a1/04341823800-a1.jpg?ts=1769163864060&w=%7Bwidth%7D",
    alt: "Model wearing a black belted leather-effect jacket with a wide lapel collar.",
    retailer: "Zara", sourceUrl: "https://www.zara.com/uk/en/leather-effect-jacket-with-belt-p04341823.html", sourceType: "product",
    composition: "Leather-effect is not real leather. Check the product page for shell and lining fibre details.",
    construction: ["Wide lapel collar", "Matching belt", "Long sleeves", "Glossy surface"],
    designNote: "A belt adds waist adjustment and creates a different silhouette from an elasticated bomber."
  },
  {
    slug: "womens-beige-belted-trench-coat", sku: "REF-W-JK-03", audience: "Women", category: "Jackets", name: "Beige Double-Breasted Belted Trench", color: "Beige",
    priceInr: 7990, image: "https://di2ponv0v5otw.cloudfront.net/posts/2025/11/25/6925f78f24d2e78060e8d61a/m_6925fc30310f1c86c1fd719f.jpg",
    alt: "Model wearing a beige double-breasted trench with a matching waist belt and adjustable cuffs.",
    retailer: "Poshmark resale listing", sourceUrl: "https://poshmark.com/listing/Zara-Classic-Beige-Trench-Coat-6925f78f24d2e78060e8d61a", sourceType: "product",
    composition: "The resale listing does not verify the exact fibre composition or product season.",
    construction: ["Double-breasted front", "Wide lapels", "Matching waist belt", "Adjustable cuff tabs"],
    designNote: "The belt and long lapels organise the volume of the outer layer; composition and water resistance are not verified."
  }
];

export const productBySlug = (slug: string) => catalogProducts.find((product) => product.slug === slug);
export const featuredProducts = catalogProducts.filter((product) => product.featured);
export const demoPriceLabel = (priceInr: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(priceInr);
