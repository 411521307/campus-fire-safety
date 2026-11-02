/**
 * Campus & Dormitory Fire Safety System - Advanced Interactive Engine
 * 8-Section Presentation Slide Deck Edition
 * 1. 🏠 Home
 * 2. 🚨 Fire Survival Actions (Animated Canvas: Door Heat Check, Low Smoke Crawl, Stop-Drop-Roll, Shelter)
 * 3. 🧯 P.A.S.S. Particle Extinguisher Simulator (unobstructed stage)
 * 4. 🗺️ Dormitory Evacuation Map (hollow courtyard, X-numbering, parking/main exits)
 * 5. 🏢 Filterable Campus Safety Zones
 * 6. ✅ Interactive Circular Gauge Dorm Room Audit
 * 7. 🧠 Scenario Decision Drills with Dynamic Bilingual Re-rendering
 * 8. 📞 Taiwan Official Emergency Hotlines (119, 110, 112, 1999, 1925, 165, 113)
 */

let currentSlide = 0;
const totalSlides = 9;
let currentLang = 'zh'; // 'zh' (Traditional Chinese) or 'en' (English)

document.addEventListener('DOMContentLoaded', () => {
  initAmbientParticles();
  initLanguageEngine();
  initSlideDeck();
  initSurvivalSimulator();
  initPassMotionSimulator();
  initDormEvacuationCanvas();
  initZoneFilters();
  initAuditGauge();
  initDrills();
  initEmergencyAlarm();
  initEscapeSimulator();
});

/* ==========================================================================
   BILINGUAL TRANSLATION DATA
   ========================================================================== */
const i18nData = {
  zh: {
    langBtn: "English",
    brand: "校園與宿舍防災系統",
    alarmBtn: "警報演習",
    alarmBtnSilence: "靜音演習",
    voiceAnnouncement: "火警演習啟動，請所有人員立刻由安全梯進行疏散。切勿搭乘電梯。",
    pageIndicator: "第 {curr} 頁 / 共 {total} 頁",

    // Tabs
    tabs: ["🏠 首頁", "🚨 逃生要領", "🧯 滅火器", "🗺️ 疏散簡圖", "🏢 校園分區", "✅ 寢室查核", "🧠 應變測驗", "📞 緊急專線", "🏃 奇蹟脫困"],

    // Section 1: Home
    s1_badge: "⚡ 校園與學生宿舍安全防護網",
    s1_heading: "校園與學生宿舍火災防護暨避難系統",
    s1_subtitle: "專為住宿生、教職員與校園師生打造之火災預防、滅火器動態模擬、宿舍避難地圖與台灣官方緊急求助指南。",
    s1_cards: [
      { title: "火災應變要領", desc: "手背觸摸門把測溫、低姿勢爬行、關門防煙避難動作示範。" },
      { title: "滅火器動態模擬", desc: "四步驟滅火粒子物理即時動態操作演練。" },
      { title: "宿舍緊急疏散簡圖", desc: "中央中庭天井中空建築格局與即時疏散動線。" },
      { title: "校園分區安全守則", desc: "寢室生活、公共廚房、AI機房與走廊防護要點。" },
      { title: "寢室安全自主查核", desc: "即時圓形儀表板評估寢室用電與防火安全合格率。" },
      { title: "緊急情境應變演練", desc: "凌晨火警、油鍋起火與濃煙樓梯之直覺應變測驗。" },
      { title: "台灣官方緊急專線", desc: "119、110、112、1999、1925、165、113官方求助電話。" }
    ],

    // Section 2: Survival Protocols (NEW!)
    s2_survival_title: "🚨 火災生存應變守則：第一時間保命要領",
    s2_survival_desc: "互動動態圖解火場核心保命動作：門把手背測溫、低姿勢爬行、身上著火停躺滾與就地防煙待救。",
    s2_survival_nav: [
      "1. 🚪 觸摸門把門板 (Door Heat)",
      "2. 💨 濃煙低姿勢爬行 (Crawl Low)",
      "3. 🔥 著火停躺滾 (Stop-Drop-Roll)",
      "4. 🪟 就地阻煙待救 (Shelter & Signal)"
    ],
    s2_survival_info: {
      1: { badge: "動作一：手背觸摸門把門板 (CHECK DOOR HEAT)", text: "開門前務必先以手背觸摸金屬門把與門板上方。若發燙表示門外已是火海，萬不可開門！若微涼，先開一條門縫確認無煙再行逃生。" },
      2: { badge: "動作二：低姿勢爬行避濃煙 (CRAWL LOW UNDER SMOKE)", text: "高溫有毒濃煙向上浮升聚集於天花板。離地面30至60公分處有最高含氧量與清新空氣層，應雙手雙膝著地低頭沿牆爬行。" },
      3: { badge: "動作三：若身上著火切勿奔跑 (STOP, DROP & ROLL)", text: "身上衣物著火時奔跑會助長風勢火勢！應立刻『停』住腳步，雙手摀臉『躺』下，就地左右來回『滾』動以壓滅火焰。" },
      4: { badge: "動作四：走廊受阻就地防煙待救 (SHELTER & SIGNAL)", text: "若逃生動線受阻，立刻退回寢室內關門，用濕毛巾塞緊門縫阻止濃煙滲入，打開窗戶並揮動鮮豔衣物或手電筒等待救援。" }
    },
    s2_survival_tip: "💡 保命準則：濃煙殺傷力遠大於火焰。手背感到發燙絕對不開門，絕不搭乘電梯，不可貪戀財物！",
    s2_ruleCards: [
      { title: "🚪 手背觸摸門把門板", desc: "以手背感受金屬把手與門板上方溫度。若發燙表示門外已是火海，萬不可開門！若門涼，先開一條門縫確認無煙再逃生。" },
      { title: "💨 壓低身軀沿牆爬行", desc: "高溫有毒濃煙（一氧化碳）向上浮升至天花板。離地面30至60公分處溫度較低且濃煙最稀薄，雙膝跪地低頭爬行。" },
      { title: "🚪 隨手關門阻隔火勢", desc: "逃出寢室或通過常閉式防火門時，隨手將門關上！此舉能切斷氧氣供應，若為防火門更能爭取30分鐘至1小時的寶貴逃生時間。" },
      { title: "🪟 門縫塞毛巾於窗邊呼救", desc: "若逃生通道受阻，立刻退回房內關門，用濕毛巾或衣物塞緊門縫阻止濃煙滲入，打開窗戶並揮動鮮豔衣物或手電筒求救。" }
    ],

    // Section 3: P.A.S.S.
    s3_title: "🧯 滅火器 P.A.S.S. 動態實作模擬",
    s3_desc: "針對燃燒火源之滅火器四字訣（拉、瞄、壓、掃）即時動態操作演練。",
    s3_stepsNav: ["1. 🧷 拉插銷 (Pull)", "2. 🎯 瞄火源 (Aim)", "3. ✊ 壓把柄 (Squeeze)", "4. ↔️ 掃基底 (Sweep)"],
    s3_stepsInfo: {
      1: { badge: "步驟一：拉開安全插銷 (PULL PIN)", text: "拔掉金屬安全插銷與塑膠封條，解除壓把鎖定。" },
      2: { badge: "步驟二：瞄準火源根部 (AIM LOW)", text: "將噴嘴朝向燃燒物體的根底部位，切勿朝頂部火焰噴射。" },
      3: { badge: "步驟三：用力壓住把柄 (SQUEEZE LEVER)", text: "用力壓下壓把，噴出加壓乾粉滅火藥劑。" },
      4: { badge: "步驟四：向火源左右掃射 (SWEEP SIDE)", text: "將噴嘴朝火源根部左右持續均勻掃射，直至火勢完全撲滅。" }
    },
    s3_play: "▶ 播放示範",
    s3_pause: "⏸ 暫停示範",
    s3_tip: "⚠️ 安全準則：僅在火勢小於垃圾桶且背後有暢通逃生出口時嘗試滅火，否則立刻撤離！",

    // Section 4: Evacuation Map
    s4_title: "🗺️ 宿舍緊急疏散簡圖 (Dormitory Emergency Evacuation Map)",
    s4_desc: "中央中庭天井中空建築格局，房間編號（X01-X44）及逃生動線指引。",
    s4_legendStairs: "安全樓梯 (Exit Stairs)",
    s4_legendExits: "1F 出口指引 (1F Exits via Stairs)",
    s4_legendStudents: "疏散學生 (Evacuating Students)",
    s4_legendCourtyard: "中庭天井 (Void Courtyard)",
    s4_card1_title: "🚪 核心疏散出口配置 (Key Exits)",
    s4_card1_body: "<ul><li><strong>北側樓梯 (North Stairs):</strong> 位於 X04 寢室右側（電梯上方），通往 1F 車棚門。</li><li><strong>南側樓梯 (South Stairs):</strong> 位於 X22 寢室右側，通往 1F 前門大門與草坪。</li><li><strong>電梯配置 (Lift):</strong> 位於 X04 旁樓梯正下方，火警時嚴禁搭乘。</li><li><strong>高樓層連續配置:</strong> 本樓層右側各寢室（X08-X18）無間斷，出口位於一樓。</li></ul>",
    s4_card2_title: "🚫 絕對禁止使用電梯 (No Elevators)",
    s4_card2_body: "<p>電梯井在火災時會產生煙囪效應抽吸濃煙，切勿搭乘電梯，一律步行由兩側安全梯疏散！</p>",
    s4_card3_title: "🔑 隨身攜帶寢室鑰匙 (Take Room Key)",
    s4_card3_body: "<p>若走廊已被濃煙吞沒無法通行，立刻退回寢室內關門防煙，並於窗邊揮動衣物呼救等待救援。</p>",

    // Section 5: Campus Zones
    s5_title: "🏢 校園分區安全防護準則",
    s5_desc: "針對寢室生活、公共廚房、AI電腦機房與逃生走廊之防火與用電安全規範。",
    s5_tabs: ["全區規範", "寢室生活", "公共廚房", "AI與實驗室", "逃生走廊"],
    s5_zoneTags: ["寢室生活", "公共廚房", "AI與實驗室", "逃生走廊"],
    s5_zones: [
      {
        tag: "Dormitory Rooms",
        title: "🛌 寢室生活用電與明火管制",
        items: [
          "嚴禁於寢室內點燃蠟燭、薰香、精油燈或瓦斯爐。",
          "高耗電加熱電器（電磁爐、熱水壺、電暖器）禁止於寢室插座使用。",
          "吹風機、離子夾等美髮器具使用完畢後務必立即拔除插頭。",
          "嚴禁將行動電源、電動滑板車鋰電池置於床鋪上徹夜充電。"
        ]
      },
      {
        tag: "Kitchen & Lounges",
        title: "🍳 公共廚房與烹飪安全",
        items: [
          "人離火熄：烹煮食材、熱湯或微波食物時，切勿擅自離開現場。",
          "油鍋起火切勿澆水：迅速蓋上鍋蓋切斷空氣，並關閉瓦斯/爐具開關。",
          "定期清理微波爐內部油漬與烤麵包機底盤麵包屑，避免積熱自燃。",
          "洗衣間烘衣機每次使用前後，務必清除棉絮濾網上的易燃棉屑。"
        ]
      },
      {
        tag: "Tech & Science Labs",
        title: "🔬 AI電腦機房與實驗室規範",
        items: [
          "伺服器機櫃與高瓦數GPU工作站周圍保持通風良好，嚴禁堆置紙箱。",
          "嚴禁延長線「章魚腳」串接（延長線接延長線）導致電線走火。",
          "化學溶劑（異丙醇、去漬油）應存放於專用黃色防爆櫃內。",
          "精密電子設備區域應配置二氧化碳 (CO2) 或潔淨氣體滅火器。"
        ]
      },
      {
        tag: "Egress & Corridors",
        title: "🚪 走廊通道與常閉式防火門",
        items: [
          "走廊及避難逃生樓梯間嚴禁堆放鞋架、行李箱、垃圾桶或腳踏車。",
          "常閉式防火門嚴禁以木塞、滅火器蓄意卡門敞開，以免火勢濃煙竄升。",
          "走廊上方緊急出口指示燈與緊急照明燈應隨時保持通電待命狀態。",
          "熟悉主要逃生梯與次要備用逃生梯的精確步行路線。"
        ]
      }
    ],

    // Section 6: Audit
    s6_title: "✅ 寢室防火安全自主查核",
    s6_desc: "檢核個人與室友之居住環境是否符合校園防火防電安全規範。",
    s6_gaugeLabel: "安全合格率",
    s6_statusHigh: "HIGH RISK (高風險)",
    s6_statusMod: "MODERATE (部分待改善)",
    s6_statusSafe: "CAMPUS SAFE (符合校園規範)",
    s6_checks: [
      { title: "偵煙器與自動灑水頭周圍保持淨空", sub: "天花板灑水頭周圍約45公分（18英吋）內無任何懸掛衣物、布簾或障礙物遮蔽。" },
      { title: "無違規使用高功率家電或串接延長線", sub: "使用具備過載自動斷電保護之安規延長線，且直接插於牆面插座，無串接情形。" },
      { title: "寢室內零違禁明火與香氛物品", sub: "房內絕無蠟燭、線香、打火機充氣瓶、高熱鹵素燈或卡式爐。" },
      { title: "通往寢室大門之走道通暢無阻", sub: "房門能完全敞開90度以上，門後無堆放髒衣籃、鞋盒或阻礙逃生之雜物。" },
      { title: "室友均清楚北側/南側安全梯走向", sub: "全體室友均親自走過最近的安全梯（X04旁北梯、X22旁南梯）。" },
      { title: "牢記戶外指定集結避難場所", sub: "火警警報響起時，全員知曉應前往戶外指定草坪集結點進行點名。" }
    ],

    // Section 7: Drills
    s7_title: "🧠 緊急情境直覺應變測驗",
    s7_desc: "透過真實宿舍火災模擬情境，強化第一時間之正確逃生決策。",

    // Section 8: Hotlines
    s8_title: "📞 台灣緊急與服務專線 (Taiwan Emergency & Public Service Hotlines)",
    s8_desc: "台灣官方緊急救助與便民服務專線，點擊卡片即可快速撥號。",
    s8_cards: [
      { title: "Fire & Ambulance", subtitle: "消防報案、火災搶救、緊急救護車", desc: "24小時全年無休，發生火災、人員受傷或化學災害時第一時間直撥。" },
      { title: "Police Emergency", subtitle: "警察局報案專線 (犯罪、危急治安)", desc: "校園暴力、可疑人員入侵、縱火事件或重大治安威脅緊急求助直撥。" },
      { title: "Global Mobile Emergency", subtitle: "行動電話全球緊急救助專線", desc: "手機無SIM卡、或使用其他電信業者基地台時仍可撥通（須有行動基地台訊號涵蓋），由語音導引轉接119或110。" },
      { title: "Citizen Hotline", subtitle: "各縣市政府便民服務與重大災情通報 (非24小時全國緊急專線)", desc: "各直轄市與縣市政府通話專線，提供市政諮詢、公用設施損壞通報。" },
      { title: "Mental Health Hotline", subtitle: "衛福部安心專線 (依舊愛我)", desc: "24小時免付費心理諮詢與自傷危機干預輔導，給予即時心理支持。" },
      { title: "Anti-Fraud Hotline", subtitle: "內政部警政署反詐騙諮詢專線", desc: "遇疑似詐騙電話、假冒檢警、交友匯款或網購詐欺查證與通報。" },
      { title: "Protection Hotline", subtitle: "婦幼保護與家庭暴力防治專線", desc: "遭遇家庭暴力、性騷擾、性侵害、兒少保護等緊急求助與諮詢。" }
    ],
    s8_note: "在台灣遭遇緊急狀況之通報原則：火警直撥 119，若遇手機收訊不良請改撥 112。注意：112仍須在有行動電話基地台訊號涵蓋時方可接通。通話時請冷靜清楚說明：(1) 所在學校校名 (2) 宿舍樓棟名稱 (3) 樓層與寢室房號 (4) 現場所見火勢與煙霧狀況。"
  },

  en: {
    langBtn: "繁體中文",
    brand: "CAMPUS FIRE SAFE",
    alarmBtn: "Test Alarm",
    alarmBtnSilence: "Silence Alarm",
    voiceAnnouncement: "Fire emergency drill activated. Please evacuate the building immediately through the nearest stairwell. Do not use elevators.",
    pageIndicator: "Page {curr} / {total}",

    // Tabs
    tabs: ["🏠 Home", "🚨 Survival", "🧯 P.A.S.S.", "🗺️ Evacuation", "🏢 Campus", "✅ Audit", "🧠 Drills", "📞 Hotlines", "🏃 Escape"],

    // Section 1: Home
    s1_badge: "⚡ University Life-Safety Network",
    s1_heading: "Campus & Residence Hall Fire Defense System",
    s1_subtitle: "Interactive fire prevention, evacuation simulation, extinguisher training, and Taiwan emergency protocols designed for dorm residents, students, and faculty.",
    s1_cards: [
      { title: "Fire Survival Actions", desc: "Door heat tests, low smoke crawl posture, and escape priorities." },
      { title: "P.A.S.S. Simulator", desc: "Interactive 4-step extinguisher motion training with particle physics." },
      { title: "Dorm Evacuation Map", desc: "Architectural hollow-courtyard floorplan with live evacuation flow." },
      { title: "Campus Zones", desc: "Specific fire rules for dorm rooms, kitchens, labs, and stairwells." },
      { title: "Dorm Room Audit", desc: "Interactive compliance checklist with real-time risk gauge." },
      { title: "Decision Drills", desc: "Scenario simulations for 3 AM alarms and kitchen grease fires." },
      { title: "Taiwan Hotlines", desc: "119, 110, 112, 1999, 1925, 165, 113 official emergency contacts." }
    ],

    // Section 2: Survival Protocols (NEW!)
    s2_survival_title: "🚨 Fire Survival Actions: What To Do In Case of Fire",
    s2_survival_desc: "Interactive animated demonstration of life-critical reactions: door heat checks, low smoke crawling, and emergency survival.",
    s2_survival_nav: [
      "1. 🚪 Check Door Heat",
      "2. 💨 Crawl Low (Smoke)",
      "3. 🔥 Stop, Drop & Roll",
      "4. 🪟 Shelter & Signal"
    ],
    s2_survival_info: {
      1: { badge: "ACTION 1: CHECK DOOR HANDLE HEAT", text: "Always feel the metal door handle and door surface with the back of your hand before opening. If hot, DO NOT open!" },
      2: { badge: "ACTION 2: CRAWL LOW UNDER SMOKE", text: "Toxic smoke and gases rise toward the ceiling. The cleanest, breathable air layer is within 30-60 cm of the floor. Crawl low on hands and knees." },
      3: { badge: "ACTION 3: STOP, DROP & ROLL", text: "If your clothes catch fire, never run (running feeds fire with oxygen). Stop moving, drop to the floor covering your face, and roll back and forth." },
      4: { badge: "ACTION 4: SHELTER IN PLACE & SIGNAL", text: "If exit corridors are blocked by smoke, retreat inside your room, close the door, seal cracks with wet towels, and signal at window for rescue." }
    },
    s2_survival_tip: "💡 Survival Rule: Smoke kills faster than flames. Never open a hot door, never use elevators, and never delay escape for belongings!",
    s2_ruleCards: [
      { title: "🚪 Feel Door With Back of Hand", desc: "Check metal handle and upper door with the back of your hand. If hot, fire is outside—DO NOT OPEN! If cool, crack door slightly to check for smoke before escaping." },
      { title: "💨 Crawl Low Below Rising Smoke", desc: "Superheated toxic gases and carbon monoxide float to the ceiling. The air layer 30–60 cm above the floor is coolest and least smoky. Crawl low on hands and knees." },
      { title: "🚪 Close Doors Behind You", desc: "Always close doors behind you when evacuating your room or passing stairwells! This cuts off oxygen and contains fire/smoke to buy precious evacuation time." },
      { title: "🪟 Seal Cracks & Signal at Window", desc: "If escape corridors are impassable, retreat inside, close the door, pack wet towels/blankets tightly into door cracks to block smoke, and signal at window for rescue." }
    ],

    // Section 3: P.A.S.S.
    s3_title: "🧯 Interactive P.A.S.S. Extinguisher Simulator",
    s3_desc: "Interactive motion demonstration of the 4-step extinguisher technique against burning fuel.",
    s3_stepsNav: ["1. 🧷 Pull Pin", "2. 🎯 Aim Low", "3. ✊ Squeeze Lever", "4. ↔️ Sweep Across"],
    s3_stepsInfo: {
      1: { badge: "STEP 1: PULL THE PIN", text: "Pull the metal safety ring pin to break the plastic tamper seal and unlock the handle." },
      2: { badge: "STEP 2: AIM LOW AT BASE", text: "Aim the discharge nozzle or horn directly at the base of the fuel, not at the high flames." },
      3: { badge: "STEP 3: SQUEEZE LEVER", text: "Depress the upper lever slowly and firmly to release pressurized dry chemical extinguishing agent." },
      4: { badge: "STEP 4: SWEEP SIDE TO SIDE", text: "Sweep the nozzle in a smooth back-and-forth motion across the entire fire base until fully out." }
    },
    s3_play: "▶ Play Demo",
    s3_pause: "⏸ Pause Demo",
    s3_tip: "⚠️ Rule of Thumb: Only fight fires smaller than a wastebasket. Always keep an unobstructed exit behind you!",

    // Section 4: Evacuation Map
    s4_title: "🗺️ Dormitory Emergency Evacuation Map",
    s4_desc: "Hollow-square perimeter layout with room naming (X01-X44) and closest stairwell exits.",
    s4_legendStairs: "Exit Stairs",
    s4_legendExits: "1F Exits via Stairs",
    s4_legendStudents: "Evacuating Students",
    s4_legendCourtyard: "Void Courtyard",
    s4_card1_title: "🚪 Key Exit Configuration",
    s4_card1_body: "<ul><li><strong>North Stairs:</strong> Located beside room X04 (above lift), leading down to 1F Parking Exit.</li><li><strong>South Stairs:</strong> Located beside room X22, leading down to 1F Main Exit.</li><li><strong>Lift Location:</strong> Positioned directly below North Stairs; strictly prohibited during fire alarms.</li><li><strong>Continuous Upper Floor:</strong> Rooms X08-X18 form a solid wall; physical exits are located on the ground floor.</li></ul>",
    s4_card2_title: "🚫 Strictly Do Not Use Elevators",
    s4_card2_body: "<p>Elevator shafts create a lethal chimney draft drawing toxic carbon monoxide upward. Always evacuate via stairs!</p>",
    s4_card3_title: "🔑 Always Carry Your Room Key & ID",
    s4_card3_body: "<p>If corridors are impassable due to thick smoke, retreat inside your room, seal door cracks, and signal at window.</p>",

    // Section 5: Campus Zones
    s5_title: "🏢 Campus & Residence Hall Safety Protocols",
    s5_desc: "Hazard prevention and electrical codes tailored for each specific zone on campus.",
    s5_tabs: ["All Campus Zones", "Dorm Rooms", "Communal Kitchens", "AI & Science Labs", "Corridors & Fire Doors"],
    s5_zoneTags: ["Dorm Living", "Communal Kitchen", "AI & Labs", "Corridors & Exits"],
    s5_zones: [
      {
        tag: "Dormitory Rooms",
        title: "🛌 Dorm Living & Appliance Regulations",
        items: [
          "Open flames, candles, and incense are strictly prohibited in university housing.",
          "High-wattage heating appliances (hot plates, electric kettles, space heaters) are banned.",
          "Hair straighteners and curling irons must be unplugged immediately after use.",
          "Never charge e-scooters or lithium power banks overnight on bedding or desks."
        ]
      },
      {
        tag: "Kitchen & Lounges",
        title: "🍳 Communal Kitchen Protocols",
        items: [
          "Never leave stovetop cooking, hot soup, or microwave food unattended.",
          "Never throw water on hot oil fires; cover with a metal lid to smother flames.",
          "Clean microwave interiors and toaster crumb trays regularly to prevent fire ignition.",
          "Clean laundry dryer lint filters before and after every single drying load."
        ]
      },
      {
        tag: "Tech & Science Labs",
        title: "🔬 AI & Computer Lab Codes",
        items: [
          "Maintain clear ventilation around high-wattage GPU server racks and workstations.",
          "Do not daisy-chain extension cords or surge protectors together.",
          "Store chemical solvents (isopropyl alcohol, acetone) in rated yellow safety cabinets.",
          "Keep Class C or Clean-Agent CO2 extinguishers accessible near electronics."
        ]
      },
      {
        tag: "Egress & Corridors",
        title: "🚪 Corridors & Fire Doors",
        items: [
          "Never prop open heavy self-closing fire doors with trash cans or wedges.",
          "Keep corridors, stairwells, and room doorways 100% free of bicycles or boxes.",
          "Ensure overhead emergency exit signs are brightly illuminated 24/7.",
          "Know the primary and secondary escape routes if one stairwell is blocked by smoke."
        ]
      }
    ],

    // Section 6: Audit
    s6_title: "✅ Interactive Dorm Room Safety Audit",
    s6_desc: "Evaluate your dormitory room compliance against campus fire safety regulations.",
    s6_gaugeLabel: "Compliance",
    s6_statusHigh: "HIGH RISK",
    s6_statusMod: "MODERATE",
    s6_statusSafe: "CAMPUS SAFE",
    s6_checks: [
      { title: "Unobstructed Smoke Detector & Sprinkler Heads", sub: "Nothing hanging within 18 inches (45 cm) of ceiling sprinkler heads." },
      { title: "No Multi-Plug Octopus Outlets or Daisy Chains", sub: "All surge protectors are UL-certified and plugged directly into wall receptacles." },
      { title: "Zero Prohibited Open-Flame Items", sub: "No candles, incense burners, halogen lamps, or unapproved heating appliances." },
      { title: "Clear Path to Dorm Exit Door", sub: "Exit door swings fully open with no hampers, shoes, or clutter blocking egress." },
      { title: "Memorized North & South Exit Stairwells", sub: "All roommates know the routes to North Stairs (beside X04) and South Stairs (beside X22)." },
      { title: "Designated Outdoor Assembly Area Known", sub: "Everyone knows the designated lawn gathering point for headcount verification." }
    ],

    // Section 7: Drills
    s7_title: "🧠 Emergency Decision Drills",
    s7_desc: "Sharpen your crisis reaction instinct under simulated university dormitory emergencies.",

    // Section 8: Hotlines
    s8_title: "📞 Taiwan Emergency Hotlines (台灣官方緊急求助專線)",
    s8_desc: "Official emergency numbers and citizen service hotlines in Taiwan. Click any card to dial directly.",
    s8_cards: [
      { title: "Fire & Ambulance", subtitle: "Fire, Rescue & Emergency Medical Ambulance", desc: "Available 24/7. Dial immediately for structural fire, injury, or chemical hazards." },
      { title: "Police Emergency", subtitle: "Police Department Emergency Reporting", desc: "Dial for campus violence, intruders, arson threats, or public safety emergencies." },
      { title: "Global Mobile Emergency", subtitle: "International Mobile SOS (Cellular Required)", desc: "Connects even without a SIM card or active roaming via available cell towers, with voice routing to 119 or 110." },
      { title: "Citizen Service Hotline", subtitle: "Municipal Public Services & Local Reports (Non-24/7 Emergency)", desc: "Local county/city citizen hotline for municipal inquiries, utility outages, and infrastructure repair." },
      { title: "Mental Health Hotline", subtitle: "MOHW Psychological Support & Crisis Helpline", desc: "24/7 toll-free mental health support, emotional counseling, and self-harm crisis intervention." },
      { title: "Anti-Fraud Hotline", subtitle: "NPA Anti-Fraud Consultation & Reporting", desc: "Verify suspicious phone calls, phishing scams, impersonation frauds, or cyber extortion." },
      { title: "Protection Hotline", subtitle: "Domestic Violence & Women/Children Protection", desc: "24/7 confidential counseling and emergency intervention for domestic violence, abuse, or harassment." }
    ],
    s8_note: "Emergency reporting protocol in Taiwan: Dial 119 for fire and ambulance. If your mobile has poor signal, dial 112 (requires cellular coverage from any carrier). Stay calm and state: (1) School name (2) Dorm building name (3) Floor and room number (4) Nature of fire and smoke conditions."
  }
};

