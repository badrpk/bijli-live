from __future__ import annotations
"""Bijli v3 — energy marketplace gaps + multi-rail payments + undercut."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from http_util import JsonAPI, serve, uid, iso
import payments as pay
import auth as authmod

PRODUCTS = [
    {"id": "p1", "title": "550W Mono Solar Panel", "category": "panels", "brand": "Longi", "watt": 550,
     "price_pkr": 24500, "competitor_price_pkr": 32000, "vendor_id": "ven1", "rating": 4.8, "stock": 40, "city": "Lahore", "warranty_years": 12},
    {"id": "p2", "title": "5kW Hybrid Inverter", "category": "inverters", "brand": "Growatt", "watt": 5000,
     "price_pkr": 155000, "competitor_price_pkr": 210000, "vendor_id": "ven1", "rating": 4.6, "stock": 12, "city": "Lahore", "warranty_years": 5},
    {"id": "p3", "title": "Lithium 5kWh Battery", "category": "batteries", "brand": "Dyness", "watt": 5000,
     "price_pkr": 265000, "competitor_price_pkr": 350000, "vendor_id": "ven2", "rating": 4.7, "stock": 8, "city": "Karachi", "warranty_years": 10},
    {"id": "p4", "title": "EV Charger 7kW", "category": "ev", "brand": "ABB", "watt": 7000,
     "price_pkr": 175000, "competitor_price_pkr": 240000, "vendor_id": "ven2", "rating": 4.5, "stock": 5, "city": "Islamabad", "warranty_years": 3},
    {"id": "p5", "title": "Copper Cable 6mm (100m)", "category": "cables", "brand": "Pakistan Cables", "watt": 0,
     "price_pkr": 15500, "competitor_price_pkr": 20000, "vendor_id": "ven3", "rating": 4.4, "stock": 100, "city": "Faisalabad", "warranty_years": 1},
]
VENDORS = [
    {"id": "ven1", "name": "SolarMax PK", "city": "Lahore", "verified": True, "rating": 4.7},
    {"id": "ven2", "name": "PowerHub Electric", "city": "Karachi", "verified": True, "rating": 4.6},
    {"id": "ven3", "name": "WireWorks", "city": "Faisalabad", "verified": False, "rating": 4.2},
]
CARTS, RFQS, ORDERS, INSTALLS, WARRANTIES, QUOTES = {}, {}, {}, {}, {}, []

class H(JsonAPI):
    def do_GET(self):
        _path_early = (self.path.split("?")[0].rstrip("/") or "/")
        if _path_early.startswith("/auth"):
            hdrs = {k: v for k, v in self.headers.items()}
            code, body = authmod.handle_auth_request("GET", _path_early, {}, hdrs, product="bijli")
            return self._send(code, body)
        path, q = self.parse()
        if path in ("/", "/health"):
            return self._send(200, {"ok": True, "service": "bijli", "version": "3.0.0",
                "gaps_closed": ["install_booking", "emi_calculator", "warranty_tracking", "stripe_multi_rail", "undercut"]})
        if path == "/capabilities":
            return self._send(200, {"ok": True, "competitor": "solar marketplaces / Daraz electrical",
                "features": ["catalog", "filters", "rfq", "quotes", "cart", "checkout", "install_booking", "emi", "warranty", "stripe", "signup", "login", "otp", "oauth_google", "oauth_facebook", "jazzcash"]})
        if path == "/pricing": return self._send(200, {"ok": True, **pay.pricing_for("bijli")})
        if path == "/payments/rails": return self._send(200, {"ok": True, "rails": pay.list_rails()})
        if path == "/gap-analysis":
            return self._send(200, {"ok": True, "added": ["install booking", "EMI calculator", "warranty register", "multi-rail pay", "undercut prices"]})
        if path == "/products":
            cat, city, brand = (q.get("category") or [None])[0], (q.get("city") or [None])[0], (q.get("brand") or [None])[0]
            qtext = ((q.get("q") or [""])[0] or "").lower()
            min_w = int((q.get("min_watt") or ["0"])[0] or 0); max_p = int((q.get("max_price") or ["0"])[0] or 0)
            rows = []
            for p in PRODUCTS:
                if cat and p["category"] != cat: continue
                if city and p["city"].lower() != city.lower(): continue
                if brand and p["brand"].lower() != brand.lower(): continue
                if qtext and qtext not in p["title"].lower(): continue
                if min_w and p["watt"] < min_w: continue
                if max_p and p["price_pkr"] > max_p: continue
                rows.append({**p, "save_pkr": p["competitor_price_pkr"] - p["price_pkr"]})
            return self._send(200, {"ok": True, "products": rows})
        if path == "/categories": return self._send(200, {"ok": True, "categories": sorted({p["category"] for p in PRODUCTS})})
        if path == "/vendors": return self._send(200, {"ok": True, "vendors": VENDORS})
        if path == "/cart":
            return self._send(200, {"ok": True, "items": CARTS.get((q.get("user") or ["guest"])[0], [])})
        if path == "/emi":
            price = float((q.get("price") or ["0"])[0] or 0)
            months = int((q.get("months") or ["12"])[0] or 12)
            rate = float((q.get("apr") or ["18"])[0] or 18) / 100 / 12
            if rate == 0: monthly = price / months
            else: monthly = price * rate * (1+rate)**months / ((1+rate)**months - 1)
            return self._send(200, {"ok": True, "principal": price, "months": months, "monthly_pkr": round(monthly, 2),
                                    "total_pkr": round(monthly*months, 2), "note": "Indicative EMI; lower deposits than typical dealers"})
        if path == "/installs": return self._send(200, {"ok": True, "installs": list(INSTALLS.values())})
        if path == "/warranties": return self._send(200, {"ok": True, "warranties": list(WARRANTIES.values())})
        if path == "/rfqs": return self._send(200, {"ok": True, "rfqs": list(RFQS.values())})
        if path == "/orders":
            user = (q.get("user") or [None])[0]
            rows = list(ORDERS.values())
            if user: rows = [o for o in rows if o["user"]==user]
            return self._send(200, {"ok": True, "orders": rows})
        if path.startswith("/payments/invoices/"):
            inv = pay.get_invoice(path.split("/")[-1])
            return self._send(200 if inv else 404, {"ok": bool(inv), "invoice": inv})
        self._send(404, {"ok": False})

    def do_POST(self):
        _path_early = (self.path.split("?")[0].rstrip("/") or "/")
        if _path_early.startswith("/auth"):
            hdrs = {k: v for k, v in self.headers.items()}
            body = self._read_json() if hasattr(self, "_read_json") else self._read()
            code, resp = authmod.handle_auth_request("POST", _path_early, body if isinstance(body, dict) else {}, hdrs, product="bijli")
            return self._send(code, resp)
        path, _ = self.parse()
        body = self._read_json()
        if path == "/cart/add":
            user = str(body.get("user") or "guest")
            prod = next((p for p in PRODUCTS if p["id"]==body.get("product_id")), None)
            if not prod: return self._send(400, {"ok": False, "error": "unknown_product"})
            qty = int(body.get("qty") or 1)
            if prod["stock"] < qty: return self._send(400, {"ok": False, "error": "insufficient_stock"})
            CARTS.setdefault(user, []).append({"product_id": prod["id"], "title": prod["title"], "qty": qty, "unit_price": prod["price_pkr"]})
            return self._send(200, {"ok": True, "cart": CARTS[user]})
        if path in ("/checkout", "/order"):
            user = str(body.get("user") or "guest")
            items = CARTS.get(user, [])
            if not items: return self._send(400, {"ok": False, "error": "cart_empty"})
            total = sum(i["unit_price"]*i["qty"] for i in items)
            method = (body.get("payment_method") or "bank").lower()
            inv = pay.create_invoice("bijli", total, "PKR", method=method, customer=user, description="Bijli order")
            oid = uid("bo")
            order = {"id": oid, "user": user, "items": items, "total_pkr": total, "payment_method": method,
                     "invoice_id": inv["id"], "payment": inv, "address": body.get("address") or "",
                     "status": "placed", "created_at": iso()}
            ORDERS[oid] = order; CARTS[user] = []
            return self._send(201, {"ok": True, "order": order})
        if path == "/installs":
            dep = 1500
            method = body.get("payment_method") or "jazzcash"
            inv = pay.create_invoice("bijli", dep, "PKR", method=method, customer=body.get("user") or "guest", sku="install_booking")
            iid = uid("ins")
            INSTALLS[iid] = {"id": iid, "product_id": body.get("product_id"), "city": body.get("city"),
                             "date": body.get("date"), "deposit_invoice": inv, "status": "booked", "at": iso()}
            return self._send(201, {"ok": True, "install": INSTALLS[iid]})
        if path == "/warranties":
            wid = uid("war")
            WARRANTIES[wid] = {"id": wid, "product_id": body.get("product_id"), "serial": body.get("serial"),
                               "years": int(body.get("years") or 1), "user": body.get("user"), "at": iso(), "status": "active"}
            return self._send(201, {"ok": True, "warranty": WARRANTIES[wid]})
        if path == "/rfq":
            rid = uid("rfq")
            RFQS[rid] = {"id": rid, "user": body.get("user") or "guest", "title": body.get("title") or "System RFQ",
                         "specs": body.get("specs") or {}, "budget_pkr": body.get("budget_pkr"), "city": body.get("city") or "",
                         "status": "open", "created_at": iso()}
            return self._send(201, {"ok": True, "rfq": RFQS[rid]})
        if path.startswith("/rfq/") and path.endswith("/quote"):
            rid = path.split("/")[2]
            if rid not in RFQS: return self._send(404, {"ok": False})
            q = {"id": uid("qt"), "rfq_id": rid, "vendor_id": body.get("vendor_id") or "ven1",
                 "price_pkr": body.get("price_pkr") or 0, "lead_days": body.get("lead_days") or 7, "at": iso()}
            QUOTES.append(q); RFQS[rid]["status"] = "quoted"
            return self._send(201, {"ok": True, "quote": q})
        if path == "/payments/create":
            inv = pay.create_invoice("bijli", float(body.get("amount") or 0), body.get("currency") or "PKR",
                method=body.get("method") or "stripe", customer=body.get("customer") or "guest", sku=body.get("sku"))
            return self._send(201, {"ok": True, "invoice": inv})
        if path.startswith("/payments/invoices/") and path.endswith("/mark-paid"):
            inv = pay.mark_paid(path.split("/")[3], body.get("proof") or "")
            return self._send(200 if inv else 404, {"ok": bool(inv), "invoice": inv})
        self._send(404, {"ok": False})

def main():
    serve(H, port=int(__import__("os").environ.get("PORT", "8770")), name="Bijli v3")
if __name__ == "__main__":
    main()
