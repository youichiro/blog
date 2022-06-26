---
title: Railsの管理画面gem Administrate を使ってみる
date: '2022-06-26'
tags: ['rails']
draft: false
summary:
---

## Administrate とは

[Administrate](https://github.com/thoughtbot/administrate)は Rails で管理画面を自動生成してくれるライブラリです

- [GitHub](https://github.com/thoughtbot/administrate)
- [デモページ](https://administrate-prototype.herokuapp.com/admin)
- [公式ガイド](https://administrate-demo.herokuapp.com/)

![img](/static/images/20220626_administrate/01.png)

管理画面の gem は他にも [Rails Admin](https://github.com/sferik/rails_admin) や [ActiveAdmin](https://github.com/activeadmin/activeadmin) があります

Rails Admin

![img](/static/images/20220626_administrate/02.png)

ActiveAdmin

![img](/static/images/20220626_administrate/03.png)

Administrate はこれらのライブラリのように同じ問題を解決しますが、さらに管理者の体験を良くし、また開発者が簡単にカスタマイズできるようにすることを目指しています

Administrate の特徴として、独自の記法(DSL)ではなく Rails の書き方に沿って記述するので、変更したい時にわかりやすいと思います

## 注意

この記事の執筆時点ではバージョン 0.17.0 です<br/>
まだバージョン 1.0 リリースの前なので、この後大きな変更が入る可能性があります

## 使ってみる

検証用の Rails プロジェクトを作成します

```sh
$ ruby -v
ruby 3.1.2p20

$ gem install rails

$ rails --version
Rails 7.0.3

$ rails new demo_administrate

$ cd demo_administrate
```

試しに scaffold で Post モデルを生成します

```sh
$ bin/rails g scaffold post title:string body:text published:boolean

$ bin/rails db:create
Database 'db/development.sqlite3' already exists
Created database 'db/test.sqlite3'

$ bin/rails db:migrate
== 20220626030909 CreatePosts: migrating ======================================
-- create_table(:posts)
   -> 0.0027s
== 20220626030909 CreatePosts: migrated (0.0028s) =============================
```

Administrate を導入します<br/>
Gemfile に`gem "administrate"`を追加してインストールします

```Gemfile
# add
gem "administrate"
```

```sh
$ bundle install
```

インストールコマンドを実行します

```sh
$ bin/rails generate administrate:install
```

実行すると以下の差分が出ます

- config/routes.rb に管理画面のパスが追加される
- 以下のファイルが生成される
  - app/controllers/admin/application_controller.rb
  - app/controllers/admin/posts_controller.rb
  - app/dashboards/post_dashboard.rb

```diff:config/routes.rb
 Rails.application.routes.draw do
+  namespace :admin do
+    resources :posts
+
+    root to: "posts#index"
+  end
   resources :posts
 end
```

```ruby:app/controllers/admin/application_controller.rb
# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_action :authenticate_admin

    def authenticate_admin
      # TODO Add authentication logic here.
    end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end
  end
end
```

```ruby:app/controllers/admin/posts_controller.rb
module Admin
  class PostsController < Admin::ApplicationController
    # Overwrite any of the RESTful controller actions to implement custom behavior
    # For example, you may want to send an email after a foo is updated.
    #
    # def update
    #   super
    #   send_foo_updated_email(requested_resource)
    # end

    # Override this method to specify custom lookup behavior.
    # This will be used to set the resource for the `show`, `edit`, and `update`
    # actions.
    #
    # def find_resource(param)
    #   Foo.find_by!(slug: param)
    # end

    # The result of this lookup will be available as `requested_resource`

    # Override this if you have certain roles that require a subset
    # this will be used to set the records shown on the `index` action.
    #
    # def scoped_resource
    #   if current_user.super_admin?
    #     resource_class
    #   else
    #     resource_class.with_less_stuff
    #   end
    # end

    # Override `resource_params` if you want to transform the submitted
    # data before it's persisted. For example, the following would turn all
    # empty values into nil values. It uses other APIs such as `resource_class`
    # and `dashboard`:
    #
    # def resource_params
    #   params.require(resource_class.model_name.param_key).
    #     permit(dashboard.permitted_attributes).
    #     transform_values { |value| value == "" ? nil : value }
    # end

    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
    # for more information
  end
end
```

```ruby:app/dashboards/post_dashboard.rb
require "administrate/base_dashboard"

class PostDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    title: Field::String,
    body: Field::Text,
    published: Field::Boolean,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    id
    title
    body
    published
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    title
    body
    published
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    title
    body
    published
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how posts are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(post)
  #   "Post ##{post.id}"
  # end
end
```

サーバーを起動して、`/admin`を開くと、administrate の管理画面が表示されます

```sh
$ bin/rails s
$ open http://localhost:3000/admin
```

![img](/static/images/20220626_administrate/04.png)

![img](/static/images/20220626_administrate/05.png)

![img](/static/images/20220626_administrate/06.png)

## 日本語対応する

日本語表示にしてみます<br/>
defalut_locale を ja に指定します

```diff:config/application.rb
 module DemoAdministrate
   class Application < Rails::Application
    # ...
+   config.i18n.default_locale = :ja
   end
 end
```

`config/locales/ja.yml`ファイルを作成し、モデルの情報を記述します

```config/locales/ja.yml
ja:
  activerecord:
    models:
      post: 投稿
    attributes:
      post:
        title: タイトル
        body: 本文
        published: 公開
        created_at: 作成日時
        updated_at: 更新日時
```

![img](/static/images/20220626_administrate/07.png)

## 管理画面の権限チェックを追加する

`app/controllers/admin/application_controller.rb`が管理画面の元となるコントローラです<br/>
ここで before_action に権限チェックメソッドを指定すれば、管理者ユーザーだけ管理画面を開くようにできます<br/>
devise を使っている場合は、用意されている helper を使えば ok です

```diff:app/controllers/admin/application_controller.rb
 module Admin
   class ApplicationController < Administrate::ApplicationController
+    before_action :authenticate_admin_user!
-    before_action :authenticate_admin

-    def authenticate_admin
-      # TODO Add authentication logic here.
-    end
   end
 end
```

## モデルを追加する

Tag モデルを scaffold で追加します

```sh
$ bin/rails generate scaffold tag post:references name:string
$ bin/rails db:migrate
```

次のコマンドを実行することで Tag モデルの dashboard を追加するファイルを生成することができます

```sh
$ bin/rails generate administrate:dashboard Tag
```

routes の admin namespace に`resources :tags`を追加することで管理画面に表示されます

```diff:config/routes.rb
 Rails.application.routes.draw do
   resources :posts
   resources :tags

   namespace :admin do
       resources :posts
+      resources :tags

       root to: "posts#index"
     end
 end
```

![img](/static/images/20220626_administrate/08.png)

関連付けがあるカラムはレコードを選択するフォームになります

![img](/static/images/20220626_administrate/09.png)

## カラム表示を変更する

Tag モデルの dashboard のカラム表示を変更してみます<br/>
app/dashboards/tag_dashboard.rb を修正して以下のような変更を行うことができます

- `COLLECTION_ATTRIBUTES`で一覧画面の表示カラムを変更できる
- `SHOW_PAGE_ATTRIBUTES`で詳細画面の表示カラムを変更できる
- `FORM_ATTRIBUTES`で編集画面の表示カラムを変更できる

以下のように修正することで、カラムの表示順序を変更できます<br/>
カラムを足したり非表示にしたりすることもできます

```diff:app/dashboards/tag_dashboard.rb
 require "administrate/base_dashboard"

 class TagDashboard < Administrate::BaseDashboard
   ATTRIBUTE_TYPES = {
     post: Field::BelongsTo,
     id: Field::Number,
     name: Field::String,
     created_at: Field::DateTime,
     updated_at: Field::DateTime,
   }.freeze

   COLLECTION_ATTRIBUTES = %i[
-    post
     id
     name
+    post
     created_at
   ].freeze

   SHOW_PAGE_ATTRIBUTES = %i[
-    post
     id
     name
+    post
     created_at
     updated_at
   ].freeze

   FORM_ATTRIBUTES = %i[
-    post
     name
+    post
   ].freeze

   COLLECTION_FILTERS = {}.freeze

   # def display_resource(tag)
   #   "Tag ##{tag.id}"
   # end
 end
```

![img](/static/images/20220626_administrate/10.png)

関連付けされたカラムのレコードの表示を変更することもできます<br/>
app/dashboards/post_dashboard.rb の`display_resource`メソッドに表示させたい文字列を指定します

```diff:app/dashboards/post_dashboard.rb
 require "administrate/base_dashboard"

 class PostDashboard < Administrate::BaseDashboard

   # ...

   def display_resource(post)
-    "Post ##{post.id}"
+    "Post ##{post.id} #{post.title}"
   end
 end
```

![img](/static/images/20220626_administrate/11.png)

その他の administrate の詳細は[公式ガイド](https://administrate-demo.herokuapp.com/)をご参照ください

## GitHub

今回の内容のソースコードはこちらのリポジトリで見れます<br/>
https://github.com/youichiro/demo_administrate
