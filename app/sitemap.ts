import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://truelovecreative.es'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/web-design`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/graphic-design`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/app-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/branding`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work/kiko-navarro`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/work/jessica-morari`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/work/javi-beat`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/work/estrela-photo`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/work/manuel-kevsax`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/work/sergio-trumpet`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/work/julio-cuba`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog/web-design-in-the-age-of-ai`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/how-to-get-found-in-ai-search`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/what-to-look-for-when-hiring-a-web-designer-in-dubai`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/how-much-does-a-website-cost-in-dubai`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/why-every-dj-needs-a-website`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ]
}
