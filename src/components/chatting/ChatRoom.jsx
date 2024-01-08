import moment from "moment";
import { wouteAPI } from "../../api";
import { useEffect, useState } from "react";

export default function ChatRoom({data}) {

  const [chatLog, setChatLog] = useState([])
  const currentId = localStorage.getItem('id')

  const messageLog = async () => {
    const response = await wouteAPI('/chat/m/1', 'POST', {roomId: 2122})
    console.log(response.data.messages);
    setChatLog(response.data.messages.reverse())
  }
 
  useEffect(() => {
    messageLog()
  },[data])
    
  return (
    <div className="logList">
      {chatLog.map((item)=> (
        item.userid === currentId ? (
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
        {/* <div className="myMsg">
          <div className="msg-box">
            <div className="msg">안녕하세요 내가</div>
            <div className="time">오후 12:30</div>
          </div>
        </div> */}
    </div>
  );
}
