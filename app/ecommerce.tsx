'use client';

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Filter,
  Gauge,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { getTyreBySlug, tyreProducts, type TyreProduct } from "./catalog";

type CartLine = { productId: string; size: string; quantity: number };
const cartKey = "rg-cart-v2";
const directions = "https://www.google.com/maps/dir/?api=1&destination=611+Whangaparaoa+Road+Stanmore+Bay+New+Zealand";

function Brand() {
  return <span className="brand"><strong>RAY GARRATT’S</strong><span>TYRES<span className="brand-rule" />WHANGAPARĀOA</span></span>;
}

function CommerceShell({ children, cartCount, onCart, route }: { children: React.ReactNode; cartCount: number; onCart: () => void; route: string }) {
  const [menu, setMenu] = useState(false);
  return <>
    <div className="utility"><span>LOCAL EXPERTISE. WORLD-CLASS PERFORMANCE.</span><a href={directions} target="_blank" rel="noreferrer"><MapPin size={12} />611 Whangaparaoa Road, Stanmore Bay <ArrowUpRight size={12} /></a></div>
    <header className="commerce-header">
      <a href="/" aria-label="Ray Garratt’s Tyres home"><Brand /></a>
      <nav className={menu ? "open" : ""} onClick={() => setMenu(false)} aria-label="Shop navigation">
        <a href="/shop" className={route.startsWith("/shop") || route.startsWith("/tyres") ? "active" : ""}>Shop tyres</a>
        <a href="/services" className={route.startsWith("/services") ? "active" : ""}>Services</a>
        <a href="/about" className={route === "/about" ? "active" : ""}>Our shop</a>
        <a href="/contact" className={route === "/contact" ? "active" : ""}>Contact</a>
      </nav>
      <div className="header-actions">
        <button className="bag commerce-bag" onClick={onCart} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={21} /><span>{cartCount}</span></button>
        <a className="visit" href="tel:+6494245761">09 424 5761 <Phone size={15} /></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      </div>
    </header>
    {children}
    <section className="commerce-cta"><div><span>NEED A HUMAN CHECK?</span><h2>We’ll make sure it fits.</h2></div><a href="tel:+6494245761">Talk to the team <ArrowUpRight /></a></section>
    <footer className="commerce-footer">
      <div className="footer-top">
        <div><a href="/"><Brand /></a><p>Performance meets the Coast.</p><img className="pirelli" src="/media/pirelli.svg" alt="Pirelli" /></div>
        <div><h3>SHOP</h3><a href="/shop">All tyres</a><a href="/shop?family=P%20ZERO">Performance tyres</a><a href="/shop?vehicle=SUV">SUV tyres</a><a href="/cart">Your cart ({cartCount})</a></div>
        <div><h3>LOCAL SERVICE</h3><a href="/services">Tyre fitting & services</a><a href="/about">Our story & shop</a><a href="/contact">Visit and contact</a></div>
        <div><h3>SUPPORT</h3><a href="/delivery-returns">Fitting, collection & returns</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Ray Garratt’s Tyre 2009 Ltd</span><span>Catalogue concept · Pricing and stock confirmed by the shop</span><span className="zule-credit">Designed by <a href="https://www.zule.co.nz/" target="_blank" rel="noopener">Zule Digital</a> in Aotearoa</span><a href={directions} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={12} /></a></div>
    </footer>
  </>;
}

function ProductTile({ product, onAdd }: { product: TyreProduct; onAdd: (product: TyreProduct, size: string) => void }) {
  const [size, setSize] = useState(product.sizes[0]);
  return <article className="shop-card">
    <a className="shop-card-visual" href={`/tyres/${product.slug}`}>
      {product.badge && <span className="product-tag">{product.badge}</span>}
      <img src={product.image} alt={`${product.name} tyre`} loading="lazy" />
      <span className="shop-card-arrow"><ArrowUpRight /></span>
    </a>
    <div className="shop-card-copy">
      <span className="eyebrow">{product.vehicle} / {product.season}</span>
      <a href={`/tyres/${product.slug}`}><h3>{product.name}</h3></a>
      <p>{product.strapline}</p>
      <label>SELECT A SAMPLE SIZE<select value={size} onChange={(event) => setSize(event.target.value)}>{product.sizes.map((option) => <option key={option}>{option}</option>)}</select></label>
      <div className="quote-row"><span>Fitted price<small>Confirmed by our team</small></span><button onClick={() => onAdd(product, size)}>Add to cart <Plus size={17} /></button></div>
    </div>
  </article>;
}

