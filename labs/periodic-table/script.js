/**
 * ==========================================================================
 * Science Lab Hub - 표준 장주기율표 (전이금속 포함 118개 원소) 스크립트
 * ==========================================================================
 */

// 1~118번 원소 전체 데이터베이스
const ELEMENTS_DB = [
  // --- 1주기 (1~2) ---
  { num: 1, sym: "H", name: "수소", eng: "Hydrogen", period: 1, group: 1, cat: "nonmetal", block: "s", state: "기체", shells: [1], valence: 1, oxidation: "+1, -1", weight: "1.008", radius: 53, ionization: 1312, en: 2.20, density: "0.0899 g/L", isotopes: [{ name: "¹H (경수소)", mass: 1, abundance: "99.988%" }, { name: "²H (중수소)", mass: 2, abundance: "0.012%" }], chemTitle: "우주에서 가장 풍부한 원소", chemDesc: "1족에 위치하지만 비금속이며 다른 비금속과 공유 결합을 형성합니다." },
  { num: 2, sym: "He", name: "헬륨", eng: "Helium", period: 1, group: 18, cat: "noble", block: "s", state: "기체", shells: [2], valence: 0, oxidation: "0", weight: "4.0026", radius: 31, ionization: 2372, en: "-", density: "0.1785 g/L", isotopes: [{ name: "⁴He (헬륨-4)", mass: 4, abundance: "99.999%" }], chemTitle: "18족 비활성 기체", chemDesc: "K껍질이 가득 차 화학적으로 매우 안정합니다." },

  // --- 2주기 (3~10) ---
  { num: 3, sym: "Li", name: "리튬", eng: "Lithium", period: 2, group: 1, cat: "alkali", block: "s", state: "고체", shells: [2, 1], valence: 1, oxidation: "+1", weight: "6.94", radius: 152, ionization: 520, en: 0.98, density: "0.534 g/cm³", isotopes: [{ name: "⁷Li (리튬-7)", mass: 7, abundance: "92.41%" }, { name: "⁶Li (리튬-6)", mass: 6, abundance: "7.59%" }], chemTitle: "가장 가벼운 알칼리 금속", chemDesc: "물과 격렬히 반응하여 수소 기체를 발생시킵니다." },
  { num: 4, sym: "Be", name: "베릴륨", eng: "Beryllium", period: 2, group: 2, cat: "alkali-earth", block: "s", state: "고체", shells: [2, 2], valence: 2, oxidation: "+2", weight: "9.0122", radius: 112, ionization: 899, en: 1.57, density: "1.85 g/cm³", isotopes: [{ name: "⁹Be (베릴륨-9)", mass: 9, abundance: "100%" }], chemTitle: "2족 알칼리 토금속", chemDesc: "단단하고 가벼운 금속으로 항공우주 합금에 사용됩니다." },
  { num: 5, sym: "B", name: "붕소", eng: "Boron", period: 2, group: 13, cat: "metalloid", block: "p", state: "고체", shells: [2, 3], valence: 3, oxidation: "+3", weight: "10.81", radius: 85, ionization: 801, en: 2.04, density: "2.34 g/cm³", isotopes: [{ name: "¹¹B (붕소-11)", mass: 11, abundance: "80.1%" }], chemTitle: "13족 준금속", chemDesc: "내열 유리 및 반도체 도핑 첨가물로 활용됩니다." },
  { num: 6, sym: "C", name: "탄소", eng: "Carbon", period: 2, group: 14, cat: "nonmetal", block: "p", state: "고체", shells: [2, 4], valence: 4, oxidation: "-4, +2, +4", weight: "12.011", radius: 77, ionization: 1086, en: 2.55, density: "2.267 g/cm³", isotopes: [{ name: "¹²C (탄소-12)", mass: 12, abundance: "98.93%" }, { name: "¹⁴C (탄소-14)", mass: 14, abundance: "방사성 미량" }], chemTitle: "유기물의 중심 골격", chemDesc: "최대 4개의 단일·다중 공유 결합을 형성하며 다양한 동소체를 갖습니다." },
  { num: 7, sym: "N", name: "질소", eng: "Nitrogen", period: 2, group: 15, cat: "nonmetal", block: "p", state: "기체", shells: [2, 5], valence: 5, oxidation: "-3, +3, +5", weight: "14.007", radius: 75, ionization: 1402, en: 3.04, density: "1.251 g/L", isotopes: [{ name: "¹⁴N (질소-14)", mass: 14, abundance: "99.63%" }], chemTitle: "삼중 결합을 갖는 대기 주성분", chemDesc: "결합 에너지가 커 반응성이 낮으며 대기의 약 78%를 차지합니다." },
  { num: 8, sym: "O", name: "산소", eng: "Oxygen", period: 2, group: 16, cat: "nonmetal", block: "p", state: "기체", shells: [2, 6], valence: 6, oxidation: "-2", weight: "15.999", radius: 73, ionization: 1314, en: 3.44, density: "1.429 g/L", isotopes: [{ name: "¹⁶O (산소-16)", mass: 16, abundance: "99.76%" }], chemTitle: "호흡과 연소의 필수 원소", chemDesc: "전기 음성도가 매우 커서 거의 모든 원소와 산화물을 이룹니다." },
  { num: 9, sym: "F", name: "플루오린", eng: "Fluorine", period: 2, group: 17, cat: "halogen", block: "p", state: "기체", shells: [2, 7], valence: 7, oxidation: "-1", weight: "18.998", radius: 71, ionization: 1681, en: 3.98, density: "1.696 g/L", isotopes: [{ name: "¹⁹F (플루오린-19)", mass: 19, abundance: "100%" }], chemTitle: "전기 음성도 1위 할로젠", chemDesc: "전자를 강하게 끌어당겨 반응성이 극도로 큽니다." },
  { num: 10, sym: "Ne", name: "네온", eng: "Neon", period: 2, group: 18, cat: "noble", block: "p", state: "기체", shells: [2, 8], valence: 0, oxidation: "0", weight: "20.180", radius: 69, ionization: 2081, en: "-", density: "0.900 g/L", isotopes: [{ name: "²⁰Ne (네온-20)", mass: 20, abundance: "90.48%" }], chemTitle: "18족 비활성 기체", chemDesc: "옥텟 규칙을 만족하며 방전 시 붉은빛을 방출합니다." },

  // --- 3주기 (11~18) ---
  { num: 11, sym: "Na", name: "나트륨", eng: "Sodium", period: 3, group: 1, cat: "alkali", block: "s", state: "고체", shells: [2, 8, 1], valence: 1, oxidation: "+1", weight: "22.990", radius: 186, ionization: 496, en: 0.93, density: "0.968 g/cm³", isotopes: [{ name: "²³Na (나트륨-23)", mass: 23, abundance: "100%" }], chemTitle: "대표적인 1족 알칼리 금속", chemDesc: "물과 격렬하게 반응하며 불꽃 반응 시 노란색을 띱니다." },
  { num: 12, sym: "Mg", name: "마그네슘", eng: "Magnesium", period: 3, group: 2, cat: "alkali-earth", block: "s", state: "고체", shells: [2, 8, 2], valence: 2, oxidation: "+2", weight: "24.305", radius: 160, ionization: 738, en: 1.31, density: "1.738 g/cm³", isotopes: [{ name: "²⁴Mg (마그네슘-24)", mass: 24, abundance: "78.99%" }], chemTitle: "2족 알칼리 토금속", chemDesc: "연소 시 강한 백색광을 방출하며 엽록소의 중심 원소입니다." },
  { num: 13, sym: "Al", name: "알루미늄", eng: "Aluminium", period: 3, group: 13, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 3], valence: 3, oxidation: "+3", weight: "26.982", radius: 143, ionization: 578, en: 1.61, density: "2.70 g/cm³", isotopes: [{ name: "²⁷Al (알루미늄-27)", mass: 27, abundance: "100%" }], chemTitle: "지각 풍부도 3위 경금속", chemDesc: "치밀한 산화 피막으로 부식을 방지하며 캔과 비행기 부품에 쓰입니다." },
  { num: 14, sym: "Si", name: "규소", eng: "Silicon", period: 3, group: 14, cat: "metalloid", block: "p", state: "고체", shells: [2, 8, 4], valence: 4, oxidation: "+4, -4", weight: "28.085", radius: 118, ionization: 786, en: 1.90, density: "2.33 g/cm³", isotopes: [{ name: "²⁸Si (규소-28)", mass: 28, abundance: "92.22%" }], chemTitle: "현대 반도체의 핵심 준금속", chemDesc: "지각의 암석(규산염 광물) 주성분이며 전자 소자에 사용됩니다." },
  { num: 15, sym: "P", name: "인", eng: "Phosphorus", period: 3, group: 15, cat: "nonmetal", block: "p", state: "고체", shells: [2, 8, 5], valence: 5, oxidation: "-3, +3, +5", weight: "30.974", radius: 110, ionization: 1012, en: 2.19, density: "1.82 g/cm³", isotopes: [{ name: "³¹P (인-31)", mass: 31, abundance: "100%" }], chemTitle: "DNA와 에너지(ATP)의 핵심", chemDesc: "생체 대사와 인산 비료의 필수 원소입니다." },
  { num: 16, sym: "S", name: "황", eng: "Sulfur", period: 3, group: 16, cat: "nonmetal", block: "p", state: "고체", shells: [2, 8, 6], valence: 6, oxidation: "-2, +4, +6", weight: "32.06", radius: 103, ionization: 1000, en: 2.58, density: "2.07 g/cm³", isotopes: [{ name: "³²S (황-32)", mass: 32, abundance: "94.99%" }], chemTitle: "황산 및 고무 가황 원료", chemDesc: "노란색 결정성 고체로 황산 제조에 대량 사용됩니다." },
  { num: 17, sym: "Cl", name: "염소", eng: "Chlorine", period: 3, group: 17, cat: "halogen", block: "p", state: "기체", shells: [2, 8, 7], valence: 7, oxidation: "-1, +1, +5, +7", weight: "35.45", radius: 99, ionization: 1251, en: 3.16, density: "3.214 g/L", isotopes: [{ name: "³⁵Cl (염소-35)", mass: 35, abundance: "75.76%" }, { name: "³⁷Cl (염소-37)", mass: 37, abundance: "24.24%" }], chemTitle: "소독 및 표백용 할로젠 기체", chemDesc: "소금(NaCl)의 구성 원소이며 수돗물 살균 소독에 쓰입니다." },
  { num: 18, sym: "Ar", name: "아르곤", eng: "Argon", period: 3, group: 18, cat: "noble", block: "p", state: "기체", shells: [2, 8, 8], valence: 0, oxidation: "0", weight: "39.948", radius: 98, ionization: 1521, en: "-", density: "1.784 g/L", isotopes: [{ name: "⁴⁰Ar (아르곤-40)", mass: 40, abundance: "99.60%" }], chemTitle: "대기 중 3위 비활성 기체", chemDesc: "백열전구 및 용접 보호 기체로 널리 쓰입니다." },

  // --- 4주기 (19~36): 전이금속(21~30) 본격 등장! ---
  { num: 19, sym: "K", name: "칼륨", eng: "Potassium", period: 4, group: 1, cat: "alkali", block: "s", state: "고체", shells: [2, 8, 8, 1], valence: 1, oxidation: "+1", weight: "39.098", radius: 227, ionization: 419, en: 0.82, density: "0.862 g/cm³", isotopes: [{ name: "³⁹K (칼륨-39)", mass: 39, abundance: "93.26%" }], chemTitle: "세포 신경 전달의 알칼리 금속", chemDesc: "나트륨보다 반응성이 더욱 크며 보라색 불꽃 반응을 보입니다." },
  { num: 20, sym: "Ca", name: "칼슘", eng: "Calcium", period: 4, group: 2, cat: "alkali-earth", block: "s", state: "고체", shells: [2, 8, 8, 2], valence: 2, oxidation: "+2", weight: "40.078", radius: 197, ionization: 590, en: 1.00, density: "1.54 g/cm³", isotopes: [{ name: "⁴⁰Ca (칼슘-40)", mass: 40, abundance: "96.94%" }], chemTitle: "뼈와 치아의 주성분", chemDesc: "석회석, 시멘트의 원료이며 주황색 불꽃 반응을 띱니다." },

  // ⭐ 4주기 전이금속 (21~30)
  { num: 21, sym: "Sc", name: "스칸듐", eng: "Scandium", period: 4, group: 3, cat: "transition", block: "d", state: "고체", shells: [2, 8, 9, 2], valence: 2, oxidation: "+3", weight: "44.956", radius: 162, ionization: 633, en: 1.36, density: "2.985 g/cm³", isotopes: [{ name: "⁴⁵Sc (스칸듐-45)", mass: 45, abundance: "100%" }], chemTitle: "최초의 3d 전이금속 (3족)", chemDesc: "은백색의 가벼운 전이금속으로 항공우주용 고강도 알루미늄-스칸듐 합금에 사용됩니다." },
  { num: 22, sym: "Ti", name: "티타늄", eng: "Titanium", period: 4, group: 4, cat: "transition", block: "d", state: "고체", shells: [2, 8, 10, 2], valence: 2, oxidation: "+4, +3, +2", weight: "47.867", radius: 147, ionization: 659, en: 1.54, density: "4.506 g/cm³", isotopes: [{ name: "⁴⁸Ti (티타늄-48)", mass: 48, abundance: "73.72%" }], chemTitle: "강철보다 가볍고 강한 전이금속 (4족)", chemDesc: "부식에 매우 강해 인공 관절, 임플란트 및 초음속 전투기 소재로 활용됩니다." },
  { num: 23, sym: "V", name: "바나듐", eng: "Vanadium", period: 4, group: 5, cat: "transition", block: "d", state: "고체", shells: [2, 8, 11, 2], valence: 2, oxidation: "+5, +4, +3, +2", weight: "50.942", radius: 134, ionization: 651, en: 1.63, density: "6.11 g/cm³", isotopes: [{ name: "⁵¹V (바나듐-51)", mass: 51, abundance: "99.75%" }], chemTitle: "다양한 색상의 산화수를 갖는 전이금속 (5족)", chemDesc: "산화수에 따라 보라, 초록, 파랑, 노랑 등 화려한 색상의 착이온을 형성하며 특수강 합금에 쓰입니다." },
  { num: 24, sym: "Cr", name: "크롬", eng: "Chromium", period: 4, group: 6, cat: "transition", block: "d", state: "고체", shells: [2, 8, 13, 1], valence: 1, oxidation: "+3, +6, +2", weight: "51.996", radius: 128, ionization: 653, en: 1.66, density: "7.19 g/cm³", isotopes: [{ name: "⁵²Cr (크롬-52)", mass: 52, abundance: "83.79%" }], chemTitle: "스테인리스강의 핵심 전이금속 (6족)", chemDesc: "d-오비탈 반채움 안정을 위해 [Ar] 3d⁵ 4s¹ 배치를 가지며, 녹슬지 않는 도금에 쓰입니다." },
  { num: 25, sym: "Mn", name: "망가니즈", eng: "Manganese", period: 4, group: 7, cat: "transition", block: "d", state: "고체", shells: [2, 8, 13, 2], valence: 2, oxidation: "+2, +4, +7", weight: "54.938", radius: 127, ionization: 717, en: 1.55, density: "7.21 g/cm³", isotopes: [{ name: "⁵⁵Mn (망가니즈-55)", mass: 55, abundance: "100%" }], chemTitle: "배터리와 과망가니즈산칼륨의 전이금속 (7족)", chemDesc: "+2부터 +7까지 폭넓은 산화수를 보이며 리튬이온 배터리 양극재의 주성분입니다." },
  { num: 26, sym: "Fe", name: "철", eng: "Iron", period: 4, group: 8, cat: "transition", block: "d", state: "고체", shells: [2, 8, 14, 2], valence: 2, oxidation: "+2, +3", weight: "55.845", radius: 126, ionization: 762, en: 1.83, density: "7.874 g/cm³", isotopes: [{ name: "⁵⁶Fe (철-56)", mass: 56, abundance: "91.75%" }, { name: "⁵⁴Fe (철-54)", mass: 54, abundance: "5.85%" }], chemTitle: "인류 문명과 생명의 기둥 (8족 전이금속)", chemDesc: "강자성을 띠며 강철 합금의 주성분이자 혈액 속 헤모글로빈의 산소 운반 핵원소입니다." },
  { num: 27, sym: "Co", name: "코발트", eng: "Cobalt", period: 4, group: 9, cat: "transition", block: "d", state: "고체", shells: [2, 8, 15, 2], valence: 2, oxidation: "+2, +3", weight: "58.933", radius: 125, ionization: 760, en: 1.88, density: "8.90 g/cm³", isotopes: [{ name: "⁵⁹Co (코발트-59)", mass: 59, abundance: "100%" }], chemTitle: "강력한 영구 자석과 비타민 B12의 원소 (9족)", chemDesc: "특유의 푸른색 코발트 블루 안료 및 이차전지 핵심 원자재로 쓰입니다." },
  { num: 28, sym: "Ni", name: "니켈", eng: "Nickel", period: 4, group: 10, cat: "transition", block: "d", state: "고체", shells: [2, 8, 16, 2], valence: 2, oxidation: "+2, +3", weight: "58.693", radius: 124, ionization: 737, en: 1.91, density: "8.908 g/cm³", isotopes: [{ name: "⁵⁸Ni (니켈-58)", mass: 58, abundance: "68.08%" }], chemTitle: "내식성 합금과 동전의 전이금속 (10족)", chemDesc: "강자성 금속으로 스테인리스강, 전기차 배터리 및 동전 주조에 널리 사용됩니다." },
  { num: 29, sym: "Cu", name: "구리", eng: "Copper", period: 4, group: 11, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 1], valence: 1, oxidation: "+1, +2", weight: "63.546", radius: 128, ionization: 745, en: 1.90, density: "8.96 g/cm³", isotopes: [{ name: "⁶³Cu (구리-63)", mass: 63, abundance: "69.17%" }, { name: "⁶⁵Cu (구리-65)", mass: 65, abundance: "30.83%" }], chemTitle: "최고의 전기 전도성을 지닌 붉은 전이금속 (11족)", chemDesc: "d¹⁰ 4s¹ 배치를 가지며 은 다음으로 우수한 전기·열 전도도로 전선과 전자 기판에 쓰입니다." },
  { num: 30, sym: "Zn", name: "아연", eng: "Zinc", period: 4, group: 12, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 2], valence: 2, oxidation: "+2", weight: "65.38", radius: 134, ionization: 906, en: 1.65, density: "7.14 g/cm³", isotopes: [{ name: "⁶⁴Zn (아연-64)", mass: 64, abundance: "49.17%" }], chemTitle: "철의 부식을 막는 희생 양극 전이금속 (12족)", chemDesc: "아연도금강판(갈바나이즈) 및 인체 효소 기능에 필수적인 원소입니다." },

  // 4주기 전형원소 (31~36)
  { num: 31, sym: "Ga", name: "갈륨", eng: "Gallium", period: 4, group: 13, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 3], valence: 3, oxidation: "+3", weight: "69.723", radius: 135, ionization: 579, en: 1.81, density: "5.91 g/cm³", isotopes: [{ name: "⁶⁹Ga (갈륨-69)", mass: 69, abundance: "60.11%" }], chemTitle: "손바닥 위에서 녹는 금속 (녹는점 29.8℃)", chemDesc: "질화갈륨(GaN) 등 차세대 전력 반도체와 블루 LED의 핵심 소재입니다." },
  { num: 32, sym: "Ge", name: "저마늄", eng: "Germanium", period: 4, group: 14, cat: "metalloid", block: "p", state: "고체", shells: [2, 8, 18, 4], valence: 4, oxidation: "+4, +2", weight: "72.630", radius: 122, ionization: 762, en: 2.01, density: "5.323 g/cm³", isotopes: [{ name: "⁷⁴Ge (저마늄-74)", mass: 74, abundance: "36.72%" }], chemTitle: "최초의 트랜지스터에 쓰인 준금속", chemDesc: "광섬유 및 적외선 광학 렌즈의 핵심 소재입니다." },
  { num: 33, sym: "As", name: "비소", eng: "Arsenic", period: 4, group: 15, cat: "metalloid", block: "p", state: "고체", shells: [2, 8, 18, 5], valence: 5, oxidation: "-3, +3, +5", weight: "74.922", radius: 119, ionization: 947, en: 2.18, density: "5.727 g/cm³", isotopes: [{ name: "⁷⁵As (비소-75)", mass: 75, abundance: "100%" }], chemTitle: "독성과 반도체성을 겸비한 준금속", chemDesc: "비소화갈륨(GaAs) 고속 반도체 소자에 활용됩니다." },
  { num: 34, sym: "Se", name: "셀레늄", eng: "Selenium", period: 4, group: 16, cat: "nonmetal", block: "p", state: "고체", shells: [2, 8, 18, 6], valence: 6, oxidation: "-2, +4, +6", weight: "78.971", radius: 116, ionization: 941, en: 2.55, density: "4.81 g/cm³", isotopes: [{ name: "⁸⁰Se (셀레늄-80)", mass: 80, abundance: "49.61%" }], chemTitle: "광전도성을 지닌 비금속", chemDesc: "빛을 받으면 전도도가 증가하여 복사기 감광 드럼에 쓰입니다." },
  { num: 35, sym: "Br", name: "브로민", eng: "Bromine", period: 4, group: 17, cat: "halogen", block: "p", state: "액체", shells: [2, 8, 18, 7], valence: 7, oxidation: "-1, +1, +5", weight: "79.904", radius: 114, ionization: 1140, en: 2.96, density: "3.1028 g/cm³", isotopes: [{ name: "⁷⁹Br (브로민-79)", mass: 79, abundance: "50.69%" }], chemTitle: "상온에서 유일한 적갈색 액체 비금속", chemDesc: "휘발성이 강한 적갈색 자극성 액체 할로젠입니다." },
  { num: 36, sym: "Kr", name: "크립톤", eng: "Krypton", period: 4, group: 18, cat: "noble", block: "p", state: "기체", shells: [2, 8, 18, 8], valence: 0, oxidation: "0, +2", weight: "83.798", radius: 110, ionization: 1351, en: 3.00, density: "3.749 g/L", isotopes: [{ name: "⁸⁴Kr (크립톤-84)", mass: 84, abundance: "57.00%" }], chemTitle: "고휘도 조명용 비활성 기체", chemDesc: "공항 활주로 유도등 및 고속 플래시 램프 충전 기체입니다." },

  // --- 5주기 (37~54): 4d 전이금속(39~48) 포함 ---
  { num: 37, sym: "Rb", name: "루비듐", eng: "Rubidium", period: 5, group: 1, cat: "alkali", block: "s", state: "고체", shells: [2, 8, 18, 8, 1], valence: 1, oxidation: "+1", weight: "85.468", radius: 248, ionization: 403, en: 0.82, density: "1.532 g/cm³", isotopes: [{ name: "⁸⁵Rb (루비듐-85)", mass: 85, abundance: "72.17%" }], chemTitle: "5주기 1족 알칼리 금속", chemDesc: "원자시계와 광전관에 사용되는 매우 반응성이 큰 금속입니다." },
  { num: 38, sym: "Sr", name: "스트론튬", eng: "Strontium", period: 5, group: 2, cat: "alkali-earth", block: "s", state: "고체", shells: [2, 8, 18, 8, 2], valence: 2, oxidation: "+2", weight: "87.62", radius: 215, ionization: 549, en: 0.95, density: "2.64 g/cm³", isotopes: [{ name: "⁸⁸Sr (스트론튬-88)", mass: 88, abundance: "82.58%" }], chemTitle: "붉은 불꽃놀이의 알칼리 토금속", chemDesc: "강렬한 진홍색 불꽃 반응을 보여 불꽃놀이와 조명탄에 쓰입니다." },
  { num: 39, sym: "Y", name: "이트륨", eng: "Yttrium", period: 5, group: 3, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 9, 2], valence: 2, oxidation: "+3", weight: "88.906", radius: 180, ionization: 600, en: 1.22, density: "4.472 g/cm³", isotopes: [{ name: "⁸⁹Y (이트륨-89)", mass: 89, abundance: "100%" }], chemTitle: "5주기 3족 전이금속", chemDesc: "희토류와 성질이 유사하며 YBCO 고온 초전도체와 레이저 소재로 쓰입니다." },
  { num: 40, sym: "Zr", name: "지르코늄", eng: "Zirconium", period: 5, group: 4, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 10, 2], valence: 2, oxidation: "+4", weight: "91.224", radius: 160, ionization: 640, en: 1.33, density: "6.52 g/cm³", isotopes: [{ name: "⁹⁰Zr (지르코늄-90)", mass: 90, abundance: "51.45%" }], chemTitle: "원자로 피복재 전이금속 (4족)", chemDesc: "중성자 흡수 단면적이 작고 고온 부식에 강해 원자력 연료봉 피복관에 쓰입니다." },
  { num: 41, sym: "Nb", name: "나이오븀", eng: "Niobium", period: 5, group: 5, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 12, 1], valence: 1, oxidation: "+5, +3", weight: "92.906", radius: 146, ionization: 652, en: 1.6, density: "8.57 g/cm³", isotopes: [{ name: "⁹³Nb (나이오븀-93)", mass: 93, abundance: "100%" }], chemTitle: "초전도 자석의 핵심 전이금속 (5족)", chemDesc: "MRI 및 입자 가속기 초전도 자석 합금(Nb-Ti)에 쓰입니다." },
  { num: 42, sym: "Mo", name: "몰리브데넘", eng: "Molybdenum", period: 5, group: 6, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 13, 1], valence: 1, oxidation: "+6, +4", weight: "95.95", radius: 139, ionization: 684, en: 2.16, density: "10.28 g/cm³", isotopes: [{ name: "⁹⁸Mo (몰리브데넘-98)", mass: 98, abundance: "24.13%" }], chemTitle: "초고온 내열 합금 전이금속 (6족)", chemDesc: "녹는점이 2623℃에 달해 항공우주 고온 부품에 필수적입니다." },
  { num: 43, sym: "Tc", name: "테크네튬", eng: "Technetium", period: 5, group: 7, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 13, 2], valence: 2, oxidation: "+7, +4", weight: "[98]", radius: 136, ionization: 702, en: 1.9, density: "11.0 g/cm³", isotopes: [{ name: "⁹⁹ᵐTc (테크네튬-99m)", mass: 99, abundance: "의료 방사성" }], chemTitle: "최초의 인공 합성 방사성 전이금속 (7족)", chemDesc: "핵의학 진단(SPECT 스캔)에 전 세계적으로 가장 많이 쓰이는 방사성 동위원소입니다." },
  { num: 44, sym: "Ru", name: "루테늄", eng: "Ruthenium", period: 5, group: 8, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 15, 1], valence: 1, oxidation: "+3, +4, +8", weight: "101.07", radius: 134, ionization: 710, en: 2.2, density: "12.45 g/cm³", isotopes: [{ name: "¹⁰²Ru (루테늄-102)", mass: 102, abundance: "31.55%" }], chemTitle: "백금족 귀금속 전이금속 (8족)", chemDesc: "전기 접점 및 유기 화학 합성 촉매로 활용됩니다." },
  { num: 45, sym: "Rh", name: "로듐", eng: "Rhodium", period: 5, group: 9, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 16, 1], valence: 1, oxidation: "+3", weight: "102.91", radius: 134, ionization: 720, en: 2.28, density: "12.41 g/cm³", isotopes: [{ name: "¹⁰³Rh (로듐-103)", mass: 103, abundance: "100%" }], chemTitle: "가장 귀한 백금족 자동차 정화 촉매 (9족)", chemDesc: "자동차 배기가스의 유해 질소산화물을 환원 정화하는 고가 귀금속입니다." },
  { num: 46, sym: "Pd", name: "팔라듐", eng: "Palladium", period: 5, group: 10, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 18, 0], valence: 0, oxidation: "+2, +4", weight: "106.42", radius: 137, ionization: 804, en: 2.20, density: "12.02 g/cm³", isotopes: [{ name: "¹⁰⁶Pd (팔라듐-106)", mass: 106, abundance: "27.33%" }], chemTitle: "수소를 대량 흡수하는 전이금속 (10족)", chemDesc: "자체 부피의 900배에 달하는 수소 기체를 흡수하며 크로스 커플링 반응의 촉매입니다." },
  { num: 47, sym: "Ag", name: "은", eng: "Silver", period: 5, group: 11, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 18, 1], valence: 1, oxidation: "+1", weight: "107.87", radius: 144, ionization: 731, en: 1.93, density: "10.49 g/cm³", isotopes: [{ name: "¹⁰⁷Ag (은-107)", mass: 107, abundance: "51.84%" }], chemTitle: "모든 금속 중 전기·열전도도 1위 (11족)", chemDesc: "최고의 반사율과 항균성을 지닌 유서 깊은 귀금속 전이금속입니다." },
  { num: 48, sym: "Cd", name: "카드뮴", eng: "Cadmium", period: 5, group: 12, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 18, 2], valence: 2, oxidation: "+2", weight: "112.41", radius: 151, ionization: 868, en: 1.69, density: "8.65 g/cm³", isotopes: [{ name: "¹¹⁴Cd (카드뮴-114)", mass: 114, abundance: "28.73%" }], chemTitle: "중금속 독성과 니카드 전지의 원소 (12족)", chemDesc: "이타이이타이병의 원인 물질이며 니켈-카드뮴 충전지에 쓰였습니다." },
  { num: 49, sym: "In", name: "인듐", eng: "Indium", period: 5, group: 13, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 18, 3], valence: 3, oxidation: "+3", weight: "114.82", radius: 167, ionization: 558, en: 1.78, density: "7.31 g/cm³", isotopes: [{ name: "¹¹⁵In (인듐-115)", mass: 115, abundance: "95.7%" }], chemTitle: "스마트폰 터치스크린 투명전극(ITO) 원소", chemDesc: "매우 무른 금속으로 디스플레이용 투명 전극의 주성분입니다." },
  { num: 50, sym: "Sn", name: "주석", eng: "Tin", period: 5, group: 14, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 18, 4], valence: 4, oxidation: "+2, +4", weight: "118.71", radius: 140, ionization: 709, en: 1.96, density: "7.31 g/cm³", isotopes: [{ name: "¹²⁰Sn (주석-120)", mass: 120, abundance: "32.58%" }], chemTitle: "청동기 시대부터 쓰인 땜납 금속", chemDesc: "구리와 합금하여 청동(Bronze)을 만들며 납땜용 무연 솔더에 쓰입니다." },
  { num: 51, sym: "Sb", name: "안티모니", eng: "Antimony", period: 5, group: 15, cat: "metalloid", block: "p", state: "고체", shells: [2, 8, 18, 18, 5], valence: 5, oxidation: "-3, +3, +5", weight: "121.76", radius: 140, ionization: 834, en: 2.05, density: "6.685 g/cm³", isotopes: [{ name: "¹²¹Sb (안티모니-121)", mass: 121, abundance: "57.21%" }], chemTitle: "납 축전지 및 난연제 준금속", chemDesc: "화재 방지 난연제 및 반도체 소재에 쓰입니다." },
  { num: 52, sym: "Te", name: "텔루륨", eng: "Tellurium", period: 5, group: 16, cat: "metalloid", block: "p", state: "고체", shells: [2, 8, 18, 18, 6], valence: 6, oxidation: "-2, +4, +6", weight: "127.60", radius: 142, ionization: 869, en: 2.1, density: "6.24 g/cm³", isotopes: [{ name: "¹³⁰Te (텔루륨-130)", mass: 130, abundance: "34.08%" }], chemTitle: "CdTe 태양전지와 열전소재 준금속", chemDesc: "열을 전기로 바꾸는 펠티어 소자에 널리 활용됩니다." },
  { num: 53, sym: "I", name: "아이오딘", eng: "Iodine", period: 5, group: 17, cat: "halogen", block: "p", state: "고체", shells: [2, 8, 18, 18, 7], valence: 7, oxidation: "-1, +1, +5, +7", weight: "126.90", radius: 133, ionization: 1008, en: 2.66, density: "4.933 g/cm³", isotopes: [{ name: "¹²⁷I (아이오딘-127)", mass: 127, abundance: "100%" }], chemTitle: "승화성 보라색 결정 할로젠", chemDesc: "갑상샘 호르몬의 필수 구성 성분이며 소독용 빨간약에 쓰입니다." },
  { num: 54, sym: "Xe", name: "제논", eng: "Xenon", period: 5, group: 18, cat: "noble", block: "p", state: "기체", shells: [2, 8, 18, 18, 8], valence: 0, oxidation: "0, +2, +4, +6", weight: "131.29", radius: 130, ionization: 1170, en: 2.6, density: "5.894 g/L", isotopes: [{ name: "¹³²Xe (제논-132)", mass: 132, abundance: "26.91%" }], chemTitle: "우주선 이온 엔진의 추진제 비활성 기체", chemDesc: "무거운 비활성 기체로 우주 탐사선의 이온 추진 엔진에 쓰입니다." },

  // --- 6주기 (55~86): 5d 전이금속(72~80), 란타넘족(57~71) 포함 ---
  { num: 55, sym: "Cs", name: "세슘", eng: "Caesium", period: 6, group: 1, cat: "alkali", block: "s", state: "고체", shells: [2, 8, 18, 18, 8, 1], valence: 1, oxidation: "+1", weight: "132.91", radius: 265, ionization: 376, en: 0.79, density: "1.93 g/cm³", isotopes: [{ name: "¹³³Cs (세슘-133)", mass: 133, abundance: "100%" }], chemTitle: "1초(시간)의 표준을 정의하는 원자", chemDesc: "세슘 원자의 진동수로 국제 표준 1초를 정의합니다." },
  { num: 56, sym: "Ba", name: "바륨", eng: "Barium", period: 6, group: 2, cat: "alkali-earth", block: "s", state: "고체", shells: [2, 8, 18, 18, 8, 2], valence: 2, oxidation: "+2", weight: "137.33", radius: 222, ionization: 503, en: 0.89, density: "3.51 g/cm³", isotopes: [{ name: "¹³⁸Ba (바륨-138)", mass: 138, abundance: "71.7%" }], chemTitle: "소화기 X선 조영제 알칼리 토금속", chemDesc: "황산바륨 현탁액으로 위장 조영 촬영에 쓰이며 황록색 불꽃을 냅니다." },

  // 란타넘족 (57~71)
  { num: 57, sym: "La", name: "란타넘", eng: "Lanthanum", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 18, 9, 2], valence: 2, oxidation: "+3", weight: "138.91", radius: 187, ionization: 538, en: 1.1, density: "6.162 g/cm³", isotopes: [{ name: "¹³⁹La", mass: 139, abundance: "99.91%" }], chemTitle: "란타넘족의 시작", chemDesc: "하이브리드 배터리 및 카메라 광학 렌즈 소재입니다." },
  { num: 58, sym: "Ce", name: "세륨", eng: "Cerium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 19, 9, 2], valence: 2, oxidation: "+3, +4", weight: "140.12", radius: 181, ionization: 534, en: 1.12, density: "6.77 g/cm³", isotopes: [{ name: "¹⁴⁰Ce", mass: 140, abundance: "88.45%" }], chemTitle: "유리 연마재 및 촉매 희토류", chemDesc: "반도체 웨이퍼 연마(CMP 슬러리)의 필수 소재입니다." },
  { num: 59, sym: "Pr", name: "프라세오디뮴", eng: "Praseodymium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 21, 8, 2], valence: 2, oxidation: "+3", weight: "140.91", radius: 182, ionization: 527, en: 1.13, density: "6.77 g/cm³", isotopes: [{ name: "¹⁴¹Pr", mass: 141, abundance: "100%" }], chemTitle: "영구자석 및 항공기 합금", chemDesc: "네오디뮴 자석 강도 보강용으로 쓰입니다." },
  { num: 60, sym: "Nd", name: "네오디뮴", eng: "Neodymium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 22, 8, 2], valence: 2, oxidation: "+3", weight: "144.24", radius: 182, ionization: 533, en: 1.14, density: "7.01 g/cm³", isotopes: [{ name: "¹⁴²Nd", mass: 142, abundance: "27.2%" }], chemTitle: "최강의 영구자석 소재 (모터 핵심)", chemDesc: "전기차 모터와 풍력 발전에 필수적인 초강력 NdFeB 자석의 주원료입니다." },
  { num: 61, sym: "Pm", name: "프로메튬", eng: "Promethium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 23, 8, 2], valence: 2, oxidation: "+3", weight: "[145]", radius: 181, ionization: 540, en: 1.13, density: "7.26 g/cm³", isotopes: [{ name: "¹⁴⁵Pm", mass: 145, abundance: "방사성" }], chemTitle: "란타넘족 유일의 방사성 원소", chemDesc: "원자력 전지 및 형광 도료에 활용됩니다." },
  { num: 62, sym: "Sm", name: "사마륨", eng: "Samarium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 24, 8, 2], valence: 2, oxidation: "+3, +2", weight: "150.36", radius: 180, ionization: 545, en: 1.17, density: "7.52 g/cm³", isotopes: [{ name: "¹⁵²Sm", mass: 152, abundance: "26.75%" }], chemTitle: "고온용 사마륨-코발트 자석 소재", chemDesc: "고온에서도 자성을 잃지 않는 자석으로 항공우주에 쓰입니다." },
  { num: 63, sym: "Eu", name: "유로퓸", eng: "Europium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 25, 8, 2], valence: 2, oxidation: "+3, +2", weight: "151.96", radius: 199, ionization: 547, en: 1.2, density: "5.24 g/cm³", isotopes: [{ name: "¹⁵³Eu", mass: 153, abundance: "52.2%" }], chemTitle: "지폐 위조 방지 붉은 형광체", chemDesc: "유로화 지폐의 형광 위조 방지 마크에 사용됩니다." },
  { num: 64, sym: "Gd", name: "가돌리늄", eng: "Gadolinium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 25, 9, 2], valence: 2, oxidation: "+3", weight: "157.25", radius: 179, ionization: 593, en: 1.2, density: "7.90 g/cm³", isotopes: [{ name: "¹⁵⁸Gd", mass: 158, abundance: "24.84%" }], chemTitle: "MRI 조영제의 핵심 희토류", chemDesc: "상자성 특성으로 정밀 MRI 조영제에 사용됩니다." },
  { num: 65, sym: "Tb", name: "터븀", eng: "Terbium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 27, 8, 2], valence: 2, oxidation: "+3, +4", weight: "158.93", radius: 176, ionization: 566, en: 1.2, density: "8.23 g/cm³", isotopes: [{ name: "¹⁵⁹Tb", mass: 159, abundance: "100%" }], chemTitle: "녹색 형광체 및 자왜 소자", chemDesc: "자기장에 반응하여 길이가 변하는 음향 소자에 쓰입니다." },
  { num: 66, sym: "Dy", name: "디스프로슘", eng: "Dysprosium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 28, 8, 2], valence: 2, oxidation: "+3", weight: "162.50", radius: 175, ionization: 573, en: 1.22, density: "8.54 g/cm³", isotopes: [{ name: "¹⁶⁴Dy", mass: 164, abundance: "28.3%" }], chemTitle: "전기차 모터용 고온 내열 자석 첨가제", chemDesc: "네오디뮴 자석의 고온 감자를 방지하는 결정적 원소입니다." },
  { num: 67, sym: "Ho", name: "홀뮴", eng: "Holmium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 29, 8, 2], valence: 2, oxidation: "+3", weight: "164.93", radius: 174, ionization: 581, en: 1.23, density: "8.79 g/cm³", isotopes: [{ name: "¹⁶⁵Ho", mass: 165, abundance: "100%" }], chemTitle: "가장 높은 자기 모멘트를 지닌 원소", chemDesc: "의료용 수술 홀뮴 레이저에 사용됩니다." },
  { num: 68, sym: "Er", name: "어븀", eng: "Erbium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 30, 8, 2], valence: 2, oxidation: "+3", weight: "167.26", radius: 173, ionization: 589, en: 1.24, density: "9.07 g/cm³", isotopes: [{ name: "¹⁶⁶Er", mass: 166, abundance: "33.6%" }], chemTitle: "해저 광통신 증폭기(EDFA) 원소", chemDesc: "대륙 간 광통신 케이블 신호 증폭에 필수적입니다." },
  { num: 69, sym: "Tm", name: "툴륨", eng: "Thulium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 31, 8, 2], valence: 2, oxidation: "+3", weight: "168.93", radius: 172, ionization: 597, en: 1.25, density: "9.32 g/cm³", isotopes: [{ name: "¹⁶⁹Tm", mass: 169, abundance: "100%" }], chemTitle: "휴대용 X선 기기 원소", chemDesc: "방사선 치료와 정밀 레이저에 쓰입니다." },
  { num: 70, sym: "Yb", name: "이터븀", eng: "Ytterbium", period: 6, group: 3, cat: "lanthanide", block: "f", state: "고체", shells: [2, 8, 18, 32, 8, 2], valence: 2, oxidation: "+3, +2", weight: "173.05", radius: 194, ionization: 603, en: 1.1, density: "6.90 g/cm³", isotopes: [{ name: "¹⁷⁴Yb", mass: 174, abundance: "31.8%" }], chemTitle: "초정밀 차세대 원자시계 원소", chemDesc: "광격자 원자시계 소재로 사용됩니다." },
  { num: 71, sym: "Lu", name: "루테튬", eng: "Lutetium", period: 6, group: 3, cat: "lanthanide", block: "d", state: "고체", shells: [2, 8, 18, 32, 9, 2], valence: 2, oxidation: "+3", weight: "174.97", radius: 172, ionization: 524, en: 1.27, density: "9.84 g/cm³", isotopes: [{ name: "¹⁷⁵Lu", mass: 175, abundance: "97.41%" }], chemTitle: "란타넘족의 마지막 원소", chemDesc: "PET 암 진단기용 섬광체 결정에 쓰입니다." },

  // ⭐ 6주기 전이금속 (72~80): 하프늄, 텅스텐, 백금, 금, 수은 등
  { num: 72, sym: "Hf", name: "하프늄", eng: "Hafnium", period: 6, group: 4, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 10, 2], valence: 2, oxidation: "+4", weight: "178.49", radius: 159, ionization: 658, en: 1.3, density: "13.31 g/cm³", isotopes: [{ name: "¹⁸⁰Hf", mass: 180, abundance: "35.1%" }], chemTitle: "최첨단 반도체 High-k 절연막 전이금속 (4족)", chemDesc: "지르코늄과 성질이 극히 비슷하며 나노 반도체 절연막 소재입니다." },
  { num: 73, sym: "Ta", name: "탄탈럼", eng: "Tantalum", period: 6, group: 5, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 11, 2], valence: 2, oxidation: "+5", weight: "180.95", radius: 146, ionization: 761, en: 1.5, density: "16.69 g/cm³", isotopes: [{ name: "¹⁸¹Ta", mass: 181, abundance: "99.98%" }], chemTitle: "스마트폰 소형 커패시터 전이금속 (5족)", chemDesc: "부식에 극히 강해 외과용 수술 클립과 초소형 커패시터에 쓰입니다." },
  { num: 74, sym: "W", name: "텅스텐", eng: "Tungsten", period: 6, group: 6, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 12, 2], valence: 2, oxidation: "+6", weight: "183.84", radius: 139, ionization: 770, en: 2.36, density: "19.25 g/cm³", isotopes: [{ name: "¹⁸⁴W", mass: 184, abundance: "30.64%" }], chemTitle: "모든 금속 중 최고 녹는점 (3422℃) (6족)", chemDesc: "경도가 매우 높아 초경합금 드릴과 전구 필라멘트로 쓰입니다." },
  { num: 75, sym: "Re", name: "레늄", eng: "Rhenium", period: 6, group: 7, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 13, 2], valence: 2, oxidation: "+7, +4", weight: "186.21", radius: 137, ionization: 760, en: 1.9, density: "21.02 g/cm³", isotopes: [{ name: "¹⁸⁷Re", mass: 187, abundance: "62.6%" }], chemTitle: "제트 엔진 터빈 블레이드 초내열 전이금속 (7족)", chemDesc: "극도의 내열성으로 최신 제트 엔진 초합금의 핵심입니다." },
  { num: 76, sym: "Os", name: "오스뮴", eng: "Osmium", period: 6, group: 8, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 14, 2], valence: 2, oxidation: "+4, +8", weight: "190.23", radius: 135, ionization: 840, en: 2.2, density: "22.59 g/cm³ (밀도 1위)", isotopes: [{ name: "¹⁹²Os", mass: 192, abundance: "40.78%" }], chemTitle: "모든 원소 중 밀도 1위의 초중금속 (8족)", chemDesc: "만년필 촉 끝과 내마모성 정밀 기기에 쓰입니다." },
  { num: 77, sym: "Ir", name: "이리듐", eng: "Iridium", period: 6, group: 9, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 15, 2], valence: 2, oxidation: "+3, +4", weight: "192.22", radius: 136, ionization: 880, en: 2.2, density: "22.56 g/cm³", isotopes: [{ name: "¹⁹³Ir", mass: 193, abundance: "62.7%" }], chemTitle: "공룡 멸종 운석 지층의 증거 원소 (9족)", chemDesc: "가장 내식성이 뛰어난 금속으로 스파크 플러그 팁에 쓰입니다." },
  { num: 78, sym: "Pt", name: "백금", eng: "Platinum", period: 6, group: 10, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 17, 1], valence: 1, oxidation: "+2, +4", weight: "195.08", radius: 139, ionization: 870, en: 2.28, density: "21.45 g/cm³", isotopes: [{ name: "¹⁹⁵Pt", mass: 195, abundance: "33.83%" }], chemTitle: "수소 연료전지 및 귀금속의 왕 (10족 전이금속)", chemDesc: "최고의 화학적 안정성을 보이며 수소 연료전지 촉매의 핵심입니다." },
  { num: 79, sym: "Au", name: "금", eng: "Gold", period: 6, group: 11, cat: "transition", block: "d", state: "고체", shells: [2, 8, 18, 32, 18, 1], valence: 1, oxidation: "+1, +3", weight: "196.97", radius: 144, ionization: 890, en: 2.54, density: "19.3 g/cm³", isotopes: [{ name: "¹⁹⁷Au", mass: 197, abundance: "100%" }], chemTitle: "가장 전성·연성이 우수한 불변의 황금 (11족)", chemDesc: "공기 중에서 영원히 산화되지 않으며 반도체 본딩 와이어에 쓰입니다." },
  { num: 80, sym: "Hg", name: "수은", eng: "Mercury", period: 6, group: 12, cat: "transition", block: "d", state: "액체", shells: [2, 8, 18, 32, 18, 2], valence: 2, oxidation: "+1, +2", weight: "200.59", radius: 151, ionization: 1007, en: 2.0, density: "13.534 g/cm³", isotopes: [{ name: "²⁰²Hg", mass: 202, abundance: "29.86%" }], chemTitle: "상온에서 유일한 은백색 액체 금속 (12족)", chemDesc: "온도계와 아말감에 쓰였으며 강한 독성을 지닌 전이금속입니다." },

  // 6주기 전형원소 (81~86)
  { num: 81, sym: "Tl", name: "탈륨", eng: "Thallium", period: 6, group: 13, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 32, 18, 3], valence: 3, oxidation: "+1, +3", weight: "204.38", radius: 170, ionization: 589, en: 1.62, density: "11.85 g/cm³", isotopes: [{ name: "²⁰⁵Tl", mass: 205, abundance: "70.48%" }], chemTitle: "극독성을 지닌 전이후 금속", chemDesc: "살서제에 쓰였던 맹독성 원소입니다." },
  { num: 82, sym: "Pb", name: "납", eng: "Lead", period: 6, group: 14, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 32, 18, 4], valence: 4, oxidation: "+2, +4", weight: "207.2", radius: 146, ionization: 716, en: 2.33, density: "11.34 g/cm³", isotopes: [{ name: "²⁰⁸Pb", mass: 208, abundance: "52.4%" }], chemTitle: "방사선 차폐재와 차량용 배터리 원소", chemDesc: "방사선 붕괴 계열의 최종 안정 생성물이며 X선 차폐복에 쓰입니다." },
  { num: 83, sym: "Bi", name: "비스무트", eng: "Bismuth", period: 6, group: 15, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 32, 18, 5], valence: 5, oxidation: "+3", weight: "208.98", radius: 156, ionization: 703, en: 2.02, density: "9.78 g/cm³", isotopes: [{ name: "²⁰⁹Bi", mass: 209, abundance: "100%" }], chemTitle: "무지개 빛깔의 무독성 중금속", chemDesc: "산화 피막의 간섭으로 오색영롱한 결정을 이룹니다." },
  { num: 84, sym: "Po", name: "폴로늄", eng: "Polonium", period: 6, group: 16, cat: "post-transition", block: "p", state: "고체", shells: [2, 8, 18, 32, 18, 6], valence: 6, oxidation: "+2, +4", weight: "[209]", radius: 168, ionization: 812, en: 2.0, density: "9.20 g/cm³", isotopes: [{ name: "²¹⁰Po", mass: 210, abundance: "방사성" }], chemTitle: "퀴리 부부가 발견한 강력한 알파 방사선 원소", chemDesc: "정전기 제거 브러시와 원자력 열원에 쓰입니다." },
  { num: 85, sym: "At", name: "아스타틴", eng: "Astatine", period: 6, group: 17, cat: "halogen", block: "p", state: "고체", shells: [2, 8, 18, 32, 18, 7], valence: 7, oxidation: "-1, +1", weight: "[210]", radius: 145, ionization: 920, en: 2.2, density: "6.4 g/cm³", isotopes: [{ name: "²¹¹At", mass: 211, abundance: "방사성" }], chemTitle: "지각에 1g도 안 되는 가장 희귀한 할로젠", chemDesc: "표적 알파선 암 치료제 후보로 연구 중입니다." },
  { num: 86, sym: "Rn", name: "라돈", eng: "Radon", period: 6, group: 18, cat: "noble", block: "p", state: "기체", shells: [2, 8, 18, 32, 18, 8], valence: 0, oxidation: "0", weight: "[222]", radius: 140, ionization: 1037, en: 2.2, density: "9.73 g/L", isotopes: [{ name: "²²²Rn", mass: 222, abundance: "방사성" }], chemTitle: "방사성 비활성 기체 (실내 환경 요주의)", chemDesc: "라듐의 붕괴 생성물로 폐암 유발 주의 기체입니다." },

  // --- 7주기 (87~118): 악티늄족(89~103), 초우라늄 전이금속(104~112) 등 ---
  { num: 87, sym: "Fr", name: "프랑슘", eng: "Francium", period: 7, group: 1, cat: "alkali", block: "s", state: "고체", shells: [2, 8, 18, 32, 18, 8, 1], valence: 1, oxidation: "+1", weight: "[223]", radius: 270, ionization: 380, en: 0.7, density: "1.87 g/cm³", isotopes: [{ name: "²²³Fr", mass: 223, abundance: "방사성" }], chemTitle: "극히 불안정한 7주기 알칼리 금속", chemDesc: "반감기가 22분에 불과한 방사성 원소입니다." },
  { num: 88, sym: "Ra", name: "라듐", eng: "Radium", period: 7, group: 2, cat: "alkali-earth", block: "s", state: "고체", shells: [2, 8, 18, 32, 18, 8, 2], valence: 2, oxidation: "+2", weight: "[226]", radius: 220, ionization: 509, en: 0.9, density: "5.5 g/cm³", isotopes: [{ name: "²²⁶Ra", mass: 226, abundance: "방사성" }], chemTitle: "퀴리 부부가 정제한 역사적 방사성 원소", chemDesc: "어둠 속에서 푸른빛을 내며 방사능 연구의 시초가 되었습니다." },

  // 악티늄족 (89~103)
  { num: 89, sym: "Ac", name: "악티늄", eng: "Actinium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 18, 9, 2], valence: 2, oxidation: "+3", weight: "[227]", radius: 195, ionization: 499, en: 1.1, density: "10.07 g/cm³", isotopes: [{ name: "²²⁷Ac", mass: 227, abundance: "방사성" }], chemTitle: "악티늄족의 시작", chemDesc: "강한 방사능으로 푸른빛을 발하는 원소입니다." },
  { num: 90, sym: "Th", name: "토륨", eng: "Thorium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 18, 10, 2], valence: 2, oxidation: "+4", weight: "232.04", radius: 180, ionization: 587, en: 1.3, density: "11.72 g/cm³", isotopes: [{ name: "²³²Th", mass: 232, abundance: "100%" }], chemTitle: "차세대 토륨 원전의 청정 핵연료", chemDesc: "우라늄보다 매장량이 3배 많고 폐기물이 적은 차세대 원전 연료입니다." },
  { num: 91, sym: "Pa", name: "프로트악티늄", eng: "Protactinium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 20, 9, 2], valence: 2, oxidation: "+5", weight: "231.04", radius: 160, ionization: 568, en: 1.5, density: "15.37 g/cm³", isotopes: [{ name: "²³¹Pa", mass: 231, abundance: "방사성" }], chemTitle: "고독성 방사성 원소", chemDesc: "지질학적 연대측정에 사용됩니다." },
  { num: 92, sym: "U", name: "우라늄", eng: "Uranium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 21, 9, 2], valence: 2, oxidation: "+6, +4", weight: "238.03", radius: 156, ionization: 597, en: 1.38, density: "19.1 g/cm³", isotopes: [{ name: "²³⁵U (우라늄-235)", mass: 235, abundance: "0.72%" }, { name: "²³⁸U (우라늄-238)", mass: 238, abundance: "99.27%" }], chemTitle: "원자력 발전의 핵심 핵분열 원소", chemDesc: "U-235의 핵분열 연쇄반응으로 원자력 에너지를 생산합니다." },
  { num: 93, sym: "Np", name: "넵투늄", eng: "Neptunium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 22, 9, 2], valence: 2, oxidation: "+5", weight: "[237]", radius: 155, ionization: 604, en: 1.36, density: "20.45 g/cm³", isotopes: [{ name: "²³⁷Np", mass: 237, abundance: "방사성" }], chemTitle: "첫 번째 초우라늄 원소", chemDesc: "플루토늄-238 전구체로 쓰입니다." },
  { num: 94, sym: "Pu", name: "플루토늄", eng: "Plutonium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 24, 8, 2], valence: 2, oxidation: "+4, +6", weight: "[244]", radius: 159, ionization: 584, en: 1.28, density: "19.86 g/cm³", isotopes: [{ name: "²³⁹Pu", mass: 239, abundance: "핵분열성" }], chemTitle: "핵연료 및 심우주 탐사선 전지원소", chemDesc: "보이저호 등 심우주선의 원자력 전지(RTG)에 사용됩니다." },
  { num: 95, sym: "Am", name: "아메리슘", eng: "Americium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 25, 8, 2], valence: 2, oxidation: "+3", weight: "[243]", radius: 173, ionization: 578, en: 1.3, density: "12 g/cm³", isotopes: [{ name: "²⁴¹Am", mass: 241, abundance: "이온화연기감지" }], chemTitle: "화재 감지기(연기 감지기) 원소", chemDesc: "가정용 화재 연기 감지 센서에 극미량 사용됩니다." },
  { num: 96, sym: "Cm", name: "퀴륨", eng: "Curium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 25, 9, 2], valence: 2, oxidation: "+3", weight: "[247]", radius: 174, ionization: 581, en: 1.3, density: "13.51 g/cm³", isotopes: [{ name: "²⁴⁷Cm", mass: 247, abundance: "방사성" }], chemTitle: "퀴리 부부의 이름을 딴 원소", chemDesc: "화성 탐사 로버의 알파선 X선 분광기에 쓰였습니다." },
  { num: 97, sym: "Bk", name: "버클륨", eng: "Berkelium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 27, 8, 2], valence: 2, oxidation: "+3", weight: "[247]", radius: 170, ionization: 601, en: 1.3, density: "14.78 g/cm³", isotopes: [{ name: "²⁴⁷Bk", mass: 247, abundance: "방사성" }], chemTitle: "초중원소 테네신 합성의 타깃", chemDesc: "버클리 연구소에서 합성되었습니다." },
  { num: 98, sym: "Cf", name: "캘리포늄", eng: "Californium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 28, 8, 2], valence: 2, oxidation: "+3", weight: "[251]", radius: 186, ionization: 608, en: 1.3, density: "15.1 g/cm³", isotopes: [{ name: "²⁵²Cf", mass: 252, abundance: "강력한 중성자원" }], chemTitle: "초강력 중성자 방출 원소", chemDesc: "항공기 부품 비파괴 검사와 원자로 시동용 중성자원입니다." },
  { num: 99, sym: "Es", name: "아인슈타이늄", eng: "Einsteinium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 29, 8, 2], valence: 2, oxidation: "+3", weight: "[252]", radius: 186, ionization: 619, en: 1.3, density: "8.84 g/cm³", isotopes: [{ name: "²⁵²Es", mass: 252, abundance: "방사성" }], chemTitle: "수소폭탄 낙진에서 발견된 원소", chemDesc: "아인슈타인을 기려 명명되었습니다." },
  { num: 100, sym: "Fm", name: "페르뮴", eng: "Fermium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 30, 8, 2], valence: 2, oxidation: "+3", weight: "[257]", radius: 198, ionization: 627, en: 1.3, density: "-", isotopes: [{ name: "²⁵⁷Fm", mass: 257, abundance: "방사성" }], chemTitle: "엔리코 페르미를 기린 100번 원소", chemDesc: "중성자 포획으로 만들 수 있는 가장 무거운 원소입니다." },
  { num: 101, sym: "Md", name: "멘델레븀", eng: "Mendelevium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 31, 8, 2], valence: 2, oxidation: "+3, +2", weight: "[258]", radius: 194, ionization: 635, en: 1.3, density: "-", isotopes: [{ name: "²⁵⁸Md", mass: 258, abundance: "방사성" }], chemTitle: "주기율표의 창시자 멘델레예프를 기린 원소", chemDesc: "원자 하나씩 카운트하여 발견되었습니다." },
  { num: 102, sym: "No", name: "노벨륨", eng: "Nobelium", period: 7, group: 3, cat: "actinide", block: "f", state: "고체", shells: [2, 8, 18, 32, 32, 8, 2], valence: 2, oxidation: "+2, +3", weight: "[259]", radius: 197, ionization: 642, en: 1.3, density: "-", isotopes: [{ name: "²⁵⁹No", mass: 259, abundance: "방사성" }], chemTitle: "알프레드 노벨을 기린 원소", chemDesc: "+2가 산화 상태가 유난히 안정합니다." },
  { num: 103, sym: "Lr", name: "로렌슘", eng: "Lawrencium", period: 7, group: 3, cat: "actinide", block: "d", state: "고체", shells: [2, 8, 18, 32, 32, 8, 3], valence: 3, oxidation: "+3", weight: "[266]", radius: 171, ionization: 470, en: 1.3, density: "-", isotopes: [{ name: "²⁶⁶Lr", mass: 266, abundance: "방사성" }], chemTitle: "악티늄족의 마지막 원소", chemDesc: "사이클로트론 발명자 로렌스를 기렸습니다." },

  // ⭐ 7주기 초중 전이금속 (104~112: 러더포듐 ~ 코페르니슘)
  { num: 104, sym: "Rf", name: "러더포듐", eng: "Rutherfordium", period: 7, group: 4, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 10, 2], valence: 2, oxidation: "+4", weight: "[267]", radius: 157, ionization: 580, en: "-", density: "23.2 g/cm³", isotopes: [{ name: "²⁶⁷Rf", mass: 267, abundance: "합성" }], chemTitle: "초중 전이금속 (4족)", chemDesc: "러더퍼드를 기린 최초의 초악티늄족 전이금속입니다." },
  { num: 105, sym: "Db", name: "더브늄", eng: "Dubnium", period: 7, group: 5, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 11, 2], valence: 2, oxidation: "+5", weight: "[268]", radius: 149, ionization: 664, en: "-", density: "29.3 g/cm³", isotopes: [{ name: "²⁶⁸Db", mass: 268, abundance: "합성" }], chemTitle: "러시아 두브나 연구소의 전이금속 (5족)", chemDesc: "탄탈럼과 화학적 거동이 유사한 초중원소입니다." },
  { num: 106, sym: "Sg", name: "시보귬", eng: "Seaborgium", period: 7, group: 6, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 12, 2], valence: 2, oxidation: "+6", weight: "[269]", radius: 143, ionization: 757, en: "-", density: "35.0 g/cm³", isotopes: [{ name: "²⁶⁹Sg", mass: 269, abundance: "합성" }], chemTitle: "글렌 시보그 생전에 명명된 전이금속 (6족)", chemDesc: "텅스텐과 유사한 화합물을 형성합니다." },
  { num: 107, sym: "Bh", name: "보륨", eng: "Bohrium", period: 7, group: 7, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 13, 2], valence: 2, oxidation: "+7", weight: "[270]", radius: 141, ionization: 790, en: "-", density: "37.1 g/cm³", isotopes: [{ name: "²⁷⁰Bh", mass: 270, abundance: "합성" }], chemTitle: "닐스 보어를 기린 전이금속 (7족)", chemDesc: "레늄의 화학적 유사체입니다." },
  { num: 108, sym: "Hs", name: "하슘", eng: "Hassium", period: 7, group: 8, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 14, 2], valence: 2, oxidation: "+8", weight: "[277]", radius: 134, ionization: 820, en: "-", density: "40.7 g/cm³", isotopes: [{ name: "²⁷⁷Hs", mass: 277, abundance: "합성" }], chemTitle: "오스뮴과 유사한 사산화물 형성 전이금속 (8족)", chemDesc: "독일 헤센주에서 합성된 초중 전이원소입니다." },
  { num: 109, sym: "Mt", name: "마이트너륨", eng: "Meitnerium", period: 7, group: 9, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 15, 2], valence: 2, oxidation: "+3", weight: "[278]", radius: 129, ionization: 800, en: "-", density: "37.4 g/cm³", isotopes: [{ name: "²⁷⁸Mt", mass: 278, abundance: "합성" }], chemTitle: "여성 물리학자 리제 마이트너를 기린 원소 (9족)", chemDesc: "백금족 이리듐의 유사체입니다." },
  { num: 110, sym: "Ds", name: "다름슈타튬", eng: "Darmstadtium", period: 7, group: 10, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 17, 1], valence: 1, oxidation: "+4, +2", weight: "[281]", radius: 128, ionization: 960, en: "-", density: "34.8 g/cm³", isotopes: [{ name: "²⁸¹Ds", mass: 281, abundance: "합성" }], chemTitle: "독일 다름슈타트 연구소의 전이금속 (10족)", chemDesc: "백금과 동족인 초중원소입니다." },
  { num: 111, sym: "Rg", name: "뢴트게늄", eng: "Roentgenium", period: 7, group: 11, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 1], valence: 1, oxidation: "+3", weight: "[282]", radius: 121, ionization: 1020, en: "-", density: "28.7 g/cm³", isotopes: [{ name: "²⁸²Rg", mass: 282, abundance: "합성" }], chemTitle: "X선 발견자 뢴트겐을 기린 전이금속 (11족)", chemDesc: "금(Au)의 동족 원소입니다." },
  { num: 112, sym: "Cn", name: "코페르니슘", eng: "Copernicium", period: 7, group: 12, cat: "transition", block: "d", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 2], valence: 2, oxidation: "+2", weight: "[285]", radius: 122, ionization: 1155, en: "-", density: "23.7 g/cm³", isotopes: [{ name: "²⁸⁵Cn", mass: 285, abundance: "합성" }], chemTitle: "지동설 코페르니쿠스를 기린 전이금속 (12족)", chemDesc: "수은과 동족이나 상대론적 효과로 휘발성이 매우 큽니다." },

  // 7주기 초중 전형원소 (113~118)
  { num: 113, sym: "Nh", name: "니호늄", eng: "Nihonium", period: 7, group: 13, cat: "post-transition", block: "p", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 3], valence: 3, oxidation: "+1, +3", weight: "[286]", radius: 136, ionization: 705, en: "-", density: "16 g/cm³", isotopes: [{ name: "²⁸⁶Nh", mass: 286, abundance: "합성" }], chemTitle: "아시아 최초 일본에서 명명된 113번 원소", chemDesc: "리켄 연구소에서 아연과 비스무트 충돌로 합성되었습니다." },
  { num: 114, sym: "Fl", name: "플레로븀", eng: "Flerovium", period: 7, group: 14, cat: "post-transition", block: "p", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 4], valence: 4, oxidation: "+2, +4", weight: "[289]", radius: 143, ionization: 824, en: "-", density: "14 g/cm³", isotopes: [{ name: "²⁸⁹Fl", mass: 289, abundance: "합성" }], chemTitle: "안정성의 섬(Island of Stability) 후보 원소", chemDesc: "납의 동족 원소로 상대론적 불활성을 보입니다." },
  { num: 115, sym: "Mc", name: "모스코븀", eng: "Moscovium", period: 7, group: 15, cat: "post-transition", block: "p", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 5], valence: 5, oxidation: "+1, +3", weight: "[290]", radius: 162, ionization: 538, en: "-", density: "13.5 g/cm³", isotopes: [{ name: "²⁹⁰Mc", mass: 290, abundance: "합성" }], chemTitle: "러시아 모스크바주를 기린 115번 원소", chemDesc: "질소족(15족)의 초중원소입니다." },
  { num: 116, sym: "Lv", name: "리버모륨", eng: "Livermorium", period: 7, group: 16, cat: "post-transition", block: "p", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 6], valence: 6, oxidation: "+2, +4", weight: "[293]", radius: 175, ionization: 724, en: "-", density: "12.9 g/cm³", isotopes: [{ name: "²⁹³Lv", mass: 293, abundance: "합성" }], chemTitle: "미국 로렌스 리버모어 국립연구소를 기린 원소", chemDesc: "산소족(16족)의 초중원소입니다." },
  { num: 117, sym: "Ts", name: "테네신", eng: "Tennessine", period: 7, group: 17, cat: "halogen", block: "p", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 7], valence: 7, oxidation: "-1, +1", weight: "[294]", radius: 165, ionization: 743, en: "-", density: "7.2 g/cm³", isotopes: [{ name: "²⁹⁴Ts", mass: 294, abundance: "합성" }], chemTitle: "오크리지 연구소 테네시주를 기린 할로젠 원소", chemDesc: "17족 가장 무거운 원소입니다." },
  { num: 118, sym: "Og", name: "오가네손", eng: "Oganesson", period: 7, group: 18, cat: "noble", block: "p", state: "인공합성", shells: [2, 8, 18, 32, 32, 18, 8], valence: 0, oxidation: "0, +2, +4", weight: "[294]", radius: 152, ionization: 860, en: "-", density: "5.0 g/cm³", isotopes: [{ name: "²⁹⁴Og", mass: 294, abundance: "합성" }], chemTitle: "인류가 발견한 주기율표 마지막 118번 원소", chemDesc: "유리 오가네시안 교수를 기려 명명된 가장 무거운 비활성 기체 구역 원소입니다." }
];

