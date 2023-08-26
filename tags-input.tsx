import React, { useEffect, useRef, useState } from 'react';

function useDidUpdateEffect(fn: any, inputs: any) {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) fn();
		else didMountRef.current = true;
	}, inputs);
}

interface TagProps {
	text: string;
	remove: any;
	disabled?: boolean;
	className?: string;
}

export interface TagsInputProps {
	name?: string;
	placeHolder?: string;
	value?: string[] | null;
	onChange?: (tags: string[]) => void;
	onBlur?: any;
	separators?: string[];
	disableBackspaceRemove?: boolean;
	onExisting?: (tag: string) => void;
	onRemoved?: (tag: string) => void;
	disabled?: boolean;
	isEditOnRemove?: boolean;
	beforeAddValidate?: (tag: string, existingTags: string[]) => boolean;
	onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	classNames?: {
		input?: string;
		tag?: string;
	};
	maxTagsCount?: number;
}

const defaultSeparators = ['Enter', 'Tab'];

function Tag({ text, remove, disabled, className }: TagProps) {
	const handleOnRemove = (e: any) => {
		e.stopPropagation();
		remove(text);
	};

	return (
		<span className='inline-flex items-center rounded bg-neutral-800 px-2 py-2'>
			<span>{text}</span>
			{!disabled && (
				<button
					type='button'
					onClick={handleOnRemove}
					aria-label={`remove ${text}`}
					className=' ml-2 cursor-pointer rounded-full border-0 bg-transparent p-0 hover:text-neutral-400 hover:transition-colors'
				>
					&#10005;
				</button>
			)}
		</span>
	);
}

const TagsInput = ({
	name,
	placeHolder,
	value,
	onChange,
	onBlur,
	separators,
	disableBackspaceRemove,
	onExisting,
	onRemoved,
	disabled,
	isEditOnRemove,
	beforeAddValidate,
	onKeyUp,
	classNames,
	maxTagsCount,
}: TagsInputProps) => {
	const [tags, setTags] = useState<any>(value || []);

	useDidUpdateEffect(() => {
		onChange && onChange(tags);
	}, [tags]);

	useDidUpdateEffect(() => {
		if (JSON.stringify(value) !== JSON.stringify(tags)) {
			setTags(value);
		}
	}, [value]);

	const placeholderText =
		maxTagsCount !== undefined && tags.length >= maxTagsCount
			? ''
			: placeHolder;

	const handleOnKeyDown = (e: any) => {
		e.stopPropagation();

		if (
			!e.target.value &&
			!disableBackspaceRemove &&
			tags.length &&
			e.key === 'Backspace'
		) {
			e.target.value = isEditOnRemove ? `${tags.at(-1)} ` : '';
			setTags([...tags.slice(0, -1)]);
			return; // Allow backspace operation and exit function
		}

		// Check to see if the maximum count of tags has been reached, excluding backspace, and prevent any key input
		if (maxTagsCount !== undefined && tags.length >= maxTagsCount) {
			e.preventDefault();
			return;
		}

		const text = e.target.value;

		if (text && (separators || defaultSeparators).includes(e.key)) {
			e.preventDefault();
			if (beforeAddValidate && !beforeAddValidate(text, tags)) return;

			if (tags.includes(text)) {
				onExisting && onExisting(text);
				return;
			}

			setTags([...tags, text]);
			e.target.value = '';
		}
	};

	const onTagRemove = (text: string) => {
		setTags(tags.filter((tag: string) => tag !== text));
		onRemoved && onRemoved(text);
	};

	return (
		<div
			aria-labelledby={name}
			className=' flex flex-wrap items-center gap-2 rounded-md border border-neutral-800 bg-neutral-950 p-2 px-3 py-2 text-sm 
			ring-offset-neutral-950 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
		>
			{tags.map((tag: any) => (
				<Tag
					key={tag}
					className={classNames?.tag}
					text={tag}
					remove={onTagRemove}
					disabled={disabled}
				/>
			))}

			<input
				className='h-10 flex-grow bg-transparent
				 text-neutral-50 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
				type='text'
				name={name}
				placeholder={placeholderText}
				onKeyDown={handleOnKeyDown}
				onBlur={onBlur}
				disabled={disabled}
				onKeyUp={onKeyUp}
			/>
		</div>
	);
};

export { TagsInput };
