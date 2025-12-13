# Custom Domain Setup Guide

## What is a Custom Domain?

A custom domain allows you to use your own domain name (e.g., `yourdomain.com`) instead of the default Linkingo URL (`linkingo.in/username`). This makes your page more professional and memorable.

**Example**:
- Default: `linkingo.in/john`
- Custom: `john.com` or `www.john.com`

---

## Requirements

- **Pro Plan**: Custom domains are only available on the Pro plan (₹79/month)
- **Your Own Domain**: You need to own a domain name

---

## Step 1: Buy a Domain

If you don't already have a domain, purchase one from a domain registrar:

### Recommended Providers:
- **[Namecheap.com](https://namecheap.com)** - ₹500/year
- **[GoDaddy.com](https://godaddy.com)** - ₹699/year
- **[Hostinger.com](https://hostinger.com)** - ₹399/year

**Tip**: Choose a short, memorable domain that represents your brand.

---

## Step 2: Configure DNS Settings

Once you have a domain, you need to point it to Linkingo:

### DNS Configuration:

1. Log in to your domain provider's dashboard
2. Find "DNS Settings" or "DNS Management"
3. Add a new CNAME record with these values:

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Name** | `www` (or `@` for root domain) |
| **Value** | `cname.vercel-dns.com` |
| **TTL** | `3600` (or Auto) |

### Provider-Specific Instructions:

**Namecheap**:
1. Dashboard → Domain List
2. Click "Manage" next to your domain
3. Go to "Advanced DNS" tab
4. Click "Add New Record"
5. Select "CNAME Record"
6. Enter the values above

**GoDaddy**:
1. My Products → Domains
2. Click "DNS" next to your domain
3. Click "Manage Zones"
4. Click "Add" → "CNAME"
5. Enter the values above

**Hostinger**:
1. Domains → Manage
2. Click "DNS / Name Servers"
3. Click "Add Record"
4. Select "CNAME"
5. Enter the values above

---

## Step 3: Add Domain to Linkingo

1. Go to [Settings](https://linkingo.in/dashboard/settings)
2. Scroll to "Custom Domain" section
3. Enter your domain (e.g., `yourdomain.com`)
4. Click "Save Changes"

---

## Step 4: Wait for DNS Propagation

DNS changes can take time to propagate globally:

- **Typical**: 5-30 minutes
- **Maximum**: Up to 24 hours

### Check DNS Status:
Visit [dnschecker.org](https://dnschecker.org) and enter your domain to check if the CNAME record is active.

---

## Step 5: Verify Your Domain

Once DNS has propagated:

1. Visit your custom domain in a browser
2. You should see your Linkingo page
3. SSL certificate will be automatically generated (may take a few minutes)

---

## Troubleshooting

### Domain not working after 24 hours?

**Check these common issues**:

1. **Incorrect CNAME value**: Make sure you entered `cname.vercel-dns.com` exactly
2. **Wrong record type**: Use CNAME, not A record
3. **Cloudflare/Proxy**: If using Cloudflare, disable the proxy (orange cloud)
4. **Root domain**: Some providers don't support CNAME on root domain - use `www` subdomain instead

### SSL Certificate Error?

- Wait 5-10 minutes after DNS propagation
- SSL certificates are generated automatically
- If error persists after 1 hour, contact support

### Still need help?

- Email: support@linkingo.in
- Check our [FAQ](https://linkingo.in/help/faq)
- Contact us on [X (Twitter)](https://x.com/Linkingodotin)

---

## Important Notes

- Custom domains are a **Pro feature** (₹79/month)
- You can only use one custom domain per account
- Changing your custom domain will break old links
- Keep your domain registration active (renew yearly)

---

## Example Setup

**Domain**: `john.com`

**DNS Record**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Result**: Your Linkingo page will be accessible at `www.john.com`

---

**Need more help?** Contact our support team at support@linkingo.in
