import { groq } from "next-sanity";

// Blog
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    author->{ name, image }
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    coverImage,
    publishedAt,
    author->{ name, image, bio }
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }
`;

// Portfolio
export const portfolioItemBySlugQuery = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    coverImage,
    "galleryImages": galleryImages[defined(asset)]{
      _key,
      alt,
      caption,
      hotspot,
      crop,
      "asset": asset->{ _id, url, metadata { dimensions } }
    },
    client,
    year,
    tags,
    displayOrder,
    problem,
    hypothesis,
    solution,
    results,
    learnings
  }
`;

export const portfolioItemSlugsQuery = groq`
  *[_type == "portfolioItem" && defined(slug.current)].slug.current
`;

export const portfolioItemsQuery = groq`
  *[_type == "portfolioItem" && category == $category] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    client,
    year,
    tags,
    category,
    displayOrder
  }
`;

export const featuredPortfolioQuery = groq`
  *[_type == "portfolioItem"] | order(displayOrder asc)[0..3] {
    _id,
    title,
    slug,
    description,
    coverImage,
    category,
    tags,
    displayOrder
  }
`;

// Products
export const productsQuery = groq`
  *[_type == "product" && available == true] | order(order asc) {
    _id,
    title,
    description,
    price,
    currency,
    image,
    externalUrl
  }
`;

// About Page
export const aboutPageQuery = groq`
  *[_type == "aboutPage" && _id == "singleton-aboutPage"][0] {
    profileImage,
    bio
  }
`;

// Contact Page
export const contactPageQuery = groq`
  *[_type == "contactPage" && _id == "singleton-contactPage"][0] {
    heading,
    subtext
  }
`;

// Magazine
export const magazinesQuery = groq`
  *[_type == "magazine"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    seriesLabel,
    publishedAt,
    coverImage,
    description
  }
`;

export const magazineBySlugQuery = groq`
  *[_type == "magazine" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    seriesLabel,
    publishedAt,
    coverImage,
    description,
    scenes
  }
`;

export const magazineSlugsQuery = groq`
  *[_type == "magazine" && defined(slug.current)].slug.current
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "singleton-siteSettings"][0] {
    title,
    description,
    aboutContent,
    profileImage,
    socialLinks
  }
`;
