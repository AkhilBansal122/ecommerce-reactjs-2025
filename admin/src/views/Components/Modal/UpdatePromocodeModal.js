import React from 'react';
import "../Modal/CommonModal.scss";

const UpdatePromocodeModal = ({ hide,title, onSubmit,selected_value }) => {

    console.log(selected_value," - ")
    const updateData = (e) =>{
        console.log(e.target.name,"  ",e.target.value);
        selected_value[e.target.name] = e.target.value;
    }


    return (
        <>
            <div className='delete_modal_main'>
                {/* <div className='img_box_logout'>
                    
                </div> */}
                <div className='deleteNote'> {title}</div>
                <form className='responsive_common'
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(e)
                }}
            >

                <div className='row g-4'>
                    <div className='col-12'>
                        <label className='commmon_label'>Name</label>
                        <input className="form-control" type="text" name="code_name" value={selected_value.name} onChange={(e)=>updateData(e)}/>
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Label</label>
                        <input className="form-control" type="text" name="label" />
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Code</label>
                        <input className="form-control" type="text" name="code" value={selected_value.promocode} />
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Start Date</label>
                        <input className="form-control" showlabel={true}
                                                label="Start Date"                                               
                                                type="date"
                                                placeholder="Start Date"
                                                value={selected_value.start_date}
                                                min={new Date().toISOString().split('T')[0]}
                                                name="start_date"/>
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>End Date</label>
                        <input className="form-control" showlabel={true}
                                                label="End Date"                                               
                                                type="date"
                                                value={selected_value.end_date}
                                                min={new Date().toISOString().split('T')[0]}
                                                placeholder="End Date" name="end_date"/>
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Use Limit</label>
                        <input className="form-control" type="number" name="use_limit" value={selected_value.usage_limit}/>
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Discount</label>
                        <input className="form-control" type="number" name="discount" value={parseInt(selected_value.discount_amount)}/>
                    </div>
                </div>
                <div className='tow_button_card'>
                    <button className='themeBtn w-auto m-0' type='button' onClick={() => hide(false)}> Cancel</button>
                    <button className="themeBtn w-auto" type="submit" >Update</button>
                </div>
            </form>
            </div>
        </>
    )
}

export default UpdatePromocodeModal;