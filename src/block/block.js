/***************************************************************
 *
 *  Copyright notice
 *
 *  (c) 2019 Alexander Bohn <alexander.bohn@hebotek.at>, HeBoTek OG
 *
 *  All rights reserved
 *
 *  This script is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

 /**
 * Gutenberg Inclusions
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { MediaUpload, InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { Button } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Defintions of the block attributes
 */
const attributes = {
	id: {
		source: "attribute",
		selector: ".variable-width.slider",
		attribute: "id"
	},
	slides: {
		type: 'array',
		default: [],
        source: 'query',
        selector: '.logo-item',
        query: {
            url: {
                type: 'string',
                source: 'attribute',
				attribute: 'src',
				selector: 'img',
            },
            alt: {
                type: 'string',
                source: 'attribute',
				attribute: 'alt',
				selector: 'img',
				default: '',
			},
			index: {
				type: 'string',
				source: 'attribute',
				attribute: 'data-slide-index'
			},
        }
    }
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'hebo/logo-slider', {
	title: __( 'Logo Slider' ), // Block title.
	icon: 'images-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'logo-slider' ),
		__( 'Logo Slider' ),
		__( 'HeBo' ),
	],
	attributes,
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit({ attributes, className, setAttributes }) {
		const { slides } = attributes;
		const addSlide = () => {
			setAttributes({
				slides: [
					...slides,
					{
						index: slides.length,
						content: ""
					}
				]
			})
		}

		const getImageButton = (openEvent, logo) => {
			if(logo.url) {
				return (
					<Fragment>
						<span class="hebo__logo-slider-rm-logo dashicons dashicons-no" onClick={ () => {
							const newLogo = Object.assign({}, logo, {
								url: '',
								alt: ''
							});
							setAttributes({
								slides:
								[
									...slides.filter(
										item => item.index != logo.index
									),
									newLogo
								]
							});
						} }></span>
						<img
							src={ logo.url }
							className="hebo__logo-slider-logo"
							onClick={ openEvent }
						/>
					</Fragment>
				)
			} else {
				return (
					<Fragment>
						<Button isLarge onClick={ openEvent }>{ __('add logo', 'hebo-logo-slider') }</Button>
						<Button isLarge onClick={ () => {
							const newLogoList = attributes.slides
							.filter(item => item.index != logo.index)
							.map(item => {
								if(item.index > logo.index) {
									item.index -= 1;
								}
								return item;
							})
							setAttributes({slides: newLogoList});
						} }>{ __('remove slide', 'hebo-logo-slider') }</Button>
					</Fragment>
				)
			}
		}

		const logoList = slides
		.sort((a, b) => a.index - b.index)
		.map(logo => {
			return (
				<div className="hebo__logo-slider-block">
					<div className="hebo__logo-slider-slide">
						<MediaUpload
							onSelect = { media => {
								const newLogo = Object.assign({}, logo, {
									url: media.url,
									alt: media.alt
								})
								setAttributes({
									slides: [
										...slides
										.filter(item => item.index != logo.index),
										newLogo
									]
								})
							} }
							type = "image"
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value = { logo.url }
							render = { ( { open } ) => getImageButton(open, logo) }
						/>
					</div>
				</div>
			)
		});

		return (
			<div className= { className }>
				{ logoList }
				<div className="hebo__logo-slider-block">
					<span class="hebo__logo-slider-add-slide dashicons dashicons-plus-alt" onClick={ () => addSlide() }></span>
				</div>
			</div>
		)

	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save({ attributes }) {
		const { slides, id } = attributes;
		const slideList = slides
		.map(
			slide => {
				return (
					<div className="logo-item" data-slide-index={slide.index}>
						<img src={slide.url} alt={slide.alt} />
					</div>
				)
			}
		);
		return (
			<section className="variable-width slider" id={ id }>
				{ slideList }
			</section>
		);
	},
} );