/* ==========================================================================
   1. LANGUAGE ENGINE
   ========================================================================== */
function initLanguageEngine() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langBtnLabel = document.getElementById('langBtnLabel');

  function applyLanguage(lang) {
    currentLang = lang;
    const t = i18nData[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

    if (langBtnLabel) langBtnLabel.textContent = t.langBtn;

    const brandText = document.querySelector('.brand span');
    if (brandText) brandText.textContent = t.brand;
    const alarmBtnText = document.getElementById('alarmBtnLabel');
    if (alarmBtnText) alarmBtnText.textContent = t.alarmBtn;

    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    tabBtns.forEach((btn, idx) => {
      if (t.tabs[idx]) btn.innerHTML = t.tabs[idx];
    });

    const pageIndicator = document.getElementById('currentSlideIndicator');
    if (pageIndicator) {
      pageIndicator.textContent = t.pageIndicator
        .replace('{curr}', currentSlide + 1)
        .replace('{total}', totalSlides);
    }

    // Section 1: Home
    const s1Badge = document.querySelector('#slide-1 .hero-badge');
    if (s1Badge) s1Badge.textContent = t.s1_badge;
    const s1Heading = document.querySelector('#slide-1 .hero-heading');
    if (s1Heading) s1Heading.textContent = t.s1_heading;
    const s1Subtitle = document.querySelector('#slide-1 .hero-subtitle');
    if (s1Subtitle) s1Subtitle.textContent = t.s1_subtitle;

    const quickBoxes = document.querySelectorAll('.quick-feature-box');
    quickBoxes.forEach((box, i) => {
      if (t.s1_cards[i]) {
        const h4 = box.querySelector('h4');
        const p = box.querySelector('p');
        if (h4) h4.textContent = t.s1_cards[i].title;
        if (p) p.textContent = t.s1_cards[i].desc;
      }
    });

    // Section 2: Survival
    const s2Title = document.querySelector('#slide-2 .section-title');
    if (s2Title) s2Title.textContent = t.s2_survival_title;
    const s2Desc = document.querySelector('#slide-2 .section-desc');
    if (s2Desc) s2Desc.textContent = t.s2_survival_desc;

    const survivalStepBtns = document.querySelectorAll('.survival-step-btn[data-action]');
    survivalStepBtns.forEach((btn, idx) => {
      if (t.s2_survival_nav[idx]) btn.textContent = t.s2_survival_nav[idx];
    });

    const activeSurvivalBtn = document.querySelector('.survival-step-btn[data-action].active');
    const currAct = activeSurvivalBtn ? parseInt(activeSurvivalBtn.dataset.action) : 1;
    const badgeEl = document.getElementById('survivalStepBadge');
    const textEl = document.getElementById('survivalStepText');
    if (badgeEl && t.s2_survival_info[currAct]) badgeEl.textContent = t.s2_survival_info[currAct].badge;
    if (textEl && t.s2_survival_info[currAct]) textEl.textContent = t.s2_survival_info[currAct].text;

    const survivalTip = document.getElementById('survivalStatusHint');
    if (survivalTip) {
      survivalTip.textContent = currentLang === 'zh'
        ? '💡 緩速示範循環中（每動態停留 16 秒）。點擊任一動作可停駐觀看細節。'
        : '💡 Slow-paced demo cycle (16s per action). Click any action tab to inspect.';
    }

    const ruleCards = document.querySelectorAll('.survival-grid-cards .survival-rule-item');
    ruleCards.forEach((card, idx) => {
      if (t.s2_ruleCards && t.s2_ruleCards[idx]) {
        const h4 = card.querySelector('h4');
        const p = card.querySelector('p');
        if (h4) h4.textContent = t.s2_ruleCards[idx].title;
        if (p) p.textContent = t.s2_ruleCards[idx].desc;
      }
    });

    // Section 3: P.A.S.S.
    const s3Title = document.querySelector('#slide-3 .section-title');
    if (s3Title) s3Title.textContent = t.s3_title;
    const s3Desc = document.querySelector('#slide-3 .section-desc');
    if (s3Desc) s3Desc.textContent = t.s3_desc;

    const passStepBtns = document.querySelectorAll('.pass-step-btn[data-step]');
    passStepBtns.forEach((btn, idx) => {
      if (t.s3_stepsNav[idx]) btn.textContent = t.s3_stepsNav[idx];
    });

    const activePassBtn = document.querySelector('.pass-step-btn[data-step].active');
    const curPassStep = activePassBtn ? parseInt(activePassBtn.dataset.step) : 1;
    const passBadgeEl = document.getElementById('passStepBadge');
    const passTextEl = document.getElementById('passStepText');
    if (passBadgeEl && t.s3_stepsInfo[curPassStep]) passBadgeEl.textContent = t.s3_stepsInfo[curPassStep].badge;
    if (passTextEl && t.s3_stepsInfo[curPassStep]) passTextEl.textContent = t.s3_stepsInfo[curPassStep].text;

    const passPlayPauseBtn = document.getElementById('passPlayPauseBtn');
    if (passPlayPauseBtn) {
      const isPaused = passPlayPauseBtn.textContent.includes('Play') || passPlayPauseBtn.textContent.includes('播放');
      passPlayPauseBtn.textContent = isPaused ? t.s3_play : t.s3_pause;
    }

    const passTip = document.querySelector('.extinguisher-toolbar div[style*="font-size:0.84rem"]');
    if (passTip) passTip.textContent = t.s3_tip;

    // Section 4: Evacuation
    const s4Title = document.querySelector('#slide-4 .section-title');
    if (s4Title) s4Title.textContent = t.s4_title;
    const s4Desc = document.querySelector('#slide-4 .section-desc');
    if (s4Desc) s4Desc.textContent = t.s4_desc;

    const cards = document.querySelectorAll('.sidebar-notes .dorm-info-card');
    if (cards[0]) {
      cards[0].querySelector('h4').textContent = t.s4_card1_title;
      cards[0].querySelector('ul').outerHTML = t.s4_card1_body;
    }
    if (cards[1]) {
      cards[1].querySelector('h4').textContent = t.s4_card2_title;
      cards[1].querySelector('p').outerHTML = t.s4_card2_body;
    }
    if (cards[2]) {
      cards[2].querySelector('h4').textContent = t.s4_card3_title;
      cards[2].querySelector('p').outerHTML = t.s4_card3_body;
    }

    // Section 5: Zones
    const s5Title = document.querySelector('#slide-5 .section-title');
    if (s5Title) s5Title.textContent = t.s5_title;
    const s5Desc = document.querySelector('#slide-5 .section-desc');
    if (s5Desc) s5Desc.textContent = t.s5_desc;

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn, i) => {
      if (t.s5_tabs[i]) btn.textContent = t.s5_tabs[i];
    });

    const zoneTags = document.querySelectorAll('.zone-tile .zone-tag');
    zoneTags.forEach((tag, i) => {
      if (t.s5_zoneTags && t.s5_zoneTags[i]) tag.textContent = t.s5_zoneTags[i];
    });

    const zoneTiles = document.querySelectorAll('.zone-tile');
    zoneTiles.forEach((tile, i) => {
      if (t.s5_zones[i]) {
        tile.querySelector('h3').textContent = t.s5_zones[i].title;
        const ul = tile.querySelector('ul');
        ul.innerHTML = t.s5_zones[i].items.map(it => `<li>${it}</li>`).join('');
      }
    });

    // Section 6: Audit
    const s6Title = document.querySelector('#slide-6 .section-title');
    if (s6Title) s6Title.textContent = t.s6_title;
    const s6Desc = document.querySelector('#slide-6 .section-desc');
    if (s6Desc) s6Desc.textContent = t.s6_desc;

    const gaugeLabel = document.querySelector('.circular-gauge-inner span[style*="text-transform:uppercase"]');
    if (gaugeLabel) gaugeLabel.textContent = t.s6_gaugeLabel;

    const auditLabels = document.querySelectorAll('.audit-check-label');
    auditLabels.forEach((label, i) => {
      if (t.s6_checks[i]) {
        label.querySelector('strong').textContent = t.s6_checks[i].title;
        label.querySelector('span').textContent = t.s6_checks[i].sub;
      }
    });

    // Section 7: Drills
    const s7Title = document.querySelector('#slide-7 .section-title');
    if (s7Title) s7Title.textContent = t.s7_title;
    const s7Desc = document.querySelector('#slide-7 .section-desc');
    if (s7Desc) s7Desc.textContent = t.s7_desc;

    initDrills();

    // Section 8: Hotlines
    const s8Title = document.querySelector('#slide-8 .section-title');
    if (s8Title) s8Title.textContent = t.s8_title;
    const s8Desc = document.querySelector('#slide-8 .section-desc');
    if (s8Desc) s8Desc.textContent = t.s8_desc;

    const hotlineCards = document.querySelectorAll('.hotlines-grid .hotline-card');
    hotlineCards.forEach((card, idx) => {
      if (t.s8_cards && t.s8_cards[idx]) {
        const h3 = card.querySelector('h3');
        const zhTitle = card.querySelector('.zh-title');
        const p = card.querySelector('p');
        if (h3) h3.textContent = t.s8_cards[idx].title;
        if (zhTitle) zhTitle.textContent = t.s8_cards[idx].subtitle;
        if (p) p.textContent = t.s8_cards[idx].desc;
      }
    });

    const flagNoteP = document.querySelector('.taiwan-flag-note p');
    if (flagNoteP) flagNoteP.textContent = t.s8_note;

    if (window.updateAuditGaugeFunc) window.updateAuditGaugeFunc();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'zh' ? 'en' : 'zh');
    });
  }

  applyLanguage(currentLang);
}

/* ==========================================================================
   2. 8-SECTION SLIDE DECK CONTROLLER (Directional Energy Wipe & Cascade)
   ========================================================================== */
