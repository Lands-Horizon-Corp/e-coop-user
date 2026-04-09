import { Policy } from "../components/policies/types";

export const amlCtfPolicy: Policy = {
  id: "aml-ctf",
  title: "AML and CTF Policy",
  effectiveDate: "January 1, 2026",
  content: `This policy describes the measures and procedures implemented by Lands Horizon Corp ("we", "us", "our") to detect, prevent, and report activities related to money laundering and terrorist financing. We are committed to complying with all applicable laws and regulations in the Philippines, including the Anti-Money Laundering Act (AMLA), its amendments, and relevant guidelines.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To protect the integrity of e-coop-suite (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>) and its users from involvement in money laundering or terrorist financing activities.</li>
          <li>Applies to all users, members, cooperatives, employees, and transactions conducted through our platform.</li>
        </ul>
      `
    },
    {
      id: "cdd-kyc",
      title: "2. Customer Due Diligence (CDD) and Know Your Customer (KYC)",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All users and organizations must provide valid identification and verification documents upon registration.</li>
          <li>Required information includes (but is not limited to): full name, contact information, address, government-issued ID, and location.</li>
          <li>Ongoing monitoring of user activity and periodic updates of KYC information are conducted.</li>
          <li>Enhanced due diligence is applied for high-risk users, transactions, or jurisdictions.</li>
        </ul>
      `
    },
    {
      id: "transaction-monitoring",
      title: "3. Transaction Monitoring",
      content: `
        <p>All transactions are subject to automated and manual monitoring for unusual or suspicious activity, such as:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Large, frequent, or irregular transactions inconsistent with user profile</li>
          <li>Transactions involving high-risk countries or entities</li>
          <li>Complex or unnecessarily layered transactions</li>
        </ul>
        <p class="mt-3">Alerts are generated for further review and investigation by compliance staff.</p>
      `
    },
    {
      id: "record-keeping",
      title: "4. Record Keeping",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Records of customer identification, transactions, and related documents are securely retained for at least five (5) years after account closure or as required by law.</li>
          <li>All records are encrypted and access is restricted to authorized personnel only.</li>
        </ul>
      `
    },
    {
      id: "reporting",
      title: "5. Reporting Suspicious Activities",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Any suspicious activity or transaction is promptly reported to the Anti-Money Laundering Council (AMLC) and other relevant authorities as required by law.</li>
          <li>Employees and users are encouraged to report suspicious behavior to the designated compliance officer.</li>
        </ul>
      `
    },
    {
      id: "staff-training",
      title: "6. Staff Training and Awareness",
      content: `
        <p>All relevant employees, administrators, and agents receive regular AML/CTF training, including:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Identifying suspicious activities</li>
          <li>Reporting obligations</li>
          <li>Legal and regulatory updates</li>
        </ul>
      `
    },
    {
      id: "compliance-cooperation",
      title: "7. Compliance and Cooperation",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>We fully cooperate with law enforcement agencies and regulatory bodies in the investigation and prosecution of money laundering and terrorism financing offenses.</li>
          <li>Regular internal audits and policy reviews are conducted to ensure ongoing compliance with AML/CTF regulations.</li>
        </ul>
      `
    },
    {
      id: "sanctions",
      title: "8. Sanctions and Enforcement",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Any user or organization found violating this policy may be subject to account suspension, termination, and reporting to authorities.</li>
          <li>Employees who fail to comply with this policy may face disciplinary action, including dismissal.</li>
        </ul>
      `
    },
    {
      id: "policy-review",
      title: "9. Policy Review and Updates",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>This policy is reviewed and updated regularly to reflect changes in legislation, technology, and business practices.</li>
          <li>Users will be notified of any significant changes via email or platform notice.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: `
        <p>For questions or to report suspicious activity, contact:</p>
        <p class="text-lg font-bold mt-3 text-white">Zalven Lemuel Dayao</p>
        <p class="text-xs text-white/50">Compliance Officer / CEO, Lands Horizon Corp</p>
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