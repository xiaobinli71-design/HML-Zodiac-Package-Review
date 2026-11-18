# 包装结构设计生产系统 — 案例交付包（HML_Zodiac）

本仓库是一套**包装结构设计自动化生产管线**（Marvis Packaging Pipeline）的完整案例输出，用于第三方（含 AI 评审）审阅交付质量与全链路可追溯性。

- 案例：韩美林生肖画册配套 **书型磁吸礼盒（Book-shaped rigid box with bookset variant）**
- 盒型族 / 变体：`bookbox` / `bookset`
- 成品内尺寸：**L 300 × W 45 × H 300 mm**（长 = 封面长；宽 = 书脊厚；高 = 书高）
- 纸板厚度 D：**2.5 mm**
- 生产运行：`RUN-20261116T085631+0800-01`，完成时间 2026-11-16 09:02:43
- 运行状态：**`ok: true`**，交付文件 **43 个**

> 说明：本仓库外发版本已剔除 `00_需求`（客户原始 BRIEF 原件），其余九个阶段产物全量保留。

---

## 1. 生产管线概览

管线以「9 阶段 + 5 道硬阻断门禁（G0–G4）」执行，任一门禁 FAIL 即中止，不允许带病交付：

| 阶段 | 内容 | 关键产物 |
|---|---|---|
| 01 选型 | 盒型族可行性判定 | `selection_report.json`、`supported_families.txt` |
| 02 刀版 | 刀版生成 + 结构审计 + 几何自检 | `*.svg`、`*.audit.json`、`*.qcheck.json`、`*.dxf` |
| 03 视觉 | 印刷稿生成 + 转曲 + 印前自检 | `print_artwork.svg`、`print_artwork_outlined.svg` |
| 04 3D | 实体建模 + 8 视角验证 + 浏览器预览 | `model.glb`、`view_00~07.png`、`viewer.html` |
| 05 渲染 | 5 视角真实渲染（KeyShot / Blender 通道） | `ks_*.png`、`standard_render.json` |
| 06 审查 | G3 视觉审查 | `G3_视觉审查报告.md/json` |
| 07 预检 | G4 印前预检 | `G4_印前预检报告.md/json` |
| 08 输出 | 生产级 DXF + 印刷 PDF | `*.dxf`、`print_x3.pdf`、`print_cmyk.pdf` |
| 09 交付 | 清单、说明书、效果图、视频、证据包 | `manifest.json`、`run_status.json`、`result_records/` |

## 2. 门禁结果（G0–G4）

```
G0 PASS   G1 PASS   G2 PASS   G3 PASS   G4 PASS
engineering_ok = true      engineering_exit_code = 0
evidence_fail_count = 0
release_status = NOT_RELEASED     release_approved = false
verdict = NOT_EVALUATED
```

**口径声明（重要）**：`engineering_ok = true` 仅代表九阶段工程执行全部跑通；`release_status = NOT_RELEASED`、`verdict = NOT_EVALUATED` 是**人工签核位**，证据侧不代批。任何情况下不得将其解读为「已放行量产」。

## 3. 目录结构

```
01_选型/            盒型族选型报告
02_刀版/            刀版 SVG（含 audit / qcheck / 预览图）、标准 DXF
03_视觉/            印刷稿 SVG、转曲稿、印前自检 JSON
04_3D/              GLB 模型、STP、8 视角截图、浏览器 viewer
05_渲染/            5 视角渲染图（FRONT / RIGHT / TOP / ISOMETRIC / SHELF）
06_审查/            G3 视觉审查报告（md + json）
07_预检/            G4 印前预检报告（md + json）
08_输出/            生产 DXF、print_x3.pdf（3 倍出血稿）、print_cmyk.pdf
09_交付/
  ├─ manifest.json          交付清单（43 件）
  ├─ run_status.json        运行状态与门禁证据
  ├─ pipeline_run.log       全阶段执行日志
  ├─ 结构工艺说明书.pdf
  ├─ 印刷工艺说明书.pdf
  ├─ 产品标签说明书.pdf
  ├─ 效果图/
  │   ├─ index.html         效果图总览页（浏览器打开）
  │   ├─ 01_真结构/          KeyShot 真结构渲染 5 视角
  │   └─ 02_AI概念/          AI 概念图（含开盖 / 合盖视角）
  ├─ 视频/showcase.mp4      展示短视频
  ├─ 预览/                  网页 3D 预览（model-viewer）
  └─ result_records/        不可篡改证据包（bundle + evidence_report）
```

## 4. 关键校验值（用于验证本仓库未被改动）

| 文件 | SHA256 |
|---|---|
| `09_交付/result_records/.../bundle.json` | `1396d399e2ae5acacfb4ea8a5c38e7b05b9836bf27b912fbbbe3c9336e9224c0` |
| `09_交付/result_records/.../evidence_report.json` | `81a6454f2bac95099d28a65564175baa79b6a53c6b21531b4354223e73940692` |

