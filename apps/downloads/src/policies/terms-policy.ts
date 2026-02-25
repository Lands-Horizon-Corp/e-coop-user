import { Policy } from "../components/policies/types";

export const termsPolicy: Policy = {
  id: "terms",
  title: "Terms and Conditions",
  effectiveDate: "January 1, 2026",
  content: `Welcome to e-coop-suite (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>), operated by Lands Horizon Corp ("we", "our", "us"). By using our platform and services, you ("you", "your", "user", "member", or "organization") agree to comply with these Terms and Conditions. Please read carefully.`,
  sections: [
    {
      id: "definitions",
      title: "1. Definitions",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Platform:</strong> The e-coop-suite digital solution for cooperative banking and management.</li>
          <li><strong>Service:</strong> Includes savings, loans, digital wallets, payment processing, member management, accounts, and related features.</li>
          <li><strong>Users:</strong> Cooperative businesses, their members, staff, admins, tellers, collectors, employees, and the general public.</li>
          <li><strong>Organization:</strong> Refers to the cooperative business registered on the platform.</li>
        </ul>
      `
    },
    {
      id: "eligibility",
      title: "2. Eligibility & Registration",
      content: `
        <p class="font-semibold mt-3">Registration is open to:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Cooperative organizations and businesses</li>
          <li>Individual members, staff, and employees of cooperatives</li>
          <li>The general public (subject to platform approval)</li>
        </ul>
        <p class="font-semibold mt-3">Registration requirements:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Valid email address</li>
          <li>Secure password</li>
          <li>Contact number</li>
          <li>Accurate physical location (for security and anti-fraud purposes)</li>
        </ul>
        <p class="font-semibold mt-3">Users can:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Join an existing cooperative</li>
          <li>Create a new cooperative business after registration</li>
        </ul>
        <p class="mt-3">Users are responsible for maintaining the confidentiality of their login credentials.</p>
      `
    },
    {
      id: "services",
      title: "3. Services Provided",
      content: `
        <p>The platform offers (but is not limited to):</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Digital savings and loan products</li>
          <li>Digital wallet functionality</li>
          <li>Payment processing</li>
          <li>Member and account management tools</li>
          <li>Batch and blotter balancing</li>
        </ul>
        <p class="mt-3">Services are available to both organizations and their individual members.</p>
      `
    },
    {
      id: "roles",
      title: "4. Roles & Permissions",
      content: `
        <p>The platform uses Role-Based Access Control (RBAC):</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Roles include: owner, staff, teller, collector, member, employee, and others</li>
          <li>Each role has specific permissions and access rights</li>
          <li>Actions and data access are restricted according to assigned roles.</li>
        </ul>
      `
    },
    {
      id: "fees",
      title: "5. Fees & Subscription",
      content: `
        <p>Use of the platform is subject to subscription fees:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Monthly or yearly billing cycles</li>
          <li>Pricing is based on the number of members and employees in the organization</li>
          <li>All fees are disclosed during subscription sign-up.</li>
        </ul>
        <p class="mt-3">Fees may be updated; changes will be communicated in advance.</p>
      `
    },
    {
      id: "responsibilities",
      title: "6. User Responsibilities",
      content: `
        <p class="font-semibold mt-3">Users and organizations must:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Protect their login credentials and never share passwords</li>
          <li>Safeguard the privacy and security of member data</li>
          <li>Use strong passwords and update them regularly</li>
          <li>Comply with all applicable laws, regulations, and platform policies</li>
        </ul>
        <p class="font-semibold mt-3">Prohibited activities include:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Sharing passwords or other sensitive information</li>
          <li>Unauthorized changes to account values or data</li>
          <li>Attempting to bypass, disable, or tamper with platform security features</li>
          <li>Engaging in fraud, scams, or any illegal activities</li>
        </ul>
        <p class="mt-3">All major changes (e.g., financial transactions, account modifications) require higher-level approval or authorized signatures.</p>
      `
    },
    {
      id: "data-ownership",
      title: "7. Data Ownership & Privacy",
      content: `
        <p class="font-semibold mt-3">Ownership:</p>
        <p>All data entered or uploaded belongs to the organization and respective users.</p>
        <p class="font-semibold mt-3">Security:</p>
        <p>Data is stored securely and encrypted using industry best practices (including Argon2 hashing, cryptography, SSH, and TLS).</p>
        <p class="font-semibold mt-3">Usage:</p>
        <p>Data is used solely for the purposes of accounting, banking, and service provision within the platform.</p>
        <p class="font-semibold mt-3">Data Sharing:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Data is never shared with third parties without explicit consent and a secure, multi-stage developer key approval process.</li>
          <li>All third-party API access is subject to strict review and owner permission.</li>
        </ul>
        <p class="mt-3">For more details, refer to our <a href="/policies/privacy" class="text-emerald-400 hover:underline">Privacy Policy</a>.</p>
      `
    },
    {
      id: "dispute",
      title: "8. Dispute Resolution",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All financial transactions require approval by authorized personnel and are subject to daily batch balancing.</li>
          <li>Disputes between users and their cooperative are handled by the cooperative's admin and staff.</li>
          <li>Arbitration or mediation is available for unresolved issues between employees and administrators.</li>
          <li>Platform management does not interfere in internal cooperative disputes unless required by law or platform security.</li>
        </ul>
      `
    },
    {
      id: "termination",
      title: "9. Termination & Suspension",
      content: `
        <p>User accounts or memberships may be suspended or terminated by the cooperative organization, subject to their internal policies.</p>
        <p class="mt-3">The platform reserves the right to suspend or terminate access in cases of:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Security breaches</li>
          <li>Fraudulent activity</li>
          <li>Violation of these Terms and Conditions</li>
        </ul>
        <p class="mt-3">We do not manage or remove members on behalf of cooperatives except as required by law.</p>
      `
    },
    {
      id: "modifications",
      title: "10. Modifications to Terms",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Lands Horizon Corp may update these Terms and Conditions at any time.</li>
          <li>Significant changes will be communicated to users via email or platform notifications.</li>
          <li>Continued use of the platform after changes constitutes acceptance of the revised terms.</li>
        </ul>
      `
    },
    {
      id: "governing-law",
      title: "11. Governing Law",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>These Terms and Conditions are governed by the laws of the Philippines.</li>
          <li>Any disputes will be subject to the exclusive jurisdiction of the Philippine courts.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "12. Contact Us",
      content: `
        <p>For questions, support, or legal inquiries, contact:</p>
        <p class="text-white/50 text-xs mt-3">Email: <span class="text-emerald-400">lands.horizon.corp@gmail.com</span></p>
        <p class="text-white/50 text-xs">Phone: <span class="text-emerald-400">+63 991 617 1081</span></p>
      `
    }
  ]
};