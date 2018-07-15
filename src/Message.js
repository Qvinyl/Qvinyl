import React from 'react';



const Message = ({chat, user}) => (
    <li className={`chat ${ chat.username === "2MBuqutTnuRkXSWzWmCWWWbqC0C3" ? "right" : "left"}`}>
    	{user}
    	<br />
        {chat.username}
        <br />
        {chat.content}
    </li>
);


export default Message;

// && <img src={chat.img} alt={`${chat.username}`} />