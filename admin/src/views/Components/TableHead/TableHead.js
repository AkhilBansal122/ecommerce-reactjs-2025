import {RxCaretSort} from 'react-icons/rx';

const TableHead = ({data}) => {
    return (
        <>
            <thead>
                <tr>
                    {data.map((value, index) => (
                        <th key={index}>
                            {value.label}
                            {value.sort && (
                                <button className='sortTableBtn'><RxCaretSort/></button>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
                
        </>
    )
}

export default TableHead;