// 원소 계열 매핑 정보 (색상, 라벨, 금속 여부)
const CATEGORY_MAP = {
  transition: { label: "전이 금속", color: "#ea580c", bgClass: "cat-transition", isTransition: true },
  alkali: { label: "알칼리 금속", color: "#dc2626", bgClass: "cat-alkali" },
  "alkali-earth": { label: "알칼리 토금속", color: "#d97706", bgClass: "cat-alkali-earth" },
  lanthanide: { label: "란타넘족", color: "#16a34a", bgClass: "cat-lanthanide" },
  actinide: { label: "악티늄족", color: "#0891b2", bgClass: "cat-actinide" },
  "post-transition": { label: "전이후 금속", color: "#475569", bgClass: "cat-post-transition" },
  metalloid: { label: "준금속", color: "#c026d3", bgClass: "cat-metalloid" },
  nonmetal: { label: "반응성 비금속", color: "#0284c7", bgClass: "cat-nonmetal" },
  halogen: { label: "할로젠", color: "#7c3aed", bgClass: "cat-halogen" },
  noble: { label: "비활성 기체", color: "#059669", bgClass: "cat-noble" }
};

document.addEventListener("DOMContentLoaded", () => {
  const elementsGrid = document.getElementById("elements-grid");
  const lanthanidesGrid = document.getElementById("lanthanides-grid");
  const actinidesGrid = document.getElementById("actinides-grid");
  const groupHeaders = document.getElementById("group-headers");
  const periodHeaders = document.getElementById("period-headers");
  const dynamicLegend = document.getElementById("dynamic-legend");

  const modeButtons = document.querySelectorAll(".mode-btn");
  const filterPills = document.querySelectorAll(".filter-pill");

  // 모달 창 DOM 요소
  const modal = document.getElementById("element-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const btnPrevElem = document.getElementById("btn-prev-elem");
  const btnNextElem = document.getElementById("btn-next-elem");
  const prevElemLabel = document.getElementById("prev-elem-label");
  const nextElemLabel = document.getElementById("next-elem-label");

  const mCategory = document.getElementById("m-category");
  const mPeriodGroup = document.getElementById("m-period-group");
  const mState = document.getElementById("m-state");
  const mBlock = document.getElementById("m-block");
  const mName = document.getElementById("m-name");
  const mSymbol = document.getElementById("m-symbol");
  const mNumber = document.getElementById("m-number");
  const mEngName = document.getElementById("m-eng-name");

  const bohrCanvas = document.getElementById("bohr-canvas");
  const bohrCtx = bohrCanvas.getContext("2d");
  const mCanvasProtons = document.getElementById("m-canvas-protons");
  const mCanvasElectrons = document.getElementById("m-canvas-electrons");
  const mValenceElectrons = document.getElementById("m-valence-electrons");
  const mElectronConfig = document.getElementById("m-electron-config");
  const mOxidationStates = document.getElementById("m-oxidation-states");
  const mValenceDesc = document.getElementById("m-valence-desc");

  const isotopeSelectorBar = document.getElementById("isotope-selector-bar");
  const mProtons = document.getElementById("m-protons");
  const mNeutrons = document.getElementById("m-neutrons");
  const mMassNumber = document.getElementById("m-mass-number");
  const mAtomicWeight = document.getElementById("m-atomic-weight");
  const mIsotopeNote = document.getElementById("m-isotope-note");

  const mRadius = document.getElementById("m-radius");
  const mIonization = document.getElementById("m-ionization");
  const mElectronegativity = document.getElementById("m-electronegativity");
  const mDensity = document.getElementById("m-density");
  const mChemTitle = document.getElementById("m-chem-title");
  const mChemDesc = document.getElementById("m-chem-desc");

  // 상태 변수
  let currentMode = "category"; // category, state, valence, radius, ionization
  let currentFilter = "all";
  let highlightedGroup = null;
  let highlightedPeriod = null;
  let selectedElement = ELEMENTS_DB[25]; // 기본: 철 (Fe, 26번 전이금속)
  let selectedIsotopeIndex = 0;
  let bohrAnimationId = null;
  let bohrAngle = 0;

  // 1. 족 및 주기 헤더 빌드
  function buildBoardHeaders() {
    // 족 헤더 (1~18)
    for (let g = 1; g <= 18; g++) {
      const btn = document.createElement("button");
      btn.className = "group-header-btn";
      // 3~12족은 전이금속 족 스타일
      if (g >= 3 && g <= 12) {
        btn.classList.add("transition-group");
      }
      btn.textContent = `${g}족`;
      btn.title = g >= 3 && g <= 12 ? `${g}족 (전이금속 영역) 전체 하이라이트` : `${g}족 원소 전체 하이라이트`;
      btn.addEventListener("click", () => toggleGroupHighlight(g, btn));
      groupHeaders.appendChild(btn);
    }

    // 주기 헤더 (1~7)
    for (let p = 1; p <= 7; p++) {
      const btn = document.createElement("button");
      btn.className = "period-header-btn";
      btn.innerHTML = `<span>${p}</span><span style="font-size:0.65rem; opacity:0.75;">주기</span>`;
      btn.title = `${p}주기 원소 전체 하이라이트`;
      btn.addEventListener("click", () => togglePeriodHighlight(p, btn));
      periodHeaders.appendChild(btn);
    }
  }

  function toggleGroupHighlight(g, btn) {
    if (highlightedGroup === g) {
      highlightedGroup = null;
      btn.classList.remove("highlighted");
    } else {
      document.querySelectorAll(".group-header-btn").forEach(b => b.classList.remove("highlighted"));
      highlightedGroup = g;
      btn.classList.add("highlighted");
    }
    applyCardFilters();
  }

  function togglePeriodHighlight(p, btn) {
    if (highlightedPeriod === p) {
      highlightedPeriod = null;
      btn.classList.remove("highlighted");
    } else {
      document.querySelectorAll(".period-header-btn").forEach(b => b.classList.remove("highlighted"));
      highlightedPeriod = p;
      btn.classList.add("highlighted");
    }
    applyCardFilters();
  }

  // 2. 카드 렌더링 함수
  function createCardElement(el) {
    const card = document.createElement("article");
    const catConfig = CATEGORY_MAP[el.cat] || { bgClass: "cat-nonmetal" };
    card.className = `el-card ${catConfig.bgClass}`;
    card.dataset.num = el.num;
    card.dataset.group = el.group;
    card.dataset.period = el.period;
    card.dataset.cat = el.cat;
    card.dataset.block = el.block;
    card.dataset.state = el.state;

    // 모드별 서브 텍스트 결정
    let customVal = "";
    if (currentMode === "state") {
      customVal = el.state;
    } else if (currentMode === "valence") {
      customVal = `${el.valence}e⁻`;
    } else if (currentMode === "radius") {
      customVal = el.radius ? `${el.radius}` : "-";
    } else if (currentMode === "ionization") {
      customVal = el.ionization ? `${el.ionization}` : "-";
    } else {
      customVal = `${el.weight}`;
    }

    card.innerHTML = `
      <div class="el-top-info">
        <span class="el-num">${el.num}</span>
        <span class="el-custom-val" title="${customVal}">${customVal}</span>
      </div>
      <div class="el-symbol">${el.sym}</div>
      <div class="el-bottom-info">
        <span class="el-name" title="${el.name}">${el.name}</span>
      </div>
    `;

    applyCardModeStyle(card, el);
    card.addEventListener("click", () => openElementModal(el));
    return card;
  }

  // 전체 장주기율표 렌더링
  function renderAllPeriodicBoards() {
    elementsGrid.innerHTML = "";
    lanthanidesGrid.innerHTML = "";
    actinidesGrid.innerHTML = "";

    // 1) 본체 1~7주기 원소 배치 (란타넘족 57~71 및 악티늄족 89~103은 분리)
    ELEMENTS_DB.forEach((el) => {
      // 란타넘족(57~71)은 하단 란타넘 그리드로
      if (el.num >= 57 && el.num <= 71) {
        lanthanidesGrid.appendChild(createCardElement(el));
        return;
      }
      // 악티늄족(89~103)은 하단 악티늄 그리드로
      if (el.num >= 89 && el.num <= 103) {
        actinidesGrid.appendChild(createCardElement(el));
        return;
      }

      // 본체 카드 생성
      const card = createCardElement(el);
      card.style.gridColumn = el.group;
      card.style.gridRow = el.period;
      elementsGrid.appendChild(card);
    });

    // 2) 본체 6주기 3족 란타넘 슬롯 카드 삽입
    const lanSlot = document.createElement("div");
    lanSlot.className = "f-slot-card lanthanide";
    lanSlot.style.gridColumn = "3";
    lanSlot.style.gridRow = "6";
    lanSlot.innerHTML = `<span>57-71</span><small>La - Lu</small>`;
    lanSlot.title = "란타넘족 15개 원소 (하단 행 참조)";
    lanSlot.addEventListener("click", () => {
      lanthanidesGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      document.querySelector('.filter-pill[data-filter="lanthanide"]').click();
    });
    elementsGrid.appendChild(lanSlot);

    // 3) 본체 7주기 3족 악티늄 슬롯 카드 삽입
    const actSlot = document.createElement("div");
    actSlot.className = "f-slot-card actinide";
    actSlot.style.gridColumn = "3";
    actSlot.style.gridRow = "7";
    actSlot.innerHTML = `<span>89-103</span><small>Ac - Lr</small>`;
    actSlot.title = "악티늄족 15개 원소 (하단 행 참조)";
    actSlot.addEventListener("click", () => {
      actinidesGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      document.querySelector('.filter-pill[data-filter="actinide"]').click();
    });
    elementsGrid.appendChild(actSlot);

    updateLegend();
    applyCardFilters();
  }

  // 모드별 스타일
  function applyCardModeStyle(card, el) {
    if (currentMode === "state") {
      if (el.state === "기체") {
        card.style.backgroundColor = "#e0f2fe";
        card.style.borderColor = "#7dd3fc";
      } else if (el.state === "액체") {
        card.style.backgroundColor = "#fce7f3";
        card.style.borderColor = "#f472b6";
      } else if (el.state === "인공합성") {
        card.style.backgroundColor = "#f3f4f6";
        card.style.borderColor = "#9ca3af";
      } else {
        card.style.backgroundColor = "";
        card.style.borderColor = "";
      }
    } else if (currentMode === "valence") {
      if (el.cat === "transition") {
        // 전이금속 최외각 전자 (주로 1~2개)
        card.style.backgroundColor = "#ffedd5";
        card.style.borderColor = "#fb923c";
      } else {
        card.style.backgroundColor = el.valence === 0 ? "#ecfdf5" : `hsl(${220 + el.valence * 14}, 85%, 95%)`;
        card.style.borderColor = el.valence === 0 ? "#10b981" : `hsl(${220 + el.valence * 14}, 70%, 75%)`;
      }
    } else if (currentMode === "radius" && el.radius) {
      const ratio = Math.max(0, Math.min(1, (el.radius - 30) / (270 - 30)));
      card.style.backgroundColor = `rgba(37, 99, 235, ${0.08 + ratio * 0.45})`;
      card.style.borderColor = `rgba(37, 99, 235, ${0.25 + ratio * 0.7})`;
    } else if (currentMode === "ionization" && el.ionization) {
      const ratio = Math.max(0, Math.min(1, (el.ionization - 370) / (2400 - 370)));
      card.style.backgroundColor = `rgba(239, 68, 68, ${0.08 + ratio * 0.5})`;
      card.style.borderColor = `rgba(239, 68, 68, ${0.25 + ratio * 0.7})`;
    } else {
      card.style.backgroundColor = "";
      card.style.borderColor = "";
    }
  }

  // 필터링 적용
  function applyCardFilters() {
    const cards = document.querySelectorAll(".el-card");

    cards.forEach((card) => {
      const g = parseInt(card.dataset.group, 10);
      const p = parseInt(card.dataset.period, 10);
      const cat = card.dataset.cat;

      const matchGroup = highlightedGroup === null || g === highlightedGroup;
      const matchPeriod = highlightedPeriod === null || p === highlightedPeriod;

      let matchFilter = true;
      if (currentFilter === "all") {
        matchFilter = true;
      } else if (currentFilter === "transition") {
        matchFilter = cat === "transition"; // 3~12족 전이금속 필터링
      } else {
        matchFilter = cat === currentFilter;
      }

      if (matchGroup && matchPeriod && matchFilter) {
        card.classList.remove("dimmed");
        if (highlightedGroup !== null || highlightedPeriod !== null || currentFilter !== "all") {
          card.classList.add("highlighted");
        } else {
          card.classList.remove("highlighted");
        }
      } else {
        card.classList.add("dimmed");
        card.classList.remove("highlighted");
      }
    });
  }

  // 범례(Legend) 갱신
  function updateLegend() {
    if (currentMode === "category") {
      dynamicLegend.innerHTML = `
        <span style="color:var(--text-muted); font-weight:700;">원소 계열:</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#ea580c;"></span> <strong>전이 금속 (3~12족)</strong></span>
        <span class="legend-badge"><span class="legend-dot" style="background:#dc2626;"></span> 알칼리 금속</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#d97706;"></span> 알칼리 토금속</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#16a34a;"></span> 란타넘족</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#0891b2;"></span> 악티늄족</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#475569;"></span> 전이후 금속</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#c026d3;"></span> 준금속</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#0284c7;"></span> 반응성 비금속</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#7c3aed;"></span> 할로젠</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#059669;"></span> 비활성 기체</span>
      `;
    } else if (currentMode === "state") {
      dynamicLegend.innerHTML = `
        <span style="color:var(--text-muted); font-weight:700;">상온(25℃) 물질 상태:</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#ffffff; border:1px solid #cbd5e1;"></span> 고체 (대부분의 금속/비금속)</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#fce7f3; border:1px solid #f472b6;"></span> 액체 (브로민 Br, 수은 Hg)</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#e0f2fe; border:1px solid #7dd3fc;"></span> 기체 (수소, 질소, 산소, 플루오린, 염소, 비활성기체)</span>
        <span class="legend-badge"><span class="legend-dot" style="background:#f3f4f6; border:1px solid #9ca3af;"></span> 인공 합성 초중원소</span>
      `;
    } else if (currentMode === "valence") {
      dynamicLegend.innerHTML = `
        <span style="color:var(--primary-700); font-weight:700;">💡 최외각 전자 규칙:</span>
        <span>전형원소(1, 2, 13~18족)는 족 번호의 일의 자리 수가 원자가 전자 수와 일치하며, <strong>전이금속(3~12족)은 d-오비탈 전자가 관여하여 주로 1~2개의 최외각 전자와 다양한 산화수를 갖습니다.</strong></span>
      `;
    } else if (currentMode === "radius") {
      dynamicLegend.innerHTML = `
        <span style="color:var(--accent-blue); font-weight:700;">💡 원자 반지름 경향성:</span>
        <span>주기율표의 <strong>좌측 하단(세슘, 프랑슘 등)으로 갈수록 껍질 수 증가로 반지름이 크고</strong>, 우측 상단(헬륨, 플루오린 등)으로 갈수록 유효핵전하 증가로 반지름이 작아집니다.</span>
      `;
    } else if (currentMode === "ionization") {
      dynamicLegend.innerHTML = `
        <span style="color:#ef4444; font-weight:700;">💡 제1 이온화 에너지:</span>
        <span>주기율표의 <strong>우측 상단(헬륨 2372 kJ/mol, 네온 2081 kJ/mol)으로 갈수록 전자를 떼어내기 매우 어렵고</strong>, 좌측 하단 알칼리 금속은 쉽게 전자를 잃습니다.</span>
      `;
    }
  }

  // 툴바 모드 버튼 클릭 이벤트
  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;
      renderAllPeriodicBoards();
    });
  });

  // 필터 버튼 클릭 이벤트
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.filter;
      applyCardFilters();
    });
  });

  // ==========================================================================
  // 3. 모달 창 (Modal Window) 로직
  // ==========================================================================
  function openElementModal(el) {
    selectedElement = el;
    selectedIsotopeIndex = 0;

    mName.textContent = el.name;
    mSymbol.textContent = el.sym;
    mNumber.textContent = el.num;
    mEngName.textContent = el.eng;

    const catInfo = CATEGORY_MAP[el.cat] || { label: el.cat, color: "#4f46e5" };
    mCategory.textContent = catInfo.label;
    mCategory.style.backgroundColor = catInfo.color ? `${catInfo.color}15` : "";
    mCategory.style.color = catInfo.color || "inherit";

    mPeriodGroup.textContent = `${el.period}주기 · ${el.group}족`;
    mState.textContent = `실온 ${el.state}`;
    mBlock.textContent = `${el.block}-블록 원소`;

    // 최외각 전자 및 껍질 배치
    mValenceElectrons.textContent = `${el.valence}개`;
    mElectronConfig.textContent = el.shells.join(", ");
    mOxidationStates.textContent = el.oxidation || "+2";

    if (el.cat === "transition") {
      mValenceDesc.innerHTML = `※ <strong>전이금속 특성:</strong> 내부 ${el.period - 1}d 오비탈에 전자가 채워지며, d전자들이 결합에 관여하여 <strong>${el.oxidation} 등 다양한 산화수</strong>를 나타냅니다.`;
    } else {
      mValenceDesc.innerHTML = `※ 원자가 전자는 화학 결합에 참여하여 화합물의 결합비와 화학적 성질을 결정합니다.`;
    }

    // 물리화학적 성질
    mRadius.textContent = el.radius ? `${el.radius} pm` : "미측정";
    mIonization.textContent = el.ionization ? `${el.ionization} kJ/mol` : "미측정";
    mElectronegativity.textContent = el.en || "-";
    mDensity.textContent = el.density || "-";

    mChemTitle.textContent = `${el.name} (${el.sym})의 주요 특징 및 응용:`;
    mChemDesc.textContent = el.chemDesc;

    renderIsotopeButtons();
    updateModalNavButtons();

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    startBohrAnimation();
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    if (bohrAnimationId) {
      cancelAnimationFrame(bohrAnimationId);
      bohrAnimationId = null;
    }
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") navigateElement(-1);
    else if (e.key === "ArrowRight") navigateElement(1);
  });

  function navigateElement(direction) {
    const currentIndex = ELEMENTS_DB.findIndex((e) => e.num === selectedElement.num);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < ELEMENTS_DB.length) {
      openElementModal(ELEMENTS_DB[newIndex]);
    }
  }

  btnPrevElem.addEventListener("click", () => navigateElement(-1));
  btnNextElem.addEventListener("click", () => navigateElement(1));

  function updateModalNavButtons() {
    const currentIndex = ELEMENTS_DB.findIndex((e) => e.num === selectedElement.num);
    const prevEl = currentIndex > 0 ? ELEMENTS_DB[currentIndex - 1] : null;
    const nextEl = currentIndex < ELEMENTS_DB.length - 1 ? ELEMENTS_DB[currentIndex + 1] : null;

    if (prevEl) {
      btnPrevElem.style.visibility = "visible";
      prevElemLabel.textContent = `${prevEl.num}. ${prevEl.name}`;
    } else {
      btnPrevElem.style.visibility = "hidden";
    }

    if (nextEl) {
      btnNextElem.style.visibility = "visible";
      nextElemLabel.textContent = `${nextEl.num}. ${nextEl.name}`;
    } else {
      btnNextElem.style.visibility = "hidden";
    }
  }

  // 동위 원소 렌더링
  function renderIsotopeButtons() {
    isotopeSelectorBar.innerHTML = "";
    const isotopes = selectedElement.isotopes || [
      { name: `${selectedElement.sym}-${Math.round(parseFloat(selectedElement.weight) || selectedElement.num * 2)}`, mass: Math.round(parseFloat(selectedElement.weight) || selectedElement.num * 2), abundance: "대표 동위 원소" }
    ];

    isotopes.forEach((iso, idx) => {
      const btn = document.createElement("button");
      btn.className = `isotope-btn ${idx === selectedIsotopeIndex ? "active" : ""}`;
      btn.innerHTML = `<strong>${iso.name}</strong> <span style="font-size:0.75rem; opacity:0.8;">(${iso.abundance})</span>`;
      btn.addEventListener("click", () => {
        selectedIsotopeIndex = idx;
        document.querySelectorAll(".isotope-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateParticleValues();
      });
      isotopeSelectorBar.appendChild(btn);
    });

    updateParticleValues();
  }

  function updateParticleValues() {
    const protons = selectedElement.num;
    const isotopes = selectedElement.isotopes || [];
    const currentIsotope = isotopes[selectedIsotopeIndex] || { mass: Math.round(parseFloat(selectedElement.weight) || protons * 2), name: `${selectedElement.sym}-${protons * 2}` };
    const massNumber = currentIsotope.mass;
    const neutrons = massNumber - protons;

    mProtons.textContent = protons;
    mNeutrons.textContent = neutrons >= 0 ? neutrons : "-";
    mMassNumber.textContent = massNumber;
    mAtomicWeight.textContent = selectedElement.weight.includes("[") ? selectedElement.weight : `${selectedElement.weight} amu`;

    mCanvasProtons.textContent = protons;
    mCanvasElectrons.textContent = protons;

    mIsotopeNote.innerHTML = `
      선택된 <strong>${currentIsotope.name}</strong>은 양성자 <strong>${protons}개</strong>, 중성자 <strong>${neutrons}개</strong>로 이루어져 질량수가 <strong>${massNumber}</strong>입니다.
      (※ 원자량 <strong>${selectedElement.weight}</strong>는 천연 동위 원소들의 평균 원자 질량입니다.)
    `;
  }

  // 4. 보어 원자 모형 캔버스 애니메이션 (다전자 껍질 지원)
  function startBohrAnimation() {
    if (bohrAnimationId) {
      cancelAnimationFrame(bohrAnimationId);
    }

    const W = bohrCanvas.width;
    const H = bohrCanvas.height;
    const centerX = W / 2;
    const centerY = H / 2;

    const shellCount = selectedElement.shells.length;
    // 껍질 수에 따라 반지름 간격 스케일링
    const maxRadius = 114;
    const minRadius = 32;
    const step = shellCount > 1 ? (maxRadius - minRadius) / (shellCount - 1) : 40;

    const shellLabels = ["K", "L", "M", "N", "O", "P", "Q"];

    function draw() {
      bohrCtx.clearRect(0, 0, W, H);
      bohrAngle += 0.015;

      selectedElement.shells.forEach((electronCount, shellIdx) => {
        const radius = minRadius + shellIdx * step;

        // 궤도선
        bohrCtx.beginPath();
        bohrCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        bohrCtx.strokeStyle = "rgba(148, 163, 184, 0.35)";
        bohrCtx.lineWidth = 1.2;
        bohrCtx.setLineDash([3, 3]);
        bohrCtx.stroke();
        bohrCtx.setLineDash([]);

        // 껍질 라벨
        bohrCtx.font = "9px Pretendard, sans-serif";
        bohrCtx.fillStyle = "#94a3b8";
        bohrCtx.fillText(shellLabels[shellIdx] || "", centerX + radius - 7, centerY - 3);

        // 전자 공전 (화면에 전자가 너무 많아 겹치지 않도록 최대 18개까지만 시각화)
        const displayElectrons = Math.min(electronCount, 18);
        const angleStep = (Math.PI * 2) / displayElectrons;
        const speedFactor = (shellIdx % 2 === 0 ? 1 : -1) * (1 - shellIdx * 0.1);

        for (let e = 0; e < displayElectrons; e++) {
          const currentAngle = bohrAngle * speedFactor + e * angleStep;
          const ex = centerX + Math.cos(currentAngle) * radius;
          const ey = centerY + Math.sin(currentAngle) * radius;

          bohrCtx.beginPath();
          bohrCtx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          bohrCtx.fillStyle = "#2563eb";
          bohrCtx.shadowColor = "rgba(37, 99, 235, 0.5)";
          bohrCtx.shadowBlur = 5;
          bohrCtx.fill();
          bohrCtx.shadowBlur = 0;
        }
      });

      // 중심 원자핵
      bohrCtx.beginPath();
      bohrCtx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      const gradient = bohrCtx.createRadialGradient(centerX - 3, centerY - 3, 2, centerX, centerY, 18);
      gradient.addColorStop(0, "#f87171");
      gradient.addColorStop(1, "#dc2626");
      bohrCtx.fillStyle = gradient;
      bohrCtx.shadowColor = "rgba(220, 38, 38, 0.4)";
      bohrCtx.shadowBlur = 8;
      bohrCtx.fill();
      bohrCtx.shadowBlur = 0;

      bohrCtx.font = "bold 9px Pretendard, sans-serif";
      bohrCtx.fillStyle = "#ffffff";
      bohrCtx.textAlign = "center";
      bohrCtx.textBaseline = "middle";
      bohrCtx.fillText(`${selectedElement.num}+`, centerX, centerY);

      bohrAnimationId = requestAnimationFrame(draw);
    }

    draw();
  }

  // 초기화
  buildBoardHeaders();
  renderAllPeriodicBoards();
});
