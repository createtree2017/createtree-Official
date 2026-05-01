import babyFaceImage from "../../assets/solution/baby-face.png";
import classDateCardImage from "../../assets/solution/class-date-card.png";
import classDiaperCakeImage from "../../assets/solution/class-diaper-cake.png";
import classGalleryImage from "../../assets/solution/class-gallery.png";
import classWorkshopImage from "../../assets/solution/class-workshop.png";
import familyFigureImage from "../../assets/solution/family-figure.webp";
import familyGibriImage from "../../assets/solution/family-gibri.webp";
import maternityHifImage from "../../assets/solution/maternity-hif.webp";
import missionExtraGiftImage from "../../assets/solution/mission-extra-gift.jpg";
import missionGiftsImage from "../../assets/solution/mission-gifts.png";
import missionStepImage from "../../assets/solution/mission-step.png";
import { benefits, solutionPillars, whyNowCards } from "../../data/hospitalLanding";

const aiStudioImages = [
  { src: maternityHifImage, alt: "만삭 AI 이미지 예시" },
  { src: familyGibriImage, alt: "가족 AI 이미지 예시" },
  { src: familyFigureImage, alt: "피규어 스타일 AI 이미지 예시" },
  { src: babyFaceImage, alt: "아기 얼굴 AI 이미지 예시" }
];

const classProgramImages = [
  { src: classGalleryImage, alt: "문화센터 결과물 갤러리 예시" },
  { src: classDiaperCakeImage, alt: "기저귀케이크 완성 예시" },
  { src: classWorkshopImage, alt: "기저귀케이크 클래스 참여 예시" },
  { src: classDateCardImage, alt: "문화센터 기념 카드 예시" }
];

const missionRewardImages = [
  { src: missionStepImage, alt: "미션 단계 성공 화면 예시" },
  { src: missionGiftsImage, alt: "완료 선물 목록 예시" },
  { src: missionExtraGiftImage, alt: "미션 완료 추가 선물 예시" }
];

export function SolutionSection() {
  return (
    <>
      <section className="section why-section" id="why-now">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Why now</p>
            <h2>저출생 시대, 병원의 경쟁은 진료 이후의 경험에서 갈립니다.</h2>
            <p>
              산모 고객은 줄어들고, 시설과 진료 서비스의 차별화는 점점 어려워지고 있습니다. 이제는 임신 기간
              동안 어떤 경험을 제공했는가가 병원을 기억하게 만드는 기준이 됩니다.
            </p>
          </div>
          <div className="card-grid three">
            {whyNowCards.map((card) => (
              <article className="info-card" key={card.title}>
                <span>{card.metric}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section solution-section" id="solution">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Solution</p>
            <h2>창조트리문화센터는 병원이 제공하는 산모 전용 AI 문화혜택입니다.</h2>
            <p>
              온라인 AI 이미지 서비스와 오프라인 문화센터, 선물 미션을 하나로 연결해 산모가 임신부터 출산
              후까지 계속 이용할 수 있는 병원 전용 혜택 구조를 만듭니다.
            </p>
          </div>
          <div className="card-grid three">
            {solutionPillars.map((pillar, index) => (
              <article className="solution-card" key={pillar.title}>
                <div className={`solution-visual ${pillar.tone}`}>
                  {(index <= 1 || index === 2) && (
                    <div
                      className={`solution-image-stack ${index === 1 ? "class-image-stack" : ""} ${index === 2 ? "mission-image-stack" : ""}`}
                      aria-label={index === 2 ? "미션형 리워드 예시" : index === 1 ? "문화센터 클래스 예시" : "AI 이미지 생성 예시"}
                    >
                      {(index === 2 ? missionRewardImages : index === 1 ? classProgramImages : aiStudioImages).map((image) => (
                        <img src={image.src} alt={image.alt} key={image.src} />
                      ))}
                    </div>
                  )}
                  <span>{pillar.badge}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <strong>{pillar.note}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section benefits-section" id="benefits">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Hospital benefits</p>
            <h2>병원은 고객 경험을 만들고, 산모는 병원을 오래 기억합니다.</h2>
          </div>
          <div className="card-grid six">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
