import { Link, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrands, fetchAllCatrgories, fetchAllCountries, fetchAllVendors } from '../../action/actions';
import axios from "axios";
import styles from './NewProduct.module.css';
import { Select, DatePicker, Tag } from 'antd';
import 'antd/dist/antd.css';
import { categoriesListSelector, brandsListSelector, countriesListSelector, vendorsListSelector } from '../../redux/selector';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AsyncSelect from 'react-select/async'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js"
import ImageUpLoad from '../ImageUpLoad';


const DetailProduct = (props) => {
    let currentUrl = window.location.pathname
    let result = currentUrl.lastIndexOf("/");
    let idProduct = currentUrl.slice(result + 1, currentUrl.length)
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
    const [CategoryName, SetCategoryName] = useState([]);
    const [Description, setDescription] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const [Avai4Sale, setAvai4Sale] = useState(1);
    const [Memberships, setMemberships] = useState([]);
    const [TaxExempt, setTaxExempt] = useState(0);
    const [ArrivalDate, setArrivalDate] = useState("165000000");
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
    const [FacebookMarketingEnabled, SetFacebookMarketingEnabled] = useState();
    const [GoogleFeedEnabled, SetGoogleFeedEnabled] = useState();

    const [Quantity, SetQuantity] = useState(0);
    const dataDeleteLength = 1;

    const listVendors = useSelector(vendorsListSelector);
    const listCategories = useSelector(categoriesListSelector);
    const listBrands = useSelector(brandsListSelector);
    const listCountries = useSelector(countriesListSelector);
    console.log('listVendors1', listVendors)


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

    const getProductDeltailData = async () => {
        //const res = await axios.post

        const res = await axios.post('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/detail',
            `{"id":"${idProduct}"}`
            ,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            }
        )
        const datas = res.data.data
        console.log(datas)
        // Basic
        setVendor(datas.vendor_id)
        let filtered = listVendors.filter(item => item.id === datas.vendor_id);
        console.log('listVendors2', listVendors)

        console.log('filtered', listVendors.filter(item => item.id === datas.vendor_id))
        SetInputValue(filtered.map(item => item.name))
        setProductTitle(datas.name)
        setCondition(datas.condition_id)
        SetBrand(datas.brand_id)
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(datas.description))));
        setSKU(datas.sku)
        SetCategory(datas.categories)
        setArrivalDate(datas.arrival_date)
        setAvai4Sale(datas.enabled)
        //Prices & Inventory
        SetPrice(datas.price)
        SetQuantity(datas.quantity)
        //Shipping
        setShipping(datas.shipping)
        //Marketing
        setOgTtagsType(datas.og_tags_type)
        SetOgTags(datas.og_tags)
        SetMetaDescType(datas.meta_desc_type)
        SetMetaDescription(datas.meta_description)
        SetMetaKeywords(datas.meta_keywords)
        SetProductPageTitle(datas.product_page_title)
        SetFacebookMarketingEnabled(+datas.facebook_marketing_enabled)
        SetGoogleFeedEnabled(+datas.google_feed_enabled)
    }

    useEffect(() => {
        getProductDeltailData();
    }, [])

    const take_decimal_number = (num, n) => {
        const index = String(num).indexOf('.', 0);
        const result = String(num).slice(0, index + n + 1);
        return result;
    }

    return (
        <div className="padding-left-293">
            <Link to="/products/manage-product">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h2 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>{ProductTitle ? ProductTitle : 'Add Product'}</h2>
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
                                placeholder={inputValue}
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
                            <input type="text" onChange={e => setProductTitle(e.target.value)} defaultValue={ProductTitle} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Brand */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Brand<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="brand" id="brand" placeholder='Type Brand name to select' value={Brand} onChange={e => SetBrand(e.target.value)}>
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
                            <select name="Condition" id="Condition" onChange={e => setCondition(e.target.value)} defaultValue={Condition}>
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
                            <input type="text" onChange={e => setSKU(e.target.value)} autoComplete='off' value={SKU}></input>
                        </div>
                    </div>
                </div>
                {/* Images chưa set */}
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
                                value={Category.map(item => '----'.concat(item.name))}
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
                            <input type="checkbox" defaultChecked={Avai4Sale} onChange={e => setAvai4Sale(Number(e.target.checked))} />
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
                            <input type="number" placeholder='0.00' onChange={e => SetPrice(e.target.value)} value={take_decimal_number(Price, 2)} autoComplete='off' maxLength={20}></input>
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
                            <DatePicker value={moment(new Date(ArrivalDate * 1000).toLocaleDateString())} format={"YYYY-MM-DD"} onChange={(value) => setArrivalDate(new Date(value._d).toLocaleString("fr-CA", { month: "numeric", day: "numeric", year: "numeric" }))}></DatePicker>
                        </div>
                    </div>
                </div>
                {/* Quantity in stock */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Quantity in stock<span className={`${styles.text_danger}`}>*</span></label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="number" placeholder='0.00' onChange={e => SetQuantity(e.target.value)} value={Quantity} autoComplete='off' maxLength={20}></input>
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
                            <input type="number" placeholder='0.00' defaultValue={take_decimal_number(Shipping.filter(item => item.id === '1')[0]?.price, 2)} onChange={e => setShipping(prevState => {
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
                            <select name="OgTtagsType" id="OgTtagsType" defaultValue={OgTtagsType} onChange={e => setOgTtagsType(e.target.value)}>
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
                            <textarea onChange={e => SetOgTags(e.target.value)} value={OgTags} maxLength={255} style={{ color: 'black', fontSize: '14px', width: '100%', minHeight: '37px', paddingLeft: '5px' }}></textarea>
                        </div>
                    </div>
                </div>
                {/* MetaDescType */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta description</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="MetaDescType" id="MetaDescType" defaultValue={MetaDescType} onChange={e => SetMetaDescType(e.target.value)}>
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
                            <textarea type="text" onChange={e => SetMetaDescription(e.target.value)} value={MetaDescription} maxLength={255} style={{ color: 'black', fontSize: '14px', width: '100%', minHeight: '37px', paddingLeft: '5px' }}></textarea>
                        </div>
                    </div>
                </div>
                {/* MetaKeywords */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta keywords</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => SetMetaKeywords(e.target.value)} defaultValue={MetaKeywords} maxLength={255}></input>
                        </div>
                    </div>
                </div>
                {/* ProductPageTitle */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product page title</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => SetProductPageTitle(e.target.value)} defaultValue={ProductPageTitle} maxLength={255}></input>
                            <div className={`${styles.small} ${styles.help_block}`}>Leave blank to use product name as Page Title.</div>
                        </div>
                    </div>
                </div>
                {/* FacebookMarketingEnabled */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Facebook <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>{console.log('FB', Boolean(GoogleFeedEnabled))}
                            <input type="checkbox" checked={Boolean(FacebookMarketingEnabled)} onChange={e => SetFacebookMarketingEnabled(Number(e.target.checked))} />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                {/* GoogleFeedEnabled */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Google <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}> {console.log('GG', Boolean(GoogleFeedEnabled))}
                            <input type="checkbox" checked={Boolean(GoogleFeedEnabled)} onChange={e => SetGoogleFeedEnabled(Number(e.target.checked))} />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className="sticky-panel">
                <div className="sticky-panel-content">
                    <li><button type="button" className="btn btn-warning" disabled={dataDeleteLength === 0 ? true : false}>Update Product</button></li>
                </div>
            </div>
        </div >
    );
}

export default DetailProduct