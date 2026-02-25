export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface Policy {
  id: string;
  title: string;
  effectiveDate: string;
  content: string;  // intro paragraph
  sections: PolicySection[];
}