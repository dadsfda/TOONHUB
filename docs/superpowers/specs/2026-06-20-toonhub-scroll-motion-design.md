# TOONHUB Scroll Motion Design

## 目标

把当前 TOONHUB 单页网站升级为“滚动频道大片版”。

参考 `https://vanessadean.de/` 的动效语言，但不复制它的题材、素材或版式。参考点主要是：

- 长页面章节式叙事
- 固定导航和首屏沉浸感
- 大视觉元素跨越章节
- 文字分层进入
- 滚动时页面像故事逐段展开

TOONHUB 的转译方向是“频道广播式滚动叙事”：用户滚动页面时，像在进入一个由颜色信号组成的 3D 角色宇宙。

## 范围

本阶段只做前端动效和视觉节奏升级。

包含：

- 首屏入场动效
- 页面滚动触发的区块显现
- 频道卡片依次进入
- 频道地图的活动状态强化
- Future Drops 的信号加载感
- 必要的轻量背景纹理或 CSS 动态背景

不包含：

- 路由
- 登录
- 购物车
- 后端/API
- CMS/admin panel
- 复杂 3D viewer
- 复制参考站图片、字体文件或私有素材

## 动效原则

动效应该服务品牌宇宙感，不做无意义装饰。

### 节奏

整体节奏偏“潮玩发布 + 品牌档案”：

- 首屏冲击强
- 中段滚动慢下来，像打开频道档案
- 角色卡片有弹性但不幼稚
- 结尾像下一季广播即将上线

### 性能

优先使用 CSS transitions、CSS animations 和 IntersectionObserver。

本阶段不强制引入 GSAP。只有当 CSS + IntersectionObserver 无法表达必要滚动叙事时，才考虑引入动画库。

### 可访问性

必须支持 `prefers-reduced-motion: reduce`。

当用户系统设置减少动态效果时：

- 禁用连续背景动画
- 禁用大幅位移
- 保留透明度淡入或直接显示内容

## 视觉设计

### 全局

页面保持当前 TOONHUB 的高饱和色彩和大标题风格。

新增一个全局“信号纹理层”：

- 轻微颗粒
- 很淡的水平扫描线
- 不遮挡文字
- 在深色区块更明显，在浅色区块更克制

### 首屏 Hero

保留现有角色轮播与点击切换。

新增首屏入场：

- `TOONHUB` 巨字从低透明度和轻微缩放进入
- 当前角色从轻微放大/模糊恢复到清晰
- 左下角角色信息分三层进入：名称、频道、说明
- `DISCOVER IT` 延迟进入

角色切换时保留现有 carousel 位置变化，并强化当前频道反馈：

- 背景色继续跟随当前角色
- 角色信息更换时做短暂淡入
- 不增加自动轮播

### Universe Signal

从静态介绍升级为“频道总开关”区块。

进入视口时：

- 小标题先出现
- 大标题逐行/整块上浮出现
- 正文随后出现
- 背景出现缓慢移动的信号线或色带

这里不需要真实图片背景，先用 CSS 纹理和渐变信号完成。

### Season File

保持白底档案感，但增加“文件展开”的节奏。

进入视口时：

- `Season File` 标签淡入
- 大标题从下方进入
- 正文出现
- 四个颜色频道指示条依次点亮

频道指示条使用现有四个角色颜色，不新增数据源。

### Character Channels

四张卡片按频道顺序进入：

- `CHANNEL 001`
- `CHANNEL 002`
- `CHANNEL 003`
- `CHANNEL 004`

每张卡进入时有轻微上浮和透明度变化。

当前选中卡增加：

- 细边框高亮
- 轻微信号脉冲
- `Current signal` 文本保持

点击卡片仍然只更新 `activeIndex`，不自动滚回 Hero。

### Channel Map

频道地图升级为“信号场”。

视觉变化：

- 四个色块保留
- 每个色块内部加入很淡的径向光晕或扫描线
- 当前 `Tuned` 的色块增加边框和小幅亮度

交互行为：

- 点击色块更新 `activeIndex`
- 当前色块的 `Tuned` 状态同步变化
- 不新增复杂地图算法

### Future Drops

结尾做成“下一季信号加载”。

进入视口时：

- `Future Drops` 标签出现
- `Next signal loading` 大标题带轻微扫描闪烁
- 三行状态文字依次出现
- 背景有低速信号波纹

这里允许后续生成一张抽象背景图，但本阶段先不生成。只有 CSS 背景撑不住视觉时，再生成图像。

## 技术设计

### 新增 hook

新增 `src/hooks/useInView.ts`：

- 基于 IntersectionObserver
- 返回 `ref` 和 `isInView`
- 支持 `threshold`
- 支持 `rootMargin`
- 一旦进入视口后保持激活，不反复重置

### 新增组件

新增 `src/components/MotionSection.tsx`：

- 包装 section 内容
- 根据进入视口状态添加 `is-visible`
- 统一控制入场 class
- 不改变语义结构

是否使用该组件按实际代码简洁度决定。若直接在各 section 中使用 hook 更简单，可以不创建该组件。

### CSS

在 `src/styles.css` 中新增：

- `.motion-reveal`
- `.motion-reveal.is-visible`
- `.motion-stagger`
- `.signal-scan`
- `.signal-pulse`
- `.signal-field`
- `@media (prefers-reduced-motion: reduce)`

CSS 必须保持局部、可读，不写过度抽象动画系统。

### 组件改动

需要修改：

- `HeroSection.tsx`
- `UniverseIntro.tsx`
- `SeasonSection.tsx`
- `CharacterChannels.tsx`
- `ChannelMap.tsx`
- `FutureDrops.tsx`
- `styles.css`

可新增：

- `src/hooks/useInView.ts`

不需要修改：

- `src/data/toonhub.ts`
- `CharacterDetailModal.tsx`，除非视觉检查发现弹窗被动效影响

## 验收标准

### 构建

`npm run build` 必须通过。

### 桌面端

在桌面宽度检查：

- Hero 首屏仍填满第一视口
- 首屏入场没有遮挡白色文字
- 角色点击切换仍工作
- `DISCOVER IT` 仍打开详情弹窗
- 下方五个区块都能滚动显示
- 各区块进入视口时有明显但克制的动效
- Character Channels 卡片依次进入
- Channel Map 点击仍同步 active character
- Future Drops 有加载/信号感
- 控制台无 error/warn

### 移动端

在移动宽度检查：

- 页面没有横向滚动
- Hero 文字和按钮不互相遮挡
- 动效不导致角色图断裂式裁切
- 各 section 纵向堆叠正常
- 卡片和地图按钮可点击
- 详情弹窗仍能打开和关闭
- 控制台无 error/warn

### 减少动态效果

模拟或检查 `prefers-reduced-motion`：

- 内容仍全部可见
- 连续扫描/脉冲动画停止或显著减少
- 交互不受影响

## 暂不做的增强

以下想法保留到下一阶段：

- 生成大幅背景图
- 引入 GSAP
- 滚动绑定角色自动切换
- 固定章节导航
- 章节进度条
- 页面加载遮罩

本阶段先把当前静态品牌宇宙升级为有滚动叙事感的版本，保持轻量、稳定、可维护。
