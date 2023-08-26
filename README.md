# Tailwind Input Tag Component 🏷️

React component for creating tags with ease, styled using Tailwind CSS.

![Safari2](https://github.com/tuffstuff9/tailwind-input-tag-component/assets/57072903/8ac3fc53-1bee-4e37-ab9e-63e693731277)


## ✨ Features

🍃 **Lightweight**  
🛠 **Styled with Tailwind**  
⌨️ **Add tags with Enter / Tab**  
🗑️ **Use Backspace to remove last tag**  
🚦 **Set maximum number of tags allowed**  

## Installation

Download the `tags-input.tsx` file and add it to your project directory.

## Usage

If using Next.js, first:

```jsx
'use client';
```

Then:

```jsx
import React, { useState } from 'react';
import { TagsInput } from '@/components/ui/tags-input'; // Modify to import from where you stored the file

export default function TagSelector() {
	const [selected, setSelected] = useState(['Dragonfruit']);

	return (
		<div className=''>
			<div className=''>
				Fruits: <div>{JSON.stringify(selected)}</div>
			</div>
			<TagsInput
				value={selected}
				onChange={setSelected}
				name='fruits'
				placeHolder='Enter Fruits'
				maxTagsCount={3}
			/>
			<div className='text-neutral-400'>
				Enter fruit and press Enter/Tab
			</div>
		</div>
	);
}

```


## 📌 Props

| Prop                 | Description                                                           | Type                                                        | Default                     |
|----------------------|-----------------------------------------------------------------------|-------------------------------------------------------------|-----------------------------|
| `name`               | Value for name of input                                               | string                                                      | -                           |
| `placeholder`        | Placeholder for text input                                            | string                                                      | -                           |
| `value`              | Initial tags                                                          | string[]                                                    | `[]`                        |
| `onChange`           | onChange callback (added/removed)                                     | string[]                                                    | -                           |
| `onKeyUp`            | Input onKeyUp callback                                                | event                                                       | -                           |
| `onBlur`             | Input onBlur callback                                                 | event                                                       | -                           |
| `separators`         | When to add tag                                                       | string[]                                                    | `["Enter", "Tab"]`          |
| `removers`           | Remove last tag if textbox empty and Backspace is pressed             | string[]                                                    | `["Backspace"]`             |
| `onExisting`         | If tag is already added then callback                                 | (tag: string) => void                                       | -                           |
| `onRemoved`          | On tag removed callback                                               | (tag: string) => void                                       | -                           |
| `beforeAddValidate`  | Custom validation before adding tag                                   | (tag: string, existingTags: string[]) => boolean            | -                           |
| `isEditOnRemove`     | Remove the tag but keep the word in the input to edit it              | boolean                                                     | `false`                     |
| `maxTagsCount`       | Maximum number of tags the user is allowed to add                     | number                                                      | -                           |



## Credits

This project is a modified version of `react-tag-input-component` created by [hc-oss](https://github.com/hc-oss). Check out the original repository [here](https://github.com/hc-oss/react-tag-input-component).

## 📜 License

MIT
