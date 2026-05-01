import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "../../data/hospitalLanding";
import { LeadForm } from "./LeadForm";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" id="consult">
      <div className="section-inner faq-grid">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2>도입 전 궁금한 점을 먼저 정리했습니다.</h2>
          <div className="accordion">
            {faqItems.map((item, index) => (
              <button
                className={`accordion-item ${openIndex === index ? "open" : ""}`}
                key={item.question}
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>
                  <strong>{item.question}</strong>
                  {openIndex === index && <em>{item.answer}</em>}
                </span>
                <ChevronDown size={20} />
              </button>
            ))}
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

