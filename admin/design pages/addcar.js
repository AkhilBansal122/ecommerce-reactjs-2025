import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AddCar = () => {

    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Upload a car</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/uploadcar/list">Upload Car List </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Upload a car</li>
                    </ol>
                </nav>
            </div>

        <div className='common_section_main'>
            <div className='form_specifications'>
                <h1>Specifications</h1>

                <div className='form_card'>
                    <div className='form_row'>
                        <label>Brand  <span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Brand </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>
                    <div className='form_row'>
                        <label>Model<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Model </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>
                    <div className='form_row'>
                        <label>Model code<span>*</span></label>
                        <input className='form-control' type="text" placeholder='Model code' />
                    </div>
                    <div className='form_row'>
                        <label>Registration year<span>*</span></label>
                        <div className='tow_select_year'>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Year </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Month </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                        </div>
                    </div>

                    <div className='form_row'>
                        <label>VIN/Chasis No.<span>*</span></label>
                        <input className='form-control' type="text" placeholder='VIN/Chasis No.' />
                    </div>

                    <div className='form_row'>
                        <label>Engine<span>*</span></label>
                        <input type="text" placeholder='cc' className='form-control' />
                    </div>

                    <div className='form_row'>
                        <label>Mileage<span>*</span></label>
                        <input type="text" placeholder='km' className='form-control' />
                    </div>

                    <div className='form_row'>
                        <label>Fuel<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Fuel </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Transmission<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Transmission </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Body type<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Body type </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>


                    <div className='form_row'>
                        <label>Steering position<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Steering position </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Drive<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Drive </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Seats<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Seats </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Color<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Color </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Doors<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Doors </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>

                    <div className='form_row'>
                        <label>Weight<span>*</span></label>
                        <input type="text" placeholder='Weight' className='form-control' />
                    </div>
                </div>

                <div className='full_row_content'>
                <div className='form_row'>
                        <label>Dimension (m3)<span>*</span></label>
                        <div className='tow_select_year'>
                        <input type="text" placeholder='Length (m)' className='form-control' />
                        <input type="text" placeholder='Width (m)' className='form-control' />
                        <input type="text" placeholder='Height (m)' className='form-control' />
                        <input type="text" placeholder='0 (m3)' className='form-control' />
                        </div>
                    </div>
                </div>
                <div className='full_row_content'>
                <div className='form_row'>
                        <label>Reference No.<span>*</span></label>
                        <div className='tow_select_year'>
                        <input type="text" placeholder='Length (m)' className='form-control' />
                        </div>
                    </div>
                </div>

                <div className='full_row_content'>
                <div className='form_row'>
                        <label>Condition, <br /> Imperfection etc. <span>*</span></label>
                        <div className='tow_select_year'>
                        <div className='condition_card'>
                            <label htmlFor="">23424</label>
                            <input type="text" placeholder='' className='form-control' />
                        </div>
                        <div className='condition_card'>
                            <label htmlFor="">23424</label>
                            <input type="text" placeholder='' className='form-control' />
                        </div>
                        <div className='condition_card'>
                            <label htmlFor="">23424</label>
                            <input type="text" placeholder='' className='form-control' />
                        </div>
                        <div className='condition_card'>
                            <label htmlFor="">23424</label>
                            <input type="text" placeholder='' className='form-control' />
                        </div>
                        </div>
                    </div>
                </div>

                <h1 className='midle_heading_car'>Features</h1>

                <div className='features_check_box'>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1"> Power steering</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="Bike"/>
                        <label for="vehicle2"> Leather seat</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Bike"/>
                        <label for="vehicle3"> ESC</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle4" name="vehicle4" value="Bike"/>
                        <label for="vehicle4"> Sunroof</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle5" name="vehicle5" value="Bike"/>
                        <label for="vehicle5"> Power window</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle6" name="vehicle6" value="Bike"/>
                        <label for="vehicle6"> 360 degree camera</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7"> CD player</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle8" name="vehicle8" value="Bike"/>
                        <label for="vehicle8">A/C</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Body kit</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">ABS</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Airbag</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Side airbag</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Radio</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">CD changer</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Power mirror</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">DVD</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">TV</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Side skirts</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Power seat</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Back tire</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Front lip spoiler</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Grill guard</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Rear spoiler</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Navigation</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Central locking</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Jack</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Turbo</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Spare tire</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Wheel spanner</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Power slide door</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Fog lights</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Back camera</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Non smoker</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Push start</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">Keyless entry</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7">One owner</label>
                    </div>
                    
                </div>

                <h1 className='midle_heading_car'>Location</h1>

                <div className='form_card'>
                    <div className='form_row'>
                        <label>Country  <span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Country </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>
                    <div className='form_row'>
                        <label>Region<span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Region </option>
                            <option value="">Brand 1</option>
                            <option value="">Brand 2</option>
                        </select>
                    </div>
                </div>

                <h1 className='midle_heading_car mb-0'>Comment</h1>
                <p className='middle_heading_card_add'>Pre-comment</p>

                <div className='features_check_box three_check_box'>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1">Good deal</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="Bike"/>
                        <label for="vehicle2"> Fuel efficient</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Bike"/>
                        <label for="vehicle3"> Clean interior with high-quality material</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle4" name="vehicle4" value="Bike"/>
                        <label for="vehicle4"> Excellent seats</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle5" name="vehicle5" value="Bike"/>
                        <label for="vehicle5"> Plenty of high-tech features</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle6" name="vehicle6" value="Bike"/>
                        <label for="vehicle6"> Perfect family- friendly car</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle7" name="vehicle7" value="Bike"/>
                        <label for="vehicle7"> Good tires and wheels</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle8" name="vehicle8" value="Bike"/>
                        <label for="vehicle8">Eco friendly </label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle9" name="vehicle9" value="Bike"/>
                        <label for="vehicle9">Powerful engine, luxurious interior and exquisite styling </label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle10" name="vehicle10" value="Bike"/>
                        <label for="vehicle10">Small size car easy to park</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehicle11" name="vehicle11" value="Bike"/>
                        <label for="vehicle11">Keyless entry  </label>
                    </div>
                </div>

                <div className='full_row_content'>
                <div className='form_row'>
                        <label>Comment</label>
                        <div className='tow_select_year'>
                        <textarea className='textarea_common' id="w3review" name="w3review" rows="4" cols="50"></textarea>
                        </div>
                    </div>
                </div>

                <h1 className='midle_heading_car'>Price (FOB price)</h1>

                <div className='full_row_content'>
                <div className='form_row'>
                        <label>Price (Yen) <span>*</span></label>
                        <div className='tow_select_year price_input'>
                        <input type="text" placeholder='Price (Yen)' className='form-control' />
                        <span className='equal'>=</span>
                        <label className='equal'>US$ (Latest rate)</label>
                        <input type="text" className='form-control' disabled />
                        </div>
                    </div>

                    <div className='form_row'>
                        <label>Margin (%) <span>*</span></label>
                        <div className='tow_select_year price_input'>
                        <input type="text" placeholder='Margin (%)*' className='form-control' />
                        <span className='equal'>=</span>
                        <label className='equal'>Margin ($) <span>*</span></label>
                        <input type="text" className='form-control' placeholder='Margin ($)' />
                        </div>
                    </div>

                    <div className='form_row'>
                        <label>Discount (%) <span>*</span></label>
                        <div className='tow_select_year price_input'>
                        <input type="text" placeholder='Discount (%)' className='form-control' />
                        <span className='equal'>=</span>
                        <label className='equal'>Discount ($)</label>
                        <input type="text" className='form-control' placeholder='Discount ($)' />
                        </div>
                    </div>

                    <div className='form_row'>
                        <label>Profit ($) <span>*</span></label>
                        <div className='tow_select_year price_input'>
                        <input type="text"  className='form-control' disabled />
                        <span className='equal'>=</span>
                        <label className='equal'>FOB Price shown on the site ($)</label>
                        <input type="text" className='form-control' placeholder='' disabled />
                        </div>
                    </div>

                </div>

                <h1 className='midle_heading_car'>Price (FOB price) <span>Image size: Minimum 000px to Maximum 000px</span></h1>

                <div className='form_card upload_image_video'>
                    <div className='form_row'>
                        <label>Overview <span>*</span></label>
                        <button className='add_btn_car' type='button'>Upload image</button>
                    </div>
                    <div className='form_row'>
                        <label>Exterior <span>*</span></label>
                        <button className='add_btn_car' type='button'>Upload image</button>
                    </div>
                    <div className='form_row'>
                        <div className='upload_img_name'>
                            <img src="/images/toyota_yaris.jpg" alt="" />
                            <h2>toyota_yaris_cross_2.mov</h2>
                            <span  className='size_img_kb'>122.94KB</span>
                            <button className='delete_btn_icon_btn' type='button'><MdDelete /> Delete</button>
                        </div>
                    </div>
                </div>

                <h1 className='midle_heading_car'>Others</h1>

                <div className='features_check_box three_check_box'>
                    <div className='features_row'>
                        <input type="checkbox" id="vehiclea" name="vehiclea" value="Bike"/>
                        <label for="vehiclea">Set as popular car</label>
                    </div>
                    <div className='features_row'>
                        <input type="checkbox" id="vehiclem" name="vehiclem" value="Bike"/>
                        <label for="vehiclem"> Set as popular car by country</label>
                    </div>
                </div>

                <div className='form_card'>
                <div className='form_row'>
                        <label>Country  <span>*</span></label>
                        <select className='form-control select_white' name='series_id'>
                            <option value="">Country </option>
                            <option value="">Country 1</option>
                            <option value="">Country 2</option>
                        </select>
                    </div>
                </div>

                <div className='priview_btn_car'>
                 <button className='delete_btn_icon_btn' type='button'>Preview</button>
                </div>

            </div>
            </div>
        </div>
    )
}

export default AddCar