## 5. 请评审方（GPT）重点检查的 6 项

1. **结构自洽性**：`02_刀版/*.qcheck.json` 与 `04_3D/structure_report.json` 的尺寸推导是否与 L300/W45/H300/D2.5 一致，书脊 45mm 是否为画册厚度对应的合理值。
2. **刀版可制造性**：`*.audit.json` 报告的折线/切线、粘口、磁吸位扣手位是否齐备；DXF 单位与图层规范是否满足常规刀模厂要求。
3. **印前合规**：`07_预检/G4_印前预检报告.md` 的出血、色彩空间（CMYK）、字体转曲结论是否充分；`print_x3.pdf` 是否真的达到 3 倍出血。
4. **渲染与结构一致性**：`05_渲染/ks_*.png` 与 `04_3D/view_*.png` 是否描述同一几何体（比例、开合方式、磁吸位置）。
5. **AI 概念图与结构偏离度**：`09_交付/效果图/02_AI概念/` 三张图与真结构渲染的差异点，指出哪些属于「不可用于生产、仅概念示意」。
6. **交付完整性**：对照 `manifest.json` 的 43 件清单，核对仓库实际文件是否缺失或有冗余。

## 6. 已知缺口（主动披露，非隐藏缺陷）

1. **画册本体未覆盖**：本包只覆盖礼盒（书型磁吸），内装画册 280×280mm 本体的制作线未纳入本轮管线。
2. **尺寸耦合待实物验证**：书脊厚度 45mm 基于画册页数与纸张克重估算，需实物叠册验证后回填；如偏差 >2mm，需重跑刀版。
3. **AI 概念图配色偏差**：默认 AI 通道产出的概念图配色与最终印刷稿存在差异，已另行补生成 `ai_open_lid.png`、`ai_closed_front.png` 两张纠偏图，但仍属概念示意。
4. **RELEASE 未签核**：见第 2 节口径声明。

## 7. 复现方式

```bash
python E:\Marvis\pipeline\marvis_pipeline.py \
  --project HML_Zodiac_20261116_R2 \
  --product "韩美林生肖画册礼盒" \
  --family bookbox --variant bookset \
  --L 300 --W 45 --H 300 --D 2.5
```

自检：`python E:\Marvis\pipeline\marvis_pipeline.py --doctor`

---

本仓库内容用于工程评审与质量核验。涉及客户品牌与版权的图像资料，未经授权不得二次分发或商用。

---

# 案例二：MO9 手机一纸成型包装（2026-11-18）

- 案例：**MO9 智能手机** 一纸成型环保纸质包装
- 盒型族 / 变体：`double-flap` / `base`（左右对开翻盖 · 一纸成型）
- 成品外尺寸：**L 220 × W 160 × H 60 mm**（默认值，待客户确认手机实测尺寸后回填）
- 展开尺寸：**785 × 340 mm**（含 5mm 出血），画板 805 × 360 mm
- 纸板厚度 D：**2 mm**
- 生产运行：`CASE-RSC-BASE-20261118-001` → 完成时间 2026-11-18 17:39
- 运行状态：**`ok: true`**，交付文件 **45 个**
- 目录：`MO9_手机一纸成型包装/`（十个阶段产物，外发版剔除 `00_需求` 客户 BRIEF 原件）

### 结构参数与门禁

| 项 | 值 |
|---|---|
| 刀线 / 折线 | 15 点闭合轮廓 / 7 条折线，AUDIT + QCHECK 均 critical=0 warn=0 |
| 印刷文件 | PDF/X，版本声明 + OutputIntent 齐全，字体 4 个全嵌入 |
| 标签合规 | GB 4943.1 electronics 字段集：型号 / 执行标准 / 制造商 / 地址 / 产地 全齐 |
| 门禁 | G0–G4 全 PASS |

### 已知缺口（主动披露）

1. **手机实测尺寸未回填**：L220/W160/H60 为默认值，客户提供手机长宽厚与重量后需重跑刀版。
2. **制造商与地址为临时值**：`MO9 Technology Co., Ltd.` / `中国 广东省 深圳 龙岗区` 待客户确认后替换。
3. **配件清单未纳入**：充电器、数据线、说明书的内部定位结构未建模，当前仅覆盖手机主体定位。
4. **RELEASE 未签核**：证据侧（packaging-system）不可达，`release_status = NOT_RELEASED`，需人工审核后方可打样。

### 复现方式

```bash
python E:\Marvis\pipeline\marvis_pipeline.py \
  --project MO9_手机一纸成型包装 --product MO9手机 \
  --family double-flap --variant base \
  --L 220 --W 160 --H 60 --D 2 \
  --label-profile electronics --label-json <电子标签字段集>.json
```
