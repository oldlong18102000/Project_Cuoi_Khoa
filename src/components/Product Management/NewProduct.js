import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrands, fetchAllCatrgories, fetchAllCountries } from '../../action/actions';
import axios from "axios";
import styles from './NewProduct.module.css';
import { Select, DatePicker, Tag } from 'antd';
import 'antd/dist/antd.css';
import { categoriesListSelector, brandsListSelector, countriesListSelector } from '../../redux/selector';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AsyncSelect from 'react-select/async'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';
import ImageUpLoad from '../ImageUpLoad';


const NewProduct = (props) => {
    const Today = new Date().toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" })
    const initSku = new Date().getTime()
    const [inputValue, SetInputValue] = useState('');
    const [selectedValue, SetSelectedValue] = useState(null);
    const [Vendor, setVendor] = useState("");
    const [ProductTitle, setProductTitle] = useState("");
    const [Brand, SetBrand] = useState("");
    const [Condition, setCondition] = useState("292");
    const [SKU, setSKU] = useState(initSku);
    const [Ima, setIma] = useState([]);
    const [Category, SetCategory] = useState([]);
    const [Description, setDescription] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [Avai4Sale, setAvai4Sale] = useState(1);
    const [Memberships, setMemberships] = useState([]);
    const [TaxExempt, setTaxExempt] = useState(0);
    const [ArrivalDate, setArrivalDate] = useState(Today);
    const [Shipping, setShipping] = useState([{ id: 1, price: "0.00" }]);

    const [Country, SetCountry] = useState("");
    const [Price, SetPrice] = useState(0);
    const [ParticipateSale, SetParticipateSale] = useState(0);
    const [SalePrice, SetSalePrice] = useState("0.0000");
    const [OgTtagsType, setOgTtagsType] = useState(0);
    const [OgTags, SetOgTags] = useState("");
    const [MetaDescType, SetMetaDescType] = useState("A");
    const [MetaDescription, SetMetaDescription] = useState("");
    const [MetaKeywords, SetMetaKeywords] = useState("");
    const [ProductPageTitle, SetProductPageTitle] = useState("");
    const [FacebookMarketingEnabled, SetFacebookMarketingEnabled] = useState(0);
    const [GoogleFeedEnabled, SetGoogleFeedEnabled] = useState(0);

    let history = useHistory()
    //imagesOrder
    //deleted_images
    const [Quantity, SetQuantity] = useState(0);
    const dataDeleteLength = 1;

    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchAllCatrgories()) }, [])
    useEffect(() => { dispatch(fetchAllBrands()) }, [])
    useEffect(() => { dispatch(fetchAllCountries()) }, [])

    const listCategories = useSelector(categoriesListSelector);
    const listBrands = useSelector(brandsListSelector);
    const listCountries = useSelector(countriesListSelector);



    const loadOptions = async (inputText, callback) => {
        const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/vendors/list",
            { search: `${inputText}` }
            ,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }

            }
        );
        const data = res.data && res.data.data ? res.data.data : []
        callback(data.map(i => ({ id: i.id, name: i.name })));
    }

    const createProductData = async () => {
        let ImaNameList = Ima.map(a => a.name)
        console.log("ImaNameList", ImaNameList)

        console.log(`{"vendor_id":"${Vendor}","name":"${ProductTitle}","brand_id":"${Brand}","condition_id":"${Condition}","categories":${Category},"description":"${Description.slice(0, -1)}","enabled":${Avai4Sale},"memberships":${Array.from(new Set(Memberships))},"shipping_to_zones":[${JSON.stringify(Shipping)}],"tax_exempt":${TaxExempt},"price":"${Price}","sale_price_type":"$","arrival_date":"${ArrivalDate}","inventory_tracking":0,"quantity":"${Quantity}","sku":"${SKU}","participate_sale":${ParticipateSale},"sale_price":"${SalePrice}","og_tags_type":"${OgTtagsType}","og_tags":"${OgTags}","meta_desc_type":"${MetaDescType}","meta_description":"${MetaDescription}","meta_keywords":"${MetaKeywords}","product_page_title":"${ProductPageTitle}","facebook_marketing_enabled":${FacebookMarketingEnabled},"google_feed_enabled":${GoogleFeedEnabled}}`)
        const form = new FormData();
        form.append('productDetail', `{"vendor_id":"${Vendor}","name":"${ProductTitle}","brand_id":"${Brand}","condition_id":"${Condition}","categories":[${Category}],"description":"${Description.slice(0, -1)}","enabled":${Avai4Sale},"memberships":[${Array.from(new Set(Memberships))}],"shipping_to_zones":${JSON.stringify(Shipping)},"tax_exempt":${TaxExempt},"price":"${Price}","sale_price_type":"$","arrival_date":"${ArrivalDate}","inventory_tracking":0,"quantity":"${Quantity}","sku":"${SKU}","participate_sale":${ParticipateSale},"sale_price":"${SalePrice}","og_tags_type":"${OgTtagsType}","og_tags":"${OgTags}","meta_desc_type":"${MetaDescType}","meta_description":"${MetaDescription}","meta_keywords":"${MetaKeywords}","product_page_title":"${ProductPageTitle}","facebook_marketing_enabled":${FacebookMarketingEnabled},"google_feed_enabled":${GoogleFeedEnabled},"imagesOrder":[],"deleted_images":[]}`)

        const res = await axios.post('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/create', form,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            }
        )

        if (res.data.success === true) {
            let X = Ima[0]
            for (let i = 0; i < X.length; i++) {
                const formIma = new FormData();

                formIma.append('productId', res.data.data)
                formIma.append('order', i)
                console.log('index', i)
                formIma.append('images[]', X[i])
                axios.post('https://api.gearfocus.div4.pgtest.co/api/products/upload-image', formIma,
                    {
                        headers: {
                            Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                        }
                    }
                )
            }
            history.push(`product-detail/${res.data.data}`)
        }
    }

    return (
        <div className="padding-left-293">
            <Link to="/products/manage-product">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h2 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>Add Product</h2>
                {/* Vendor */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Vendor<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                value={selectedValue}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => setVendor(e.id)}
                                loadOptions={loadOptions}
                                onChange={e => SetSelectedValue(e)}
                                onInputChange={e => SetInputValue(e)}
                                placeholder={'Type something...'}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#c8c8c8',
                                    },
                                })}
                            />
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Product Title */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product Title<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Brand */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Brand<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="brand" id="brand" placeholder='Type Brand name to select' onChange={e => SetBrand(e.target.value)}>
                                {listBrands && listBrands.length > 0 && listBrands.map((item, index) => {
                                    return (<option key={`brand-${index}`} value={item.id}>{item.name}</option>)
                                })}
                            </select>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Condition */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Condition<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Condition" id="Condition" onChange={e => setCondition(e.target.value)} defaultValue="">
                                <option value="292">Used</option>
                                <option value="" style={{ display: 'none' }}></option>
                            </select>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* SKU */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>SKU</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setSKU(e.target.value)} autoComplete='off' defaultValue={initSku}></input>
                        </div>
                    </div>
                </div>
                {/* Images chưa set */ console.log('noi này Ima', Ima[0] ? Ima[0] : '')}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Images<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <ImageUpLoad setIma={setIma} Ima={Ima} />
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Category */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Category<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value}`}>
                            <Select name="category1" id="category1"
                                mode="multiple"
                                allowClear
                                style={{ width: '100%', }}
                                placeholder="Type Categories name to select"
                                onSelect={SetCategory}
                            >
                                {listCategories && listCategories.length > 0 && listCategories.map((item, index) => {
                                    return (<Select.Option key={`category-${index}`} value={item.id} label={item.id}><Tag>----{item.name}</Tag></Select.Option>)
                                })}
                            </Select>
                        </div>
                    </div>
                    <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                </div>
                {/* Description */}
                <div className={`${styles.form_group} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Description<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value_editor}`}>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={e => { setEditorState(e); setDescription(draftToHtml(convertToRaw(e.getCurrentContent()))) }}
                                toolbar={{
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                }}
                            />
                            <textarea
                                disabled
                                style={{ width: '100%' }}
                                value={Description}
                            />
                        </div>
                    </div>
                    <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                </div>
                {/* Available for sale */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Available for sale</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" onChange={e => setAvai4Sale(Number(e.target.checked))} />
                            <span className="slider"></span>
                        </label>
                        <i className="fa-solid fa-circle-question"></i>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part2}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Prices & Inventory</h4>
                {/* Memberships */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Memberships</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <ReactMultiSelectCheckboxes options={[{ "id": 1, "value": "4", "label": "General" }]} onChange={e => setMemberships(...[], (e[0] ? [Number(e[0].value)] : []))} />
                        </div>
                    </div>
                </div>
                {/* Tax Exempt */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Tax class</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>Default</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <input type="checkbox" name="tax_exempt" id="tax_exempt" defaultChecked={Number(false)} onChange={e => setTaxExempt(Number(e.target.checked))} />
                        <label>Tax Exempt</label>
                    </label>
                </div>
                {/* Price */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Price<span className={`${styles.text_danger}`}>*</span></label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" placeholder='0.00' onChange={e => SetPrice(e.target.value)} autoComplete='off' maxLength={20}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field must be greater than 0</div>
                        </div>
                    </label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <input type="checkbox" name="tax_exempt" id="tax_exempt" />
                        <label>Sale</label>
                    </label>
                </div>
                {/* Arrival date */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Arrival date</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <DatePicker defaultValue={moment(new Date().toLocaleDateString())} onChange={(value) => setArrivalDate(new Date(value._d).toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" }))}></DatePicker>
                        </div>
                    </div>
                </div>
                {/* Quantity in stock */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Quantity in stock<span className={`${styles.text_danger}`}>*</span></label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" placeholder='0.00' onChange={e => SetQuantity(e.target.value)} autoComplete='off' maxLength={20}></input>
                        </div>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Shipping</h4>
                {/* Shipping */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Continental U.S.<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" placeholder='0.00' onChange={e => setShipping(prevState => {
                                const newState = prevState.map(obj => {
                                    if (obj.id === 1) {
                                        return { ...obj, price: `${e.target.value}` };
                                    }
                                    return obj;
                                });

                                return newState;

                            })
                            } autoComplete='off' maxLength={20}></input>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_3}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="country" id="country" onChange={e => SetCountry(e.target.value)}>
                                <option value="0">Select new zone</option>
                                {listCountries && listCountries.length > 0 && listCountries.map((item, index) => {
                                    return (<option key={`country-${index}`} value={item.id}>{item.country}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <label className={` ${styles.col_md_2}`}>Add Shipping Location</label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part4}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Marketing</h4>
                {/* og_tags_type */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Open Graph meta tags</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="OgTtagsType" id="OgTtagsType" defaultValue={'Autogenerated'} onChange={e => setOgTtagsType(e.target.value)}>
                                <option value="0">Autogenerated</option>
                                <option value="1">Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* og_tags */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => SetOgTags(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                {/* MetaDescType */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta description</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="MetaDescType" id="MetaDescType" defaultValue={'Autogenerated'} onChange={e => SetMetaDescType(e.target.value)}>
                                <option value="A">Autogenerated</option>
                                <option value="C">Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* MetaDescription */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => SetMetaDescription(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                {/* MetaKeywords */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta keywords</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => SetMetaKeywords(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                {/* ProductPageTitle */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product page title</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => SetProductPageTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.help_block}`}>Leave blank to use product name as Page Title.</div>
                        </div>
                    </div>
                </div>
                {/* FacebookMarketingEnabled */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Facebook <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" onChange={e => SetFacebookMarketingEnabled(Number(e.target.checked))} />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                {/* GoogleFeedEnabled */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Google <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" onChange={e => SetGoogleFeedEnabled(Number(e.target.checked))} />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning" onClick={createProductData}
                        disabled={dataDeleteLength === 0 ? true : false}>Create account</button></li>
                </div>
            </div>
        </div >
    );
}

export default NewProduct