function initSlideDeck() {
  const track = document.getElementById('sliderTrack');
  const tabs = document.querySelectorAll('.nav-tab-btn');
  const dots = document.querySelectorAll('.slide-dot');
  const pageIndicator = document.getElementById('currentSlideIndicator');
  const prevBtn = document.getElementById('slidePrevBtn');
  const nextBtn = document.getElementById('slideNextBtn');
  const slides = document.querySelectorAll('.slide-section');
  const wipeSweep = document.getElementById('pageWipeSweep');

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index === currentSlide && slides[0].classList.contains('active')) return;

    const isForward = index >= currentSlide;
    currentSlide = index;

    // Trigger Modern Web Guidance Directional Sweep Effect
    if (wipeSweep) {
      wipeSweep.className = 'page-wipe-sweep';
      void wipeSweep.offsetWidth; // force reflow
      wipeSweep.className = isForward ? 'page-wipe-sweep sweep-forward' : 'page-wipe-sweep sweep-backward';
    }

    const offset = -(currentSlide * (100 / totalSlides));
    track.style.transform = `translateX(${offset}%)`;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentSlide);
    });

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentSlide);
    });
    if (tabs[currentSlide]) {
      tabs[currentSlide].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    if (currentSlide === 1 && window.resumeSurvivalSimulator) {
      window.resumeSurvivalSimulator();
    }
    if (currentSlide === 8 && window.resumeEscapeSimulator) {
      window.resumeEscapeSimulator();
    }

    if (pageIndicator) {
      const t = i18nData[currentLang];
      pageIndicator.textContent = t.pageIndicator
        .replace('{curr}', currentSlide + 1)
        .replace('{total}', totalSlides);
    }

    if (slides[currentSlide]) {
      slides[currentSlide].scrollTop = 0;
    }
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => goToSlide(i));
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  document.querySelectorAll('.quick-feature-box').forEach(box => {
    box.addEventListener('click', () => {
      const target = parseInt(box.dataset.slide);
      if (!isNaN(target)) goToSlide(target);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      goToSlide(currentSlide - 1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(currentSlide + 1);
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(currentSlide - 1);
    }
  }, { passive: true });

  const urlParams = new URLSearchParams(window.location.search);
  const initialSlide = urlParams.has('slide') ? parseInt(urlParams.get('slide')) : 0;
  goToSlide(initialSlide);
  if (urlParams.has('action')) {
    setTimeout(() => {
      const act = parseInt(urlParams.get('action'));
      if (!isNaN(act)) {
        const btn = document.querySelector(`.survival-step-btn[data-action="${act}"]`);
        if (btn) btn.click();
      }
    }, 150);
  }
}

/* ==========================================================================
   3. FIRE SURVIVAL PROTOCOLS ANIMATED SIMULATOR (Section 2 - Upgraded)
   ========================================================================== */
function initSurvivalSimulator() {
  const canvas = document.getElementById('survivalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 460;
  }
  resize();
  window.addEventListener('resize', resize);

  let currentAction = 1; // 1: Door Heat, 2: Smoke Crawl, 3: Stop-Drop-Roll, 4: Shelter & Signal
  let isPlaying = true;
  let playbackSpeed = 1.0;
  let actionTimer = 0;
  const actionDuration = 960; // ~16 seconds at 60fps (thorough cinematic pacing)
  let frame = 0;

  // Action-to-action cinematic transition state
  const prevActionCanvas = document.createElement('canvas');
  let transitionTimer = 0;
  const TRANSITION_DURATION = 36; // ~0.6s cinematic wipe at 60fps
  let transitionFrom = 1;
  let transitionTo = 1;

  // Particle systems
  const smokeParticles = [];
  for (let i = 0; i < 45; i++) {
    smokeParticles.push({
      x: Math.random() * 900,
      y: Math.random() * 160 + 20,
      radius: Math.random() * 32 + 20,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.25
    });
  }

  const fireExtinguishPuffs = [];

  // Helper: Draw dynamically sized pills to prevent ANY text clipping
  function drawPill(context, text, centerX, centerY, bgColor, textColor, fontSize = 13, paddingX = 18, paddingY = 8, borderColor = null) {
    context.save();
    context.font = `bold ${fontSize}px sans-serif`;
    const textW = context.measureText(text).width;
    const boxW = textW + paddingX * 2;
    const boxH = fontSize + paddingY * 2;
    const boxX = centerX - boxW / 2;
    const boxY = centerY - boxH / 2;

    context.fillStyle = bgColor;
    context.beginPath();
    context.roundRect(boxX, boxY, boxW, boxH, boxH / 2);
    context.fill();

    if (borderColor) {
      context.strokeStyle = borderColor;
      context.lineWidth = 1.5;
      context.stroke();
    }

    context.fillStyle = textColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, centerX, centerY);
    context.restore();
  }

  // Helper: Draw enchanting, realistic circular-particle fluid fire (matching reference aesthetic)
  function drawEnchantedFire(context, x, y, baseW, height, intensity = 1.0, windX = 0, f = 0, showBase = false) {
    if (intensity <= 0.01) return;
    context.save();
    context.translate(x, y);

    // Wood base dimensions: wide solid dark brown block matching reference
    const bw = baseW * 1.55;
    const bh = Math.max(16, baseW * 0.22);
    const baseTopY = showBase ? -bh : 0;

    // 1. Solid charcoal wood fuel platform
    if (showBase) {
      const bx = -bw * 0.5;
      const by = -bh;
      context.fillStyle = '#341508';
      context.fillRect(bx, by, bw, bh);
      // Top warm wood edge highlight
      context.fillStyle = '#54240e';
      context.fillRect(bx, by, bw, 3);
      // Bottom ground contact shadow
      context.fillStyle = '#140702';
      context.fillRect(bx, by + bh - 3, bw, 3);
    }

    // 2. Subtle warm ambient radial glow
    const glowRadius = height * 1.15;
    const glow = context.createRadialGradient(windX * 0.25, baseTopY - height * 0.45, 6, windX * 0.35, baseTopY - height * 0.5, glowRadius);
    glow.addColorStop(0, `rgba(245, 158, 11, ${0.22 * intensity})`);
    glow.addColorStop(0.45, `rgba(239, 68, 68, ${0.11 * intensity})`);
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = glow;
    context.beginPath();
    context.arc(windX * 0.35, baseTopY - height * 0.5, glowRadius, 0, Math.PI * 2);
    context.fill();

    // 3. Stable base anchor circles sitting directly ON the wood block
    // Translucent overlapping disks (alpha 0.72 - 0.78) so interior overlaps multiply cleanly
    const basePulse = Math.sin(f * 0.1) * 0.04;
    const anchorDiscs = [
      // Center-bottom golden-orange disc
      { rx: baseW * 0.02, ry: baseTopY - baseW * 0.26, r: baseW * 0.38 * (1 + basePulse), color: 'rgba(217, 119, 6, 0.78)' },
      // Left coral-red disc
      { rx: -baseW * 0.20, ry: baseTopY - baseW * 0.32, r: baseW * 0.35 * (1 - basePulse), color: 'rgba(239, 68, 68, 0.75)' },
      // Right warm yellow-gold disc
      { rx: baseW * 0.24, ry: baseTopY - baseW * 0.30, r: baseW * 0.36 * (1 + basePulse * 0.8), color: 'rgba(245, 158, 11, 0.78)' },
      // Center-high warm orange disc
      { rx: -baseW * 0.05, ry: baseTopY - baseW * 0.50, r: baseW * 0.32 * (1 + basePulse * 1.2), color: 'rgba(234, 88, 12, 0.74)' },
      // Mid-right golden-ochre disc
      { rx: baseW * 0.16, ry: baseTopY - baseW * 0.66, r: baseW * 0.28 * (1 - basePulse), color: 'rgba(202, 138, 4, 0.72)' }
    ];

    anchorDiscs.forEach(d => {
      context.fillStyle = d.color;
      context.beginPath();
      context.arc(d.rx + windX * 0.08, d.ry, d.r * intensity, 0, Math.PI * 2);
      context.fill();
    });

    // 4. Overlapping translucent rising circular fire particles
    // 30 particles with organic S-curve wavering and vertical distribution matching reference image
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const seed = (i * 9.731) % 1.0;
      const seed2 = (i * 17.183) % 1.0;
      const speed = 0.0055 + seed * 0.0065;
      const phase = seed2;

      const pCycle = (f * speed + phase) % 1.0;

      // Height: from baseTopY up to -height * 1.05
      const py = baseTopY - baseW * 0.22 - pCycle * (height * 0.98);

      // Organic S-curve sway matching the curved column in the reference image
      const sCurve = Math.sin(pCycle * Math.PI * 1.8 + 0.4) * (baseW * 0.25);
      const flutter = Math.sin(f * 0.08 + i * 1.3) * (baseW * 0.12 * (0.3 + pCycle * 0.7));
      const baseSpread = (seed - 0.5) * (baseW * 0.55) * (1 - pCycle * 0.6);
      const windOffset = windX * Math.pow(pCycle, 1.3);
      const px = baseSpread + sCurve + flutter + windOffset;

      // Radius: starts large at bottom, shrinks gently as it climbs
      const initialR = baseW * (0.26 + seed2 * 0.15);
      const pr = Math.max(3, initialR * (1 - pCycle * 0.72) * intensity);

      // Color & Opacity gradient across height cycle:
      let colorStr;
      if (pCycle < 0.25) {
        const colorType = i % 3;
        const a = (0.72 + seed2 * 0.08) * intensity;
        if (colorType === 0) colorStr = `rgba(249, 115, 22, ${a})`;  // warm orange
        else if (colorType === 1) colorStr = `rgba(234, 179, 8, ${a})`; // golden amber
        else colorStr = `rgba(239, 68, 68, ${a})`;                   // coral red
      } else if (pCycle < 0.58) {
        const colorType = i % 4;
        const a = (0.62 + seed2 * 0.1) * intensity * (1 - (pCycle - 0.25) * 0.45);
        if (colorType === 0) colorStr = `rgba(202, 138, 4, ${a})`;   // golden ochre
        else if (colorType === 1) colorStr = `rgba(220, 38, 38, ${a})`;  // crimson red
        else if (colorType === 2) colorStr = `rgba(234, 88, 12, ${a})`;  // fiery orange
        else colorStr = `rgba(217, 119, 6, ${a})`;                  // warm amber
      } else if (pCycle < 0.85) {
        const a = (0.50 * (1 - (pCycle - 0.58) / 0.27)) * intensity;
        const colorType = i % 3;
        if (colorType === 0) colorStr = `rgba(159, 18, 57, ${a})`;  // deep wine red
        else if (colorType === 1) colorStr = `rgba(146, 64, 14, ${a})`; // dusky dark amber
        else colorStr = `rgba(136, 19, 55, ${a})`;                 // purple burgundy
      } else {
        // Drifting top ember circles
        const a = Math.max(0, (1 - pCycle) / 0.15 * 0.35 * intensity);
        colorStr = (i % 2 === 0) ? `rgba(136, 19, 55, ${a})` : `rgba(110, 35, 45, ${a})`;
      }

      context.fillStyle = colorStr;
      context.beginPath();
      context.arc(px, py, pr, 0, Math.PI * 2);
      context.fill();
    }

    // 5. High Drifting Sparks / Micro Embers (dissolving into air at the very top)
    for (let j = 0; j < 6; j++) {
      const sparkCycle = (f * 0.012 + j * 0.18) % 1.0;
      const sy = baseTopY - height * 0.75 - sparkCycle * height * 0.4;
      const sx = Math.sin(j * 2.3 + f * 0.08) * (baseW * 0.22) + windX * (0.6 + sparkCycle * 0.6);
      const sa = Math.max(0, (1 - sparkCycle) * 0.45 * intensity);
      if (sa > 0.02) {
        context.fillStyle = (j % 2 === 0) ? `rgba(245, 158, 11, ${sa})` : `rgba(190, 24, 93, ${sa})`;
        context.beginPath();
        context.arc(sx, sy, 2.5 + (j % 3), 0, Math.PI * 2);
        context.fill();
      }
    }

    context.restore();
  }

  function setAction(action, pauseAutoplay = false) {
    if (action !== currentAction && canvas.width > 0 && canvas.height > 0) {
      // Snapshot current canvas frame to offscreen buffer for seamless wipe transition
      prevActionCanvas.width = canvas.width;
      prevActionCanvas.height = canvas.height;
      const prevCtx = prevActionCanvas.getContext('2d');
      prevCtx.drawImage(canvas, 0, 0);

      transitionFrom = currentAction;
      transitionTo = action;
      transitionTimer = TRANSITION_DURATION;
    }

    currentAction = action;
    actionTimer = 0;
    if (pauseAutoplay) {
      isPlaying = false;
      updatePlayPauseUI();
    }

    document.querySelectorAll('.survival-step-btn[data-action]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.action) === action);
    });

    const badgeEl = document.getElementById('survivalStepBadge');
    const textEl = document.getElementById('survivalStepText');
    const t = i18nData[currentLang];
    const info = t.s2_survival_info[action];

    if (badgeEl && info) badgeEl.textContent = info.badge;
    if (textEl && info) textEl.textContent = info.text;

    const titleContainer = document.querySelector('.step-indicator-title');
    if (titleContainer) {
      titleContainer.classList.remove('action-text-swap');
      void titleContainer.offsetWidth;
      titleContainer.classList.add('action-text-swap');
    }

    updateStatusHint();
  }

  function updatePlayPauseUI() {
    const playPauseBtn = document.getElementById('survivalPlayPauseBtn');
    if (playPauseBtn) {
      playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
      playPauseBtn.title = isPlaying ? "Pause Demo / 暫停示範" : "Resume Autoplay / 繼續輪播";
    }
    updateStatusHint();
  }

  function updateStatusHint() {
    const hintEl = document.getElementById('survivalStatusHint');
    if (!hintEl) return;
    const isZh = currentLang === 'zh';
    const sec = currentAction === 1 ? 24 : (currentAction === 2 ? 30 : (currentAction === 3 || currentAction === 4 ? 28 : 16));
    if (isPlaying) {
      hintEl.textContent = isZh
        ? `💡 自動輪播中（此動作完整示範 ${sec} 秒，速度 ${playbackSpeed}x）。點擊任一動作可停駐觀看細節。`
        : `💡 Auto-advancing (${sec}s complete demo, speed ${playbackSpeed}x). Click any action tab to pause & inspect.`;
    } else {
      hintEl.textContent = isZh
        ? `⏸ 已停駐於動作 ${currentAction}。點擊「▶」可恢復自動輪播。`
        : `⏸ Paused on Action ${currentAction}. Click "▶" to resume auto-advance.`;
    }
  }

  // Action tabs - switch and continue autoplay
  document.querySelectorAll('.survival-step-btn[data-action]').forEach(btn => {
    btn.addEventListener('click', () => setAction(parseInt(btn.dataset.action), false));
  });

  // Global helper to ensure autoplay runs whenever Page 2 is opened
  window.resumeSurvivalSimulator = function() {
    isPlaying = true;
    updatePlayPauseUI();
  };

  // Header controls
  const prevBtn = document.getElementById('survivalPrevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let prev = currentAction - 1;
      if (prev < 1) prev = 4;
      setAction(prev, false);
    });
  }

  const nextBtn = document.getElementById('survivalNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let next = currentAction + 1;
      if (next > 4) next = 1;
      setAction(next, false);
    });
  }

  const playPauseBtn = document.getElementById('survivalPlayPauseBtn');
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      updatePlayPauseUI();
    });
  }

  const speedBtn = document.getElementById('survivalSpeedBtn');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      if (playbackSpeed === 1.0) {
        playbackSpeed = 2.0;
        speedBtn.textContent = "🚀 2x";
        speedBtn.style.color = "#f97316";
        speedBtn.style.borderColor = "#f97316";
        speedBtn.style.boxShadow = "0 0 10px rgba(249, 115, 22, 0.45)";
      } else if (playbackSpeed === 2.0) {
        playbackSpeed = 0.5;
        speedBtn.textContent = "🐢 0.5x";
        speedBtn.style.color = "#38bdf8";
        speedBtn.style.borderColor = "#38bdf8";
        speedBtn.style.boxShadow = "0 0 10px rgba(56, 189, 248, 0.45)";
      } else {
        playbackSpeed = 1.0;
        speedBtn.textContent = "⚡ 1x";
        speedBtn.style.color = "";
        speedBtn.style.borderColor = "";
        speedBtn.style.boxShadow = "";
      }
      updateStatusHint();
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    frame += playbackSpeed;

    const groundY = h - 55;

    // Ground floor
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, groundY, w, 55);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(w, groundY);
    ctx.stroke();

    // Floor baseboard
    ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
    ctx.fillRect(0, groundY, w, 6);

    // =============================================================
    // SCENE 1: DOOR HEAT CHECK - CINEMATIC 4-ACT EXPERIENCE
    // Act 1: Palm Mistake -> Act 2: Zoom in & Inferno Behind Door -> Act 3: Slam & Zoom Out -> Act 4: Back-of-Hand Protocol
    // =============================================================
    if (currentAction === 1) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, groundY);

      // Cycle calculation: 1440 frames total (~24 seconds at 60fps for clear, deliberate, cinematic pacing)
      const cycle = (actionTimer % 1440);

      let zoom = 1.0;
      let doorOpenAngle = 0; // 0 (closed) to 1 (fully cracked open)
      let isPalmAct = false;
      let isInfernoAct = false;
      let isBackOfHandAct = false;

      if (cycle < 380) {
        // Act 1: Fatal Palm Mistake (0 - 380, ~6.3s)
        isPalmAct = true;
        zoom = 1.0;
      } else if (cycle < 820) {
        // Act 2: Zoom in & Inferno behind door (380 - 820, ~7.3s)
        isInfernoAct = true;
        const zoomProg = Math.min(1.0, (cycle - 380) / 90);
        const easeZ = 0.5 - 0.5 * Math.cos(zoomProg * Math.PI);
        zoom = 1.0 + easeZ * 0.65; // Cinematic 1.65x zoom

        if (cycle > 470) {
          const openProg = Math.min(1.0, (cycle - 470) / 80);
          doorOpenAngle = 0.5 - 0.5 * Math.cos(openProg * Math.PI);
        }
      } else if (cycle < 980) {
        // Act 3: Slam shut & zoom back out (820 - 980, ~2.6s)
        const shutProg = Math.min(1.0, (cycle - 820) / 40);
        doorOpenAngle = Math.max(0, 1.0 - shutProg);

        const zoomOutProg = Math.min(1.0, (cycle - 860) / 90);
        const easeZO = 0.5 - 0.5 * Math.cos(zoomOutProg * Math.PI);
        zoom = 1.65 - easeZO * 0.65;
      } else {
        // Act 4: Correct Back-of-Hand Protocol (980 - 1440, ~7.7s)
        isBackOfHandAct = true;
        zoom = 1.0;
      }

      // Door placement
      const doorX = w * 0.26;
      const doorW = 160;
      const doorH = groundY - 45;
      const doorY = 45;

      // Ergonomic handle position on right latch side
      const knobX = doorX + doorW - 28;
      const knobY = doorY + doorH * 0.52;

      // ==============================================================
      // CINEMATIC CAMERA ZOOM TRANSFORM
      // ==============================================================
      ctx.save();
      if (zoom !== 1.0) {
        const focusX = knobX + 10;
        const focusY = knobY;
        ctx.translate(focusX, focusY);
        ctx.scale(zoom, zoom);
        ctx.translate(-focusX, -focusY);
      }

      // Outer drywall frame
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(doorX - 22, doorY - 14, doorW + 44, doorH + 14);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.strokeRect(doorX - 22, doorY - 14, doorW + 44, doorH + 14);

      // INNER HALLWAY INFERNO (Visible when door cracks open)
      if (doorOpenAngle > 0.01) {
        const crackW = doorOpenAngle * 95;
        const crackX = doorX + doorW - crackW;

        // Dark burning hallway cavity
        ctx.fillStyle = '#160404';
        ctx.fillRect(crackX - 10, doorY, crackW + 20, doorH);

        // Blinding backdraft glow
        const flameGlow = ctx.createLinearGradient(crackX, doorY, crackX + crackW, doorY);
        flameGlow.addColorStop(0, 'rgba(20, 4, 4, 0.95)');
        flameGlow.addColorStop(0.3, 'rgba(220, 38, 38, 0.9)');
        flameGlow.addColorStop(0.7, 'rgba(249, 115, 22, 0.95)');
        flameGlow.addColorStop(1, 'rgba(254, 240, 138, 0.98)');
        ctx.fillStyle = flameGlow;
        ctx.fillRect(crackX, doorY, crackW, doorH);

        // Leaping Fire Particles
        drawEnchantedFire(ctx, crackX + crackW * 0.55, groundY, 48, 195, 1.35, 10, frame, false);

        // Toxic smoke clouds billowing through the door crack
        for (let s = 0; s < 12; s++) {
          const spCycle = (frame * 0.03 + s * 0.3) % 1.0;
          const sx = crackX + crackW + spCycle * 55;
          const sy = doorY + 25 - spCycle * 40 + Math.sin(s * 1.5) * 12;
          const sr = 8 + spCycle * 18;
          ctx.fillStyle = `rgba(15, 23, 42, ${(1 - spCycle) * 0.65})`;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Warning heat ripples
        const ripple = (frame * 0.12) % 1;
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.85 - ripple * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(crackX + crackW, knobY, 20 + ripple * 60, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.stroke();
      }

      // SWINGING DOOR BODY (Hinges on left frame doorX + 6, swings from right latch)
      const doorCrackW = doorOpenAngle * 95;
      const swingW = doorW - doorCrackW * 0.28;

      ctx.save();
      // Door face
      ctx.fillStyle = '#1c2438';
      ctx.fillRect(doorX, doorY, swingW, doorH);

      // 3D edge thickness visible on right edge when open
      if (doorOpenAngle > 0.04) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(doorX + swingW, doorY, 8, doorH);
        ctx.fillStyle = '#334155';
        ctx.fillRect(doorX + swingW + 6, doorY, 2, doorH);
      }

      // Door panels
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(doorX + 16, doorY + 20, swingW - 32, (doorH - 60) / 2);
      ctx.strokeRect(doorX + 16, doorY + 30 + (doorH - 60) / 2, swingW - 32, (doorH - 60) / 2);

      // Hinges on left frame
      ctx.fillStyle = '#475569';
      ctx.fillRect(doorX, doorY + 35, 6, 20);
      ctx.fillRect(doorX, doorY + doorH - 55, 6, 20);

      // Lever Door Handle on right latch edge
      const currentKnobX = doorX + swingW - 26;
      const currentKnobY = knobY;
      const isHandleHot = isPalmAct ? (cycle > 90) : (isBackOfHandAct ? (cycle > 1150) : false);

      ctx.fillStyle = isHandleHot ? '#ef4444' : '#cbd5e1';
      ctx.shadowColor = isHandleHot ? 'rgba(239, 68, 68, 0.9)' : 'transparent';
      ctx.shadowBlur = isHandleHot ? 16 : 0;
      ctx.fillRect(currentKnobX - 10, currentKnobY - 26, 20, 52);
      ctx.fillRect(currentKnobX - 2, currentKnobY - 5, 34, 10);
      ctx.beginPath();
      ctx.arc(currentKnobX + 32, currentKnobY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Thermal ripples on handle
      if (isHandleHot && doorOpenAngle < 0.1) {
        const pulse = (frame * 0.1) % 1;
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.9 - pulse * 0.9})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(currentKnobX + 16, currentKnobY, 15 + pulse * 45, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ==============================================================
      // PROPORTIONATE NATURAL HUMAN CHARACTER
      // ==============================================================
      const pBaseX = doorX + doorW + 35;
      const personY = groundY;

      let pOffsetX = 0;
      let pOffsetY = 0;
      if (isPalmAct) {
        pOffsetX = cycle < 90 ? (cycle / 90) * 8 : 8;
      } else if (isInfernoAct) {
        pOffsetX = -36; // jumps backward in alarm!
        pOffsetY = 4;
      } else if (isBackOfHandAct) {
        const reachCycle = (cycle - 980);
        pOffsetX = reachCycle < 90 ? (reachCycle / 90) * 6 : (reachCycle > 270 ? -20 : 6);
      }

      const pX = pBaseX - pOffsetX;
      const curY = personY + pOffsetY;

      // Legs
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(pX - 15, curY - 95, 13, 95, 3);
      ctx.roundRect(pX + 2, curY - 95, 13, 95, 3);
      ctx.fill();

      // Shoes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(pX - 20, curY - 12, 20, 12, [4, 6, 2, 2]);
      ctx.roundRect(pX - 2, curY - 12, 20, 12, [4, 6, 2, 2]);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(pX - 20, curY - 3, 20, 3);
      ctx.fillRect(pX - 2, curY - 3, 20, 3);

      // Torso with natural shoulder slope and fitted shirt
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(pX - 18, curY - 170);
      ctx.lineTo(pX + 18, curY - 170);
      ctx.lineTo(pX + 14, curY - 95);
      ctx.lineTo(pX - 14, curY - 95);
      ctx.closePath();
      ctx.fill();

      // Shirt collar & neck
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(pX - 6, curY - 182, 12, 14);
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(pX - 10, curY - 172, 20, 4);

      // Head & Hair facing the door (Clean modern cropped hairstyle)
      const headX = pX - 1;
      const headY = curY - 195;
      const headR = 15;

      // Base skin head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(headX, headY, headR, 0, Math.PI * 2);
      ctx.fill();

      // Clean modern cropped hairstyle (facing left towards door)
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(headX + 5, headY + 8);
      ctx.quadraticCurveTo(headX + headR + 2, headY + 2, headX + headR + 1, headY - 6);
      ctx.quadraticCurveTo(headX + 4, headY - headR - 3, headX - 4, headY - headR - 2);
      ctx.quadraticCurveTo(headX - headR - 2, headY - headR + 4, headX - headR + 1, headY - 2);
      ctx.lineTo(headX - 6, headY - 4);
      ctx.lineTo(headX + 2, headY - 2);
      ctx.quadraticCurveTo(headX + 8, headY + 2, headX + 5, headY + 8);
      ctx.closePath();
      ctx.fill();

      // Ear (properly placed below sideburn)
      ctx.fillStyle = '#fdba74';
      ctx.beginPath();
      ctx.arc(headX + 4, headY + 1, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(headX + 4, headY + 1, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Eye looking toward door
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(headX - 8, headY, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // ==============================================================
      // PROPORTIONATE 2-SEGMENT ARM WITH NATURAL ELBOW DROP
      // ==============================================================
      const shoulderX = pX - 12;
      const shoulderY = curY - 165;

      let targetHandX, targetHandY, elbowX, elbowY;

      if (isInfernoAct) {
        // Shocked defensive pose: hand raised shielding face
        targetHandX = pX - 22;
        targetHandY = curY - 185;
        elbowX = pX - 35;
        elbowY = curY - 150;
      } else if (isBackOfHandAct) {
        const reachCycle = (cycle - 980);
        if (reachCycle > 270) {
          // Safe recoil: hand springs back from heat!
          targetHandX = pX - 22;
          targetHandY = currentKnobY + 15;
          elbowX = pX - 18;
          elbowY = shoulderY + 25;
        } else {
          // Reaching back of hand smoothly to metal handle
          targetHandX = currentKnobX + 26;
          targetHandY = currentKnobY;
          elbowX = shoulderX - 18;
          elbowY = shoulderY + 28;
        }
      } else {
        // Act 1 Palm: Reaching hand forward to handle
        targetHandX = currentKnobX + 26;
        targetHandY = currentKnobY;
        elbowX = shoulderX - 18;
        elbowY = shoulderY + 28;
      }

      // Upper arm + Forearm
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 11;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(targetHandX + 8, targetHandY);
      ctx.stroke();

      // HAND RENDERING: Palm vs Back of Hand
      ctx.save();
      ctx.translate(targetHandX, targetHandY);

      if (isPalmAct) {
        // PALM CONTACT: Front palm flat on handle, fingers grasping
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.roundRect(-4, -10, 16, 20, [3, 5, 5, 3]);
        ctx.fill();
        ctx.fillStyle = isHandleHot ? '#ef4444' : '#fdba74';
        ctx.fillRect(6, -9, 7, 4);
        ctx.fillRect(6, -4, 8, 4);
        ctx.fillRect(6, 1, 8, 4);
        ctx.fillRect(6, 6, 7, 4);
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(-2, -14, 6, 5);

        if (cycle > 120) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(-6, -16, 22, 28);
          drawPill(ctx, currentLang === 'zh' ? '❌ 掌心死握痙攣' : '❌ Grip Spasm', 2, -26, '#dc2626', '#ffffff', 10, 10, 4);
        }
      } else if (isBackOfHandAct) {
        // BACK OF HAND (DORSAL) VIEW: Knuckles facing viewer
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.roundRect(-6, -10, 18, 20, [5, 3, 3, 5]);
        ctx.fill();
        // 4 knuckles visible on dorsal surface
        ctx.fillStyle = '#fdba74';
        ctx.beginPath();
        ctx.arc(-2, -6, 2.2, 0, Math.PI * 2);
        ctx.arc(-2, -1.5, 2.2, 0, Math.PI * 2);
        ctx.arc(-2, 3, 2.2, 0, Math.PI * 2);
        ctx.arc(-2, 7.5, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(8, -7, 2.5, 3);
        ctx.fillRect(9, -2.5, 2.5, 3);
        ctx.fillRect(9, 2, 2.5, 3);
        ctx.fillRect(8, 6.5, 2.5, 3);

        const reachCycle = (cycle - 980);
        if (reachCycle > 270) {
          drawPill(ctx, currentLang === 'zh' ? '✅ 自然後彈縮回' : '✅ Recoils Safely', 2, -26, '#10b981', '#ffffff', 10, 10, 4);
        }
      } else {
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.restore(); // END CAMERA ZOOM

      // ==============================================================
      // CRYSTAL-SHARP HUD OVERLAYS (Outside Zoom, Perfect Legibility)
      // ==============================================================
      if (isPalmAct) {
        drawPill(ctx, currentLang === 'zh'
          ? '❌ 致命錯誤：絕對不可直接用「掌心」碰門！'
          : '❌ FATAL MISTAKE: NEVER TOUCH DOOR WITH YOUR PALM!', w * 0.5, 30, '#ef4444', '#ffffff', 14, 24, 8);
      } else if (isInfernoAct) {
        drawPill(ctx, currentLang === 'zh'
          ? '🔥 門外已是烈焰火海！盲目開門會引發閃燃，瞬間奪命！'
          : '🔥 HALLWAY IS A RAGING INFERNO! OPENING CAUSES LETHAL FLASHOVER!', w * 0.5, 30, '#dc2626', '#ffffff', 14, 24, 8);
      } else if (cycle >= 820 && cycle < 980) {
        drawPill(ctx, currentLang === 'zh'
          ? '🛑 立即緊閉房門！常閉式防火門能阻隔濃煙 30~60 分鐘！'
          : '🛑 SLAM DOOR SHUT! Fire doors seal out lethal smoke for 30–60 minutes!', w * 0.5, 30, '#0284c7', '#ffffff', 14, 24, 8);
      } else if (isBackOfHandAct) {
        drawPill(ctx, currentLang === 'zh'
          ? '✅ 正確做法：以「手背」感受門把與門板上方溫度！'
          : '✅ CORRECT PROTOCOL: FEEL DOOR & HANDLE WITH BACK OF HAND!', w * 0.5, 30, '#10b981', '#ffffff', 14, 24, 8);
      }

      // Educational Callout Card placed cleanly on the right side
      const cardX = w * 0.65;
      const cardY = groundY - 125;
      const cardW = w * 0.31;
      const cardH = 115;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
      ctx.strokeStyle = isPalmAct ? '#ef4444' : (isInfernoAct ? '#f59e0b' : '#10b981');
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPalmAct ? '#f87171' : (isInfernoAct ? '#fbbf24' : '#34d399');
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';

      if (isPalmAct) {
        ctx.fillText(currentLang === 'zh' ? '❌ 為什麼不能用「掌心」？' : '❌ WHY NEVER USE PALM?', cardX + 14, cardY + 22);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        if (currentLang === 'zh') {
          ctx.fillText('• 掌心觸高溫會引發肌肉攣縮（屈肌反射），', cardX + 14, cardY + 44);
          ctx.fillText('  導致手掌死死握住發燙把手無法脫開！', cardX + 14, cardY + 62);
          ctx.fillText('• 掌心重度燙傷將失去逃生與爬行能力。', cardX + 14, cardY + 80);
          ctx.fillText('• 握住把手易誤開門，引火入室！', cardX + 14, cardY + 98);
        } else {
          ctx.fillText('• Heat triggers flexor spasms: your palm involuntarily', cardX + 14, cardY + 44);
          ctx.fillText('  grips burning metal and cannot release!', cardX + 14, cardY + 62);
          ctx.fillText('• Severe burns on palms destroy crawling mobility.', cardX + 14, cardY + 80);
          ctx.fillText('• Gripping unlatches door, pulling inferno inside!', cardX + 14, cardY + 98);
        }
      } else if (isInfernoAct || (cycle >= 820 && cycle < 980)) {
        ctx.fillText(currentLang === 'zh' ? '🔥 門外是火海時的致命陷阱' : '🔥 DEADLY TRAP BEHIND DOOR', cardX + 14, cardY + 22);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        if (currentLang === 'zh') {
          ctx.fillText('• 門外濃煙高達數百度，含大量一氧化碳。', cardX + 14, cardY + 44);
          ctx.fillText('• 開門瞬間新鮮空氣灌入，極易引發閃燃！', cardX + 14, cardY + 62);
          ctx.fillText('• 門燙千萬不可開門，立刻緊閉門縫！', cardX + 14, cardY + 80);
          ctx.fillText('• 躲入有對外窗之房間等待救援。', cardX + 14, cardY + 98);
        } else {
          ctx.fillText('• Corridor smoke exceeds hundreds of degrees (lethal CO).', cardX + 14, cardY + 44);
          ctx.fillText('• Inrushing fresh oxygen triggers explosive flashover!', cardX + 14, cardY + 62);
          ctx.fillText('• If door is hot, NEVER OPEN! Seal seams immediately!', cardX + 14, cardY + 80);
          ctx.fillText('• Retreat to room with window and wait for help.', cardX + 14, cardY + 98);
        }
      } else {
        ctx.fillText(currentLang === 'zh' ? '✅ 為什麼必須用「手背」？' : '✅ WHY USE BACK OF HAND?', cardX + 14, cardY + 22);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        if (currentLang === 'zh') {
          ctx.fillText('• 手背神經敏銳，遇熱自然向後彈開（伸肌），', cardX + 14, cardY + 44);
          ctx.fillText('  不會抓握把手，保護掌心完好。', cardX + 14, cardY + 62);
          ctx.fillText('• 測溫順序：金屬門把 ➔ 門板上方 ➔ 門縫。', cardX + 14, cardY + 80);
          ctx.fillText('• 若門涼：身體放低、單膝頂門、微開確認。', cardX + 14, cardY + 98);
        } else {
          ctx.fillText('• Back of hand recoils naturally (extensor reflex)', cardX + 14, cardY + 44);
          ctx.fillText('  without grasping, preserving palm skin intact.', cardX + 14, cardY + 62);
          ctx.fillText('• Test order: Metal handle ➔ Upper panel ➔ Seams.', cardX + 14, cardY + 80);
          ctx.fillText('• If cool: Stay low, brace knee, open crack to check.', cardX + 14, cardY + 98);
        }
      }
    }

    // =============================================================
    // SCENE 2: LOW SMOKE CRAWL (濃煙低姿勢沿牆爬行 - 4幕身歷其境教學 [20% Slower Pacing])
    // =============================================================
    else if (currentAction === 2) {
      // 1800 frames total (~30 seconds, 20% slower pacing)
      const cycle = (actionTimer % 1800);

      // Acts:
      // Act 1: 0 - 450 (Clean room -> Alarm -> Smoke suddenly fills ceiling and descends)
      // Act 2: 450 - 820 (Duck down from standing to hands & knees below 60cm clean layer)
      // Act 3: 820 - 1200 (Crawls into the first door opening threshold without overshooting)
      // Act 4: 1200 - 1800 (Corridor view: crawling to the left towards second door / EXIT sign)

      const isAct1 = cycle < 450;
      const isAct2 = cycle >= 450 && cycle < 820;
      const isAct3 = cycle >= 820 && cycle < 1200;
      const isAct4 = cycle >= 1200;

      // Smoke descent level
      let smokeDescendY = 0;
      if (isAct1) {
        if (cycle < 110) {
          smokeDescendY = 0; // completely clear room!
        } else {
          const fillProg = Math.min(1.0, (cycle - 110) / 280);
          smokeDescendY = fillProg * (groundY - 140);
        }
      } else {
        smokeDescendY = groundY - 140; // stable at 60cm smoke boundary
      }

      // Camera / Perspective in Act 3: smooth subtle zoom into doorway without distortion
      let sceneZoom = 1.0;
      let cameraPanX = 0;

      if (isAct3) {
        const crawlOutProg = (cycle - 820) / 380;
        const zoomCurve = Math.sin(crawlOutProg * Math.PI);
        sceneZoom = 1.0 + zoomCurve * 0.28;
        cameraPanX = crawlOutProg * 60;
      }

      ctx.save();

      if (sceneZoom !== 1.0 || cameraPanX !== 0) {
        const focusX = w * 0.28;
        const focusY = groundY - 80;
        ctx.translate(focusX, focusY);
        ctx.scale(sceneZoom, sceneZoom);
        ctx.translate(-focusX + cameraPanX * 0.4, -focusY);
      }

      // First Door Base parameters
      const doorBaseW = 120;
      const doorBaseH = groundY - 45;
      const doorBaseX = w * 0.10;

      // ==============================================================
      // SCENERY DRAWING
      // ==============================================================
      if (!isAct4) {
        // SCENE A: DORMITORY ROOM INTERIOR (Acts 1, 2, and 3)
        // Walls & Floor
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, groundY);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, groundY, w, h - groundY);

        // Ground floor line
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(w, groundY);
        ctx.stroke();

        // Room Background details: Window, desk, poster on wall
        const deskX = w * 0.72;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(deskX, groundY - 75, 110, 75);
        ctx.fillStyle = '#334155';
        ctx.fillRect(deskX - 5, groundY - 80, 120, 6);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(deskX + 85, groundY - 105, 16, 25);

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(w * 0.48, 80, 70, 90);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(w * 0.48, 80, 70, 90);
        ctx.fillStyle = '#64748b';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CAMPUS LIFE', w * 0.48 + 35, 125);

        // FIRST DOORWAY: Room exit door on the left
        const dW = doorBaseW;
        const dH = doorBaseH;
        const dX = doorBaseX;
        const dY = groundY - dH;

        // Outer door frame
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(dX - 14, dY - 10, dW + 28, dH + 10);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(dX - 14, dY - 10, dW + 28, dH + 10);

        // Open door doorway leading to corridor
        ctx.fillStyle = '#05070f';
        ctx.fillRect(dX, dY, dW, dH);

        // Corridor light through door
        const doorLight = ctx.createLinearGradient(dX, dY, dX + dW, dY);
        doorLight.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
        doorLight.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
        ctx.fillStyle = doorLight;
        ctx.fillRect(dX, dY, dW, dH);

        // Open door slab swinging outward into hallway
        ctx.fillStyle = '#1c2438';
        ctx.fillRect(dX - 18, dY, 18, dH);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(dX - 18, dY, 18, dH);

      } else {
        // SCENE B: EVACUATION CORRIDOR (Act 4: Crawling to the left to the exit)
        ctx.fillStyle = '#0a0e1a';
        ctx.fillRect(0, 0, w, groundY);
        ctx.fillStyle = '#060911';
        ctx.fillRect(0, groundY, w, h - groundY);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(w, groundY);
        ctx.stroke();

        // Wall base skirting board (tactile guide: 沿牆爬行)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, groundY - 18, w, 18);
        ctx.fillStyle = '#334155';
        ctx.fillRect(0, groundY - 18, w, 2.5);

        // Low-level luminous floor escape strip (綠色地面避難標線)
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.fillRect(0, groundY - 4, w, 4);

        // Corridor doors passing by in background (placed cleanly away from the gauge!)
        ctx.fillStyle = '#131b2e';
        ctx.fillRect(w * 0.36, 55, 65, groundY - 55);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.strokeRect(w * 0.36, 55, 65, groundY - 55);

        ctx.fillRect(w * 0.60, 55, 65, groundY - 55);
        ctx.strokeRect(w * 0.60, 55, 65, groundY - 55);

        // SECOND DOOR: FIXED POSITION EMERGENCY EXIT DOOR ON THE LEFT
        const exitX = 35;
        const exitW = 100;
        const exitH = groundY - 35;
        const exitY = 35;

        // Outer emergency exit frame
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(exitX - 6, exitY - 6, exitW + 12, exitH + 6);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(exitX - 6, exitY - 6, exitW + 12, exitH + 6);

        // Exit door panel
        ctx.fillStyle = '#022c22';
        ctx.fillRect(exitX, exitY, exitW, exitH);

        // Bright green Exit doorway beam
        const exitBeam = ctx.createLinearGradient(exitX + exitW, exitY, exitX + exitW + 120, exitY);
        exitBeam.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
        exitBeam.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = exitBeam;
        ctx.fillRect(exitX + exitW, exitY, 120, exitH);

        // Emergency Panic Push Bar (橫推逃生門鎖) at standard 100cm height
        const barY = groundY - 85;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(exitX + 8, barY, exitW - 16, 10);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(exitX + 8, barY, exitW - 16, 10);
      }

      // ==============================================================
      // DESCENDING TOXIC SMOKE LAYER
      // ==============================================================
      if (smokeDescendY > 5) {
        const smokeGrad = ctx.createLinearGradient(0, 0, 0, smokeDescendY);
        smokeGrad.addColorStop(0, '#020408');
        smokeGrad.addColorStop(0.7, '#0b0f19');
        smokeGrad.addColorStop(1, 'rgba(30, 41, 59, 0.95)');
        ctx.fillStyle = smokeGrad;
        ctx.fillRect(0, 0, w, smokeDescendY);

        smokeParticles.forEach(p => {
          p.x += p.vx * playbackSpeed;
          p.y += p.vy * playbackSpeed;
          if (p.x < -40) p.x = w + 40;
          if (p.x > w + 40) p.x = -40;
          if (p.y < 10) p.y = smokeDescendY - 15;
          if (p.y > smokeDescendY) p.y = 20;

          ctx.fillStyle = `rgba(30, 41, 59, ${p.opacity || 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, (p.y % smokeDescendY), p.radius || 20, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(0, smokeDescendY);
        ctx.lineTo(w, smokeDescendY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.fillRect(0, smokeDescendY, w, groundY - smokeDescendY);

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, smokeDescendY + 2);
        ctx.lineTo(w, smokeDescendY + 2);
        ctx.stroke();
      }

      // ==============================================================
      // CHARACTER ANIMATION: STANDING -> DUCKING -> CRAWLING OUT -> CRAWLING LEFT
      // ==============================================================
      if (isAct1) {
        // ACT 1: Standing in room, alarm sounds at cycle 110, looks up at smoke in panic!
        const personX = w * 0.58;
        const curY = groundY;
        const isAlarm = cycle > 110;

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(personX - 15, curY - 95, 13, 95);
        ctx.fillRect(personX + 2, curY - 95, 13, 95);

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(personX - 20, curY - 12, 20, 12);
        ctx.fillRect(personX - 2, curY - 12, 20, 12);

        ctx.fillStyle = '#0284c7';
        ctx.fillRect(personX - 18, curY - 170, 36, 75);

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 11;
        ctx.lineCap = 'round';
        if (isAlarm) {
          ctx.beginPath();
          ctx.moveTo(personX - 12, curY - 165);
          ctx.lineTo(personX - 24, curY - 180);
          ctx.lineTo(personX - 10, curY - 192);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(personX - 14, curY - 165);
          ctx.lineTo(personX - 22, curY - 120);
          ctx.stroke();
        }

        const headX = personX - 1;
        const headY = curY - 195;
        const headR = 15;

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(headX, headY, headR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(headX + 5, headY + 8);
        ctx.quadraticCurveTo(headX + headR + 2, headY + 2, headX + headR + 1, headY - 6);
        ctx.quadraticCurveTo(headX + 4, headY - headR - 3, headX - 4, headY - headR - 2);
        ctx.quadraticCurveTo(headX - headR - 2, headY - headR + 4, headX - headR + 1, headY - 2);
        ctx.lineTo(headX - 6, headY - 4);
        ctx.lineTo(headX + 2, headY - 2);
        ctx.quadraticCurveTo(headX + 8, headY + 2, headX + 5, headY + 8);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(headX - 7, headY - (isAlarm ? 5 : 1), 1.8, 0, Math.PI * 2);
        ctx.fill();

        if (isAlarm) {
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.beginPath();
          ctx.arc(headX - 20, headY, 4 + (actionTimer * 0.08) % 3, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (isAct2) {
        // ACT 2: Duck down from standing to hands & knees!
        const duckProg = Math.min(1.0, (cycle - 450) / 130);
        const easeDuck = 0.5 - 0.5 * Math.cos(duckProg * Math.PI);

        const pX = w * 0.58 - easeDuck * 80;
        const pY = groundY;
        const spineH = 170 - easeDuck * 135;

        ctx.save();
        ctx.translate(pX, pY);

        ctx.fillStyle = '#1e293b';
        if (duckProg < 0.5) {
          ctx.fillRect(-15, -95 + easeDuck * 60, 13, 95 - easeDuck * 60);
          ctx.fillRect(2, -95 + easeDuck * 60, 13, 95 - easeDuck * 60);
        } else {
          ctx.beginPath();
          ctx.roundRect(10, -22, 35, 20, 6);
          ctx.fill();
        }

        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-25, -spineH, 50 + easeDuck * 20, 35 - easeDuck * 10, 8);
        ctx.fill();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-15, -spineH + 10);
        ctx.lineTo(-30, 0);
        ctx.stroke();

        const hY = -spineH - 8;
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(-28, hY, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(-28, hY - 3, 15, Math.PI * 0.9, Math.PI * 2.1);
        ctx.fill();

        ctx.restore();

      } else if (isAct3) {
        // ACT 3: Crawling into the first door opening threshold!
        // FIX: Student crawls toward door and stops cleanly INSIDE the doorway opening threshold, NEVER passing the left door frame!
        const crawlOutProg = (cycle - 820) / 380;
        const targetDoorX = doorBaseX + doorBaseW * 0.55;
        const startX = w * 0.48;
        const crawlX = startX - crawlOutProg * (startX - targetDoorX);
        const crawlY = groundY;

        const gait = (actionTimer * 0.11) % (Math.PI * 2); // 20% slower crawling rhythm
        const undulate = Math.sin(gait) * 2.5;

        ctx.save();
        ctx.translate(crawlX, crawlY);

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(15 + Math.sin(gait) * 10, -22, 38, 20, 8);
        ctx.fill();

        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-22, -36 + undulate, 58, 24, 8);
        ctx.fill();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-14, -26);
        ctx.lineTo(-35 + Math.cos(gait) * 16, 0);
        ctx.stroke();

        ctx.strokeStyle = '#0369a1';
        ctx.beginPath();
        ctx.moveTo(-14, -26);
        ctx.lineTo(-35 + Math.cos(gait + Math.PI) * 16, 0);
        ctx.stroke();

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(-36, -26 + undulate, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(-36, -29 + undulate, 14, Math.PI * 0.85, Math.PI * 2.15);
        ctx.fill();

        ctx.restore();

      } else {
        // ACT 4: In corridor, crawling steadily to the left toward the second door (Exit door)!
        const corridorProg = (cycle - 1200) / 600;
        const exitDoorStopX = 35 + 100 + 35;
        const startX = w * 0.78;
        const crawlX = startX - corridorProg * (startX - exitDoorStopX);
        const crawlY = groundY;

        const gait = (actionTimer * 0.12) % (Math.PI * 2); // 20% slower crawling
        const undulate = Math.sin(gait) * 2.5;

        ctx.save();
        ctx.translate(crawlX, crawlY);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(-42, -10, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(14 + Math.sin(gait) * 12, -22, 38, 20, 8);
        ctx.fill();

        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-22, -36 + undulate, 58, 24, 8);
        ctx.fill();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-14, -26);
        ctx.lineTo(-36 + Math.cos(gait) * 16, 0);
        ctx.stroke();

        ctx.strokeStyle = '#0369a1';
        ctx.beginPath();
        ctx.moveTo(-14, -26);
        ctx.lineTo(-36 + Math.cos(gait + Math.PI) * 16, 0);
        ctx.stroke();

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(-36, -26 + undulate, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(-36, -29 + undulate, 14, Math.PI * 0.85, Math.PI * 2.15);
        ctx.fill();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('⬅', -65, -16);

        ctx.restore();
      }

      ctx.restore(); // END CAMERA/ZOOM TRANSFORM

      // ==============================================================
      // CRYSTAL-SHARP HUD OVERLAYS (Fixed On Screen, piercing smoke)
      // ==============================================================
      if (isAct4) {
        // High-luminescence EXIT SIGN on the second door, visible through smoke!
        const exitX = 35;
        const exitW = 100;
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 18;
        ctx.fillRect(exitX + 10, 16, exitW - 20, 24);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('EXIT 🏃 ➔', exitX + exitW / 2, 32);

        // Low-level luminous ground exit badge (for crawling eye level)
        drawPill(ctx, currentLang === 'zh' ? '🟢 逃生方向 ➔ (EXIT)' : '🟢 ESCAPE ROUTE ➔', exitX + exitW / 2 + 10, groundY - 45, '#064e3b', '#a7f3d0', 10, 12, 4, '#10b981');
      }

      if (isAct1) {
        if (cycle < 110) {
          drawPill(ctx, currentLang === 'zh'
            ? '🏠 寢室原狀：空氣清新正常 (NORMAL ROOM CONDITIONS)'
            : '🏠 NORMAL DORM CONDITIONS: CLEAR AIR BEFORE FIRE', w * 0.5, 30, '#0284c7', '#ffffff', 13, 24, 8);
        } else {
          drawPill(ctx, currentLang === 'zh'
            ? '🚨 火警驟響！劇毒濃煙自天花板迅速蓄積下壓！'
            : '🚨 ALARM SOUNDS! DENSE TOXIC SMOKE POURS IN FROM CEILING!', w * 0.5, 30, '#ef4444', '#ffffff', 13, 24, 8);
        }
      } else if (isAct2) {
        drawPill(ctx, currentLang === 'zh'
          ? '💨 立即壓低身姿！雙膝著地，頭部保持離地 30~60 公分呼吸層！'
          : '💨 DROP LOW IMMEDIATELY! HANDS & KNEES BELOW 30-60CM CLEAN LAYER!', w * 0.5, 30, '#10b981', '#ffffff', 13, 24, 8);
      } else if (isAct3) {
        drawPill(ctx, currentLang === 'zh'
          ? '🚪 壓低身軀爬出房門，進入避難走廊！隨手關門阻隔濃煙！'
          : '🚪 CRAWL OUT THROUGH DOORWAY INTO CORRIDOR! CLOSE DOOR BEHIND!', w * 0.5, 30, '#0284c7', '#ffffff', 13, 24, 8);
      } else {
        drawPill(ctx, currentLang === 'zh'
          ? '🟢 沿著牆壁基座摸索向左爬向緊急出口（EXIT）！絕對不要站立！'
          : '🟢 FEEL BASEBOARD, CRAWL LEFT TOWARDS EMERGENCY EXIT! NEVER STAND!', w * 0.5, 30, '#10b981', '#ffffff', 13, 24, 8);
      }

      // Height ruler / temperature stratification gauge on the right
      const gaugeX = w - 150;
      const gaugeY = 65;
      const gaugeW = 138;
      const gaugeH = groundY - 75;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(gaugeX, gaugeY, gaugeW, gaugeH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'left';
      ctx.fillText(currentLang === 'zh' ? '天花板 300°C+ 💀' : 'Ceiling 300°C+ 💀', gaugeX + 10, gaugeY + 22);
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(currentLang === 'zh' ? '含劇毒一氧化碳 CO' : 'Lethal CO & Cyanide', gaugeX + 10, gaugeY + 38);

      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.moveTo(gaugeX + 8, gaugeY + 50);
      ctx.lineTo(gaugeX + gaugeW - 8, gaugeY + 50);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.fillText(currentLang === 'zh' ? '100cm ⚠️ 危險嗆咳' : '100cm ⚠️ Severe Irritation', gaugeX + 10, gaugeY + 70);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(gaugeX + 8, groundY - 140);
      ctx.lineTo(gaugeX + gaugeW - 8, groundY - 140);
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.fillText(currentLang === 'zh' ? '30-60cm 🟢 清新呼吸層' : '30-60cm 🟢 Clean Air', gaugeX + 10, groundY - 120);
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '9px sans-serif';
      if (currentLang === 'zh') {
        ctx.fillText('溫度最低・氧氣最足', gaugeX + 10, groundY - 105);
        ctx.fillText('雙膝著地・雙手爬行', gaugeX + 10, groundY - 90);
        ctx.fillText('單手摸牆・定向逃生', gaugeX + 10, groundY - 75);
      } else {
        ctx.fillText('Coolest & highest O₂', gaugeX + 10, groundY - 105);
        ctx.fillText('On hands and knees', gaugeX + 10, groundY - 90);
        ctx.fillText('Follow skirting board', gaugeX + 10, groundY - 75);
      }
    }

    // =============================================================
    // SCENE 3: STOP, DROP & ROLL (Empty Room Pause -> Panic Burst -> Out of Breath Stop -> Drop -> Roll -> Extinguished)
    // =============================================================
    else if (currentAction === 3) {
      const cycle = (actionTimer % 1680);
      const centerX = w * 0.55;

      const isAct0 = cycle < 110;
      const isAct1 = cycle >= 110 && cycle < 450;
      const isAct2 = cycle >= 450 && cycle < 700;
      const isAct3 = cycle >= 700 && cycle < 910;
      const isAct4 = cycle >= 910 && cycle < 1485;
      const isAct5 = cycle >= 1485;

      // -------------------------------------------------------------
      // 1. BACKGROUND: ROOM WITH OPEN DOORWAY AND RAGING INFERNO BEHIND IT
      // -------------------------------------------------------------
      // Room wall
      ctx.fillStyle = '#0d1322';
      ctx.fillRect(0, 0, w, groundY);

      // Room floor
      ctx.fillStyle = '#060911';
      ctx.fillRect(0, groundY, w, h - groundY);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.stroke();

      // Skirting board
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY - 14, w, 14);

      // Room interior details: Window, ceiling pendant lamp
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w * 0.75, 70, 100, 90);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(w * 0.75, 70, 100, 90);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.moveTo(w * 0.75 + 50, 70);
      ctx.lineTo(w * 0.75 + 50, 160);
      ctx.moveTo(w * 0.75, 115);
      ctx.lineTo(w * 0.75 + 100, 115);
      ctx.stroke();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w * 0.52, 0);
      ctx.lineTo(w * 0.52, 45);
      ctx.stroke();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(w * 0.52, 48, 8, Math.PI, Math.PI * 2);
      ctx.fill();

      // -------------------------------------------------------------
      // OPEN DOORWAY ON THE LEFT WITH A LOT OF FIRE BEHIND IT
      // -------------------------------------------------------------
      const doorX = 40;
      const doorW = 120;
      const doorH = groundY - 35;
      const doorY = 35;

      // Dark hallway cavity behind door
      ctx.fillStyle = '#1a0505';
      ctx.fillRect(doorX, doorY, doorW, doorH);

      // Roaring inferno behind the open door
      drawEnchantedFire(ctx, doorX + 35, groundY, 45, 150, 1.25, 4, frame * 1.1, true);
      drawEnchantedFire(ctx, doorX + 70, groundY, 55, 190, 1.45, -6, frame * 1.3, true);
      drawEnchantedFire(ctx, doorX + 105, groundY, 40, 140, 1.2, 5, frame * 1.2, true);

      // Amber/red light spilling out from the doorway onto room floor
      const spillGrad = ctx.createRadialGradient(
        doorX + doorW, groundY, 10,
        doorX + doorW + 180, groundY, 260
      );
      spillGrad.addColorStop(0, 'rgba(249, 115, 22, 0.45)');
      spillGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.15)');
      spillGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spillGrad;
      ctx.fillRect(doorX, doorY - 20, doorW + 280, doorH + 60);

      // Door Frame
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 5;
      ctx.strokeRect(doorX, doorY, doorW, doorH);

      // Swung open door slab
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(doorX - 22, doorY, 22, doorH);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(doorX - 22, doorY, 22, doorH);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(doorX - 16, doorY + doorH * 0.52, 10, 5);

      // Top door warning pill
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.fillRect(doorX, doorY - 24, doorW, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentLang === 'zh' ? '🔥 門後猛烈火海' : '🔥 RAGING INFERNO', doorX + doorW / 2, doorY - 10);

      // -------------------------------------------------------------
      // 2. CHARACTER ACTIONS & PANIC / EXTINCTION ANIMATION
      // -------------------------------------------------------------
      if (isAct0) {
        // ACT 0: Empty room pause! Character has not appeared yet!
        drawPill(ctx, currentLang === 'zh'
          ? '🏠 寢室門外猛烈火海！(安靜片刻，突發狀況即將發生...)'
          : '🏠 RAGING INFERNO OUTSIDE DOOR (PREPARING SURVIVAL DEMONSTRATION...)', w * 0.5, 30, '#0284c7', '#ffffff', 13, 24, 8);
        drawPill(ctx, currentLang === 'zh'
          ? '門外走廊已被大火吞噬，切勿隨意打開門扇！'
          : 'Hallway engulfed in flames. Never open door carelessly!', w * 0.5, groundY - 14, 'rgba(15,23,42,0.85)', '#93c5fd', 11, 16, 5);

      } else if (isAct1) {
        // ACT 1: Burst out of door on fire, running around like crazy with hands waving in panic!
        drawPill(ctx, currentLang === 'zh'
          ? '⚠️ 著火驚慌失措！雙手亂揮狂奔！(錯誤示範：狂奔灌注氧氣如鼓風爐，助長火勢！)'
          : '⚠️ PANIC FLAGGING & RUNNING! (RUNNING FEEDS OXYGEN LIKE A BELLOWS!)', w * 0.5, 30, '#ef4444', '#ffffff', 13, 24, 8);

        const runProg = (cycle - 110) / 340;
        let personX;
        let facingRight = true;

        if (runProg < 0.45) {
          const t = runProg / 0.45;
          personX = (doorX + 90) + t * (w * 0.68 - (doorX + 90));
          facingRight = true;
        } else if (runProg < 0.75) {
          const t = (runProg - 0.45) / 0.30;
          personX = w * 0.68 - t * 110;
          facingRight = false;
        } else {
          const t = (runProg - 0.75) / 0.25;
          personX = (w * 0.68 - 110) + t * (centerX - (w * 0.68 - 110));
          facingRight = true;
        }

        const personY = groundY;
        const runGait = actionTimer * 0.38;
        const legSwing = Math.sin(runGait) * 36;

        ctx.save();
        ctx.translate(personX, personY);

        const waveAngle1 = Math.sin(actionTimer * 0.48) * 0.65 + 0.4;
        const waveAngle2 = Math.cos(actionTimer * 0.52) * 0.65 + 0.4;

        // Legs (scissoring fast)
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 11;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -75);
        ctx.lineTo(-legSwing * 0.7, -40);
        ctx.lineTo(-legSwing, -4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -75);
        ctx.lineTo(legSwing * 0.7, -40);
        ctx.lineTo(legSwing, -4);
        ctx.stroke();

        // Leaning Torso (wobbly frantically)
        const torsoTilt = (facingRight ? 0.24 : -0.24) + Math.sin(actionTimer * 0.3) * 0.08;
        ctx.rotate(torsoTilt);

        // Clothes (on fire!)
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-18, -155, 36, 80, 6);
        ctx.fill();

        // Head screaming / in terror
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(0, -178, 16, 0, Math.PI * 2);
        ctx.fill();

        // Hair
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, -184, 17, Math.PI * 0.9, Math.PI * 2.1);
        ctx.fill();

        // Terror eyes & screaming mouth
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(facingRight ? 6 : -6, -179, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(facingRight ? 8 : -8, -170, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // WAVING HANDS IN PANIC! (both arms flailing wildly high overhead)
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(12, -145);
        ctx.lineTo(24 + Math.sin(waveAngle1) * 25, -175 - Math.cos(waveAngle1) * 20);
        ctx.lineTo(30 + Math.sin(waveAngle1) * 40, -210 - Math.cos(waveAngle1) * 25);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-12, -145);
        ctx.lineTo(-24 - Math.sin(waveAngle2) * 25, -175 - Math.cos(waveAngle2) * 20);
        ctx.lineTo(-30 - Math.sin(waveAngle2) * 40, -210 - Math.cos(waveAngle2) * 25);
        ctx.stroke();

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(30 + Math.sin(waveAngle1) * 40, -210 - Math.cos(waveAngle1) * 25, 6, 0, Math.PI * 2);
        ctx.arc(-30 - Math.sin(waveAngle2) * 40, -210 - Math.cos(waveAngle2) * 25, 6, 0, Math.PI * 2);
        ctx.fill();

        // ENCHANTED FIRE ON BACK & CLOTHES (Wind-blown trail!)
        const windDrift = facingRight ? -30 : 30;
        drawEnchantedFire(ctx, facingRight ? -16 : 16, -95, 34, 75, 1.4, windDrift, frame * 1.4);

        ctx.restore();

        drawPill(ctx, currentLang === 'zh'
          ? '奔跑產生的風勢有如鼓風爐，雙手亂揮更會將火焰迅速往頭頸口鼻引導！'
          : 'Wind from running feeds flames like a bellows. Flailing hands pull flames toward face!', w * 0.5, groundY - 14, 'rgba(15,23,42,0.85)', '#fca5a5', 11, 16, 5);

      } else if (isAct2) {
        // ACT 2: Guy stops, visibly OUT OF BREATH (hunched, heaving chest, gasping for air)!
        drawPill(ctx, currentLang === 'zh'
          ? '🛑 步驟 1：停 (STOP) - 氣喘吁吁立即站定！停止狂奔切斷對流！'
          : '🛑 STEP 1: STOP - PANTING & OUT OF BREATH! HALT TO CUT OFF AIRFLOW!', w * 0.5, 30, '#dc2626', '#ffffff', 14, 24, 9);

        const personX = centerX;
        const personY = groundY;

        const pantCycle = actionTimer * 0.176;
        const chestHeave = Math.sin(pantCycle) * 4.5;
        const hunchAngle = 0.26 + Math.sin(pantCycle) * 0.05;

        ctx.save();
        ctx.translate(personX, personY);

        // Legs slightly bent at knees, bracing against exhaustion
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 11;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(-10, -75);
        ctx.lineTo(-18, -40);
        ctx.lineTo(-12, -4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(10, -75);
        ctx.lineTo(18, -40);
        ctx.lineTo(14, -4);
        ctx.stroke();

        // Torso hunched forward from exhaustion
        ctx.save();
        ctx.translate(0, -75);
        ctx.rotate(hunchAngle);

        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-18, -75 + chestHeave * 0.5, 36, 75, 6);
        ctx.fill();

        // Head drooped forward, mouth open gasping
        const headX = 4;
        const headY = -92 + chestHeave;
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(headX, headY, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(headX, headY - 6, 17, Math.PI * 0.85, Math.PI * 2.15);
        ctx.fill();

        // Tired closed eyes
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(headX + 5, headY - 2);
        ctx.lineTo(headX + 11, headY);
        ctx.stroke();

        // Open gasping mouth
        ctx.fillStyle = '#7f1d1d';
        ctx.beginPath();
        ctx.ellipse(headX + 10, headY + 7, 3.5, 5 + chestHeave * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hands braced on thighs / knees
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(10, -55);
        ctx.lineTo(16, -20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-10, -55);
        ctx.lineTo(-4, -20);
        ctx.stroke();

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(16, -18, 5, 0, Math.PI * 2);
        ctx.arc(-4, -18, 5, 0, Math.PI * 2);
        ctx.fill();

        // Fire on back (steady burning without running wind)
        drawEnchantedFire(ctx, -16, -35, 30, 55, 1.05, -3, frame);

        ctx.restore(); // end torso transform

        // Panting steam puffs from mouth (20% slower rhythm)
        const pantPuff = (actionTimer * 0.096) % 1;
        ctx.fillStyle = `rgba(241, 245, 249, ${0.7 - pantPuff * 0.65})`;
        ctx.beginPath();
        ctx.arc(28 + pantPuff * 14, -160 + pantPuff * 8, 3.5 + pantPuff * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // end character transform

        drawPill(ctx, currentLang === 'zh'
          ? '狂奔耗盡體力且使火勢猛烈！立即停步氣喘站定，切斷風勢對流！'
          : 'Exhausted from running! Halt movement immediately to cut convective airflow!', w * 0.5, groundY - 14, 'rgba(15,23,42,0.85)', '#fca5a5', 11, 16, 5);

      } else if (isAct3) {
        // ACT 3: Dropping / Laying down on the ground, covering face! (20% slower, smooth descent)
        drawPill(ctx, currentLang === 'zh'
          ? '🧎 步驟 2：躺 (DROP) - 順勢趴躺地面，雙手緊摀臉部！'
          : '🧎 STEP 2: DROP - DROP DOWN TO FLOOR, CUP HANDS OVER FACE!', w * 0.5, 30, '#f59e0b', '#000000', 14, 24, 9);

        const dropT = Math.min(1.0, (cycle - 700) / 190);
        const easeT = dropT * dropT * (3 - 2 * dropT);

        const hipY = (groundY - 80) + easeT * 60;
        const torsoAngle = 0.26 + easeT * (Math.PI / 2 - 0.26);
        const personX = centerX;

        ctx.save();
        ctx.translate(personX, hipY);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-45 * easeT, 10 * easeT);
        ctx.lineTo(-80 * easeT, 15 * easeT);
        ctx.stroke();

        ctx.rotate(torsoAngle);
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-16, -75, 32, 75, 8);
        ctx.fill();

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(0, -92, 16, 0, Math.PI * 2);
        ctx.fill();

        // Hands covering face firmly
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.roundRect(-12, -98, 24, 18, 5);
        ctx.fill();

        // Fire on back lowering into floor contact
        drawEnchantedFire(ctx, -16, -38, 28, 45 * (1 - easeT * 0.4), 0.95, 0, frame);

        ctx.restore();

        drawPill(ctx, currentLang === 'zh'
          ? '雙手緊摀口鼻與雙眼，保護呼吸道不被高溫熱氣灼傷！'
          : 'Cup hands firmly over mouth, nose, and eyes to protect airway!', w * 0.5, groundY - 14, 'rgba(15,23,42,0.85)', '#fef08a', 11, 16, 5);

      } else if (isAct4) {
        // ACT 4: Spin around until the fire is out! (20% slower rolling spin & smothering)
        drawPill(ctx, currentLang === 'zh'
          ? '🔄 步驟 3：滾 (ROLL) - 來回翻滾壓滅火苗！完全撲滅！'
          : '🔄 STEP 3: ROLL - ROLL BACK & FORTH TO SMOTHER ALL FLAMES!', w * 0.5, 30, '#10b981', '#ffffff', 14, 24, 9);

        const rollCycle = (cycle - 910) * 0.064;
        const rollX = centerX + Math.sin(rollCycle * 0.5) * 90;
        const rollY = groundY - 22;
        const rollAngle = rollCycle * 1.25;

        const rollProgress = Math.min(1.0, (cycle - 910) / 525);
        const remainingFire = Math.max(0, 1.0 - rollProgress);

        ctx.save();
        ctx.translate(rollX, rollY);
        ctx.rotate(rollAngle);

        // Cylindrical Torso
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(-28, -14, 56, 28, 10);
        ctx.fill();

        // Head with covered face
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(36, 0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(26, -10, 16, 20);

        // Legs wrapped together extending left
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(-70, -10, 44, 20, 6);
        ctx.fill();

        // Shrinking fire on body as it is smothered
        if (remainingFire > 0.05) {
          drawEnchantedFire(ctx, -6, 0, 24 * remainingFire, 32 * remainingFire, remainingFire, 0, frame * 1.5);
        }

        ctx.restore();

        // Steam puffs and smothered ember particles
        if (remainingFire > 0.05 && Math.random() < 0.7) {
          fireExtinguishPuffs.push({
            x: rollX + (Math.random() - 0.5) * 45,
            y: groundY - 8,
            radius: Math.random() * 14 + 6,
            life: 1.0
          });
        }

        for (let p = fireExtinguishPuffs.length - 1; p >= 0; p--) {
          const puff = fireExtinguishPuffs[p];
          puff.y -= 0.8;
          puff.radius *= 1.04;
          puff.life -= 0.035;
          if (puff.life <= 0) {
            fireExtinguishPuffs.splice(p, 1);
            continue;
          }
          ctx.fillStyle = `rgba(226, 232, 240, ${puff.life * 0.7})`;
          ctx.beginPath();
          ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        if (remainingFire > 0.05) {
          drawPill(ctx, `🔥 ${currentLang === 'zh' ? '翻滾阻絕空氣中' : 'Smothering Flames'} (${Math.round(remainingFire * 100)}%)`, w * 0.5, groundY - 145, 'rgba(15, 23, 42, 0.9)', '#f59e0b', 12, 22, 8, '#f59e0b');
        } else {
          drawPill(ctx, `✅ ${currentLang === 'zh' ? '火焰完全壓熄！口鼻安全！' : 'FLAMES COMPLETELY EXTINGUISHED!'}`, w * 0.5, groundY - 145, '#065f46', '#a7f3d0', 12, 24, 8, '#10b981');
        }

      } else {
        // ACT 5: Fire completely extinguished! Lying safely on the ground, victorious!
        drawPill(ctx, currentLang === 'zh'
          ? '✅ 示範成功：火焰完全撲滅！保護口鼻無嗆傷！'
          : '✅ SUCCESS: FLAMES EXTINGUISHED! AIRWAY PROTECTED!', w * 0.5, 30, '#065f46', '#a7f3d0', 14, 24, 9);

        const bodyY = groundY - 24;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(centerX - 95, bodyY + 4, 65, 18);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(centerX - 35, bodyY - 2, 65, 24);
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.arc(centerX + 42, bodyY + 8, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(centerX + 42, bodyY + 2, 17, Math.PI * 0.8, Math.PI * 2.1);
        ctx.fill();

        // Extinguished smoke wisps drifting gently
        if (Math.random() < 0.25) {
          fireExtinguishPuffs.push({
            x: centerX - 10 + (Math.random() - 0.5) * 30,
            y: bodyY - 5,
            radius: Math.random() * 8 + 4,
            life: 0.8
          });
        }
        for (let p = fireExtinguishPuffs.length - 1; p >= 0; p--) {
          const puff = fireExtinguishPuffs[p];
          puff.y -= 0.6;
          puff.radius *= 1.03;
          puff.life -= 0.025;
          if (puff.life <= 0) {
            fireExtinguishPuffs.splice(p, 1);
            continue;
          }
          ctx.fillStyle = `rgba(226, 232, 240, ${puff.life * 0.5})`;
          ctx.beginPath();
          ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        drawPill(ctx, currentLang === 'zh'
          ? '✅ 衣服著火：停、躺、滾完整動作示範完畢'
          : '✅ Stop, Drop, and Roll demonstration complete', w * 0.5, groundY - 85, 'rgba(15,23,42,0.9)', '#10b981', 12, 22, 8, '#10b981');
      }
    }

    // =============================================================
    // SCENE 4: SHELTER-IN-PLACE & SIGNAL (關門塞縫、開窗呼救)
    // =============================================================
    else if (currentAction === 4) {
      // Cycle: 1680 frames (~28 seconds)
      const cycle = (actionTimer % 1680);
      const isZh = currentLang === 'zh';

      const isAct1 = cycle < 340;
      const isAct2 = cycle >= 340 && cycle < 720;
      const isAct3 = cycle >= 720 && cycle < 1100;
      const isAct4 = cycle >= 1100;

      const roomX = w * 0.22;
      const roomW = w * 0.75;
      const roomY = 45;
      const roomH = groundY - roomY;

      // -------------------------------------------------------------
      // ACT 2: ZOOM IN ON HANDS WITH WET TOWEL
      // -------------------------------------------------------------
      if (isAct2) {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, 0, w, h);

        const spotGrad = ctx.createRadialGradient(w * 0.5, h * 0.48, 50, w * 0.5, h * 0.48, 300);
        spotGrad.addColorStop(0, 'rgba(30, 58, 138, 0.35)');
        spotGrad.addColorStop(1, 'rgba(9, 13, 22, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, w, h);

        const lensX = w * 0.5;
        const lensY = h * 0.48;
        const lensR = 145;

        ctx.save();
        ctx.beginPath();
        ctx.arc(lensX, lensY, lensR, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.clip();

        // Lens Grid
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lensX - lensR, lensY); ctx.lineTo(lensX + lensR, lensY);
        ctx.moveTo(lensX, lensY - lensR); ctx.lineTo(lensX, lensY + lensR);
        ctx.stroke();

        // Rolled heavy damp cloth cylinder
        const towelRollW = 160;
        const towelRollH = 46;
        const towelRollX = lensX - towelRollW / 2;
        const towelRollY = lensY - towelRollH / 2 + Math.sin(frame * 0.1) * 3;

        const clothGrad = ctx.createLinearGradient(towelRollX, towelRollY, towelRollX, towelRollY + towelRollH);
        clothGrad.addColorStop(0, '#1d4ed8');
        clothGrad.addColorStop(0.3, '#3b82f6');
        clothGrad.addColorStop(0.7, '#2563eb');
        clothGrad.addColorStop(1, '#1e3a8a');
        ctx.fillStyle = clothGrad;
        ctx.beginPath();
        ctx.roundRect(towelRollX, towelRollY, towelRollW, towelRollH, 14);
        ctx.fill();
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cloth woven folds & twists
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 2.2;
        for (let s = 0; s < 5; s++) {
          const fx = towelRollX + 25 + s * 28;
          ctx.beginPath();
          ctx.moveTo(fx, towelRollY + 4);
          ctx.quadraticCurveTo(fx + 8, towelRollY + towelRollH / 2, fx, towelRollY + towelRollH - 4);
          ctx.stroke();
        }

        // Left Hand
        const leftHandX = lensX - 55;
        const leftHandY = towelRollY + towelRollH / 2;
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(leftHandX - 85, leftHandY - 18, 55, 36);
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.roundRect(leftHandX - 35, leftHandY - 24, 38, 48, 10);
        ctx.fill();
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 1.8;
        for (let f = 0; f < 3; f++) {
          ctx.beginPath();
          ctx.moveTo(leftHandX - 18, leftHandY - 14 + f * 12);
          ctx.lineTo(leftHandX - 4, leftHandY - 14 + f * 12);
          ctx.stroke();
        }

        // Right Hand
        const rightHandX = lensX + 55;
        const rightHandY = towelRollY + towelRollH / 2;
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(rightHandX + 30, rightHandY - 18, 55, 36);
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.roundRect(rightHandX - 4, rightHandY - 24, 38, 48, 10);
        ctx.fill();
        for (let f = 0; f < 3; f++) {
          ctx.beginPath();
          ctx.moveTo(rightHandX + 4, rightHandY - 14 + f * 12);
          ctx.lineTo(rightHandX + 18, rightHandY - 14 + f * 12);
          ctx.stroke();
        }

        // Animated Water Droplets
        for (let d = 0; d < 4; d++) {
          const dropProgress = ((frame * 0.08 + d * 0.25) % 1);
          const dropX = lensX - 40 + d * 26;
          const dropY = towelRollY + towelRollH + dropProgress * 65;
          const dropAlpha = 1.0 - dropProgress;

          ctx.fillStyle = `rgba(56, 189, 248, ${dropAlpha * 0.85})`;
          ctx.beginPath();
          ctx.ellipse(dropX, dropY, 3, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Close-up HUD labels
        drawPill(ctx, isZh
          ? '🔍 特寫：將毛巾浸濕、擰至微濕不滴水，緊實捲摺！'
          : '🔍 Close-up: Dampen towels, wring till moist, and roll tightly!', w * 0.5, 35, '#0284c7', '#ffffff', 13, 24, 8);
        drawPill(ctx, isZh
          ? '💧 微濕毛巾能有效吸附高溫微粒與濃煙，若無水源，乾毛巾或衣物亦具封堵效果！'
          : '💧 Moist towels block toxic smoke; if dry, clothing still blocks airflow!', w * 0.5, h - 35, 'rgba(15,23,42,0.92)', '#93c5fd', 11, 20, 6);
      } else {
        // ==============================================================
        // SCENE FOR ACTS 1, 3, and 4
        // ==============================================================

        // Left Outer Hallway
        const hallW = roomX;
        ctx.fillStyle = '#180505';
        ctx.fillRect(0, 0, hallW, groundY);

        let fireHeight = 0;
        if (isAct1) {
          if (cycle < 60) fireHeight = 0;
          else {
            const grow = Math.min(1.0, (cycle - 60) / 120);
            fireHeight = grow * 210;
          }
        } else {
          fireHeight = 210;
        }

        if (fireHeight > 10) {
          drawEnchantedFire(ctx, hallW * 0.35, groundY, 40, fireHeight * 0.85, 1.2, 4, frame * 1.1, true);
          drawEnchantedFire(ctx, hallW * 0.65, groundY, 55, fireHeight, 1.45, -5, frame * 1.3, true);

          drawPill(ctx, isZh ? '🔥 走廊已是猛烈火海！(切勿開門！)' : '🔥 Hallway Blocked by Fire!', hallW * 0.5, 30, 'rgba(239,68,68,0.95)', '#ffffff', 10, 12, 5);
        } else {
          drawPill(ctx, isZh ? '🚪 寢室走廊通道' : '🚪 Dormitory Hallway', hallW * 0.5, 30, 'rgba(30,41,59,0.85)', '#94a3b8', 10, 12, 5);
        }

        // Safe Room Interior
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(roomX, roomY, roomW, roomH);

        // Floor
        ctx.fillStyle = '#060911';
        ctx.fillRect(0, groundY, w, h - groundY);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(w, groundY);
        ctx.stroke();

        // Skirting board
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(roomX, groundY - 14, roomW, 14);

        // HEAVY DORM FIRE DOOR (Closed tightly)
        const doorThick = 20;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(roomX, roomY, doorThick, roomH);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(roomX, roomY, doorThick, roomH);

        // Door handle & lock
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(roomX + doorThick - 6, groundY - 100, 12, 6);
        ctx.fillRect(roomX + doorThick - 4, groundY - 116, 8, 8);

        // Central AC Unit (Off notice)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(roomX + roomW * 0.35, roomY + 12, 110, 24);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(roomX + roomW * 0.35, roomY + 12, 110, 24);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(isZh ? '🚫 中央空調已關閉 (AC OFF)' : '🚫 CENTRAL AC OFF', roomX + roomW * 0.35 + 55, roomY + 28);

        // Large Window on the Far Right
        const winX = w - 130;
        const winY = roomY + 30;
        const winW = 105;
        const winH = 175;

        ctx.fillStyle = '#020617';
        ctx.fillRect(winX, winY, winW, winH);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(winX + 25, winY + 25, 2, 2);
        ctx.fillRect(winX + 65, winY + 45, 2, 2);
        ctx.fillRect(winX + 85, winY + 80, 2, 2);

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3.5;
        ctx.strokeRect(winX, winY, winW, winH);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY); ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH / 2); ctx.lineTo(winX + winW, winY + winH / 2);
        ctx.stroke();

        // ==============================================================
        // ACT SPECIFIC BEHAVIOR
        // ==============================================================

        if (isAct1) {
          drawPill(ctx, cycle < 60
            ? (isZh ? '🏠 寢室原狀：聽聞走廊有異常爆裂聲響與警報！' : '🏠 Dorm: Smoke alarm sounds from hallway!')
            : (isZh ? '🚪 走廊已全面起火！切勿隨意外出！立即緊閉房門阻絕火勢！' : '🚪 Hallway inferno! Keep door shut tight!'), w * 0.60, 30, cycle < 60 ? '#0284c7' : '#ef4444', '#ffffff', 12, 20, 8);

          const pX = roomX + 65;
          const pY = groundY;

          ctx.fillStyle = '#1e293b';
          ctx.fillRect(pX - 14, pY - 85, 12, 85);
          ctx.fillRect(pX + 2, pY - 85, 12, 85);

          ctx.fillStyle = '#0284c7';
          ctx.fillRect(pX - 18, pY - 165, 36, 80);

          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.arc(pX - 4, pY - 188, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(pX - 4, pY - 195, 17, Math.PI * 0.9, Math.PI * 2.1);
          ctx.fill();

          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(pX - 12, pY - 150);
          ctx.lineTo(roomX + doorThick + 4, pY - 130);
          ctx.stroke();

          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.arc(roomX + doorThick + 4, pY - 130, 6, 0, Math.PI * 2);
          ctx.fill();

          if (cycle >= 60) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.beginPath();
            ctx.arc(roomX + doorThick + 15 + (frame * 0.8) % 35, groundY - 4, 6 + (frame * 0.1) % 5, 0, Math.PI * 2);
            ctx.fill();

            drawPill(ctx, isZh
              ? '⚠️ 門縫開始滲入高溫毒煙！必須立刻取毛巾/衣物塞緊門縫！'
              : '⚠️ Toxic smoke leaking through door crack! Seal it now!', w * 0.55, groundY - 18, 'rgba(15,23,42,0.9)', '#fca5a5', 11, 16, 5);
          }

        } else if (isAct3) {
          drawPill(ctx, isZh
            ? '💧 步驟 3：塞緊門縫！將濕毛巾/衣物緊實塞滿門下縫隙！'
            : '💧 Step 3: Seal Door Cracks with Damp Towels & Linens!', w * 0.60, 30, '#10b981', '#ffffff', 12, 22, 8);

          const pX = roomX + 85;
          const pY = groundY;

          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.roundRect(pX - 5, pY - 26, 45, 24, 8);
          ctx.fill();

          ctx.save();
          ctx.translate(pX, pY);
          ctx.rotate(-0.4);
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.roundRect(-22, -65, 34, 65, 8);
          ctx.fill();

          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.arc(-16, -78, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(-16, -83, 15, Math.PI * 0.9, Math.PI * 2.1);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(pX - 5, pY - 45);
          ctx.lineTo(roomX + doorThick + 30, pY - 12);
          ctx.stroke();

          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.arc(roomX + doorThick + 30, pY - 12, 6, 0, Math.PI * 2);
          ctx.fill();

          // Rolled towels
          const towelBaseX = roomX + doorThick - 4;
          const towelBaseY = groundY - 14;
          const towelW = 95;
          const towelH = 14;

          const towelGrad1 = ctx.createLinearGradient(towelBaseX, towelBaseY, towelBaseX, towelBaseY + towelH);
          towelGrad1.addColorStop(0, '#1e40af');
          towelGrad1.addColorStop(0.5, '#3b82f6');
          towelGrad1.addColorStop(1, '#1d4ed8');
          ctx.fillStyle = towelGrad1;
          ctx.beginPath();
          ctx.roundRect(towelBaseX, towelBaseY, towelW, towelH, 6);
          ctx.fill();
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          const towelGrad2 = ctx.createLinearGradient(towelBaseX + 6, towelBaseY - 10, towelBaseX + 6, towelBaseY + 2);
          towelGrad2.addColorStop(0, '#2563eb');
          towelGrad2.addColorStop(0.5, '#60a5fa');
          towelGrad2.addColorStop(1, '#1e40af');
          ctx.fillStyle = towelGrad2;
          ctx.beginPath();
          ctx.roundRect(towelBaseX + 8, towelBaseY - 10, towelW - 16, 12, 5);
          ctx.fill();
          ctx.strokeStyle = '#93c5fd';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.fillRect(towelBaseX - 4, groundY - 3, towelW + 8, 3);

          drawPill(ctx, isZh
            ? '✅ 門縫已完全封堵！濃煙與劇毒一氧化碳無法滲入！'
            : '✅ Door crack sealed! Blocks deadly smoke & gases!', w * 0.55, groundY - 18, '#065f46', '#a7f3d0', 11, 20, 6, '#10b981');

        } else {
          // ACT 4: Student at window frantically calling for help
          drawPill(ctx, isZh
            ? '🪟 步驟 4：開窗呼救！揮舞鮮豔布條、照手電筒！切勿盲目跳樓！'
            : '🪟 Step 4: Signal from Window! Wave Bright Cloth & Flashlight! Never Jump!', w * 0.60, 30, '#0284c7', '#ffffff', 12, 22, 8);

          // Rolled towels remain placed
          const towelBaseX = roomX + doorThick - 4;
          const towelBaseY = groundY - 14;
          const towelW = 95;
          const towelH = 14;
          ctx.fillStyle = '#1e40af';
          ctx.beginPath();
          ctx.roundRect(towelBaseX, towelBaseY, towelW, towelH, 6);
          ctx.fill();
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.roundRect(towelBaseX + 8, towelBaseY - 10, towelW - 16, 12, 5);
          ctx.fill();

          // FRANTIC EVACUEE AT WINDOW
          const personWinX = winX - 16;
          const personWinY = winY + 95;

          // Grounded Legs
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(personWinX - 16, personWinY + 30, 11, groundY - (personWinY + 30));
          ctx.fillRect(personWinX + 1, personWinY + 30, 11, groundY - (personWinY + 30));

          // Shoes
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(personWinX - 18, groundY - 6, 14, 6);
          ctx.fillRect(personWinX, groundY - 6, 14, 6);

          // Torso leaning forward toward window opening
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.roundRect(personWinX - 22, personWinY - 30, 36, 62, 6);
          ctx.fill();

          // Head looking out window, mouth open shouting frantically!
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.arc(personWinX + 6, personWinY - 45, 15, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(personWinX + 6, personWinY - 52, 16, Math.PI * 0.85, Math.PI * 2.15);
          ctx.fill();

          // Open mouth shouting
          ctx.fillStyle = '#7f1d1d';
          ctx.beginPath();
          ctx.ellipse(personWinX + 16, personWinY - 42, 3.5, 6, 0, 0, Math.PI * 2);
          ctx.fill();

          // FRANTIC ARM 1: Waving Bright Neon Yellow Cloth outside window!
          const waveAngle = Math.sin(frame * 0.32) * 0.65;
          ctx.save();
          ctx.translate(personWinX + 18, personWinY - 40);
          ctx.rotate(waveAngle);

          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 9;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(30, -22);
          ctx.stroke();

          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.moveTo(30, -22);
          ctx.lineTo(65, -42 + Math.sin(frame * 0.5) * 12);
          ctx.lineTo(58, -6 + Math.sin(frame * 0.5 + 1.2) * 12);
          ctx.lineTo(30, -10);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          // FRANTIC ARM 2: Holding Flashlight with Wide Sweeping Cone of Light
          const beamAngle = -0.22 + Math.sin(frame * 0.18) * 0.35;
          ctx.save();
          ctx.translate(personWinX + 14, personWinY - 14);
          ctx.rotate(beamAngle);

          ctx.fillStyle = '#334155';
          ctx.fillRect(0, -5, 20, 10);

          const beamGrad = ctx.createRadialGradient(20, 0, 6, 170, 0, 190);
          beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
          beamGrad.addColorStop(0.6, 'rgba(253, 224, 71, 0.45)');
          beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
          ctx.fillStyle = beamGrad;
          ctx.beginPath();
          ctx.moveTo(20, 0);
          ctx.lineTo(190, -55);
          ctx.lineTo(190, 55);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          // Emergency Fire Engine strobe reflections
          const strobe = Math.sin(frame * 0.35) > 0;
          ctx.fillStyle = strobe ? 'rgba(239, 68, 68, 0.35)' : 'rgba(56, 189, 248, 0.35)';
          ctx.fillRect(winX - 45, winY + 20, 40, winH - 40);

          // Speech Bubble: "HELP! 救命！" (Positioned carefully so it doesn't clip)
          drawPill(ctx, isZh ? '🗣️「救命！我們在 4 樓寢室！」' : '🗣️ "HELP! WE ARE ON 4F!"', winX - 25, winY - 14, '#ffffff', '#0f172a', 11, 14, 5, '#ef4444');

          drawPill(ctx, isZh
            ? '✅ 保持冷靜！讓搜救人員精準定位！切勿跳樓！耐心等待雲梯車與搜救隊！'
            : '✅ Stay calm & signal location! Never jump! Wait for ladder rescue!', w * 0.5, groundY - 18, '#065f46', '#a7f3d0', 11, 20, 6, '#10b981');
        }
      }
    }

    // =============================================================
    // CINEMATIC ACTION-TO-ACTION TRANSITION OVERLAY
    // =============================================================
    if (transitionTimer > 0) {
      const progress = 1.0 - (transitionTimer / TRANSITION_DURATION); // 0.0 -> 1.0
      // Smooth cubic ease-in-out curve
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      ctx.save();

      // Wipe seam position moving from right (w) to left (0)
      const seamX = (1.0 - ease) * w;

      // Draw the previous scene clipped to [0, 0, seamX, h]
      if (prevActionCanvas.width > 0 && seamX > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, seamX, h);
        ctx.clip();
        ctx.drawImage(prevActionCanvas, 0, 0);

        // Subtle 3D shadow along the left of the trailing edge
        const shadowGrad = ctx.createLinearGradient(seamX - 30, 0, seamX, 0);
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(seamX - 30, 0, 30, h);
        ctx.restore();
      }

      // High-tech Glowing Laser / Energy Seam
      const seamGrad = ctx.createLinearGradient(seamX - 20, 0, seamX + 20, 0);
      seamGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      seamGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.55)');
      seamGrad.addColorStop(0.5, '#ffffff');
      seamGrad.addColorStop(0.65, 'rgba(249, 115, 22, 0.55)');
      seamGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');

      ctx.fillStyle = seamGrad;
      ctx.fillRect(seamX - 20, 0, 40, h);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(seamX, 0);
      ctx.lineTo(seamX, h);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Sparkles along seam
      for (let s = 0; s < 8; s++) {
        const sparkY = ((frame * 6 + s * 67) % h);
        const sparkOffset = Math.sin(frame * 0.25 + s) * 7;
        ctx.fillStyle = (s % 2 === 0) ? '#fef08a' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(seamX + sparkOffset, sparkY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center Motion Card announcing the action transition
      const actionTitles = {
        1: { zh: '動作一：摸門測溫 (DOOR HEAT CHECK)', en: 'ACTION 1: DOOR HEAT CHECK' },
        2: { zh: '動作二：低姿勢爬行避濃煙 (CRAWL LOW)', en: 'ACTION 2: CRAWL LOW UNDER SMOKE' },
        3: { zh: '動作三：停、躺、滾 (STOP, DROP & ROLL)', en: 'ACTION 3: STOP, DROP & ROLL' },
        4: { zh: '動作四：關門塞縫、開窗呼救 (SHELTER & SIGNAL)', en: 'ACTION 4: SHELTER & SIGNAL' }
      };

      const targetTitle = actionTitles[transitionTo]
        ? (currentLang === 'zh' ? actionTitles[transitionTo].zh : actionTitles[transitionTo].en)
        : `ACTION ${transitionTo}`;

      const pillAlpha = Math.sin(progress * Math.PI);
      if (pillAlpha > 0.05) {
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, pillAlpha * 1.25);
        drawPill(
          ctx,
          `⚡ NEXT ➔ ${targetTitle}`,
          w * 0.5,
          h * 0.5,
          'rgba(15, 23, 42, 0.94)',
          '#38bdf8',
          13,
          26,
          10,
          '#0284c7'
        );
        ctx.restore();
      }

      ctx.restore();

      transitionTimer -= Math.max(0.5, playbackSpeed);
      if (transitionTimer < 0) transitionTimer = 0;
    }

    // Auto-advance timer logic (Action 1: 24s; Action 2: 30s [20% slower]; Action 3: 28s; Action 4: 28s)
    const currentActionDuration = (currentAction === 1) ? 1440 : (currentAction === 2 ? 1800 : (currentAction === 3 || currentAction === 4 ? 1680 : actionDuration));
    if (isPlaying) {
      actionTimer += playbackSpeed;
      const progressPercent = Math.min(100, (actionTimer / currentActionDuration) * 100);
      const progressBar = document.getElementById('survivalProgressBar');
      if (progressBar) progressBar.style.width = `${progressPercent}%`;

      if (actionTimer >= currentActionDuration) {
        let nextAction = currentAction + 1;
        if (nextAction > 4) nextAction = 1;
        setAction(nextAction, false);
      }
    } else {
      const progressBar = document.getElementById('survivalProgressBar');
      if (progressBar) progressBar.style.width = '100%';
    }

    requestAnimationFrame(render);
  }

  updatePlayPauseUI();
  render();
}

/* ==========================================================================
   4. P.A.S.S. EXTINGUISHER MOTION SIMULATOR (Section 3)
   ========================================================================== */
function initPassMotionSimulator() {
  const canvas = document.getElementById('passCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let currentStep = 1;
  let isPlaying = true;
  const fireParticles = [];
  const foamParticles = [];
  let fireIntensity = 1.0;
  let frame = 0;

  function setStep(step) {
    currentStep = step;
    document.querySelectorAll('.pass-step-btn[data-step]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.step) === step);
    });

    const badgeEl = document.getElementById('passStepBadge');
    const textEl = document.getElementById('passStepText');
    const t = i18nData[currentLang];
    const info = t.s3_stepsInfo[step];

    if (badgeEl && info) badgeEl.textContent = info.badge;
    if (textEl && info) textEl.textContent = info.text;

    fireIntensity = step === 4 ? 0.2 : 1.0;
  }

  document.querySelectorAll('.pass-step-btn[data-step]').forEach(btn => {
    btn.addEventListener('click', () => setStep(parseInt(btn.dataset.step)));
  });

  const playPauseBtn = document.getElementById('passPlayPauseBtn');
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      const t = i18nData[currentLang];
      playPauseBtn.textContent = isPlaying ? t.s3_pause : t.s3_play;
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    frame++;

    // Ground plane
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, h - 50, w, 50);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.moveTo(0, h - 50);
    ctx.lineTo(w, h - 50);
    ctx.stroke();

    // 1. Fire Target (Right side)
    const fireX = w * 0.75;
    const fireY = h - 55;

    ctx.fillStyle = '#3e1e07';
    ctx.fillRect(fireX - 45, fireY + 8, 90, 16);

    if (Math.random() < 0.7 * fireIntensity) {
      fireParticles.push({
        x: fireX + (Math.random() - 0.5) * 70,
        y: fireY,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 4 - 2.5,
        radius: Math.random() * 20 + 10,
        life: 1.0,
        color: Math.random() > 0.45 ? 'rgba(239, 68, 68,' : 'rgba(245, 158, 11,'
      });
    }

    for (let i = fireParticles.length - 1; i >= 0; i--) {
      const p = fireParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.radius *= 0.96;
      p.life -= 0.025;

      if (p.life <= 0 || p.radius < 2) {
        fireParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.life * 0.85})`;
      ctx.fill();
    }

    // 2. Extinguisher (Left side)
    const extX = w * 0.25;
    const extY = h - 180;

    ctx.save();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.roundRect(extX - 28, extY, 56, 120, [16, 16, 8, 8]);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(extX - 22, extY + 35, 44, 45);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ABC', extX, extY + 54);
    ctx.fillText('FIRE', extX, extY + 68);

    ctx.fillStyle = '#475569';
    ctx.fillRect(extX - 10, extY - 20, 20, 20);

    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(extX - 14, extY - 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(extX - 14, extY - 10, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(extX, extY - 16);
    if (currentStep >= 3) {
      ctx.lineTo(extX + 32, extY - 12);
    } else {
      ctx.lineTo(extX + 32, extY - 30);
    }
    ctx.stroke();

    if (currentStep === 1) {
      const pinGlow = Math.sin(frame * 0.1) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(245, 158, 11, ${0.4 + pinGlow * 0.6})`;
      ctx.beginPath();
      ctx.arc(extX + 6, extY - 16, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(currentLang === 'zh' ? '⚡ 拉插銷' : '⚡ PULL PIN', extX + 16, extY - 36);
    }

    let nozzleX = extX + 45;
    let nozzleY = extY + 40;

    if (currentStep === 2 || currentStep === 3 || currentStep === 4) {
      nozzleX = extX + 100;
      nozzleY = fireY - 10;
      if (currentStep === 4) {
        const sweep = Math.sin(frame * 0.08) * 45;
        nozzleX += sweep;
      }
    }

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(extX - 6, extY - 12);
    ctx.quadraticCurveTo(extX - 25, extY + 50, nozzleX, nozzleY);
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(nozzleX, nozzleY, 7, 0, Math.PI * 2);
    ctx.fill();

    if (currentStep >= 3 && isPlaying) {
      for (let s = 0; s < 5; s++) {
        foamParticles.push({
          x: nozzleX,
          y: nozzleY,
          vx: (fireX - nozzleX) * 0.028 + (Math.random() - 0.5) * 2.5,
          vy: (fireY - nozzleY) * 0.028 + (Math.random() - 0.5) * 2.5,
          radius: Math.random() * 9 + 4,
          life: 1.0
        });
      }
    }

    for (let f = foamParticles.length - 1; f >= 0; f--) {
      const foam = foamParticles[f];
      foam.x += foam.vx;
      foam.y += foam.vy;
      foam.radius *= 1.03;
      foam.life -= 0.03;

      if (foam.life <= 0) {
        foamParticles.splice(f, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(foam.x, foam.y, foam.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(241, 245, 249, ${foam.life * 0.9})`;
      ctx.fill();
    }

    ctx.restore();

    if (isPlaying && frame % 180 === 0) {
      let next = currentStep + 1;
      if (next > 4) next = 1;
      setStep(next);
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   5. ACCURATE DORMITORY EVACUATION CANVAS (Section 4)
   ========================================================================== */
function initDormEvacuationCanvas() {
  const canvas = document.getElementById('dormPlanCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 480;
  }
  resize();
  window.addEventListener('resize', resize);

  const evacuees = [
    { x: 75, y: 85, targetX: 234, targetY: 28, speed: 1.1, label: "X01" },
    { x: 110, y: 85, targetX: 234, targetY: 28, speed: 1.3, label: "X02" },
    { x: 180, y: 85, targetX: 234, targetY: 28, speed: 1.2, label: "X04" },
    { x: 450, y: 85, targetX: 234, targetY: 28, speed: 1.2, label: "X08" },
    { x: 450, y: 200, targetX: 370, targetY: 417, speed: 1.4, label: "X13" },
    { x: 450, y: 320, targetX: 370, targetY: 417, speed: 1.3, label: "X17" },
    { x: 315, y: 370, targetX: 370, targetY: 417, speed: 1.2, label: "X22" },
    { x: 235, y: 370, targetX: 370, targetY: 417, speed: 1.1, label: "X24" },
    { x: 115, y: 370, targetX: 370, targetY: 417, speed: 1.0, label: "X27" }
  ];

  let frame = 0;

  function drawDormPlan() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    const w = canvas.width;
    const h = canvas.height;
    const scaleX = w / 600;
    const scaleY = h / 480;

    ctx.save();
    ctx.scale(scaleX, scaleY);

    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, 600, 480);

    // Hollow central courtyard
    ctx.fillStyle = '#060913';
    ctx.fillRect(100, 105, 340, 245);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(100, 105, 340, 245);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentLang === 'zh' ? '中庭天井 (中央中空無建物)' : 'OPEN CENTRAL COURTYARD (VOID ATRIUM)', 270, 222);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('NOTHING IN THE MIDDLE / LIGHTWELL VOID', 270, 238);

    // Corridors
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.fillRect(55, 65, 430, 40);
    ctx.fillRect(55, 65, 45, 325);
    ctx.fillRect(55, 350, 430, 45);
    ctx.fillRect(440, 65, 45, 325);

    function drawRoom(x, y, rw, rh, label) {
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.fillRect(x, y, rw, rh);
      ctx.strokeRect(x, y, rw, rh);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + rw / 2, y + rh / 2 + 3);
    }

    function drawStairs(x, y, rw, rh, label) {
      ctx.fillStyle = '#065f46';
      ctx.fillRect(x, y, rw, rh);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, rw, rh);

      const steps = 5;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 1.5;
      for (let s = 1; s < steps; s++) {
        const stepY = y + (rh / steps) * s;
        ctx.beginPath();
        ctx.moveTo(x + 4, stepY);
        ctx.lineTo(x + rw - 4, stepY);
        ctx.stroke();
      }

      ctx.fillStyle = '#a7f3d0';
      ctx.font = 'bold 8.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + rw / 2, y + rh / 2 + 3);
    }

    function drawLift(x, y, rw, rh, label) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x, y, rw, rh);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, rw, rh);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + rw / 2, y + rh / 2 + 3);
    }

    // Top row
    drawRoom(55, 15, 36, 50, 'X01');
    drawRoom(91, 15, 36, 50, 'X02');
    drawRoom(127, 15, 36, 50, 'X03');
    drawRoom(163, 15, 38, 50, 'X04');
    drawStairs(203, 15, 62, 26, currentLang === 'zh' ? '北側樓梯' : 'NORTH STAIRS');
    drawLift(203, 42, 62, 23, currentLang === 'zh' ? '電梯(禁搭)' : 'LIFT (NO)');

    // Left column
    const leftRooms = ['X44', 'X43', 'X41', 'X39', 'X37', 'X35', 'X33', 'X31', 'X30', 'X29'];
    leftRooms.forEach((r, idx) => {
      drawRoom(15, 65 + idx * 32, 40, 32, r);
    });

    // Right column
    const rightRooms = ['X08', 'X09', 'X10', 'X11', 'X12', 'X13', 'X14', 'X16', 'X17', 'X18'];
    rightRooms.forEach((r, idx) => {
      drawRoom(485, 65 + idx * 32, 40, 32, r);
    });

    // Bottom row
    const bottomRooms = ['X27', 'X26', 'X25', 'X24', 'X23', 'X22'];
    bottomRooms.forEach((r, idx) => {
      drawRoom(95 + idx * 40, 395, 40, 45, r);
    });
    drawStairs(338, 395, 65, 45, currentLang === 'zh' ? '南側樓梯' : 'SOUTH STAIRS');

    // 1F Exits Callouts
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(275, 17, 105, 22);
    ctx.strokeStyle = '#fca5a5';
    ctx.strokeRect(275, 17, 105, 22);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentLang === 'zh' ? '⬆ 1F車棚門(經樓梯)' : '⬆ 1F PARKING EXIT', 327, 31);

    const northPulse = Math.sin(frame * 0.1) * 3;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(234, 10 - northPulse);
    ctx.lineTo(228, 16 - northPulse);
    ctx.lineTo(240, 16 - northPulse);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(410, 406, 95, 22);
    ctx.strokeStyle = '#fca5a5';
    ctx.strokeRect(410, 406, 95, 22);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentLang === 'zh' ? '⬇ 1F前門大廳(經樓梯)' : '⬇ 1F MAIN EXIT', 457, 420);

    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.fillRect(485, 161, 40, 32);
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif';
    ctx.fillText('🔥', 505, 182);

    evacuees.forEach(e => {
      const dx = e.targetX - e.x;
      const dy = e.targetY - e.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        e.x += (dx / dist) * e.speed;
        e.y += (dy / dist) * e.speed;
      } else {
        if (e.label === 'X01') { e.x = 75; e.y = 85; }
        else if (e.label === 'X02') { e.x = 110; e.y = 85; }
        else if (e.label === 'X04') { e.x = 180; e.y = 85; }
        else if (e.label === 'X08') { e.x = 450; e.y = 85; }
        else if (e.label === 'X13') { e.x = 450; e.y = 200; }
        else if (e.label === 'X17') { e.x = 450; e.y = 320; }
        else if (e.label === 'X22') { e.x = 315; e.y = 370; }
        else if (e.label === 'X24') { e.x = 235; e.y = 370; }
        else { e.x = 115; e.y = 370; }
      }

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 7, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.restore();
    requestAnimationFrame(drawDormPlan);
  }

  drawDormPlan();
}

