---
title: 教育と自然言語処理の応用
date: '2022-09-17'
tags: ['NLP', '教育']
draft: false
summary:
---

## 記述式答案の自動採点

### 背景

高校の新学習指導要領の方針に伴い、国語と数学において大学入試共通テストでの記述式問題の導入が検討されたが、「**採点が難しい**」ことから断念された

しかし、**論理的な思考力や表現力を育て伸ばすことは大変重要であり**、それらを評価する観点から、大学入試において記述式問題が果たす役割が大きいことには変わりはない

[民間英語と記述式の導入断念　 25 年共通テストで文科省](https://www.nikkei.com/article/DGXZQOUE207BF0Q1A720C2000000/)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/cbeeacb7-1641-4317-aeae-85148dd6a0f0.png)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/0c3f870a-84e2-402a-8712-889cec10ba99.png)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/6689836e-7600-4c70-8d89-b488871ca9e1.png)

[大学入学共通テストの記述式問題について - 文部科学省](https://www.mext.go.jp/a_menu/koutou/koudai/detail/1420229_00001.htm)

![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/95823ea2-aea7-4a81-9f2d-d91aee59923c.png)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/a9dbf9a0-ddaf-46f6-a88e-5861d9777b0e.png)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/9d62a7c4-9c70-4162-bc6f-bdb4b38a6fe4.png)

### 記述式答案の自動採点タスク

記述式答案の自動採点は、20 字〜200 字程度の自由記述答案に対して、採点基準に基づいて採点を行うタスクである

自然言語処理における自動採点タスクは、Essay Scoring と Short Answer Scoring に分類できる

- Essay Scoring
  - エッセイは日本語では「小論文」に近い
  - あるトピックに対して数百字程度で書かれた論述を自動で評価するタスク
  - 文法の正しさ・文章構成・根拠の妥当性などから総合的に評価を行う
- Short Answer Scoring (SAS)
  - 20 字〜200 字程度の自由記述答案に対して、採点基準に基づいて採点を行うタスク
  - Essay Scoring に比べて、トピックが限定的なので答案の自由度は低く、定義された採点基準を満たしているかを判断するタスクに落とし込めるので、機械的に解きやすい
  - 記述式答案の自動採点はこの Short Answer Scoring にあたる