function ShopPage({ add }: { add: (product: TyreProduct, size: string) => void }) {
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState(params.get("family") || "All");
  const [vehicle, setVehicle] = useState(params.get("vehicle") || "All");
  const [use, setUse] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [fitment, setFitment] = useState("");
  const filtered = useMemo(() => {
    const results = tyreProducts.filter((product) =>
      (family === "All" || product.family === family) &&
      (vehicle === "All" || product.vehicle.includes(vehicle)) &&
      (use === "All" || product.use === use) &&
      (`${product.name} ${product.family} ${product.use}`.toLowerCase().includes(query.toLowerCase())) &&
      (!fitment || product.sizes.some((size) => size.replaceAll(" ", "").toLowerCase().includes(fitment.replaceAll(" ", "").toLowerCase())))
    );
    return sort === "Name A–Z" ? [...results].sort((a, b) => a.name.localeCompare(b.name)) : results;
  }, [family, vehicle, use, query, sort, fitment]);
  return <main className="commerce-main">
    <section className="catalogue-hero"><div><span className="eyebrow">THE PIRELLI RANGE / RAY GARRATT’S</span><h1>Find your<br /><em>perfect fit.</em></h1><p>Explore a curated sample range, shortlist your size, then let our team confirm vehicle fitment, stock and your fitted price.</p></div><div className="catalogue-hero-image"><img src="/media/campaign-pzero.jpg" alt="High-performance car fitted with Pirelli tyres" /><span>PERFORMANCE / TOURING / SUV / EV</span></div></section>
    <section className="fitment-bar"><div><Gauge /><span><strong>KNOW YOUR SIZE?</strong> Search the format shown on your tyre sidewall.</span></div><label><Search size={18} /><input value={fitment} onChange={(event) => setFitment(event.target.value)} placeholder="e.g. 225/45 R18" /></label><button onClick={() => setFitment("")}>Clear</button></section>
    <section className="catalogue-section">
      <div className="catalogue-top"><div><span className="eyebrow">CURATED FOR THE COAST</span><h2>Shop tyres.</h2></div><label className="catalogue-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the range" /></label></div>
      <div className="catalogue-tools">
        <div className="catalogue-filters"><label><Filter /> FAMILY<select value={family} onChange={(event) => setFamily(event.target.value)}><option>All</option><option>P ZERO</option><option>CINTURATO</option><option>SCORPION</option></select></label><label>VEHICLE<select value={vehicle} onChange={(event) => setVehicle(event.target.value)}><option>All</option><option>Car</option><option>SUV</option></select></label><label>DRIVING STYLE<select value={use} onChange={(event) => setUse(event.target.value)}><option>All</option><option>Performance</option><option>Touring</option><option>All season</option><option>All terrain</option><option>Electric</option></select></label></div>
        <label className="sort-select">SORT<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Name A–Z</option></select></label>
      </div>
      <div className="catalogue-count"><span>{filtered.length} sample tyres</span><span>Family imagery is illustrative; exact tread and sidewall vary by product and size.</span></div>
      {filtered.length ? <div className="shop-grid">{filtered.map((product) => <ProductTile key={product.id} product={product} onAdd={add} />)}</div> : <div className="no-results"><CircleHelp /><h3>No exact sample match.</h3><p>Clear a filter or call the team. The full supplier catalogue is wider than this concept range.</p><button className="button yellow" onClick={() => { setFamily("All"); setVehicle("All"); setUse("All"); setQuery(""); setFitment(""); }}>Show all tyres</button></div>}
    </section>
  </main>;
}

