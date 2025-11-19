import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	articleState: typeof defaultArticleState;
	onApply: (newState: typeof defaultArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = forwardRef<
	HTMLDivElement,
	ArticleParamsFormProps
>(({ isOpen, onToggle, articleState, onApply, onReset }, ref) => {
	const localRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

	const [localFontFamily, setlocalFontFamily] = React.useState(
		articleState.fontFamilyOption
	);
	const [localFontSize, setlocalFontSize] = React.useState(
		articleState.fontSizeOption
	);
	const [localFontColor, setlocalFontColor] = React.useState(
		articleState.fontColor
	);
	const [localBgColor, setlocalBgColor] = React.useState(
		articleState.backgroundColor
	);
	const [localContentWidth, setlocalContentWidth] = React.useState(
		articleState.contentWidth
	);

	React.useEffect(() => {
		if (isOpen) {
			setlocalFontFamily(articleState.fontFamilyOption);
			setlocalFontSize(articleState.fontSizeOption);
			setlocalFontColor(articleState.fontColor);
			setlocalBgColor(articleState.backgroundColor);
			setlocalContentWidth(articleState.contentWidth);
		}
	}, [isOpen, articleState]);

	const handleApply = () => {
		onApply({
			fontFamilyOption: localFontFamily,
			fontSizeOption: localFontSize,
			fontColor: localFontColor,
			backgroundColor: localBgColor,
			contentWidth: localContentWidth,
		});
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={localRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localFontFamily}
						onChange={setlocalFontFamily}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={localFontSize}
						onChange={setlocalFontSize}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={localFontColor}
						onChange={setlocalFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localBgColor}
						onChange={setlocalBgColor}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={localContentWidth}
						onChange={setlocalContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
});

ArticleParamsForm.displayName = 'ArticleParamsForm';
