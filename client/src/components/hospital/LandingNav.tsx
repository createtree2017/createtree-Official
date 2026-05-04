import logoLight from "../../assets/createtree-logo-light.png";

const navItems = [
  { label: "문화혜택", href: "#solution" },
  { label: "운영흐름", href: "#journey" },
  { label: "패키지", href: "#packages" },
  { label: "문의하기", href: "#consult" }
];

export function LandingNav() {
  return (
    <header className="story-intro-nav">
      <a className="story-intro-logo" href="#main-content" aria-label="창조트리문화센터 첫 화면">
        <img src={logoLight} alt="" width={1024} height={1024} />
      </a>
      <nav className="story-intro-menu" aria-label="주요 섹션">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
