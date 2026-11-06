// Decoratieve vijver-achtergrond voor het startscherm.
export default function Pond() {
  return (<svg className="pond" viewBox="0 0 360 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd6d3" /><stop offset="1" stopColor="#2a9ea6" /></linearGradient></defs>
    <circle cx="298" cy="56" r="30" fill="#ffd27a" opacity=".9" /><circle cx="298" cy="56" r="42" fill="#ffd27a" opacity=".25" />
    <path d="M0 150Q45 138 90 150T180 150T270 150T360 150V260H0Z" fill="url(#wg)" />
    <path d="M0 175Q60 165 120 175T240 175T360 175" stroke="#fff" strokeOpacity=".35" strokeWidth="3" fill="none" />
    <ellipse cx="58" cy="214" rx="34" ry="9" fill="#4fae6a" /><ellipse cx="304" cy="232" rx="42" ry="10" fill="#4fae6a" /><circle cx="304" cy="225" r="6" fill="#ff9db0" />
    <g stroke="#5a9e6f" strokeWidth="4" strokeLinecap="round"><path d="M16 150v-46M26 150v-34M36 150v-52" /><path d="M334 150v-40M344 150v-52" /></g>
  </svg>);
}
