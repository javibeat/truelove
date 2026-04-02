import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://truelovecreative.es'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
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
  ]
}
