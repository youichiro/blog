---
title: ER図を作るためのツールまとめ
date: '2020-06-12'
tags: ['database']
draft: false
summary: summary
---

## ER 図を作るためのツール

- Mermaid
- PlantUML
- TablePlus
- dbdiagram.io
- draw.io
- Rails ERD

## サンプルの DB スキーマ

この記事では以下のような簡単なタスクアプリを想定したエンティティ関係の ER 図を書くことを想定します

- users
  - id
  - email
- tasks
  - id
  - name
  - user_id
- tags
  - id
  - name
- task_tags
  - id
  - task_id
  - tag_id

## Mermaid

[Mermaid](https://mermaid-js.github.io/mermaid)は Markdown でフローチャートやガントチャートなどのグラフを書ける記法です<br />
今回は ER 図を書きたいので [Entity Relationship Diagram](https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram) の書き方で作ります

### 表示方法

Live Editor で試すことができます<br />
https://mermaid-js.github.io/mermaid-live-editor

また VSCode で拡張機能「Markdown Preview Mermaid Support」をインストールすることで Mermaid をプレビューすることができます

### 書き方

`mermaid.md`ファイルを作成し、コードブロックに mermaid を指定して記述します

````mermaid:mermaid.md
```mermaild
%%{init:{'theme':'neutral'}}%%

erDiagram
  users {
    int id PK
    string email "メールアドレス"
  }

  tasks {
    int id PK
    int user_id FK
    string name "タスク名"
  }

  tags {
    int id PK
    string name "タグ名"
  }

  task_tags {
    int id PK
    int task_id FK
    int tag_id FK
  }

  users ||--|{ tasks : ""
  tasks ||--|{ task_tags : ""
  tags ||--|{ task_tags : ""
```　
````

個人的な好みでテーマを nautral に変更しています

```
%%{init:{'theme':'neutral'}}%%
```

### 表示

![img](/static/images/20220612_er_diagram/01.png)

### 特徴

- 書き方が簡単でわかりやすい
- GitHub や esa でプレビューされる

## PlantUML

[PlantUML](https://plantuml.com/ja/)も Mermaid のようにさまざまな種類のグラフをテキストで記述できるものです

### 表示方法

java をインストールする

```sh
$ brew install java
$ sudo ln -sfn $(brew --prefix)/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
```

必要なライブラリをインストールする

```sh
$ brew install graphviz
$ brew install plantuml
```

VSCode に PlantUML プラグインをインストールする

![img](/static/images/20220612_er_diagram/02.png)

VSCode で拡張子`.pu`のファイルを作成し、`option+d`を押すと PlantUML のプレビューが表示されます

### 書き方

`plantuml.pu`ファイルを作成し、[PlantUML の ER 図の記法](https://plantuml.com/ja/ie-diagram)に従って記述します

```pu:plantuml.pu
@startuml
hide circle

skinparam class {
    BackgroundColor snow
    BorderColor black
    ArrowColor black
}

entity users {
    id int (PK)
    --
    email varchar not null
}

entity tasks {
    id int (PK)
    --
    user_id int (FK)
    name varchar
}

entity tags {
    id int (PK)
    --
    name varchar
}

entity task_tags {
    id int (PK)
    --
    task_id int (FK)
    tag_id int (FK)
}

users ||-|{ tasks
tasks ||-|{ task_tags
tags ||--|{ task_tags
@enduml
```

個人的な好みでスタイルを変更しています

```
skinparam class {
    BackgroundColor snow
    BorderColor black
    ArrowColor black
}
```

### 表示

![img](/static/images/20220612_er_diagram/03.png)

### 特徴

- PlantUML は Mermaild に比べ記法がやや複雑ですが、その分細かなスタイルの表示に対応することができる
- GitHub でプレビューされない
  - esa ではプレビューされる

## TablePlus

[TablePlus](https://tableplus.com/)は MySQL や PostgreSQL などのデータベースの GUI ツールです

ER 図を作るための機能も備わっています<br />
以下のリンクで画面上で ER 図を作成することができます<br />
https://diagramplus.com/

![img](/static/images/20220612_er_diagram/04.png)

また、すでに migrate されているデータベースと接続していれば、そのスキーマから ER 図を自動生成することもできます

- TablePlus を起動しデータベースに接続する
- メニューから「Plugins」>「Manage Plugins」を開く

![img](/static/images/20220612_er_diagram/05.png)

- 「Diagram Generator」をインストールする

![img](/static/images/20220612_er_diagram/06.png)

- テーブル一覧メニューで右クリックして、「Generate Diagram」をクリックする

![img](/static/images/20220612_er_diagram/07.png)

### 特徴

- 画面上で簡単に ER 図を作ることができる
- テーブルの移動ができる
- SQL を export できる
- 既存の DB から ER 図を自動生成できる

## dbdiagram.io

[dbdiagram.io](https://dbdiagram.io/home)はブラウザ上で ER 図を作れるツールです
アカウント登録すればシェア URL を発行できます

![img](/static/images/20220612_er_diagram/08.png)

### 書き方

```
Table users {
  id int [pk]
  name varchar [not null]
}

Table tasks {
  id int [pk]
  name varchar [not null]
  user_id int [not null]
}

Table tags {
  id int [pk]
  name varchar [not null]
}

Table task_tags {
  id int [pk]
  task_id int [not null]
  tag_id int [not null]
}

Ref: users.id < tasks.user_id // one to many
Ref: tasks.id < task_tags.task_id
Ref: tags.id < task_tags.tag_id
```

### 特徴

- 補完が効いて書きやすい
- 制約やインデックスなど DB 設計に必要な情報を記述できる
- テーブルの移動ができる
- シェアできる
- SQL から import できるほか、Rails の schema.rb も import できる

## draw.io

[draw.io](https://draw.io)は言わずもがな、フリーの作図ツールです<br />
手軽に自由に図が書けて、ER 図を書くためのさまざまな図形も用意されています

![img](/static/images/20220612_er_diagram/10.png)

### 特徴

- 手軽に自由に ER 図を書くことができる
- シェアできる
- import, export ができない
- 大規模なスキーマの場合、管理が大変になる

## Rails ERD

[Rails ERD](https://github.com/voormedia/rails-erd)は Rails のアプリケーションから ER 図を自動生成する gem です

Gemfile に`gem 'rails-erd', group: :development`を追加し、`bundle exec erd`を実行することで`erd.pdf`が生成されます<br />
また`~/.erdconfig`で設定を変更することができます

![img](https://camo.githubusercontent.com/779c03482afbe8e70abd5898910bc8111b6f03cd36c8dc5b3d18b9e54c87ef0a/68747470733a2f2f766f6f726d656469612e6769746875622e696f2f7261696c732d6572642f696d616765732f656e746974792d72656c6174696f6e736869702d6469616772616d2e706e67)

### 特徴

- Rails で定義した型やアソシエーションなどの情報を ER 図に表示できる
- migrate した時に ER 図の PDF を更新することができる
