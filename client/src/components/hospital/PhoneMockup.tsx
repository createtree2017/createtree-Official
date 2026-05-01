import { Camera, Gift, Images, ListChecks } from "lucide-react";

type Props = {
  variant: "ai" | "class" | "mission";
};

const content = {
  ai: {
    title: "AI 이미지 스튜디오",
    subtitle: "만삭 · 가족 · 아기 스냅",
    icon: Images,
    rows: ["초음파 사진 업로드", "만삭사진 스타일 선택", "가족사진 보정 완료"]
  },
  class: {
    title: "문화센터 클래스",
    subtitle: "기저귀케이크 · 캔들 · 앨범",
    icon: Camera,
    rows: ["5월 태교 클래스", "예약 가능 8자리", "병원 전용 QR 접수"]
  },
  mission: {
    title: "선물 미션",
    subtitle: "참여 인증과 혜택 진행률",
    icon: Gift,
    rows: ["클래스 참여 완료", "작품 후기 등록", "출산 준비 혜택 대기"]
  }
};

export function PhoneMockup({ variant }: Props) {
  const item = content[variant];
  const Icon = item.icon;

  return (
    <div className={`phone-mockup phone-${variant}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-app-head">
          <Icon size={20} />
          <span>창조트리</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
        <div className="phone-art">
          <div />
          <div />
          <div />
        </div>
        <div className="phone-list">
          {item.rows.map((row) => (
            <span key={row}>
              <ListChecks size={14} /> {row}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

