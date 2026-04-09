"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterDict {
  nav: Record<string, unknown>;
  footer: Record<string, unknown>;
}

interface FooterProps {
  lang: string;
  dict: FooterDict;
}

// Helper to get nested dict values safely
const getFooterText = (dict: FooterDict, key: string, fallback: string): string => {
  const parts = key.split('.');
  let value: unknown = dict.footer;
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return fallback;
    }
  }
  return typeof value === 'string' ? value : fallback;
};

const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61578235291840", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/elementals/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/elementals", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@elementals.com", icon: Mail, label: "Email" },
];

const getFeaturesLinks = (dict: FooterDict) => [
  { name: getFooterText(dict, 'links.classspark', 'ClassSpark'), path: "/features/classspark" },
  { name: getFooterText(dict, 'links.gradebook', 'Gradebook'), path: "/features/gradebook" },
  { name: getFooterText(dict, 'links.scheduling', 'Scheduling'), path: "/features/scheduling" },
  { name: getFooterText(dict, 'links.exams', 'Exams'), path: "/features/exams" },
  { name: getFooterText(dict, 'links.curriculum', 'Curriculum'), path: "/features/curriculum" },
  { name: getFooterText(dict, 'links.pricing', 'Pricing'), path: "/pricing" },
];

const getUseCasesLinks = (dict: FooterDict) => [
  { name: getFooterText(dict, 'links.forTeachers', 'For Teachers'), path: "/for-teachers" },
  { name: getFooterText(dict, 'links.forSchedulers', 'For Schedulers'), path: "/for-schedulers" },
  { name: getFooterText(dict, 'links.forStudents', 'For Students'), path: "/for-students" },
  { name: getFooterText(dict, 'links.forParents', 'For Parents'), path: "/for-parents" },
];

const getResourcesLinks = (dict: FooterDict) => [
  { name: getFooterText(dict, 'links.blog', 'Blog'), path: "/blog" },
  { name: getFooterText(dict, 'links.faq', 'FAQ'), path: "/faq" },
  { name: getFooterText(dict, 'links.contact', 'Contact'), path: "/contact" },
];

const getAboutLinks = (dict: FooterDict) => [
  { name: getFooterText(dict, 'links.privacyLink', 'Privacy'), path: "/privacy" },
  { name: getFooterText(dict, 'links.termsLink', 'Terms'), path: "/terms" },
  { name: getFooterText(dict, 'links.cookieSettings', 'Cookie Settings'), path: "/cookies" },
];

export default function Footer({ lang, dict }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const slug = lang === "vi" ? "vn" : "en";
  const getLocalizedPath = (path: string) => {
    return `/${slug}${path === "/" ? "" : path}`;
  };

  // Get translated links
  const featuresLinks = getFeaturesLinks(dict);
  const useCasesLinks = getUseCasesLinks(dict);
  const resourcesLinks = getResourcesLinks(dict);
  const aboutLinks = getAboutLinks(dict);

  // Get section headers
  const sectionFeatures = getFooterText(dict, 'sections.features', 'Features');
  const sectionUseCases = getFooterText(dict, 'sections.useCases', 'Use Cases');
  const sectionResources = getFooterText(dict, 'sections.resources', 'Resources');
  const sectionAbout = getFooterText(dict, 'sections.about', 'About');

  // Get newsletter translations
  const newsletterTitle = getFooterText(dict, 'newsletter.title', 'Newsletter');
  const newsletterSubtitle = getFooterText(dict, 'newsletter.subtitle', 'Subscribe to get the latest updates');
  const newsletterPlaceholder = getFooterText(dict, 'newsletter.placeholder', 'Your email');
  const newsletterSubscribe = getFooterText(dict, 'newsletter.subscribe', 'Subscribe');
  const newsletterThanks = getFooterText(dict, 'newsletter.thanks', 'Thanks for subscribing!');
  const errorEmpty = getFooterText(dict, 'newsletter.errorEmpty', 'Please enter your email address');
  const errorInvalid = getFooterText(dict, 'newsletter.errorInvalid', 'Please enter a valid email address');
  const errorFailed = getFooterText(dict, 'newsletter.errorFailed', 'Subscription failed. Please try again.');

  // Get contact translations
  const contactAddress = getFooterText(dict, 'contact.addressValue', '721-725 Nathan Road, Belgian Bank Building, Mongkok, Hong Kong');
  const contactWorldwide = getFooterText(dict, 'contact.worldwide', 'Available worldwide for remote rollout support');

  const isValidEmail = (emailInput: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError(errorEmpty);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError(errorInvalid);
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale: lang }),
      });

      if (!response.ok) {
        setEmailError(errorFailed);
        return;
      }

      setSubscribed(true);
      setEmail("");
    } catch {
      setEmailError(errorFailed);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="border-t border-gray-800/50 bg-gray-950">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={getLocalizedPath("/")} className="flex items-center mb-3">
              <span className="text-xl font-bold"><span className="text-green-500">Kiwi</span><span className="text-yellow-400">Bee</span></span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              {(dict.footer.description as string) || "AI-powered school management for modern educators."}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="p-2 bg-gray-800 rounded-full hover:bg-[#16a34a]/10 hover:text-[#16a34a] transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{sectionFeatures}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {featuresLinks.map((link) => (
                <li key={link.path}>
                  <Link href={getLocalizedPath(link.path)} className="hover:text-[#16a34a] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{sectionUseCases}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {useCasesLinks.map((link) => (
                <li key={link.path}>
                  <Link href={getLocalizedPath(link.path)} className="hover:text-[#16a34a] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{sectionResources}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link href={getLocalizedPath(link.path)} className="hover:text-[#16a34a] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{sectionAbout}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {aboutLinks.map((link) => (
                <li key={link.path}>
                  <Link href={getLocalizedPath(link.path)} className="hover:text-[#16a34a] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-sm mb-3">{newsletterTitle}</h3>
            <p className="text-sm text-gray-400 mb-3">
              {newsletterSubtitle}
            </p>
            {subscribed ? (
              <p className="text-sm text-green-600">{newsletterThanks}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  {newsletterPlaceholder}
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder={newsletterPlaceholder}
                  value={email}
                  disabled={isSubscribing}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={`h-9 text-sm ${emailError ? "border-red-500" : ""}`}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "newsletter-email-error" : undefined}
                />
                {emailError && (
                  <p id="newsletter-email-error" role="alert" className="text-xs text-red-500">
                    {emailError}
                  </p>
                )}
                <Button type="submit" size="sm" className="w-full" disabled={isSubscribing}>
                  {newsletterSubscribe}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Kiwibee. {(dict.footer.copyright as string) || "All rights reserved."}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {getFooterText(dict, 'contact.email', 'Email')}: <a href="mailto:hello@elementals.com" className="hover:text-[#16a34a]">hello@elementals.com</a>
            {" | "}
            {getFooterText(dict, 'contact.whatsapp', 'WhatsApp')}: <a href="https://wa.me/85294954912" className="hover:text-[#16a34a]">+852 94954912</a>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {getFooterText(dict, 'contact.address', 'Address')}: {contactAddress}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {contactWorldwide}
          </p>
        </div>
      </div>
    </footer>
  );
}