/* ==========================================================================
   6. CAMPUS ZONE FILTERS (Section 5)
   ========================================================================= */
function initZoneFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const zoneTiles = document.querySelectorAll('.zone-tile');

  filterBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      zoneTiles.forEach(tile => {
        if (filter === 'all' || tile.dataset.category === filter) {
          tile.style.display = 'block';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. DORM ROOM AUDIT (Section 6)
   ========================================================================= */
function initAuditGauge() {
  const checkboxes = document.querySelectorAll('.audit-check-label input[type="checkbox"]');
  const gauge = document.getElementById('auditCircularGauge');
  const pctText = document.getElementById('auditGaugePct');
  const statusBadge = document.getElementById('auditStatusBadge');

  function updateAudit() {
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checked++;
    });

    const pct = Math.round((checked / total) * 100);
    if (pctText) pctText.textContent = `${pct}%`;

    const t = i18nData[currentLang];
    let color = '#ef4444';
    let status = t.s6_statusHigh;

    if (pct >= 85) {
      color = '#10b981';
      status = t.s6_statusSafe;
    } else if (pct >= 50) {
      color = '#f59e0b';
      status = t.s6_statusMod;
    }

    if (gauge) {
      gauge.style.background = `conic-gradient(${color} 0% ${pct}%, rgba(255,255,255,0.08) ${pct}% 100%)`;
    }
    if (statusBadge) {
      statusBadge.textContent = status;
      statusBadge.style.color = color;
    }
  }

  window.updateAuditGaugeFunc = updateAudit;
  checkboxes.forEach(cb => cb.addEventListener('change', updateAudit));
  updateAudit();
}

/* ==========================================================================
   8. DECISION DRILLS (Section 7)
   ========================================================================= */
const scenarioBilingualData = {
  zh: [
    {
      badge: "情境演練 1 • 宿舍凌晨 3:00 火警警報",
      question: "當你在四樓寢室熟睡時，宿舍火警警報器突然大作，第一時間應採取何種行動？",
      options: [
        { text: "立刻收拾筆電、教科書與貴重個人衣物塞入背包。", correct: false },
        { text: "以手背觸摸房門與金屬門把確認溫度，攜帶寢室鑰匙與手機立即開門避難。", correct: true },
        { text: "認為一定是有人泡麵或烤麵包誤觸警報，繼續躺在床上睡覺。", correct: false },
        { text: "趕快跑到走廊搭乘電梯直達一樓大廳。", correct: false }
      ],
      feedback: "火災時分秒必爭，切勿因收拾物品延誤逃生！務必以手背感應門溫（若發燙表示門外已有火勢，應就地避難塞門縫），攜帶鑰匙可在走廊受阻時安全退回房內。"
    },
    {
      badge: "情境演練 2 • 公共廚房鍋具油鍋起火",
      question: "宿舍公共廚房瓦斯爐上的平底鍋油溫過高引燃起火，火焰跳竄，應如何處置？",
      options: [
        { text: "端起水槽旁的水杯直接朝油鍋澆水滅火。", correct: false },
        { text: "迅速從側面滑入金屬鍋蓋蓋住油鍋隔絕空氣，關閉瓦斯並靜置冷卻。", correct: true },
        { text: "慌張端起起火的油鍋打算端到水槽倒水。", correct: false },
        { text: "拿抹布持續在鍋上搧風試圖吹滅火焰。", correct: false }
      ],
      feedback: "油鍋起火絕對禁止澆水！水分遇熱油會瞬間汽化膨脹千倍，將燃燒熱油炸散形成巨大火球。應順勢蓋上金屬鍋蓋並關火冷卻。"
    },
    {
      badge: "情境演練 3 • 安全逃生梯內湧出濃煙",
      question: "推開北側安全梯（X04旁）防火門時，發現樓梯間內已充斥向上竄升之黑灰色濃煙，應如何決策？",
      options: [
        { text: "深吸一口氣，閉上眼睛低頭盲目往下衝。", correct: false },
        { text: "立刻關閉防火門阻隔濃煙竄入走廊，轉身改由次要逃生動線（南側安全梯）撤離。", correct: true },
        { text: "跑往頂樓等待直升機前來救援。", correct: false },
        { text: "停在梯間平台原地等候20分鐘。", correct: false }
      ],
      feedback: "濃煙含有致命一氧化碳與毒氣，是火災頭號殺手！樓梯間受濃煙污染時，切勿往下衝，應立即關門阻煙，並改走備用逃生路徑。"
    }
  ],

  en: [
    {
      badge: "Scenario 1 • Dorm 3:00 AM Night Alarm",
      question: "You are awakened by the building fire alarm at 3:00 AM in your 4th-floor dorm room. What is your first priority?",
      options: [
        { text: "Pack your laptop, textbooks, and phone charger into your backpack.", correct: false },
        { text: "Feel the dorm door with the back of your hand for heat, grab your room key, and evacuate.", correct: true },
        { text: "Assume it's a false alarm caused by burnt popcorn and stay in bed.", correct: false },
        { text: "Run to the hallway elevator to descend to the ground floor.", correct: false }
      ],
      feedback: "Never delay evacuation for possessions! Always check door temperature with the back of your hand. Take your room key so you can retreat and shelter in place if hallways are blocked."
    },
    {
      badge: "Scenario 2 • Communal Kitchen Stovetop Oil Fire",
      question: "A cooking pot catches fire on the communal stove and oil begins spattering. How do you respond?",
      options: [
        { text: "Pour tap water from the sink over the flaming pan.", correct: false },
        { text: "Slide a metal pot lid over the flames, turn off the stove, and leave it covered to smother.", correct: true },
        { text: "Carry the flaming pot quickly towards the hallway.", correct: false },
        { text: "Blow forcefully on the fire to blow out the flames.", correct: false }
      ],
      feedback: "Never throw water on burning oil! Water explodes into steam, aerosolizing burning oil into a deadly fireball. Slide a metal lid over the pan to cut off oxygen."
    },
    {
      badge: "Scenario 3 • Smoke in Stairwell",
      question: "You open the door to the North Stairwell (beside X04) and see thick smoke rising up the shaft. What is the correct protocol?",
      options: [
        { text: "Hold your breath and run down blindly through the smoke.", correct: false },
        { text: "Immediately close the stairwell door to block smoke, turn back, and proceed to the secondary emergency exit (South Stairs).", correct: true },
        { text: "Run up to the roof and call friends.", correct: false },
        { text: "Wait on the landing for 20 minutes.", correct: false }
      ],
      feedback: "Smoke contains lethal carbon monoxide and hydrogen cyanide. If an exit stair is compromised, close the door to prevent smoke spread and use your secondary exit."
    }
  ]
};

const drillUserChoices = {};

function initDrills() {
  const container = document.getElementById('drillsContainer');
  if (!container) return;
  container.innerHTML = '';

  const list = scenarioBilingualData[currentLang] || scenarioBilingualData['zh'];

  list.forEach((s, sIdx) => {
    const box = document.createElement('div');
    box.className = 'drill-box';

    const badge = document.createElement('span');
    badge.className = 'drill-badge';
    badge.textContent = s.badge;
    box.appendChild(badge);

    const title = document.createElement('h4');
    title.textContent = s.question;
    box.appendChild(title);

    const optList = document.createElement('div');
    optList.className = 'drill-options';

    const feedback = document.createElement('div');
    feedback.className = 'drill-feedback';

    s.options.forEach((opt, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'drill-opt-btn';
      btn.textContent = opt.text;

      function selectOption() {
        drillUserChoices[sIdx] = optIdx;
        optList.querySelectorAll('.drill-opt-btn').forEach(b => b.disabled = true);
        if (opt.correct) {
          btn.classList.add('correct');
          feedback.style.display = 'block';
          feedback.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
          feedback.style.border = '1px solid #10b981';
          feedback.style.color = '#a7f3d0';
          feedback.innerHTML = `<strong>${currentLang === 'zh' ? '✅ 正確處置 (Correct):' : '✅ Correct Action:'}</strong> ${s.feedback}`;
        } else {
          btn.classList.add('incorrect');
          feedback.style.display = 'block';
          feedback.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          feedback.style.border = '1px solid #ef4444';
          feedback.style.color = '#fca5a5';
          feedback.innerHTML = `<strong>${currentLang === 'zh' ? '❌ 危險處置 (Hazardous):' : '❌ Hazardous Choice:'}</strong> ${s.feedback}`;
        }
      }

      btn.addEventListener('click', selectOption);

      if (drillUserChoices[sIdx] === optIdx) {
        selectOption();
      }

      optList.appendChild(btn);
    });

    box.appendChild(optList);
    box.appendChild(feedback);
    container.appendChild(box);
  });
}

/* ==========================================================================
   9. WEB AUDIO SIREN DRILL + ANNOUNCEMENT
   ========================================================================== */
function initEmergencyAlarm() {
  const alarmButtons = document.querySelectorAll('.alarm-toggle-btn');
  if (!alarmButtons.length) return;
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isSounding = false;
  let lfoInterval = null;

  function toggleAlarm() {
    const t = i18nData[currentLang];

    if (!isSounding) {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioCtxClass();

        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(650, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();

        let freq = 650;
        let up = true;
        lfoInterval = setInterval(() => {
          freq = up ? freq + 40 : freq - 40;
          if (freq >= 1050) up = false;
          if (freq <= 600) up = true;
          if (oscillator && audioCtx) {
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
          }
        }, 30);

        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(t.voiceAnnouncement);
          utterance.lang = currentLang === 'zh' ? 'zh-TW' : 'en-US';
          utterance.rate = 1.0;
          window.speechSynthesis.speak(utterance);
        }

        isSounding = true;
        alarmButtons.forEach(b => {
          b.innerHTML = `<span>⏹️</span> <span id="alarmBtnLabel">${t.alarmBtnSilence}</span>`;
        });
        document.body.style.boxShadow = 'inset 0 0 50px rgba(239, 68, 68, 0.4)';
      } catch (err) {
        console.warn('AudioContext error', err);
      }
    } else {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      }
      if (lfoInterval) clearInterval(lfoInterval);
      if (audioCtx) audioCtx.close();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      isSounding = false;
      alarmButtons.forEach(b => {
        b.innerHTML = `<span>🚨</span> <span id="alarmBtnLabel">${t.alarmBtn}</span>`;
      });
      document.body.style.boxShadow = 'none';
    }
  }

  alarmButtons.forEach(b => b.addEventListener('click', toggleAlarm));
}

