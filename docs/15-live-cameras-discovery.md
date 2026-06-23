# Live Cameras — Discovery Checklist

Complete with the kindergarten owner before enabling live cameras in production.

## Hardware and vendor

- [ ] Camera brand/model (e.g. Hikvision, Dahua, Reolink)
- [ ] Connection type: WiFi / PoE / existing nanny-cam cloud
- [ ] Number of cameras for pilot (recommend: **1 room**)
- [ ] Which rooms/locations (e.g. playroom, yard — avoid bathrooms/changing areas)
- [ ] Who installs and maintains hardware

## Streaming provider (pick one)

| Option | When to use |
|--------|-------------|
| **Demo HLS URL** (pilot) | Paste a public/test HLS URL in teacher camera settings |
| **Mux Live** | Production white-label, API for signed URLs |
| **Cloudflare Stream** | Lower cost at scale |
| **Existing vendor API** | Kindergarten already pays for cloud cameras |

Document the final choice in `docs/08-decisions-log.md`.

## Hours and privacy

- [ ] Viewing hours (default pilot: Sun–Thu 08:00–16:00, Asia/Jerusalem)
- [ ] Master off switch during nap / privacy time
- [ ] Parent consent collected before first view (in-app)
- [ ] Written policy: other children may appear on camera
- [ ] No recording or download in pilot

## Parent communication

- [ ] Announce feature to parents before go-live
- [ ] Explain 5–15 second typical delay on live stream
- [ ] Support contact if stream fails

## Exit criteria

All items above checked + one successful test view on Android and iPhone/web.
