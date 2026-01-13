when is server side rendering and client side renderig.

✅ Q1: Does this component need interactivity?
Like:
-button click handlers
-form input behavior
-modal open/close
-dropdown toggle
-animations
-user typing events
➡️ YES → Client Component

Simple Thumb Rules (Remember Forever)
Rule 1 → Default Server Component. Use Client only when needed.
Rule 2 → If you use hooks → must be Client.
Rule 3 → If the component only displays data → Server.
Rule 4 → Keep components Server as much as possible for performance.
Rule 5 → Mixing is allowed. A Client Component can import Server Components, but not vice-versa.


// No interactions → Server Component
export default function ProductCard({ product }) {
  return <div>{product.name}</div>;
}


"use client"; 
import { useState } from "react";

export default function ModalButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      {open && <div>Modal Content</div>}
    </>
  );
}

Different type of rendering-

🔸 If the page changes per user → SSR

Users, orders, dashboards

🔸 If the page changes rarely → SSG

Blogs, static pages

🔸 If content updates sometimes → ISR

News, product listing

🔸 If page needs heavy interaction → CSR

Apps, dashboards

🔸 If component has no interaction → RSC (server component)