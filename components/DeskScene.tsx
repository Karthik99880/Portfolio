import styles from "./DeskScene.module.css";

export default function DeskScene({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      role="img"
      aria-labelledby="desk-scene-title"
      aria-describedby="desk-scene-desc"
      className={className}
      style={{ width: "100%", height: "auto" }}
      fill="none"
      stroke="#181511"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title id="desk-scene-title">Karthik at his desk — headphones on, code on the monitor, a silver-arrow poster on the wall</title>
      <desc id="desk-scene-desc">Rear three-quarter illustration of Karthik typing at a desk with a dual-monitor setup, a mug of coffee, a desk lamp and a small globe.</desc>
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e8c07a" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#e8c07a" stopOpacity="0.2" />
          <stop offset="1" stopColor="#e8c07a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g id="bg">
        <rect x="0" y="392" width="640" height="88" fill="#edeae4" stroke="none" />
        <line x1="0" y1="392" x2="640" y2="392" strokeWidth={1.5} />
        <rect x="36" y="48" width="110" height="172" rx="2" fill="#dcff70" />
        <line x1="91" y1="48" x2="91" y2="220" />
        <line x1="36" y1="134" x2="146" y2="134" />
        <rect x="30" y="220" width="122" height="7" rx="1" fill="#edeae4" strokeWidth={1.5} />
        <ellipse cx="78" cy="190" rx="4" ry="9" transform="rotate(-32 78 190)" fill="#edeae4" strokeWidth={1.5} />
        <ellipse cx="95" cy="190" rx="4" ry="9" transform="rotate(32 95 190)" fill="#edeae4" strokeWidth={1.5} />
        <ellipse cx="86" cy="186" rx="4" ry="11" fill="#edeae4" strokeWidth={1.5} />
        <polygon points="75,203 97,203 94,220 78,220" fill="#716c60" strokeWidth={1.5} />
        <g transform="translate(200 44)">
          <rect x="0" y="0" width="134" height="82" fill="#edeae4" strokeWidth={1.5} />
          <g fill="#c7c2b7" stroke="none">
            <path d="M12 10 L40 6 L52 14 L42 24 L38 38 L26 44 L16 30 L8 20 Z" />
            <path d="M32 46 L44 44 L48 56 L40 74 L34 70 L28 56 Z" />
            <path d="M60 10 L80 8 L84 18 L70 24 L60 22 Z" />
            <path d="M60 28 L80 26 L86 42 L78 62 L68 62 L58 42 Z" />
            <path d="M84 6 L122 4 L128 18 L118 32 L106 42 L94 34 L84 22 Z" />
            <path d="M106 54 L122 52 L126 64 L112 68 L104 62 Z" />
          </g>
          <g fill="#181511" stroke="none">
            <circle cx="4" cy="4" r="1.6" />
            <circle cx="130" cy="4" r="1.6" />
            <circle cx="4" cy="78" r="1.6" />
            <circle cx="130" cy="78" r="1.6" />
          </g>
          <g fill="#2f9e55" stroke="none">
            <circle cx="66" cy="12" r="2.4" />
            <circle cx="100" cy="36" r="2.4" />
            <circle cx="124" cy="18" r="2.4" />
          </g>
        </g>
        <g id="poster">
          <rect x="466" y="36" width="100" height="72" fill="#edeae4" />
          <rect x="472" y="42" width="88" height="60" stroke="#c7c2b7" strokeWidth={1} />
          <rect x="474" y="84" width="14" height="3" fill="#181511" stroke="none" />
          <path
            d="M486 86 L486 82 L502 80 L512 74 L528 72 L534 66 L544 66 L546 74 L552 76 L552 86 Z"
            fill="#716c60"
            strokeWidth={1.5}
          />
          <path d="M524 73 q8 -7 16 -1" strokeWidth={1.5} />
          <rect x="550" y="63" width="6" height="12" fill="#181511" stroke="none" />
          <circle cx="496" cy="86" r="6" fill="#181511" stroke="none" />
          <circle cx="546" cy="86" r="6" fill="#181511" stroke="none" />
          <text
            x="516"
            y="98"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="4.5"
            letterSpacing="0.9"
            textAnchor="middle"
            fill="#716c60"
            stroke="none"
          >
            SILVER ARROWS
          </text>
        </g>
      </g>

      <g id="furniture">
        <ellipse cx="390" cy="398" rx="210" ry="5" fill="#c7c2b7" stroke="none" />
        <rect x="176" y="312" width="8" height="80" fill="#edeae4" />
        <rect x="596" y="312" width="8" height="80" fill="#edeae4" />
        <polygon points="170,302 610,302 610,312 170,312" fill="#c7c2b7" />
        <polygon points="180,262 600,262 610,302 170,302" fill="#edeae4" />
      </g>

      <g id="fx">
        <polygon
          id="lamp-glow"
          className={styles.lampGlow}
          points="548,208 566,204 606,292 500,300"
          fill="#e8c07a"
          fillOpacity="0.28"
          stroke="none"
        />
        <circle cx="556" cy="209" r="38" fill="url(#lampGlow)" stroke="none" />
        <g id="steam" className={styles.steam} stroke="#716c60" strokeWidth={1.5}>
          <path d="M191 273 C188 269 194 266 191 261" />
          <path d="M198 274 C201 270 195 267 198 262" />
        </g>
        <g id="notes" className={styles.notes} strokeWidth={1.5}>
          <g>
            <circle cx="222" cy="184" r="2.3" fill="#181511" stroke="none" />
            <line x1="224" y1="184" x2="224" y2="175" />
            <path d="M224 175 q4 1 4 5" />
          </g>
          <g>
            <circle cx="214" cy="170" r="2.3" fill="#181511" stroke="none" />
            <line x1="216" y1="170" x2="216" y2="161" />
            <path d="M216 161 q4 1 4 5" />
          </g>
          <g>
            <circle cx="229" cy="161" r="2.3" fill="#181511" stroke="none" />
            <line x1="231" y1="161" x2="231" y2="152" />
            <path d="M231 152 q4 1 4 5" />
          </g>
        </g>
      </g>

      <g id="screens">
        <rect x="292" y="144" width="162" height="114" rx="5" fill="#181511" />
        <rect x="298" y="150" width="150" height="102" fill="#edeae4" stroke="none" />
        <rect x="298" y="150" width="150" height="12" fill="#c7c2b7" stroke="none" />
        <g fill="#181511" stroke="none">
          <circle cx="305" cy="156" r="1.8" />
          <circle cx="311" cy="156" r="1.8" />
          <circle cx="317" cy="156" r="1.8" />
        </g>
        <line x1="310" y1="168" x2="310" y2="246" stroke="#c7c2b7" strokeWidth={1.5} />
        <g id="screen-code" className={styles.code} stroke="none">
          <rect x="316" y="170" width="36" height="4" rx="2" fill="#181511" />
          <rect x="356" y="170" width="20" height="4" rx="2" fill="#2f9e55" />
          <rect x="324" y="180" width="58" height="4" rx="2" fill="#181511" />
          <rect x="324" y="190" width="26" height="4" rx="2" fill="#2f9e55" />
          <rect x="354" y="190" width="46" height="4" rx="2" fill="#716c60" />
          <rect x="332" y="200" width="50" height="4" rx="2" fill="#181511" />
          <rect x="332" y="210" width="22" height="4" rx="2" fill="#181511" />
          <rect x="358" y="210" width="40" height="4" rx="2" fill="#2f9e55" />
          <rect x="324" y="220" width="44" height="4" rx="2" fill="#716c60" />
          <rect x="316" y="230" width="18" height="4" rx="2" fill="#181511" />
          <rect x="316" y="240" width="26" height="4" rx="2" fill="#2f9e55" />
          <rect id="cursor" className={styles.cursor} x="346" y="238" width="2" height="8" fill="#2f9e55" />
        </g>
        <rect x="367" y="258" width="12" height="14" fill="#181511" stroke="none" />
        <ellipse cx="373" cy="274" rx="30" ry="5" fill="#181511" stroke="none" />
        <g transform="rotate(-6 462 175)">
          <rect x="442" y="160" width="40" height="30" fill="#edeae4" strokeWidth={1.5} />
          <text
            x="462"
            y="178"
            fontFamily="'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif"
            fontSize="6.5"
            textAnchor="middle"
            fill="#181511"
            stroke="none"
          >
            こんにちは
          </text>
        </g>
        <g transform="translate(456 200) skewY(-4.7)">
          <rect x="0" y="0" width="72" height="70" rx="2" fill="#181511" />
          <rect x="5" y="5" width="62" height="60" fill="#edeae4" stroke="none" />
          <rect x="5" y="5" width="62" height="8" fill="#c7c2b7" stroke="none" />
          <g stroke="none">
            <rect x="11" y="20" width="26" height="3" rx="1.5" fill="#181511" />
            <rect x="11" y="27" width="40" height="3" rx="1.5" fill="#181511" />
            <rect x="11" y="34" width="18" height="3" rx="1.5" fill="#2f9e55" />
            <rect x="11" y="41" width="34" height="3" rx="1.5" fill="#181511" />
            <rect x="11" y="48" width="22" height="3" rx="1.5" fill="#716c60" />
          </g>
        </g>
        <polygon points="448,270 536,264 544,282 440,288" fill="#edeae4" />
        <polygon points="460,273 524,268 528,277 456,282" fill="#c7c2b7" stroke="none" />
      </g>

      <g id="props">
        <g id="globe">
          <ellipse cx="188" cy="264" rx="8" ry="2.5" fill="#181511" stroke="none" />
          <line x1="188" y1="258" x2="188" y2="262" />
          <path d="M174 245 A14 14 0 0 0 188 259" />
          <circle cx="188" cy="245" r="12" fill="#edeae4" />
          <g className={styles.globeSpin}>
            <path d="M180 241 q4 -6 10 -3 q2 5 -3 8 q-6 1 -7 -5 z" fill="#c7c2b7" stroke="none" />
            <path d="M190 249 q5 -2 7 3 q-2 4 -6 2 z" fill="#c7c2b7" stroke="none" />
            <path d="M177 249 Q188 253 199 249" stroke="#c7c2b7" strokeWidth={1.5} />
          </g>
        </g>
        <rect x="186" y="277" width="16" height="16" rx="2" fill="#edeae4" />
        <path d="M202 281 a4.5 4.5 0 0 1 0 9" />
        <polygon points="254,278 386,278 392,294 248,294" fill="#c7c2b7" strokeWidth={1.5} />
        <line x1="258" y1="283" x2="386" y2="283" strokeWidth={1.5} strokeDasharray="4 2.5" />
        <line x1="256" y1="288" x2="388" y2="288" strokeWidth={1.5} strokeDasharray="4 2.5" />
        <line x1="300" y1="292" x2="340" y2="292" strokeWidth={1.5} />
        <ellipse cx="412" cy="288" rx="7" ry="5" fill="#edeae4" strokeWidth={1.5} />
        <line x1="412" y1="283" x2="412" y2="288" strokeWidth={1.5} />
        <ellipse cx="592" cy="266" rx="9" ry="3" fill="#181511" stroke="none" />
        <path d="M592 265 L586 214 Q584 200 572 197 L562 195" strokeWidth={2.5} />
        <g transform="translate(560 194) rotate(30)">
          <polygon points="-11,0 11,0 17,16 -17,16" fill="#181511" />
          <ellipse cx="0" cy="16" rx="15" ry="3" fill="#e8c07a" stroke="none" />
        </g>
        <rect x="548" y="260" width="34" height="8" rx="1" fill="#edeae4" strokeWidth={1.5} />
        <rect x="551" y="252" width="30" height="8" rx="1" fill="#716c60" strokeWidth={1.5} />
        <rect x="549" y="244" width="32" height="8" rx="1" fill="#edeae4" strokeWidth={1.5} />
        <ellipse cx="86" cy="439" rx="19" ry="4" fill="#c7c2b7" stroke="none" />
        <circle cx="86" cy="420" r="18" fill="#edeae4" />
        <polygon points="86,412 91.7,416.1 89.5,422.9 82.5,422.9 80.3,416.1" fill="#181511" stroke="none" />
        <g strokeWidth={1.5}>
          <line x1="86" y1="412" x2="86" y2="402" />
          <line x1="91.7" y1="416.1" x2="103.1" y2="412.4" />
          <line x1="89.5" y1="422.9" x2="96.6" y2="434.6" />
          <line x1="82.5" y1="422.9" x2="75.4" y2="434.6" />
          <line x1="80.3" y1="416.1" x2="68.9" y2="412.4" />
        </g>
        <ellipse cx="128" cy="447" rx="13" ry="3" fill="#c7c2b7" stroke="none" />
        <g transform="translate(166 298) rotate(15)">
          <rect x="-3" y="0" width="6" height="54" rx="3" fill="#181511" stroke="none" />
          <path d="M-8 50 L8 50 L9 130 Q9 148 0 150 Q-9 148 -9 130 Z" fill="#edeae4" />
          <path d="M-8 50 L0 64 L8 50" strokeWidth={1.5} />
        </g>
      </g>

      <g id="person">
        <ellipse cx="256" cy="446" rx="66" ry="8" fill="#c7c2b7" stroke="none" />
        <rect x="248" y="212" width="16" height="40" rx="5" fill="#edeae4" />
        <path d="M206 274 C206 256 222 248 240 248 L272 248 C290 248 306 256 306 274 L306 312 L206 312 Z" fill="#4fd67a" />
        <path d="M244 250 Q256 258 268 250" strokeWidth={1.5} />
        <circle cx="256" cy="208" r="20" fill="#181511" />
        <ellipse cx="276" cy="210" rx="3.5" ry="10" fill="#2f9e55" strokeWidth={1.5} />
        <path d="M240 201 C239 180 273 178 274 199" stroke="#2f9e55" strokeWidth={4.5} />
        <ellipse cx="240" cy="212" rx="8" ry="11.5" fill="#2f9e55" strokeWidth={1.5} />
        <polyline points="216,262 210,298 274,287" strokeWidth={18} />
        <polyline points="216,262 210,298 274,287" stroke="#4fd67a" strokeWidth={14} />
        <ellipse id="hand-l" className={styles.handL} cx="274" cy="287" rx="7" ry="6" fill="#edeae4" strokeWidth={1.5} />
        <polyline points="298,262 322,298 350,286" strokeWidth={18} />
        <polyline points="298,262 322,298 350,286" stroke="#4fd67a" strokeWidth={14} />
        <ellipse id="hand-r" className={styles.handR} cx="350" cy="286" rx="8" ry="6" fill="#edeae4" strokeWidth={1.5} />
        <g id="chair">
          <rect x="212" y="360" width="88" height="16" rx="5" fill="#edeae4" />
          <rect x="203.5" y="320" width="3.5" height="42" fill="#181511" stroke="none" />
          <rect x="305" y="320" width="3.5" height="42" fill="#181511" stroke="none" />
          <rect x="196" y="316" width="18" height="6" rx="3" fill="#181511" stroke="none" />
          <rect x="298" y="316" width="18" height="6" rx="3" fill="#181511" stroke="none" />
          <rect x="222" y="304" width="68" height="72" rx="9" fill="#edeae4" />
          <path d="M228 340 Q256 336 284 340" strokeWidth={1.5} />
          <rect x="252" y="376" width="8" height="40" fill="#181511" stroke="none" />
          <g strokeWidth={4}>
            <line x1="256" y1="418" x2="208" y2="434" />
            <line x1="256" y1="418" x2="238" y2="446" />
            <line x1="256" y1="418" x2="274" y2="446" />
            <line x1="256" y1="418" x2="304" y2="434" />
          </g>
          <circle cx="256" cy="418" r="5" fill="#181511" stroke="none" />
          <g fill="#181511" stroke="none">
            <circle cx="206" cy="436" r="4" />
            <circle cx="237" cy="448" r="4" />
            <circle cx="275" cy="448" r="4" />
            <circle cx="306" cy="436" r="4" />
          </g>
        </g>
      </g>
    </svg>
  );
}