/* ==========================================================================
   10. AMBIENT INTERACTIVE PARTICLE BACKGROUND
   ========================================================================== */
function initAmbientParticles() {
  const canvas = document.getElementById('ambientBgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const particleCount = 55;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -Math.random() * 0.65 - 0.2,
      radius: Math.random() * 2.5 + 0.8,
      baseAlpha: Math.random() * 0.45 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '239, 68, 68' : '245, 158, 11'
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    frame++;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        p.x -= (dx / dist) * 0.9;
        p.y -= (dy / dist) * 0.9;
      }

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const alpha = p.baseAlpha + Math.sin(frame * p.pulseSpeed) * 0.15;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, Math.min(1, alpha))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color}, 0.55)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   9. MIRACLE ESCAPE & BUILDING COLLAPSE SIMULATOR (Section 9)
   ========================================================================== */
function initEscapeSimulator() {
  const canvas = document.getElementById('escapeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 460;
  }
  resize();
  window.addEventListener('resize', resize);

  let isPlaying = true;
  let playbackSpeed = 1.0;
  let escapeTimer = 0;
  const escapeDuration = 1680; // ~28s at 60fps
  let frame = 0;

  window.resumeEscapeSimulator = function() {
    isPlaying = true;
    updatePlayPauseUI();
  };

  const playPauseBtn = document.getElementById('escapePlayPauseBtn');
  const speedBtn = document.getElementById('escapeSpeedBtn');
  const replayBtn = document.getElementById('escapeReplayBtn');
  const progressBar = document.getElementById('escapeProgressBar');
  const badgeEl = document.getElementById('escapeStepBadge');
  const textEl = document.getElementById('escapeStepText');

  function updatePlayPauseUI() {
    if (playPauseBtn) {
      playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
      playPauseBtn.title = isPlaying ? "Pause Demo / 暫停示範" : "Resume Playback / 繼續播放";
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      updatePlayPauseUI();
    });
  }

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      if (playbackSpeed === 1.0) {
        playbackSpeed = 2.0;
        speedBtn.textContent = "🚀 2x";
        speedBtn.style.color = "#f97316";
        speedBtn.style.borderColor = "#f97316";
        speedBtn.style.boxShadow = "0 0 10px rgba(249, 115, 22, 0.45)";
      } else if (playbackSpeed === 2.0) {
        playbackSpeed = 0.5;
        speedBtn.textContent = "🐢 0.5x";
        speedBtn.style.color = "#38bdf8";
        speedBtn.style.borderColor = "#38bdf8";
        speedBtn.style.boxShadow = "0 0 10px rgba(56, 189, 248, 0.45)";
      } else {
        playbackSpeed = 1.0;
        speedBtn.textContent = "⚡ 1x";
        speedBtn.style.color = "";
        speedBtn.style.borderColor = "";
        speedBtn.style.boxShadow = "";
      }
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      escapeTimer = 0;
      isPlaying = true;
      updatePlayPauseUI();
    });
  }

  function drawPillLocal(context, text, centerX, centerY, bg, fg, fontSize = 12, padX = 18, padY = 6, border = null) {
    context.save();
    context.font = `bold ${fontSize}px sans-serif`;
    const textMetrics = context.measureText(text);
    const pillW = textMetrics.width + padX * 2;
    const pillH = fontSize + padY * 2;
    const pillX = centerX - pillW / 2;
    const pillY = centerY - pillH / 2;

    context.fillStyle = bg;
    context.beginPath();
    context.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
    context.fill();

    if (border) {
      context.strokeStyle = border;
      context.lineWidth = 1.5;
      context.stroke();
    }

    context.fillStyle = fg;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, centerX, centerY);
    context.restore();
  }

  function drawEnchantedFireLocal(context, centerX, baseY, width, height, intensity = 1.0, driftX = 0, f = 0) {
    context.save();
    const tiers = [
      { count: 10, yMin: 0.70, yMax: 1.00, rMin: width * 0.36, rMax: width * 0.52, color: 'rgba(234, 88, 12, 0.95)' },
      { count: 8,  yMin: 0.65, yMax: 0.95, rMin: width * 0.30, rMax: width * 0.45, color: 'rgba(249, 115, 22, 0.92)' },
      { count: 9,  yMin: 0.45, yMax: 0.78, rMin: width * 0.24, rMax: width * 0.38, color: 'rgba(239, 68, 68, 0.88)' },
      { count: 8,  yMin: 0.28, yMax: 0.58, rMin: width * 0.20, rMax: width * 0.32, color: 'rgba(245, 158, 11, 0.82)' },
      { count: 6,  yMin: 0.12, yMax: 0.38, rMin: width * 0.13, rMax: width * 0.24, color: 'rgba(251, 191, 36, 0.75)' },
      { count: 5,  yMin: 0.00, yMax: 0.22, rMin: width * 0.06, rMax: width * 0.15, color: 'rgba(254, 240, 138, 0.65)' }
    ];

    for (let t = 0; t < tiers.length; t++) {
      const tier = tiers[t];
      context.fillStyle = tier.color;
      for (let i = 0; i < tier.count; i++) {
        const seed = t * 17 + i * 29;
        const cycleRate = 0.035 + (seed % 7) * 0.004;
        const phase = seed + f * cycleRate;
        const prog = (Math.sin(phase) + 1) / 2;
        const yRatio = tier.yMax - prog * (tier.yMax - tier.yMin);
        const py = baseY - height * yRatio;
        const sway = Math.sin(phase * 1.3) * (width * 0.28 * (1 - yRatio * 0.5));
        const windDrift = (1 - yRatio) * driftX;
        const px = centerX + sway + windDrift;
        const r = (tier.rMin + prog * (tier.rMax - tier.rMin)) * intensity;
        context.beginPath();
        context.arc(px, py, Math.max(2, r), 0, Math.PI * 2);
        context.fill();
      }
    }
    context.restore();
  }

  function drawCharacterHeadLocal(context, headX, headY, radius = 16, mouthType = 'neutral') {
    context.save();
    context.fillStyle = '#fed7aa';
    context.beginPath();
    context.arc(headX, headY, radius, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(headX - radius + 1, headY + 1, 3.2, 0, Math.PI * 2);
    context.arc(headX + radius - 1, headY + 1, 3.2, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#1e293b';
    context.beginPath();
    context.arc(headX, headY - 4, radius + 1.2, Math.PI * 1.05, Math.PI * 1.95);
    context.quadraticCurveTo(headX + 3, headY - 5, headX - radius + 2, headY - 2);
    context.closePath();
    context.fill();

    if (mouthType === 'panting') {
      context.fillStyle = '#0f172a';
      context.beginPath();
      context.arc(headX - 4, headY - 1, 1.8, 0, Math.PI * 2);
      context.arc(headX + 4, headY - 1, 1.8, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#7f1d1d';
      context.beginPath();
      context.ellipse(headX, headY + 6, 4, 6, 0, 0, Math.PI * 2);
      context.fill();
    } else if (mouthType === 'smile') {
      context.fillStyle = '#0f172a';
      context.beginPath();
      context.arc(headX - 5, headY - 1, 2, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = '#0f172a';
      context.lineWidth = 1.8;
      context.beginPath();
      context.arc(headX + 5, headY - 1, 3.2, Math.PI * 1.1, Math.PI * 1.9);
      context.stroke();
      context.strokeStyle = '#ea580c';
      context.lineWidth = 2.0;
      context.beginPath();
      context.arc(headX, headY + 4, 6, 0.15 * Math.PI, 0.85 * Math.PI);
      context.stroke();
    } else {
      context.fillStyle = '#0f172a';
      context.beginPath();
      context.arc(headX - 4, headY - 1, 1.8, 0, Math.PI * 2);
      context.arc(headX + 4, headY - 1, 1.8, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  }

  let lastAct = 0;

  function render() {
    const w = canvas.width;
    const h = canvas.height;
    frame += playbackSpeed;

    const cycle = (escapeTimer % escapeDuration);
    const isZh = currentLang === 'zh';

    const isAct1 = cycle < 450;
    const isAct2 = cycle >= 450 && cycle < 720;
    const isAct3 = cycle >= 720 && cycle < 1180;
    const isAct4 = cycle >= 1180;

    const currentActNum = isAct1 ? 1 : (isAct2 ? 2 : (isAct3 ? 3 : 4));
    if (currentActNum !== lastAct) {
      lastAct = currentActNum;
      if (badgeEl && textEl) {
        if (currentActNum === 1) {
          badgeEl.textContent = isZh ? '🏃 動作一：全力狂奔脫困 (FULL SPRINT TO EXIT)' : '🏃 ACT 1: FULL SPRINT ESCAPE';
          textEl.textContent = isZh ? '把握最後黃金數十秒，自一樓安全出口全力衝向戶外安全集結區！' : 'Dash through the fire exit into the open campus assembly zone!';
          badgeEl.style.background = '#ef4444';
          badgeEl.style.color = '#fff';
        } else if (currentActNum === 2) {
          badgeEl.textContent = isZh ? '😮‍💨 動作二：抵達安全區大口喘息 (SAFE ZONE OUT OF BREATH)' : '😮‍💨 ACT 2: SAFE ZONE EXHAUSTION';
          textEl.textContent = isZh ? '成功脫險抵達安全區，雙手扶膝大口呼吸新鮮空氣！' : 'Reach open safety ground, panting heavily and catching fresh air!';
          badgeEl.style.background = '#0284c7';
          badgeEl.style.color = '#fff';
        } else if (currentActNum === 3) {
          badgeEl.textContent = isZh ? '💥 動作三：高溫燒毀全面坍塌 (INFERNO STRUCTURAL COLLAPSE)' : '💥 ACT 3: INFERNO STRUCTURAL COLLAPSE';
          textEl.textContent = isZh ? '身後宿舍大樓不堪猛烈大火燒熔全面崩塌！千鈞一髮死裡逃生！' : 'The blazing dormitory collapses behind! Narrowly escaped just in time!';
          badgeEl.style.background = '#ea580c';
          badgeEl.style.color = '#fff';
        } else {
          badgeEl.textContent = isZh ? '👍 動作四：比讚致敬、平安生還 (TRIUMPHANT THUMBS UP)' : '👍 ACT 4: TRIUMPHANT THUMBS UP';
          textEl.textContent = isZh ? '奇蹟平安生還！記住平時火災應變演練四守則，生命安全永遠第一！' : 'Miracle survival! Remember fire safety protocols, life comes first!';
          badgeEl.style.background = '#10b981';
          badgeEl.style.color = '#000';
        }
      }
    }

    let shakeX = 0;
    let shakeY = 0;
    if (isAct2 && cycle > 640) {
      const rumble = (cycle - 640) / 80 * 2.5;
      shakeX = Math.sin(frame * 0.8) * rumble;
      shakeY = Math.cos(frame * 0.9) * rumble;
    } else if (isAct3) {
      const collapseProg = (cycle - 720) / 460;
      const decay = Math.max(0, 1.0 - collapseProg * 0.85);
      const shakeMag = 7.5 * decay;
      shakeX = Math.sin(frame * 1.4) * shakeMag;
      shakeY = Math.cos(frame * 1.6) * shakeMag * 0.8;
    }

    ctx.save();
    ctx.translate(shakeX, shakeY);
    ctx.clearRect(-20, -20, w + 40, h + 40);

    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    skyGrad.addColorStop(0, '#020617');
    skyGrad.addColorStop(0.5, '#0b0f1e');
    skyGrad.addColorStop(1, '#1e1b2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(-20, -20, w + 40, h + 40);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(80, 40, 2, 2);
    ctx.fillRect(160, 25, 2, 2);
    ctx.fillRect(w - 140, 35, 2, 2);
    ctx.fillRect(w - 60, 60, 2, 2);

    const horizonY = h * 0.58;
    const groundH = h - horizonY;
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h);
    groundGrad.addColorStop(0, '#0a0d16');
    groundGrad.addColorStop(0.3, '#101524');
    groundGrad.addColorStop(1, '#05070d');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, w, groundH);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1.5;
    const vanishX = w * 0.48;
    for (let p = -5; p <= 5; p++) {
      ctx.beginPath();
      ctx.moveTo(vanishX + p * 38, horizonY);
      ctx.lineTo(vanishX + p * 135, h);
      ctx.stroke();
    }

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.moveTo(30, h - 35);
    ctx.lineTo(w - 30, h - 35);
    ctx.stroke();
    ctx.setLineDash([]);

    drawPillLocal(ctx, isZh ? '🟢 校園安全疏散集結區 (SAFE ZONE)' : '🟢 CAMPUS SAFE ASSEMBLY ZONE', w * 0.78, h - 18, 'rgba(6,95,70,0.85)', '#a7f3d0', 10, 14, 5);

    const bldgX = w * 0.24;
    const bldgW = w * 0.48;
    const bldgFullH = 195;
    const bldgBaseY = horizonY;

    let collapseProgress = 0;
    if (isAct3) {
      const cRaw = (cycle - 720) / 360;
      collapseProgress = Math.min(1.0, cRaw * cRaw * (3 - 2 * cRaw));
    } else if (isAct4) {
      collapseProgress = 1.0;
    }

    const currentBldgH = bldgFullH * (1.0 - collapseProgress * 0.82);
    const currentBldgY = bldgBaseY - currentBldgH;

    ctx.save();
    if (collapseProgress > 0 && collapseProgress < 1.0) {
      ctx.translate(bldgX + bldgW * 0.5, bldgBaseY);
      ctx.rotate(Math.sin(collapseProgress * Math.PI) * 0.04);
      ctx.translate(-(bldgX + bldgW * 0.5), -bldgBaseY);
    }

    const wallGrad = ctx.createLinearGradient(bldgX, currentBldgY, bldgX + bldgW, currentBldgY);
    wallGrad.addColorStop(0, '#1a1f2e');
    wallGrad.addColorStop(0.5, '#282f42');
    wallGrad.addColorStop(1, '#171c2a');
    ctx.fillStyle = wallGrad;
    ctx.beginPath();
    ctx.roundRect(bldgX, currentBldgY, bldgW, currentBldgH, [6, 6, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(bldgX - 10, currentBldgY - 8, bldgW + 20, 10);

    if (collapseProgress < 0.6) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1.0 - collapseProgress * 1.8);
      drawPillLocal(ctx, isZh ? '🏢 學生第一宿舍 (DORM 1)' : '🏢 STUDENT DORM 1', bldgX + bldgW * 0.5, currentBldgY - 22, '#1e293b', '#f8fafc', 11, 16, 5, '#475569');
      ctx.restore();
    }

    if (collapseProgress < 0.8) {
      const floors = 3;
      const roomsPerFloor = 4;
      const winW = 32;
      const winH = 24;

      for (let fl = 0; fl < floors; fl++) {
        const flY = currentBldgY + 22 + fl * 44;
        if (flY + winH > bldgBaseY - 25) continue;

        for (let rm = 0; rm < roomsPerFloor; rm++) {
          const rX = bldgX + 28 + rm * (winW + 42);
          ctx.fillStyle = '#0a0d16';
          ctx.fillRect(rX, flY, winW, winH);
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(rX, flY, winW, winH);

          drawEnchantedFireLocal(ctx, rX + winW / 2, flY + winH, 18, 30, 0.9, (rm % 2 === 0 ? 3 : -3), frame * 1.2 + rm * 15);
          ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
          ctx.fillRect(rX - 3, flY - 3, winW + 6, winH + 6);
        }
      }
    }

    const exitDoorW = 46;
    const exitDoorH = 38;
    const exitDoorX = bldgX + bldgW * 0.5 - exitDoorW / 2;
    const exitDoorY = bldgBaseY - exitDoorH;

    if (collapseProgress < 0.7) {
      ctx.fillStyle = '#059669';
      ctx.fillRect(exitDoorX + 4, exitDoorY - 14, exitDoorW - 8, 10);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('EXIT 🏃', exitDoorX + exitDoorW / 2, exitDoorY - 6);

      ctx.fillStyle = '#450a0a';
      ctx.fillRect(exitDoorX, exitDoorY, exitDoorW, exitDoorH);
      drawEnchantedFireLocal(ctx, exitDoorX + exitDoorW / 2, exitDoorY + exitDoorH, 25, 34, 1.1, 0, frame * 1.5);

      ctx.fillStyle = '#334155';
      ctx.fillRect(exitDoorX - 10, exitDoorY, 10, exitDoorH);
    }

    if (collapseProgress < 0.75) {
      drawEnchantedFireLocal(ctx, bldgX + bldgW * 0.25, currentBldgY, 45, 75, 1.2, 5, frame * 1.3);
      drawEnchantedFireLocal(ctx, bldgX + bldgW * 0.50, currentBldgY, 60, 95, 1.4, -4, frame * 1.4);
      drawEnchantedFireLocal(ctx, bldgX + bldgW * 0.75, currentBldgY, 50, 80, 1.3, 6, frame * 1.25);
    }

    if (collapseProgress > 0.05 && collapseProgress < 0.95) {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(bldgX + 50, currentBldgY + 30);
      ctx.lineTo(bldgX + 110, currentBldgY + 80);
      ctx.lineTo(bldgX + 90, currentBldgY + 120);
      ctx.lineTo(bldgX + 140, bldgBaseY);
      ctx.moveTo(bldgX + bldgW - 60, currentBldgY + 20);
      ctx.lineTo(bldgX + bldgW - 100, currentBldgY + 95);
      ctx.lineTo(bldgX + bldgW - 70, bldgBaseY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    if (collapseProgress > 0.3) {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(bldgX - 35, bldgBaseY);
      ctx.lineTo(bldgX + 40, bldgBaseY - 35);
      ctx.lineTo(bldgX + 110, bldgBaseY - 18);
      ctx.lineTo(bldgX + bldgW * 0.5, bldgBaseY - 45);
      ctx.lineTo(bldgX + bldgW - 90, bldgBaseY - 22);
      ctx.lineTo(bldgX + bldgW + 25, bldgBaseY - 32);
      ctx.lineTo(bldgX + bldgW + 45, bldgBaseY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let deb = 0; deb < 10; deb++) {
        const debX = bldgX + (deb * 39 + 17) % bldgW;
        const debY = bldgBaseY - 10 - ((deb * 23) % 28);
        ctx.fillStyle = '#475569';
        ctx.fillRect(debX, debY, 12 + (deb % 3) * 4, 8 + (deb % 2) * 4);
      }

      if (isAct3) {
        const dustP = (cycle - 720) / 460;
        for (let d = 0; d < 12; d++) {
          const dustR = 30 + d * 8 + dustP * 65;
          const dustX = bldgX + bldgW * 0.5 + Math.sin(d * 1.8) * (bldgW * 0.55 * dustP + 40);
          const dustY = bldgBaseY - 25 - Math.cos(d * 1.2) * (55 * dustP + 10);
          const dustAlpha = Math.max(0, (1.0 - dustP * 0.8) * 0.65);

          ctx.fillStyle = (d % 3 === 0)
            ? `rgba(249, 115, 22, ${dustAlpha * 0.45})`
            : `rgba(100, 116, 139, ${dustAlpha * 0.55})`;
          ctx.beginPath();
          ctx.arc(dustX, dustY, dustR, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (isAct4) {
        for (let sw = 0; sw < 5; sw++) {
          const smkX = bldgX + 50 + sw * 60 + Math.sin(frame * 0.05 + sw) * 15;
          const smkY = bldgBaseY - 30 - ((frame * 0.4 + sw * 25) % 65);
          const smkAlpha = Math.max(0, 0.4 - ((frame * 0.4 + sw * 25) % 65) / 65 * 0.4);
          ctx.fillStyle = `rgba(148, 163, 184, ${smkAlpha})`;
          ctx.beginPath();
          ctx.arc(smkX, smkY, 10 + sw * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    if (isAct1) {
      const runProg = cycle / 450;
      const easeRun = runProg * (2 - runProg);

      const startX = w * 0.50;
      const startY = horizonY;
      const endX = w * 0.40;
      const endY = h - 55;

      const charX = startX + easeRun * (endX - startX);
      const charY = startY + easeRun * (endY - startY);
      const charScale = 0.28 + easeRun * 0.72;

      const runCadence = escapeTimer * 0.38;
      const legAngle = Math.sin(runCadence) * 0.85;
      const armAngle = Math.sin(runCadence + Math.PI) * 0.75;
      const bounce = Math.abs(Math.sin(runCadence)) * 6 * charScale;

      for (let dp = 0; dp < 3; dp++) {
        const puffProg = ((escapeTimer * 0.12 + dp * 0.33) % 1);
        const puffX = charX + 18 * charScale + puffProg * 25 * charScale;
        const puffY = charY - puffProg * 8 * charScale;
        ctx.fillStyle = `rgba(148, 163, 184, ${(1 - puffProg) * 0.45})`;
        ctx.beginPath();
        ctx.arc(puffX, puffY, (3 + puffProg * 6) * charScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(charX, charY - bounce);
      ctx.scale(charScale, charScale);
      ctx.rotate(-0.16);

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 11;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-5, -60);
      ctx.lineTo(-5 - Math.sin(legAngle) * 28, -30);
      ctx.lineTo(-5 - Math.sin(legAngle) * 52, 0);
      ctx.stroke();

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(8, -60);
      ctx.lineTo(8 + Math.sin(legAngle) * 28, -30);
      ctx.lineTo(8 + Math.sin(legAngle) * 52, 0);
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-12 - Math.sin(legAngle) * 52, -4, 16, 7);
      ctx.fillRect(2 + Math.sin(legAngle) * 52, -4, 16, 7);

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(-16, -125, 32, 68, 8);
      ctx.fill();

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(0, -115);
      ctx.lineTo(-Math.sin(armAngle) * 28, -95);
      ctx.lineTo(-Math.sin(armAngle) * 45, -75);
      ctx.stroke();

      ctx.strokeStyle = '#0369a1';
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(0, -115);
      ctx.lineTo(Math.sin(armAngle) * 28, -95);
      ctx.lineTo(Math.sin(armAngle) * 45, -75);
      ctx.stroke();

      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(Math.sin(armAngle) * 45, -75, 5, 0, Math.PI * 2);
      ctx.arc(-Math.sin(armAngle) * 45, -75, 5, 0, Math.PI * 2);
      ctx.fill();

      drawCharacterHeadLocal(ctx, 4, -142, 16, 'neutral');

      ctx.restore();

      drawPillLocal(ctx, isZh
        ? '🏃 衝出火場！從安全出口全力奔向戶外安全集結區！'
        : '🏃 DASHING OUT! Sprinting from burning exit to the safety zone!', w * 0.5, 32, '#dc2626', '#ffffff', 13, 24, 8);

    } else if (isAct2 || isAct3) {
      const charX = w * 0.40;
      const charY = h - 55;

      const pantCycle = escapeTimer * 0.18;
      const heave = Math.sin(pantCycle) * 4.5;
      const hunch = 0.32 + Math.sin(pantCycle) * 0.05;

      ctx.save();
      ctx.translate(charX, charY);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-16, -65);
      ctx.lineTo(-28, -32);
      ctx.lineTo(-24, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, -65);
      ctx.lineTo(6, -32);
      ctx.lineTo(10, 0);
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-34, -6, 18, 6);
      ctx.fillRect(4, -6, 18, 6);

      ctx.save();
      ctx.translate(0, -65);
      ctx.rotate(-hunch);

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(-16, -65 + heave * 0.3, 32, 65, 8);
      ctx.fill();

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(-10, -55);
      ctx.lineTo(-18, -15);
      ctx.stroke();

      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(-18, -15, 6, 0, Math.PI * 2);
      ctx.fill();

      drawCharacterHeadLocal(ctx, -6, -78, 16, 'panting');

      ctx.restore();

      const pantPuff = (escapeTimer * 0.08) % 1;
      ctx.fillStyle = `rgba(241, 245, 249, ${(1 - pantPuff) * 0.7})`;
      ctx.beginPath();
      ctx.arc(-35 - pantPuff * 16, -95 - pantPuff * 8, 3.5 + pantPuff * 7, 0, Math.PI * 2);
      ctx.fill();

      const sweatY = ((escapeTimer * 0.15) % 1) * 18;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.beginPath();
      ctx.ellipse(-26, -112 + sweatY, 2.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (isAct2) {
        drawPillLocal(ctx, isZh
          ? '😮‍💨 脫困抵達安全區！氣喘吁吁、大口呼吸新鮮空氣！'
          : '😮‍💨 MADE IT OUT! Panting heavily, catching breath in safe open air!', w * 0.5, 32, '#0284c7', '#ffffff', 13, 24, 8);
      } else {
        drawPillLocal(ctx, isZh
          ? '💥 轟然巨響！建築物因高溫燒熔全面坍塌！千鈞一髮成功脫險！'
          : '💥 INFERNO COLLAPSE! The building caves in! Narrowly escaped in time!', w * 0.5, 32, '#ea580c', '#ffffff', 13, 24, 8);
      }

    } else {
      const charX = w * 0.40;
      const charY = h - 55;

      ctx.save();
      ctx.translate(charX, charY);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-16, -75, 12, 75);
      ctx.fillRect(4, -75, 12, 75);

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-20, -6, 18, 6);
      ctx.fillRect(2, -6, 18, 6);

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(-18, -145, 36, 72, 8);
      ctx.fill();

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-16, -135);
      ctx.lineTo(-32, -105);
      ctx.lineTo(-18, -90);
      ctx.stroke();

      const thumbArmX = 16;
      const thumbArmY = -135;
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(thumbArmX, thumbArmY);
      ctx.lineTo(thumbArmX + 22, thumbArmY + 8);
      ctx.lineTo(thumbArmX + 36, thumbArmY - 20);
      ctx.stroke();

      const handX = thumbArmX + 36;
      const handY = thumbArmY - 20;

      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.roundRect(handX - 7, handY - 8, 18, 18, 5);
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(handX - 3, handY - 24, 9, 18, 4);
      ctx.fill();

      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(handX - 5, handY - 1);
      ctx.lineTo(handX + 8, handY - 1);
      ctx.moveTo(handX - 5, handY + 4);
      ctx.lineTo(handX + 8, handY + 4);
      ctx.stroke();

      const starSpin = frame * 0.08;
      ctx.save();
      ctx.translate(handX + 2, handY - 28);
      ctx.rotate(starSpin);
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      for (let sp = 0; sp < 4; sp++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(0, -11);
        ctx.lineTo(3.5, -3.5);
        ctx.lineTo(11, 0);
        ctx.lineTo(3.5, 3.5);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      drawCharacterHeadLocal(ctx, 0, -165, 17, 'smile');

      ctx.restore();

      drawPillLocal(ctx, isZh
        ? '👍「平安脫困！記住逃生四守則，生命安全永遠第一！」'
        : '👍 "Made it out alive! Remember survival protocols, safety comes first!"', w * 0.62, h * 0.42, '#ffffff', '#0f172a', 13, 22, 8, '#10b981');

      drawPillLocal(ctx, isZh
        ? '🏆 奇蹟生還！冷靜判斷、低姿爬行、關門塞縫，絕處逢生！'
        : '🏆 MIRACLE ESCAPE! Stay calm, crawl low, shelter in place, and survive!', w * 0.5, 32, '#059669', '#ffffff', 13, 24, 8);
    }

    ctx.restore();

    if (isPlaying) {
      escapeTimer += playbackSpeed;
      const progressPercent = Math.min(100, (escapeTimer / escapeDuration) * 100);
      if (progressBar) progressBar.style.width = `${progressPercent}%`;

      if (escapeTimer >= escapeDuration) {
        escapeTimer = 0;
      }
    } else {
      if (progressBar) progressBar.style.width = '100%';
    }

    requestAnimationFrame(render);
  }

  updatePlayPauseUI();
  render();
}