![img](https://img.esa.io/uploads/production/attachments/17949/2022/09/17/106776/a3ee6be3-b3e5-4512-b4b4-432782d30a47.png)

[記述式答案の採点・評価を支援する言語処理技術](https://www.mext.go.jp/content/20210302-mxt_chousa02-000013129-3.pdf) より

記述式問題の例
![img](https://img.esa.io/uploads/production/attachments/17949/2022/09/17/106776/cfc1c3ff-66fd-4160-9ea5-fcdf812cd965.png)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/09/17/106776/6ef74bc7-14b2-4bb2-965e-0a76d5c55b4e.png)

[ 「大学入学共通テスト(仮称)」 記述式問題のモデル問題例](https://www.dnc.ac.jp/albums/abm00009385.pdf) より

### 現状と課題

- [人間と AI の協調により記述式答案自動採点の品質を保証 ─AI による安全な自動採点の実現に道 ─](https://www.tohoku.ac.jp/japanese/2022/08/press20220831-01-ai.html)
- [記述式答案の採点・評価を支援する言語処理技術](https://www.mext.go.jp/content/20210302-mxt_chousa02-000013129-3.pdf)
- [国語記述式答案自動採点の現状と実応用に向けて](https://aip.riken.jp/uploads/1-1_aip-edusympo_funayama.pdf)
- [【業界初】代ゼミが「記述式を AI 採点する現代文トレーニング」|](https://prtimes.jp/main/html/rd/p/000000005.000072274.html)

汎用的なモデルを作ることは難しいので、まずは特定の問題に限定して採点できるモデルを構築し、徐々に問題の幅を広げていく必要がある<br />
問題文・採点基準・答案・採点結果のデータが必要だが、データを入手・構築するコストが高く、フリーで利用できるデータセットは限られている

- [理研記述問題採点データセット](https://www.nii.ac.jp/dsc/idr/rdata/RIKEN-SAA/)

## 小論文の自動採点

### 背景

共通テストでの記述式問題の導入は断念されたが、大学の年内入試の拡大により、**「文章を書く」能力を高めることの必要性は高まっている**

[年内入試とは　面接や小論文中心、9 ～ 12 月に選考 - 日本経済新聞](https://www.nikkei.com/article/DGXZQOUE062DL0W2A800C2000000/)
![img](https://img.esa.io/uploads/production/attachments/17949/2022/08/30/106776/4f8b379b-436e-486b-ae6c-a041cf5e7fcd.png)

[学習指導要領](https://www.mext.go.jp/a_menu/shotou/new-cs/idea/index.htm)の改訂により、子供たちに必要な 3 つの柱が整理された
**小論文は「思考力、判断力、表現力」を育むための題材になる**

![img](https://img.esa.io/uploads/production/attachments/17949/2022/09/17/106776/33c1a9bf-5bb5-4e1a-847b-1b4cde1712ce.png)

改訂には、「これからの社会が、どんなに変化して予測困難な時代になっても、自ら課題を見付け、自ら学び、自ら考え、判断して行動し、それぞれに思い描く幸せを実現してほしい。」という思いが込められている

つまり、**他者から与えられた問題を解く能力だけではなく、これからは「自ら」考える・言葉にする・行動する能力が求められる**

小論文や、それに限らず日常の中で、振り返り、課題を見つけ、整理し、言葉にし、行動につなげる力を育むことはこれからの日本を作る子供たちに欠かせない

![img](https://img.esa.io/uploads/production/attachments/17949/2022/09/17/106776/65d5154c-544c-410a-9121-df224e955e47.png)

[平成 29・30・31 年改訂学習指導要領の趣旨・内容を分かりやすく紹介](https://www.mext.go.jp/a_menu/shotou/new-cs/1383986.htm) より

入試で小論文を書く生徒はこれから増えていくと考えられるが、小論文を採点・添削・個別指導するコストは高く、それができる教師が不足している<br />
自動採点技術を応用することで、教師の指導をサポートしたり、生徒が自主トレーニングできる仕組みが作れるかもしれない

### 小論文の自動採点タスク

小論文の自動採点は上述の Essay Scoring にあたる<br />
文法の正しさはある程度パターン化しやすく機械で解きやすい（[文法誤り訂正タスク](https://www.ai-gakkai.or.jp/resource/my-bookmark/my-bookmark_vol33-no6/)を応用できる）が、文章構成や根拠の妥当性などは文章の内容（意味）レベルで解析が必要であり、世界で見ても知見が少ない

ディベートを題材に、論理構造を解析してフィードバックを生成する研究が行われている
![img](https://img.esa.io/uploads/production/attachments/17949/2022/09/17/106776/68d3df3f-92eb-4e04-88a3-7d8c6a315b64.png)

[記述式答案の採点・評価を支援する言語処理技術](https://www.mext.go.jp/content/20210302-mxt_chousa02-000013129-3.pdf) より

### 現状

- [「教育アセスメント × 言語処理シンポジウム」 の開催に当たって](https://aip.riken.jp/uploads/0_aip-edusympo_inui.pdf)
- [論述リビジョンのためのメタ評価基盤](https://speakerdeck.com/chemical_tree/lun-shu-ribiziyonfalsetamefalsemetaping-jia-ji-pan)

## データセットを作るための技術

### 個人情報匿名化

自由記述形式のテキストには、氏名や住所など個人を特定できるような個人情報が含まれる可能性がある<br />
[個人情報保護法](https://www.gov-online.go.jp/useful/article/201703/1.html)に基づき、企業は個人情報に配慮しながら適切に取り扱わなければならない

個人情報が含まれる可能性のあるテキストデータはそのまま利用することはできないので、[匿名加工](https://www.ppc.go.jp/personalinfo/tokumeikakouInfo/)が必要になる

匿名加工を全て人手で行うことはコストが高く現実的ではないので、自然言語処理の技術を応用して（半）自動化したい

テキスト中から人名や組織名などの固有表現を抽出する技術である固有表現抽出が応用できる

- [日本語固有表現抽出における BERT-MRC の検討](https://www.anlp.jp/proceedings/annual_meeting/2022/pdf_dir/PT1-7.pdf)
- [NLP による個人情報の仮名化: 民事判決のオープンデータ化へ向けた取り組みの紹介](https://note.com/legalscape/n/nf6341940deaa)

### 手書き文字認識

デジタル化されたテキストデータを扱うことが前提になっているが、実際の学校現場ではまだ紙で課題を提出させることも根強く残っている<br />
紙のテキストをデータ化できたら、先生が確認・管理しやすくなる

[高校で配布する家庭学習教材、”紙”と”デジタル”が混在。学習記録の収集は”紙”が主流な一方、記録管理は”デジタル”が主流で煩雑な傾向に](https://prtimes.jp/main/html/rd/p/000000144.000047308.html)

以下のような手書き文字認識のための API を提供しているサービスがある

- Google Cloud Vision API の OCR
- [ユーザーローカル手書き文字認識 AI](https://ai-ocr.userlocal.jp)
- [Tegaki](https://www.tegaki.ai)

しかし、文字の粗さだったり、カメラ・スキャンの性能、用紙のフォーマットなど様々な状況に耐えうる性能には達していない

最近だと iPad の文字認識精度がかなり高くなっている<br />
これからは PC やタブレット、デジタルペンが普及し、デジタルな手書き文字に移行していく可能性がある<br />
そうなればもっと子どもたちの手書き文字が認識しやすくなるし、これまで積み上げてきた教育の形を継承しつつ、デジタルによる学びの形を進化させることができる
