from __future__ import annotations
"""Bijli Live marketplace API — parity with specialized energy marketplaces + Daraz vertical depth."""
import sys
from pathlib import Path as _P
sys.path.insert(0, str(_P(__file__).resolve().parent))

from http_util import JsonAPI, serve, uid, iso

PRODUCTS = [
    {"id": "p1", "title": "550W Mono Solar Panel", "category": "panels", "brand": "Longi", "watt": 550,
     "price_pkr": 28500, "vendor_id": "ven1", "rating": 4.8, "stock": 40, "city": "Lahore"},
    {"id": "p2", "title": "5kW Hybrid Inverter", "category": "inverters", "brand": "Growatt", "watt": 5000,
     "price_pkr": 185000, "vendor_id": "ven1", "rating": 4.6, "stock": 12, "city": "Lahore"},
    {"id": "p3", "title": "Lithium 5kWh Battery", "category": "batteries", "brand": "Dyness", "watt": 5000,
     "price_pkr": 320000, "vendor_id": "ven2", "rating": 4.7, "stock": 8, "city": "Karachi"},
    {"id": "p4", "title": "EV Charger 7kW", "category": "ev", "brand": "ABB", "watt": 7000,
     "price_pkr": 210000, "vendor_id": "ven2", "rating": 4.5, "stock": 5, "city": "Islamabad"},
    {"id": "p5", "title": "Copper Cable 6mm (100m)", "category": "cables", "brand": "Pakistan Cables", "watt": 0,
     "price_pkr": 18500, "vendor_id": "ven3", "rating": 4.4, "stock": 100, "city": "Faisalabad"},
]
VENDORS = [
    {"id": "ven1", "name": "SolarMax PK", "city": "Lahore", "verified": True, "rating": 4.7},
    {"id": "ven2", "name": "PowerHub Electric", "city": "Karachi", "verified": True, "rating": 4.6},
    {"id": "ven3", "name": "WireWorks", "city": "Faisalabad", "verified": False, "rating": 4.2},
]
CARTS: dict[str, list] = {}
RFQS: dict[str, dict] = {}
ORDERS: dict[str, dict] = {}
QUOTES: list[dict] = []

class H(JsonAPI):
    def do_GET(self):
        path, q = self.parse()
        if path in ("/", "/health"):
            return self._send(200, {"ok": True, "service": "bijli", "version": "2.0.0",
                                    "parity_target": "Energy marketplace / Daraz electrical vertical"})
        if path == "/capabilities":
            return self._send(200, {"ok": True, "competitor": "Specialized solar marketplaces + Daraz depth",
                                    "features": ["catalog", "filters", "search", "vendors", "cart", "checkout",
                                                 "rfq", "quotes", "ratings", "stock"]})
        if path == "/products":
            cat = (q.get("category") or [None])[0]
            city = (q.get("city") or [None])[0]
            brand = (q.get("brand") or [None])[0]
            qtext = ((q.get("q") or [""])[0] or "").lower()
            min_w = int((q.get("min_watt") or ["0"])[0] or 0)
            max_p = int((q.get("max_price") or ["0"])[0] or 0)
            rows = []
            for p in PRODUCTS:
                if cat and p["category"] != cat: continue
                if city and p["city"].lower() != city.lower(): continue
                if brand and p["brand"].lower() != brand.lower(): continue
                if qtext and qtext not in p["title"].lower(): continue
                if min_w and p["watt"] < min_w: continue
                if max_p and p["price_pkr"] > max_p: continue
                rows.append(p)
            rows.sort(key=lambda x: (-x["rating"], x["price_pkr"]))
            return self._send(200, {"ok": True, "count": len(rows), "products": rows})
        if path == "/categories":
            return self._send(200, {"ok": True, "categories": sorted({p["category"] for p in PRODUCTS})})
        if path == "/vendors":
            return self._send(200, {"ok": True, "vendors": VENDORS})
        if path == "/cart":
            user = (q.get("user") or ["guest"])[0]
            return self._send(200, {"ok": True, "items": CARTS.get(user, [])})
        if path == "/rfqs":
            return self._send(200, {"ok": True, "rfqs": list(RFQS.values())})
        if path == "/orders":
            user = (q.get("user") or [None])[0]
            rows = list(ORDERS.values())
            if user: rows = [o for o in rows if o["user"] == user]
            return self._send(200, {"ok": True, "orders": rows})
        self._send(404, {"ok": False})

    def do_POST(self):
        path, _ = self.parse()
        body = self._read_json()
        if path == "/cart/add":
            user = str(body.get("user") or "guest")
            prod = next((p for p in PRODUCTS if p["id"] == body.get("product_id")), None)
            if not prod: return self._send(400, {"ok": False, "error": "unknown_product"})
            qty = int(body.get("qty") or 1)
            if prod["stock"] < qty: return self._send(400, {"ok": False, "error": "insufficient_stock"})
            CARTS.setdefault(user, []).append({"product_id": prod["id"], "title": prod["title"],
                                               "qty": qty, "unit_price": prod["price_pkr"]})
            return self._send(200, {"ok": True, "cart": CARTS[user]})
        if path in ("/checkout", "/order"):
            user = str(body.get("user") or "guest")
            items = CARTS.get(user, [])
            if not items: return self._send(400, {"ok": False, "error": "cart_empty"})
            total = sum(i["unit_price"] * i["qty"] for i in items)
            oid = uid("bo")
            order = {"id": oid, "user": user, "items": items, "total_pkr": total,
                     "payment_method": body.get("payment_method") or "bank_transfer",
                     "address": body.get("address") or "", "status": "placed", "created_at": iso()}
            ORDERS[oid] = order
            CARTS[user] = []
            return self._send(201, {"ok": True, "order": order})
        if path == "/rfq":
            rid = uid("rfq")
            rfq = {"id": rid, "user": body.get("user") or "guest", "title": body.get("title") or "System RFQ",
                   "specs": body.get("specs") or {}, "budget_pkr": body.get("budget_pkr"),
                   "city": body.get("city") or "", "status": "open", "created_at": iso()}
            RFQS[rid] = rfq
            return self._send(201, {"ok": True, "rfq": rfq})
        if path.startswith("/rfq/") and path.endswith("/quote"):
            rid = path.split("/")[2]
            if rid not in RFQS: return self._send(404, {"ok": False})
            q = {"id": uid("qt"), "rfq_id": rid, "vendor_id": body.get("vendor_id") or "ven1",
                 "price_pkr": body.get("price_pkr") or 0, "lead_days": body.get("lead_days") or 7,
                 "notes": body.get("notes") or "", "at": iso()}
            QUOTES.append(q)
            RFQS[rid]["status"] = "quoted"
            return self._send(201, {"ok": True, "quote": q})
        self._send(404, {"ok": False})

def main():
    serve(H, port=int(__import__("os").environ.get("PORT", "8770")), name="Bijli v2 (energy marketplace parity)")

if __name__ == "__main__":
    main()
