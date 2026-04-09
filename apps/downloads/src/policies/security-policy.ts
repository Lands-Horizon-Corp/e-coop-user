import { Policy } from "../components/policies/types";

export const securityPolicy: Policy = {
  id: "security",
  title: "Security Policy",
  effectiveDate: "January 1, 2026",
  content: `This Security Policy describes the physical and digital measures implemented by Lands Horizon Corp ("we", "us", or "our") to protect the assets and information of all users, members, and cooperatives on the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). Our security practices are designed to provide robust protection for users on all subscription plans and to comply with applicable laws and best practices.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To ensure the confidentiality, integrity, and availability of assets, data, and systems on the e-coop-suite platform.</li>
          <li>Applies to all users, members, cooperative organizations, employees, partners, and third-party service providers.</li>
        </ul>
      `
    },
    {
      id: "physical-security",
      title: "2. Physical Security Measures",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All servers and core infrastructure are hosted via the Fly.io Cloud Platform.</li>
          <li>Physical security and environmental controls (such as access management, surveillance, and disaster prevention) are managed by Fly.io and its global data center partners.</li>
          <li>We rely on Fly.io's compliance with industry standards and certifications for physical data center security.</li>
          <li>Our team and users do not have direct physical access to the data centers where our services are hosted.</li>
        </ul>
      `
    },
    {
      id: "digital-security",
      title: "3. Digital Security Measures",
      content: `
        <p class="font-semibold mt-3">Encryption:</p>
        <p>All sensitive data is encrypted in transit (TLS/SSL) and at rest.</p>
        <p class="font-semibold mt-3">Authentication:</p>
        <p>Multi-factor authentication (MFA) is required for privileged accounts; strong password policies are enforced.</p>
        <p class="font-semibold mt-3">Access Controls:</p>
        <p>Role-based access controls (RBAC) restrict access to data and features based on user roles and subscription plans.</p>
        <p class="font-semibold mt-3">Password Security:</p>
        <p>Passwords are hashed using secure algorithms (e.g., Argon2) and never stored in plain text.</p>
        <p class="font-semibold mt-3">Regular Audits:</p>
        <p>Security audits, penetration tests, and vulnerability assessments are conducted regularly.</p>
        <p class="font-semibold mt-3">Network Security:</p>
        <p>Firewalls, intrusion detection/prevention systems (IDS/IPS), and anti-malware tools protect our infrastructure.</p>
        <p class="font-semibold mt-3">Session Management:</p>
        <p>Automatic timeouts and session controls prevent unauthorized access.</p>
        <p class="font-semibold mt-3">Security Monitoring:</p>
        <p>Continuous monitoring detects suspicious activity and potential threats.</p>
        <p class="font-semibold mt-3">API Security:</p>
        <p>All APIs are protected with rate limiting, authentication, and input validation.</p>
        <p class="font-semibold mt-3">Application Security:</p>
        <p>Protection against threats such as XSS, CSRF, and SQL injection is enforced.</p>
        <p class="font-semibold mt-3">Change Management:</p>
        <p>All system/code changes are reviewed, tested, and logged before deployment.</p>
      `
    },
    {
      id: "data-protection",
      title: "4. Data Protection and Privacy",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Data is collected, processed, and stored in compliance with the Data Privacy Act of 2012 and relevant local regulations.</li>
          <li>Access to personal and sensitive data is strictly limited, monitored, and logged.</li>
          <li>Data backups are performed regularly and stored securely for recoverability.</li>
        </ul>
      `
    },
    {
      id: "incident-response",
      title: "5. Incident Response",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>A formal incident response plan is in place for detecting, reporting, and addressing security incidents.</li>
          <li>Users and members are promptly notified of any breaches that may affect their assets or information, in accordance with legal requirements.</li>
          <li>Lessons learned from incidents are used to strengthen controls and prevent recurrence.</li>
        </ul>
      `
    },
    {
      id: "user-responsibilities",
      title: "6. Member and User Responsibilities",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Users are responsible for safeguarding their login credentials and promptly reporting suspicious activity.</li>
          <li>Members should use strong, unique passwords and enable MFA where available.</li>
          <li>Sharing of accounts or credentials is strictly prohibited.</li>
        </ul>
      `
    },
    {
      id: "subscription-plans",
      title: "7. Security for Subscription Plans",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All users benefit from core physical and digital security measures regardless of subscription level.</li>
          <li>Higher-tier plans may receive additional security features or priority support (see Subscription Plans for details).</li>
        </ul>
      `
    },
    {
      id: "third-party",
      title: "8. Third-Party and Vendor Security",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All vendors and partners undergo security assessments before integration.</li>
          <li>Data sharing with third parties is governed by strict contracts and access controls.</li>
        </ul>
      `
    },
    {
      id: "policy-review",
      title: "9. Policy Review and Updates",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>This policy is reviewed at least annually and updated to reflect new threats, technologies, or regulatory requirements.</li>
          <li>Users will be notified of significant changes via email or platform notification.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: `
        <p>For questions or concerns about this Security Policy, please contact:</p>
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