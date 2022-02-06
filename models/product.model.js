const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    sku: {
        type: String,
        required: false,
        default: ''
    },
    store_view_code: {
        type: String,
        required: false,
        default: ''
    },
    attribute_set_code: {
        type: String,
        required: false,
        default: 'Default'
    },
    product_type: {
        type: String,
        required: false,
        default: 'simple'
    },
    categories: {
        type: String,
        required: false,
        default: ''
    },
    product_websites: {
        type: String,
        required: false,
        default: 'base'
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    short_description: {
        type: String,
        required: false,
        default: ''
    },
    weight: {
        type: String,
        required: false,
        default: ''
    },
    product_online: {
        type: Number,
        required: false,
        default: 1
    },
    tax_class_name: {
        type: String,
        required: false,
        default: 'Taxable Goods'
    },
    visibility: {
        type: String,
        required: false,
        default: 'Catalog, Search'
    },
    price: {
        type: String,
        required: false,
        default: ''
    },
    special_price: {
        type: String,
        required: false,
        default: ''
    },
    special_price_from_date: {
        type: String,
        required: false,
        default: ''
    },
    special_price_to_date: {
        type: String,
        required: false,
        default: ''
    },
    url_key: {
        type: String,
        required: false,
        default: ''
    },
    meta_title: {
        type: String,
        required: false,
        default: ''
    },
    meta_keywords: {
        type: String,
        required: false,
        default: ''
    },
    meta_description: {
        type: String,
        required: false,
        default: ''
    },
    base_image: {
        type: String,
        required: false,
        default: ''
    },
    base_image_label: {
        type: String,
        required: false,
        default: ''
    },
    small_image: {
        type: String,
        required: false,
        default: ''
    },
    small_image_label: {
        type: String,
        required: false,
        default: ''
    },
    thumbnail_image: {
        type: String,
        required: false,
        default: ''
    },
    thumbnail_image_label: {
        type: String,
        required: false,
        default: ''
    },
    swatch_image: {
        type: String,
        required: false,
        default: ''
    },
    swatch_image_label: {
        type: String,
        required: false,
        default: ''
    },
    created_at: {
        type: String,
        required: false,
        default: ''
    },
    updated_at: {
        type: String,
        required: false,
        default: ''
    },
    new_from_date: {
        type: String,
        required: false,
        default: ''
    },
    new_to_date: {
        type: String,
        required: false,
        default: ''
    },
    display_product_options_in: {
        type: String,
        required: false,
        default: 'Block after Info Column'
    },
    map_price: {
        type: String,
        required: false,
        default: ''
    },
    msrp_price: {
        type: String,
        required: false,
        default: ''
    },
    map_enabled: {
        type: String,
        required: false,
        default: ''
    },
    gift_message_available: {
        type: String,
        required: false,
        default: 'Use config'
    },
    custom_design: {
        type: String,
        required: false,
        default: ''
    },
    custom_design_from: {
        type: String,
        required: false,
        default: ''
    },
    custom_design_to: {
        type: String,
        required: false,
        default: ''
    },
    custom_layout_update: {
        type: String,
        required: false,
        default: ''
    },
    page_layout: {
        type: String,
        required: false,
        default: 'Product -- Full Width'
    },
    product_options_container: {
        type: String,
        required: false,
        default: ''
    },
    msrp_display_actual_price_type: {
        type: String,
        required: false,
        default: 'Use config'
    },
    country_of_manufacture: {
        type: String,
        required: false,
        default: ''
    },
    additional_attributes: {
        type: String,
        required: false,
        default: ''
    },
    qty: {
        type: Number,
        required: false,
        default: 1
    },
    out_of_stock_qty: {
        type: Number,
        required: false,
        default: 0
    },
    use_config_min_qty: {
        type: Number,
        required: false,
        default: 1
    },
    is_qty_decimal: {
        type: Number,
        required: false,
        default: 0
    },
    allow_backorders: {
        type: Number,
        required: false,
        default: 0
    },
    use_config_backorders: {
        type: Number,
        required: false,
        default: 1
    },
    min_cart_qty: {
        type: Number,
        required: false,
        default: 1
    },
    use_config_min_sale_qty: {
        type: Number,
        required: false,
        default: 1
    },
    max_cart_qty: {
        type: Number,
        required: false,
        default: 10000
    },
    use_config_max_sale_qty: {
        type: Number,
        required: false,
        default: 1
    },
    is_in_stock: {
        type: Number,
        required: false,
        default: 1.0000
    },
    use_config_notify_stock_qty: {
        type: Number,
        required: false,
        default: 1
    },
    manage_stock: {
        type: Number,
        required: false,
        default: 1
    },
    use_config_manage_stock: {
        type: Number,
        required: false,
        default: 1
    },
    use_config_qty_increments: {
        type: Number,
        required: false,
        default: 1
    },
    qty_increments: {
        type: Number,
        required: false,
        default: 1.0000
    },
    use_config_enable_qty_inc: {
        type: Number,
        required: false,
        default: 1
    },
    enable_qty_increments: {
        type: Number,
        required: false,
        default: 0
    },
    is_decimal_divided: {
        type: Number,
        required: false,
        default: 0
    },
    website_id: {
        type: Number,
        required: false,
        default: 0
    },
    related_skus: {
        type: String,
        require: false,
        default: ''
    },
    related_position: {
        type: String,
        required: false,
        default: ''
    },
    crosssell_skus: {
        type: String,
        required: false,
        default: ''
    },
    crosssell_position: {
        type: String,
        required: false,
        default: ''
    },
    upsell_skus: {
        type: String,
        required: false,
        default: ''
    },
    upsell_position: {
        type: String,
        required: false,
        default: ''
    },
    additional_images: {
        type: String,
        required: false,
        default: ''
    },
    additional_image_labels: {
        type: String,
        required: false,
        default: ''
    },
    hide_from_product_page: {
        type: String,
        required: false,
        default: ''
    },
    custom_options: {
        type: String,
        required: false,
        default: ''
    },
    bundle_price_type: {
        type: String,
        required: false,
        default: ''
    },
    bundle_sku_type: {
        type: String,
        required: false,
        default: ''
    },
    bundle_price_view: {
        type: String,
        required: false,
        default: ''
    },
    bundle_weight_type: {
        type: String,
        required: false,
        default: ''
    },
    bundle_shipment_type: {
        type: String,
        required: false,
        default: ''
    },
    associated_skus: {
        type: String,
        required: false,
        default: ''
    },
    downloadable_links: {
        type: String,
        required: false,
        default: ''
    },
    downloadable_samples: {
        type: String,
        required: false,
        default: ''
    },
    configurable_variations: {
        type: String,
        required: false,
        default: ''
    },
    configurable_variation_labels: {
        type: String,
        required: false,
        default: ''
    },
    part_manufactures: {
        type: String,
        require: false,
        default: ''
    }
}, {
    timestamps: false
});

module.exports = mongoose.model('Product', ProductSchema);