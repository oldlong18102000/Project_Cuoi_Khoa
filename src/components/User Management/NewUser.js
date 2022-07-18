import { Link, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrands, fetchAllCatrgories, fetchAllCountries } from '../../action/actions';
import axios from "axios";
import styles from './NewUser.module.css';
import 'antd/dist/antd.css';
import { categoriesListSelector, brandsListSelector, countriesListSelector } from '../../redux/selector';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const NewUser = (props) => {
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [CfPassword, setCfPassword] = useState("");
    const [Membership, setMembership] = useState("");
    const [Type, setType] = useState("individual");
    const [AccessLevel, setAccessLevel] = useState("10");
    const [ForceChangePassword, setForceChangePassword] = useState("0");
    const [TaxExempt, setTaxExempt] = useState("0");

    const dataDeleteLength = 1;

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
        //const res = await axios.post

        console.log(`{"email":"${Email}","firstName":"${FirstName}","lastName":"${LastName}","password":"${Password}","confirm_password":"${CfPassword}","membership_id":"${Membership}","forceChangePassword":"${ForceChangePassword}","taxExempt":${TaxExempt},"paymentRailsType":"${Type}","access_level":"${AccessLevel}"}`)

        const res = await axios.post('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/create',
            `{"email":"${Email}","firstName":"${FirstName}","lastName":"${LastName}","password":"${Password}","confirm_password":"${CfPassword}","membership_id":"${Membership}","forceChangePassword":"${ForceChangePassword}","taxExempt":${TaxExempt},"paymentRailsType":"${Type}","access_level":"${AccessLevel}"}`
            ,
            {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            }
        )
    }

    return (
        <div className="padding-left-293">
            <Link to="/user/manage-user">
                <button className={styles.backButton}>
                    <i className="fa-solid fa-arrow-left center"></i>
                </button>
            </Link>
            <div className={styles.part1}>
                <h4 className={` ${styles.nb_theme_cosmic} ${styles.mb_5}`}>Create profile</h4>
                <h6 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Email & password</h6>
                {/* First Name */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>First Name<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setFirstName(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Last Name */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Last Name<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setLastName(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Email */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Email<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setEmail(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>This field is required</div>
                        </div>
                    </div>
                </div>
                {/* Password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Password<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setPassword(e.target.value)} autoComplete='off' maxLength={255}></input>
                        </div>
                    </div>
                </div>
                {/* Confirm password */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Confirm password<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <input type="text" onChange={e => setCfPassword(e.target.value)} autoComplete='off' maxLength={255}></input>
                            <div className={`${styles.small} ${styles.error_message}`}>Passwords do not match</div>
                        </div>
                    </div>
                </div>
                {/* Type */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Type<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Type" id="Type" onChange={e => setType(e.target.value)} defaultValue="Individual">
                                <option value="individual">Individual</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* PaymentRails ID */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>PaymentRails ID</label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part2}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Access information</h4>
                {/* Access level */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Access level<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Type" id="Type" onChange={e => setAccessLevel(e.target.value)} defaultValue="Vendor">
                                <option value="100">Admin</option>
                                <option value="10">Vendor</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Membership */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Membership<span className={`${styles.text_danger}`}>*</span></label>
                    <div className={` ${styles.col_md_4}`}>
                        <div className={` ${styles.table_value}`}>
                            <select name="Membership" id="Membership" onChange={e => setMembership(e.target.value)} defaultValue="Ignore Membership">
                                <option value="">Ignore Membership</option>
                                <option value="4">General</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Require to change password on next log in */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Require to change password on next log in</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" onChange={e => setForceChangePassword(Number(e.target.checked))}></input>
                        </div>
                    </label>
                </div>
                <div className={` ${styles.seperated_space}`}></div>
            </div>
            <div className={styles.part3}>
                <h4 className={` ${styles.nb_theme_cosmic_h4} ${styles.my_3}`}>Tax information</h4>
                {/* TaxExempt */}
                <div className={`${styles.form_group} ${styles.nb_theme_cosmic} ${styles.row_inline} ${styles.mb_4}`}>
                    <label className={` ${styles.col_md_2}`}>Tax exempt</label>
                    <label className={` ${styles.col_md_2}`} style={{ textAlign: 'left' }}>
                        <div className={` ${styles.table_value}`}>
                            <input type="checkbox" onChange={e => setTaxExempt(Number(e.target.checked))}></input>
                        </div>
                    </label>
                </div>
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

export default NewUser