function ProductPage({ product, add }: { product: TyreProduct; add: (product: TyreProduct, size: string) => void }) {
  const [size, setSize] = useState(product.sizes[0]);
  const related = tyreProducts.filter((item) => item.family === product.family && item.id !== product.id).slice(0, 2);
  return <main className="commerce-main product-page">
    <div className="product-breadcrumb"><a href="/shop"><ArrowLeft /> All tyres</a><span>{product.family}</span><span>{product.name}</span></div>
    <section className="product-detail">
      <div className="product-detail-visual"><span className="tyre-watermark">{product.family}</span>{product.badge && <span className="product-tag">{product.badge}</span>}<img src={product.image} alt={`${product.name} tyre`} /><small>Family imagery shown. Exact appearance varies by size and specification.</small></div>
      <div className="product-detail-copy"><span className="eyebrow">{product.vehicle} / {product.season} / {product.use}</span><h1>{product.name}</h1><p className="detail-strapline">{product.strapline}</p><p>{product.description}</p><div className="tech-chips">{product.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="fitment-panel"><label>CHOOSE A SAMPLE SIZE<select value={size} onChange={(event) => setSize(event.target.value)}>{product.sizes.map((option) => <option key={option}>{option}</option>)}</select></label><div><span>Price on confirmation<small>Includes a fitment check before quoting</small></span><button className="button yellow" onClick={() => add(product, size)}>Add to cart <ShoppingBag size={17} /></button></div></div><div className="detail-trust"><span><ShieldCheck /> Fitment checked by our team</span><span><Wrench /> Local fitting available</span><span><Phone /> Call 09 424 5761</span></div></div>
    </section>
    <section className="benefit-section"><div><span className="eyebrow">WHY THIS TYRE</span><h2>Built into every turn.</h2></div><div className="benefit-grid">{product.benefits.map((benefit, index) => <article key={benefit.title}><span>0{index + 1}</span><h3>{benefit.title}</h3><p>{benefit.copy}</p></article>)}</div></section>
    <section className="fitment-note"><div><Zap /><h2>Fitment is more than size.</h2></div><p>Load index, speed rating, homologation, axle setup and manufacturer markings can all matter. We’ll confirm the complete specification for your vehicle before supply or fitting.</p><a href="tel:+6494245761">Check with the team <ArrowUpRight /></a></section>
    {related.length > 0 && <section className="related-section"><div className="section-title"><div><span className="eyebrow">SAME FAMILY</span><h2>Keep exploring.</h2></div><a href="/shop">View all tyres <ArrowRight /></a></div><div className="related-grid">{related.map((item) => <ProductTile key={item.id} product={item} onAdd={add} />)}</div></section>}
  </main>;
}

function CartPage({ cart, update, remove }: { cart: CartLine[]; update: (index: number, quantity: number) => void; remove: (index: number) => void }) {
  return <main className="commerce-main"><section className="simple-hero"><span className="eyebrow">YOUR SHORTLIST</span><h1>Cart.</h1><p>No charge is taken online. Your team-confirmed fitted quote comes next.</p></section><section className="cart-layout"><div className="cart-lines">{cart.length ? cart.map((line, index) => { const product = tyreProducts.find((item) => item.id === line.productId)!; return <article className="cart-line" key={`${line.productId}-${line.size}`}><a href={`/tyres/${product.slug}`}><img src={product.image} alt="" /></a><div><span className="eyebrow">{product.family} / {product.vehicle}</span><a href={`/tyres/${product.slug}`}><h2>{product.name}</h2></a><p>Selected size: <strong>{line.size}</strong></p><button onClick={() => remove(index)}><Trash2 /> Remove</button></div><div className="quantity"><button onClick={() => update(index, line.quantity - 1)} aria-label="Decrease quantity"><Minus /></button><span>{line.quantity}</span><button onClick={() => update(index, line.quantity + 1)} aria-label="Increase quantity"><Plus /></button></div><span className="line-price">QUOTE<small>Fitted price confirmed after vehicle check</small></span></article>; }) : <div className="empty-cart"><ShoppingBag /><h2>Your cart is ready for a great set.</h2><p>Browse the range and add a tyre size to begin.</p><a className="button yellow" href="/shop">Shop tyres <ArrowRight /></a></div>}</div><aside className="cart-summary"><span className="eyebrow">QUOTE SUMMARY</span><h2>{cart.reduce((sum, line) => sum + line.quantity, 0)} tyres</h2><div><span>Tyres</span><strong>Price on confirmation</strong></div><div><span>Fitting</span><strong>Selected at checkout</strong></div><div><span>Payment</span><strong>Arranged with the shop</strong></div><p>We’ll verify fitment, availability and the final fitted price before any order is placed.</p><a className={`button yellow ${cart.length ? "" : "disabled"}`} href={cart.length ? "/checkout" : "/shop"}>{cart.length ? "Continue to checkout" : "Start shopping"} <ArrowRight /></a><a href="/shop">Keep shopping</a></aside></section></main>;
}

function CheckoutPage({ cart }: { cart: CartLine[] }) {
  const [complete, setComplete] = useState(false);
  const [service, setService] = useState("Fitted at Ray Garratt’s");
  if (!cart.length) return <main className="commerce-main"><section className="simple-hero"><span className="eyebrow">CHECKOUT</span><h1>Your cart is empty.</h1><p>Add tyres before preparing a fitted quote request.</p><a className="button yellow" href="/shop">Shop tyres <ArrowRight /></a></section></main>;
  return <main className="commerce-main"><section className="simple-hero checkout-hero"><span className="eyebrow">SECURE YOUR FITMENT</span><h1>Checkout.</h1><p>Tell us about the vehicle and the service you need. This concept prepares a quote request; it does not submit, book or charge.</p></section><form className="checkout-layout" onSubmit={(event) => { event.preventDefault(); setComplete(true); }}><div className="checkout-forms"><fieldset><legend><span>01</span> Contact details</legend><div className="form-grid"><label>First name<input required name="firstName" autoComplete="given-name" /></label><label>Last name<input required name="lastName" autoComplete="family-name" /></label><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Phone<input required type="tel" name="phone" autoComplete="tel" /></label></div></fieldset><fieldset><legend><span>02</span> Vehicle details</legend><div className="form-grid"><label>Registration<input required name="registration" placeholder="e.g. ABC123" /></label><label>Vehicle<input required name="vehicle" placeholder="e.g. 2021 VW Golf" /></label><label className="full">Anything we should know?<textarea name="notes" placeholder="Current tyre size, preferred brand marking, warning lights…" /></label></div></fieldset><fieldset><legend><span>03</span> Fitting or collection</legend><div className="service-options">{["Fitted at Ray Garratt’s", "Tyre-only collection", "I need advice first"].map((option) => <label className={service === option ? "selected" : ""} key={option}><input type="radio" name="service" value={option} checked={service === option} onChange={() => setService(option)} /><Wrench /><span><strong>{option}</strong><small>{option === "Fitted at Ray Garratt’s" ? "Select a preferred time below" : option === "Tyre-only collection" ? "The team will confirm when stock is ready" : "We’ll talk through fitment and options"}</small></span></label>)}</div>{service === "Fitted at Ray Garratt’s" && <div className="form-grid appointment-fields"><label>Preferred date<input type="date" name="date" /></label><label>Preferred window<select name="time"><option>Morning</option><option>Midday</option><option>Afternoon</option></select></label></div>}</fieldset><label className="consent"><input required type="checkbox" /> I understand this prepares a request only. Fitment, stock, price and booking are confirmed by Ray Garratt’s Tyres.</label><button className="button yellow checkout-submit" type="submit">Prepare quote request <ArrowRight /></button>{complete && <div className="checkout-complete" role="status"><Check /><div><h3>Your request summary is ready.</h3><p>Nothing has been sent or charged. Call the team on <a href="tel:+6494245761">09 424 5761</a> and they’ll confirm the details with you.</p></div></div>}</div><aside className="order-review"><span className="eyebrow">YOUR TYRES</span>{cart.map((line) => { const product = tyreProducts.find((item) => item.id === line.productId)!; return <div className="review-line" key={`${line.productId}-${line.size}`}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>{line.size} · Qty {line.quantity}</p></div></div>; })}<div className="review-total"><span>Estimated total</span><strong>Confirmed by the shop</strong></div><p><ShieldCheck /> No online payment is collected in this concept.</p></aside></form></main>;
}

function ServicesPage() {
  const [prepared, setPrepared] = useState(false);
  const services = [
    ["01", "Tyre advice & sales", "Vehicle and size checks, product guidance and fitted quotes."],
    ["02", "Tyre fitting", "Professional tyre removal, fitment and inflation at the Stanmore Bay shop."],
    ["03", "Puncture assessment", "We’ll inspect the damage and advise whether a safe repair is possible."],
    ["04", "Wheel & tyre checks", "Talk to the team about wear, pressure and the condition of your current setup."],
    ["05", "Warrant of Fitness", "Contact the shop to arrange a WoF inspection and confirm availability."],
  ];
  return <main className="commerce-main"><section className="service-hero"><div><span className="eyebrow">LOCAL WORKSHOP / STANMORE BAY</span><h1>Good to go.</h1><p>From a fresh set to a puncture check, talk directly with the people doing the work.</p><a className="button yellow" href="#book-service">Prepare a service request <ArrowRight /></a></div><img src="/media/workshop.jpg" alt="Tyres inside Ray Garratt’s local workshop" /></section><section className="service-catalogue"><div><span className="eyebrow">WHAT WE CAN HELP WITH</span><h2>Service with<br />a straight answer.</h2></div><div>{services.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><a href="tel:+6494245761"><ArrowUpRight /></a></article>)}</div></section><section id="book-service" className="booking-section"><div><span className="eyebrow">PLAN YOUR VISIT</span><h2>Prepare a service request.</h2><p>Choose a preferred time. The shop will still need to confirm availability by phone.</p></div><form onSubmit={(event) => { event.preventDefault(); setPrepared(true); }}><label>Service<select name="service"><option>Tyre advice & fitted quote</option><option>Tyre fitting</option><option>Puncture assessment</option><option>Warrant of Fitness</option><option>Other vehicle care</option></select></label><label>Vehicle<input required name="vehicle" placeholder="Year, make and model" /></label><div><label>Preferred date<input required type="date" name="date" /></label><label>Preferred time<select name="time"><option>Morning</option><option>Midday</option><option>Afternoon</option></select></label></div><label>Your phone<input required type="tel" name="phone" /></label><button className="button yellow" type="submit">Prepare request <ArrowRight /></button>{prepared && <p className="prepared-note"><Check /> Request prepared. Call <a href="tel:+6494245761">09 424 5761</a> to confirm the booking.</p>}</form></section></main>;
}

