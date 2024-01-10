import moment from "moment";
import { wouteAPI } from "../../api";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router";

export default function ChatRoom({user}) {
  const {receiveMessage, fromPageRoomId} = useOutletContext()
  console.log('modal from : ' + fromPageRoomId);
  const location = useLocation()
  const currentRoomId = location.state.roomId 
  const [chatLog, setChatLog] = useState([])
  console.log('cur : ' + currentRoomId);
  console.log('useidroom : ' + location.state.userId);
  const messageLog = async () => {
    if(fromPageRoomId != null) {
      const response = await wouteAPI(location.pathname, 'POST', {roomId: fromPageRoomId})
      console.log(response.data.messages);
      setChatLog(response.data.messages.reverse())
    } else {
      const response = await wouteAPI(location.pathname, 'POST', {roomId: currentRoomId})
      console.log(response.data.messages);
      setChatLog(response.data.messages.reverse())
    }
  }
 
  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    messageLog()
  },[receiveMessage, currentRoomId])
  
  return (
    <div className="logList">
      {chatLog.map((item)=> (
        item.userid === user.id ? (
          <div className="myMsg" key={item.id}>
            <div className="msg-box">
              <div className="msg"><div>{item.content}</div></div>
              <div className="time">{moment(item.createdAt).calendar()}</div>
            </div>
          </div>
          ) : (
            <div key={item.id} className="anotherMsg">
              <div className="msg-wrap">
                <div className="msg-box">
                  <div className="profileImg">
                    <img src={item.profileImg} alt="" />
                  </div>
                  <div className="msg">
                    <div>{item.content}</div>
                  </div>
                </div>
                <div className="time">{moment(item.createdAt).calendar()}</div>
              </div>
            </div>
            )
          )
        )}
    </div>
  );
}
