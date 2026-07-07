export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  category: string
  excerpt: string
}

export const posts: BlogPost[] = [
  {
    slug: 'web-design-in-the-age-of-ai',
    title: 'Web Design in the Age of AI: Why Handmade Still Wins',
    subtitle: 'Everyone can generate a website in 2026. That\'s exactly the problem.',
    date: '7 July 2026',
    readTime: '6 min read',
    category: 'Web Design',
    excerpt: 'AI builders can spit out a website in minutes, and they all look the same. Here\'s how that changed what clients actually pay for, and why handmade design is suddenly worth more, not less.',
  },
  {
    slug: 'how-to-get-found-in-ai-search',
    title: 'How to Get Found When People Ask AI Instead of Google',
    subtitle: 'Your next client might never see a results page. Here\'s how to stay visible.',
    date: '23 June 2026',
    readTime: '7 min read',
    category: 'SEO',
    excerpt: 'More and more people ask ChatGPT or Perplexity for recommendations instead of googling. If AI can\'t read your website, you don\'t exist in that conversation. Here\'s what to do about it.',
  },
  {
    slug: 'what-to-look-for-when-hiring-a-web-designer-in-dubai',
    title: 'What to Look for When Hiring a Web Designer in Dubai',
    subtitle: 'Red flags, smart questions, and how to tell the difference between good and great.',
    date: '9 April 2026',
    readTime: '7 min read',
    category: 'Web Design',
    excerpt: 'You\'ve googled "web designer Dubai" and now you\'re drowning in options. Here\'s how to tell who actually delivers, from someone who\'s been doing this for 10 years.',
  },
  {
    slug: 'how-much-does-a-website-cost-in-dubai',
    title: 'How Much Does a Website Cost in Dubai?',
    subtitle: 'The honest answer from someone who\'s been quoting them for 10 years.',
    date: '2 April 2026',
    readTime: '6 min read',
    category: 'Web Design',
    excerpt: 'Everyone asks this question. Most agencies dodge it. Here\'s what a website actually costs in Dubai, and why the price range is so wild.',
  },
  {
    slug: 'why-every-dj-needs-a-website',
    title: 'Why Every DJ and Musician Needs a Professional Website',
    subtitle: 'Instagram is not your website. Here\'s why that matters.',
    date: '2 April 2026',
    readTime: '5 min read',
    category: 'Branding',
    excerpt: 'You\'ve got 50k followers and zero control over your brand. I\'ve built sites for DJs across Dubai and Europe. Here\'s what I keep telling them.',
  },
]

export function getAdjacentPosts(currentSlug: string) {
  const idx = posts.findIndex(p => p.slug === currentSlug)
  const prev = idx > 0 ? posts[idx - 1] : posts[posts.length - 1]
  const next = idx < posts.length - 1 ? posts[idx + 1] : posts[0]
  return { prev, next }
}
