import React, { Component } from 'react'
import './Table.css';


class Table extends Component {
  	render () {
    	return (
    		<div>
        		<table className="list">
                    <tr>
                        <th>Music Links  </th>
                        <th>Queued By </th>
                        <th>Vetos </th>
                    </tr>
                    <tr>
                        <td>https://www.youtube.com/watch?v=5dmQ3QWpy1Q&start_radio=1&list=RD5dmQ3QWpy1Q</td>
                        <td>Alexander</td>
                        <td>3</td>
                        
                    </tr>
                    <tr>
                        <td>https://www.youtube.com/watch?v=5dmQ3QWpy1Q&start_radio=1&list=RD5dmQ3QWpy1Q</td>
                        <td>Bobby</td>
                        <td> 1</td>
                        
                    </tr>
                    <tr>
                        <td>https://www.youtube.com/watch?v=5dmQ3QWpy1Q&start_radio=1&list=RD5dmQ3QWpy1Q</td>
                        <td>Natalie</td>
                        <td> 2</td>
                        
                    </tr>
                    <tr>
                        <td>https://www.youtube.com/watch?v=5dmQ3QWpy1Q&start_radio=1&list=RD5dmQ3QWpy1Q</td>
                        <td>Josie</td>
                        <td> 1</td>
                        
                    </tr>
                </table>
    		</div>
    	)
	}
}


export default Table;