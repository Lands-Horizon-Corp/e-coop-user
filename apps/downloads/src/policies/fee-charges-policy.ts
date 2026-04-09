import { Policy } from "../components/policies/types";

export const feeChargesPolicy: Policy = {
  id: "fee-charges",
  title: "Fee and Charges Policy",
  effectiveDate: "January 1, 2026",
  content: `This Fee and Charges Policy outlines the principles of transparency and fairness that Lands Horizon Corp ("we", "us", or "our") applies to all fees, charges, and commissions associated with the use of the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). Our goal is to ensure that all users, members, and cooperatives are fully informed about the costs of our products and services, including all subscription plans.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To provide clear, accessible information on all applicable fees, charges, and commissions.</li>
          <li>Applies to all users, members, cooperative organizations, and partners utilizing e-coop-suite products and services.</li>
        </ul>
      `
    },
    {
      id: "types-of-fees",
      title: "2. Types of Fees and Charges",
      content: `
        <p>The following fees and charges may apply:</p>
        <p class="font-semibold mt-3">Subscription Fees:</p>
        <p>Regular charges for access to digital platform features, based on the selected subscription plan (e.g., Basic, Standard, Premium, Enterprise).</p>
        <p class="font-semibold mt-3">Transaction Fees:</p>
        <p>Fees applied to specific financial transactions, such as payments, transfers, withdrawals, or loan processing.</p>
        <p class="font-semibold mt-3">Service Charges:</p>
        <p>Charges for additional or optional services, such as premium support, customization, or special integrations.</p>
        <p class="font-semibold mt-3">Commission Fees:</p>
        <p>Commissions charged on certain products, partnerships, or third-party services.</p>
        <p class="font-semibold mt-3">Administrative Fees:</p>
        <p>Fees for administrative actions, such as account maintenance, document requests, or manual processing.</p>
        <p class="mt-3">For a detailed breakdown of current plans and specific charges, please refer to the Subscription Plans page or contact support.</p>
      `
    },
    {
      id: "pricing-transparency",
      title: "3. Pricing Transparency",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All fees, charges, and commissions are disclosed clearly before the user commits to any service or transaction.</li>
          <li>Users will receive advance notice of any changes to fees or the introduction of new charges.</li>
          <li>No hidden or undisclosed fees will be applied.</li>
        </ul>
      `
    },
    {
      id: "payment-billing",
      title: "4. Payment and Billing",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Fees and charges are billed according to the terms of the selected subscription plan or upon completion of a transaction or service.</li>
          <li>Accepted payment methods include bank transfer, credit/debit card, or any other options specified on the platform.</li>
          <li>Invoices, receipts, or statements will be provided for all payments.</li>
        </ul>
      `
    },
    {
      id: "fee-changes",
      title: "5. Fee Changes and Notifications",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>We reserve the right to update fees, charges, and commissions as necessary to reflect business, regulatory, or market changes.</li>
          <li>Users will be notified at least fifteen (15) days in advance of any fee increases or the introduction of new fees via email or platform notification.</li>
        </ul>
      `
    },
    {
      id: "refunds-disputes",
      title: "6. Refunds and Disputes",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>Refunds for fees and charges are subject to the terms of the relevant subscription plan or service agreement.</li>
          <li>Users who believe they have been incorrectly charged may submit a dispute or request clarification via the platform's feedback form, support email, or hotline.</li>
          <li>Disputes will be addressed promptly and fairly according to the <a href="/policies/complaints" class="text-emerald-400 hover:underline">Complaint Handling and Dispute Resolution Policy</a>.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "7. Contact Us",
      content: `
        <p>For questions or clarifications regarding this Fee and Charges Policy, or for a detailed fee breakdown, please contact:</p>
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