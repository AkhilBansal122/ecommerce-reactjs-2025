import { useEffect, useState } from 'react';
import "../Modal/CommonModal.scss";

const AddNewModal = ({ hide, onSubmit, header }) => {


    return (
        <>
            <div className='delete_modal_main'>
                {/* <div className='img_box_logout'>
                    
                </div> */}
                <div className='deleteNote'> {header} </div>
                <form className='responsive_common'
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(e)
                    }}
                >
                    <div className='row g-4'>
                      
                        <div className='col-12'>
                            <label className='commmon_label'>Wager Play</label>
                            <input className="form-control" type="text" name="wager_play_limit" />
                        </div>
                        <div className='col-12'>
                            <label className='commmon_label'>Insured Payout X%</label>
                            <input className="form-control" type="text" name="insure_payout_one" />
                        </div>
                 
                        
                       <div className='col-12'>
                                <label className='commmon_label'>Wager Play Limit Two</label>
                                <input className="form-control" type="text" name="wager_play_limit_two" />
                            </div>
                                <div className='col-12'>
                                    <label className='commmon_label'>Insured Playout X% two</label>
                                    <input className="form-control" type="text" name="insure_payout_two" />
                                </div>
                                <div className='col-12'>
                                <label className='commmon_label'>Wager Play Limit Three</label>
                                <input className="form-control" type="text" name="wager_play_limit_three" />
                            </div>
                                <div className='col-12'>
                                    <label className='commmon_label'>Insured Playout X% Three</label>
                                    <input className="form-control" type="text" name="insure_payout_three" />
                                </div>
                        <div className='col-12'>
                            <label className='commmon_label'>Standard Payout</label>
                            <input className="form-control" type="text" name="standard_payout" />
                        </div>


                        <div className='tow_button_card'>
                            <button className='themeBtn w-auto m-0' type='button' onClick={() => hide(false)}> Cancel</button>
                            <button className="themeBtn w-auto" type="submit" >Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNewModal;