// Field-level i18n decision: Using {ko, en} fields per document.
// This is intentional for a 2-language personal portfolio.
// If a 3rd language is ever added, all schemas, queries, and components will need updating.
// Alternative: @sanity/document-internationalization plugin (document-level i18n)
import { blogPost } from "./blog-post";
import { portfolioItem } from "./portfolio-item";
import { product } from "./product";
import { author } from "./author";
import { siteSettings } from "./site-settings";
import { aboutPage } from "./about-page";
import { contactPage } from "./contact-page";
import { magazine } from "./magazine";

export const schemaTypes = [blogPost, portfolioItem, product, author, siteSettings, aboutPage, contactPage, magazine];
