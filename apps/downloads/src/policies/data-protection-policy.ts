import { Policy } from "../components/policies/types";

export const dataProtectionPolicy: Policy = {
  id: "data-protection",
  title: "Data Protection Policy",
  effectiveDate: "January 1, 2026",
  content: `This Data Protection Policy describes how Lands Horizon Corp ("we", "us", or "our") protects personal and sensitive data on the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). We are committed to upholding the highest standards of data privacy and security in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) and other applicable laws and best practices in the Philippines.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To outline our commitment to the protection of all personal and sensitive information processed on our platform.</li>
          <li>This policy applies to all data subjects, including users, members, cooperative organizations, employees, and third-party partners.</li>
        </ul>
      `
    },
    {
      id: "data-we-protect",
      title: "2. Data We Protect",
      content: `
        <p>We protect all types of data we collect and process, including:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Personal information (name, contact details, address, government ID)</li>
          <li>Sensitive personal information (financial data, transaction history, location, organization data)</li>
          <li>Any other information that can identify, or be used to identify, an individual</li>
        </ul>
      `
    },
    {
      id: "principles",
      title: "3. Principles of Data Protection",
      content: `
        <p>We are guided by the following principles:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Transparency:</strong> Users are informed about the collection and use of their data.</li>
          <li><strong>Legitimacy and Lawfulness:</strong> Data is collected and processed lawfully and fairly.</li>
          <li><strong>Purpose Limitation:</strong> Data is collected for specified, legitimate purposes only.</li>
          <li><strong>Data Minimization:</strong> Only data necessary for our operations and compliance is collected.</li>
          <li><strong>Accuracy:</strong> We ensure data is accurate, complete, and up to date.</li>
          <li><strong>Storage Limitation:</strong> Data is retained only as long as necessary for business, legal, or regulatory purposes.</li>
          <li><strong>Integrity and Confidentiality:</strong> Data is protected from unauthorized or unlawful processing, access, or disclosure.</li>
          <li><strong>Accountability:</strong> We take responsibility for complying with data protection laws and best practices.</li>
        </ul>
      `
    },
    {
      id: "security-measures",
      title: "4. Security Measures",
      content: `
        <p>To ensure the safety and integrity of data, we implement:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Encryption of data at rest and in transit</li>
          <li>Access controls based on user roles (RBAC)</li>
          <li>Secure authentication and password hashing (e.g., Argon2)</li>
          <li>Regular security audits, risk assessments, and vulnerability scans</li>
          <li>Protection against XSS, CSRF, SQL injection, brute force, and other cyber threats</li>
          <li>Secure storage infrastructure and data backup</li>
          <li>Monitoring and logging of access and activity</li>
          <li>Immediate incident response procedures</li>
        </ul>
      `
    },
    {
      id: "data-subject-rights",
      title: "5. Data Subject Rights",
      content: `
        <p>All users and data subjects have the right to:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Access their personal data</li>
          <li>Request correction or deletion of incorrect or outdated data</li>
          <li>Object to or restrict processing (where applicable)</li>
          <li>Withdraw consent at any time (where applicable)</li>
          <li>Data portability (receive their data in a structured format)</li>
          <li>File a complaint regarding data handling</li>
        </ul>
      `
    },
    {
      id: "data-sharing",
      title: "6. Data Sharing and Disclosure",
      content: `
        <p>Personal and sensitive data is not shared with third parties except:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>With explicit user consent</li>
          <li>As required by law or regulation</li>
          <li>With trusted partners and service providers under strict data protection agreements</li>
        </ul>
        <p class="mt-3">All third-party access is controlled, audited, and subject to RBAC permissions and executive approval.</p>
      `
    },
    {
      id: "data-breach",
      title: "7. Data Breach Notification",
      content: `
        <p>In the event of a data breach, affected users and relevant authorities will be notified promptly, in accordance with legal and regulatory requirements. We will take immediate steps to contain, investigate, and mitigate breaches.</p>
      `
    },
    {
      id: "staff-responsibilities",
      title: "8. Staff Responsibilities and Training",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All employees, contractors, and partners are required to adhere to this policy.</li>
          <li>Regular training is provided to ensure awareness of data protection responsibilities and best practices.</li>
        </ul>
      `
    },
    {
      id: "policy-review",
      title: "9. Policy Review and Updates",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>This policy is reviewed regularly and updated to comply with changes in laws, regulations, or business practices.</li>
          <li>Users will be notified of significant changes via email or platform notice.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: `
        <p>For questions, concerns, or to exercise your data protection rights, please contact:</p>
        <p class="text-lg font-bold mt-3 text-white">Zalven Lemuel Dayao</p>
        <p class="text-xs text-white/50">Data Protection Officer / CEO, Lands Horizon Corp</p>
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