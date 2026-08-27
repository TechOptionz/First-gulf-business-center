import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://firstgulfbusiness.ae";

  const routes = [
    "",
    "/about",
    "/office-space",
    "/office-space/coworking",
    "/office-space/virtual-office",
    "/office-space/freezone",
    "/business-consultancy",
    "/business-consultancy/business-setup-pro",
    "/business-consultancy/corporate-solutions",
    "/business-consultancy/trademark-registration",
    "/contact",
    "/book-a-tour",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/office-space") ? 0.9 : 0.8,
  }));
}
