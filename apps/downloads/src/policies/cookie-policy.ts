import { Policy } from "../components/policies/types";

export const cookiePolicy: Policy = {
  id: "cookies",
  title: "Cookie Policy",
  effectiveDate: "January 1, 2026",
  content: `This Cookie Policy describes how Lands Horizon Corp ("we", "us", or "our") uses cookies and similar tracking technologies on the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). By using our website or digital services, you agree to the placement and use of cookies as described below.`,
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Cookies are small text files stored on your device by your web browser when you visit a website.</li>
          <li>Cookies help us recognize your device, remember your preferences, and enhance your user experience.</li>
          <li>We may also use other tracking technologies such as web beacons, pixels, or local storage.</li>
        </ul>
      `
    },
    {
      id: "types-of-cookies",
      title: "2. Types of Cookies We Use",
      content: `
        <p>We use the following types of cookies and tracking technologies:</p>
        <p class="font-semibold mt-3">Essential Cookies:</p>
        <p>Required for the basic operation of our platform, such as authentication and security.</p>
        <p class="font-semibold mt-3">Performance and Analytics Cookies:</p>
        <p>Help us understand how users interact with our website, so we can improve features and performance.</p>
        <p class="font-semibold mt-3">Functionality Cookies:</p>
        <p>Remember your preferences and settings to provide a more personalized experience.</p>
        <p class="font-semibold mt-3">Security Cookies:</p>
        <p>Used to detect and prevent security risks, such as fraudulent activities or unauthorized access.</p>
      `
    },
    {
      id: "what-data-collected",
      title: "3. What Data is Collected",
      content: `
        <p>Through cookies, we may collect:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Device information (type, model, OS, browser)</li>
          <li>IP address and geographic location</li>
          <li>Usage data (pages visited, actions taken, time spent)</li>
          <li>Authentication and session data</li>
          <li>Preferences and settings</li>
        </ul>
      `
    },
    {
      id: "how-we-use-cookies",
      title: "4. How We Use Cookies",
      content: `
        <p>We use cookies and tracking technologies to:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Authenticate users and safeguard accounts</li>
          <li>Enhance website and app security</li>
          <li>Analyze website usage and improve our services</li>
          <li>Remember your login details, preferences, and settings</li>
          <li>Provide a seamless and personalized user experience</li>
        </ul>
      `
    },
    {
      id: "managing-cookies",
      title: "5. Managing Cookies",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Most web browsers automatically accept cookies, but you may set your browser to block or delete cookies.</li>
          <li>Please note that disabling cookies may affect the functionality and performance of our platform.</li>
          <li>For more information on how to manage cookies, refer to your browser's help section.</li>
        </ul>
      `
    },
    {
      id: "third-party-cookies",
      title: "6. Third-Party Cookies",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>We may allow certain trusted third-party service providers (such as analytics or payment partners) to place cookies or similar technologies on our platform.</li>
          <li>These third parties may collect information about your online activities over time and across different websites.</li>
        </ul>
      `
    },
    {
      id: "changes-policy",
      title: "7. Changes to This Policy",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>We may update this Cookie Policy from time to time.</li>
          <li>Changes will be communicated via email or platform notification.</li>
          <li>Continued use of our platform after changes constitutes your acceptance of the updated policy.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "8. Contact Us",
      content: `
        <p>For questions or concerns about our Cookie Policy, please contact:</p>
        <p class="text-lg font-bold mt-3 text-white">Zalven Lemuel Dayao</p>
        <p class="text-xs text-white/50">CEO, Lands Horizon Corp</p>
        <p class="text-white/50 text-xs mt-2">Email: <span class="text-emerald-400">lands.horizon.corp@gmail.com</span></p>
        <p class="text-white/50 text-xs">Phone: <span class="text-emerald-400">+63 991 617 1081</span></p>
        <div class="flex gap-x-2 text-xs mt-3">
          <p class="text-white/50">Address:</p>
          <p class="text-white/50 p-2 border border-white/10 rounded-lg capitalize max-w-md">BLK 5 LOT 49, MAKADIYOS STREET VILLA MUZON SUBD, MUZON EAST CITY OF SAN JOSE DEL MONTE BULACAN, REGION III (CENTRAL LUZON), 3023, PHILIPPINES</p>
        </div>
      `
    }
  ]
};