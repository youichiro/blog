---
title: Next.js + Tailwind CSS + Storybook のセットアップ
date: '2022-07-02'
tags: ['React']
draft: false
summary:
---

## Next プロジェクトを作成する

```sh
$ npx create-next-app@latest --ts demo-next-storybook
$ cd demo-next-storybook
```

Next.js のバージョン: 12.1.6

## Tailwind をインストールする

参考
https://tailwindcss.com/docs/guides/nextjs

```sh
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

`tailwind.config.js` と `postcss.config.js` が生成される

config ファイルにパスを追加する

```diff:tailwind.config.js
 module.exports = {
   content: [
+    "./pages/**/*.{js,ts,jsx,tsx}",
+    "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
     extend: {},
   },
   plugins: [],
 }
```

CSS ファイルに`@tailwind`ディレクティブを追加する

```diff:styles/globals.css
+@tailwind base;
+@tailwind components;
+@tailwind utilities;
```

## Button コンポーネントを作る

`components/Button/Button.tsx`を作成する

```tsx:components/Button/Button.tsx
import React from "react";

type Props = {
  outlined?: boolean;
  size?: 'small' | 'middle';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  outlined = false,
  size = 'middle',
  children,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`
        rounded
        ${size === 'middle'
          ? 'px-5 py-1'
          : 'px-3 py-1 text-sm'
        }
        ${outlined
          ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
          : 'border-none bg-blue-600 text-white hover:bg-blue-500'
        }
      `}
      onClick={onClick}
      >
        {children}
    </button>
  );
};
```

root ページに表示する

```diff:pages/index.tsx
 import type { NextPage } from 'next'
 import Head from 'next/head'
 import Image from 'next/image'
+import { Button } from '../components/Button/Button'
 import styles from '../styles/Home.module.css'

 const Home: NextPage = () => {
   return (
     <div className={styles.container}>
       // ...
       <main className={styles.main}>
         <h1 className={styles.title}>
           Welcome to <a href="https://nextjs.org">Next.js!</a>
         </h1>

+        <Button
+          outlined={false}
+          size={'small'}
+          onClick={() => document.location.href = "https://reactjs.org"}
+        >
+          Submit
+        </Button>

         // ...
       </main>
     </div>
   )
 }

 export default Home
```

`outlined={false}, size={'small'}` の場合
![img](https://storage.googleapis.com/zenn-user-upload/791ec26caefd-20220702.png)

`outlined={true}, size={'middle'}` の場合
![img](https://storage.googleapis.com/zenn-user-upload/c718245c5a9c-20220702.png)

## Storybook をインストールする

参考
https://storybook.js.org/docs/react/get-started/install

```sh
$ npx sb init
```

`.storybook/main.js` と `.storybook/preview.js` とサンプルファイルが生成される

storybook を起動する

```sh
$ yarn storybook
```

![img](https://storage.googleapis.com/zenn-user-upload/3505103c29bb-20220702.png)

## Button コンポーネントのストーリーファイルを作成する

`src/components/Button/Button.stories.tsx`を作成する

```tsx:src/components/Button/Button.stories.tsx
import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from "./Button";

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

export const Outlined = Template.bind({});
Default.args = {
  outlined: true,
  children: 'Button',
};

export const Small = Template.bind({});
Default.args = {
  size: 'small',
  children: 'Button',
};

export const OutlinedSmall = Template.bind({});
Default.args = {
  outlined: true,
  size: 'small',
  children: 'Button',
};
```

ストーリーファイルを読み込むためにパスを追加する

```diff:.storybook/main.js
 module.exports = {
   "stories": [
     "../stories/**/*.stories.mdx",
     "../stories/**/*.stories.@(js|jsx|ts|tsx)",
+    "../components/**/*.stories.@(js|jsx|ts|tsx)"
   ],
   "addons": [
     "@storybook/addon-links",
     "@storybook/addon-essentials",
     "@storybook/addon-interactions"
   ],
   "framework": "@storybook/react",
   "core": {
     "builder": "@storybook/builder-webpack5"
   }
 }
```

![img](https://storage.googleapis.com/zenn-user-upload/ba960900e676-20220702.png)

まだ Tailwind が読み込まれていない

## Tailwind CSS を Storybook で読み込む

`@storybook/addon-postcss`をインストールする

```sh
$ yarn add -D @storybook/addon-postcss
```

設定を追加する

```diff:.storybook/main.js
   "addons": [
     "@storybook/addon-links",
     "@storybook/addon-essentials",
     "@storybook/addon-interactions",
+    {
+      name: '@storybook/addon-postcss',
+      options: {
+        postcssLoaderOptions: {
+          implementation: require('postcss'),
+        },
+      },
+    }
```

`.storybook/preview.js`で CSS ファイルを import する

```diff:.storybook/preview.js
+import '../styles/globals.css';

 export const parameters = {
   actions: { argTypesRegex: "^on[A-Z].*" },
   controls: {
     matchers: {
       color: /(background|color)$/i,
       date: /Date$/,
     },
   },
 }
```

表示できた

![img](https://storage.googleapis.com/zenn-user-upload/5d91f237a3c1-20220702.png)

## testing ライブラリをインストールする

```sh
$ yarn add -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

- React Testing Library, Jest
  - テストフレームワーク
  - よく組み合わせて使われる
- jest-dom
  - Jest を拡張子使いやすくするカスタム Matcher のセットを提供する
- jest-environment-jsdom
  - TODO

`setupTests.ts`を作成する

```ts:setupTests.ts
import '@testing-library/jest-dom';
```

`jest.config.js`を作成する

```js:jest.config.js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
```

参考
https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

@storybook/testing-react アドオンのインストールする<br/>
(jest のテストコード中に Story を利用可能にする)

```sh
$ yarn add -D @storybook/testing-react
```

npm scripts に test コマンドを追加する

```diff:package.json
 {
   "name": "demo-next-storybook",
   "version": "0.1.0",
   "private": true,
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
+    "test": "jest --watch",
     "lint": "next lint",
     "storybook": "start-storybook -p 6006",
     "build-storybook": "build-storybook"
   },
   // ...
 }
```

## Button コンポーネントのテストを作成する

`components/Button/Button.test.tsx`を作成する

```components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Button.stories';

const { Default } = composeStories(stories);

test('render button with default args', () => {
  render(<Default>Button</Default>);
  const buttonElement = screen.getByText(/Button/i);
  expect(buttonElement).not.toBeNull();
});
```

テストを実行する

```sh
$ yarn test
```
