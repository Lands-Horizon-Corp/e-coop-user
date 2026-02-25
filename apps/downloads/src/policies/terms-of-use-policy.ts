import { Policy } from "../components/policies/types";

export const termsOfUsePolicy: Policy = {
  id: "terms-of-use",
  title: "Terms of Use",
  effectiveDate: "January 1, 2026",
  content: `Welcome to e-coop-suite (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>), operated by Lands Horizon Corp ("we", "our", "us"). By accessing or using our website and digital platforms, you ("user", "member", "organization") agree to comply with these Terms of Use. Please read them carefully to ensure safe and respectful use of our online resources.`,
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>By using our website, applications, or any related services, you agree to be bound by these Terms of Use and any applicable laws and regulations.</li>
          <li>If you do not agree with any part of these terms, please do not use our services.</li>
        </ul>
      `
    },
    {
      id: "permitted-uses",
      title: "2. Permitted Uses",
      content: `
        <p>You are permitted to use our digital platforms for the following:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Creating and managing cooperative accounts and memberships</li>
          <li>Accessing and utilizing banking services such as savings, loans, and payments</li>
          <li>Managing member information and transactions</li>
          <li>Accessing educational and informational resources</li>
          <li>Communicating with other cooperative members and staff through provided tools</li>
          <li>Other lawful activities consistent with the goals of cooperative banking and management</li>
        </ul>
      `
    },
    {
      id: "prohibited-uses",
      title: "3. Prohibited Uses",
      content: `
        <p>You are strictly prohibited from:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Sharing your login credentials or allowing unauthorized access to your account</li>
          <li>Attempting to gain unauthorized access to other users' accounts or restricted areas of the platform</li>
          <li>Engaging in fraudulent, deceptive, or illegal activities</li>
          <li>Using bots, scripts, or automated means to access or manipulate the platform</li>
          <li>Uploading, sharing, or transmitting harmful code, malware, or viruses</li>
          <li>Misusing the platform to harass, abuse, or harm others</li>
          <li>Attempting to interfere with, disrupt, or compromise the security or functionality of the platform</li>
          <li>Accessing, copying, or distributing content or data without proper authorization</li>
          <li>Circumventing or attempting to bypass any security measures or usage restrictions</li>
        </ul>
      `
    },
    {
      id: "user-responsibilities",
      title: "4. User Responsibilities",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Ensure the accuracy and completeness of information provided on the platform</li>
          <li>Protect your account by using a strong password and updating it regularly</li>
          <li>Report any suspicious activity or security concerns to the platform administrators immediately</li>
          <li>Use the platform in a manner that respects the rights and privacy of others</li>
        </ul>
      `
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All content, trademarks, logos, and materials provided on the platform are the property of Lands Horizon Corp or its licensors, except user-uploaded content which remains the property of the user or their cooperative.</li>
          <li>You may not use, copy, reproduce, or distribute any content from the platform without prior written permission, except for your own cooperative's data.</li>
        </ul>
      `
    },
    {
      id: "termination",
      title: "6. Termination of Use",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>We reserve the right to suspend or terminate your access to the platform at any time for violation of these Terms of Use, security concerns, or as required by law.</li>
          <li>You may terminate your use of the platform at any time by closing your account, subject to the cooperative's internal policies.</li>
        </ul>
      `
    },
    {
      id: "changes",
      title: "7. Changes to Terms",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Lands Horizon Corp may update these Terms of Use at any time.</li>
          <li>Notice of significant changes will be provided via email or platform notification.</li>
          <li>Continued use of the platform after changes constitutes your acceptance of the revised terms.</li>
        </ul>
      `
    },
    {
      id: "governing-law",
      title: "8. Governing Law",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>These Terms of Use are governed by the laws of the Philippines.</li>
          <li>Any disputes will be subject to the exclusive jurisdiction of the Philippine courts.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "9. Contact Us",
      content: `
        <p>For questions or concerns regarding these Terms of Use, please contact:</p>
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