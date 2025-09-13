# API Specification

Based on SEO-first architecture, data retrieval uses Next.js rendering strategies (SSG/ISR/SSR) while Server Actions handle mutations (POST/PUT/DELETE operations).

## Data Retrieval Strategy (GET Operations)

**SSG/ISR/SSR Functions for SEO-Optimized Data Fetching:**

```typescript
// Static Site Generation for Popular Destinations (Homepage)
export async function getStaticProps() {
  const destinations = await countryService.getPopularDestinations("en");
  const blogPosts = await blogService.getLatestBlogPosts("en", 3);

  return {
    props: {
      destinations,
      blogPosts,
    },
    revalidate: 3600, // 1 hour ISR
  };
}

// Static Generation with ISR for Destination Pages
export async function generateStaticParams() {
  const countries = await countryService.getAllCountryCodes();
  return countries.map(code => ({ destination: code }));
}

export async function getDestinationData(
  destinationCode: string,
  locale: string
) {
  // This runs at build time (SSG) or request time (ISR)
  const destination = await countryService.getDestinationWithVisaOptions({
    destinationCode,
    locale,
  });

  const relatedBlogPosts = await blogService.getBlogPostsByDestination(
    destinationCode,
    locale,
    5
  );

  return {
    destination,
    relatedBlogPosts,
    lastModified: new Date().toISOString(),
  };
}

// Server-Side Rendering for Dynamic Content (Search Results)
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { passport, destination, search } = context.query;

  if (passport && destination) {
    // Dynamic visa eligibility checking
    const eligibility = await visaService.checkEligibility({
      passportCountry: passport as string,
      destinationCountry: destination as string,
      locale: context.locale || "en",
    });

    return {
      props: { eligibility },
    };
  }

  // Search results
  if (search) {
    const results = await countryService.searchDestinations({
      query: search as string,
      locale: context.locale || "en",
    });

    return {
      props: { searchResults: results },
    };
  }

  return { props: {} };
}
```

## Server Actions for Mutations (POST/PUT/DELETE)

```typescript
"use server";

import { z } from "zod";
import { revalidateTag, revalidatePath } from "next/cache";

// Newsletter Subscription
export async function subscribeToNewsletter(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    locale: z.string().optional().default("en"),
  });

  const email = formData.get("email") as string;
  const locale = formData.get("locale") as string;

  const { email: validEmail, locale: validLocale } = schema.parse({
    email,
    locale,
  });

  try {
    // Add to newsletter service
    await newsletterService.subscribe(validEmail, validLocale);

    return { success: true, message: "Subscribed successfully" };
  } catch (error) {
    return { success: false, error: "Subscription failed" };
  }
}

// Contact Form Submission
export async function submitContactForm(formData: FormData) {
  const schema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    reason: z.enum(["question", "partnership", "other"]),
    subject: z.string().min(5).max(200),
    message: z.string().min(10).max(2000),
    locale: z.string().optional().default("en"),
  });

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    reason: formData.get("reason") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    locale: formData.get("locale") as string,
  };

  const validData = schema.parse(rawData);

  try {
    await contactService.submitMessage(validData);

    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    return { success: false, error: "Failed to send message" };
  }
}

// Admin Content Management Actions
export async function updateDestinationContent(formData: FormData) {
  // Admin authentication check
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  const schema = z.object({
    destinationId: z.string(),
    locale: z.string(),
    name: z.string(),
    about: z.string(),
  });

  const data = {
    destinationId: formData.get("destinationId") as string,
    locale: formData.get("locale") as string,
    name: formData.get("name") as string,
    about: formData.get("about") as string,
  };

  const validData = schema.parse(data);

  try {
    await countryService.updateDestinationContent(validData);

    // Revalidate affected pages
    revalidateTag("destinations");
    revalidatePath(`/[locale]/d/${validData.destinationId}`);

    return { success: true, message: "Content updated successfully" };
  } catch (error) {
    return { success: false, error: "Failed to update content" };
  }
}
```

## SEO-Optimized Page Generation Strategy

```typescript
// app/[locale]/d/[destination]/page.tsx
export async function generateMetadata({ params }: PageProps) {
  const destination = await getDestinationData(params.destination, params.locale);

  return {
    title: `${destination.name} Visa Requirements | GetTravelVisa.com`,
    description: `Complete visa information for ${destination.name}. Check requirements, fees, and processing times for your passport.`,
    openGraph: {
      title: `${destination.name} Visa Guide`,
      description: destination.about,
      images: [destination.heroImage],
    },
    alternates: {
      canonical: `https://gettravelvisa.com/${params.locale}/d/${params.destination}`,
      languages: {
        'en': `https://gettravelvisa.com/en/d/${params.destination}`,
        'ar': `https://gettravelvisa.com/ar/d/${params.destination}`,
        'es': `https://gettravelvisa.com/es/d/${params.destination}`,
        // ... other languages
      }
    }
  };
}

// ISR Implementation
export const revalidate = 3600; // 1 hour

export default async function DestinationPage({ params }: PageProps) {
  const data = await getDestinationData(params.destination, params.locale);

  return <DestinationPageComponent {...data} />;
}
```

---
