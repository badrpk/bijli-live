# Bijli — competitive parity

**Target:** Specialized solar/energy marketplaces + Daraz-class catalog depth for electrical goods

| Feature | API (`apps/api`) |
|---------|------------------|
| Catalog filters | category, brand, city, watt, price, search |
| Vendors | `GET /vendors` |
| Cart + checkout | bank transfer / card style methods |
| RFQ + vendor quotes | `POST /rfq`, `POST /rfq/{id}/quote` |

```bash
cd apps/api && python3 server.py
```

## v3
See GAP_ANALYSIS.md — multi-rail payments + undercut pricing + gap features.

