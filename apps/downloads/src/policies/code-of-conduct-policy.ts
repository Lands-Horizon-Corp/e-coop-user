import { Policy } from "../components/policies/types";

export const codeOfConductPolicy: Policy = {
  id: "code-of-conduct",
  title: "Code of Conduct/Ethics Policy",
  effectiveDate: "January 1, 2026",
  content: `This Code of Conduct/Ethics Policy sets forth the standards for ethical behavior, integrity, and professionalism expected of all members, staff, directors, and affiliated individuals of Lands Horizon Corp ("we", "us", "our") and users of the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). Our goal is to foster a culture of trust, respect, accountability, and excellence within the cooperative.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To promote ethical conduct and establish clear expectations for all members, employees, directors, and partners.</li>
          <li>Applies to all activities, communications, and transactions related to e-coop-suite.</li>
        </ul>
      `
    },
    {
      id: "core-values",
      title: "2. Core Values and Principles",
      content: `
        <p>All individuals are expected to uphold and promote the following:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Integrity:</strong> Act honestly and transparently in all dealings.</li>
          <li><strong>Respect:</strong> Treat others with dignity, fairness, and courtesy.</li>
          <li><strong>Accountability:</strong> Take responsibility for personal actions and decisions.</li>
          <li><strong>Confidentiality:</strong> Protect sensitive and personal information.</li>
          <li><strong>Compliance:</strong> Adhere strictly to all applicable laws, regulations, and organizational policies.</li>
          <li><strong>Professionalism:</strong> Maintain high standards of conduct in all interactions.</li>
          <li><strong>Impartiality:</strong> Avoid conflicts of interest and make decisions in the best interest of the cooperative and its members.</li>
        </ul>
      `
    },
    {
      id: "expected-standards",
      title: "3. Expected Standards of Behavior",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Conduct all business and personal interactions with honesty and integrity.</li>
          <li>Avoid fraudulent, deceptive, or unethical practices.</li>
          <li>Refrain from discrimination, harassment, bullying, or any form of abusive behavior.</li>
          <li>Safeguard the cooperative's assets, reputation, and resources.</li>
          <li>Use the cooperative's digital platforms responsibly and securely.</li>
          <li>Report any potential breaches of law, policy, or ethics promptly.</li>
          <li>Cooperate fully with investigations and respect the outcome of ethical reviews.</li>
          <li>Avoid conflicts of interest and disclose any situations that may influence objectivity.</li>
        </ul>
      `
    },
    {
      id: "confidentiality",
      title: "4. Confidentiality and Data Protection",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Do not disclose confidential or proprietary information to unauthorized individuals.</li>
          <li>Handle personal and sensitive data in accordance with the <a href="/policies/data-protection" class="text-emerald-400 hover:underline">Data Protection Policy</a> and relevant laws.</li>
          <li>Protect the privacy of all members, staff, and stakeholders.</li>
        </ul>
      `
    },
    {
      id: "use-of-resources",
      title: "5. Use of Cooperative Resources",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Use cooperative resources, property, and digital platforms only for authorized purposes.</li>
          <li>Prevent misuse, wastage, or unauthorized access to cooperative assets.</li>
        </ul>
      `
    },
    {
      id: "compliance-reporting",
      title: "6. Compliance and Reporting",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Adhere at all times to this Code of Conduct/Ethics Policy and all other relevant policies and procedures.</li>
          <li>Promptly report any violations, ethical concerns, or suspicious activities through the designated feedback form, email, or direct contact with management.</li>
          <li>No retaliation or adverse action will be taken against anyone who, in good faith, reports a suspected violation.</li>
        </ul>
      `
    },
    {
      id: "consequences",
      title: "7. Consequences of Violations",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Breaches of this policy may result in disciplinary action, including but not limited to warnings, suspension, termination of membership or employment, and possible legal action.</li>
          <li>All violations will be investigated fairly and confidentially.</li>
        </ul>
      `
    },
    {
      id: "policy-review",
      title: "8. Policy Review and Updates",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>This policy will be reviewed regularly and updated to reflect best practices and changes in laws or organizational needs.</li>
          <li>Significant changes will be communicated to all members and stakeholders.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "9. Contact Information",
      content: `
        <p>For questions or to report concerns regarding this policy, please contact:</p>
        <p class="text-lg font-bold mt-3 text-white">Zalven Lemuel Dayao</p>
        <p class="text-xs text-white/50">Chief Information Security Officer / CEO, Lands Horizon</p>
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