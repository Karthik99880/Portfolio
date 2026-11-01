import styles from "./DeskScene.module.css";

export interface DeskPose {
  facing: "back" | "front";
  squash?: boolean;
  waving?: boolean;
  smiling?: boolean;
}

export default function DeskScene({
  className,
  pose = { facing: "back" },
}: {
  className?: string;
  pose?: DeskPose;
}) {
  const { facing, squash, waving, smiling } = pose;
  const turn = { transform: `scaleX(${squash ? 0.02 : 1})` };
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
      <title id="desk-scene-title">
        Karthik at his desk at dusk: headphones on, code on the monitor,
        Hyderabad through the window
      </title>
      <desc id="desk-scene-desc">
        Illustration of Karthik at a dual-monitor desk with a lamp, a globe, a
        mug of coffee and a plant on the windowsill.
      </desc>

      <defs>
        <clipPath id="desk-room">
          <rect x="16" y="20" width="608" height="440" rx="22" />
        </clipPath>
        <clipPath id="desk-win">
          <rect x="44" y="56" width="140" height="162" rx="4" />
        </clipPath>
      </defs>

      <g clipPath="url(#desk-room)">
        <rect
          x="16"
          y="20"
          width="608"
          height="440"
          fill="#fbfdf5"
          stroke="none"
        />
        <rect
          x="16"
          y="20"
          width="608"
          height="8"
          fill="#eef4dc"
          stroke="none"
        />
        <line
          x1="16"
          y1="232"
          x2="624"
          y2="232"
          stroke="#e3e8d2"
          strokeWidth="1.5"
        />
        <rect
          x="16"
          y="372"
          width="608"
          height="90"
          fill="#eef4dc"
          stroke="none"
        />
        <line x1="16" y1="372" x2="624" y2="372" strokeWidth="1.5" />
        <g stroke="#dfe5cb" strokeWidth="1.2">
          <line x1="80" y1="372" x2="40" y2="460" />
          <line x1="200" y1="372" x2="180" y2="460" />
          <line x1="330" y1="372" x2="330" y2="460" />
          <line x1="460" y1="372" x2="480" y2="460" />
          <line x1="580" y1="372" x2="620" y2="460" />
        </g>

        <g clipPath="url(#desk-win)">
          <rect
            x="44"
            y="56"
            width="140"
            height="162"
            fill="#e9f7b8"
            stroke="none"
          />
          <rect
            x="44"
            y="56"
            width="140"
            height="70"
            fill="#dcff70"
            stroke="none"
          />
          <circle
            cx="150"
            cy="138"
            r="18"
            fill="#fbfdf5"
            stroke="none"
            opacity=".9"
          />
          <g fill="#cfd8b4" stroke="none">
            <rect x="44" y="168" width="18" height="50" />
            <rect x="64" y="156" width="14" height="62" />
            <rect x="160" y="160" width="24" height="58" />
            <rect x="140" y="176" width="18" height="42" />
          </g>
          <g fill="#9aa585" stroke="none">
            <rect x="96" y="160" width="34" height="58" />
            <rect x="92" y="150" width="6" height="68" />
            <rect x="128" y="150" width="6" height="68" />
            <path d="M92 150 q3 -10 6 0 z" />
            <path d="M128 150 q3 -10 6 0 z" />
            <path d="M104 160 q9 -14 18 0 z" />
            <rect
              x="104"
              y="186"
              width="18"
              height="32"
              rx="9"
              fill="#e9f7b8"
            />
          </g>
          <g fill="#fbfdf5" stroke="none">
            <circle className={styles.twinkle} cx="70" cy="80" r="1.4" />
            <circle
              className={styles.twinkle}
              cx="112"
              cy="70"
              r="1.2"
              style={{ animationDelay: ".8s" }}
            />
            <circle
              className={styles.twinkle}
              cx="168"
              cy="92"
              r="1.3"
              style={{ animationDelay: "1.6s" }}
            />
          </g>
        </g>
        <rect x="38" y="50" width="152" height="174" rx="6" />
        <rect x="44" y="56" width="140" height="162" rx="4" />
        <line x1="114" y1="56" x2="114" y2="218" />
        <rect x="32" y="222" width="164" height="8" rx="2" fill="#fbfdf5" />
        <path d="M150 222 L153 204 L169 204 L172 222 Z" fill="#1f7a3d" />
        <path
          d="M161 204 C 152 192, 150 182, 154 172 C 162 180, 164 192, 161 204 Z"
          fill="#4fd67a"
        />
        <path
          d="M161 204 C 170 194, 178 188, 182 178 C 172 178, 164 190, 161 204 Z"
          fill="#4fd67a"
        />
        <path
          d="M161 204 C 158 196, 146 194, 140 188 C 146 186, 156 192, 161 204 Z"
          fill="#4fd67a"
        />

        <rect x="220" y="60" width="128" height="80" rx="3" fill="#fbfdf5" />
        <g fill="#dfe5cb" stroke="none">
          <path d="M232 72 L256 68 L266 76 L258 86 L254 98 L244 102 L236 90 L228 82 Z" />
          <path d="M250 106 L260 104 L264 114 L258 130 L252 126 L246 114 Z" />
          <path d="M276 72 L294 70 L298 80 L286 86 L276 84 Z" />
          <path d="M276 90 L294 88 L300 102 L292 120 L282 120 L274 102 Z" />
          <path d="M300 68 L334 66 L340 80 L330 94 L318 102 L308 94 L300 82 Z" />
        </g>
        <path
          d="M262 92 Q 290 70 322 82"
          stroke="#1f7a3d"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <g fill="#1f7a3d" stroke="none">
          <circle cx="262" cy="92" r="2.6" />
          <circle cx="322" cy="82" r="2.6" />
        </g>
        <g fill="#181511" stroke="none">
          <circle cx="224" cy="64" r="1.6" />
          <circle cx="344" cy="64" r="1.6" />
        </g>

        <rect x="470" y="50" width="108" height="78" rx="2" fill="#fbfdf5" />
        <rect
          x="476"
          y="56"
          width="96"
          height="66"
          fill="#181511"
          stroke="none"
        />
        <path
          d="M486 102 L486 96 L506 94 L518 86 L536 84 L544 76 L556 76 L558 86 L564 88 L564 102 Z"
          fill="#c7cdb5"
          stroke="none"
        />
        <circle cx="498" cy="104" r="6" fill="#4fd67a" stroke="none" />
        <circle cx="554" cy="104" r="6" fill="#4fd67a" stroke="none" />
        <text
          x="524"
          y="117"
          style={{ fontFamily: "var(--font-mono)" }}
          fontSize="5"
          letterSpacing="1"
          textAnchor="middle"
          fill="#dcff70"
          stroke="none"
        >
          SILVER ARROWS
        </text>

        <polygon
          points="548,206 568,202 612,300 498,306"
          fill="#dcff70"
          opacity=".35"
          stroke="none"
          className={styles.glow}
        />
        <ellipse
          cx="388"
          cy="252"
          rx="150"
          ry="22"
          fill="#4fd67a"
          opacity=".22"
          stroke="none"
          className={styles.glow}
        />

        <polygon points="166,262 608,262 618,300 156,300" fill="#e9dcc4" />
        <g stroke="#d6c6a8" strokeWidth="1.2">
          <path d="M200 270 q80 -3 160 2" />
          <path d="M380 284 q90 -4 200 1" />
          <path d="M180 290 q60 -2 120 1" />
        </g>
        <polygon points="156,300 618,300 618,310 156,310" fill="#c9b796" />
        <rect x="172" y="310" width="9" height="62" fill="#c9b796" />
        <rect x="596" y="310" width="9" height="62" fill="#c9b796" />
        <ellipse
          cx="388"
          cy="378"
          rx="230"
          ry="6"
          fill="#181511"
          opacity=".08"
          stroke="none"
        />

        <path
          d="M388 262 C 390 300, 420 330, 470 372"
          stroke="#716c60"
          strokeWidth="1.5"
        />
        <rect x="296" y="138" width="184" height="124" rx="7" fill="#181511" />
        <rect
          x="303"
          y="145"
          width="170"
          height="104"
          rx="2"
          fill="#12100e"
          stroke="none"
        />
        <rect
          x="303"
          y="145"
          width="170"
          height="11"
          fill="#1d1a16"
          stroke="none"
        />
        <g fill="#716c60" stroke="none">
          <circle cx="310" cy="150.5" r="1.8" />
          <circle cx="316" cy="150.5" r="1.8" />
          <circle cx="322" cy="150.5" r="1.8" />
        </g>
        <g
          style={{ fontFamily: "var(--font-mono)" }}
          fontSize="6.4"
          stroke="none"
        >
          <text x="310" y="168" fill="#716c60">
            1
          </text>
          <text x="320" y="168" fill="#4fd67a">
            const
          </text>
          <text x="342" y="168" fill="#fbfdf5">
            karthik = {"{"}
          </text>
          <text x="310" y="179" fill="#716c60">
            2
          </text>
          <text x="328" y="179" fill="#fbfdf5">
            role:
          </text>
          <text x="352" y="179" fill="#dcff70">
            {'"full-stack + AI"'}
          </text>
          <text x="414" y="179" fill="#fbfdf5">
            ,
          </text>
          <text x="310" y="190" fill="#716c60">
            3
          </text>
          <text x="328" y="190" fill="#fbfdf5">
            tests:
          </text>
          <text x="356" y="190" fill="#dcff70">
            560
          </text>
          <text x="370" y="190" fill="#fbfdf5">
            ,
          </text>
          <text x="310" y="201" fill="#716c60">
            4
          </text>
          <text x="328" y="201" fill="#fbfdf5">
            based:
          </text>
          <text x="356" y="201" fill="#dcff70">
            {'"Hyderabad"'}
          </text>
          <text x="402" y="201" fill="#fbfdf5">
            ,
          </text>
          <text x="310" y="212" fill="#716c60">
            5
          </text>
          <text x="328" y="212" fill="#fbfdf5">
            open:
          </text>
          <text x="352" y="212" fill="#4fd67a">
            true
          </text>
          <text x="310" y="223" fill="#716c60">
            6
          </text>
          <text x="320" y="223" fill="#fbfdf5">
            {"}"};
          </text>
          <text x="310" y="238" fill="#716c60">
            7
          </text>
          <g className={styles.type}>
            <text x="320" y="238" fill="#a39c90">
              {"// ship it, then test it"}
            </text>
          </g>
        </g>
        <rect
          className={styles.cursor}
          x="420"
          y="232"
          width="2.5"
          height="8"
          fill="#dcff70"
          stroke="none"
        />
        <rect
          x="378"
          y="262"
          width="20"
          height="14"
          fill="#181511"
          stroke="none"
        />
        <ellipse
          cx="388"
          cy="278"
          rx="34"
          ry="5"
          fill="#181511"
          stroke="none"
        />
        <rect
          x="452"
          y="128"
          width="22"
          height="18"
          fill="#dcff70"
          transform="rotate(8 463 137)"
        />
        <text
          x="463"
          y="139"
          style={{ fontFamily: "var(--font-mono)" }}
          fontSize="4.6"
          textAnchor="middle"
          fill="#181511"
          stroke="none"
          transform="rotate(8 463 137)"
        >
          ship it
        </text>

        <g transform="translate(488 202) skewY(-4)">
          <rect x="0" y="0" width="76" height="66" rx="3" fill="#181511" />
          <rect
            x="5"
            y="5"
            width="66"
            height="56"
            fill="#fbfdf5"
            stroke="none"
          />
          <rect
            x="5"
            y="5"
            width="66"
            height="8"
            fill="#e3e8d2"
            stroke="none"
          />
          <g stroke="none">
            <rect
              x="11"
              y="20"
              width="22"
              height="22"
              rx="2"
              fill="#4fd67a"
              opacity=".5"
            />
            <rect x="38" y="20" width="27" height="4" rx="2" fill="#181511" />
            <rect x="38" y="28" width="20" height="4" rx="2" fill="#716c60" />
            <rect x="38" y="36" width="24" height="4" rx="2" fill="#1f7a3d" />
            <rect x="11" y="48" width="54" height="4" rx="2" fill="#e3e8d2" />
          </g>
        </g>
        <polygon points="478,272 566,266 574,284 470,290" fill="#fbfdf5" />

        <polygon points="254,278 386,278 392,294 248,294" fill="#e3e8d2" />
        <g stroke="#a39c90" strokeWidth="1.2">
          <line x1="258" y1="283" x2="386" y2="283" strokeDasharray="4 2.5" />
          <line x1="256" y1="288" x2="388" y2="288" strokeDasharray="4 2.5" />
        </g>
        <ellipse cx="414" cy="288" rx="7" ry="5" fill="#fbfdf5" />

        <ellipse cx="596" cy="266" rx="9" ry="3" fill="#181511" stroke="none" />
        <path
          d="M596 265 L590 214 Q588 200 576 197 L566 195"
          strokeWidth="2.6"
        />
        <g transform="translate(564 194) rotate(30)">
          <polygon points="-11,0 11,0 17,16 -17,16" fill="#1f7a3d" />
          <ellipse cx="0" cy="16" rx="15" ry="3" fill="#dcff70" stroke="none" />
        </g>
        <rect x="540" y="258" width="38" height="8" rx="1" fill="#4fd67a" />
        <rect x="543" y="250" width="32" height="8" rx="1" fill="#fbfdf5" />
        <rect x="541" y="242" width="34" height="8" rx="1" fill="#1f7a3d" />

        <circle cx="190" cy="244" r="13" fill="#fbfdf5" />
        <path
          d="M182 240 q4 -6 10 -3 q2 5 -3 8 q-6 1 -7 -5 z"
          fill="#4fd67a"
          stroke="none"
        />
        <path
          d="M191 248 q5 -2 7 3 q-2 4 -6 2 z"
          fill="#4fd67a"
          stroke="none"
        />
        <path d="M176 244 A14 14 0 0 0 190 258" stroke="#716c60" />
        <line x1="190" y1="257" x2="190" y2="262" />
        <ellipse
          cx="190"
          cy="264"
          rx="9"
          ry="2.6"
          fill="#181511"
          stroke="none"
        />
        <rect x="206" y="270" width="17" height="18" rx="3" fill="#1f7a3d" />
        <path d="M223 274 a4.5 4.5 0 0 1 0 9" />
        <path
          className={styles.steam}
          d="M211 265 C208 261 214 258 211 253"
          stroke="#a39c90"
          strokeWidth="1.5"
        />
        <path
          className={styles.steam}
          d="M218 266 C221 262 215 259 218 254"
          stroke="#a39c90"
          strokeWidth="1.5"
        />

        <circle cx="86" cy="420" r="18" fill="#fbfdf5" />
        <polygon
          points="86,412 91.7,416.1 89.5,422.9 82.5,422.9 80.3,416.1"
          fill="#181511"
          stroke="none"
        />
        <g strokeWidth="1.4">
          <line x1="86" y1="412" x2="86" y2="402" />
          <line x1="91.7" y1="416.1" x2="103.1" y2="412.4" />
          <line x1="89.5" y1="422.9" x2="96.6" y2="434.6" />
          <line x1="82.5" y1="422.9" x2="75.4" y2="434.6" />
          <line x1="80.3" y1="416.1" x2="68.9" y2="412.4" />
        </g>
        <ellipse
          cx="86"
          cy="440"
          rx="18"
          ry="3.5"
          fill="#181511"
          opacity=".1"
          stroke="none"
        />
        <g transform="translate(150 298) rotate(15)">
          <rect
            x="-3"
            y="0"
            width="6"
            height="54"
            rx="3"
            fill="#181511"
            stroke="none"
          />
          <path
            d="M-8 50 L8 50 L9 130 Q9 148 0 150 Q-9 148 -9 130 Z"
            fill="#e9dcc4"
          />
          <path d="M-8 50 L0 64 L8 50" strokeWidth="1.4" />
          <line
            x1="0"
            y1="70"
            x2="0"
            y2="140"
            stroke="#d6c6a8"
            strokeWidth="1.2"
          />
        </g>

        <ellipse
          cx="256"
          cy="448"
          rx="66"
          ry="7"
          fill="#181511"
          opacity=".1"
          stroke="none"
        />

        {facing === "front" ? (
          <g className={styles.turn} style={turn}>
            <rect
              x="222"
              y="250"
              width="68"
              height="76"
              rx="10"
              fill="#2a2621"
            />
            <rect
              x="212"
              y="346"
              width="88"
              height="16"
              rx="5"
              fill="#2a2621"
            />
            <path d="M230 344 L228 404" strokeWidth="19" />
            <path d="M282 344 L284 404" strokeWidth="19" />
            <path d="M230 344 L228 404" stroke="#3f4a5c" strokeWidth="15.5" />
            <path d="M282 344 L284 404" stroke="#3f4a5c" strokeWidth="15.5" />
            <ellipse cx="224" cy="410" rx="14" ry="6" fill="#fbfdf5" />
            <ellipse cx="288" cy="410" rx="14" ry="6" fill="#fbfdf5" />
            <rect
              x="248"
              y="214"
              width="16"
              height="38"
              rx="5"
              fill="#e8c9a8"
            />
            <path
              d="M206 276 C206 256 222 248 240 248 L272 248 C290 248 306 256 306 276 L308 350 L204 350 Z"
              fill="#4fd67a"
            />
            <path d="M240 250 Q256 268 272 250" strokeWidth="1.4" />
            <line x1="250" y1="262" x2="249" y2="280" strokeWidth="1.4" />
            <line x1="262" y1="262" x2="263" y2="280" strokeWidth="1.4" />
            <circle cx="249" cy="281" r="1.6" fill="#fbfdf5" strokeWidth="1" />
            <circle cx="263" cy="281" r="1.6" fill="#fbfdf5" strokeWidth="1" />
            <path
              d="M228 318 L284 318 L290 342 L222 342 Z"
              strokeWidth="1.4"
              fill="#3cb865"
            />
            <polyline points="209,266 200,304 236,332" strokeWidth="17" />
            <polyline
              points="209,266 200,304 236,332"
              stroke="#4fd67a"
              strokeWidth="13.5"
            />
            <ellipse cx="239" cy="333" rx="8" ry="6" fill="#e8c9a8" />
            <polyline points="303,266 340,252" strokeWidth="17" />
            <polyline
              points="303,266 340,252"
              stroke="#4fd67a"
              strokeWidth="13.5"
            />
            <circle cx="340" cy="252" r="7.6" fill="#4fd67a" stroke="none" />
            <g className={`${styles.fore} ${waving ? styles.waving : ""}`}>
              <polyline points="340,252 348,212" strokeWidth="17" />
              <polyline
                points="340,252 348,212"
                stroke="#4fd67a"
                strokeWidth="13.5"
              />
              <path
                d="M341 210 C 340 200, 343 192, 348 192 C 354 192, 357 199, 356 208 C 355 214, 345 215, 341 210 Z"
                fill="#e8c9a8"
              />
              <path d="M341 206 C 336 205, 334 200, 337 197" fill="#e8c9a8" />
              <path
                d="M346 193 L346 187 M350 192 L351 186 M354 194 L356 189"
                strokeWidth="1.4"
              />
            </g>
            <circle cx="256" cy="208" r="20" fill="#e8c9a8" />
            <path
              d="M236 205 C235 184 277 184 276 205 C270 196 262 193 252 196 C246 197 240 200 236 205 Z"
              fill="#181511"
            />
            <path
              d="M235 203 C235 178 277 178 277 203"
              stroke="#1f7a3d"
              strokeWidth="4.5"
            />
            <ellipse cx="236" cy="211" rx="5" ry="9.5" fill="#1f7a3d" />
            <ellipse cx="276" cy="211" rx="5" ry="9.5" fill="#1f7a3d" />
            <g fill="#181511" stroke="none">
              <ellipse
                className={styles.blink}
                cx="249"
                cy="209"
                rx="2"
                ry="2.6"
              />
              <ellipse
                className={styles.blink}
                cx="263"
                cy="209"
                rx="2"
                ry="2.6"
              />
            </g>
            <path d="M245 203 l6 -1.5 M261 201.5 l6 1.5" strokeWidth="1.4" />
            <path
              d={
                smiling
                  ? "M248 216 Q256 225 264 216"
                  : "M250 218 Q256 220 262 218"
              }
              strokeWidth="1.8"
            />
            {smiling ? (
              <g fill="#e89a86" stroke="none" opacity=".7">
                <ellipse cx="244" cy="216" rx="3" ry="1.6" />
                <ellipse cx="268" cy="216" rx="3" ry="1.6" />
              </g>
            ) : null}
          </g>
        ) : (
          <g className={styles.turn} style={turn}>
            <polyline points="214,264 202,300 250,286" strokeWidth="17" />
            <polyline
              points="214,264 202,300 250,286"
              stroke="#4fd67a"
              strokeWidth="13.5"
            />
            <polyline points="298,264 322,300 352,286" strokeWidth="17" />
            <polyline
              points="298,264 322,300 352,286"
              stroke="#4fd67a"
              strokeWidth="13.5"
            />
            <ellipse
              className={`${styles.bob} ${styles.bob2}`}
              cx="354"
              cy="286"
              rx="8"
              ry="6"
              fill="#e8c9a8"
            />
            <rect
              x="248"
              y="212"
              width="16"
              height="40"
              rx="5"
              fill="#e8c9a8"
            />
            <path
              d="M206 274 C206 256 222 248 240 248 L272 248 C290 248 306 256 306 274 L306 312 L206 312 Z"
              fill="#4fd67a"
            />
            <path
              d="M214 262 C224 270 240 266 248 252"
              stroke="#3cb865"
              strokeWidth="1.4"
            />
            <path d="M244 250 Q256 258 268 250" strokeWidth="1.4" />
            <circle cx="256" cy="208" r="20" fill="#181511" />
            <path d="M242 198 q6 -8 14 -6" stroke="#3a352d" strokeWidth="1.4" />
            <path
              d="M240 201 C239 180 273 178 274 199"
              stroke="#1f7a3d"
              strokeWidth="4.5"
            />
            <ellipse cx="240" cy="212" rx="8" ry="11.5" fill="#1f7a3d" />
            <ellipse cx="276" cy="210" rx="3.5" ry="10" fill="#1f7a3d" />
            <path
              d="M240 223 C 236 240, 250 250, 262 262"
              stroke="#716c60"
              strokeWidth="1.2"
            />
            <rect
              x="212"
              y="360"
              width="88"
              height="16"
              rx="5"
              fill="#2a2621"
            />
            <rect
              x="222"
              y="304"
              width="68"
              height="72"
              rx="10"
              fill="#2a2621"
            />
            <path
              d="M230 316 Q256 312 282 316"
              stroke="#3f3a32"
              strokeWidth="1.4"
            />
            <path
              d="M230 330 Q256 326 282 330"
              stroke="#3f3a32"
              strokeWidth="1.4"
            />
          </g>
        )}
        <rect
          x="252"
          y="376"
          width="8"
          height="40"
          fill="#181511"
          stroke="none"
        />
        <g strokeWidth="4">
          <line x1="256" y1="418" x2="208" y2="434" />
          <line x1="256" y1="418" x2="238" y2="446" />
          <line x1="256" y1="418" x2="274" y2="446" />
          <line x1="256" y1="418" x2="304" y2="434" />
        </g>
        <g fill="#181511" stroke="none">
          <circle cx="256" cy="418" r="5" />
          <circle cx="206" cy="436" r="4" />
          <circle cx="237" cy="448" r="4" />
          <circle cx="275" cy="448" r="4" />
          <circle cx="306" cy="436" r="4" />
        </g>
      </g>
      <rect x="16" y="20" width="608" height="440" rx="22" strokeWidth="2" />
    </svg>
  );
}
