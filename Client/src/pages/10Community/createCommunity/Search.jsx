import { useState } from 'react';
import Form from 'react-bootstrap/Form';
const Search = (props) => {
    const { send } = props;
    const [searchTxt, setSearchTxt] = useState("");
    const handleChange = (e) => {
        setSearchTxt(e.target.value);
        send(e.target.value);
    }
    return (
        <div>
            <h5>Invite Member Name</h5>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control className='space' type="text" value={searchTxt} onChange={handleChange} placeholder=" enter your Member Name" />
            </Form.Group>
        </div>
    );
};

export default Search;