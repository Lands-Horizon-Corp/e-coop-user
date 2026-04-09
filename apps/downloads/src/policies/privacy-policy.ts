import { Policy } from "../components/policies/types";

export const privacyPolicy: Policy = {
  id: "privacy",
  title: "Privacy Policy",
  effectiveDate: "January 1, 2026",
  content: `Welcome to e-coop-suite. This Privacy Policy describes how Lands Horizon Corp (“we”, “us”, or “our”) collects, uses, stores, and protects your personal information through the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). By using our services, you agree to the practices described in this policy.
`,
  sections: [
    {
      id: "personal-data",
      title: "1. Personal Data We Collect",
      content: `
        <p>We may collect the following types of personal information:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Name</li>
          <li>Email address</li>
          <li>Contact number</li>
          <li>Residential or business address</li>
          <li>Government-issued ID</li>
          <li>Geographic location</li>
          <li>Transaction history and records</li>
          <li>Device information</li>
          <li>Other information necessary for service delivery</li>
        </ul>
      `
    },
    {
      id: "collection-method",
      title: "2. How We Collect Data",
      content: `
        <p>Personal data is collected through:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Registration forms and account setup</li>
          <li>Website and app usage tracking</li>
          <li>Cookies and similar technologies</li>
          <li>Third-party integrations (e.g., payment providers)</li>
          <li>Manual uploads and submissions by users</li>
        </ul>
      `
    },
    {
      id: "purpose",
      title: "3. Purpose of Data Collection",
      content: `
        <p>We collect and use your data for the following purposes:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Account creation and management</li>
          <li>Processing transactions and banking operations</li>
          <li>Improving our products and services</li>
          <li>Marketing and communication (with your consent)</li>
          <li>Data analytics and platform optimization</li>
          <li>Compliance with legal and regulatory requirements</li>
        </ul>
      `
    },
    {
      id: "legal-basis",
      title: "4. Legal Basis for Processing",
      content: `
        <p>We process your personal data based on:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Your explicit consent</li>
          <li>Contractual necessity (to provide our services)</li>
          <li>Compliance with legal and regulatory obligations</li>
          <li>Our legitimate interests (such as fraud prevention and service improvement)</li>
        </ul>
      `
    },
    {
      id: "data-use",
      title: "5. How We Use Your Data",
      content: `
        <p>Your data may be used for:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Authenticating users and securing accounts</li>
          <li>Delivering banking and cooperative services</li>
          <li>Communicating important updates or service information</li>
          <li>Conducting analytics for service improvement and risk management</li>
        </ul>
      `
    },
    {
      id: "sharing",
      title: "6. Sharing and Disclosure of Data",
      content: `
        <p>We may share your data with:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Partner cooperatives (for banking and member transactions)</li>
          <li>Payment processors (to facilitate financial operations)</li>
          <li>Regulatory bodies (for compliance, as required by law)</li>
          <li>Developers or third parties with approved API access</li>
        </ul>
        <p class="mt-3">Data is only shared:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>With your consent</li>
          <li>To fulfill legal obligations</li>
          <li>With business partners and service providers under strict agreements</li>
        </ul>
      `
    },
    {
      id: "retention",
      title: "7. Data Retention",
      content: `
        <p>We retain user data for the duration of your membership, plus up to five (5) years after account or cooperative closure, or as required by law. Data deletion is subject to approval from management and regulatory compliance.</p>
      `
    },
    {
      id: "security",
      title: "8. Security Measures",
      content: `
        <p>We take the security of your information very seriously, implementing measures such as:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Encryption of sensitive data at rest and in transit</li>
          <li>Strong password hashing (e.g., Argon2)</li>
          <li>Access controls and role-based permissions</li>
          <li>Regular security audits and system reviews</li>
          <li>Secure storage infrastructure</li>
          <li>Protection against XSS (Cross-Site Scripting), SQL injection, CSRF (Cross-Site Request Forgery)</li>
          <li>Rate limiting and IP blocking for suspicious or illegal activities</li>
          <li>Prohibition of access to sensitive files (e.g., environment files, Dockerfiles)</li>
        </ul>
      `
    },
    {
      id: "rights",
      title: "9. Your Rights",
      content: `
        <p>You have the following rights regarding your personal data:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Access your data and request feedback</li>
          <li>Correct or update your information</li>
          <li>Request deletion or restriction of your data</li>
          <li>Withdraw consent for data processing</li>
          <li>Request data portability</li>
          <li>File a complaint or provide a user rating</li>
        </ul>
        <p class="mt-3">How to exercise your rights:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Visit the homepage and use the feedback or contact forms</li>
          <li>Contact us directly using the details provided below</li>
          <li>Options are also available in the website/app footer</li>
        </ul>
      `
    },
    {
      id: "transfers",
      title: "10. International Data Transfers",
      content: `
        <p>Currently, we do not store or process data outside the Philippines. If international transfer becomes necessary, data will be protected by currency exchange checks and API-based security. No cross-border transfers will occur without explicit action and consent from users, and exchange rates are verified before completing any such transaction.</p>
      `
    },
    {
      id: "cookies",
      title: "11. Cookies and Tracking Technologies",
      content: `
        <p>We use cookies and similar technologies for:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Analytics and service optimization</li>
          <li>Enhancing user experience</li>
          <li>Authentication and security</li>
          <li>User and bank protection</li>
        </ul>
        <p class="mt-3">You may manage your cookie preferences in your browser settings.</p>
      `
    },
    {
      id: "children",
      title: "12. Children's Privacy",
      content: `
        <p>We do not intentionally collect data from children. The platform is intended for individuals involved in cooperative banking and management. Any data related to minors associated with members is subject to parental consent and legal requirements.</p>
      `
    },
    {
      id: "updates",
      title: "13. Policy Updates",
      content: `
        <p>We may update this Privacy Policy from time to time.</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Major changes will be communicated via email or platform notification.</li>
          <li>Continued use of our services after changes constitutes your acceptance of the updated policy.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "14. Contact Us",
      content: `
        <p>For privacy-related questions or requests, please contact:</p>
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