import { Policy } from "../components/policies/types";

export const riskManagementPolicy: Policy = {
  id: "risk-management",
  title: "Risk Management Policy",
  effectiveDate: "January 1, 2026",
  content: `This Risk Management Policy outlines the framework and procedures adopted by Lands Horizon Corp ("we", "us", or "our") to identify, assess, and manage risks associated with the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). Our objective is to ensure the safety, stability, and sustainability of the cooperative bank and its stakeholders.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To provide a structured approach to risk management for all activities, operations, and services on the e-coop-suite platform.</li>
          <li>Applies to all users, members, cooperative organizations, employees, and partners.</li>
        </ul>
      `
    },
    {
      id: "risk-objectives",
      title: "2. Risk Management Objectives",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Safeguard the assets, data, and interests of the cooperative bank and its members.</li>
          <li>Ensure compliance with legal and regulatory requirements.</li>
          <li>Promote a risk-aware culture across the organization.</li>
          <li>Enhance operational resilience and business continuity.</li>
          <li>Support informed decision-making processes.</li>
        </ul>
      `
    },
    {
      id: "types-of-risks",
      title: "3. Types of Risks Monitored",
      content: `
        <p>We identify and monitor, but are not limited to, the following categories of risk:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Operational Risk:</strong> Risks arising from internal processes, people, systems, or external events.</li>
          <li><strong>Financial Risk:</strong> Risks related to credit, liquidity, market fluctuations, and capital adequacy.</li>
          <li><strong>Compliance and Legal Risk:</strong> Risks of non-compliance with laws, regulations, and contractual obligations.</li>
          <li><strong>Information Security and Cyber Risk:</strong> Risks of data breaches, cyberattacks, and unauthorized access.</li>
          <li><strong>Strategic Risk:</strong> Risks associated with business decisions, market changes, and competition.</li>
          <li><strong>Reputational Risk:</strong> Risks that may damage the trust and credibility of the platform or its stakeholders.</li>
        </ul>
      `
    },
    {
      id: "risk-identification",
      title: "4. Risk Identification",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Risks are identified through regular risk assessments, audits, user feedback, monitoring of operations, and incident reporting.</li>
          <li>Employees and users are encouraged to report potential risks or vulnerabilities to management.</li>
        </ul>
      `
    },
    {
      id: "risk-assessment",
      title: "5. Risk Assessment and Evaluation",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Each identified risk is assessed for likelihood and potential impact.</li>
          <li>Risks are prioritized based on their severity, probability, and potential consequences.</li>
          <li>Risk registers and assessment tools are used to document and monitor risks.</li>
        </ul>
      `
    },
    {
      id: "risk-mitigation",
      title: "6. Risk Mitigation and Controls",
      content: `
        <p>Appropriate controls and procedures are implemented to reduce or manage identified risks, such as:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Internal controls and segregation of duties</li>
          <li>Automated monitoring and alerting systems</li>
          <li>Data encryption, access controls, and cybersecurity measures</li>
          <li>Regular staff training and awareness programs</li>
          <li>Insurance and financial safeguards</li>
          <li>Business continuity and disaster recovery planning</li>
        </ul>
      `
    },
    {
      id: "monitoring-review",
      title: "7. Monitoring and Review",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Risks and controls are regularly monitored, tested, and reviewed to ensure effectiveness and relevance.</li>
          <li>Risk management practices are updated in response to new threats, regulatory changes, and business needs.</li>
          <li>Regular internal audits and independent reviews are conducted.</li>
        </ul>
      `
    },
    {
      id: "roles-responsibilities",
      title: "8. Roles and Responsibilities",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Senior management is responsible for overseeing the risk management framework and ensuring resources are allocated to manage risks effectively.</li>
          <li>All employees, users, and partners are responsible for adhering to risk management policies and reporting potential risks.</li>
        </ul>
      `
    },
    {
      id: "policy-review",
      title: "9. Policy Review and Updates",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>This policy is reviewed at least annually and updated as needed to address emerging risks or changes in operations or regulations.</li>
          <li>Significant changes will be communicated to users and stakeholders via email or platform notification.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: `
        <p>For questions or concerns about this Risk Management Policy, please contact:</p>
        <p class="text-lg font-bold mt-3 text-white">Zalven Lemuel Dayao</p>
        <p class="text-xs text-white/50">Risk Management Officer / CEO, Lands Horizon Corp</p>
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