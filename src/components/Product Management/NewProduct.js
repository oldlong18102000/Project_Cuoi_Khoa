import { Link, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrands, fetchAllCatrgories, fetchAllCountries } from '../../action/actions';
import axios from "axios";
import styles from './NewProduct.module.css';
import { categoriesListSelector, brandsListSelector, countriesListSelector } from '../../redux/selector';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const NewProduct = (props) => {
    const [Vendor, setVendor] = useState("");
    const [ProductTitle, setProductTitle] = useState("");
    const [Condition, setCondition] = useState("Used");
    const [Category, SetCategory] = useState("0");
    const [Brand, SetBrand] = useState("");
    const [Country, SetCountry] = useState("");

    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchAllCatrgories()) }, [])
    useEffect(() => { dispatch(fetchAllBrands()) }, [])
    useEffect(() => { dispatch(fetchAllCountries()) }, [])

    const listCategories = useSelector(categoriesListSelector);
    const listBrands = useSelector(brandsListSelector);
    const listCountries = useSelector(countriesListSelector);


    return (
        <div className="padding-left-293">
            <Link to="/products/manage-product">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h2 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>Add Product</h2>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Vendor<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" placeholder='Type vendor name to select' onChange={e => setVendor(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product Title<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
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
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Condition<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Condition" id="Condition" onChange={e => setCondition(e.target.value)} defaultValue="">
                                <option value="Used">Used</option>
                                <option value="" style={{ display: 'none' }}></option>
                            </select>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>SKU</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255} defaultValue={new Date().getTime()}></input>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Images<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Category<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="category" id="category" placeholder='Type Categories name to select' onChange={e => SetCategory(e.target.value)}>
                                {listCategories && listCategories.length > 0 && listCategories.map((item, index) => {
                                    return (<option key={`category-${index}`} value={item.id}>----{item.name}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                </div>
                <div className={`${styles.form_group} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Description<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_6}`}>
                        <div className={` ${styles.table_value_editor}`}>
                            <Editor
                                wrapperClassName="wrapper-class"
                                toolbarClassName="toolbarClassName"
                                editorClassName="editorClassName"
                            />
                        </div>
                    </div>
                    <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Available for sale</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                        <i className="fa-solid fa-circle-question"></i>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part2}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Prices & Inventory</h4>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Memberships</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="category" id="category" defaultValue={''} onChange={e => SetCategory(e.target.value)}>
                                <option value="general">General</option>
                                <option value="" style={{ display: 'none' }}></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Tax class</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" placeholder='Type vendor name to select' onChange={e => setVendor(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Price<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Arrival date</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" placeholder='Type Brand name to select' onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Quantity in stock<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Condition" id="Condition" onChange={e => setCondition(e.target.value)} defaultValue="">
                                <option value="Used">Used</option>
                                <option value="" style={{ display: 'none' }}></option>
                            </select>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Shipping</h4>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Continental U.S.<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" placeholder='Type vendor name to select' onChange={e => setVendor(e.target.value)} autoComplete='off' maxLength={255}></input>
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
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Open Graph meta tags</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="category" id="category" defaultValue={'Autogenerated'} onChange={e => SetCategory(e.target.value)}>
                                <option value="auto">Autogenerated</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta description</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="category" id="category" defaultValue={'Autogenerated'} onChange={e => SetCategory(e.target.value)}>
                                <option value="auto">Autogenerated</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Meta keywords</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Product page title</label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setProductTitle(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.help_block}`}>Leave blank to use product name as Page Title.</div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Facebook <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Add to Google <br />product feed</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
        </div >
    );
}

export default NewProduct