function ContactPage() {
  return <main className="commerce-main"><section className="contact-grid"><div className="contact-copy"><span className="eyebrow">VISIT / CALL / DRIVE ON</span><h1>Right here<br />on the Coast.</h1><address>611 Whangaparaoa Road<br />Stanmore Bay, Auckland</address><a className="contact-phone" href="tel:+6494245761">09 424 5761 <ArrowUpRight /></a><div className="hours"><h3>Opening hours</h3><div><span>Monday – Friday</span><span>8:00 am – 5:00 pm</span></div><div><span>Saturday</span><span>8:00 am – 12:00 pm</span></div><div><span>Sunday</span><span>Closed</span></div><small>Public holiday hours may vary. Call before visiting.</small></div><a className="button yellow" href={directions} target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a></div><div className="contact-map"><iframe title="Map showing Ray Garratt’s Tyres" src="https://maps.google.com/maps?q=Ray%20Garratt%27s%20Tyres%20611%20Whangaparaoa%20Road&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" /></div></section><section className="contact-reasons"><article><Phone /><h3>Real people</h3><p>Call the shop and talk through the vehicle, size and job.</p></article><article><Wrench /><h3>Local fitting</h3><p>Arrange fitting at the Stanmore Bay workshop.</p></article><article><MapPin /><h3>Easy to find</h3><p>On Whangaparaoa Road, serving drivers across the Coast.</p></article></section></main>;
}

