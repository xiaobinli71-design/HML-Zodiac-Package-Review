---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: a8f137082caedb78114064ebcd0b1bf6_ad257392e35711f1913b525400393706
    ReservedCode1: 4wCyVvQa1kz3aNWVATFg4iJWM0jQWfHOiIoK1LTpQymlEDko7bkegNVB0J5q0DDHDipm3OvHXYmXqPZh/rxoQWp9/YLByhvr4PUioqvm8G7+vP876AmxsJVRyr9ClHmZmp6wUQ0u4+rSMauszerV+TJmqccQokTw+KTx7uw3EhGD9+6V88dmzXOXBrw=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: a8f137082caedb78114064ebcd0b1bf6_ad257392e35711f1913b525400393706
    ReservedCode2: 4wCyVvQa1kz3aNWVATFg4iJWM0jQWfHOiIoK1LTpQymlEDko7bkegNVB0J5q0DDHDipm3OvHXYmXqPZh/rxoQWp9/YLByhvr4PUioqvm8G7+vP876AmxsJVRyr9ClHmZmp6wUQ0u4+rSMauszerV+TJmqccQokTw+KTx7uw3EhGD9+6V88dmzXOXBrw=
---

# MO9 效果图修正说明（v2 真结构渲染）

## 上一版为什么是错的（已定位）

| 项目 | 上一版（错误） | 现在（v2） |
|---|---|---|
| 结构完整度 | 仅 body + flap 两个部件，无左右翻盖、无内衬 | 5 面盒身 + 左右翻盖各带插舌 + 纸浆托（手机/充电器/线材三槽） |
| 打开态 | 无。open_views = 0，只有闭合裸模多视角 | 有。翻盖绕铰链外张 112°，可见内托、手机、配件 |
| 产品 | 无产品体，空盒 | 手机 158×74×8.2 含屏幕、三摄、侧键；附充电器、线材 |
| 印刷 | 贴图未铺满，侧面全白 | 顶面印刷跨两片翻盖 UV 对齐拼合 + 侧面烫金 MO9 / AI PHONE |
| 渲染引擎标注 | 文件名写 ks_*，实际是 Blender Cycles 产出，名不符实 | 统一命名 hero_*，清单明确引擎 Blender 5.1.2 / Cycles OPTIX |
| 自审 | G3 只校验尺寸与文件存在性，未检真实感 → 误判 PASS | 6 视角逐张视觉复核，全部通过 |

## v2 规格

- 外尺寸 220×160×60 mm，纸板厚 2 mm，盒型 double-flap（左右对开翻盖）
- 引擎 Blender 5.1.2 / Cycles，OPTIX GPU（RTX 3060），192 samples，1600×1600，AgX Medium High Contrast
- 灯光：主光 + 辅光 + 顶光 + 轮廓光 四灯棚拍，白底接触阴影

## 文件

| 文件 | 内容 |
|---|---|
| hero_CLOSED.png | 闭合态 3/4 俯视，主 KV |
| hero_OPEN.png | 打开态 112°，开箱主图 |
| hero_TOP.png | 正俯视，印刷对位校验 |
| hero_FRONT.png | 正立面，烫金 logo |
| hero_SIDE.png | 侧面长边立面 |
| hero_DETAIL.png | 开盒局部特写（翻盖边缘/纸厚/内托） |
| render_manifest.json | 渲染参数与结构清单 |

旧渲染 18 个文件（ks_*.png、view_*.png、standard_render.json）已移入同目录下 `_deprecated_旧渲染/`，未删除，可回溯。

## 仍待老板确认

1. 翻盖中缝叠压量（当前 2 mm）与插舌尺寸是否与刀版一致
2. 内托材质按纸浆模塑表现，若为 EPE/海绵需换材质重渲
3. 手机实测尺寸未回填，现按 158×74×8.2 建模
*（内容由AI生成，仅供参考）*
