import { Policy } from "../components/policies/types";

export const complaintPolicy: Policy = {
  id: "complaints",
  title: "Complaint Handling and Dispute Resolution Policy",
  effectiveDate: "January 1, 2026",
  content: `This policy describes the procedures of Lands Horizon Corp ("we", "us", "our") for handling complaints and resolving disputes on the e-coop-suite platform (<a href="http://ecoop-suite.com/" class="text-emerald-400 hover:underline">http://ecoop-suite.com/</a>). We are committed to ensuring that all complaints and disputes are addressed fairly, promptly, and transparently.`,
  sections: [
    {
      id: "purpose-scope",
      title: "1. Purpose and Scope",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>To provide a clear and accessible process for members to lodge complaints and resolve disputes.</li>
          <li>Applies to all users, members, cooperatives, and organizations using e-coop-suite.</li>
        </ul>
      `
    },
    {
      id: "how-to-lodge",
      title: "2. How to Lodge a Complaint",
      content: `
        <p>Members can submit complaints through any of the following channels:</p>
        <p class="font-semibold mt-3">Online Feedback Form:</p>
        <p>Available on the homepage or footer of the e-coop-suite platform.</p>
        <p class="font-semibold mt-3">Email:</p>
        <p>Send your complaint to <span class="text-emerald-400">lands.horizon.corp@gmail.com</span> with a clear description of the issue and any supporting documentation.</p>
        <p class="font-semibold mt-3">Phone:</p>
        <p>Contact our support hotline at <span class="text-emerald-400">+63 991 617 1081</span>.</p>
        <p class="font-semibold mt-3">Address:</p>
        <p>Address your written complaint to:</p>
        <p class="mt-2 p-3 border border-white/10 rounded-lg text-white/70">BLK 5 LOT 49, MAKADIYOS STREET<br/>VILLA MUZON SUBD, MUZON EAST<br/>CITY OF SAN JOSE DEL MONTE<br/>BULACAN, REGION III (CENTRAL LUZON), 3023, PHILIPPINES</p>
      `
    },
    {
      id: "handling-process",
      title: "3. Complaint Handling Process",
      content: `
        <p class="font-semibold mt-3">Acknowledgment:</p>
        <p>All complaints will be acknowledged within three (3) business days of receipt.</p>
        <p class="font-semibold mt-3">Investigation:</p>
        <p>We will investigate the complaint thoroughly and may request additional information from the complainant if necessary.</p>
        <p class="font-semibold mt-3">Resolution:</p>
        <p>We aim to resolve all complaints within fifteen (15) business days. If more time is needed, we will keep the complainant informed of progress and expected resolution timelines.</p>
        <p class="font-semibold mt-3">Communication:</p>
        <p>The outcome of the investigation and the resolution will be communicated to the complainant via their preferred contact method (email, phone, or mail).</p>
      `
    },
    {
      id: "dispute-resolution",
      title: "4. Dispute Resolution",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>If a complaint is not resolved to the satisfaction of the member, the issue may be escalated to higher management or an independent mediator.</li>
          <li>Internal mediation between parties (such as between a member and their cooperative) is encouraged before involving external parties.</li>
          <li>For unresolved disputes involving financial or legal matters, parties may seek resolution through appropriate regulatory authorities or the courts in the Philippines.</li>
        </ul>
      `
    },
    {
      id: "record-keeping",
      title: "5. Record Keeping",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>All complaints and dispute cases are documented and retained for at least five (5) years, in accordance with legal and regulatory requirements.</li>
          <li>Records are kept confidential and are accessible only to authorized personnel.</li>
        </ul>
      `
    },
    {
      id: "continuous-improvement",
      title: "6. Continuous Improvement",
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li>We regularly review complaints and dispute data to identify trends and improve our products, services, and processes.</li>
          <li>Feedback from complaints is used constructively to enhance member experience and platform operations.</li>
        </ul>
      `
    },
    {
      id: "contact",
      title: "7. Contact Us",
      content: `
        <p>For questions about this policy or to lodge a complaint, please contact:</p>
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