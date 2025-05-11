import { type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import { redirectIfHandleIsLocalized } from "~/lib/redirect";
import { useState } from 'react';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Bevvy | ${data?.page.title ?? ""}` }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error("Missing page handle");
  }

  const [{ page }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle: params.handle, data: page });

  return {
    page,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  // State for form fields
  const [fullName, setFullName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');

  if (page.handle === "contact") {
    // Construct mailto link
    const mailtoRecipient = "contact@bevvy.shop";
    const mailtoSubject = encodeURIComponent(formSubject);
    const mailtoBody = encodeURIComponent(
      `Message:\n${formMessage}\n\nFrom: ${fullName}\nEmail: ${formEmail}`
    );
    const mailtoHref = `mailto:${mailtoRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return (
      <div className="contact-page bg-neutral-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-sewimple tracking-wide">
        <div className="max-w-7xl mx-auto">
          <header className="text-left mb-12 md:mb-16">
            <h1 className="!text-[124px] md:text-7xl text-neutral-900 font-sewimple mb-3">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto">
              We&apos;re here to help and answer any question you might have. We
              look forward to hearing from you!
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16 justify-center">
            {/* Contact Form Section */}
            <div className="md:col-span-1 !col-start-2 bg-white p-8 md:p-10 rounded-xl shadow-2xl">
              <h2 className="font-sewimple text-3xl text-neutral-900 mb-8">
                Send Us A Message
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-[#FF0000] focus:border-[#FF0000] transition-colors"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-[#FF0000] focus:border-[#FF0000] transition-colors"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Question about Bevvy"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-[#FF0000] focus:border-[#FF0000] transition-colors"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-[#FF0000] focus:border-[#FF0000] transition-colors"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  >
                  </textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF0000] text-white font-bevvy text-xl py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="h-fit bg-neutral-800 text-white p-8 md:p-10 rounded-xl shadow-2xl">
              <h2 className="text-3xl mb-8 font-sewimple">
                Contact Information
              </h2>
              <div className="space-y-6 text-neutral-300">
                <div className="flex items-center">
                  <Mail size={24} className="mr-4 text-[#FF0000]" />
                  <a
                    href={mailtoHref}
                    className="hover:text-neutral-100 transition-colors !text-white "
                  >
                    contact@bevvy.shop
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="mr-4 text-[#FF0000]" />
                  <span>+34 649 288 467</span>
                </div>
                <div className="flex items-start">
                  <MapPin size={24} className="mr-4 text-[#FF0000] mt-1" />
                  <span>
                    Avinguda de Gracia 25, 08172 Barcelona, Spain
                  </span>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-neutral-700">
                <h3 className="text-xl mb-4 font-sewimple">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="!text-white hover:!text-[#FF0000] transition-colors"
                  >
                    <Instagram size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default page rendering
  return (
    <div className="page p-12">
      <header>
        <h1 className="!text-[124px] font-sewimple tracking-tight text-neutral-900 sm:text-5xl">
          {page.title}
        </h1>
      </header>
      <main dangerouslySetInnerHTML={{ __html: page.body }} />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