function PolicyPage({ kind }: { kind: "privacy" | "terms" | "delivery" }) {
  const content = kind === "privacy" ? {
    label: "PRIVACY",
    title: "Clear, respectful data use.",
    intro: "This concept stores your tyre shortlist in your browser. It does not transmit checkout or booking form entries.",
    sections: [["Information in this concept", "Cart choices are stored locally on your device. Form details are used only to prepare an on-screen summary and are not sent to Ray Garratt’s Tyres."], ["When the live store adds enquiries", "A production enquiry or checkout service will need a published privacy notice identifying the service provider, retention period and customer rights."], ["Contact", "Questions about the business should be directed to the shop on 09 424 5761."]],
  } : kind === "terms" ? {
    label: "TERMS",
    title: "What this website does today.",
    intro: "This is an ecommerce concept and product catalogue. It does not create a binding sale, booking or payment.",
    sections: [["Product information", "Product descriptions are based on Pirelli range information. Exact fitment, markings, technologies and availability vary by size and vehicle."], ["Quotes and orders", "A cart or prepared request is not an order. Ray Garratt’s Tyres must confirm vehicle fitment, stock, price, fitting and timing."], ["Site content", "Images and product names remain the property of their respective owners. Shop imagery was supplied for this website concept."]],
  } : {
    label: "FITTING / COLLECTION / RETURNS",
    title: "How fulfilment will work.",
    intro: "Tyres are safety-critical. The team confirms the right specification and fulfilment method before taking an order.",
    sections: [["Fitting", "Book a confirmed workshop time at 611 Whangaparaoa Road. Final fitting inclusions and charges appear in the shop’s quote."], ["Collection", "Tyre-only collection is available only after the shop confirms stock is ready and verifies the supplied vehicle and size details."], ["Returns and cancellations", "A production policy must distinguish standard stock from specially ordered or fitted tyres, and reflect New Zealand consumer law. Contact the shop before ordering or returning any tyre."], ["Delivery", "No delivery service or delivery price is represented in this concept."]],
  };
  return <main className="commerce-main"><section className="policy-hero"><span className="eyebrow">{content.label}</span><h1>{content.title}</h1><p>{content.intro}</p></section><section className="policy-body"><aside>Last reviewed<br />10 November 2026</aside><div>{content.sections.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div></section></main>;
}

export default function EcommerceApp({ route }: { route: string }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { try { const value = JSON.parse(localStorage.getItem(cartKey) || "[]"); if (Array.isArray(value)) setCart(value); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(cartKey, JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawer]);
  const add = (product: TyreProduct, size: string) => { setCart((current) => { const index = current.findIndex((line) => line.productId === product.id && line.size === size); if (index < 0) return [...current, { productId: product.id, size, quantity: 1 }]; return current.map((line, lineIndex) => lineIndex === index ? { ...line, quantity: line.quantity + 1 } : line); }); setToast(`${product.name} added in ${size}`); setDrawer(true); };
  const update = (index: number, quantity: number) => setCart((current) => quantity < 1 ? current.filter((_, lineIndex) => lineIndex !== index) : current.map((line, lineIndex) => lineIndex === index ? { ...line, quantity: Math.min(quantity, 8) } : line));
  const remove = (index: number) => setCart((current) => current.filter((_, lineIndex) => lineIndex !== index));
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const path = route.replace(/\/$/, "") || "/";
  let page: React.ReactNode;
  if (path === "/shop") page = <ShopPage add={add} />;
  else if (path.startsWith("/tyres/")) { const product = getTyreBySlug(path.split("/").pop() || ""); page = product ? <ProductPage product={product} add={add} /> : <NotFound />; }
  else if (path === "/cart") page = <CartPage cart={cart} update={update} remove={remove} />;
  else if (path === "/checkout") page = <CheckoutPage cart={cart} />;
  else if (path === "/services") page = <ServicesPage />;
  else if (path === "/contact") page = <ContactPage />;
  else if (path === "/privacy") page = <PolicyPage kind="privacy" />;
  else if (path === "/terms") page = <PolicyPage kind="terms" />;
  else if (path === "/delivery-returns") page = <PolicyPage kind="delivery" />;
  else page = <NotFound />;
  return <CommerceShell cartCount={count} onCart={() => setDrawer(true)} route={path}>{page}<div className={`cart-drawer-backdrop ${drawer ? "open" : ""}`} onClick={() => setDrawer(false)} /><aside className={`cart-drawer ${drawer ? "open" : ""}`} aria-hidden={!drawer}><div className="drawer-head"><div><span className="eyebrow">YOUR SHORTLIST</span><h2>Cart <small>{count}</small></h2></div><button onClick={() => setDrawer(false)} aria-label="Close cart"><X /></button></div>{toast && <p className="cart-toast"><Check /> {toast}</p>}<div className="drawer-lines">{cart.length ? cart.map((line, index) => { const product = tyreProducts.find((item) => item.id === line.productId)!; return <article key={`${line.productId}-${line.size}`}><img src={product.image} alt="" /><div><h3>{product.name}</h3><p>{line.size} · Qty {line.quantity}</p><button onClick={() => remove(index)}>Remove</button></div></article>; }) : <div className="drawer-empty"><ShoppingBag /><h3>Nothing here yet.</h3><p>Add a tyre and it will stay saved on this device.</p></div>}</div><div className="drawer-footer"><p>Fitment, stock and price confirmed by the team.</p><a className="button yellow" href={cart.length ? "/cart" : "/shop"}>{cart.length ? "Review cart" : "Shop tyres"} <ArrowRight /></a></div></aside></CommerceShell>;
}

function NotFound() { return <main className="commerce-main"><section className="simple-hero"><span className="eyebrow">404 / WRONG TURN</span><h1>Let’s get you back on the road.</h1><p>That page isn’t in this catalogue.</p><a className="button yellow" href="/shop">Shop tyres <ArrowRight /></a></section></main>; }
