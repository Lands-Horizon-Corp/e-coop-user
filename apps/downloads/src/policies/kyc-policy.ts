import { Policy } from "../components/policies/types";

export const kycPolicy: Policy = {
  id: "kyc",
  title: "Know Your Customer (KYC) Policy",
  effectiveDate: "January 1, 2026",
  content: `This Know Your Customer (KYC) Policy outlines the procedures of Lands Horizon Corp ("we", "us", "our") for verifying the identity of members and organizations on e-coop-suite (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). Our goal is to prevent fraud, support financial transparency, and ensure compliance with legal and regulatory requirements in the Philippines.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To verify the identity of all users and organizations using e-coop-suite.</li>
          <li>To prevent fraudulent activities, identity theft, and other financial crimes.</li>
          <li>To comply with the Anti-Money Laundering Act (AMLA) and other related regulations.</li>
        </ul>
      `
    },
    {
      id: "kyc-requirements",
      title: "2. KYC Requirements",
      content: `
        <p>We require the following information and documents from all users and organizations:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Full name (as shown on a valid government-issued ID)</li>
          <li>Email address and contact number</li>
          <li>Residential or business address</li>
          <li>Government-issued identification (e.g., passport, driver's license, national ID)</li>
          <li>Location information</li>
          <li>For organizations: official registration details and authorized representative information</li>
        </ul>
      `
    },
    {
      id: "kyc-process",
      title: "3. KYC Process",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All users must provide accurate and up-to-date information during the registration process.</li>
          <li>Users may be required to upload scanned copies or photos of identification documents.</li>
          <li>Our system verifies the submitted information for authenticity and completeness.</li>
          <li>Additional verification measures may be applied for high-risk users or transactions.</li>
          <li>Periodic re-verification may be conducted to ensure information remains current.</li>
        </ul>
      `
    },
    {
      id: "ongoing-monitoring",
      title: "4. Ongoing Monitoring",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>User activity and transactions are continuously monitored to detect suspicious or unusual behavior.</li>
          <li>Any inconsistencies or red flags may trigger a request for additional information or re-verification.</li>
          <li>Enhanced due diligence is performed for users or transactions deemed high risk.</li>
        </ul>
      `
    },
    {
      id: "data-protection",
      title: "5. Data Protection",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All personal and organizational data collected during the KYC process is encrypted and securely stored.</li>
          <li>Access to KYC data is restricted to authorized personnel only.</li>
          <li>We comply with the Philippine Data Privacy Act and implement strict security measures to protect your information.</li>
        </ul>
      `
    },
    {
      id: "failure-comply",
      title: "6. Failure to Comply",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Users or organizations that fail to provide required KYC information or whose information cannot be verified may have their accounts restricted, suspended, or terminated.</li>
          <li>We reserve the right to decline or terminate any account that poses a risk or fails to meet KYC standards.</li>
        </ul>
      `
    },
    {
      id: "record-keeping",
      title: "7. Record Keeping",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>KYC records are maintained for at least five (5) years after the closure of an account, or as required by law.</li>
          <li>All records are kept secure and confidential.</li>
        </ul>
      `
    },
    {
      id: "review-updates",
      title: "8. Review and Updates",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>This policy is reviewed regularly and updated to comply with evolving laws, regulations, and best practices.</li>
          <li>Significant changes will be communicated to users via email or platform notification.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "9. Contact Us",
      content: `
        <p>For questions or concerns about our KYC Policy, please contact:</p>
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