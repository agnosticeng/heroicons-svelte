# heroions-svelte

![GitHub Release Date](https://img.shields.io/github/release-date/agnosticeng/heroicons-svelte?color=8B5CF6&style=for-the-badge)
![GitHub](https://img.shields.io/github/license/agnosticeng/heroicons-svelte?color=8B5CF6&style=for-the-badge)


> [Heroicons](https://github.com/tailwindlabs/heroicons) SVG icons as Svelte components.

This zero dependency icon library builds [heroicons](https://heroicons.com/) as Svelte components.

## Installation

```sh
# npm
npm i @agnosticeng/heroicons-svelte

# pnpm
pnpm i @agnosticeng/heroicons-svelte

# Yarn
yarn add @agnosticeng/heroicons-svelte
```

#### Note:  
The dependency is only available on GitHub packages for now. Make sure to configure your `.npmrc` like so:

```sh
# .npmrc
@agnosticeng:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

_Replace `GITHUB_TOKEN` by your own GitHub token ([doc here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token))_

## Usage

### Basic

Import the icon from the `@agnosticeng/heroicons-svelte` folder. See the [Heroicons official list](https://heroicons.com/) for a list of supported icons.

```svelte
<script>
  import ArrowUp from "@agnosticeng/heroicons-svelte/outline/ArrowUp";
</script>

<ArrowUp />
```

or

```svelte
<script>
  import { ArrowUp } from "@agnosticeng/heroicons-svelte/outline";
</script>

<ArrowUp />
```

### Custom size

Use the `size` prop to specify the icon size.

The default size is `24`.

```svelte
<ArrowUp size={16} />
<ArrowUp size={18} />
<ArrowUp size={24} />
```

### Custom props

`$$restProps` are forwarded to the `svg` element.

You can use `stroke-width` to customize the width of the stroke or pass any other valid `svg` attribute to the component.

```svelte
<ArrowUp stroke-width="2" class="icon" />
```

## API

### Props

All props are optional.

| Name          | Type                             | Default value |
| :------------ | :------------------------------- | :------------ |
| size          | <code>number &#124; string</code> | `24`          |
| stroke-width  | <code>number &#124; string</code> | `1.5`         |


## License

[MIT](LICENSE)
