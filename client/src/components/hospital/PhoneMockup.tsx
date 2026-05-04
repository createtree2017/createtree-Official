import aiMainImage from "../../assets/mockups/ai-main.png";
import cultureCenterImage from "../../assets/mockups/culture-center.png";
import galleryImage from "../../assets/mockups/gallery.png";

type Props = {
  variant: "ai" | "class" | "mission";
};

const mockupScreens = {
  ai: {
    src: aiMainImage,
    alt: "AI 생성 메인 화면"
  },
  class: {
    src: cultureCenterImage,
    alt: "문화센터 클래스 화면"
  },
  mission: {
    src: galleryImage,
    alt: "갤러리 화면"
  }
};

export function PhoneMockup({ variant }: Props) {
  const screen = mockupScreens[variant];

  return (
    <div className={`phone-mockup phone-${variant}`}>
      <div className="phone-speaker" />
      <div className="phone-screen phone-screen-image">
        <img src={screen.src} alt={screen.alt} width={500} height={918} decoding="async" />
      </div>
    </div>
  );
}
