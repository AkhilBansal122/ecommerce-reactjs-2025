import React from 'react';
import "../Modal/CommonModal.scss";

const UpdateModal = ({ hide,title, onSubmit, 
    wager_play_limit,insure_payout_one,wager_play_limit_two,insure_payout_two, wager_play_limit_three,
    insure_payout_three, standard_payout
}) => {

  
// console.log(selectedWager , "selected wager")    

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
                            <label className='commmon_label'>Wager Play</label>
                            <input className="form-control" type="text" defaultValue={wager_play_limit} name="wager_play_limit" />
                        </div>
                        <div className='col-12'>
                            <label className='commmon_label'>Insured Payout X%</label>
                            <input className="form-control" type="text" defaultValue={insure_payout_one} name="insure_payout_one" />
                        </div>
                 
                        
                       <div className='col-12'>
                                <label className='commmon_label'>Wager Play Two</label>
                                <input className="form-control" type="text" defaultValue={wager_play_limit_two} name="wager_play_limit_two" />
                            </div>
                                <div className='col-12'>
                                    <label className='commmon_label'>Insured Playout X% two</label>
                                    <input className="form-control" type="text" defaultValue={insure_payout_two} name="insure_payout_two" />
                                </div>
                                <div className='col-12'>
                                <label className='commmon_label'>Wager Play Three</label>
                                <input className="form-control" type="text" defaultValue={wager_play_limit_three} name="wager_play_limit_three" />
                            </div>
                                <div className='col-12'>
                                    <label className='commmon_label'>Insured Playout X% Three</label>
                                    <input className="form-control" type="text" defaultValue={insure_payout_three} name="insure_payout_three" />
                                </div>
                        <div className='col-12'>
                            <label className='commmon_label'>Standard Payout</label>
                            <input className="form-control" type="text" defaultValue={standard_payout} name="standard_payout" />
                        </div>
                <div className='tow_button_card'>
                    <button className='themeBtn w-auto m-0' type='button' onClick={() => hide(false)}> Cancel</button>
                    <button className="themeBtn w-auto" type="submit" >Update</button>
                </div>
                </div>
                </form>
            </div>
        </>
    )
}

export default UpdateModal;