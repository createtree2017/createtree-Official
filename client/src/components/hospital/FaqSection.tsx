import { ChevronDown } from "lucide-react";
import { faqItems } from "../../data/hospitalLanding";
import { LeadForm } from "./LeadForm";

export function FaqSection() {
  return (
    <section className="section faq-section" id="consult">
      <div className="section-inner faq-grid">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2>도입 전 궁금한 점을 먼저 정리했습니다.</h2>
          <div className="accordion">
            {faqItems.map((item, index) => (
              <details className="accordion-item" key={item.question} open={index === 0}>
                <summary>
                  <strong>{item.question}</strong>
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
